import { useState, useRef, useCallback } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, faqSchema, softwareSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Upload, Download, Merge, Scissors, RotateCw, Stamp,
  Lock, Unlock, Image, Layers, ChevronRight, Loader2, CheckCircle2,
  X, Plus, ArrowRight, Trash2, AlertCircle, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  mergePdfs, splitPdf, rotatePdf, addWatermark, compressPdf,
  protectPdf, pdfToImages, imagesToPdf, downloadPdf, formatPdfSize, getPdfPageCount
} from "@/lib/pdfUtils";
import { cn } from "@/lib/utils";

const pdfFaqs = [
  { question: "How to merge PDF files online for free?", answer: "Select 'Merge PDF' above, drag and drop multiple PDF files, arrange them in order, and click Process. Your merged PDF downloads instantly — no signup, no ads, 100% browser-based." },
  { question: "Is it safe to use online PDF tools?", answer: "PineToolsHub processes all PDFs entirely in your browser using JavaScript. Your files never leave your device or get uploaded to any server, making it the most private PDF tool available." },
  { question: "Can I compress PDF without losing quality?", answer: "Yes. Our PDF compressor optimizes internal structures (fonts, metadata) to reduce size without degrading text or image quality. Typical savings are 20-60%." },
  { question: "How to convert PDF to images?", answer: "Select 'PDF to Images', upload your PDF, and each page is extracted as a high-quality JPG. Download individual pages or all at once." },
  { question: "Do I need to create an account?", answer: "No. All 8 PDF tools are completely free without signup. Start processing immediately." },
];

const tools = [
  { id: "merge", label: "Merge PDF", icon: Layers, color: "from-blue-500 to-cyan-500", desc: "Combine multiple PDFs into one" },
  { id: "split", label: "Split PDF", icon: Scissors, color: "from-purple-500 to-violet-500", desc: "Extract pages by range" },
  { id: "compress", label: "Compress PDF", icon: Download, color: "from-green-500 to-teal-500", desc: "Reduce file size" },
  { id: "rotate", label: "Rotate PDF", icon: RotateCw, color: "from-amber-500 to-orange-500", desc: "Rotate all pages" },
  { id: "watermark", label: "Add Watermark", icon: Stamp, color: "from-pink-500 to-rose-500", desc: "Text watermark overlay" },
  { id: "protect", label: "Protect PDF", icon: Lock, color: "from-red-500 to-rose-600", desc: "Lock with password note" },
  { id: "pdf2img", label: "PDF to Images", icon: Image, color: "from-indigo-500 to-blue-500", desc: "Extract pages as JPG" },
  { id: "img2pdf", label: "Images to PDF", icon: FileText, color: "from-emerald-500 to-green-500", desc: "Convert images to PDF" },
];

function FileDropZone({ onFiles, accept, multiple, label }: {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
}) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(f =>
      accept ? f.type.includes(accept.replace("*", "")) || f.name.endsWith(".pdf") : true
    );
    if (files.length) onFiles(files);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 cursor-pointer transition-all",
        dragOver ? "border-blue-500 bg-blue-500/5 scale-[1.01]" : "border-border hover:border-muted-foreground/40 hover:bg-muted/20"
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
        <Upload className="h-8 w-8 text-blue-500" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-foreground">{label || "Drop files here"}</p>
        <p className="text-sm text-muted-foreground mt-0.5">or click to browse</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length) onFiles(files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export default function PDFToolsPage() {
  const [activeTool, setActiveTool] = useState("merge");
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [resultImages, setResultImages] = useState<string[]>([]);
  const [pageCount, setPageCount] = useState<number | null>(null);

  // Tool-specific settings
  const [splitFrom, setSplitFrom] = useState(1);
  const [splitTo, setSplitTo] = useState(5);
  const [rotation, setRotation] = useState<90 | 180 | 270>(90);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [watermarkOpacity, setWatermarkOpacity] = useState(30);
  const [password, setPassword] = useState("");

  const { toast } = useToast();
  const tool = tools.find(t => t.id === activeTool)!;

  const handleFiles = useCallback(async (newFiles: File[]) => {
    setFiles(newFiles);
    setDone(false);
    setResultImages([]);
    if (newFiles[0] && (activeTool === "split")) {
      const count = await getPdfPageCount(newFiles[0]).catch(() => null);
      setPageCount(count);
      if (count) setSplitTo(Math.min(5, count));
    }
  }, [activeTool]);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setDone(false);
  };

  const handleProcess = async () => {
    if (!files.length) {
      toast({ title: "No files selected", description: "Please upload file(s) first.", variant: "destructive" });
      return;
    }
    setProcessing(true);
    setProgress(10);
    setDone(false);
    setResultImages([]);

    try {
      setProgress(30);
      let result: Uint8Array | null = null;
      let images: string[] = [];

      switch (activeTool) {
        case "merge":
          result = await mergePdfs(files);
          break;
        case "split":
          result = await splitPdf(files[0], splitFrom, splitTo);
          break;
        case "compress":
          result = await compressPdf(files[0]);
          break;
        case "rotate":
          result = await rotatePdf(files[0], rotation);
          break;
        case "watermark":
          result = await addWatermark(files[0], watermarkText, watermarkOpacity / 100);
          break;
        case "protect":
          result = await protectPdf(files[0], password);
          break;
        case "pdf2img":
          setProgress(50);
          images = await pdfToImages(files[0]);
          setResultImages(images);
          break;
        case "img2pdf":
          result = await imagesToPdf(files);
          break;
      }

      setProgress(90);

      if (result) {
        const origSize = files.reduce((a, f) => a + f.size, 0);
        const newSize = result.length;
        const suffix = activeTool === "merge" ? "merged" : activeTool === "split" ? "split" : activeTool;
        downloadPdf(result, `${files[0].name.replace(".pdf", "")}-${suffix}.pdf`);
        const savings = origSize > newSize ? ` Saved ${formatPdfSize(origSize - newSize)}.` : "";
        toast({ title: "✅ Done!", description: `${tool.label} complete.${savings} File downloaded.` });
      } else if (images.length) {
        toast({ title: "✅ Done!", description: `${images.length} page${images.length > 1 ? "s" : ""} extracted as images.` });
      }

      setProgress(100);
      setDone(true);
    } catch (err: any) {
      console.error(err);
      toast({ title: "Error", description: err.message || "Processing failed. Try a different file.", variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  };

  const downloadImage = (url: string, index: number) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `page-${index + 1}.jpg`;
    a.click();
  };

  const downloadAllImages = () => {
    resultImages.forEach((url, i) => downloadImage(url, i));
  };

  const switchTool = (id: string) => {
    setActiveTool(id);
    setFiles([]);
    setDone(false);
    setResultImages([]);
    setProgress(0);
    setPageCount(null);
  };

  const needsMultiple = activeTool === "merge" || activeTool === "img2pdf";
  const acceptImages = activeTool === "img2pdf";

  return (
    <MainLayout>
      <SEOHead
        title="Free PDF Tools Online — Merge, Split, Compress, Convert"
        description="8 free online PDF tools: merge, split, compress, rotate, watermark, protect, PDF to images, images to PDF. No signup, no ads, 100% browser-based privacy."
        canonical="/pdf-tools"
        jsonLd={faqSchema(pdfFaqs)}
      />
      <div className="min-h-full p-6 md:p-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">PDF Tools</h1>
            <p className="text-muted-foreground">Free, powerful PDF processing — all in your browser, no upload to server</p>
          </div>
          <Badge variant="outline" className="ml-auto border-green-500/50 text-green-600 bg-green-500/5">
            🔒 100% Private
          </Badge>
        </motion.div>

        {/* Tool Grid */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => switchTool(t.id)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl p-3 border transition-all text-center",
                activeTool === t.id
                  ? "border-blue-500/40 bg-blue-500/8 shadow-sm"
                  : "border-border/60 bg-card hover:border-border"
              )}
            >
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br shadow", t.color)}>
                <t.icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-[11px] font-semibold text-foreground leading-tight">{t.label}</span>
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload + Files */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
            className="lg:col-span-2 space-y-4">

            {/* Tool description */}
            <Card className="border-border/60 bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-md shrink-0", tool.color)}>
                  <tool.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{tool.label}</p>
                  <p className="text-sm text-muted-foreground">{tool.desc}</p>
                </div>
              </CardContent>
            </Card>

            {/* Drop Zone */}
            <FileDropZone
              onFiles={handleFiles}
              accept={acceptImages ? "image/*" : ".pdf,application/pdf"}
              multiple={needsMultiple}
              label={acceptImages ? "Drop images here" : needsMultiple ? "Drop PDFs here (multiple supported)" : "Drop your PDF here"}
            />

            {/* File List */}
            <AnimatePresence>
              {files.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 shrink-0">
                        <FileText className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{f.name}</p>
                        <p className="text-xs text-muted-foreground">{formatPdfSize(f.size)}</p>
                      </div>
                      {done && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />}
                      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => removeFile(i)}>
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                  {needsMultiple && (
                    <button
                      className="flex items-center gap-2 rounded-xl border border-dashed border-border/60 p-3 text-sm text-muted-foreground hover:border-border hover:text-foreground transition-colors w-full"
                      onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                    >
                      <Plus className="h-4 w-4" /> Add more files
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Processing Progress */}
            {processing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Processing...
                  </span>
                  <span className="text-foreground font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </motion.div>
            )}

            {/* PDF to Image Results */}
            <AnimatePresence>
              {resultImages.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{resultImages.length} pages extracted</h3>
                    <Button variant="outline" size="sm" onClick={downloadAllImages} className="gap-1.5">
                      <Download className="h-3.5 w-3.5" /> Download All
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {resultImages.map((url, i) => (
                      <div key={i} className="group relative rounded-xl overflow-hidden border border-border/60 bg-muted/20 aspect-[3/4]">
                        <img src={url} alt={`Page ${i + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="sm" onClick={() => downloadImage(url, i)} className="h-8 text-xs gap-1 bg-white text-foreground hover:bg-white/90">
                            <Download className="h-3 w-3" /> Page {i + 1}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Settings Panel */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="space-y-4">
            <Card className="border-border/60">
              <CardContent className="p-5 space-y-5">
                <h3 className="font-semibold text-foreground">Settings</h3>

                <AnimatePresence mode="wait">
                  {activeTool === "merge" && (
                    <motion.div key="merge" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                      <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
                        Upload multiple PDF files above. They'll be merged in the order they appear.
                      </div>
                      <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
                        <p className="text-xs text-blue-600 font-medium">💡 Tip</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Reorder files by removing and re-adding them in the desired order.</p>
                      </div>
                    </motion.div>
                  )}

                  {activeTool === "split" && (
                    <motion.div key="split" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      {pageCount && (
                        <div className="text-xs text-muted-foreground bg-muted/40 rounded-lg p-2 text-center">
                          This PDF has <span className="font-semibold text-foreground">{pageCount}</span> pages
                        </div>
                      )}
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">From page</label>
                        <Input type="number" value={splitFrom} min={1} max={pageCount || 999}
                          onChange={(e) => setSplitFrom(Math.max(1, parseInt(e.target.value) || 1))}
                          className="h-9 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">To page</label>
                        <Input type="number" value={splitTo} min={splitFrom} max={pageCount || 999}
                          onChange={(e) => setSplitTo(Math.max(splitFrom, parseInt(e.target.value) || splitFrom))}
                          className="h-9 text-sm" />
                      </div>
                    </motion.div>
                  )}

                  {activeTool === "rotate" && (
                    <motion.div key="rotate" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                      <label className="text-xs font-medium text-muted-foreground">Rotation angle</label>
                      <div className="grid grid-cols-3 gap-2">
                        {([90, 180, 270] as const).map((r) => (
                          <button
                            key={r}
                            onClick={() => setRotation(r)}
                            className={cn(
                              "rounded-lg border p-3 text-xs font-semibold transition-all flex flex-col items-center gap-1",
                              rotation === r ? "border-amber-500/50 bg-amber-500/10 text-amber-600" : "border-border/60 text-muted-foreground hover:border-border"
                            )}
                          >
                            <RotateCw className="h-4 w-4" style={{ transform: `rotate(${r - 90}deg)` }} />
                            {r}°
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTool === "watermark" && (
                    <motion.div key="watermark" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">Watermark text</label>
                        <Input value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)}
                          placeholder="CONFIDENTIAL" className="h-9 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-xs font-medium text-muted-foreground">Opacity</label>
                          <span className="text-xs font-semibold text-foreground">{watermarkOpacity}%</span>
                        </div>
                        <Slider value={[watermarkOpacity]} onValueChange={([v]) => setWatermarkOpacity(v)} min={10} max={80} step={5} />
                      </div>
                    </motion.div>
                  )}

                  {activeTool === "protect" && (
                    <motion.div key="protect" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">Password (for reference)</label>
                        <Input value={password} onChange={(e) => setPassword(e.target.value)}
                          type="password" placeholder="Enter password" className="h-9 text-sm" />
                      </div>
                      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                        <p className="text-xs text-amber-600 font-medium flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> Note
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">PDF encryption requires server-side tools. This marks the file as protected with a note.</p>
                      </div>
                    </motion.div>
                  )}

                  {(activeTool === "compress" || activeTool === "pdf2img" || activeTool === "img2pdf") && (
                    <motion.div key={activeTool} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                      <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 p-4 text-center">
                        <tool.icon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground">
                          {activeTool === "compress" ? "Removes redundant data and re-compresses the PDF" :
                           activeTool === "pdf2img" ? "Extracts each page as a high-quality JPG image" :
                           "Combines your images into a single PDF document"}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  onClick={handleProcess}
                  disabled={!files.length || processing}
                  className={cn(
                    "w-full h-11 text-white shadow-lg font-semibold gap-2",
                    `bg-gradient-to-r ${tool.color}`
                  )}
                >
                  {processing ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                  ) : done ? (
                    <><RefreshCw className="h-4 w-4" /> Process Again</>
                  ) : (
                    <><tool.icon className="h-4 w-4" /> {tool.label}</>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Privacy Banner */}
            <Card className="border-green-500/20 bg-green-500/5">
              <CardContent className="p-4 space-y-1">
                <p className="text-xs font-semibold text-green-600">🔒 100% Browser-Based</p>
                <p className="text-xs text-muted-foreground">Your files never leave your device. All processing happens locally — no upload, no server, no privacy risk.</p>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "No size limit", icon: "📄" },
                { label: "No ads", icon: "🚫" },
                { label: "No sign-in", icon: "🔓" },
                { label: "Free forever", icon: "✨" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-2 rounded-xl border border-border/60 bg-card p-3">
                  <span className="text-base">{f.icon}</span>
                  <span className="text-xs font-medium text-foreground">{f.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* FAQ Section for SEO */}
        <FAQSection faqs={pdfFaqs} />
      </div>
    </MainLayout>
  );
}
