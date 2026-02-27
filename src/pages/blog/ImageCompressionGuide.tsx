import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to compress images online without losing quality?", answer: "Use PineToolsHub's Media Tools. Upload your image, set quality to 70-85%, and the Canvas API compresses while preserving visual quality. The before/after comparison shows actual pixel difference so you can judge quality loss yourself." },
  { question: "What is the best image format for web in 2026?", answer: "WebP is the best format for web images in 2026, offering 25-35% better compression than JPEG with equivalent quality. PineToolsHub's 'Optimize' mode automatically converts to WebP. For photos, WebP is ideal; for graphics with transparency, use WebP or PNG." },
  { question: "How to resize images to specific dimensions?", answer: "In PineToolsHub's Media Tools, select 'Resize', enter your target width and height (aspect ratio locks by default), and process. Presets for common sizes (FHD 1920×1080, HD 1280×720, Web 800×600, Thumbnail 400×400) are available for one-click resizing." },
  { question: "Can I convert PNG to JPEG online free?", answer: "Yes. PineToolsHub's 'Convert' tool supports conversion between JPEG, PNG, WebP, and BMP formats. Upload your PNG, select JPEG as output format, adjust quality, and download the converted file instantly. No signup required." },
];

export default function ImageCompressionGuide() {
  return (
    <MainLayout>
      <SEOHead
        title="Compress & Resize Images Online Free (2026 Guide)"
        description="Complete guide to image compression, resizing, and format conversion online. Learn WebP vs JPEG, optimal quality settings, and batch optimization for web and social media."
        canonical="/blog/image-compression-resize-guide"
        ogType="article"
        jsonLd={{
          ...articleSchema("How to Compress & Resize Images Online Free", "Complete image optimization guide for 2026", "/blog/image-compression-resize-guide", "2026-02-14"),
          ...faqSchema(faqs),
        }}
      />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">Image Compression Guide</span>
        </nav>
        <Link to="/blog"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>

        <article className="prose prose-sm max-w-none space-y-6">
          <div className="flex items-center gap-3">
            <Badge variant="secondary"><Tag className="h-3 w-3 mr-1" />Media Tools</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />9 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">How to Compress & Resize Images Online Free (2026 Guide)</h1>

          <p className="text-lg text-muted-foreground leading-relaxed">Images account for 75% of most web pages' total weight. Unoptimized images slow down your website, hurt your SEO ranking, and waste your visitors' bandwidth. This guide teaches you how to compress, resize, and convert images using free browser-based tools that produce professional results.</p>

          <h2 className="text-2xl font-bold text-foreground">Understanding Image Compression</h2>
          <p className="text-muted-foreground leading-relaxed">Image compression reduces file size by removing redundant data. Lossy compression (JPEG, WebP) discards some detail invisible to the human eye, achieving 50-90% size reduction. Lossless compression (PNG) preserves every pixel but achieves smaller reductions (10-30%). The key is finding the sweet spot where file size drops significantly without visible quality loss.</p>

          <h2 className="text-2xl font-bold text-foreground">JPEG vs PNG vs WebP — Which Format to Use</h2>
          <p className="text-muted-foreground leading-relaxed"><strong>JPEG:</strong> Best for photographs and complex images. Supports quality levels from 0-100. At quality 80, most photos look identical to the original at 60% smaller file size. Use for product photos, hero images, and blog post images.</p>
          <p className="text-muted-foreground leading-relaxed"><strong>PNG:</strong> Best for graphics with transparency, logos, screenshots, and text-heavy images. Lossless compression preserves sharp edges and text clarity. Larger file sizes than JPEG for photographs.</p>
          <p className="text-muted-foreground leading-relaxed"><strong>WebP:</strong> The 2026 gold standard for web images. 25-35% smaller than JPEG at equivalent quality, supports transparency like PNG, and is now supported by all major browsers. <Link to="/media-tools" className="text-primary hover:underline">PineToolsHub's Optimize tool</Link> automatically converts to WebP for maximum savings.</p>

          <h2 className="text-2xl font-bold text-foreground">How to Compress Images with PineToolsHub</h2>
          <p className="text-muted-foreground leading-relaxed">Step 1: Open <Link to="/media-tools" className="text-primary hover:underline">Media Tools</Link> and select "Compress." Step 2: Drag and drop your image or click to browse. Step 3: Adjust the quality slider — 70-85% is the sweet spot for most images. Step 4: Click "Process" and see the before/after comparison with exact file size savings. Step 5: Download your compressed image. The entire process takes under 5 seconds and happens in your browser.</p>

          <h2 className="text-2xl font-bold text-foreground">Optimal Image Sizes for Every Platform</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead><tr className="bg-muted/50"><th className="p-3 text-left font-semibold text-foreground">Platform</th><th className="p-3 text-left font-semibold text-foreground">Recommended Size</th><th className="p-3 text-left font-semibold text-foreground">Format</th></tr></thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="p-3">Website Hero</td><td className="p-3">1920×1080px</td><td className="p-3">WebP</td></tr>
                <tr className="border-t border-border"><td className="p-3">Blog Post Image</td><td className="p-3">1200×630px</td><td className="p-3">WebP / JPEG</td></tr>
                <tr className="border-t border-border"><td className="p-3">Instagram Post</td><td className="p-3">1080×1080px</td><td className="p-3">JPEG</td></tr>
                <tr className="border-t border-border"><td className="p-3">Twitter Image</td><td className="p-3">1200×675px</td><td className="p-3">JPEG / PNG</td></tr>
                <tr className="border-t border-border"><td className="p-3">Thumbnail</td><td className="p-3">400×400px</td><td className="p-3">WebP</td></tr>
                <tr className="border-t border-border"><td className="p-3">Email Banner</td><td className="p-3">600×200px</td><td className="p-3">JPEG</td></tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-border/60 bg-muted/30 p-5 space-y-3">
            <h3 className="text-lg font-bold text-foreground">Compress Your Images Now</h3>
            <p className="text-sm text-muted-foreground">Free, no signup, browser-based — with real before/after comparison.</p>
            <Link to="/media-tools"><Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white mt-2">Open Media Tools Free →</Button></Link>
          </div>
        </article>

        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
