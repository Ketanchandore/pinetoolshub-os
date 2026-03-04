import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to remove pages from a PDF?", answer: "Upload your PDF to PineToolsHub's Remove Pages tool, enter the page numbers to delete (comma-separated), and click Process. A new PDF without those pages downloads instantly." },
  { question: "Can I remove multiple pages at once?", answer: "Yes. Enter page numbers separated by commas (e.g., 1,3,5) to remove multiple pages in one go." },
  { question: "Is the original PDF modified?", answer: "No. A new PDF is created without the removed pages. Your original file stays untouched." },
];

export default function RemovePagesBlog() {
  return (
    <MainLayout>
      <SEOHead title="Remove Pages from PDF Online Free — Delete Specific Pages" description="Remove specific pages from PDF documents online for free. Enter page numbers to delete. No signup, browser-based, instant." canonical="/blog/remove-pages-from-pdf" ogType="article"
        jsonLd={{ ...articleSchema("Remove Pages from PDF Online Free", "Delete pages from PDF", "/blog/remove-pages-from-pdf", "2026-03-01"), ...faqSchema(faqs) }} />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground"><Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">Remove Pages</span></nav>
        <Link to="/blog"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
        <article className="prose prose-sm max-w-none space-y-6">
          <div className="flex items-center gap-3"><Badge variant="secondary"><Tag className="h-3 w-3 mr-1" />PDF Edit</Badge><span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />4 min read</span></div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">How to Remove Pages from PDF Online Free — Delete Unwanted Pages</h1>
          <p className="text-lg text-muted-foreground">Clean up your PDFs by removing unwanted pages. Enter the page numbers to delete, and download a trimmed version instantly.</p>
          <h2 className="text-2xl font-bold text-foreground">How to Remove Pages</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>Open <Link to="/pdf-tools" className="text-primary hover:underline">PDF Tools</Link> → Remove Pages</li>
            <li>Upload your PDF</li>
            <li>Enter page numbers to remove (e.g., 1,3,5)</li>
            <li>Click Process and download</li>
          </ol>
          <h2 className="text-2xl font-bold text-foreground">When to Remove Pages</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Remove cover pages or blank pages</li>
            <li>Delete confidential pages before sharing</li>
            <li>Clean up scanned documents with extra pages</li>
            <li>Trim appendix or irrelevant sections</li>
          </ul>
          <p className="text-muted-foreground">Related: <Link to="/blog/how-to-split-pdf-pages" className="text-primary hover:underline">Split PDF</Link>, <Link to="/blog/add-page-numbers-to-pdf" className="text-primary hover:underline">Page Numbers</Link>, <Link to="/pdf-tools" className="text-primary hover:underline">All tools</Link>.</p>
        </article>
        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
