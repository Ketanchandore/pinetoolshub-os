import { useState, useRef } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenTool, Sparkles, Copy, Download, RefreshCw, Wand2,
  FileText, Hash, Mail, Twitter, Linkedin, BookOpen,
  ChevronRight, CheckCircle2, Loader2, RotateCcw, ThumbsUp,
  Lightbulb, Globe, MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { SEOHead } from "@/components/SEOHead";

const contentTypes = [
  { id: "blog", label: "Blog Post", icon: BookOpen, desc: "Long-form article", color: "from-blue-500 to-cyan-500" },
  { id: "twitter", label: "Twitter Thread", icon: Twitter, desc: "Viral thread", color: "from-sky-400 to-blue-500" },
  { id: "linkedin", label: "LinkedIn Post", icon: Linkedin, desc: "Professional update", color: "from-blue-600 to-indigo-600" },
  { id: "email", label: "Email Copy", icon: Mail, desc: "Marketing email", color: "from-purple-500 to-pink-500" },
  { id: "caption", label: "Social Caption", icon: Hash, desc: "With hashtags", color: "from-pink-500 to-rose-500" },
  { id: "product", label: "Product Desc", icon: Globe, desc: "Sell your product", color: "from-amber-500 to-orange-500" },
];

const tones = ["Professional", "Casual", "Humorous", "Persuasive", "Educational", "Inspirational"];

const promptTemplates = [
  { label: "Write about AI trends in 2025", type: "blog" },
  { label: "Announce a new product launch", type: "email" },
  { label: "Share 5 productivity tips", type: "twitter" },
  { label: "Job opportunity at a startup", type: "linkedin" },
  { label: "Summer sale announcement", type: "caption" },
];

export default function ContentStudioPage() {
  const [selectedType, setSelectedType] = useState("blog");
  const [selectedTone, setSelectedTone] = useState("Professional");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({ title: "Enter a prompt", description: "Describe what content you want to generate.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const typeLabel = contentTypes.find(t => t.id === selectedType)?.label || selectedType;
      const systemPrompt = `You are an expert content writer and marketing copywriter. Generate high-quality ${typeLabel} content in a ${selectedTone} tone. Be creative, engaging, and compelling. Format the output properly with appropriate structure for the content type. Do not add any meta commentary—just the content itself.`;
      const userMessage = `Create a ${typeLabel} about: ${prompt}`;

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ prompt: userMessage, systemPrompt }),
      });

      if (!response.ok) {
        if (response.status === 429) throw new Error("Rate limit exceeded. Please try again later.");
        if (response.status === 402) throw new Error("Usage limit reached. Please add credits.");
        throw new Error("Generation failed");
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let newline: number;
        while ((newline = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newline);
          buffer = buffer.slice(newline + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") break;
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullText += content;
              setOutput(fullText);
            }
          } catch {}
        }
      }

      const words = fullText.trim().split(/\s+/).filter(Boolean).length;
      setWordCount(words);
      setCharCount(fullText.length);
    } catch (err: any) {
      toast({ title: "Generation failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied!", description: "Content copied to clipboard." });
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `content-${selectedType}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <MainLayout>
      <SEOHead
        title="Free AI Content Writer Online — Generate Blog Posts, Twitter Threads, LinkedIn & Emails (2026)"
        description="Create high-quality blog posts, viral Twitter threads, professional LinkedIn posts, marketing emails, social captions and product descriptions with AI. Choose from 6 content types and 6 writing tones. 100% free, no signup required, no word limits. The best free AI content writing tool for marketers, freelancers and entrepreneurs."
        canonical="/content-studio"
        keywords="free ai content writer, ai blog post generator, twitter thread generator, linkedin post writer, ai email copywriter, free content creation tool 2026"
      />
      <div className="min-h-full p-6 md:p-8 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25">
            <PenTool className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Content Studio</h1>
            <p className="text-muted-foreground">AI-powered content creation for any platform</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Panel - Controls */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-6">
            {/* Content Type */}
            <Card className="border-border/60">
              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-500" /> Content Type
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {contentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        "flex items-center gap-2 rounded-xl p-3 text-left transition-all border",
                        selectedType === type.id
                          ? "border-purple-500/50 bg-purple-500/10"
                          : "border-border/50 hover:border-border bg-card"
                      )}
                    >
                      <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br shrink-0", type.color)}>
                        <type.icon className="h-3.5 w-3.5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{type.label}</p>
                        <p className="text-[10px] text-muted-foreground">{type.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tone */}
            <Card className="border-border/60">
              <CardContent className="p-5 space-y-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-pink-500" /> Tone
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tones.map((tone) => (
                    <Badge
                      key={tone}
                      variant={selectedTone === tone ? "default" : "outline"}
                      className={cn("cursor-pointer transition-all", selectedTone === tone ? "bg-gradient-to-r from-purple-500 to-pink-500 border-transparent text-white" : "hover:border-purple-400")}
                      onClick={() => setSelectedTone(tone)}
                    >
                      {tone}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prompt Templates */}
            <Card className="border-border/60">
              <CardContent className="p-5 space-y-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-500" /> Quick Prompts
                </h3>
                <div className="space-y-1.5">
                  {promptTemplates.map((t) => (
                    <button
                      key={t.label}
                      onClick={() => { setPrompt(t.label); setSelectedType(t.type); }}
                      className="w-full text-left text-xs text-muted-foreground hover:text-foreground flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <ChevronRight className="h-3 w-3 shrink-0 text-purple-400" />
                      {t.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prompt Input */}
            <div className="space-y-3">
              <Textarea
                placeholder="Describe what you want to create... (e.g. 'Write about the benefits of meditation for busy professionals')"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] resize-none border-border/60 focus:border-purple-500/50"
              />
              <Button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25 h-11"
              >
                {loading ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</>
                ) : (
                  <><Wand2 className="h-4 w-4 mr-2" /> Generate Content</>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Right Panel - Output */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" /> Generated Content
              </h3>
              {output && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{wordCount} words · {charCount} chars</span>
                  <Button variant="outline" size="sm" onClick={handleCopy} className="h-8 gap-1.5">
                    {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload} className="h-8 gap-1.5">
                    <Download className="h-3.5 w-3.5" /> Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleGenerate} disabled={loading} className="h-8 gap-1.5">
                    <RefreshCw className="h-3.5 w-3.5" /> Regenerate
                  </Button>
                </div>
              )}
            </div>

            <Card className={cn("border-border/60 min-h-[500px] transition-all", loading && "border-purple-500/30")}>
              <CardContent className="p-6">
                {!output && !loading && (
                  <div className="flex flex-col items-center justify-center h-96 gap-4 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                      <PenTool className="h-10 w-10 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Ready to create</p>
                      <p className="text-sm text-muted-foreground mt-1">Select a content type, set your tone, and enter your prompt</p>
                    </div>
                  </div>
                )}
                {loading && !output && (
                  <div className="flex flex-col items-center justify-center h-96 gap-4">
                    <div className="relative">
                      <div className="h-16 w-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
                      <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-purple-500" />
                    </div>
                    <p className="text-muted-foreground animate-pulse">AI is crafting your content...</p>
                  </div>
                )}
                {output && (
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">{output}</pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
