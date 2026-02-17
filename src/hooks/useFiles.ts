import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export interface FileRecord {
  id: string;
  user_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  storage_path: string;
  ai_summary: string | null;
  ai_tags: string[];
  context: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export function useFiles() {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchFiles = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("files")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching files:", error);
    } else {
      setFiles((data as unknown as FileRecord[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles();
  }, [user]);

  const uploadFile = async (file: File) => {
    if (!user) return;
    setUploading(true);

    try {
      const filePath = `${user.id}/${Date.now()}-${file.name}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("file-brain")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Analyze with AI
      let aiData = { summary: null as string | null, tags: [] as string[], category: "other" };
      try {
        const { data: fnData, error: fnError } = await supabase.functions.invoke("analyze-file", {
          body: { fileName: file.name, fileType: file.type, fileSize: file.size },
        });
        if (!fnError && fnData) {
          aiData = { summary: fnData.summary, tags: fnData.tags || [], category: fnData.category || "other" };
        }
      } catch (e) {
        console.warn("AI analysis failed, continuing without:", e);
      }

      // Save to database
      const { error: dbError } = await supabase.from("files").insert({
        user_id: user.id,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        storage_path: filePath,
        ai_summary: aiData.summary,
        ai_tags: aiData.tags,
        context: { category: aiData.category },
      } as any);

      if (dbError) throw dbError;

      toast({ title: "File uploaded", description: `${file.name} analyzed and stored.` });
      await fetchFiles();
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (fileId: string, storagePath: string) => {
    try {
      await supabase.storage.from("file-brain").remove([storagePath]);
      await supabase.from("files").delete().eq("id", fileId);
      toast({ title: "File deleted" });
      await fetchFiles();
    } catch (error: any) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    }
  };

  const getFileUrl = (storagePath: string) => {
    const { data } = supabase.storage.from("file-brain").getPublicUrl(storagePath);
    return data.publicUrl;
  };

  const downloadFile = async (storagePath: string, fileName: string) => {
    const { data, error } = await supabase.storage.from("file-brain").download(storagePath);
    if (error) {
      toast({ title: "Download failed", description: error.message, variant: "destructive" });
      return;
    }
    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return { files, loading, uploading, uploadFile, deleteFile, downloadFile, fetchFiles };
}
