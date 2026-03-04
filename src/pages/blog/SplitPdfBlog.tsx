import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Share2, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to split a PDF into separate pages?", answer: "Use PineToolsHub's Split PDF tool — upload your PDF, enter the page range you want to extract, and click Process. The extracted pages download as a new PDF." },
  { question: "Can I extract specific pages from a PDF?", answer: "Yes. Enter the 'From' and 'To' page numbers to extract any range. For individual pages, use the Extract Pages tool." },
  { question: "Is PDF splitting free?", answer: "Completely free. No signup, no limits, no ads. Works in your browser." },
];

export default function SplitPdfBlog() {
  return (
    <MainLayout>
      <SEOHead title="How to Split PDF Pages Online Free — Extract Pages Instantly" description="Split PDF files into separate pages or extract specific page ranges online for free. No signup needed. 100% browser-based privacy." canonical="/blog/how-to-split-pdf-pages" ogType="article"
        jsonLd={{ ...articleSchema("How to Split PDF Pages Online Free", "Guide to splitting PDFs online", "/blog/how-to-split-pdf-pages", "2026-03-01"), ...faqSchema(faqs) }} />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground"><Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">Split PDF</span></nav>
        <Link to="/blog"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>

        <article className="prose prose-sm max-w-none space-y-6">
          <div className="flex items-center gap-3"><Badge variant="secondary"><Tag className="h-3 w-3 mr-1" />PDF Tools</Badge><span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />6 min read</span></div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">How to Split PDF Pages Online Free — Extract Any Page Range</h1>
          <p className="text-lg text-muted-foreground">Need to pull out specific pages from a large PDF? PineToolsHub's Split PDF tool lets you extract any page range instantly — no software installation, no signup.</p>

          <h2 className="text-2xl font-bold text-foreground">Step-by-Step: Split a PDF Online</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>Open <Link to="/pdf-tools" className="text-primary hover:underline">PDF Tools</Link> and select "Split PDF"</li>
            <li>Upload your PDF file (no size limit)</li>
            <li>Enter the page range (e.g., pages 3 to 7)</li>
            <li>Click "Split PDF" — done in seconds</li>
            <li>Download your extracted pages as a new PDF</li>
          </ol>

          <h2 className="text-2xl font-bold text-foreground">Why Split PDFs?</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Extract only relevant pages from a long report</li>
            <li>Share specific sections without sending the full document</li>
            <li>Reduce file size by removing unnecessary pages</li>
            <li>Separate chapters from an eBook or manual</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground">Privacy & Security</h2>
          <p className="text-muted-foreground">All processing happens in your browser using pdf-lib. Your files never leave your device — no cloud upload, no server processing. This is the most private way to split PDFs online.</p>

          <h2 className="text-2xl font-bold text-foreground">Related Tools</h2>
          <p className="text-muted-foreground">Also try: <Link to="/blog/how-to-merge-pdf-online-free" className="text-primary hover:underline">Merge PDF</Link>, <Link to="/blog/compress-pdf-reduce-size" className="text-primary hover:underline">Compress PDF</Link>, <Link to="/blog/add-page-numbers-to-pdf" className="text-primary hover:underline">Add Page Numbers</Link>, and <Link to="/pdf-tools" className="text-primary hover:underline">30+ more PDF tools</Link>.</p>
        </article>
        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
