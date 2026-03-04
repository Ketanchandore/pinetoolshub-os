import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to convert images to PDF?", answer: "Upload JPG or PNG images to PineToolsHub's Images to PDF tool. They're combined into a single PDF document in upload order." },
  { question: "What image formats are supported?", answer: "JPG/JPEG and PNG formats are supported. Each image becomes one page in the PDF." },
  { question: "Can I convert multiple images at once?", answer: "Yes. Upload as many images as you want — they'll all be combined into one PDF." },
];

export default function ImagesToPdfBlog() {
  return (
    <MainLayout>
      <SEOHead title="Convert Images to PDF Online Free — JPG/PNG to PDF" description="Convert multiple JPG and PNG images to a single PDF document online for free. Batch conversion, no signup, browser-based." canonical="/blog/convert-images-to-pdf" ogType="article"
        jsonLd={{ ...articleSchema("Convert Images to PDF Online Free", "Image to PDF conversion guide", "/blog/convert-images-to-pdf", "2026-03-01"), ...faqSchema(faqs) }} />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground"><Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">Images to PDF</span></nav>
        <Link to="/blog"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
        <article className="prose prose-sm max-w-none space-y-6">
          <div className="flex items-center gap-3"><Badge variant="secondary"><Tag className="h-3 w-3 mr-1" />Convert</Badge><span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />5 min read</span></div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">How to Convert Images to PDF Online Free — JPG & PNG to PDF</h1>
          <p className="text-lg text-muted-foreground">Need to create a PDF from photos or screenshots? PineToolsHub converts multiple images into a single PDF document instantly.</p>
          <h2 className="text-2xl font-bold text-foreground">Steps</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>Go to <Link to="/pdf-tools" className="text-primary hover:underline">PDF Tools</Link> → Images to PDF</li>
            <li>Upload your images (JPG, PNG)</li>
            <li>Arrange the order</li>
            <li>Click Process and download your PDF</li>
          </ol>
          <h2 className="text-2xl font-bold text-foreground">Common Uses</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Create PDF portfolios from design screenshots</li>
            <li>Compile scanned document images into one PDF</li>
            <li>Convert photo albums to shareable PDFs</li>
            <li>Bundle receipts and invoices</li>
          </ul>
          <p className="text-muted-foreground">Related: <Link to="/blog/convert-pdf-to-images" className="text-primary hover:underline">PDF to Images</Link>, <Link to="/blog/compress-pdf-reduce-size" className="text-primary hover:underline">Compress PDF</Link>, <Link to="/pdf-tools" className="text-primary hover:underline">All tools</Link>.</p>
        </article>
        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
