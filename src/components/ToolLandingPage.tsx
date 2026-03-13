import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield, Zap, Globe, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { SEOFooter } from "@/components/SEOFooter";

interface ToolLandingPageProps {
  toolId: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  canonical: string;
  keywords: string;
  icon: LucideIcon;
  iconGradient: string;
  heroTitle: string;
  heroSubtitle: string;
  features: { title: string; description: string }[];
  howToSteps: { step: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedTools: { name: string; url: string; description: string }[];
  longDescription: string;
  toolLink: string;
}

export function ToolLandingPage({
  toolId, title, seoTitle, seoDescription, canonical, keywords,
  icon: Icon, iconGradient, heroTitle, heroSubtitle,
  features, howToSteps, faqs, relatedTools, longDescription, toolLink,
}: ToolLandingPageProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: seoDescription,
    url: `https://pinetoolshub.com${canonical}`,
  };

  const combinedJsonLd = [jsonLd, faqSchema(faqs), breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "PDF Tools", url: "/pdf-tools" },
    { name: title, url: canonical },
  ])];

  return (
    <MainLayout>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={canonical}
        keywords={keywords}
        jsonLd={combinedJsonLd as any}
      />
      <div className="min-h-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="relative mx-auto max-w-4xl text-center space-y-6">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${iconGradient} shadow-2xl`}>
              <Icon className="h-10 w-10 text-white" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {heroTitle}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {heroSubtitle}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-3">
              <Link to={toolLink}>
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground gap-2 text-base px-8 py-6 rounded-xl shadow-lg">
                  Use {title} Now — Free <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {[
                { icon: Shield, text: "100% Private — No Upload" },
                { icon: Zap, text: "Instant Processing" },
                { icon: Globe, text: "Works on Any Device" },
                { icon: Star, text: "No Signup Required" },
              ].map((badge, i) => (
                <Badge key={i} variant="outline" className="gap-1.5 px-3 py-1.5 text-xs border-border/60">
                  <badge.icon className="h-3 w-3 text-primary" /> {badge.text}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4 py-12 md:py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              Why Choose PineToolsHub {title}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="border-border/60 h-full hover:border-primary/30 transition-colors">
                    <CardContent className="p-5 space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        <h3 className="font-semibold text-foreground text-sm">{f.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How To Steps */}
        <section className="px-4 py-12 md:py-16 bg-muted/30">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              How to {title} Online — 3 Simple Steps
            </h2>
            <div className="space-y-6">
              {howToSteps.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{s.step}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{s.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to={toolLink}>
                <Button size="lg" className="gap-2">
                  Start {title} Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Long Description for SEO */}
        <section className="px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl prose prose-sm dark:prose-invert">
            <h2 className="text-2xl font-bold text-foreground">Everything You Need to Know About {title}</h2>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm">
              {longDescription}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-12 md:py-16 bg-muted/30">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              Frequently Asked Questions About {title}
            </h2>
            <FAQSection faqs={faqs} />
          </div>
        </section>

        {/* Related Tools */}
        <section className="px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              Related Free PDF Tools
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {relatedTools.map((t, i) => (
                <Link key={i} to={t.url} className="group">
                  <Card className="border-border/60 hover:border-primary/40 transition-all h-full">
                    <CardContent className="p-4 text-center space-y-1">
                      <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{t.name}</p>
                      <p className="text-[10px] text-muted-foreground">{t.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-16 text-center">
          <div className="mx-auto max-w-2xl space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Ready to {title}? It's Free!
            </h2>
            <p className="text-muted-foreground">No signup, no ads, no file limits. 100% browser-based privacy.</p>
            <Link to={toolLink}>
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground gap-2 text-base px-8 py-6 rounded-xl shadow-lg">
                {title} Now — Free <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
