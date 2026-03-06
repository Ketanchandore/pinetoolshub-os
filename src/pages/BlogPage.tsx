import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, webPageSchema } from "@/components/SEOHead";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const blogPosts = [
  { slug: "how-to-merge-pdf-online-free", title: "How to Merge PDF Files Online Free — No Signup (2026)", excerpt: "Step-by-step guide to combining multiple PDF files into one document. Compare PineToolsHub vs iLovePDF vs SmallPDF.", category: "PDF Tools", readTime: "8 min read", date: "Mar 1, 2026", gradient: "from-blue-500 to-cyan-500" },
  { slug: "how-to-split-pdf-pages", title: "How to Split PDF Pages Online Free — Extract Pages Instantly", excerpt: "Split PDF files into separate pages or extract specific page ranges. Browser-based, no signup needed.", category: "PDF Tools", readTime: "6 min read", date: "Mar 1, 2026", gradient: "from-purple-500 to-violet-500" },
  { slug: "compress-pdf-reduce-size", title: "Compress PDF — Reduce File Size Online Free (2026)", excerpt: "Reduce PDF file size by up to 60% without losing quality. Browser-based compression with instant download.", category: "PDF Tools", readTime: "7 min read", date: "Mar 1, 2026", gradient: "from-green-500 to-teal-500" },
  { slug: "rotate-pdf-pages-online", title: "Rotate PDF Pages Online Free — 90°, 180°, 270°", excerpt: "Fix sideways or upside-down scanned documents. Rotate all pages instantly in your browser.", category: "PDF Tools", readTime: "5 min read", date: "Mar 1, 2026", gradient: "from-amber-500 to-orange-500" },
  { slug: "add-watermark-to-pdf", title: "Add Watermark to PDF Online Free — Custom Text Overlay", excerpt: "Protect documents with custom watermarks. Adjust text and opacity. 100% browser-based.", category: "PDF Tools", readTime: "5 min read", date: "Mar 1, 2026", gradient: "from-pink-500 to-rose-500" },
  { slug: "password-protect-pdf", title: "Password Protect PDF Online Free — Lock Your Documents", excerpt: "Add password protection to sensitive PDF files. Secure contracts, financials, and more.", category: "PDF Security", readTime: "5 min read", date: "Mar 1, 2026", gradient: "from-red-500 to-rose-600" },
  { slug: "convert-pdf-to-images", title: "Convert PDF to Images Online Free — Extract Pages as JPG", excerpt: "Extract every PDF page as a high-quality JPG image. Download individual pages or all at once.", category: "PDF Convert", readTime: "6 min read", date: "Mar 1, 2026", gradient: "from-indigo-500 to-blue-500" },
  { slug: "convert-images-to-pdf", title: "Convert Images to PDF Online Free — JPG/PNG to PDF", excerpt: "Combine multiple JPG and PNG images into a single PDF document instantly.", category: "PDF Convert", readTime: "5 min read", date: "Mar 1, 2026", gradient: "from-emerald-500 to-green-500" },
  { slug: "add-page-numbers-to-pdf", title: "Add Page Numbers to PDF Online Free — Automatic Numbering", excerpt: "Add sequential page numbers to every page of your PDF in one click. Professional formatting made easy.", category: "PDF Edit", readTime: "4 min read", date: "Mar 1, 2026", gradient: "from-sky-500 to-blue-500" },
  { slug: "remove-pages-from-pdf", title: "Remove Pages from PDF Online Free — Delete Specific Pages", excerpt: "Remove unwanted pages from PDF documents. Enter page numbers to delete and download the trimmed version.", category: "PDF Edit", readTime: "4 min read", date: "Mar 1, 2026", gradient: "from-red-400 to-rose-500" },
  { slug: "best-free-ai-tools-2026", title: "15 Best Free AI Tools for Productivity in 2026", excerpt: "Discover the most powerful free AI tools transforming how professionals work in 2026.", category: "AI Tools", readTime: "12 min read", date: "Feb 25, 2026", gradient: "from-purple-500 to-pink-500" },
  { slug: "free-pdf-tools-online-guide", title: "Complete Guide to Free PDF Tools Online (No Signup Required)", excerpt: "Learn how to merge, split, compress, convert, watermark, and protect PDFs entirely free.", category: "PDF Tools", readTime: "10 min read", date: "Feb 22, 2026", gradient: "from-blue-500 to-cyan-500" },
  { slug: "why-pinetoolshub-replaces-10-apps", title: "Why PineToolsHub Replaces 10 Apps You Use Daily", excerpt: "Stop paying for separate PDF tools, image editors, writing assistants, and file managers.", category: "Productivity", readTime: "8 min read", date: "Feb 18, 2026", gradient: "from-emerald-500 to-teal-500" },
  { slug: "image-compression-resize-guide", title: "How to Compress & Resize Images Online Free (2026 Guide)", excerpt: "The complete guide to reducing image file sizes without losing quality.", category: "Media Tools", readTime: "9 min read", date: "Feb 14, 2026", gradient: "from-amber-500 to-orange-500" },
  { slug: "ai-content-writing-workflow", title: "AI Content Writing Workflow: From Idea to Published in 10 Minutes", excerpt: "Master AI-assisted content creation with PineToolsHub's Content Studio.", category: "Content Creation", readTime: "11 min read", date: "Feb 10, 2026", gradient: "from-indigo-500 to-purple-500" },
  { slug: "extract-pages-from-pdf", title: "Extract Pages from PDF Online Free — Save Selected Pages as New PDF", excerpt: "Select specific pages or ranges from any PDF and save as a new document. Browser-based, no signup.", category: "PDF Tools", readTime: "6 min read", date: "Mar 6, 2026", gradient: "from-teal-500 to-cyan-500" },
  { slug: "reorder-pdf-pages", title: "Reorder PDF Pages Online Free — Rearrange Page Order", excerpt: "Reorganize PDF pages in any sequence. Fix scanned documents, rearrange presentations.", category: "PDF Edit", readTime: "5 min read", date: "Mar 6, 2026", gradient: "from-violet-500 to-purple-500" },
  { slug: "convert-pdf-to-text", title: "Convert PDF to Text Online Free — Extract Text Content", excerpt: "Extract all readable text from PDF documents. Copy or download as TXT file.", category: "PDF Convert", readTime: "5 min read", date: "Mar 6, 2026", gradient: "from-lime-500 to-green-500" },
  { slug: "flatten-pdf-online", title: "Flatten PDF Online Free — Remove Form Fields & Annotations", excerpt: "Make PDFs read-only by flattening interactive elements. Perfect for sharing and archiving.", category: "PDF Advanced", readTime: "5 min read", date: "Mar 6, 2026", gradient: "from-orange-500 to-red-500" },
  { slug: "convert-pdf-to-grayscale", title: "Convert PDF to Grayscale — Black & White PDF Converter", excerpt: "Save ink and meet printing requirements by converting color PDFs to grayscale.", category: "PDF Edit", readTime: "5 min read", date: "Mar 6, 2026", gradient: "from-gray-500 to-slate-600" },
  { slug: "stamp-pdf-confidential-draft", title: "Stamp PDF — Add CONFIDENTIAL, DRAFT, APPROVED Stamps", excerpt: "Add professional classification stamps to every page of your PDF documents.", category: "PDF Security", readTime: "5 min read", date: "Mar 6, 2026", gradient: "from-red-500 to-pink-500" },
  { slug: "sign-pdf-online-free", title: "Sign PDF Online Free — Electronic Signature Tool", excerpt: "Add your electronic signature to any PDF. Draw, type, or upload signatures.", category: "PDF Security", readTime: "6 min read", date: "Mar 6, 2026", gradient: "from-blue-600 to-indigo-600" },
  { slug: "unlock-pdf-remove-restrictions", title: "Unlock PDF — Remove Restrictions & Password Protection", excerpt: "Remove print, copy, and edit restrictions from protected PDF files.", category: "PDF Security", readTime: "5 min read", date: "Mar 6, 2026", gradient: "from-yellow-500 to-amber-500" },
  { slug: "edit-pdf-metadata", title: "Edit PDF Metadata — Change Title, Author & Properties", excerpt: "Edit or remove PDF document metadata including title, author, subject, and keywords.", category: "PDF Advanced", readTime: "5 min read", date: "Mar 6, 2026", gradient: "from-cyan-500 to-teal-500" },
  { slug: "crop-pdf-online-free", title: "Crop PDF Online Free — Adjust Margins & Trim Pages", excerpt: "Trim whitespace and adjust margins on all PDF pages. Remove unwanted borders.", category: "PDF Edit", readTime: "5 min read", date: "Mar 6, 2026", gradient: "from-green-500 to-emerald-500" },
  { slug: "resize-pdf-pages", title: "Resize PDF Pages — Convert to A4, Letter, Legal Sizes", excerpt: "Change PDF page dimensions between A4, Letter, Legal, A3, and custom sizes.", category: "PDF Edit", readTime: "5 min read", date: "Mar 6, 2026", gradient: "from-pink-500 to-fuchsia-500" },
  { slug: "add-header-footer-to-pdf", title: "Add Header & Footer to PDF — Custom Text on Every Page", excerpt: "Insert company names, dates, and custom text as headers and footers.", category: "PDF Edit", readTime: "5 min read", date: "Mar 6, 2026", gradient: "from-indigo-500 to-blue-500" },
  { slug: "duplicate-pdf-pages", title: "Duplicate PDF Pages — Copy Pages Multiple Times", excerpt: "Duplicate every page of your PDF a specified number of times for forms and handouts.", category: "PDF Advanced", readTime: "4 min read", date: "Mar 6, 2026", gradient: "from-purple-500 to-violet-500" },
  { slug: "reverse-pdf-page-order", title: "Reverse PDF Page Order — Flip Page Sequence", excerpt: "Reverse the page order of any PDF. Fix reverse-scanned documents instantly.", category: "PDF Advanced", readTime: "4 min read", date: "Mar 6, 2026", gradient: "from-rose-500 to-red-500" },
  { slug: "repair-corrupted-pdf", title: "Repair Corrupted PDF — Fix Damaged PDF Files", excerpt: "Attempt to recover content from corrupted or damaged PDF files.", category: "PDF Advanced", readTime: "5 min read", date: "Mar 6, 2026", gradient: "from-amber-500 to-yellow-500" },
  { slug: "convert-pdf-to-base64", title: "Convert PDF to Base64 — Encode for Embedding & APIs", excerpt: "Encode PDF files as Base64 text strings for HTML embedding and API payloads.", category: "Developer Tools", readTime: "5 min read", date: "Mar 6, 2026", gradient: "from-slate-500 to-gray-600" },
  { slug: "resize-image-online-free", title: "Resize Image Online Free — Change Dimensions Without Quality Loss", excerpt: "Resize images to exact dimensions for social media, web, and print.", category: "Media Tools", readTime: "6 min read", date: "Mar 6, 2026", gradient: "from-fuchsia-500 to-pink-500" },
];

export default function BlogPage() {
  return (
    <MainLayout>
      <SEOHead
        title="Blog — Free PDF Tools Guides, AI Productivity Tips & Online Tool Tutorials (2026)"
        description="Expert guides on free PDF tools, AI-powered productivity, image compression and optimization, workflow automation and content creation. Learn how to merge, split, compress, rotate, watermark PDFs and more. Step-by-step tutorials for every tool on PineToolsHub — the best free online productivity suite."
        canonical="/blog"
        keywords="free pdf tools blog, how to merge pdf, compress pdf guide, ai tools 2026, image compression tutorial, productivity tips, online tools guide"
        jsonLd={webPageSchema("PineToolsHub Blog — Free PDF & AI Tools Guides", "Expert guides and tutorials on free online PDF tools, AI productivity and image optimization", "/blog")}
      />
      <div className="min-h-full p-6 md:p-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Blog</h1>
              <p className="text-muted-foreground">Guides, tutorials & tips — {blogPosts.length} articles</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Link to={`/blog/${post.slug}`}>
                <Card className="border-border/60 hover:border-border transition-all group card-hover h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className={`h-2 w-16 rounded-full bg-gradient-to-r ${post.gradient}`} />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-[10px]"><Tag className="h-2.5 w-2.5 mr-1" />{post.category}</Badge>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="h-2.5 w-2.5" />{post.readTime}</span>
                      </div>
                      <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight">{post.title}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                      <span className="text-xs font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">Read more <ArrowRight className="h-3 w-3" /></span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <section className="rounded-2xl border border-border/60 bg-card p-6 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Explore Our Free Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "PDF Tools (30+)", href: "/pdf-tools", desc: "Merge, split, compress & more" },
              { label: "Media Tools", href: "/media-tools", desc: "Compress & resize images" },
              { label: "Content Studio", href: "/content-studio", desc: "AI writing assistant" },
              { label: "File Brain", href: "/file-brain", desc: "AI file management" },
            ].map((link) => (
              <Link key={link.href} to={link.href} className="rounded-xl border border-border/60 p-3 hover:border-primary/40 hover:bg-primary/5 transition-all">
                <p className="text-sm font-semibold text-foreground">{link.label}</p>
                <p className="text-xs text-muted-foreground">{link.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
