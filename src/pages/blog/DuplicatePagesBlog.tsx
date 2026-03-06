import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Share2, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to duplicate pages in a PDF online?", answer: "Upload your PDF to PineToolsHub's Duplicate Pages tool, specify how many copies of each page you want, and click Process. Every page is duplicated the specified number of times." },
  { question: "Can I duplicate specific pages only?", answer: "Currently, all pages are duplicated uniformly. To duplicate specific pages, extract them first, duplicate, then merge back with the original." },
  { question: "What are common uses for page duplication?", answer: "Creating multi-copy forms (print 3 copies per page), generating handout sets, filling booklet layouts, and creating practice worksheets." },
  { question: "Is there a limit to how many copies?", answer: "No hard limit, but very large numbers may slow browser processing. For most use cases, 2-10 copies per page works perfectly." },
];

export default function DuplicatePagesBlog() {
  const shareUrl = "https://pinetoolshub.com/blog/duplicate-pdf-pages";
  return (
    <MainLayout>
      <SEOHead title="Duplicate PDF Pages Online Free — Copy Pages Multiple Times (2026)" description="Duplicate PDF pages online for free. Copy each page multiple times to create multi-copy forms, handout sets, and booklet layouts. No signup, no ads, 100% browser-based. Step-by-step guide with PineToolsHub free PDF page duplicator tool for creating multiple copies of document pages." canonical="/blog/duplicate-pdf-pages" ogType="article" keywords="duplicate pdf pages online, copy pdf pages multiple times, pdf page duplicator free, repeat pdf pages, multiply pdf pages online"
        jsonLd={{ ...articleSchema("Duplicate PDF Pages Online Free", "Guide to duplicating and copying PDF pages", "/blog/duplicate-pdf-pages", "2026-03-06"), ...faqSchema(faqs) }} />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-6">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">Duplicate Pages</span>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/blog"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
          <div className="ml-auto flex gap-2"><Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(shareUrl)}><Share2 className="h-3.5 w-3.5 mr-1" /> Share</Button></div>
        </div>
        <article className="prose prose-sm max-w-none space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="secondary"><Tag className="h-3 w-3 mr-1" />PDF Advanced</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />4 min read</span>
            <span className="text-xs text-muted-foreground">Published Mar 6, 2026</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">Duplicate PDF Pages Online Free — Copy & Repeat Pages Instantly (2026 Guide)</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Need multiple copies of each page in your PDF? PineToolsHub duplicates every page the number of times you specify — perfect for forms, handouts, and booklet printing.</p>
          <h2 className="text-2xl font-bold text-foreground">How to Duplicate PDF Pages</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Open <Link to="/pdf-tools" className="text-primary hover:underline">PDF Tools</Link></strong> — Select "Duplicate Pages".</li>
            <li><strong className="text-foreground">Upload your PDF</strong></li>
            <li><strong className="text-foreground">Set copy count</strong> — How many times to duplicate each page.</li>
            <li><strong className="text-foreground">Click Process</strong></li>
            <li><strong className="text-foreground">Download</strong> — PDF with duplicated pages ready.</li>
          </ol>
          <div className="bg-muted/50 rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">Try It Now — Free PDF Page Duplicator</h3>
            <p className="text-muted-foreground mb-4">Duplicate PDF pages in seconds.</p>
            <Link to="/pdf-tools"><Button>Open PDF Tools <span className="ml-1">→</span></Button></Link>
          </div>
        </article>
        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
