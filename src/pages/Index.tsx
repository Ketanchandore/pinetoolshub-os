import { Link } from "react-router-dom";
import { SEOHead, softwareSchema, faqSchema, organizationSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { motion } from "framer-motion";
import {
  FileText, Image, PenTool, Brain, Zap, QrCode, Type, Palette,
  ArrowRight, Star, Shield, Sparkles, Globe, CheckCircle2,
  Layers, Scissors, Download, RotateCw, Lock, Stamp,
  Minimize2, Maximize2, RefreshCw, Hash, Calculator, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import logo from "@/assets/logo.png";

const toolCategories = [
  {
    title: "PDF Tools",
    desc: "Merge, split, compress, rotate, watermark, protect, convert — all free, all browser-based",
    href: "/pdf-tools",
    icon: FileText,
    gradient: "from-blue-500 to-cyan-500",
    tools: ["Merge PDF", "Split PDF", "Compress PDF", "Rotate PDF", "Watermark", "Protect PDF", "PDF to Images", "Images to PDF"],
  },
  {
    title: "Image Tools",
    desc: "Compress, resize, convert images with real browser processing. Before/after comparison.",
    href: "/media-tools",
    icon: Image,
    gradient: "from-amber-500 to-orange-500",
    tools: ["Compress Image", "Resize Image", "Convert Format", "Optimize for Web"],
  },
  {
    title: "AI Content Studio",
    desc: "Generate blog posts, tweets, emails, product descriptions with AI in seconds.",
    href: "/content-studio",
    icon: PenTool,
    gradient: "from-purple-500 to-pink-500",
    tools: ["Blog Writer", "Twitter Thread", "Email Copy", "Product Description"],
  },
  {
    title: "QR Code Generator",
    desc: "Create QR codes for URLs, text, WiFi, contacts. Download as PNG or SVG.",
    href: "/qr-code",
    icon: QrCode,
    gradient: "from-emerald-500 to-teal-500",
    tools: ["URL QR Code", "Text QR Code", "WiFi QR Code", "vCard QR Code"],
  },
  {
    title: "Text Tools",
    desc: "Word counter, case converter, text diff, lorem ipsum, slug generator & more.",
    href: "/text-tools",
    icon: Type,
    gradient: "from-indigo-500 to-violet-500",
    tools: ["Word Counter", "Case Converter", "Text Diff", "Slug Generator"],
  },
  {
    title: "Color Tools",
    desc: "Color picker, palette generator, contrast checker, CSS gradient maker.",
    href: "/color-tools",
    icon: Palette,
    gradient: "from-pink-500 to-rose-500",
    tools: ["Color Picker", "Palette Generator", "Contrast Checker", "Gradient Maker"],
  },
  {
    title: "Unit Converter",
    desc: "Convert length, weight, temperature, speed, data storage and more instantly.",
    href: "/unit-converter",
    icon: Calculator,
    gradient: "from-cyan-500 to-blue-500",
    tools: ["Length", "Weight", "Temperature", "Data Storage"],
  },
  {
    title: "File Brain",
    desc: "AI-powered file manager. Upload files, get AI summaries, tags, and chat with documents.",
    href: "/file-brain",
    icon: Brain,
    gradient: "from-rose-500 to-red-500",
    tools: ["AI Summaries", "Smart Tags", "Chat with PDF", "Cloud Sync"],
  },
];

const stats = [
  { label: "Free Tools", value: "30+", icon: Sparkles },
  { label: "Countries", value: "195+", icon: Globe },
  { label: "No Signup Needed", value: "100%", icon: Shield },
  { label: "Browser-Based", value: "Private", icon: Lock },
];

const homeFaqs = [
  { question: "Is PineToolsHub really free?", answer: "Yes, 100% free. All tools — PDF, image, text, QR code, color, unit converter, AI content — work without any signup, login, or payment. No hidden limits." },
  { question: "Are my files safe?", answer: "Absolutely. All PDF and image processing happens in your browser using JavaScript. Your files never leave your device. We don't upload, store, or see your data." },
  { question: "How is PineToolsHub different from iLovePDF or SmallPDF?", answer: "PineToolsHub offers PDF tools + image tools + AI writing + QR codes + text tools + color tools + unit converter — all in one place, for free, with no ads. Plus AI features like Chat with PDF and smart file summaries that competitors don't offer." },
  { question: "Do I need to create an account?", answer: "No. Every tool works instantly without signup. Creating an account is optional and only needed for cloud file storage in File Brain." },
  { question: "What tools are available?", answer: "30+ tools across 8 categories: PDF Tools (merge, split, compress, rotate, watermark, protect, convert), Image Tools (compress, resize, convert), AI Content Studio, QR Code Generator, Text Tools, Color Tools, Unit Converter, and AI File Brain." },
  { question: "Can I use PineToolsHub on mobile?", answer: "Yes. The entire website is fully responsive and works perfectly on phones, tablets, and desktops across all browsers." },
];

export default function Index() {
  return (
    <>
      <SEOHead
        title="PineToolsHub — Free Online PDF Tools, Image Compressor & AI Productivity Tools"
        description="30+ free online tools: merge PDF, compress images, AI writing, QR code generator, text tools, color picker, unit converter. No signup, no ads, 100% browser-based privacy. The #1 free alternative to iLovePDF."
        canonical="/"
        keywords="free online pdf tools, merge pdf online free, compress image online, ai writing tools free, qr code generator, free productivity tools, pdf to image converter, image compressor"
        jsonLd={softwareSchema()}
      />

      {/* Global nav for non-logged-in users */}
      <div className="min-h-screen bg-background">
        {/* Top Nav */}
        <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logo} alt="PineToolsHub — Free Online PDF and AI Tools" className="h-9 w-9 rounded-lg" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground leading-tight">PineToolsHub</span>
                <span className="text-[9px] font-semibold uppercase tracking-widest text-gradient-accent">Free AI Tools</span>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {[
                { label: "PDF Tools", href: "/pdf-tools" },
                { label: "Image Tools", href: "/media-tools" },
                { label: "QR Code", href: "/qr-code" },
                { label: "Text Tools", href: "/text-tools" },
                { label: "AI Studio", href: "/content-studio" },
                { label: "Blog", href: "/blog" },
              ].map((item) => (
                <Link key={item.href} to={item.href} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="text-sm">Sign In</Button>
              </Link>
              <Link to="/pdf-tools">
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> Try Free Tools
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-4xl mx-auto space-y-6">
              <Badge variant="secondary" className="text-xs px-3 py-1">
                <Star className="h-3 w-3 mr-1 text-amber-500" /> 30+ Free Tools — No Signup Required
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight">
                Free Online <span className="text-gradient-primary">PDF Tools</span>,{" "}
                <span className="text-gradient-accent">Image Compressor</span> &{" "}
                <span className="text-gradient-purple">AI Productivity Tools</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Merge PDF, compress images, generate QR codes, write with AI — all free, private, and browser-based.
                No signup. No ads. No file uploads to servers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link to="/pdf-tools">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white gap-2 px-8 h-12 text-base shadow-lg shadow-blue-500/20">
                    <FileText className="h-5 w-5" /> PDF Tools — Free
                  </Button>
                </Link>
                <Link to="/media-tools">
                  <Button size="lg" variant="outline" className="gap-2 px-8 h-12 text-base">
                    <Image className="h-5 w-5" /> Compress Image
                  </Button>
                </Link>
                <Link to="/qr-code">
                  <Button size="lg" variant="outline" className="gap-2 px-8 h-12 text-base">
                    <QrCode className="h-5 w-5" /> QR Generator
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center rounded-2xl border border-border/60 bg-card p-4">
                  <stat.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Tool Categories */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">All Tools, One Place — 100% Free</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              PDF tools, image tools, AI writer, QR codes, text tools, color tools, unit converter. Everything you need, no app switching.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {toolCategories.map((cat, i) => (
              <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Link to={cat.href}>
                  <Card className="border-border/60 hover:border-border transition-all group card-hover h-full">
                    <CardContent className="p-5 space-y-3">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} shadow-md`}>
                        <cat.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{cat.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{cat.desc}</p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {cat.tools.slice(0, 4).map((t) => (
                          <Badge key={t} variant="secondary" className="text-[9px] px-1.5 py-0">{t}</Badge>
                        ))}
                        {cat.tools.length > 4 && <Badge variant="outline" className="text-[9px] px-1.5 py-0">+{cat.tools.length - 4}</Badge>}
                      </div>
                      <p className="text-xs font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Use Free <ArrowRight className="h-3 w-3" />
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why PineToolsHub */}
        <section className="bg-muted/30 border-y border-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Why Choose PineToolsHub Over iLovePDF?</h2>
              <p className="text-muted-foreground mt-2">Everything they charge for, we give you free — plus AI features they don't have.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "100% Private", desc: "All processing happens in your browser. Files never leave your device. No server uploads, no data collection." },
                { icon: Sparkles, title: "AI-Powered", desc: "Chat with PDFs, get AI file summaries, generate content with AI. Features no other free tool offers." },
                { icon: Globe, title: "No Signup Required", desc: "Every tool works instantly. No account creation, no email verification, no paywall. Just drag, drop, and download." },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="border-border/60 h-full">
                    <CardContent className="p-6 text-center space-y-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mx-auto">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Comparison Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
              <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/60">
                      <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                      <th className="text-center p-4 font-semibold text-primary">PineToolsHub</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground">iLovePDF</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground">SmallPDF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["No ads", true, false, false],
                      ["100% free", true, false, false],
                      ["No signup required", true, true, false],
                      ["AI chat with PDF", true, false, false],
                      ["Image tools included", true, false, false],
                      ["QR code generator", true, false, false],
                      ["AI content writer", true, false, false],
                      ["Text & color tools", true, false, false],
                      ["Browser-based (private)", true, false, false],
                      ["Dark mode", true, false, false],
                    ].map(([feature, pine, ilove, small], i) => (
                      <tr key={i} className="border-b border-border/30 last:border-0">
                        <td className="p-3 text-foreground">{feature as string}</td>
                        <td className="p-3 text-center">{pine ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /> : <span className="text-muted-foreground">—</span>}</td>
                        <td className="p-3 text-center">{ilove ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /> : <span className="text-muted-foreground">—</span>}</td>
                        <td className="p-3 text-center">{small ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /> : <span className="text-muted-foreground">—</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Popular Tools Quick Access */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Most Popular Free Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Merge PDF", icon: Layers, href: "/pdf-tools", gradient: "from-blue-500 to-cyan-500" },
              { label: "Compress PDF", icon: Download, href: "/pdf-tools", gradient: "from-green-500 to-teal-500" },
              { label: "Compress Image", icon: Minimize2, href: "/media-tools", gradient: "from-amber-500 to-orange-500" },
              { label: "QR Code", icon: QrCode, href: "/qr-code", gradient: "from-emerald-500 to-teal-500" },
              { label: "Word Counter", icon: Hash, href: "/text-tools", gradient: "from-indigo-500 to-violet-500" },
              { label: "AI Writer", icon: PenTool, href: "/content-studio", gradient: "from-purple-500 to-pink-500" },
            ].map((item) => (
              <Link key={item.label} to={item.href}>
                <div className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-card p-4 hover:border-border hover:shadow-sm transition-all text-center group">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow`}>
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section className="bg-muted/30 border-y border-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Latest Guides & Tutorials</h2>
              <Link to="/blog" className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
                All posts <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: "How to Merge PDF Files Online Free", slug: "how-to-merge-pdf-files-online-free", cat: "PDF Guide" },
                { title: "Compress Images Online Without Losing Quality", slug: "compress-image-online-without-losing-quality", cat: "Image Guide" },
                { title: "Best Free AI Writing Tools in 2026", slug: "best-free-ai-tools-2026", cat: "AI Tools" },
              ].map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`}>
                  <Card className="border-border/60 hover:border-border transition-all group card-hover">
                    <CardContent className="p-5">
                      <Badge variant="secondary" className="text-[9px] mb-2">{post.cat}</Badge>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-sm leading-tight">{post.title}</h3>
                      <p className="text-xs text-primary mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">Read guide <ArrowRight className="h-3 w-3" /></p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <FAQSection faqs={homeFaqs} title="Frequently Asked Questions" />
        </section>

        {/* Footer */}
        <footer className="border-t border-border/60 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div>
                <h4 className="font-bold text-foreground text-sm mb-3">PDF Tools</h4>
                <ul className="space-y-1.5">
                  {["Merge PDF", "Split PDF", "Compress PDF", "Rotate PDF", "Watermark PDF", "Protect PDF", "PDF to Images", "Images to PDF"].map((t) => (
                    <li key={t}><Link to="/pdf-tools" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm mb-3">Image Tools</h4>
                <ul className="space-y-1.5">
                  {["Compress Image", "Resize Image", "Convert Format", "Optimize for Web"].map((t) => (
                    <li key={t}><Link to="/media-tools" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm mb-3">More Tools</h4>
                <ul className="space-y-1.5">
                  {[
                    { label: "QR Code Generator", href: "/qr-code" },
                    { label: "Text Tools", href: "/text-tools" },
                    { label: "Color Tools", href: "/color-tools" },
                    { label: "Unit Converter", href: "/unit-converter" },
                    { label: "AI Content Studio", href: "/content-studio" },
                    { label: "File Brain", href: "/file-brain" },
                  ].map((t) => (
                    <li key={t.label}><Link to={t.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm mb-3">Resources</h4>
                <ul className="space-y-1.5">
                  {[
                    { label: "Blog", href: "/blog" },
                    { label: "How to Merge PDF", href: "/blog/how-to-merge-pdf-files-online-free" },
                    { label: "Compress Image Guide", href: "/blog/compress-image-online-without-losing-quality" },
                    { label: "AI Tools Guide 2026", href: "/blog/best-free-ai-tools-2026" },
                  ].map((t) => (
                    <li key={t.label}><Link to={t.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t.label}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <img src={logo} alt="PineToolsHub logo" className="h-7 w-7 rounded-lg" />
                <span className="text-sm font-bold text-foreground">PineToolsHub</span>
              </div>
              <p className="text-xs text-muted-foreground">© 2026 PineToolsHub. Free online tools for everyone. No ads, no signup.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
