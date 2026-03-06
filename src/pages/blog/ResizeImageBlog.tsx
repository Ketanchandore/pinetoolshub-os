import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, articleSchema, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { ArrowLeft, Share2, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "How to resize an image online for free?", answer: "Upload your image to PineToolsHub's Media Tools, select the resize option, enter your target dimensions (width × height), and download the resized image instantly. No signup needed." },
  { question: "Can I resize images without losing quality?", answer: "PineToolsHub uses browser Canvas API for high-quality resizing. Downscaling maintains sharpness, while upscaling may introduce some softness depending on the scale factor." },
  { question: "What image formats are supported?", answer: "JPG, PNG, WebP, GIF, and BMP. You can also convert between formats while resizing." },
  { question: "Can I resize multiple images at once?", answer: "Yes. Upload multiple images and they'll all be resized to your specified dimensions." },
];

export default function ResizeImageBlog() {
  const shareUrl = "https://pinetoolshub.com/blog/resize-image-online-free";
  return (
    <MainLayout>
      <SEOHead title="Resize Image Online Free — Change Image Dimensions Without Quality Loss (2026)" description="Resize images online for free. Change width, height, and dimensions of JPG, PNG, WebP images without losing quality. Batch resize multiple images at once. No signup, no ads, 100% browser-based. Step-by-step guide with PineToolsHub free image resizer tool for web, social media, and print." canonical="/blog/resize-image-online-free" ogType="article" keywords="resize image online free, change image dimensions, image resizer tool, resize photo online, reduce image size free"
        jsonLd={{ ...articleSchema("Resize Image Online Free", "Guide to resizing images without quality loss", "/blog/resize-image-online-free", "2026-03-06"), ...faqSchema(faqs) }} />
      <div className="min-h-full p-6 md:p-8 max-w-4xl mx-auto space-y-6">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/blog" className="hover:text-foreground">Blog</Link> / <span className="text-foreground">Resize Image</span>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/blog"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
          <div className="ml-auto flex gap-2"><Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(shareUrl)}><Share2 className="h-3.5 w-3.5 mr-1" /> Share</Button></div>
        </div>
        <article className="prose prose-sm max-w-none space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="secondary"><Tag className="h-3 w-3 mr-1" />Media Tools</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />6 min read</span>
            <span className="text-xs text-muted-foreground">Published Mar 6, 2026</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">Resize Image Online Free — Change Dimensions Without Quality Loss (2026 Guide)</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Images too large for your website? Need specific dimensions for social media? PineToolsHub's image resizer changes width and height while preserving quality — all within your browser.</p>
          <h2 className="text-2xl font-bold text-foreground">How to Resize Images Online</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Open <Link to="/media-tools" className="text-primary hover:underline">Media Tools</Link></strong></li>
            <li><strong className="text-foreground">Upload your image</strong> — JPG, PNG, WebP, or GIF.</li>
            <li><strong className="text-foreground">Enter dimensions</strong> — Set target width and height.</li>
            <li><strong className="text-foreground">Download</strong> — Resized image ready instantly.</li>
          </ol>
          <h2 className="text-2xl font-bold text-foreground">Common Image Sizes</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Instagram Post</strong> — 1080 × 1080 px</li>
            <li><strong className="text-foreground">Facebook Cover</strong> — 820 × 312 px</li>
            <li><strong className="text-foreground">Twitter Header</strong> — 1500 × 500 px</li>
            <li><strong className="text-foreground">LinkedIn Banner</strong> — 1584 × 396 px</li>
            <li><strong className="text-foreground">YouTube Thumbnail</strong> — 1280 × 720 px</li>
          </ul>
          <div className="bg-muted/50 rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">Try It Now — Free Image Resizer</h3>
            <p className="text-muted-foreground mb-4">Resize any image to exact dimensions.</p>
            <Link to="/media-tools"><Button>Open Media Tools <span className="ml-1">→</span></Button></Link>
          </div>
        </article>
        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
