import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to convert PDF to images?", answer: "Upload your PDF to PineToolsHub's PDF to Images tool. Each page is rendered as a high-quality JPG image that you can download individually or all at once." },
  { question: "What image format are the pages exported as?", answer: "Pages are exported as JPG at 92% quality with 2x resolution for sharp, clear images." },
  { question: "Can I convert a large PDF with many pages?", answer: "Yes. There's no page limit. Processing happens in your browser so it depends on your device's memory." },
];

export default function PdfToImagesBlog() {
  return (
    <MainLayout>
      <SEOHead title="Convert PDF to Images Online Free — Extract Pages as JPG" description="Convert any PDF to high-quality JPG images online for free. Extract every page as an image. No signup, browser-based." canonical="/blog/convert-pdf-to-images" ogType="article"
        jsonLd={{ ...articleSchema("Convert PDF to Images Online Free", "PDF to JPG conversion guide", "/blog/convert-pdf-to-images", "2026-03-01"), ...faqSchema(faqs) }} />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground"><Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">PDF to Images</span></nav>
        <Link to="/blog"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
        <article className="prose prose-sm max-w-none space-y-6">
          <div className="flex items-center gap-3"><Badge variant="secondary"><Tag className="h-3 w-3 mr-1" />PDF Convert</Badge><span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />6 min read</span></div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">How to Convert PDF to Images Online Free — Extract Pages as JPG</h1>
          <p className="text-lg text-muted-foreground">Need individual images from a PDF? Extract every page as a high-quality JPG image — perfect for presentations, social media, or archiving.</p>
          <h2 className="text-2xl font-bold text-foreground">How to Convert</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>Open <Link to="/pdf-tools" className="text-primary hover:underline">PDF Tools</Link> → PDF to Images</li>
            <li>Upload your PDF</li>
            <li>Click Process — each page renders as JPG</li>
            <li>Download individual pages or all at once</li>
          </ol>
          <h2 className="text-2xl font-bold text-foreground">Use Cases</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Extract slides from a PDF presentation</li>
            <li>Share PDF pages on social media</li>
            <li>Create image previews of documents</li>
            <li>Archive document pages as images</li>
          </ul>
          <p className="text-muted-foreground">Also try: <Link to="/blog/convert-images-to-pdf" className="text-primary hover:underline">Images to PDF</Link>, <Link to="/blog/compress-pdf-reduce-size" className="text-primary hover:underline">Compress PDF</Link>.</p>
        </article>
        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
