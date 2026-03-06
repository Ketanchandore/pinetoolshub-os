import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Share2, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to add a header and footer to a PDF online?", answer: "Upload your PDF to PineToolsHub's Header/Footer tool, enter your header text (top) and footer text (bottom), and click Process. Text is applied to every page instantly." },
  { question: "Can I add different headers on different pages?", answer: "Currently, the same header and footer text is applied to all pages. For page-specific text, use the tool multiple times with extracted page ranges." },
  { question: "What kind of text can I add?", answer: "You can add any text — company names, document titles, dates, confidentiality notices, copyright text, or any custom message." },
  { question: "Does this affect existing headers and footers?", answer: "PineToolsHub adds new text without removing existing content. If the original PDF already has headers/footers, the new text may overlap." },
];

export default function HeaderFooterBlog() {
  const shareUrl = "https://pinetoolshub.com/blog/add-header-footer-to-pdf";
  return (
    <MainLayout>
      <SEOHead title="Add Header & Footer to PDF Online Free — Custom Text on Every Page (2026)" description="Add custom headers and footers to PDF documents online for free. Insert company names, dates, page numbers, confidentiality notices on every page. No signup, no ads, 100% browser-based. Step-by-step guide with PineToolsHub free PDF header footer tool for professional documents." canonical="/blog/add-header-footer-to-pdf" ogType="article" keywords="add header footer to pdf, pdf header footer online free, insert text every pdf page, custom pdf header, add footer to pdf free"
        jsonLd={{ ...articleSchema("Add Header & Footer to PDF Online Free", "Guide to adding custom headers and footers to PDF documents", "/blog/add-header-footer-to-pdf", "2026-03-06"), ...faqSchema(faqs) }} />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-6">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">Header & Footer</span>
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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">Add Header & Footer to PDF Online Free — Custom Text on Every Page (2026 Guide)</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Professional documents need proper headers and footers — company names, dates, document titles, or confidentiality notices. PineToolsHub adds them to every page of your PDF instantly.</p>
          <h2 className="text-2xl font-bold text-foreground">How to Add Headers & Footers</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Open <Link to="/pdf-tools" className="text-primary hover:underline">PDF Tools</Link></strong> — Select "Add Header/Footer".</li>
            <li><strong className="text-foreground">Upload your PDF</strong></li>
            <li><strong className="text-foreground">Enter text</strong> — Header text, footer text, or both.</li>
            <li><strong className="text-foreground">Click Process</strong></li>
            <li><strong className="text-foreground">Download</strong> — Every page now has your header/footer.</li>
          </ol>
          <h2 className="text-2xl font-bold text-foreground">Common Use Cases</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Company branding</strong> — Add company name to every page</li>
            <li><strong className="text-foreground">Date stamps</strong> — Mark documents with creation/revision dates</li>
            <li><strong className="text-foreground">Confidentiality</strong> — Add "CONFIDENTIAL" footer</li>
            <li><strong className="text-foreground">Document titles</strong> — Reference title on every page</li>
          </ul>
          <div className="bg-muted/50 rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">Try It Now — Free PDF Header/Footer Tool</h3>
            <p className="text-muted-foreground mb-4">Add professional headers and footers to any PDF.</p>
            <Link to="/pdf-tools"><Button>Open PDF Tools <span className="ml-1">→</span></Button></Link>
          </div>
        </article>
        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
