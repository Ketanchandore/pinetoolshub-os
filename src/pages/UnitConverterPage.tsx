import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, faqSchema } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { motion } from "framer-motion";
import { Calculator, ArrowLeftRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "length", label: "Length",
    units: [
      { id: "m", label: "Meters", factor: 1 },
      { id: "km", label: "Kilometers", factor: 0.001 },
      { id: "cm", label: "Centimeters", factor: 100 },
      { id: "mm", label: "Millimeters", factor: 1000 },
      { id: "mi", label: "Miles", factor: 0.000621371 },
      { id: "ft", label: "Feet", factor: 3.28084 },
      { id: "in", label: "Inches", factor: 39.3701 },
      { id: "yd", label: "Yards", factor: 1.09361 },
    ],
  },
  {
    id: "weight", label: "Weight",
    units: [
      { id: "kg", label: "Kilograms", factor: 1 },
      { id: "g", label: "Grams", factor: 1000 },
      { id: "mg", label: "Milligrams", factor: 1000000 },
      { id: "lb", label: "Pounds", factor: 2.20462 },
      { id: "oz", label: "Ounces", factor: 35.274 },
      { id: "ton", label: "Metric Tons", factor: 0.001 },
    ],
  },
  {
    id: "temperature", label: "Temperature",
    units: [
      { id: "c", label: "Celsius", factor: 1 },
      { id: "f", label: "Fahrenheit", factor: 1 },
      { id: "k", label: "Kelvin", factor: 1 },
    ],
  },
  {
    id: "data", label: "Data Storage",
    units: [
      { id: "b", label: "Bytes", factor: 1 },
      { id: "kb", label: "Kilobytes", factor: 1 / 1024 },
      { id: "mb", label: "Megabytes", factor: 1 / (1024 ** 2) },
      { id: "gb", label: "Gigabytes", factor: 1 / (1024 ** 3) },
      { id: "tb", label: "Terabytes", factor: 1 / (1024 ** 4) },
    ],
  },
  {
    id: "speed", label: "Speed",
    units: [
      { id: "ms", label: "m/s", factor: 1 },
      { id: "kmh", label: "km/h", factor: 3.6 },
      { id: "mph", label: "mph", factor: 2.23694 },
      { id: "knots", label: "Knots", factor: 1.94384 },
    ],
  },
];

const faqs = [
  { question: "How to convert units online for free?", answer: "Select a category (length, weight, temperature, data, speed), enter a value, and see instant conversions to all units. 100% free, no signup." },
  { question: "How to convert Celsius to Fahrenheit?", answer: "Select Temperature, enter your Celsius value. The formula is °F = (°C × 9/5) + 32. Our tool converts instantly." },
  { question: "How to convert MB to GB?", answer: "Select Data Storage, enter MB value. 1 GB = 1024 MB. Our converter handles all data units from bytes to terabytes." },
  { question: "Is this unit converter accurate?", answer: "Yes. All conversions use precise mathematical factors. Results are calculated in real-time in your browser." },
];

function convertTemp(value: number, from: string, to: string): number {
  let celsius = value;
  if (from === "f") celsius = (value - 32) * 5 / 9;
  if (from === "k") celsius = value - 273.15;
  if (to === "c") return celsius;
  if (to === "f") return celsius * 9 / 5 + 32;
  if (to === "k") return celsius + 273.15;
  return celsius;
}

export default function UnitConverterPage() {
  const [activeCategory, setActiveCategory] = useState("length");
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState("m");

  const cat = categories.find(c => c.id === activeCategory)!;

  const getConvertedValue = (toUnit: typeof cat.units[0]) => {
    if (activeCategory === "temperature") {
      return convertTemp(value, fromUnit, toUnit.id);
    }
    const fromFactor = cat.units.find(u => u.id === fromUnit)!.factor;
    const baseValue = value / fromFactor; // convert to base unit
    return baseValue * toUnit.factor;
  };

  return (
    <MainLayout>
      <SEOHead
        title="Free Unit Converter — Length, Weight, Temperature, Data, Speed"
        description="Convert units instantly: length, weight, temperature, data storage, speed. Free online unit converter with instant results. No signup required."
        canonical="/unit-converter"
        keywords="unit converter online, convert meters to feet, celsius to fahrenheit, mb to gb converter, weight converter, free unit converter"
        jsonLd={faqSchema(faqs)}
      />
      <div className="min-h-full p-6 md:p-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/25">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Unit Converter</h1>
            <p className="text-muted-foreground">Convert length, weight, temperature, data, speed instantly</p>
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c.id} onClick={() => { setActiveCategory(c.id); setFromUnit(c.units[0].id); setValue(1); }}
              className={cn("px-4 py-2 text-sm font-medium rounded-xl border transition-all",
                activeCategory === c.id ? "border-cyan-500/40 bg-cyan-500/10 text-foreground" : "border-border/60 text-muted-foreground hover:border-border")}>
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-border/60">
            <CardContent className="p-5 space-y-4">
              <h3 className="font-semibold text-foreground">Input</h3>
              <Input type="number" value={value} onChange={(e) => setValue(+e.target.value)} className="text-lg h-12" />
              <div className="flex flex-wrap gap-2">
                {cat.units.map((u) => (
                  <button key={u.id} onClick={() => setFromUnit(u.id)}
                    className={cn("px-3 py-1.5 text-xs rounded-lg border transition-all",
                      fromUnit === u.id ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-600 font-semibold" : "border-border/60 text-muted-foreground")}>
                    {u.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardContent className="p-5 space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <ArrowLeftRight className="h-4 w-4 text-cyan-500" /> Results
              </h3>
              {cat.units.map((u) => {
                const result = getConvertedValue(u);
                return (
                  <div key={u.id} className={cn("flex items-center justify-between rounded-lg px-3 py-2",
                    fromUnit === u.id ? "bg-cyan-500/10 border border-cyan-500/30" : "bg-muted/40")}>
                    <span className="text-xs text-muted-foreground font-medium">{u.label}</span>
                    <span className="text-sm font-bold text-foreground font-mono">
                      {Number.isFinite(result) ? (Math.abs(result) < 0.001 || Math.abs(result) > 999999 ? result.toExponential(4) : result.toFixed(4).replace(/\.?0+$/, "")) : "—"}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <FAQSection faqs={faqs} />
      </div>
    </MainLayout>
  );
}
