import { useState, useRef, useCallback } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image, Upload, Download, RefreshCw, Maximize2, Minimize2,
  Crop, Zap, X, CheckCircle2, Loader2, Music,
  SlidersHorizontal, ArrowLeftRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  compressImage, resizeImage, convertImage, downloadBlob,
  getOutputFilename, formatBytes, getSavingsPercent, FORMAT_MAP,
  type ProcessResult,
} from "@/lib/imageUtils";

const tools = [
  { id: "resize", label: "Resize", icon: Maximize2, color: "from-blue-500 to-cyan-500", desc: "Change dimensions" },
  { id: "compress", label: "Compress", icon: Minimize2, color: "from-green-500 to-teal-500", desc: "Reduce file size" },
  { id: "convert", label: "Convert", icon: RefreshCw, color: "from-purple-500 to-pink-500", desc: "Change format" },
  { id: "optimize", label: "Optimize", icon: Zap, color: "from-indigo-500 to-purple-500", desc: "Web-ready output" },
];

const formats = ["JPEG", "PNG", "WEBP", "BMP"];
const aspectRatios = ["Free", "1:1", "4:3", "16:9", "3:2", "9:16"];

interface UploadedFile {
  file: File;
  preview: string;
  size: string;
  width: number;
  height: number;
}

export default function MediaToolsPage() {
  const [activeTool, setActiveTool] = useState("compress");
  const [uploaded, setUploaded] = useState<UploadedFile | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState("WEBP");
  const [ratio, setRatio] = useState("Free");
  const [lockAspect, setLockAspect] = useState(true);
  const [showComparison, setShowComparison] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/") && !file.type.startsWith("audio/")) {
      toast({ title: "Unsupported file", description: "Please upload an image file.", variant: "destructive" });
      return;
    }
    const preview = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
    };
    img.src = preview;
    setUploaded({ file, preview, size: formatBytes(file.size), width: img.naturalWidth || 0, height: img.naturalHeight || 0 });
    setResult(null);
    setShowComparison(false);
  }, [toast]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleWidthChange = (newWidth: number) => {
    if (lockAspect && uploaded && uploaded.width > 0) {
      const aspect = uploaded.height / uploaded.width;
      setHeight(Math.round(newWidth * aspect));
    }
    setWidth(newWidth);
  };

  const handleHeightChange = (newHeight: number) => {
    if (lockAspect && uploaded && uploaded.height > 0) {
      const aspect = uploaded.width / uploaded.height;
      setWidth(Math.round(newHeight * aspect));
    }
    setHeight(newHeight);
  };

  const handleProcess = async () => {
    if (!uploaded) return;
    setProcessing(true);
    setResult(null);

    try {
      let processResult: ProcessResult;

      if (activeTool === "resize") {
        processResult = await resizeImage(uploaded.file, width, height, quality);
      } else if (activeTool === "compress") {
        processResult = await compressImage(uploaded.file, quality);
      } else if (activeTool === "convert") {
        const mimeType = FORMAT_MAP[format] || "image/jpeg";
        processResult = await convertImage(uploaded.file, mimeType, quality);
      } else {
        // optimize: compress + convert to webp
        processResult = await convertImage(uploaded.file, "image/webp", quality);
      }

      setResult(processResult);
      setShowComparison(true);

      const savings = getSavingsPercent(processResult.originalSize, processResult.processedSize);
      const msg = savings > 0
        ? `Saved ${savings}% (${formatBytes(processResult.originalSize - processResult.processedSize)})`
        : `Size: ${formatBytes(processResult.processedSize)}`;
      toast({ title: "✅ Processing complete!", description: msg });
    } catch (err: any) {
      toast({ title: "Processing failed", description: err.message, variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !uploaded) return;
    const outputFormat = activeTool === "convert" ? FORMAT_MAP[format] : (uploaded.file.type as any) || "image/jpeg";
    const finalMime = (activeTool === "optimize" || activeTool === "convert") ? result.mimeType : outputFormat;
    const filename = getOutputFilename(uploaded.file.name, finalMime, activeTool);
    downloadBlob(result.blob, filename);
    toast({ title: "Downloaded!", description: filename });
  };

  const savings = result ? getSavingsPercent(result.originalSize, result.processedSize) : 0;

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
            <p className="text-muted-foreground">Real image processing — compress, resize, and convert with actual results</p>
          </div>
        </motion.div>

        {/* Tool Selector */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => { setActiveTool(tool.id); setResult(null); setShowComparison(false); }}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl p-3 border transition-all",
                activeTool === tool.id ? "border-amber-500/50 bg-amber-500/10 shadow-sm" : "border-border/60 bg-card hover:border-border"
              )}
            >
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br shadow", tool.color)}>
                <tool.icon className="h-4 w-4 text-white" />
              </div>
              <div className="text-center">
                <span className="text-xs font-semibold text-foreground block">{tool.label}</span>
                <span className="text-[10px] text-muted-foreground">{tool.desc}</span>
              </div>
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview + Comparison */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-2 space-y-4">
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
                  <p className="font-semibold text-foreground">Drop your image here</p>
                  <p className="text-sm text-muted-foreground mt-1">PNG, JPG, WEBP, BMP supported</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Real processing — actual file size reduction</p>
                </div>
                <input ref={inputRef} type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Before/After Comparison */}
                {showComparison && result ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <ArrowLeftRight className="h-4 w-4 text-amber-500" />
                        Before / After
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground text-center">Original</p>
                        <div className="rounded-xl overflow-hidden border border-border/60 bg-muted/20 aspect-video flex items-center justify-center">
                          <img src={uploaded.preview} alt="Original" className="max-w-full max-h-full object-contain" />
                        </div>
                        <p className="text-xs text-center text-muted-foreground">{formatBytes(uploaded.file.size)}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground text-center">Processed</p>
                        <div className="rounded-xl overflow-hidden border border-emerald-500/30 bg-muted/20 aspect-video flex items-center justify-center relative">
                          <img src={result.url} alt="Processed" className="max-w-full max-h-full object-contain" />
                          {savings > 0 && (
                            <Badge className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px]">
                              -{savings}%
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-center text-muted-foreground">
                          {formatBytes(result.processedSize)}
                          {savings > 0 && <span className="text-emerald-500 ml-1">(-{savings}%)</span>}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Card className="border-border/60 overflow-hidden">
                    <div className="relative bg-muted/30 flex items-center justify-center min-h-[300px]">
                      {uploaded.file.type.startsWith("image/") ? (
                        <img src={uploaded.preview} alt="Preview" className="max-w-full max-h-[350px] object-contain rounded-lg" />
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <Music className="h-16 w-16 text-muted-foreground" />
                          <audio src={uploaded.preview} controls />
                        </div>
                      )}
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Badge variant="secondary" className="text-xs">{uploaded.size}</Badge>
                        <Button variant="secondary" size="icon" className="h-7 w-7" onClick={() => { setUploaded(null); setResult(null); }}>
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}

                {/* File Info Bar */}
                <Card className="border-border/60">
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{uploaded.file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {uploaded.size} · {uploaded.width > 0 ? `${uploaded.width}×${uploaded.height}px` : ""}
                        {result && (
                          <span className="ml-2">
                            → {formatBytes(result.processedSize)} · {result.width}×{result.height}px
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => { setUploaded(null); setResult(null); setShowComparison(false); }}>
                        <RefreshCw className="h-3.5 w-3.5 mr-1" /> Change
                      </Button>
                      {result && (
                        <Button size="sm" onClick={handleDownload} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white gap-1">
                          <Download className="h-3.5 w-3.5" /> Download
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Real savings stats */}
                {result && savings > 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-foreground">{savings}%</p>
                        <p className="text-xs text-muted-foreground">Size reduced</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-emerald-600">{formatBytes(result.originalSize - result.processedSize)}</p>
                        <p className="text-xs text-muted-foreground">Bytes saved</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground">{result.width}×{result.height}</p>
                        <p className="text-xs text-muted-foreground">Output size</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
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
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-medium text-muted-foreground">Width (px)</label>
                          <button onClick={() => setLockAspect(!lockAspect)} className={cn("text-[10px] px-2 py-0.5 rounded-full border transition-colors", lockAspect ? "border-amber-500/50 bg-amber-500/10 text-amber-600" : "border-border/60 text-muted-foreground")}>
                            {lockAspect ? "🔒 Locked" : "🔓 Free"}
                          </button>
                        </div>
                        <Input type="number" value={width} onChange={(e) => handleWidthChange(+e.target.value)} className="h-9 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">Height (px)</label>
                        <Input type="number" value={height} onChange={(e) => handleHeightChange(+e.target.value)} className="h-9 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-xs font-medium text-muted-foreground">Quality</label>
                          <span className="text-xs font-semibold text-foreground">{quality}%</span>
                        </div>
                        <Slider value={[quality]} onValueChange={([v]) => setQuality(v)} min={10} max={100} step={5} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">Quick presets</label>
                        <div className="flex flex-wrap gap-1.5">
                          {[{ w: 1920, h: 1080, l: "FHD" }, { w: 1280, h: 720, l: "HD" }, { w: 800, h: 600, l: "Web" }, { w: 400, h: 400, l: "Thumb" }].map((p) => (
                            <Badge key={p.l} variant="outline" className="cursor-pointer text-[10px] hover:border-amber-500/50"
                              onClick={() => { setWidth(p.w); setHeight(p.h); setLockAspect(false); }}>
                              {p.l} {p.w}×{p.h}
                            </Badge>
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
                      <div className="space-y-1.5">
                        {[{ label: "Web (Fast)", q: 60 }, { label: "Balanced", q: 80 }, { label: "High Quality", q: 92 }].map((p) => (
                          <button key={p.label} onClick={() => setQuality(p.q)}
                            className={cn("w-full flex items-center justify-between rounded-lg border px-3 py-2 text-xs transition-colors", quality === p.q ? "border-amber-500/50 bg-amber-500/10 text-amber-600 font-medium" : "border-border/60 text-muted-foreground hover:border-border")}>
                            <span>{p.label}</span>
                            <span className="font-mono">{p.q}%</span>
                          </button>
                        ))}
                      </div>
                      <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                        Est. reduction: <span className="font-semibold text-foreground">~{100 - quality}%</span>
                      </div>
                    </motion.div>
                  )}

                  {activeTool === "convert" && (
                    <motion.div key="convert" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                      <label className="text-xs font-medium text-muted-foreground">Output Format</label>
                      <div className="grid grid-cols-2 gap-2">
                        {formats.map((f) => (
                          <button key={f} onClick={() => setFormat(f)}
                            className={cn("rounded-lg border p-2.5 text-xs font-semibold transition-all", format === f ? "border-purple-500/50 bg-purple-500/10 text-purple-600" : "border-border/60 text-muted-foreground hover:border-border")}>
                            {f}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-xs font-medium text-muted-foreground">Quality</label>
                          <span className="text-xs font-semibold text-foreground">{quality}%</span>
                        </div>
                        <Slider value={[quality]} onValueChange={([v]) => setQuality(v)} min={60} max={100} step={5} />
                      </div>
                    </motion.div>
                  )}

                  {activeTool === "optimize" && (
                    <motion.div key="optimize" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                      <div className="rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 p-4 text-center">
                        <Zap className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground">Smart Web Optimization</p>
                        <p className="text-xs text-muted-foreground mt-1">Converts to WEBP and compresses for maximum web performance</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-xs font-medium text-muted-foreground">Quality</label>
                          <span className="text-xs font-semibold text-foreground">{quality}%</span>
                        </div>
                        <Slider value={[quality]} onValueChange={([v]) => setQuality(v)} min={50} max={95} step={5} />
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
                  ) : result ? (
                    <><CheckCircle2 className="h-4 w-4 mr-2" /> Process Again</>
                  ) : (
                    <><Zap className="h-4 w-4 mr-2" /> Process File</>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
              <CardContent className="p-4 space-y-2">
                <p className="text-xs font-semibold text-foreground">⚡ Real Processing</p>
                <p className="text-xs text-muted-foreground">Files are processed locally in your browser using Canvas API. No uploads — 100% private.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
