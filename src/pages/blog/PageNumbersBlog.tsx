import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to add page numbers to PDF?", answer: "Upload your PDF to PineToolsHub's Page Numbers tool and click Process. Page numbers are added to the bottom center of every page." },
  { question: "Can I choose where page numbers appear?", answer: "Currently page numbers are placed at the bottom center. Header placement is also available via the Header/Footer tool." },
  { question: "Is it free?", answer: "Yes. Completely free, no signup, browser-based." },
];

export default function PageNumbersBlog() {
  return (
    <MainLayout>
      <SEOHead title="Add Page Numbers to PDF Online Free — Automatic Numbering" description="Add page numbers to any PDF document online for free. Automatic numbering on every page. No signup, browser-based." canonical="/blog/add-page-numbers-to-pdf" ogType="article"
        jsonLd={{ ...articleSchema("Add Page Numbers to PDF Online Free", "Auto page numbering for PDFs", "/blog/add-page-numbers-to-pdf", "2026-03-01"), ...faqSchema(faqs) }} />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground"><Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">Page Numbers</span></nav>
        <Link to="/blog"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
        <article className="prose prose-sm max-w-none space-y-6">
          <div className="flex items-center gap-3"><Badge variant="secondary"><Tag className="h-3 w-3 mr-1" />PDF Edit</Badge><span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />4 min read</span></div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">How to Add Page Numbers to PDF Online Free</h1>
          <p className="text-lg text-muted-foreground">Professional documents need page numbers. PineToolsHub adds sequential page numbers to every page of your PDF in one click.</p>
          <h2 className="text-2xl font-bold text-foreground">Steps</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>Go to <Link to="/pdf-tools" className="text-primary hover:underline">PDF Tools</Link> → Page Numbers</li>
            <li>Upload your PDF</li>
            <li>Click Process</li>
            <li>Download numbered PDF</li>
          </ol>
          <h2 className="text-2xl font-bold text-foreground">Why Add Page Numbers?</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Professional document formatting</li>
            <li>Easy navigation in printed documents</li>
            <li>Required for academic papers and theses</li>
            <li>Better organization for manuals and guides</li>
          </ul>
          <p className="text-muted-foreground">More: <Link to="/blog/how-to-merge-pdf-online-free" className="text-primary hover:underline">Merge PDF</Link>, <Link to="/blog/remove-pages-from-pdf" className="text-primary hover:underline">Remove Pages</Link>, <Link to="/pdf-tools" className="text-primary hover:underline">All tools</Link>.</p>
        </article>
        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
