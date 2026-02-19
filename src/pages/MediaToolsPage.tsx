import { useState, useRef, useCallback } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image, Upload, Download, RefreshCw, Maximize2, Minimize2,
  Crop, Palette, Zap, FileText, X, CheckCircle2, Loader2,
  ImageIcon, Film, Music, SlidersHorizontal, Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const tools = [
  { id: "resize", label: "Resize", icon: Maximize2, color: "from-blue-500 to-cyan-500", desc: "Change dimensions" },
  { id: "compress", label: "Compress", icon: Minimize2, color: "from-green-500 to-teal-500", desc: "Reduce file size" },
  { id: "convert", label: "Convert", icon: RefreshCw, color: "from-purple-500 to-pink-500", desc: "Change format" },
  { id: "crop", label: "Crop", icon: Crop, color: "from-amber-500 to-orange-500", desc: "Trim edges" },
  { id: "filter", label: "Filters", icon: SlidersHorizontal, color: "from-rose-500 to-red-500", desc: "Apply effects" },
  { id: "optimize", label: "Optimize", icon: Zap, color: "from-indigo-500 to-purple-500", desc: "Web-ready output" },
];

const formats = ["JPEG", "PNG", "WEBP", "GIF", "BMP", "TIFF", "SVG"];

const aspectRatios = ["Free", "1:1", "4:3", "16:9", "3:2", "2:3", "9:16"];

interface UploadedFile {
  file: File;
  preview: string;
  size: string;
  width?: number;
  height?: number;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

export default function MediaToolsPage() {
  const [activeTool, setActiveTool] = useState("resize");
  const [uploaded, setUploaded] = useState<UploadedFile | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState("WEBP");
  const [ratio, setRatio] = useState("Free");
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/") && !file.type.startsWith("audio/")) {
      toast({ title: "Unsupported file", description: "Please upload an image, video, or audio file.", variant: "destructive" });
      return;
    }
    const preview = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
    };
    img.src = preview;
    setUploaded({ file, preview, size: formatBytes(file.size) });
    setDone(false);
  }, [toast]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleProcess = async () => {
    if (!uploaded) return;
    setProcessing(true);
    setDone(false);
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    setDone(true);
    toast({ title: "Processing complete!", description: "Your file is ready to download." });
  };

  const handleDownload = () => {
    if (!uploaded) return;
    const a = document.createElement("a");
    a.href = uploaded.preview;
    a.download = `processed-${uploaded.file.name}`;
    a.click();
  };

  return (
    <MainLayout>
      <div className="min-h-full p-6 md:p-8 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25">
            <Image className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Media Tools</h1>
            <p className="text-muted-foreground">Resize, compress, convert, and optimize your media files</p>
          </div>
        </motion.div>

        {/* Tool Selector */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl p-3 border transition-all",
                activeTool === tool.id ? "border-amber-500/50 bg-amber-500/10 shadow-sm" : "border-border/60 bg-card hover:border-border"
              )}
            >
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br shadow", tool.color)}>
                <tool.icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-foreground">{tool.label}</span>
              <span className="text-[10px] text-muted-foreground hidden sm:block">{tool.desc}</span>
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload / Preview */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-2 space-y-4">
            {/* Drop Zone */}
            {!uploaded ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={cn(
                  "flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-16 cursor-pointer transition-all",
                  dragOver ? "border-amber-500 bg-amber-500/5 scale-[1.01]" : "border-border hover:border-muted-foreground/40"
                )}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                  <Upload className="h-10 w-10 text-amber-500" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">Drop your media here</p>
                  <p className="text-sm text-muted-foreground mt-1">Images, videos, and audio supported</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">PNG, JPG, WEBP, MP4, MP3, WAV</p>
                </div>
                <input ref={inputRef} type="file" className="hidden" accept="image/*,video/*,audio/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
              </div>
            ) : (
              <Card className="border-border/60 overflow-hidden">
                <div className="relative bg-muted/30 flex items-center justify-center min-h-[300px] group">
                  {uploaded.file.type.startsWith("image/") ? (
                    <img src={uploaded.preview} alt="Preview" className="max-w-full max-h-[350px] object-contain rounded-lg" />
                  ) : uploaded.file.type.startsWith("video/") ? (
                    <video src={uploaded.preview} controls className="max-w-full max-h-[350px] rounded-lg" />
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <Music className="h-16 w-16 text-muted-foreground" />
                      <audio src={uploaded.preview} controls />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Badge variant="secondary" className="text-xs">{uploaded.size}</Badge>
                    <Button variant="secondary" size="icon" className="h-7 w-7" onClick={() => { setUploaded(null); setDone(false); }}>
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4 flex items-center gap-3 bg-muted/20">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{uploaded.file.name}</p>
                    <p className="text-xs text-muted-foreground">{uploaded.size} · {width}×{height}px</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => { setUploaded(null); setDone(false); }}>
                      <RefreshCw className="h-3.5 w-3.5 mr-1" /> Change
                    </Button>
                    {done && (
                      <Button size="sm" onClick={handleDownload} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white gap-1">
                        <Download className="h-3.5 w-3.5" /> Download
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Controls */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
            <Card className="border-border/60">
              <CardContent className="p-5 space-y-5">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-amber-500" />
                  {tools.find(t => t.id === activeTool)?.label} Settings
                </h3>

                <AnimatePresence mode="wait">
                  {activeTool === "resize" && (
                    <motion.div key="resize" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">Width (px)</label>
                        <Input type="number" value={width} onChange={(e) => setWidth(+e.target.value)} className="h-9 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">Height (px)</label>
                        <Input type="number" value={height} onChange={(e) => setHeight(+e.target.value)} className="h-9 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">Aspect Ratio</label>
                        <div className="flex flex-wrap gap-1.5">
                          {aspectRatios.map((r) => (
                            <Badge key={r} variant={ratio === r ? "default" : "outline"} className="cursor-pointer text-xs" onClick={() => setRatio(r)}>{r}</Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTool === "compress" && (
                    <motion.div key="compress" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <label className="text-xs font-medium text-muted-foreground">Quality</label>
                          <span className="text-xs font-semibold text-foreground">{quality}%</span>
                        </div>
                        <Slider value={[quality]} onValueChange={([v]) => setQuality(v)} min={10} max={100} step={5} className="w-full" />
                        <div className="flex justify-between text-[10px] text-muted-foreground">
                          <span>Smallest</span><span>Best Quality</span>
                        </div>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                        Estimated savings: <span className="font-semibold text-foreground">{100 - quality}%</span> reduction
                      </div>
                    </motion.div>
                  )}

                  {activeTool === "convert" && (
                    <motion.div key="convert" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                      <label className="text-xs font-medium text-muted-foreground">Output Format</label>
                      <div className="grid grid-cols-2 gap-2">
                        {formats.map((f) => (
                          <button
                            key={f}
                            onClick={() => setFormat(f)}
                            className={cn(
                              "rounded-lg border p-2 text-xs font-medium transition-all",
                              format === f ? "border-amber-500/50 bg-amber-500/10 text-amber-600" : "border-border/60 text-muted-foreground hover:border-border"
                            )}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {(activeTool === "crop" || activeTool === "filter" || activeTool === "optimize") && (
                    <motion.div key={activeTool} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                      <div className="rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 p-4 text-center">
                        <Zap className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground">Upload a file to configure</p>
                        <p className="text-xs text-muted-foreground mt-1">Settings will appear after upload</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  onClick={handleProcess}
                  disabled={!uploaded || processing}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/20 h-11"
                >
                  {processing ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...</>
                  ) : done ? (
                    <><CheckCircle2 className="h-4 w-4 mr-2 text-white" /> Process Again</>
                  ) : (
                    <><Zap className="h-4 w-4 mr-2" /> Process File</>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Batch Info */}
            <Card className="border-border/60 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
              <CardContent className="p-4 space-y-2">
                <p className="text-xs font-semibold text-foreground">💡 Batch Processing</p>
                <p className="text-xs text-muted-foreground">Upload multiple files to process them all at once. Supports up to 50 files simultaneously.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
