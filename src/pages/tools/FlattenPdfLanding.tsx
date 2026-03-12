import { ToolLandingPage } from "@/components/ToolLandingPage";
import { Eraser } from "lucide-react";

export default function FlattenPdfLanding() {
  return (
    <ToolLandingPage
      toolId="flatten"
      title="Flatten PDF"
      seoTitle="Flatten PDF Online Free — Remove Form Fields & Make PDF Read-Only (2026)"
      seoDescription="Flatten PDF form fields online for free. Convert interactive forms into static PDF documents. Make PDFs read-only by flattening annotations and form data. No signup, no watermarks. 100% browser-based."
      canonical="/flatten-pdf"
      keywords="flatten pdf online free, remove form fields pdf, make pdf read only, flatten pdf forms, pdf flatten tool free 2026"
      icon={Eraser}
      iconGradient="from-amber-400 to-yellow-500"
      heroTitle="Flatten PDF Forms — Free & Instant"
      heroSubtitle="Convert interactive PDF forms into static documents. Remove fillable fields and make PDFs read-only."
      features={[
        { title: "Remove Form Fields", description: "Convert all fillable form fields into static, non-editable content." },
        { title: "Preserve Filled Data", description: "All entered form data is preserved as static text in the flattened PDF." },
        { title: "100% Browser-Based", description: "Your document stays on your device throughout processing." },
        { title: "Instant Processing", description: "Flatten even complex forms in seconds." },
        { title: "Free & Unlimited", description: "No signup, no limits, no watermarks." },
        { title: "All Devices", description: "Works on desktop, mobile, and tablet." },
      ]}
      howToSteps={[
        { step: "Upload PDF Form", description: "Select your PDF with form fields." },
        { step: "Flatten Automatically", description: "Click Process to convert all interactive elements to static content." },
        { step: "Download Flattened PDF", description: "Download your read-only PDF with all data preserved." },
      ]}
      faqs={[
        { question: "What does flattening a PDF mean?", answer: "Flattening converts interactive elements (form fields, annotations) into static content, making the PDF non-editable while preserving all visible data." },
        { question: "Why would I flatten a PDF?", answer: "To prevent form data from being changed, to reduce file size, or to ensure consistent appearance across all PDF readers." },
      ]}
      relatedTools={[
        { name: "Protect PDF", url: "/protect-pdf", description: "Password lock" },
        { name: "Compress PDF", url: "/compress-pdf", description: "Reduce size" },
        { name: "Merge PDF", url: "/merge-pdf", description: "Combine PDFs" },
        { name: "Watermark PDF", url: "/add-watermark-pdf", description: "Add watermark" },
      ]}
      longDescription={`Flattening a PDF is the process of converting interactive form fields, annotations, and comments into static, non-editable content. This is essential when you want to share a completed form that cannot be modified, or when you need to ensure consistent rendering across different PDF viewers.

PineToolsHub's flatten tool processes your PDF entirely in your browser, preserving all filled-in data while removing the ability to edit form fields.`}
      toolLink="/pdf-tools"
    />
  );
}
