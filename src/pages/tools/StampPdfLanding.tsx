import { ToolLandingPage } from "@/components/ToolLandingPage";
import { ShieldCheck } from "lucide-react";

export default function StampPdfLanding() {
  return (
    <ToolLandingPage
      toolId="stamp"
      title="Stamp PDF"
      seoTitle="Stamp PDF Online Free — Add CONFIDENTIAL, DRAFT, APPROVED Stamps to PDF (2026)"
      seoDescription="Add professional stamps to PDF documents online for free. Stamp CONFIDENTIAL, DRAFT, APPROVED, COPY or custom text on all pages. No signup, no watermarks. 100% browser-based."
      canonical="/stamp-pdf"
      keywords="stamp pdf online free, add confidential stamp pdf, draft stamp pdf, approved stamp pdf, pdf stamp tool free 2026"
      icon={ShieldCheck}
      iconGradient="from-orange-500 to-red-500"
      heroTitle="Stamp PDF Documents — Free & Instant"
      heroSubtitle="Add CONFIDENTIAL, DRAFT, APPROVED or custom text stamps to all PDF pages professionally."
      features={[
        { title: "Professional Stamps", description: "Add CONFIDENTIAL, DRAFT, APPROVED, COPY, or any custom text." },
        { title: "All Pages", description: "Stamp is applied to every page in the document." },
        { title: "100% Private", description: "Processing happens in your browser. No server upload." },
        { title: "Instant Results", description: "Stamped PDF ready in seconds." },
        { title: "Free & Unlimited", description: "No signup, no limits." },
        { title: "Mobile Support", description: "Works on all devices." },
      ]}
      howToSteps={[
        { step: "Upload PDF", description: "Select the PDF you want to stamp." },
        { step: "Enter Stamp Text", description: "Type your stamp text (CONFIDENTIAL, DRAFT, etc.)." },
        { step: "Stamp & Download", description: "Click Process to apply the stamp and download." },
      ]}
      faqs={[
        { question: "How to add a CONFIDENTIAL stamp to PDF?", answer: "Upload your PDF, type CONFIDENTIAL as the stamp text, and click Process. Your stamped PDF downloads instantly — free." },
        { question: "What's the difference between stamp and watermark?", answer: "Stamps are typically bold, visible text (like CONFIDENTIAL). Watermarks are semi-transparent overlays meant to be subtle." },
      ]}
      relatedTools={[
        { name: "Watermark PDF", url: "/add-watermark-pdf", description: "Subtle overlay" },
        { name: "Protect PDF", url: "/protect-pdf", description: "Password lock" },
        { name: "Merge PDF", url: "/merge-pdf", description: "Combine PDFs" },
        { name: "Compress PDF", url: "/compress-pdf", description: "Reduce size" },
      ]}
      longDescription={`Professional document stamps like CONFIDENTIAL, DRAFT, APPROVED, and COPY are essential for document management in business, legal, and government settings. PineToolsHub's free stamp tool adds bold, visible text stamps to every page of your PDF.`}
      toolLink="/pdf-tools"
    />
  );
}
