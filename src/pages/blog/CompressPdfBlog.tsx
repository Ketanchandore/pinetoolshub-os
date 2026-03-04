import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to compress a PDF without losing quality?", answer: "PineToolsHub's compressor optimizes internal PDF structures — removing redundant data, compressing object streams — without touching image or text quality." },
  { question: "How much can I reduce PDF size?", answer: "Typical savings are 20-60% depending on the PDF content. Text-heavy PDFs compress more; image-heavy PDFs have smaller gains." },
  { question: "Is PDF compression free?", answer: "Yes, completely free with no limits. No signup, no ads." },
];

export default function CompressPdfBlog() {
  return (
    <MainLayout>
      <SEOHead title="Compress PDF — Reduce PDF File Size Online Free (2026)" description="Reduce PDF file size online for free without losing quality. Browser-based compression — no upload, no signup. Works instantly." canonical="/blog/compress-pdf-reduce-size" ogType="article"
        jsonLd={{ ...articleSchema("Compress PDF Online Free", "Reduce PDF size without quality loss", "/blog/compress-pdf-reduce-size", "2026-03-01"), ...faqSchema(faqs) }} />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground"><Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">Compress PDF</span></nav>
        <Link to="/blog"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>

        <article className="prose prose-sm max-w-none space-y-6">
          <div className="flex items-center gap-3"><Badge variant="secondary"><Tag className="h-3 w-3 mr-1" />PDF Tools</Badge><span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />7 min read</span></div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">How to Compress PDF — Reduce File Size Online Free Without Losing Quality</h1>
          <p className="text-lg text-muted-foreground">Large PDF files are a headache for email, cloud storage, and web uploads. PineToolsHub compresses your PDFs instantly in your browser — reducing size by up to 60% while maintaining full quality.</p>

          <h2 className="text-2xl font-bold text-foreground">How PDF Compression Works</h2>
          <p className="text-muted-foreground">Our tool uses pdf-lib to re-serialize the PDF with optimized object streams. This removes redundant metadata, unused fonts, and structural overhead without modifying visible content.</p>

          <h2 className="text-2xl font-bold text-foreground">Steps to Compress Your PDF</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>Go to <Link to="/pdf-tools" className="text-primary hover:underline">PDF Tools</Link> → Compress PDF</li>
            <li>Upload your PDF (no file size limit)</li>
            <li>Click "Compress PDF"</li>
            <li>Download the compressed file with size savings shown</li>
          </ol>

          <h2 className="text-2xl font-bold text-foreground">When to Compress PDFs</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Before attaching to email (most providers limit 25MB)</li>
            <li>Uploading to government or banking portals with size limits</li>
            <li>Sharing via messaging apps</li>
            <li>Optimizing PDFs for web embedding</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground">More Tools</h2>
          <p className="text-muted-foreground">Try <Link to="/blog/how-to-merge-pdf-online-free" className="text-primary hover:underline">Merge PDF</Link>, <Link to="/blog/how-to-split-pdf-pages" className="text-primary hover:underline">Split PDF</Link>, and <Link to="/pdf-tools" className="text-primary hover:underline">30+ more free tools</Link>.</p>
        </article>
        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
