import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to add a watermark to PDF online?", answer: "Upload your PDF to PineToolsHub, type your watermark text, adjust opacity, and click Process. The watermark is applied diagonally across every page." },
  { question: "Can I change watermark opacity?", answer: "Yes. Use the opacity slider (10-80%) to control how visible the watermark appears." },
  { question: "Is watermarking free?", answer: "Completely free. No signup, no limits, browser-based." },
];

export default function WatermarkPdfBlog() {
  return (
    <MainLayout>
      <SEOHead title="Add Watermark to PDF Online Free — Custom Text Overlay" description="Add custom text watermarks to your PDF files online for free. Adjust opacity and text. No signup, browser-based privacy." canonical="/blog/add-watermark-to-pdf" ogType="article"
        jsonLd={{ ...articleSchema("Add Watermark to PDF Online Free", "Custom PDF watermarking", "/blog/add-watermark-to-pdf", "2026-03-01"), ...faqSchema(faqs) }} />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground"><Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">Add Watermark</span></nav>
        <Link to="/blog"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
        <article className="prose prose-sm max-w-none space-y-6">
          <div className="flex items-center gap-3"><Badge variant="secondary"><Tag className="h-3 w-3 mr-1" />PDF Tools</Badge><span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />5 min read</span></div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">How to Add a Watermark to PDF Online Free — Protect Your Documents</h1>
          <p className="text-lg text-muted-foreground">Protect your PDFs with custom text watermarks. Add "CONFIDENTIAL", "DRAFT", your company name — any text with adjustable opacity. 100% browser-based.</p>
          <h2 className="text-2xl font-bold text-foreground">Steps</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>Go to <Link to="/pdf-tools" className="text-primary hover:underline">PDF Tools</Link> → Add Watermark</li>
            <li>Upload your PDF</li>
            <li>Type your watermark text</li>
            <li>Adjust opacity (10-80%)</li>
            <li>Click Process and download</li>
          </ol>
          <h2 className="text-2xl font-bold text-foreground">Why Watermark PDFs?</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Mark documents as CONFIDENTIAL or DRAFT</li>
            <li>Brand documents with your company name</li>
            <li>Deter unauthorized sharing</li>
            <li>Identify document versions</li>
          </ul>
          <p className="text-muted-foreground">More: <Link to="/blog/password-protect-pdf" className="text-primary hover:underline">Protect PDF</Link>, <Link to="/blog/how-to-merge-pdf-online-free" className="text-primary hover:underline">Merge PDF</Link>, <Link to="/pdf-tools" className="text-primary hover:underline">All 30+ tools</Link>.</p>
        </article>
        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
