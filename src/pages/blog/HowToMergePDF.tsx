import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, FileText, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to merge PDF files online for free?", answer: "Go to PineToolsHub PDF Tools, select 'Merge PDF', drag and drop your PDF files, arrange them in order, and click Process. Your merged PDF downloads instantly. No signup, no ads, 100% free." },
  { question: "Can I merge more than 2 PDF files?", answer: "Yes. You can merge unlimited PDF files at once. Simply add all the PDFs you want to combine, arrange them in the desired order, and process." },
  { question: "Is merging PDF online safe?", answer: "On PineToolsHub, 100% safe. All processing happens in your browser using JavaScript (pdf-lib). Your files never leave your device — no upload to any server." },
  { question: "Does merging PDF reduce quality?", answer: "No. Merging PDFs with PineToolsHub preserves the original quality of every page. No compression or re-encoding happens during merge." },
  { question: "Can I merge PDF on mobile phone?", answer: "Yes. PineToolsHub works on all devices — iPhone, Android, tablet, desktop. The interface is fully responsive." },
  { question: "What is the maximum file size for merging?", answer: "Since processing is browser-based, it depends on your device memory. Typically you can merge PDFs up to 100MB+ without issues on modern devices." },
];

export default function HowToMergePDF() {
  return (
    <MainLayout>
      <SEOHead
        title="How to Merge PDF Files Online Free — Step by Step Guide (2026)"
        description="Learn how to merge PDF files online for free without signup. Step-by-step guide to combine multiple PDFs into one using PineToolsHub's free browser-based PDF merger."
        canonical="/blog/how-to-merge-pdf-files-online-free"
        keywords="how to merge pdf files online free, combine pdf, merge pdf without signup, free pdf merger, merge multiple pdfs into one, pdf combiner online"
        ogType="article"
        jsonLd={articleSchema(
          "How to Merge PDF Files Online Free — Step by Step Guide",
          "Complete guide to merging PDF files online for free. No signup, no ads, 100% browser-based.",
          "/blog/how-to-merge-pdf-files-online-free",
          "2026-03-01",
          "2026-03-01"
        )}
      />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
        </Link>

        <article className="space-y-8">
          <header className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">PDF Guide</Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> 8 min read</span>
              <span className="text-xs text-muted-foreground">March 1, 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              How to Merge PDF Files Online Free — Step by Step Guide (2026)
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Need to combine multiple PDF files into one? This guide shows you exactly how to merge PDFs online for free — no signup, no software download, no ads. Works on any device.
            </p>
          </header>

          <section className="prose prose-sm max-w-none space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Why Merge PDF Files?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Merging PDFs is one of the most common document tasks. Whether you're combining invoices, merging report chapters, putting together a portfolio, or creating a single document from multiple scans — a PDF merger saves hours of manual work.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Traditional tools like Adobe Acrobat charge $20+/month. Online tools like iLovePDF and SmallPDF show intrusive ads and have file size limits. <strong>PineToolsHub merges PDFs completely free, with no limits, no ads, and no file uploads to servers.</strong>
            </p>

            <h2 className="text-2xl font-bold text-foreground">How to Merge PDF Files — 3 Easy Steps</h2>

            <h3 className="text-xl font-bold text-foreground">Step 1: Open PineToolsHub PDF Tools</h3>
            <p className="text-muted-foreground leading-relaxed">
              Go to <Link to="/pdf-tools" className="text-primary font-semibold hover:underline">PineToolsHub PDF Tools</Link> and select "Merge PDF". No account needed — the tool loads instantly.
            </p>

            <h3 className="text-xl font-bold text-foreground">Step 2: Upload Your PDF Files</h3>
            <p className="text-muted-foreground leading-relaxed">
              Drag and drop multiple PDF files into the upload area, or click to browse. You can add as many PDFs as you need. Files appear in a list — they'll be merged in the order shown.
            </p>

            <h3 className="text-xl font-bold text-foreground">Step 3: Click Process & Download</h3>
            <p className="text-muted-foreground leading-relaxed">
              Click the "Process" button. Your browser combines all PDFs using the pdf-lib JavaScript library — no file is uploaded anywhere. The merged PDF downloads automatically in seconds.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Why PineToolsHub is the Best Free PDF Merger</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary font-bold">✓</span> <strong>100% Free</strong> — No hidden fees, no premium tier, no daily limits</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">✓</span> <strong>100% Private</strong> — Files never leave your browser. Zero server uploads.</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">✓</span> <strong>No Signup</strong> — Start merging immediately. No email, no account.</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">✓</span> <strong>No Ads</strong> — Clean, distraction-free interface</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">✓</span> <strong>Works on Mobile</strong> — iPhone, Android, tablet, desktop</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">✓</span> <strong>No Quality Loss</strong> — Original PDF quality preserved</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground">PineToolsHub vs iLovePDF vs SmallPDF</h2>
            <div className="overflow-x-auto rounded-xl border border-border/60">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border/60 bg-muted/30">
                  <th className="text-left p-3 font-semibold text-foreground">Feature</th>
                  <th className="text-center p-3 font-semibold text-primary">PineToolsHub</th>
                  <th className="text-center p-3 text-muted-foreground">iLovePDF</th>
                  <th className="text-center p-3 text-muted-foreground">SmallPDF</th>
                </tr></thead>
                <tbody>
                  {[
                    ["Free merge", "✅", "✅ (limited)", "❌ (2/day free)"],
                    ["No ads", "✅", "❌", "❌"],
                    ["No signup", "✅", "✅", "❌"],
                    ["No file upload", "✅", "❌", "❌"],
                    ["Mobile friendly", "✅", "✅", "✅"],
                    ["AI features", "✅", "❌", "❌"],
                  ].map(([feature, pine, ilove, small], i) => (
                    <tr key={i} className="border-b border-border/30">
                      <td className="p-3 text-foreground">{feature}</td>
                      <td className="p-3 text-center">{pine}</td>
                      <td className="p-3 text-center text-muted-foreground">{ilove}</td>
                      <td className="p-3 text-center text-muted-foreground">{small}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-foreground">Other PDF Tools You Might Need</h2>
            <p className="text-muted-foreground">After merging, you might want to:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>→ <Link to="/pdf-tools" className="text-primary hover:underline">Compress PDF</Link> to reduce the merged file size</li>
              <li>→ <Link to="/pdf-tools" className="text-primary hover:underline">Add Watermark</Link> to protect your document</li>
              <li>→ <Link to="/pdf-tools" className="text-primary hover:underline">Protect PDF</Link> with a password</li>
              <li>→ <Link to="/media-tools" className="text-primary hover:underline">Compress Images</Link> before converting to PDF</li>
            </ul>
          </section>

          <div className="rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-6 text-center space-y-3">
            <h2 className="text-xl font-bold text-foreground">Ready to Merge Your PDFs?</h2>
            <p className="text-sm text-muted-foreground">Free, private, no signup. Takes 10 seconds.</p>
            <Link to="/pdf-tools">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white gap-2">
                <Layers className="h-4 w-4" /> Merge PDF Now — Free
              </Button>
            </Link>
          </div>

          <FAQSection faqs={faqs} />
        </article>
      </div>
    </MainLayout>
  );
}
