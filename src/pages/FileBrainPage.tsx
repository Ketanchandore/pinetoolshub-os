import { useState, useCallback, useRef } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Upload, Search, FileText, Image, Film, Music, Code, Archive, Trash2,
  Download, Tag, Sparkles, FolderOpen, Grid3X3, List, Filter, X, MessageSquare,
  Layers, Scissors, RotateCw, Stamp, Lock, Palette, Hash, MinusCircle, Crop,
  RulerIcon, ArrowDownUp, ScanLine, Loader2, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { useFiles, FileRecord } from "@/hooks/useFiles";
import { useAuth } from "@/hooks/useAuth";
import { AIChatPanel } from "@/components/AIChatPanel";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  mergePdfs, compressPdf, rotatePdf, addWatermark, addPageNumbers,
  removePages, reversePages, repairPdf, downloadPdf, formatPdfSize
} from "@/lib/pdfUtils";
import {
  compressImage, resizeImage, convertImage, downloadBlob, getOutputFilename, formatBytes
} from "@/lib/imageUtils";

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

function getFileCategory(fileType: string): "pdf" | "image" | "video" | "other" {
  if (fileType.includes("pdf")) return "pdf";
  if (fileType.startsWith("image/")) return "image";
  if (fileType.startsWith("video/")) return "video";
  return "other";
}

interface LocalFile {
  file: File;
  id: string;
  name: string;
  size: number;
  type: string;
  category: "pdf" | "image" | "video" | "other";
}

const pdfTools = [
  { id: "compress", label: "Compress", icon: Download },
  { id: "rotate90", label: "Rotate 90°", icon: RotateCw },
  { id: "watermark", label: "Watermark", icon: Stamp },
  { id: "pagenumbers", label: "Page Numbers", icon: Hash },
  { id: "reverse", label: "Reverse Pages", icon: ArrowDownUp },
  { id: "repair", label: "Repair", icon: ScanLine },
];

const imageTools = [
  { id: "img-compress", label: "Compress", icon: Download },
  { id: "img-resize", label: "Resize 50%", icon: Crop },
  { id: "img-webp", label: "Convert WebP", icon: Palette },
  { id: "img-jpg", label: "Convert JPG", icon: Image },
];

const fileBrainFaqs = [
  { question: "What is File Brain?", answer: "File Brain is PineToolsHub's AI-powered file manager. Upload any file — PDF, image, video — and get AI-generated tags, summaries, and instant processing tools." },
  { question: "Is there a file size limit?", answer: "No. Upload files of any size. Local processing tools work in your browser with no limits." },
  { question: "Can I process files without signing up?", answer: "Yes. All local tools (compress, resize, convert, rotate) work without login. Sign up only if you want cloud storage." },
  { question: "What file types are supported?", answer: "All file types are supported for upload. PDF and image files get additional AI analysis and processing tools." },
];

export default function FileBrainPage() {
  const { user } = useAuth();
  const { files, loading, uploading, uploadFile, deleteFile, downloadFile } = useFiles();
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [chatFile, setChatFile] = useState<FileRecord | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Local files for processing without login
  const [localFiles, setLocalFiles] = useState<LocalFile[]>([]);
  const [selectedLocal, setSelectedLocal] = useState<string | null>(null);
  const [toolProcessing, setToolProcessing] = useState(false);
  const { toast } = useToast();

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
    // Add to local files for processing
    const newLocal = droppedFiles.map(f => ({
      file: f, id: `local-${Date.now()}-${Math.random()}`, name: f.name, size: f.size, type: f.type,
      category: getFileCategory(f.type),
    }));
    setLocalFiles(prev => [...prev, ...newLocal]);
    // Also upload to cloud if logged in
    if (user) droppedFiles.forEach(uploadFile);
  }, [uploadFile, user]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const newLocal = selected.map(f => ({
      file: f, id: `local-${Date.now()}-${Math.random()}`, name: f.name, size: f.size, type: f.type,
      category: getFileCategory(f.type),
    }));
    setLocalFiles(prev => [...prev, ...newLocal]);
    if (user) selected.forEach(uploadFile);
    e.target.value = "";
  };

  const selectedLocalFile = localFiles.find(f => f.id === selectedLocal);
  const toolsForSelected = selectedLocalFile?.category === "pdf" ? pdfTools : selectedLocalFile?.category === "image" ? imageTools : [];

  const runTool = async (toolId: string) => {
    if (!selectedLocalFile) return;
    setToolProcessing(true);
    try {
      const file = selectedLocalFile.file;
      if (toolId === "compress") {
        const result = await compressPdf(file);
        downloadPdf(result, `${file.name.replace(".pdf", "")}-compressed.pdf`);
        toast({ title: "✅ Compressed!", description: `Saved ${formatPdfSize(file.size - result.length)}` });
      } else if (toolId === "rotate90") {
        const result = await rotatePdf(file, 90);
        downloadPdf(result, `${file.name.replace(".pdf", "")}-rotated.pdf`);
        toast({ title: "✅ Rotated 90°!" });
      } else if (toolId === "watermark") {
        const result = await addWatermark(file, "CONFIDENTIAL", 0.3);
        downloadPdf(result, `${file.name.replace(".pdf", "")}-watermarked.pdf`);
        toast({ title: "✅ Watermark added!" });
      } else if (toolId === "pagenumbers") {
        const result = await addPageNumbers(file);
        downloadPdf(result, `${file.name.replace(".pdf", "")}-numbered.pdf`);
        toast({ title: "✅ Page numbers added!" });
      } else if (toolId === "reverse") {
        const result = await reversePages(file);
        downloadPdf(result, `${file.name.replace(".pdf", "")}-reversed.pdf`);
        toast({ title: "✅ Pages reversed!" });
      } else if (toolId === "repair") {
        const result = await repairPdf(file);
        downloadPdf(result, `${file.name.replace(".pdf", "")}-repaired.pdf`);
        toast({ title: "✅ PDF repaired!" });
      } else if (toolId === "img-compress") {
        const r = await compressImage(file, 70);
        downloadBlob(r.blob, getOutputFilename(file.name, r.mimeType, "compressed"));
        toast({ title: "✅ Compressed!", description: `${formatBytes(file.size)} → ${formatBytes(r.processedSize)}` });
      } else if (toolId === "img-resize") {
        const img = new window.Image();
        const url = URL.createObjectURL(file);
        await new Promise<void>((res) => { img.onload = () => res(); img.src = url; });
        const r = await resizeImage(file, Math.round(img.naturalWidth / 2), Math.round(img.naturalHeight / 2));
        URL.revokeObjectURL(url);
        downloadBlob(r.blob, getOutputFilename(file.name, r.mimeType, "resized"));
        toast({ title: "✅ Resized 50%!" });
      } else if (toolId === "img-webp") {
        const r = await convertImage(file, "image/webp", 85);
        downloadBlob(r.blob, getOutputFilename(file.name, "image/webp", "converted"));
        toast({ title: "✅ Converted to WebP!" });
      } else if (toolId === "img-jpg") {
        const r = await convertImage(file, "JPEG", 90);
        downloadBlob(r.blob, getOutputFilename(file.name, "image/jpeg", "converted"));
        toast({ title: "✅ Converted to JPG!" });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setToolProcessing(false);
    }
  };

  return (
    <MainLayout>
      <SEOHead
        title="File Brain — Free AI-Powered File Manager | Upload, Process & Organize Any File Online"
        description="Upload unlimited files — PDFs, images, videos, documents — with no size limits. AI auto-analyzes, tags and summarizes every file. Process files instantly with 30+ built-in tools: compress, resize, convert, rotate, watermark and more. Free, no signup required, 100% browser-based privacy."
        canonical="/file-brain"
        keywords="free ai file manager, upload files online free, ai file organizer, unlimited file upload, process pdf online, compress image online, file brain ai"
        jsonLd={faqSchema(fileBrainFaqs)}
      />
      <div className="space-y-6">
        <div className={cn("grid gap-6 transition-all", (chatFile || selectedLocal) ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1")}>
          {/* Main Content */}
          <div className={cn("space-y-6", (chatFile || selectedLocal) ? "lg:col-span-2" : "")}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  File Brain
                </h1>
                <p className="text-muted-foreground mt-1">Upload any file, process with AI tools — no limits, no signup</p>
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
                <Input placeholder="Search files, tags, summaries..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
              </div>
              {allTags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  {allTags.slice(0, 6).map((tag) => (
                    <Badge key={tag} variant={filterTag === tag ? "default" : "outline"} className="cursor-pointer text-xs"
                      onClick={() => setFilterTag(filterTag === tag ? null : tag)}>
                      {tag}{filterTag === tag && <X className="ml-1 h-3 w-3" />}
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
              className={cn("border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300",
                dragOver ? "border-pink-500 bg-pink-500/5 scale-[1.01]" : "border-border hover:border-muted-foreground/40")}>
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
                    Drag & drop files here, or <button onClick={() => inputRef.current?.click()} className="text-pink-500 hover:underline font-medium">browse</button>
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">PDFs, images, videos — no size limit • AI auto-analyzes everything</p>
                </>
              )}
            </motion.div>

            {/* Local Files (no login needed) */}
            {localFiles.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-500" /> Local Files — Click to process with tools →
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {localFiles.map((lf) => {
                    const Icon = lf.category === "pdf" ? FileText : lf.category === "image" ? Image : lf.category === "video" ? Film : Archive;
                    const isSelected = selectedLocal === lf.id;
                    return (
                      <Card key={lf.id} className={cn("cursor-pointer transition-all hover:border-purple-500/30", isSelected && "border-purple-500 shadow-lg shadow-purple-500/10")}
                        onClick={() => setSelectedLocal(isSelected ? null : lf.id)}>
                        <CardContent className="p-3 flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 shrink-0">
                            <Icon className="h-4 w-4 text-purple-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{lf.name}</p>
                            <p className="text-xs text-muted-foreground">{formatSize(lf.size)} • {lf.category.toUpperCase()}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={(e) => { e.stopPropagation(); setLocalFiles(prev => prev.filter(f => f.id !== lf.id)); if (isSelected) setSelectedLocal(null); }}>
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Cloud Files */}
            {user && (
              <>
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => <Skeleton key={i} className="h-48 rounded-xl" />)}
                  </div>
                ) : filteredFiles.length === 0 ? (
                  <div className="text-center py-12">
                    <Brain className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">{files.length === 0 ? "No cloud files yet. Upload to save with AI analysis!" : "No files match your search."}</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">☁️ Cloud Files (AI-analyzed)</h3>
                    <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-2"}>
                      <AnimatePresence>
                        {filteredFiles.map((file, i) => {
                          const category = getCategory(file);
                          const Icon = FILE_ICONS[category] || FileText;
                          const isActiveChat = chatFile?.id === file.id;
                          return (
                            <motion.div key={file.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                              <Card className={cn("card-hover group border-border/50 hover:border-pink-500/30", isActiveChat && "border-purple-500/50 shadow-lg")}>
                                <CardContent className="p-4 space-y-3">
                                  <div className="flex items-start justify-between">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                                      <Icon className="h-5 w-5 text-purple-500" />
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Button variant="ghost" size="icon" className="h-7 w-7 text-purple-500" onClick={() => setChatFile(isActiveChat ? null : file)}>
                                        <MessageSquare className="h-3.5 w-3.5" />
                                      </Button>
                                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => downloadFile(file.storage_path, file.file_name)}>
                                        <Download className="h-3.5 w-3.5" />
                                      </Button>
                                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => { deleteFile(file.id, file.storage_path); if (isActiveChat) setChatFile(null); }}>
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm text-foreground truncate">{file.file_name}</p>
                                    <p className="text-xs text-muted-foreground">{formatSize(file.file_size)}</p>
                                  </div>
                                  {file.ai_summary && <p className="text-xs text-muted-foreground/80 line-clamp-2">{file.ai_summary}</p>}
                                  {file.ai_tags && file.ai_tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                      {file.ai_tags.slice(0, 4).map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0"><Tag className="h-2.5 w-2.5 mr-0.5" />{tag}</Badge>
                                      ))}
                                    </div>
                                  )}
                                  <Button variant="ghost" size="sm"
                                    className={cn("w-full h-7 text-xs gap-1.5 border", isActiveChat ? "border-purple-500/50 text-purple-600 bg-purple-500/5" : "border-border/60 text-muted-foreground")}
                                    onClick={() => setChatFile(isActiveChat ? null : file)}>
                                    <MessageSquare className="h-3 w-3" />{isActiveChat ? "Close AI Chat" : "Chat with AI"}
                                  </Button>
                                </CardContent>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </>
            )}

            {!user && localFiles.length === 0 && (
              <div className="text-center py-12 space-y-3">
                <Brain className="h-12 w-12 mx-auto text-muted-foreground/30" />
                <p className="text-muted-foreground">Upload files above to start processing — no signup needed!</p>
                <p className="text-xs text-muted-foreground/60">Sign in to save files to cloud with AI analysis</p>
              </div>
            )}

            {files.length > 0 && (
              <div className="flex items-center gap-6 text-xs text-muted-foreground pt-4 border-t border-border">
                <span>{files.length} cloud files</span>
                <span>{formatSize(files.reduce((a, f) => a + f.file_size, 0))} total</span>
                <span>{allTags.length} unique tags</span>
              </div>
            )}
          </div>

          {/* Right Sidebar: Tools or AI Chat */}
          <AnimatePresence>
            {(selectedLocal && toolsForSelected.length > 0) && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="lg:col-span-1">
                <div className="sticky top-4 space-y-4">
                  <Card className="border-purple-500/30 shadow-lg shadow-purple-500/5">
                    <CardContent className="p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">🛠️ Tools</h3>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSelectedLocal(null)}><X className="h-3.5 w-3.5" /></Button>
                      </div>
                      <div className="rounded-lg bg-muted/40 p-3">
                        <p className="text-xs font-medium text-foreground truncate">{selectedLocalFile?.name}</p>
                        <p className="text-xs text-muted-foreground">{formatSize(selectedLocalFile?.size || 0)} • {selectedLocalFile?.category.toUpperCase()}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {toolsForSelected.map(tool => (
                          <Button key={tool.id} variant="outline" size="sm" disabled={toolProcessing}
                            className="h-auto py-3 flex-col gap-1.5 text-xs hover:border-purple-500/40 hover:bg-purple-500/5"
                            onClick={() => runTool(tool.id)}>
                            {toolProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <tool.icon className="h-4 w-4" />}
                            {tool.label}
                          </Button>
                        ))}
                      </div>
                      <p className="text-[10px] text-muted-foreground text-center">All processing happens in your browser</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
            {chatFile && !selectedLocal && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="lg:col-span-1">
                <div className="sticky top-4">
                  <AIChatPanel fileName={chatFile.file_name} aiSummary={chatFile.ai_summary || undefined} fileContext={JSON.stringify(chatFile.context)} onClose={() => setChatFile(null)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <FAQSection faqs={fileBrainFaqs} />
      </div>
    </MainLayout>
  );
}
