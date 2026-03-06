import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Share2, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to extract specific pages from a PDF online for free?", answer: "Go to PineToolsHub PDF Tools, select 'Extract Pages', upload your PDF, enter the page numbers or ranges you want (e.g., 1,3,5-8), and click Process. Your extracted PDF downloads instantly — no signup, no server upload." },
  { question: "Can I extract non-consecutive pages from a PDF?", answer: "Yes. Enter individual page numbers separated by commas (e.g., 2,5,9) or mix ranges and individual pages (e.g., 1-3,7,10-12). PineToolsHub handles all combinations." },
  { question: "Is extracting pages different from splitting a PDF?", answer: "Yes. Splitting divides a PDF into multiple separate files. Extracting saves only your selected pages into a single new PDF document." },
  { question: "Does extracting pages reduce PDF quality?", answer: "No. PineToolsHub uses pdf-lib to copy pages at the byte level. All text, images, fonts, and formatting remain identical to the original." },
];

export default function ExtractPagesBlog() {
  const shareUrl = "https://pinetoolshub.com/blog/extract-pages-from-pdf";
  return (
    <MainLayout>
      <SEOHead title="Extract Pages from PDF Online Free — Save Selected Pages as New PDF (2026)" description="Learn how to extract specific pages from any PDF document online for free. Select individual pages or page ranges, download as a new PDF instantly. No signup, no ads, 100% browser-based with complete privacy. Step-by-step guide with PineToolsHub free PDF page extractor tool." canonical="/blog/extract-pages-from-pdf" ogType="article" keywords="extract pages from pdf, pdf page extractor online free, save specific pdf pages, extract pdf pages no signup, select pages from pdf online"
        jsonLd={{ ...articleSchema("Extract Pages from PDF Online Free — Save Selected Pages", "Step-by-step guide to extracting specific pages from PDF documents online", "/blog/extract-pages-from-pdf", "2026-03-06"), ...faqSchema(faqs) }} />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">Extract Pages from PDF</span>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/blog"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(shareUrl)}><Share2 className="h-3.5 w-3.5 mr-1" /> Share</Button>
          </div>
        </div>
        <article className="prose prose-sm max-w-none space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="secondary"><Tag className="h-3 w-3 mr-1" />PDF Tools</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />6 min read</span>
            <span className="text-xs text-muted-foreground">Published Mar 6, 2026</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">Extract Pages from PDF Online Free — Save Selected Pages as a New Document (2026 Guide)</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Need to pull out specific pages from a large PDF? Whether it's a single page from a report, a chapter from an e-book, or scattered pages from a contract — PineToolsHub's free PDF page extractor lets you select exactly which pages you need and saves them as a clean new PDF, all within your browser.</p>
          <h2 className="text-2xl font-bold text-foreground">Why Extract Pages from a PDF?</h2>
          <p className="text-muted-foreground">Large PDF documents often contain more than you need. Extracting specific pages lets you share only relevant sections, reduce file size, and create focused documents without editing the original. Common use cases include extracting invoice pages, pulling chapters from textbooks, and saving specific forms from multi-page applications.</p>
          <h2 className="text-2xl font-bold text-foreground">How to Extract PDF Pages — Step by Step</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Open <Link to="/pdf-tools" className="text-primary hover:underline">PDF Tools</Link></strong> — Select "Extract Pages" from the tool grid.</li>
            <li><strong className="text-foreground">Upload your PDF</strong> — Drag and drop or click to browse. Works with any PDF file.</li>
            <li><strong className="text-foreground">Enter page numbers</strong> — Specify pages like "1,3,5-8,12" to extract exactly what you need.</li>
            <li><strong className="text-foreground">Click Process</strong> — Extraction happens instantly in your browser.</li>
            <li><strong className="text-foreground">Download</strong> — Your new PDF with only the selected pages downloads automatically.</li>
          </ol>
          <h2 className="text-2xl font-bold text-foreground">PineToolsHub vs Other PDF Extractors</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">100% Browser-Based</strong> — Files never leave your device, unlike iLovePDF or SmallPDF which upload to servers</li>
            <li><strong className="text-foreground">No Signup Required</strong> — Start extracting immediately, no account needed</li>
            <li><strong className="text-foreground">Flexible Selection</strong> — Individual pages, ranges, or any combination</li>
            <li><strong className="text-foreground">Zero Quality Loss</strong> — Byte-level page copying preserves everything</li>
            <li><strong className="text-foreground">Unlimited Usage</strong> — No daily limits or file count restrictions</li>
          </ul>
          <h3 className="text-xl font-semibold text-foreground">Pro Tips for PDF Page Extraction</h3>
          <p className="text-muted-foreground">Use the "Extract Pages" tool together with "Merge PDF" to build custom documents from multiple sources. Extract key pages from different reports, then merge them into one presentation-ready file.</p>
          <div className="bg-muted/50 rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">Try It Now — Free PDF Page Extractor</h3>
            <p className="text-muted-foreground mb-4">Extract specific pages from any PDF in seconds. No signup, no ads, no server uploads.</p>
            <Link to="/pdf-tools"><Button>Open PDF Tools <span className="ml-1">→</span></Button></Link>
          </div>
        </article>
        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
