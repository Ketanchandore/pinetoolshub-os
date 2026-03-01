import { useState, useRef, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { motion } from "framer-motion";
import { QrCode, Download, Link2, Type, Wifi, User, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const qrTypes = [
  { id: "url", label: "URL", icon: Link2, placeholder: "https://example.com" },
  { id: "text", label: "Text", icon: Type, placeholder: "Enter any text..." },
  { id: "wifi", label: "WiFi", icon: Wifi, placeholder: "Network name" },
  { id: "vcard", label: "Contact", icon: User, placeholder: "Full Name" },
];

const faqs = [
  { question: "How to create a QR code for free?", answer: "Enter your URL, text, WiFi details, or contact info above, customize colors and size, then download as PNG. Completely free, no signup needed." },
  { question: "Can I create a QR code for WiFi?", answer: "Yes. Select the WiFi tab, enter your network name, password, and encryption type. The QR code will let anyone scan and connect instantly." },
  { question: "What format are QR codes downloaded in?", answer: "QR codes are downloaded as high-resolution PNG images that work everywhere — print, web, social media." },
  { question: "Is there a limit on QR codes I can create?", answer: "No limit. Generate unlimited QR codes for free. No account needed." },
];

function generateQRSvg(text: string, size: number = 256): string {
  // Simple QR generation using a canvas-based approach via an external API for reliability
  // For a production app, use a library. Here we use a lightweight SVG approach.
  const encoded = encodeURIComponent(text);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&format=svg`;
}

function getQRPngUrl(text: string, size: number = 512, color: string = "000000", bg: string = "ffffff"): string {
  const encoded = encodeURIComponent(text);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&color=${color}&bgcolor=${bg}`;
}

export default function QRCodePage() {
  const [activeType, setActiveType] = useState("url");
  const [input, setInput] = useState("https://pinetoolshub.com");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState("WPA");
  const [vcardEmail, setVcardEmail] = useState("");
  const [vcardPhone, setVcardPhone] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(512);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const getQRData = () => {
    if (activeType === "wifi") return `WIFI:T:${wifiEncryption};S:${input};P:${wifiPassword};;`;
    if (activeType === "vcard") return `BEGIN:VCARD\nVERSION:3.0\nFN:${input}\nEMAIL:${vcardEmail}\nTEL:${vcardPhone}\nEND:VCARD`;
    return input;
  };

  const qrData = getQRData();
  const qrUrl = getQRPngUrl(qrData, size, fgColor.replace("#", ""), bgColor.replace("#", ""));

  const handleDownload = async () => {
    try {
      const res = await fetch(qrUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-code-${activeType}.png`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Downloaded!", description: "QR code saved as PNG." });
    } catch {
      toast({ title: "Error", description: "Failed to download QR code.", variant: "destructive" });
    }
  };

  const handleCopy = async () => {
    try {
      const res = await fetch(qrUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: "Copied!", description: "QR code copied to clipboard." });
    } catch {
      toast({ title: "Error", description: "Copy not supported in this browser.", variant: "destructive" });
    }
  };

  return (
    <MainLayout>
      <SEOHead
        title="Free QR Code Generator — URL, Text, WiFi, Contact"
        description="Generate free QR codes for URLs, text, WiFi networks, and contacts. Customize colors, download as PNG. No signup, unlimited QR codes."
        canonical="/qr-code"
        keywords="free qr code generator, qr code maker, wifi qr code, url qr code, contact qr code, qr code online free"
        jsonLd={faqSchema(faqs)}
      />
      <div className="min-h-full p-6 md:p-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
            <QrCode className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">QR Code Generator</h1>
            <p className="text-muted-foreground">Create free QR codes for URLs, text, WiFi, contacts</p>
          </div>
          <Badge variant="outline" className="ml-auto border-emerald-500/50 text-emerald-600 bg-emerald-500/5">Free & Unlimited</Badge>
        </motion.div>

        {/* Type Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {qrTypes.map((t) => (
            <button key={t.id} onClick={() => { setActiveType(t.id); setInput(t.placeholder); }}
              className={cn("flex flex-col items-center gap-2 rounded-xl p-3 border transition-all",
                activeType === t.id ? "border-emerald-500/40 bg-emerald-500/8 shadow-sm" : "border-border/60 bg-card hover:border-border")}>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 shadow">
                <t.icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-foreground">{t.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <Card className="border-border/60">
              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold text-foreground">QR Code Content</h3>
                {activeType === "text" ? (
                  <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text..." rows={4} />
                ) : (
                  <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder={qrTypes.find(t => t.id === activeType)?.placeholder} />
                )}
                {activeType === "wifi" && (
                  <div className="space-y-3">
                    <Input value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} placeholder="WiFi Password" type="password" />
                    <div className="flex gap-2">
                      {["WPA", "WEP", "nopass"].map((enc) => (
                        <button key={enc} onClick={() => setWifiEncryption(enc)}
                          className={cn("px-3 py-1.5 text-xs rounded-lg border transition-all",
                            wifiEncryption === enc ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600" : "border-border/60 text-muted-foreground")}>
                          {enc}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {activeType === "vcard" && (
                  <div className="space-y-3">
                    <Input value={vcardEmail} onChange={(e) => setVcardEmail(e.target.value)} placeholder="Email address" />
                    <Input value={vcardPhone} onChange={(e) => setVcardPhone(e.target.value)} placeholder="Phone number" />
                  </div>
                )}

                <h3 className="font-semibold text-foreground pt-2">Customize</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Foreground</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="h-8 w-8 rounded border-0 cursor-pointer" />
                      <Input value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="h-8 text-xs" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Background</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-8 w-8 rounded border-0 cursor-pointer" />
                      <Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-8 text-xs" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preview */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <Card className="border-border/60">
              <CardContent className="p-5 flex flex-col items-center gap-4">
                <h3 className="font-semibold text-foreground self-start">Preview</h3>
                <div className="rounded-2xl border border-border/60 bg-white p-4">
                  <img src={qrUrl} alt={`QR Code for ${activeType}`} className="w-64 h-64" crossOrigin="anonymous" />
                </div>
                <div className="flex gap-2 w-full">
                  <Button onClick={handleDownload} className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white gap-1.5">
                    <Download className="h-4 w-4" /> Download PNG
                  </Button>
                  <Button variant="outline" onClick={handleCopy} className="gap-1.5">
                    {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
