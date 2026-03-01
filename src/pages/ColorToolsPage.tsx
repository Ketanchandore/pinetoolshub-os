import { useState, useCallback } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { motion } from "framer-motion";
import { Palette, Copy, CheckCircle2, RefreshCw, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const faqs = [
  { question: "How to pick a color from a website?", answer: "Use our Color Picker tool. Click the color input to open a native color picker, then copy the HEX, RGB, or HSL value instantly." },
  { question: "How to check color contrast for accessibility?", answer: "Enter foreground and background colors in our Contrast Checker. It calculates the WCAG contrast ratio and tells you if it passes AA or AAA standards." },
  { question: "How to generate a color palette?", answer: "Click 'Generate Palette' to get a random harmonious 5-color palette. Copy any color with one click. Refresh for new palettes." },
  { question: "What is a CSS gradient generator?", answer: "Our Gradient Maker lets you pick two colors and an angle to create a CSS linear-gradient. Copy the CSS code and use it in your project." },
];

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function luminance(r: number, g: number, b: number) {
  const [rs, gs, bs] = [r, g, b].map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1: string, hex2: string) {
  const { r: r1, g: g1, b: b1 } = hexToRgb(hex1);
  const { r: r2, g: g2, b: b2 } = hexToRgb(hex2);
  const l1 = luminance(r1, g1, b1) + 0.05;
  const l2 = luminance(r2, g2, b2) + 0.05;
  return Math.max(l1, l2) / Math.min(l1, l2);
}

function randomHex() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}

function generatePalette(): string[] {
  const base = Math.random() * 360;
  return [0, 30, 60, 180, 210].map(offset => {
    const h = (base + offset) % 360;
    const s = 50 + Math.random() * 30;
    const l = 40 + Math.random() * 25;
    const c = `hsl(${h}, ${s}%, ${l}%)`;
    const el = document.createElement("canvas").getContext("2d")!;
    el.fillStyle = c;
    return el.fillStyle; // returns hex
  });
}

const tabs = [
  { id: "picker", label: "Color Picker" },
  { id: "palette", label: "Palette Generator" },
  { id: "contrast", label: "Contrast Checker" },
  { id: "gradient", label: "Gradient Maker" },
];

export default function ColorToolsPage() {
  const [activeTab, setActiveTab] = useState("picker");
  const [color, setColor] = useState("#3b82f6");
  const [palette, setPalette] = useState<string[]>(["#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#8b5cf6"]);
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");
  const [g1, setG1] = useState("#3b82f6");
  const [g2, setG2] = useState("#8b5cf6");
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState("");
  const { toast } = useToast();

  const copy = (text: string, label?: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 1500);
    toast({ title: "Copied!", description: label || text });
  };

  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const ratio = contrastRatio(fg, bg);
  const gradientCSS = `linear-gradient(${angle}deg, ${g1}, ${g2})`;

  return (
    <MainLayout>
      <SEOHead
        title="Free Color Tools — Color Picker, Palette Generator, Contrast Checker"
        description="Free online color tools: color picker with HEX/RGB/HSL, palette generator, WCAG contrast checker, CSS gradient maker. No signup required."
        canonical="/color-tools"
        keywords="color picker online, palette generator, contrast checker wcag, css gradient generator, hex to rgb, color tools free"
        jsonLd={faqSchema(faqs)}
      />
      <div className="min-h-full p-6 md:p-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg shadow-pink-500/25">
            <Palette className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Color Tools</h1>
            <p className="text-muted-foreground">Pick colors, generate palettes, check contrast, make gradients</p>
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={cn("px-4 py-2 text-sm font-medium rounded-xl border transition-all",
                activeTab === t.id ? "border-pink-500/40 bg-pink-500/10 text-foreground" : "border-border/60 text-muted-foreground hover:border-border")}>
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "picker" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-border/60">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-4">
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-20 w-20 rounded-xl border-0 cursor-pointer" />
                  <div className="h-20 flex-1 rounded-xl border border-border/60" style={{ backgroundColor: color }} />
                </div>
                <Input value={color} onChange={(e) => setColor(e.target.value)} className="font-mono" />
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardContent className="p-5 space-y-3">
                <h3 className="font-semibold text-foreground">Color Values</h3>
                {[
                  { label: "HEX", value: color.toUpperCase() },
                  { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
                  { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
                ].map((v) => (
                  <div key={v.label} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
                    <span className="text-xs text-muted-foreground font-medium">{v.label}</span>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono text-foreground">{v.value}</code>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copy(v.value, v.label)}>
                        {copied === v.value ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "palette" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Button onClick={() => setPalette(generatePalette())} className="bg-gradient-to-r from-pink-500 to-rose-500 text-white gap-1.5">
                <RefreshCw className="h-4 w-4" /> Generate Palette
              </Button>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {palette.map((c, i) => (
                <div key={i} className="space-y-2 text-center">
                  <div className="h-32 rounded-xl border border-border/60 cursor-pointer hover:scale-105 transition-transform" style={{ backgroundColor: c }} onClick={() => copy(c)} />
                  <code className="text-xs font-mono text-muted-foreground">{c}</code>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "contrast" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-border/60">
              <CardContent className="p-5 space-y-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Text Color</label>
                    <div className="flex gap-2">
                      <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-9 w-9 rounded cursor-pointer" />
                      <Input value={fg} onChange={(e) => setFg(e.target.value)} className="font-mono text-sm" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Background Color</label>
                    <div className="flex gap-2">
                      <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-9 w-9 rounded cursor-pointer" />
                      <Input value={bg} onChange={(e) => setBg(e.target.value)} className="font-mono text-sm" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardContent className="p-5 space-y-4">
                <div className="rounded-xl p-6 text-center" style={{ backgroundColor: bg, color: fg }}>
                  <p className="text-2xl font-bold">Sample Text</p>
                  <p className="text-sm mt-1">The quick brown fox jumps over the lazy dog</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-foreground">{ratio.toFixed(2)}:1</p>
                  <div className="flex justify-center gap-2 mt-2">
                    <Badge className={ratio >= 4.5 ? "bg-emerald-500" : "bg-destructive"}>AA {ratio >= 4.5 ? "Pass" : "Fail"}</Badge>
                    <Badge className={ratio >= 7 ? "bg-emerald-500" : "bg-destructive"}>AAA {ratio >= 7 ? "Pass" : "Fail"}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "gradient" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-border/60">
              <CardContent className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Color 1</label>
                    <div className="flex gap-2">
                      <input type="color" value={g1} onChange={(e) => setG1(e.target.value)} className="h-9 w-9 rounded cursor-pointer" />
                      <Input value={g1} onChange={(e) => setG1(e.target.value)} className="font-mono text-sm" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Color 2</label>
                    <div className="flex gap-2">
                      <input type="color" value={g2} onChange={(e) => setG2(e.target.value)} className="h-9 w-9 rounded cursor-pointer" />
                      <Input value={g2} onChange={(e) => setG2(e.target.value)} className="font-mono text-sm" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Angle: {angle}°</label>
                  <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(+e.target.value)} className="w-full" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">CSS Code</label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 rounded-lg bg-muted p-3 text-xs font-mono text-foreground break-all">background: {gradientCSS};</code>
                    <Button variant="outline" size="icon" onClick={() => copy(`background: ${gradientCSS};`, "CSS copied")}>
                      {copied === `background: ${gradientCSS};` ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="h-64 lg:h-auto rounded-2xl border border-border/60" style={{ background: gradientCSS }} />
          </div>
        )}

        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
