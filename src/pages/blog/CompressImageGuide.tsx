import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Image, Minimize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to compress images online without losing quality?", answer: "Use PineToolsHub Image Compressor. Upload your image, set quality to 80-85%, and download. Our smart compression preserves visual quality while reducing file size by 50-80%." },
  { question: "What is the best image format for web?", answer: "WebP is the best format for web — 25-35% smaller than JPEG with similar quality. Use PineToolsHub's Convert tool to switch any image to WebP instantly." },
  { question: "Can I compress PNG files?", answer: "Yes. Upload PNG to our compressor or convert to WebP for even better compression. PNG is lossless but often too large for web use." },
  { question: "How much can images be compressed?", answer: "Typically 50-80% size reduction with minimal quality loss. A 5MB photo can become 500KB-1MB while looking nearly identical." },
  { question: "Is image compression free on PineToolsHub?", answer: "100% free. No limits, no signup, no watermarks. Compress unlimited images." },
];

export default function CompressImageGuide() {
  return (
    <MainLayout>
      <SEOHead
        title="How to Compress Images Online Without Losing Quality (2026 Guide)"
        description="Learn how to compress images online for free without losing quality. Complete guide to JPEG, PNG, WebP compression. Reduce image size by 50-80% for faster websites."
        canonical="/blog/compress-image-online-without-losing-quality"
        keywords="compress image online, compress image without losing quality, reduce image size, image compressor free, compress jpeg online, compress png online, webp converter"
        ogType="article"
        jsonLd={articleSchema(
          "How to Compress Images Online Without Losing Quality",
          "Complete guide to compressing images online for free.",
          "/blog/compress-image-online-without-losing-quality",
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
              <Badge variant="secondary" className="text-xs">Image Guide</Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> 9 min read</span>
              <span className="text-xs text-muted-foreground">March 1, 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              How to Compress Images Online Without Losing Quality (2026 Guide)
            </h1>
            <p className="text-lg text-muted-foreground">
              Images make up 50%+ of most web page sizes. Learn how to compress images by 50-80% while keeping them looking sharp — using free browser-based tools.
            </p>
          </header>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Why Image Compression Matters</h2>
            <p className="text-muted-foreground leading-relaxed">
              Large images slow down your website, hurt SEO rankings, and frustrate users. Google considers page speed a ranking factor. Every 100ms of load time improvement can increase conversions by 1%. Compressing images is the #1 way to speed up any website.
            </p>

            <h2 className="text-2xl font-bold text-foreground">JPEG vs PNG vs WebP — Which Format to Use?</h2>
            <div className="overflow-x-auto rounded-xl border border-border/60">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border/60 bg-muted/30">
                  <th className="text-left p-3 font-semibold text-foreground">Format</th>
                  <th className="text-left p-3 font-semibold text-foreground">Best For</th>
                  <th className="text-left p-3 font-semibold text-foreground">Compression</th>
                  <th className="text-left p-3 font-semibold text-foreground">Transparency</th>
                </tr></thead>
                <tbody>
                  <tr className="border-b border-border/30"><td className="p-3 font-semibold text-foreground">JPEG</td><td className="p-3 text-muted-foreground">Photos</td><td className="p-3 text-muted-foreground">Lossy, great</td><td className="p-3 text-muted-foreground">No</td></tr>
                  <tr className="border-b border-border/30"><td className="p-3 font-semibold text-foreground">PNG</td><td className="p-3 text-muted-foreground">Graphics, logos</td><td className="p-3 text-muted-foreground">Lossless, large</td><td className="p-3 text-muted-foreground">Yes</td></tr>
                  <tr><td className="p-3 font-semibold text-primary">WebP ⭐</td><td className="p-3 text-muted-foreground">Everything</td><td className="p-3 text-muted-foreground">Best of both</td><td className="p-3 text-muted-foreground">Yes</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-foreground">How to Compress Images Free — Step by Step</h2>
            <h3 className="text-xl font-bold text-foreground">Step 1: Open PineToolsHub Image Compressor</h3>
            <p className="text-muted-foreground">Go to <Link to="/media-tools" className="text-primary font-semibold hover:underline">PineToolsHub Media Tools</Link>. Select "Compress" from the tool options.</p>

            <h3 className="text-xl font-bold text-foreground">Step 2: Upload Your Image</h3>
            <p className="text-muted-foreground">Drag and drop any JPEG, PNG, WebP, or BMP image. The tool shows original file size and dimensions.</p>

            <h3 className="text-xl font-bold text-foreground">Step 3: Adjust Quality & Download</h3>
            <p className="text-muted-foreground">Set quality slider (80% is ideal for most cases). Click Process to see the before/after comparison with exact file size savings. Download the compressed image.</p>

            <h2 className="text-2xl font-bold text-foreground">Pro Tips for Maximum Compression</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li><strong>→ Convert to WebP:</strong> WebP files are 25-35% smaller than JPEG. Use our <Link to="/media-tools" className="text-primary hover:underline">format converter</Link>.</li>
              <li><strong>→ Resize first, compress second:</strong> If your image is 4000px wide but displays at 800px, resize it first using our <Link to="/media-tools" className="text-primary hover:underline">resize tool</Link>.</li>
              <li><strong>→ Use 80% quality:</strong> The difference between 80% and 100% is invisible to humans but saves 40-60% file size.</li>
              <li><strong>→ Batch optimize:</strong> Process multiple images for your entire website.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground">Other Tools You'll Love</h2>
            <ul className="space-y-1 text-muted-foreground">
              <li>→ <Link to="/pdf-tools" className="text-primary hover:underline">Images to PDF</Link> — convert your compressed images into a PDF</li>
              <li>→ <Link to="/qr-code" className="text-primary hover:underline">QR Code Generator</Link> — create QR codes for free</li>
              <li>→ <Link to="/text-tools" className="text-primary hover:underline">Text Tools</Link> — word counter, case converter, and more</li>
            </ul>
          </section>

          <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-6 text-center space-y-3">
            <h2 className="text-xl font-bold text-foreground">Compress Your Images Now</h2>
            <p className="text-sm text-muted-foreground">Free, no signup, real compression with before/after preview.</p>
            <Link to="/media-tools">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white gap-2">
                <Minimize2 className="h-4 w-4" /> Compress Image — Free
              </Button>
            </Link>
          </div>

          <FAQSection faqs={faqs} />
        </article>
      </div>
    </MainLayout>
  );
}
