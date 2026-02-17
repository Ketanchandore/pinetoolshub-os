import { useState, useCallback, useRef } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Upload, Search, FileText, Image, Film, Music, Code, Archive, Trash2,
  Download, Tag, Sparkles, FolderOpen, Grid3X3, List, Filter, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { useFiles, FileRecord } from "@/hooks/useFiles";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const FILE_ICONS: Record<string, typeof FileText> = {
  document: FileText, image: Image, video: Film, audio: Music,
  code: Code, archive: Archive, other: FileText,
};

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

function getCategory(file: FileRecord): string {
  return (file.context as any)?.category || "other";
}

export default function FileBrainPage() {
  const { user } = useAuth();
  const { files, loading, uploading, uploadFile, deleteFile, downloadFile } = useFiles();
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredFiles = files.filter((f) => {
    const matchesSearch = !search || f.file_name.toLowerCase().includes(search.toLowerCase()) ||
      f.ai_summary?.toLowerCase().includes(search.toLowerCase()) ||
      f.ai_tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesTag = !filterTag || f.ai_tags?.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  const allTags = [...new Set(files.flatMap((f) => f.ai_tags || []))];

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach(uploadFile);
  }, [uploadFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    selected.forEach(uploadFile);
    e.target.value = "";
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Brain className="h-16 w-16 text-muted-foreground/40" />
          <h2 className="text-2xl font-bold text-foreground">Sign in to access File Brain</h2>
          <p className="text-muted-foreground">Your AI-powered file memory awaits.</p>
          <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
            <a href="/auth">Sign In</a>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
                <Brain className="h-5 w-5 text-white" />
              </div>
              File Brain
            </h1>
            <p className="text-muted-foreground mt-1">Upload once, find forever. AI-powered file memory.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
              {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
            </Button>
            <Button onClick={() => inputRef.current?.click()} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
              <Upload className="h-4 w-4 mr-2" /> Upload Files
            </Button>
            <input ref={inputRef} type="file" multiple className="hidden" onChange={handleFileSelect} />
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files, tags, summaries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          {allTags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {allTags.slice(0, 8).map((tag) => (
                <Badge
                  key={tag}
                  variant={filterTag === tag ? "default" : "outline"}
                  className="cursor-pointer text-xs"
                  onClick={() => setFilterTag(filterTag === tag ? null : tag)}
                >
                  {tag}
                  {filterTag === tag && <X className="ml-1 h-3 w-3" />}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Drop Zone */}
        <motion.div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300",
            dragOver
              ? "border-pink-500 bg-pink-500/5 scale-[1.01]"
              : "border-border hover:border-muted-foreground/40"
          )}
        >
          {uploading ? (
            <div className="space-y-3">
              <Sparkles className="h-8 w-8 mx-auto text-purple-500 animate-pulse" />
              <p className="text-sm font-medium text-foreground">Analyzing with AI...</p>
              <Progress value={60} className="max-w-xs mx-auto h-2" />
            </div>
          ) : (
            <>
              <FolderOpen className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground">
                Drag & drop files here, or{" "}
                <button onClick={() => inputRef.current?.click()} className="text-pink-500 hover:underline font-medium">
                  browse
                </button>
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">PDFs, images, docs, code — anything goes</p>
            </>
          )}
        </motion.div>

        {/* Files Grid/List */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))}
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-16">
            <Brain className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">{files.length === 0 ? "No files yet. Upload your first file!" : "No files match your search."}</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredFiles.map((file, i) => {
                const category = getCategory(file);
                const Icon = FILE_ICONS[category] || FileText;
                return (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Card className="card-hover group border-border/50 hover:border-pink-500/30">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                            <Icon className="h-5 w-5 text-purple-500" />
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => downloadFile(file.storage_path, file.file_name)}>
                              <Download className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteFile(file.id, file.storage_path)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground truncate">{file.file_name}</p>
                          <p className="text-xs text-muted-foreground">{formatSize(file.file_size)}</p>
                        </div>
                        {file.ai_summary && (
                          <p className="text-xs text-muted-foreground/80 line-clamp-2">{file.ai_summary}</p>
                        )}
                        {file.ai_tags && file.ai_tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {file.ai_tags.slice(0, 4).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                                <Tag className="h-2.5 w-2.5 mr-0.5" />{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredFiles.map((file) => {
              const category = getCategory(file);
              const Icon = FILE_ICONS[category] || FileText;
              return (
                <Card key={file.id} className="card-hover group">
                  <CardContent className="p-3 flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 shrink-0">
                      <Icon className="h-4 w-4 text-purple-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.file_name}</p>
                      <p className="text-xs text-muted-foreground truncate">{file.ai_summary || formatSize(file.file_size)}</p>
                    </div>
                    <div className="flex gap-1">
                      {file.ai_tags?.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => downloadFile(file.storage_path, file.file_name)}>
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteFile(file.id, file.storage_path)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Stats */}
        {files.length > 0 && (
          <div className="flex items-center gap-6 text-xs text-muted-foreground pt-4 border-t border-border">
            <span>{files.length} files</span>
            <span>{formatSize(files.reduce((a, f) => a + f.file_size, 0))} total</span>
            <span>{allTags.length} unique tags</span>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
