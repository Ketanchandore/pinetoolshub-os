import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, webPageSchema } from "@/components/SEOHead";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const blogPosts = [
  {
    slug: "best-free-ai-tools-2026",
    title: "15 Best Free AI Tools for Productivity in 2026",
    excerpt: "Discover the most powerful free AI tools that are transforming how professionals work in 2026. From AI writing assistants to intelligent file management, these tools eliminate busywork and supercharge your output.",
    category: "AI Tools",
    readTime: "12 min read",
    date: "Feb 25, 2026",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    slug: "free-pdf-tools-online-guide",
    title: "Complete Guide to Free PDF Tools Online (No Signup Required)",
    excerpt: "Learn how to merge, split, compress, convert, watermark, and protect PDFs entirely free — no account needed. Compare PineToolsHub vs iLovePDF vs SmallPDF and discover which tool gives you the best results without ads.",
    category: "PDF Tools",
    readTime: "10 min read",
    date: "Feb 22, 2026",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    slug: "why-pinetoolshub-replaces-10-apps",
    title: "Why PineToolsHub Replaces 10 Apps You Use Daily",
    excerpt: "Stop paying for separate PDF tools, image editors, writing assistants, and file managers. PineToolsHub combines everything into one free, AI-powered workspace that actually remembers your work.",
    category: "Productivity",
    readTime: "8 min read",
    date: "Feb 18, 2026",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    slug: "image-compression-resize-guide",
    title: "How to Compress & Resize Images Online Free (2026 Guide)",
    excerpt: "The complete guide to reducing image file sizes without losing quality. Learn browser-based compression techniques, format conversion (JPEG vs WebP vs PNG), and batch optimization for websites and social media.",
    category: "Media Tools",
    readTime: "9 min read",
    date: "Feb 14, 2026",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    slug: "ai-content-writing-workflow",
    title: "AI Content Writing Workflow: From Idea to Published in 10 Minutes",
    excerpt: "Master the art of AI-assisted content creation. Learn how to use PineToolsHub's Content Studio to generate blog posts, social media threads, marketing emails, and product descriptions that convert.",
    category: "Content Creation",
    readTime: "11 min read",
    date: "Feb 10, 2026",
    gradient: "from-indigo-500 to-purple-500",
  },
];

export default function BlogPage() {
  return (
    <MainLayout>
      <SEOHead
        title="Blog — Free AI Tools, PDF Guides & Productivity Tips"
        description="Expert guides on free AI tools, PDF processing, image optimization, and productivity workflows. Learn how to work faster with PineToolsHub's free online tools."
        canonical="/blog"
        keywords="free AI tools blog, PDF tools guide, image compression tutorial, productivity tips 2026, online tools guide"
        jsonLd={webPageSchema("PineToolsHub Blog", "Expert guides on free AI tools and productivity", "/blog")}
      />
      <div className="min-h-full p-6 md:p-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Blog</h1>
              <p className="text-muted-foreground">Guides, tutorials & tips for modern productivity</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
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
                      <span className="text-xs font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read more <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Internal Links Section */}
        <section className="rounded-2xl border border-border/60 bg-card p-6 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Explore Our Free Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "PDF Tools", href: "/pdf-tools", desc: "Merge, split, compress PDFs" },
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
