import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Share2, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to merge PDF files online for free?", answer: "Go to PineToolsHub's PDF Tools page, select 'Merge PDF', upload multiple PDF files, arrange them in order, and click Process. Your merged PDF downloads instantly — no signup, no ads, 100% browser-based." },
  { question: "Is merging PDFs online safe?", answer: "Yes. PineToolsHub processes all files entirely in your browser. Your PDFs never leave your device — no server upload, no data storage, complete privacy." },
  { question: "Can I merge more than 2 PDFs at once?", answer: "Absolutely. You can merge unlimited PDF files at once. Simply drag and drop all your files, arrange the order, and merge them into one document." },
  { question: "Does PDF merging reduce quality?", answer: "No. PineToolsHub uses pdf-lib to combine PDFs at the byte level. Text, images, and formatting remain identical to the originals." },
];

export default function MergePdfBlog() {
  const shareUrl = "https://pinetoolshub.com/blog/how-to-merge-pdf-online-free";
  return (
    <MainLayout>
      <SEOHead title="How to Merge PDF Files Online Free — No Signup (2026)" description="Learn how to combine multiple PDF files into one document online for free. No signup, no ads, 100% browser-based. Step-by-step guide with PineToolsHub." canonical="/blog/how-to-merge-pdf-online-free" ogType="article"
        jsonLd={{ ...articleSchema("How to Merge PDF Files Online Free", "Step-by-step guide to merging PDFs online", "/blog/how-to-merge-pdf-online-free", "2026-03-01"), ...faqSchema(faqs) }} />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">Merge PDF</span>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/blog"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(shareUrl)}><Share2 className="h-3.5 w-3.5 mr-1" /> Share</Button>
          </div>
        </div>

        <article className="prose prose-sm max-w-none space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="secondary"><Tag className="h-3 w-3 mr-1" />PDF Tools</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />8 min read</span>
            <span className="text-xs text-muted-foreground">Published Mar 1, 2026</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">How to Merge PDF Files Online Free — No Signup Required (2026 Guide)</h1>

          <p className="text-lg text-muted-foreground leading-relaxed">Need to combine multiple PDF documents into a single file? Whether you're merging invoices, contracts, reports, or scanned documents — PineToolsHub's free PDF merger handles it instantly in your browser with zero privacy risk.</p>

          <h2 className="text-2xl font-bold text-foreground">Why Merge PDFs Online?</h2>
          <p className="text-muted-foreground">Combining PDF files is one of the most common document tasks. Instead of installing desktop software or paying for Adobe Acrobat, you can merge PDFs online in seconds. PineToolsHub processes everything locally in your browser — your files never leave your device.</p>

          <h2 className="text-2xl font-bold text-foreground">How to Merge PDF Files — Step by Step</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Go to <Link to="/pdf-tools" className="text-primary hover:underline">PDF Tools</Link></strong> — Select "Merge PDF" from the tool grid.</li>
            <li><strong className="text-foreground">Upload your PDFs</strong> — Drag and drop multiple PDF files, or click to browse. No file size limit.</li>
            <li><strong className="text-foreground">Arrange the order</strong> — Files will be merged in the order they appear.</li>
            <li><strong className="text-foreground">Click "Merge PDF"</strong> — Processing happens instantly in your browser.</li>
            <li><strong className="text-foreground">Download</strong> — Your merged PDF downloads automatically. Done!</li>
          </ol>

          <h2 className="text-2xl font-bold text-foreground">Key Features of PineToolsHub PDF Merger</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">100% Browser-Based</strong> — No server upload, complete privacy</li>
            <li><strong className="text-foreground">No File Size Limit</strong> — Merge PDFs of any size</li>
            <li><strong className="text-foreground">Unlimited Files</strong> — Combine as many PDFs as you need</li>
            <li><strong className="text-foreground">No Signup Required</strong> — Start immediately, no account needed</li>
            <li><strong className="text-foreground">No Ads</strong> — Clean, distraction-free experience</li>
            <li><strong className="text-foreground">Free Forever</strong> — No hidden costs or premium paywalls</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground">PineToolsHub vs iLovePDF vs SmallPDF — PDF Merger Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead><tr className="bg-muted/50"><th className="p-3 text-left font-semibold">Feature</th><th className="p-3 text-left font-semibold">PineToolsHub</th><th className="p-3 text-left font-semibold">iLovePDF</th><th className="p-3 text-left font-semibold">SmallPDF</th></tr></thead>
              <tbody>
                <tr className="border-t border-border"><td className="p-3">Price</td><td className="p-3 text-green-600 font-semibold">Free</td><td className="p-3">Free (limited)</td><td className="p-3">Free (2/day)</td></tr>
                <tr className="border-t border-border"><td className="p-3">File Upload to Server</td><td className="p-3 text-green-600 font-semibold">No (browser)</td><td className="p-3 text-red-500">Yes</td><td className="p-3 text-red-500">Yes</td></tr>
                <tr className="border-t border-border"><td className="p-3">File Size Limit</td><td className="p-3 text-green-600 font-semibold">None</td><td className="p-3">25MB free</td><td className="p-3">5MB free</td></tr>
                <tr className="border-t border-border"><td className="p-3">Ads</td><td className="p-3 text-green-600 font-semibold">None</td><td className="p-3 text-red-500">Yes</td><td className="p-3">Minimal</td></tr>
                <tr className="border-t border-border"><td className="p-3">Signup Required</td><td className="p-3 text-green-600 font-semibold">No</td><td className="p-3">No</td><td className="p-3">Yes (after 2)</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-foreground">Common Use Cases for Merging PDFs</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Combining multiple invoices into one document for accounting</li>
            <li>Merging scanned pages into a complete document</li>
            <li>Joining different sections of a report or proposal</li>
            <li>Creating a single portfolio from multiple design files</li>
            <li>Combining cover letter and resume for job applications</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground">More PDF Tools You'll Love</h2>
          <p className="text-muted-foreground">PineToolsHub offers <Link to="/pdf-tools" className="text-primary hover:underline">30+ free PDF tools</Link> including <Link to="/blog/how-to-split-pdf-pages" className="text-primary hover:underline">Split PDF</Link>, <Link to="/blog/compress-pdf-reduce-size" className="text-primary hover:underline">Compress PDF</Link>, <Link to="/blog/rotate-pdf-pages-online" className="text-primary hover:underline">Rotate PDF</Link>, and more — all free, browser-based, and private.</p>
        </article>

        <FAQSection faqs={faqs} />

        <section className="rounded-2xl border border-border/60 bg-card p-6 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Try It Now</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[{ label: "Merge PDF", href: "/pdf-tools" }, { label: "Split PDF", href: "/pdf-tools" }, { label: "Compress PDF", href: "/pdf-tools" }, { label: "All PDF Tools", href: "/pdf-tools" }].map(link => (
              <Link key={link.label} to={link.href} className="rounded-xl border border-border/60 p-3 hover:border-primary/40 hover:bg-primary/5 transition-all text-center">
                <p className="text-sm font-semibold text-foreground">{link.label}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
