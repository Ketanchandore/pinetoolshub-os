import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Share2, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "What is PDF metadata?", answer: "PDF metadata includes document properties like title, author, subject, keywords, creation date, and creator application. This information is embedded in the file and visible in PDF reader properties." },
  { question: "How to edit PDF metadata online?", answer: "Upload your PDF to PineToolsHub's PDF Metadata tool, modify the title, author, subject, and keywords fields, then click Process to download the updated PDF." },
  { question: "Why should I edit PDF metadata?", answer: "Correct metadata improves document organization, search discoverability, accessibility, and professionalism. It also helps when archiving or publishing documents." },
  { question: "Can I remove all metadata from a PDF?", answer: "Yes. Simply clear all fields before processing to strip metadata from your PDF — useful for privacy when sharing documents publicly." },
];

export default function PdfMetadataBlog() {
  const shareUrl = "https://pinetoolshub.com/blog/edit-pdf-metadata";
  return (
    <MainLayout>
      <SEOHead title="Edit PDF Metadata Online Free — Change Title, Author & Properties (2026)" description="Edit PDF document metadata online for free. Change title, author, subject, keywords, and creation date. Remove metadata for privacy. No signup, no ads, 100% browser-based. Step-by-step guide with PineToolsHub free PDF metadata editor for professional document management and SEO." canonical="/blog/edit-pdf-metadata" ogType="article" keywords="edit pdf metadata online, change pdf title author, pdf properties editor, pdf metadata remover, edit pdf document info"
        jsonLd={{ ...articleSchema("Edit PDF Metadata Online Free", "Guide to editing PDF document properties and metadata", "/blog/edit-pdf-metadata", "2026-03-06"), ...faqSchema(faqs) }} />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-6">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">PDF Metadata</span>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/blog"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
          <div className="ml-auto flex gap-2"><Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(shareUrl)}><Share2 className="h-3.5 w-3.5 mr-1" /> Share</Button></div>
        </div>
        <article className="prose prose-sm max-w-none space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="secondary"><Tag className="h-3 w-3 mr-1" />PDF Advanced</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />5 min read</span>
            <span className="text-xs text-muted-foreground">Published Mar 6, 2026</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">Edit PDF Metadata Online Free — Change Title, Author & Document Properties (2026 Guide)</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">PDF metadata controls how your document appears in file managers, search results, and document management systems. PineToolsHub lets you edit or remove metadata from any PDF — privately and instantly.</p>
          <h2 className="text-2xl font-bold text-foreground">How to Edit PDF Metadata — Step by Step</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Open <Link to="/pdf-tools" className="text-primary hover:underline">PDF Tools</Link></strong> — Select "PDF Metadata".</li>
            <li><strong className="text-foreground">Upload your PDF</strong></li>
            <li><strong className="text-foreground">Edit properties</strong> — Title, author, subject, keywords.</li>
            <li><strong className="text-foreground">Click Process</strong> — Metadata updated instantly.</li>
            <li><strong className="text-foreground">Download</strong> — Your PDF with updated metadata is ready.</li>
          </ol>
          <h2 className="text-2xl font-bold text-foreground">Common Metadata Fields</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Title</strong> — Document name shown in PDF readers</li>
            <li><strong className="text-foreground">Author</strong> — Creator name for attribution</li>
            <li><strong className="text-foreground">Subject</strong> — Document topic or category</li>
            <li><strong className="text-foreground">Keywords</strong> — Tags for searchability</li>
          </ul>
          <div className="bg-muted/50 rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">Try It Now — Free PDF Metadata Editor</h3>
            <p className="text-muted-foreground mb-4">Edit or remove PDF metadata in seconds.</p>
            <Link to="/pdf-tools"><Button>Open PDF Tools <span className="ml-1">→</span></Button></Link>
          </div>
        </article>
        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
