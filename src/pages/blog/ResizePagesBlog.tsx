import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Share2, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to resize PDF pages to A4 online?", answer: "Upload your PDF to PineToolsHub's Resize Pages tool, select A4 (or Letter, Legal, etc.) from the preset sizes, and click Process. All pages are resized instantly." },
  { question: "What page sizes are supported?", answer: "PineToolsHub supports A4, US Letter, Legal, A3, A5, and custom dimensions. You can convert between any standard page sizes." },
  { question: "Does resizing affect content quality?", answer: "Content is scaled proportionally to fit the new page size. Text remains sharp, and images scale smoothly." },
  { question: "Can I resize from Letter to A4?", answer: "Yes. This is one of the most common conversions. Upload your Letter-sized PDF, select A4, and download the resized version." },
];

export default function ResizePagesBlog() {
  const shareUrl = "https://pinetoolshub.com/blog/resize-pdf-pages";
  return (
    <MainLayout>
      <SEOHead title="Resize PDF Pages Online Free — Change to A4, Letter, Legal & Custom Sizes (2026)" description="Resize PDF page dimensions online for free. Convert between A4, US Letter, Legal, A3, A5 and custom sizes. Scale content proportionally without quality loss. No signup, no ads, 100% browser-based. Step-by-step guide with PineToolsHub free PDF page resizer tool." canonical="/blog/resize-pdf-pages" ogType="article" keywords="resize pdf pages online, change pdf page size a4, convert letter to a4 pdf, pdf page resizer free, change pdf dimensions online"
        jsonLd={{ ...articleSchema("Resize PDF Pages Online Free", "Guide to changing PDF page dimensions and sizes", "/blog/resize-pdf-pages", "2026-03-06"), ...faqSchema(faqs) }} />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-6">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">Resize PDF Pages</span>
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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">Resize PDF Pages Online Free — Convert to A4, Letter, Legal & More (2026 Guide)</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">PDF pages in the wrong size for your printer? Need to convert US Letter to A4 for international sharing? PineToolsHub resizes all pages to your chosen format — instantly and free.</p>
          <h2 className="text-2xl font-bold text-foreground">How to Resize PDF Pages</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Open <Link to="/pdf-tools" className="text-primary hover:underline">PDF Tools</Link></strong> — Select "Resize Pages".</li>
            <li><strong className="text-foreground">Upload your PDF</strong></li>
            <li><strong className="text-foreground">Choose target size</strong> — A4, Letter, Legal, A3, A5, or custom.</li>
            <li><strong className="text-foreground">Click Process</strong></li>
            <li><strong className="text-foreground">Download</strong> — Resized PDF ready.</li>
          </ol>
          <h2 className="text-2xl font-bold text-foreground">Supported Page Sizes</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">A4</strong> — 210 × 297 mm (international standard)</li>
            <li><strong className="text-foreground">US Letter</strong> — 8.5 × 11 inches</li>
            <li><strong className="text-foreground">Legal</strong> — 8.5 × 14 inches</li>
            <li><strong className="text-foreground">A3</strong> — 297 × 420 mm</li>
            <li><strong className="text-foreground">A5</strong> — 148 × 210 mm</li>
          </ul>
          <div className="bg-muted/50 rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">Try It Now — Free PDF Page Resizer</h3>
            <p className="text-muted-foreground mb-4">Resize PDF pages to any standard size.</p>
            <Link to="/pdf-tools"><Button>Open PDF Tools <span className="ml-1">→</span></Button></Link>
          </div>
        </article>
        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
