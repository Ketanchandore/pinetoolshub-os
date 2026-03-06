import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Share2, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to convert a PDF to grayscale online?", answer: "Upload your PDF to PineToolsHub's Grayscale PDF tool, click Process, and download a black-and-white version. All processing happens in your browser — no upload to any server." },
  { question: "Why convert PDF to grayscale?", answer: "Grayscale PDFs save ink when printing, reduce file size, meet submission requirements for legal or academic documents, and ensure consistent appearance on any printer." },
  { question: "Does grayscale conversion reduce PDF quality?", answer: "Text remains sharp and clear. Color images are converted to their grayscale equivalents. The overall document quality is preserved." },
  { question: "Can I convert specific pages to grayscale?", answer: "Currently, the tool converts all pages. For selective conversion, use Extract Pages first, convert to grayscale, then merge back." },
];

export default function GrayscalePdfBlog() {
  const shareUrl = "https://pinetoolshub.com/blog/convert-pdf-to-grayscale";
  return (
    <MainLayout>
      <SEOHead title="Convert PDF to Grayscale Online Free — Black & White PDF Converter (2026)" description="Convert color PDF documents to grayscale (black and white) online for free. Save ink, reduce file size, meet printing requirements. No signup, no ads, 100% browser-based. Step-by-step guide with PineToolsHub free PDF grayscale converter tool for professional document preparation." canonical="/blog/convert-pdf-to-grayscale" ogType="article" keywords="convert pdf to grayscale, pdf to black and white, grayscale pdf online free, black white pdf converter, pdf grayscale tool"
        jsonLd={{ ...articleSchema("Convert PDF to Grayscale Online Free", "Guide to converting color PDFs to black and white", "/blog/convert-pdf-to-grayscale", "2026-03-06"), ...faqSchema(faqs) }} />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-6">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">Grayscale PDF</span>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/blog"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
          <div className="ml-auto flex gap-2"><Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(shareUrl)}><Share2 className="h-3.5 w-3.5 mr-1" /> Share</Button></div>
        </div>
        <article className="prose prose-sm max-w-none space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="secondary"><Tag className="h-3 w-3 mr-1" />PDF Edit</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />5 min read</span>
            <span className="text-xs text-muted-foreground">Published Mar 6, 2026</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">Convert PDF to Grayscale Online Free — Black & White PDF Converter (2026 Guide)</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Printing a color PDF wastes expensive ink. Legal filings require black and white. PineToolsHub's grayscale converter transforms any color PDF into a crisp black-and-white document — instantly, privately, and completely free.</p>
          <h2 className="text-2xl font-bold text-foreground">How to Convert PDF to Grayscale</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Open <Link to="/pdf-tools" className="text-primary hover:underline">PDF Tools</Link></strong> — Select "Grayscale PDF".</li>
            <li><strong className="text-foreground">Upload your color PDF</strong></li>
            <li><strong className="text-foreground">Click Process</strong> — Conversion happens in your browser.</li>
            <li><strong className="text-foreground">Download</strong> — Your grayscale PDF is ready to print or share.</li>
          </ol>
          <h2 className="text-2xl font-bold text-foreground">Benefits of Grayscale PDFs</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Save Ink & Money</strong> — Black-and-white printing costs significantly less</li>
            <li><strong className="text-foreground">Meet Requirements</strong> — Many courts and institutions require B&W submissions</li>
            <li><strong className="text-foreground">Smaller File Size</strong> — Grayscale PDFs are typically smaller than color</li>
            <li><strong className="text-foreground">Universal Compatibility</strong> — Looks the same on any printer</li>
          </ul>
          <div className="bg-muted/50 rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">Try It Now — Free PDF Grayscale Converter</h3>
            <p className="text-muted-foreground mb-4">Convert any color PDF to black and white instantly.</p>
            <Link to="/pdf-tools"><Button>Open PDF Tools <span className="ml-1">→</span></Button></Link>
          </div>
        </article>
        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
