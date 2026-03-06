import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Share2, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to rearrange pages in a PDF online?", answer: "Upload your PDF to PineToolsHub's Reorder Pages tool, specify the new page order (e.g., 3,1,2,5,4), and click Process. Your reorganized PDF downloads instantly." },
  { question: "Can I move a single page to a different position?", answer: "Yes. Simply specify the full page order with the moved page in its new position. For a 5-page PDF, entering '1,3,2,4,5' swaps pages 2 and 3." },
  { question: "Does reordering pages affect PDF quality?", answer: "No. Pages are copied at the byte level — all content, formatting, images, and fonts remain identical." },
  { question: "Is there a page limit for reordering?", answer: "No. PineToolsHub handles PDFs with hundreds of pages. Processing happens in your browser with no server limits." },
];

export default function ReorderPagesBlog() {
  const shareUrl = "https://pinetoolshub.com/blog/reorder-pdf-pages";
  return (
    <MainLayout>
      <SEOHead title="Reorder PDF Pages Online Free — Rearrange & Reorganize Page Order (2026)" description="Rearrange PDF pages in any order online for free. Drag and drop page reorder, swap pages, move pages to new positions. No signup, no ads, 100% browser-based PDF page reorder tool. Step-by-step guide with PineToolsHub — the best free online PDF page organizer." canonical="/blog/reorder-pdf-pages" ogType="article" keywords="reorder pdf pages, rearrange pdf pages online free, reorganize pdf page order, move pdf pages, swap pdf pages online"
        jsonLd={{ ...articleSchema("Reorder PDF Pages Online Free", "Guide to rearranging and reorganizing PDF page order online", "/blog/reorder-pdf-pages", "2026-03-06"), ...faqSchema(faqs) }} />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">Reorder PDF Pages</span>
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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">Reorder PDF Pages Online Free — Rearrange & Reorganize Any PDF (2026 Guide)</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Scanned pages out of order? Presentation slides need rearranging? PineToolsHub's free PDF page reorder tool lets you reorganize pages in any sequence — instantly in your browser with zero privacy risk.</p>
          <h2 className="text-2xl font-bold text-foreground">How to Reorder PDF Pages — Step by Step</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Open <Link to="/pdf-tools" className="text-primary hover:underline">PDF Tools</Link></strong> — Select "Reorder Pages".</li>
            <li><strong className="text-foreground">Upload your PDF</strong> — Drag and drop or browse.</li>
            <li><strong className="text-foreground">Specify new order</strong> — Enter page numbers in desired sequence (e.g., 3,1,2,5,4).</li>
            <li><strong className="text-foreground">Click Process</strong> — Instant browser-based reorganization.</li>
            <li><strong className="text-foreground">Download</strong> — Your reordered PDF is ready.</li>
          </ol>
          <h2 className="text-2xl font-bold text-foreground">Common Use Cases</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Fix scanned documents</strong> — Reorder pages scanned in wrong sequence</li>
            <li><strong className="text-foreground">Reorganize presentations</strong> — Move slides to a better flow</li>
            <li><strong className="text-foreground">Customize reports</strong> — Put summary pages first</li>
          </ul>
          <div className="bg-muted/50 rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">Try It Now — Free PDF Page Reorder</h3>
            <p className="text-muted-foreground mb-4">Rearrange PDF pages in any order. No signup, no ads.</p>
            <Link to="/pdf-tools"><Button>Open PDF Tools <span className="ml-1">→</span></Button></Link>
          </div>
        </article>
        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
