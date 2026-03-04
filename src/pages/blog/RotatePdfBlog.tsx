import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to rotate PDF pages online?", answer: "Upload your PDF to PineToolsHub's Rotate tool, select 90°, 180°, or 270° rotation, and click Process. All pages rotate instantly." },
  { question: "Can I rotate only specific pages?", answer: "The current tool rotates all pages. For selective rotation, split the PDF first, rotate the section, then merge back." },
  { question: "Is the rotation permanent?", answer: "Yes. The rotated PDF is saved as a new file with the rotation applied permanently." },
];

export default function RotatePdfBlog() {
  return (
    <MainLayout>
      <SEOHead title="Rotate PDF Pages Online Free — 90°, 180°, 270° Rotation" description="Rotate PDF pages online for free — choose 90, 180, or 270 degrees. No signup, browser-based, instant processing." canonical="/blog/rotate-pdf-pages-online" ogType="article"
        jsonLd={{ ...articleSchema("Rotate PDF Pages Online Free", "Rotate PDF pages instantly", "/blog/rotate-pdf-pages-online", "2026-03-01"), ...faqSchema(faqs) }} />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground"><Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">Rotate PDF</span></nav>
        <Link to="/blog"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
        <article className="prose prose-sm max-w-none space-y-6">
          <div className="flex items-center gap-3"><Badge variant="secondary"><Tag className="h-3 w-3 mr-1" />PDF Tools</Badge><span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />5 min read</span></div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">How to Rotate PDF Pages Online Free — Fix Upside-Down & Sideways PDFs</h1>
          <p className="text-lg text-muted-foreground">Scanned documents often come out sideways or upside down. PineToolsHub's Rotate PDF tool fixes orientation instantly — choose 90°, 180°, or 270° rotation for all pages.</p>
          <h2 className="text-2xl font-bold text-foreground">How to Rotate a PDF</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>Open <Link to="/pdf-tools" className="text-primary hover:underline">PDF Tools</Link> → Rotate PDF</li>
            <li>Upload your PDF</li>
            <li>Select rotation: 90°, 180°, or 270°</li>
            <li>Click Process and download</li>
          </ol>
          <h2 className="text-2xl font-bold text-foreground">Use Cases</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Fix scanned documents with wrong orientation</li>
            <li>Rotate landscape pages to portrait or vice versa</li>
            <li>Correct phone-scanned PDFs</li>
          </ul>
          <p className="text-muted-foreground">Explore more: <Link to="/blog/how-to-merge-pdf-online-free" className="text-primary hover:underline">Merge PDF</Link>, <Link to="/blog/add-watermark-to-pdf" className="text-primary hover:underline">Add Watermark</Link>, <Link to="/pdf-tools" className="text-primary hover:underline">All 30+ tools</Link>.</p>
        </article>
        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
