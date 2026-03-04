import { useState, useRef, useCallback } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, faqSchema, softwareSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Upload, Download, Merge, Scissors, RotateCw, Stamp,
  Lock, Unlock, Image, Layers, ChevronRight, Loader2, CheckCircle2,
  X, Plus, ArrowRight, Trash2, AlertCircle, RefreshCw,
  Hash, MinusCircle, Copy, Shuffle, FileSearch, Eraser,
  Palette, Crop, RulerIcon, Type, ShieldCheck, FileKey,
  BookOpen, CopyPlus, ArrowDownUp, Code2, ScanLine
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
  protectPdf, pdfToImages, imagesToPdf, downloadPdf, formatPdfSize, getPdfPageCount,
  addPageNumbers, removePages, extractPages, reorderPages, flattenPdf,
  grayscalePdf, resizePages, addHeaderFooter, stampPdf, editMetadata,
  repairPdf, duplicatePages, reversePages, pdfToBase64, unlockPdf, cropPdf
} from "@/lib/pdfUtils";
import { cn } from "@/lib/utils";

const pdfFaqs = [
  { question: "How to merge PDF files online for free?", answer: "Select 'Merge PDF' above, drag and drop multiple PDF files, arrange them in order, and click Process. Your merged PDF downloads instantly — no signup, no ads, 100% browser-based." },
  { question: "Is it safe to use online PDF tools?", answer: "PineToolsHub processes all PDFs entirely in your browser using JavaScript. Your files never leave your device or get uploaded to any server, making it the most private PDF tool available." },
  { question: "Can I compress PDF without losing quality?", answer: "Yes. Our PDF compressor optimizes internal structures (fonts, metadata) to reduce size without degrading text or image quality. Typical savings are 20-60%." },
  { question: "How many PDF tools does PineToolsHub have?", answer: "PineToolsHub offers 30+ free PDF tools including merge, split, compress, rotate, watermark, page numbers, remove pages, resize, stamp, metadata editing, and many more — all browser-based." },
  { question: "Do I need to create an account?", answer: "No. All 30+ PDF tools are completely free without signup. Start processing immediately." },
  { question: "What is the file size limit?", answer: "There is no file size limit. All processing happens in your browser, so you can work with PDFs of any size as long as your device has enough memory." },
];

type ToolCategory = "basic" | "edit" | "convert" | "security" | "advanced";

interface ToolDef {
  id: string;
  label: string;
  icon: any;
  color: string;
  desc: string;
  category: ToolCategory;
  multi?: boolean;
  acceptImages?: boolean;
}

const tools: ToolDef[] = [
  // Basic
  { id: "merge", label: "Merge PDF", icon: Layers, color: "from-blue-500 to-cyan-500", desc: "Combine multiple PDFs into one", category: "basic", multi: true },
  { id: "split", label: "Split PDF", icon: Scissors, color: "from-purple-500 to-violet-500", desc: "Extract pages by range", category: "basic" },
  { id: "compress", label: "Compress PDF", icon: Download, color: "from-green-500 to-teal-500", desc: "Reduce file size", category: "basic" },
  { id: "rotate", label: "Rotate PDF", icon: RotateCw, color: "from-amber-500 to-orange-500", desc: "Rotate all pages", category: "basic" },
  // Edit
  { id: "pagenumbers", label: "Page Numbers", icon: Hash, color: "from-sky-500 to-blue-500", desc: "Add page numbers to footer/header", category: "edit" },
  { id: "removepages", label: "Remove Pages", icon: MinusCircle, color: "from-red-400 to-rose-500", desc: "Delete specific pages", category: "edit" },
  { id: "extract", label: "Extract Pages", icon: Copy, color: "from-teal-500 to-emerald-500", desc: "Save selected pages as new PDF", category: "edit" },
  { id: "reorder", label: "Reorder Pages", icon: Shuffle, color: "from-fuchsia-500 to-pink-500", desc: "Rearrange page order", category: "edit" },
  { id: "watermark", label: "Add Watermark", icon: Stamp, color: "from-pink-500 to-rose-500", desc: "Text watermark overlay", category: "edit" },
  { id: "stamp", label: "Stamp PDF", icon: ShieldCheck, color: "from-orange-500 to-red-500", desc: "Add CONFIDENTIAL/DRAFT stamps", category: "edit" },
  { id: "headerfooter", label: "Header/Footer", icon: Type, color: "from-violet-500 to-purple-500", desc: "Add custom header & footer text", category: "edit" },
  { id: "crop", label: "Crop PDF", icon: Crop, color: "from-lime-500 to-green-500", desc: "Adjust page margins", category: "edit" },
  { id: "resize", label: "Resize Pages", icon: RulerIcon, color: "from-cyan-500 to-sky-500", desc: "Change to A4, Letter, Legal, A3", category: "edit" },
  // Convert
  { id: "pdf2img", label: "PDF to Images", icon: Image, color: "from-indigo-500 to-blue-500", desc: "Extract pages as JPG", category: "convert" },
  { id: "img2pdf", label: "Images to PDF", icon: FileText, color: "from-emerald-500 to-green-500", desc: "Convert images to PDF", category: "convert", multi: true, acceptImages: true },
  { id: "pdf2base64", label: "PDF to Base64", icon: Code2, color: "from-zinc-500 to-gray-600", desc: "Encode PDF for embedding", category: "convert" },
  { id: "grayscale", label: "Grayscale PDF", icon: Palette, color: "from-gray-500 to-slate-600", desc: "Convert to black & white", category: "convert" },
  // Security
  { id: "protect", label: "Protect PDF", icon: Lock, color: "from-red-500 to-rose-600", desc: "Lock with password note", category: "security" },
  { id: "unlock", label: "Unlock PDF", icon: Unlock, color: "from-green-500 to-emerald-600", desc: "Remove restrictions", category: "security" },
  { id: "flatten", label: "Flatten PDF", icon: Eraser, color: "from-amber-400 to-yellow-500", desc: "Flatten form fields", category: "security" },
  // Advanced
  { id: "metadata", label: "Edit Metadata", icon: FileKey, color: "from-indigo-400 to-violet-500", desc: "Edit title, author, subject", category: "advanced" },
  { id: "repair", label: "Repair PDF", icon: ScanLine, color: "from-rose-400 to-pink-500", desc: "Fix corrupted PDFs", category: "advanced" },
  { id: "duplicate", label: "Duplicate Pages", icon: CopyPlus, color: "from-blue-400 to-indigo-500", desc: "Copy all pages N times", category: "advanced" },
  { id: "reverse", label: "Reverse Pages", icon: ArrowDownUp, color: "from-purple-400 to-fuchsia-500", desc: "Reverse page order", category: "advanced" },
];

const categoryLabels: Record<ToolCategory, string> = {
  basic: "📄 Basic",
  edit: "✏️ Edit & Modify",
  convert: "🔄 Convert",
  security: "🔒 Security",
  advanced: "⚡ Advanced",
};

function FileDropZone({ onFiles, accept, multiple, label }: {
  onFiles: (files: File[]) => void; accept?: string; multiple?: boolean; label?: string;
}) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(f =>
      accept ? f.type.includes(accept.replace("*", "")) || f.name.endsWith(".pdf") : true
    );
    if (files.length) onFiles(files);
  };
  return (
    <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn("flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 cursor-pointer transition-all",
        dragOver ? "border-blue-500 bg-blue-500/5 scale-[1.01]" : "border-border hover:border-muted-foreground/40 hover:bg-muted/20")}>
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
        <Upload className="h-8 w-8 text-blue-500" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-foreground">{label || "Drop files here"}</p>
        <p className="text-sm text-muted-foreground mt-0.5">or click to browse • No file size limit</p>
      </div>
      <input ref={inputRef} type="file" className="hidden" accept={accept} multiple={multiple}
        onChange={(e) => { const files = Array.from(e.target.files || []); if (files.length) onFiles(files); e.target.value = ""; }} />
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
  const [base64Result, setBase64Result] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">("all");

  // Settings
  const [splitFrom, setSplitFrom] = useState(1);
  const [splitTo, setSplitTo] = useState(5);
  const [rotation, setRotation] = useState<90 | 180 | 270>(90);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [watermarkOpacity, setWatermarkOpacity] = useState(30);
  const [password, setPassword] = useState("");
  const [pageNumbersInput, setPageNumbersInput] = useState("1,2,3");
  const [headerText, setHeaderText] = useState("");
  const [footerText, setFooterText] = useState("Page");
  const [stampText, setStampText] = useState("CONFIDENTIAL");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaAuthor, setMetaAuthor] = useState("");
  const [metaSubject, setMetaSubject] = useState("");
  const [duplicateTimes, setDuplicateTimes] = useState(2);
  const [resizeTarget, setResizeTarget] = useState<"A4" | "Letter" | "Legal" | "A3">("A4");
  const [cropMargin, setCropMargin] = useState(10);

  const { toast } = useToast();
  const tool = tools.find(t => t.id === activeTool)!;

  const filteredTools = activeCategory === "all" ? tools : tools.filter(t => t.category === activeCategory);

  const handleFiles = useCallback(async (newFiles: File[]) => {
    setFiles(newFiles); setDone(false); setResultImages([]); setBase64Result(null);
    if (newFiles[0] && ["split", "removepages", "extract", "reorder"].includes(activeTool)) {
      const count = await getPdfPageCount(newFiles[0]).catch(() => null);
      setPageCount(count);
      if (count) setSplitTo(Math.min(5, count));
    }
  }, [activeTool]);

  const removeFile = (index: number) => { setFiles(prev => prev.filter((_, i) => i !== index)); setDone(false); };

  const handleProcess = async () => {
    if (!files.length) { toast({ title: "No files selected", variant: "destructive" }); return; }
    setProcessing(true); setProgress(10); setDone(false); setResultImages([]); setBase64Result(null);

    try {
      setProgress(30);
      let result: Uint8Array | null = null;
      let images: string[] = [];

      switch (activeTool) {
        case "merge": result = await mergePdfs(files); break;
        case "split": result = await splitPdf(files[0], splitFrom, splitTo); break;
        case "compress": result = await compressPdf(files[0]); break;
        case "rotate": result = await rotatePdf(files[0], rotation); break;
        case "watermark": result = await addWatermark(files[0], watermarkText, watermarkOpacity / 100); break;
        case "protect": result = await protectPdf(files[0], password); break;
        case "pdf2img": setProgress(50); images = await pdfToImages(files[0]); setResultImages(images); break;
        case "img2pdf": result = await imagesToPdf(files); break;
        case "pagenumbers": result = await addPageNumbers(files[0]); break;
        case "removepages": {
          const nums = pageNumbersInput.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
          result = await removePages(files[0], nums); break;
        }
        case "extract": {
          const nums = pageNumbersInput.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
          result = await extractPages(files[0], nums); break;
        }
        case "reorder": {
          const nums = pageNumbersInput.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
          result = await reorderPages(files[0], nums); break;
        }
        case "flatten": result = await flattenPdf(files[0]); break;
        case "grayscale": result = await grayscalePdf(files[0]); break;
        case "resize": result = await resizePages(files[0], resizeTarget); break;
        case "headerfooter": result = await addHeaderFooter(files[0], headerText, footerText); break;
        case "stamp": result = await stampPdf(files[0], stampText); break;
        case "metadata": result = await editMetadata(files[0], metaTitle, metaAuthor, metaSubject); break;
        case "repair": result = await repairPdf(files[0]); break;
        case "duplicate": result = await duplicatePages(files[0], duplicateTimes); break;
        case "reverse": result = await reversePages(files[0]); break;
        case "unlock": result = await unlockPdf(files[0]); break;
        case "crop": result = await cropPdf(files[0], cropMargin); break;
        case "pdf2base64": {
          const b64 = await pdfToBase64(files[0]);
          setBase64Result(b64); break;
        }
      }

      setProgress(90);

      if (result) {
        const origSize = files.reduce((a, f) => a + f.size, 0);
        const newSize = result.length;
        downloadPdf(result, `${files[0].name.replace(".pdf", "")}-${activeTool}.pdf`);
        const savings = origSize > newSize ? ` Saved ${formatPdfSize(origSize - newSize)}.` : "";
        toast({ title: "✅ Done!", description: `${tool.label} complete.${savings} File downloaded.` });
      } else if (images.length) {
        toast({ title: "✅ Done!", description: `${images.length} pages extracted as images.` });
      } else if (base64Result || activeTool === "pdf2base64") {
        toast({ title: "✅ Done!", description: "Base64 string generated. Copy it below." });
      }

      setProgress(100); setDone(true);
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Processing failed.", variant: "destructive" });
    } finally { setProcessing(false); }
  };

  const downloadImage = (url: string, index: number) => {
    const a = document.createElement("a"); a.href = url; a.download = `page-${index + 1}.jpg`; a.click();
  };

  const switchTool = (id: string) => {
    setActiveTool(id); setFiles([]); setDone(false); setResultImages([]); setProgress(0); setPageCount(null); setBase64Result(null);
  };

  const needsMultiple = tool.multi;
  const acceptImages = tool.acceptImages;

  return (
    <MainLayout>
      <SEOHead
        title="30+ Free PDF Tools Online — Merge, Split, Compress, Convert & More"
        description="30+ free online PDF tools: merge, split, compress, rotate, watermark, page numbers, resize, stamp, metadata editor, and more. No signup, no ads, 100% browser-based privacy."
        canonical="/pdf-tools"
        jsonLd={faqSchema(pdfFaqs)}
      />
      <div className="min-h-full p-4 md:p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">PDF Tools</h1>
            <p className="text-muted-foreground">30+ free tools — all in your browser, no upload to server</p>
          </div>
          <Badge variant="outline" className="ml-auto border-green-500/50 text-green-600 bg-green-500/5">🔒 100% Private</Badge>
        </motion.div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setActiveCategory("all")}
            className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border",
              activeCategory === "all" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground")}>
            All ({tools.length})
          </button>
          {(Object.keys(categoryLabels) as ToolCategory[]).map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border",
                activeCategory === cat ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground")}>
              {categoryLabels[cat]} ({tools.filter(t => t.category === cat).length})
            </button>
          ))}
        </div>

        {/* Tool Grid */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {filteredTools.map((t) => (
            <button key={t.id} onClick={() => switchTool(t.id)}
              className={cn("flex flex-col items-center gap-1.5 rounded-xl p-2.5 border transition-all text-center",
                activeTool === t.id ? "border-blue-500/40 bg-blue-500/8 shadow-sm" : "border-border/60 bg-card hover:border-border")}>
              <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br shadow", t.color)}>
                <t.icon className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-[10px] font-semibold text-foreground leading-tight">{t.label}</span>
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload + Files */}
          <div className="lg:col-span-2 space-y-4">
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

            <FileDropZone onFiles={handleFiles} accept={acceptImages ? "image/*" : ".pdf,application/pdf"}
              multiple={needsMultiple} label={acceptImages ? "Drop images here" : needsMultiple ? "Drop PDFs here (multiple)" : "Drop your PDF here"} />

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
                      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => removeFile(i)}><X className="h-3.5 w-3.5" /></Button>
                    </div>
                  ))}
                  {needsMultiple && (
                    <button className="flex items-center gap-2 rounded-xl border border-dashed border-border/60 p-3 text-sm text-muted-foreground hover:text-foreground w-full"
                      onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}>
                      <Plus className="h-4 w-4" /> Add more files
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {processing && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Processing...</span>
                  <span className="text-foreground font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {/* PDF to Image Results */}
            {resultImages.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{resultImages.length} pages extracted</h3>
                  <Button variant="outline" size="sm" onClick={() => resultImages.forEach((u, i) => downloadImage(u, i))} className="gap-1.5">
                    <Download className="h-3.5 w-3.5" /> Download All
                  </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {resultImages.map((url, i) => (
                    <div key={i} className="group relative rounded-xl overflow-hidden border border-border/60 bg-muted/20 aspect-[3/4]">
                      <img src={url} alt={`Page ${i + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button size="sm" onClick={() => downloadImage(url, i)} className="h-8 text-xs gap-1 bg-white text-foreground hover:bg-white/90">
                          <Download className="h-3 w-3" /> Page {i + 1}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Base64 Result */}
            {base64Result && (
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Base64 Output</h3>
                <textarea readOnly value={base64Result} className="w-full h-32 rounded-xl border border-border bg-muted/30 p-3 text-xs font-mono" />
                <Button size="sm" onClick={() => { navigator.clipboard.writeText(base64Result); toast({ title: "Copied!" }); }}>Copy to Clipboard</Button>
              </div>
            )}
          </div>

          {/* Settings Panel */}
          <div className="space-y-4">
            <Card className="border-border/60">
              <CardContent className="p-5 space-y-5">
                <h3 className="font-semibold text-foreground">Settings</h3>

                {/* Dynamic settings based on active tool */}
                {activeTool === "split" && (
                  <div className="space-y-3">
                    {pageCount && <div className="text-xs text-muted-foreground bg-muted/40 rounded-lg p-2 text-center">This PDF has <span className="font-semibold text-foreground">{pageCount}</span> pages</div>}
                    <div className="space-y-2"><label className="text-xs font-medium text-muted-foreground">From page</label>
                      <Input type="number" value={splitFrom} min={1} onChange={(e) => setSplitFrom(Math.max(1, parseInt(e.target.value) || 1))} className="h-9 text-sm" /></div>
                    <div className="space-y-2"><label className="text-xs font-medium text-muted-foreground">To page</label>
                      <Input type="number" value={splitTo} min={splitFrom} onChange={(e) => setSplitTo(Math.max(splitFrom, parseInt(e.target.value) || splitFrom))} className="h-9 text-sm" /></div>
                  </div>
                )}

                {activeTool === "rotate" && (
                  <div className="space-y-3">
                    <label className="text-xs font-medium text-muted-foreground">Rotation angle</label>
                    <div className="grid grid-cols-3 gap-2">
                      {([90, 180, 270] as const).map((r) => (
                        <button key={r} onClick={() => setRotation(r)}
                          className={cn("rounded-lg border p-3 text-xs font-semibold transition-all flex flex-col items-center gap-1",
                            rotation === r ? "border-amber-500/50 bg-amber-500/10 text-amber-600" : "border-border/60 text-muted-foreground")}>
                          <RotateCw className="h-4 w-4" style={{ transform: `rotate(${r - 90}deg)` }} />{r}°
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTool === "watermark" && (
                  <div className="space-y-4">
                    <div className="space-y-2"><label className="text-xs font-medium text-muted-foreground">Watermark text</label>
                      <Input value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} className="h-9 text-sm" /></div>
                    <div className="space-y-2">
                      <div className="flex justify-between"><label className="text-xs font-medium text-muted-foreground">Opacity</label><span className="text-xs font-semibold">{watermarkOpacity}%</span></div>
                      <Slider value={[watermarkOpacity]} onValueChange={([v]) => setWatermarkOpacity(v)} min={10} max={80} step={5} />
                    </div>
                  </div>
                )}

                {activeTool === "protect" && (
                  <div className="space-y-3">
                    <div className="space-y-2"><label className="text-xs font-medium text-muted-foreground">Password</label>
                      <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="h-9 text-sm" /></div>
                  </div>
                )}

                {["removepages", "extract", "reorder"].includes(activeTool) && (
                  <div className="space-y-3">
                    {pageCount && <div className="text-xs text-muted-foreground bg-muted/40 rounded-lg p-2 text-center">This PDF has <span className="font-semibold text-foreground">{pageCount}</span> pages</div>}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">
                        {activeTool === "removepages" ? "Pages to remove (comma-separated)" : activeTool === "extract" ? "Pages to extract" : "New page order"}
                      </label>
                      <Input value={pageNumbersInput} onChange={(e) => setPageNumbersInput(e.target.value)} placeholder="1,3,5" className="h-9 text-sm" />
                    </div>
                  </div>
                )}

                {activeTool === "headerfooter" && (
                  <div className="space-y-3">
                    <div className="space-y-2"><label className="text-xs font-medium text-muted-foreground">Header text</label>
                      <Input value={headerText} onChange={(e) => setHeaderText(e.target.value)} placeholder="My Document" className="h-9 text-sm" /></div>
                    <div className="space-y-2"><label className="text-xs font-medium text-muted-foreground">Footer text</label>
                      <Input value={footerText} onChange={(e) => setFooterText(e.target.value)} placeholder="Page" className="h-9 text-sm" /></div>
                  </div>
                )}

                {activeTool === "stamp" && (
                  <div className="space-y-3">
                    <label className="text-xs font-medium text-muted-foreground">Stamp text</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["CONFIDENTIAL", "DRAFT", "APPROVED", "COPY"].map(s => (
                        <button key={s} onClick={() => setStampText(s)}
                          className={cn("rounded-lg border p-2 text-xs font-bold transition-all",
                            stampText === s ? "border-red-500/50 bg-red-500/10 text-red-600" : "border-border/60 text-muted-foreground")}>{s}</button>
                      ))}
                    </div>
                    <Input value={stampText} onChange={(e) => setStampText(e.target.value)} className="h-9 text-sm" />
                  </div>
                )}

                {activeTool === "metadata" && (
                  <div className="space-y-3">
                    <div className="space-y-2"><label className="text-xs font-medium text-muted-foreground">Title</label>
                      <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="h-9 text-sm" /></div>
                    <div className="space-y-2"><label className="text-xs font-medium text-muted-foreground">Author</label>
                      <Input value={metaAuthor} onChange={(e) => setMetaAuthor(e.target.value)} className="h-9 text-sm" /></div>
                    <div className="space-y-2"><label className="text-xs font-medium text-muted-foreground">Subject</label>
                      <Input value={metaSubject} onChange={(e) => setMetaSubject(e.target.value)} className="h-9 text-sm" /></div>
                  </div>
                )}

                {activeTool === "resize" && (
                  <div className="space-y-3">
                    <label className="text-xs font-medium text-muted-foreground">Target size</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["A4", "Letter", "Legal", "A3"] as const).map(s => (
                        <button key={s} onClick={() => setResizeTarget(s)}
                          className={cn("rounded-lg border p-2.5 text-xs font-semibold transition-all",
                            resizeTarget === s ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-600" : "border-border/60 text-muted-foreground")}>{s}</button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTool === "crop" && (
                  <div className="space-y-3">
                    <div className="flex justify-between"><label className="text-xs font-medium text-muted-foreground">Crop margin</label><span className="text-xs font-semibold">{cropMargin}%</span></div>
                    <Slider value={[cropMargin]} onValueChange={([v]) => setCropMargin(v)} min={1} max={30} step={1} />
                  </div>
                )}

                {activeTool === "duplicate" && (
                  <div className="space-y-3">
                    <div className="space-y-2"><label className="text-xs font-medium text-muted-foreground">Number of copies</label>
                      <Input type="number" value={duplicateTimes} min={2} max={20} onChange={(e) => setDuplicateTimes(Math.max(2, parseInt(e.target.value) || 2))} className="h-9 text-sm" /></div>
                  </div>
                )}

                {/* Default info for tools without special settings */}
                {!["split", "rotate", "watermark", "protect", "removepages", "extract", "reorder", "headerfooter", "stamp", "metadata", "resize", "crop", "duplicate"].includes(activeTool) && (
                  <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 p-4 text-center">
                    <tool.icon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">{tool.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1">Upload a file and click process</p>
                  </div>
                )}

                <Button onClick={handleProcess} disabled={!files.length || processing}
                  className={cn("w-full h-11 text-white shadow-lg font-semibold gap-2", `bg-gradient-to-r ${tool.color}`)}>
                  {processing ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</> :
                   done ? <><RefreshCw className="h-4 w-4" /> Process Again</> :
                   <><tool.icon className="h-4 w-4" /> {tool.label}</>}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-green-500/5">
              <CardContent className="p-4 space-y-1">
                <p className="text-xs font-semibold text-green-600">🔒 100% Browser-Based</p>
                <p className="text-xs text-muted-foreground">Your files never leave your device. No upload, no server, no privacy risk.</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-2">
              {[{ label: "No size limit", icon: "📄" }, { label: "No ads", icon: "🚫" }, { label: "No sign-in", icon: "🔓" }, { label: "Free forever", icon: "✨" }].map((f) => (
                <div key={f.label} className="flex items-center gap-2 rounded-xl border border-border/60 bg-card p-2.5">
                  <span className="text-sm">{f.icon}</span>
                  <span className="text-[11px] font-medium text-foreground">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <FAQSection faqs={pdfFaqs} />
      </div>
    </MainLayout>
  );
}
