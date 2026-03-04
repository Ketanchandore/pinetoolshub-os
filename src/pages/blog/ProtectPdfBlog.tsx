import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to password protect a PDF?", answer: "Upload your PDF to PineToolsHub's Protect tool, enter a password, and click Process. The PDF is marked as protected." },
  { question: "Can I unlock a protected PDF?", answer: "Yes. Use PineToolsHub's Unlock PDF tool to remove restrictions from PDF files." },
];

export default function ProtectPdfBlog() {
  return (
    <MainLayout>
      <SEOHead title="Password Protect PDF Online Free — Lock Your Documents" description="Add password protection to PDF files online for free. Secure sensitive documents instantly. Browser-based, no signup." canonical="/blog/password-protect-pdf" ogType="article"
        jsonLd={{ ...articleSchema("Password Protect PDF Online Free", "Lock PDF with password", "/blog/password-protect-pdf", "2026-03-01"), ...faqSchema(faqs) }} />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground"><Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">Protect PDF</span></nav>
        <Link to="/blog"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
        <article className="prose prose-sm max-w-none space-y-6">
          <div className="flex items-center gap-3"><Badge variant="secondary"><Tag className="h-3 w-3 mr-1" />PDF Security</Badge><span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />5 min read</span></div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">How to Password Protect a PDF Online Free</h1>
          <p className="text-lg text-muted-foreground">Secure confidential PDFs with password protection. Keep sensitive data safe when sharing documents via email or cloud storage.</p>
          <h2 className="text-2xl font-bold text-foreground">How to Lock Your PDF</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>Open <Link to="/pdf-tools" className="text-primary hover:underline">PDF Tools</Link> → Protect PDF</li>
            <li>Upload your PDF</li>
            <li>Enter your password</li>
            <li>Click Process and download the secured file</li>
          </ol>
          <h2 className="text-2xl font-bold text-foreground">When to Protect PDFs</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Financial documents and tax returns</li>
            <li>Legal contracts and agreements</li>
            <li>Medical records</li>
            <li>Confidential business reports</li>
          </ul>
          <p className="text-muted-foreground">Related: <Link to="/blog/add-watermark-to-pdf" className="text-primary hover:underline">Add Watermark</Link>, <Link to="/pdf-tools" className="text-primary hover:underline">All PDF Tools</Link>.</p>
        </article>
        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
