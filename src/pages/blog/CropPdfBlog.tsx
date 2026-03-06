import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Share2, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to crop a PDF online for free?", answer: "Upload your PDF to PineToolsHub's Crop PDF tool, set the margin values (top, bottom, left, right) to trim, and click Process. Your cropped PDF downloads instantly." },
  { question: "Can I crop different margins on each side?", answer: "Yes. You can set different values for top, bottom, left, and right margins independently for precise cropping control." },
  { question: "Does cropping reduce file size?", answer: "Cropping adjusts the visible area but may not significantly reduce file size since the original content data remains in the file. Use Compress PDF after cropping for smaller files." },
  { question: "Can I crop specific pages only?", answer: "Currently, cropping applies to all pages uniformly. For selective cropping, extract specific pages first, crop them, then merge back." },
];

export default function CropPdfBlog() {
  const shareUrl = "https://pinetoolshub.com/blog/crop-pdf-online-free";
  return (
    <MainLayout>
      <SEOHead title="Crop PDF Online Free — Adjust Margins & Trim PDF Pages (2026)" description="Crop PDF pages and adjust margins online for free. Trim whitespace, resize visible area, and remove unwanted borders from PDF documents. No signup, no ads, 100% browser-based. Step-by-step guide with PineToolsHub free PDF cropping tool for professional document formatting." canonical="/blog/crop-pdf-online-free" ogType="article" keywords="crop pdf online free, trim pdf margins, adjust pdf page size, remove pdf whitespace, pdf cropper tool online"
        jsonLd={{ ...articleSchema("Crop PDF Online Free", "Guide to cropping and adjusting PDF page margins", "/blog/crop-pdf-online-free", "2026-03-06"), ...faqSchema(faqs) }} />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-6">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">Crop PDF</span>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/blog"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
          <div className="ml-auto flex gap-2"><Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(shareUrl)}><Share2 className="h-3.5 w-3.5 mr-1" /> Share</Button></div>
        </div>
        <article className="prose prose-sm max-w-none space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="secondary"><Tag className="h-3 w-3 mr-1" />PDF Edit</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />5 min read</span>
            <span className="text-xs text-muted-foreground">Published Mar 6, 2026</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">Crop PDF Online Free — Adjust Margins & Trim Unwanted Borders (2026 Guide)</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Too much whitespace around your PDF content? Scanned documents with uneven margins? PineToolsHub's PDF cropper lets you trim margins and adjust the visible area on every page — free and private.</p>
          <h2 className="text-2xl font-bold text-foreground">How to Crop a PDF — Step by Step</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Open <Link to="/pdf-tools" className="text-primary hover:underline">PDF Tools</Link></strong> — Select "Crop PDF".</li>
            <li><strong className="text-foreground">Upload your PDF</strong></li>
            <li><strong className="text-foreground">Set margins</strong> — Specify how much to trim from each side (in points).</li>
            <li><strong className="text-foreground">Click Process</strong> — Cropping applies to all pages.</li>
            <li><strong className="text-foreground">Download</strong> — Your cropped PDF is ready.</li>
          </ol>
          <h2 className="text-2xl font-bold text-foreground">When to Crop a PDF</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Remove excess whitespace</strong> — Clean up scanned documents</li>
            <li><strong className="text-foreground">Standardize margins</strong> — Ensure uniform formatting</li>
            <li><strong className="text-foreground">Focus on content</strong> — Remove headers/footers/borders</li>
            <li><strong className="text-foreground">Prepare for binding</strong> — Adjust margins for print</li>
          </ul>
          <div className="bg-muted/50 rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">Try It Now — Free PDF Cropper</h3>
            <p className="text-muted-foreground mb-4">Crop and trim PDF margins in seconds.</p>
            <Link to="/pdf-tools"><Button>Open PDF Tools <span className="ml-1">→</span></Button></Link>
          </div>
        </article>
        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
