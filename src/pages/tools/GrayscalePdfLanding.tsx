import { ToolLandingPage } from "@/components/ToolLandingPage";
import { Palette } from "lucide-react";

export default function GrayscalePdfLanding() {
  return (
    <ToolLandingPage
      toolId="grayscale"
      title="Grayscale PDF"
      seoTitle="Convert PDF to Grayscale Online Free — Black & White PDF Converter (2026)"
      seoDescription="Convert PDF to grayscale (black and white) online for free. Save ink and toner by converting color PDFs to grayscale before printing. No signup, no watermarks. 100% browser-based — your files stay private."
      canonical="/grayscale-pdf"
      keywords="convert pdf to grayscale online free, black and white pdf, pdf grayscale converter, save ink pdf, print pdf black white free 2026"
      icon={Palette}
      iconGradient="from-gray-500 to-slate-600"
      heroTitle="Convert PDF to Grayscale — Free"
      heroSubtitle="Transform color PDFs to black and white. Save ink and toner when printing documents."
      features={[
        { title: "Color to B&W", description: "Convert all color elements in your PDF to grayscale shades." },
        { title: "Save Printing Costs", description: "Grayscale PDFs use less ink and toner — save money on printing." },
        { title: "100% Browser-Based", description: "Conversion happens locally. No files are uploaded." },
        { title: "Instant Processing", description: "Your grayscale PDF is ready in seconds." },
        { title: "Free & Unlimited", description: "No signup, no limits, no watermarks." },
        { title: "All Devices", description: "Works on desktop and mobile browsers." },
      ]}
      howToSteps={[
        { step: "Upload Color PDF", description: "Select your color PDF document." },
        { step: "Convert to Grayscale", description: "Click Process to convert all colors to grayscale." },
        { step: "Download B&W PDF", description: "Download your grayscale PDF ready for printing." },
      ]}
      faqs={[
        { question: "How to convert PDF to black and white free?", answer: "Upload your color PDF to PineToolsHub and click Process. Your grayscale PDF downloads instantly — free and private." },
        { question: "Does grayscale conversion save ink?", answer: "Yes! Printing in grayscale uses significantly less color ink/toner, reducing printing costs." },
      ]}
      relatedTools={[
        { name: "Compress PDF", url: "/compress-pdf", description: "Reduce size" },
        { name: "Merge PDF", url: "/merge-pdf", description: "Combine PDFs" },
        { name: "Flatten PDF", url: "/flatten-pdf", description: "Flatten forms" },
        { name: "Rotate PDF", url: "/rotate-pdf", description: "Rotate pages" },
      ]}
      longDescription={`Converting PDFs to grayscale is a practical solution for reducing printing costs and creating consistent-looking documents. PineToolsHub's free grayscale converter transforms all color elements to shades of gray instantly in your browser.`}
      toolLink="/pdf-tools"
    />
  );
}
