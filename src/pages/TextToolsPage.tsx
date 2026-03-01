import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { motion } from "framer-motion";
import { Type, Hash, ArrowUpDown, Minus, Copy, CheckCircle2, RotateCcw, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const tools = [
  { id: "counter", label: "Word Counter", icon: Hash, desc: "Count words, characters, sentences" },
  { id: "case", label: "Case Converter", icon: ArrowUpDown, desc: "Upper, lower, title, sentence case" },
  { id: "slug", label: "Slug Generator", icon: Minus, desc: "URL-friendly slugs" },
  { id: "lorem", label: "Lorem Ipsum", icon: FileText, desc: "Generate placeholder text" },
];

const faqs = [
  { question: "How to count words in text online?", answer: "Paste your text in the Word Counter tool above. It instantly shows word count, character count, sentence count, paragraph count, and estimated reading time." },
  { question: "How to convert text to uppercase or lowercase?", answer: "Use the Case Converter. Paste text and click UPPERCASE, lowercase, Title Case, or Sentence case for instant conversion." },
  { question: "What is a URL slug?", answer: "A slug is the URL-friendly version of a title. It replaces spaces with hyphens and removes special characters. Example: 'How to Merge PDF' becomes 'how-to-merge-pdf'." },
  { question: "Is Lorem Ipsum generator free?", answer: "Yes. Generate unlimited paragraphs of Lorem Ipsum placeholder text for free, instantly." },
];

function countStats(text: string) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;
  const readTime = Math.max(1, Math.ceil(words / 200));
  return { words, chars, charsNoSpaces, sentences, paragraphs, readTime };
}

function toSlug(text: string) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");
}

const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export default function TextToolsPage() {
  const [activeTool, setActiveTool] = useState("counter");
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [loremCount, setLoremCount] = useState(3);
  const { toast } = useToast();

  const stats = countStats(text);

  const handleCopy = async (content: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    toast({ title: "Copied!" });
  };

  const applyCase = (type: string) => {
    switch (type) {
      case "upper": setText(text.toUpperCase()); break;
      case "lower": setText(text.toLowerCase()); break;
      case "title": setText(text.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.substring(1).toLowerCase())); break;
      case "sentence": setText(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()); break;
    }
  };

  const generateLorem = () => {
    setText(Array(loremCount).fill(LOREM).join("\n\n"));
  };

  return (
    <MainLayout>
      <SEOHead
        title="Free Text Tools — Word Counter, Case Converter, Slug Generator"
        description="Free online text tools: word counter, character counter, case converter, URL slug generator, Lorem Ipsum generator. No signup, instant results."
        canonical="/text-tools"
        keywords="word counter online, character counter, case converter, slug generator, lorem ipsum generator, text tools free"
        jsonLd={faqSchema(faqs)}
      />
      <div className="min-h-full p-6 md:p-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/25">
            <Type className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Text Tools</h1>
            <p className="text-muted-foreground">Word counter, case converter, slug generator & more</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {tools.map((t) => (
            <button key={t.id} onClick={() => setActiveTool(t.id)}
              className={cn("flex flex-col items-center gap-2 rounded-xl p-3 border transition-all",
                activeTool === t.id ? "border-indigo-500/40 bg-indigo-500/8 shadow-sm" : "border-border/60 bg-card hover:border-border")}>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 shadow">
                <t.icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-[11px] font-semibold text-foreground">{t.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {activeTool === "lorem" ? (
              <Card className="border-border/60">
                <CardContent className="p-5 space-y-4">
                  <h3 className="font-semibold text-foreground">Generate Lorem Ipsum</h3>
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-muted-foreground">Paragraphs:</label>
                    <input type="number" value={loremCount} onChange={(e) => setLoremCount(+e.target.value)} min={1} max={50}
                      className="w-20 h-9 rounded-lg border border-border bg-background px-3 text-sm" />
                    <Button onClick={generateLorem} className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white">Generate</Button>
                  </div>
                  {text && <Textarea value={text} readOnly rows={12} className="text-sm" />}
                  {text && <Button variant="outline" onClick={() => handleCopy(text)} className="gap-1.5">
                    {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />} {copied ? "Copied" : "Copy Text"}
                  </Button>}
                </CardContent>
              </Card>
            ) : (
              <Textarea value={text} onChange={(e) => setText(e.target.value)}
                placeholder={activeTool === "slug" ? "Type a title to generate a URL slug..." : "Paste or type your text here..."}
                rows={12} className="text-sm" />
            )}

            {activeTool === "case" && text && (
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "upper", label: "UPPERCASE" },
                  { id: "lower", label: "lowercase" },
                  { id: "title", label: "Title Case" },
                  { id: "sentence", label: "Sentence case" },
                ].map((c) => (
                  <Button key={c.id} variant="outline" size="sm" onClick={() => applyCase(c.id)}>{c.label}</Button>
                ))}
                <Button variant="outline" size="sm" onClick={() => handleCopy(text)} className="ml-auto gap-1">
                  {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />} Copy
                </Button>
              </div>
            )}

            {activeTool === "slug" && text && (
              <Card className="border-border/60">
                <CardContent className="p-4 space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">Generated Slug:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 rounded-lg bg-muted p-3 text-sm font-mono text-foreground break-all">{toSlug(text)}</code>
                    <Button variant="outline" size="icon" onClick={() => handleCopy(toSlug(text))}>
                      {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Stats Panel */}
          <div>
            {activeTool === "counter" && (
              <Card className="border-border/60">
                <CardContent className="p-5 space-y-4">
                  <h3 className="font-semibold text-foreground">Text Statistics</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Words", value: stats.words },
                      { label: "Characters", value: stats.chars },
                      { label: "Characters (no spaces)", value: stats.charsNoSpaces },
                      { label: "Sentences", value: stats.sentences },
                      { label: "Paragraphs", value: stats.paragraphs },
                      { label: "Reading time", value: `${stats.readTime} min` },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
                        <span className="text-xs text-muted-foreground">{s.label}</span>
                        <span className="text-sm font-bold text-foreground">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
