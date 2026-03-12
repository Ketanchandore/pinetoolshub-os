import { ToolLandingPage } from "@/components/ToolLandingPage";
import { Stamp } from "lucide-react";

export default function WatermarkPdfLanding() {
  return (
    <ToolLandingPage
      toolId="watermark"
      title="Add Watermark to PDF"
      seoTitle="Add Watermark to PDF Online Free — Text Watermark Overlay on PDF Pages (2026)"
      seoDescription="Add text watermarks to PDF files online for free. Stamp CONFIDENTIAL, DRAFT, or custom text across all pages with adjustable opacity. No signup, no file limits. 100% browser-based — your files stay private. Protect documents from unauthorized use."
      canonical="/add-watermark-pdf"
      keywords="add watermark to pdf online free, pdf watermark tool, stamp confidential on pdf, text watermark pdf, watermark pdf pages free 2026"
      icon={Stamp}
      iconGradient="from-pink-500 to-rose-500"
      heroTitle="Add Watermark to PDF — Free & Instant"
      heroSubtitle="Stamp custom text watermarks across all PDF pages. Adjustable opacity for professional document protection."
      features={[
        { title: "Custom Watermark Text", description: "Add any text — CONFIDENTIAL, DRAFT, your company name, or any custom message." },
        { title: "Adjustable Opacity", description: "Set watermark transparency from subtle to bold. Find the perfect balance for your needs." },
        { title: "All Pages at Once", description: "Watermark is applied to every page in your PDF automatically." },
        { title: "100% Browser-Based", description: "Your documents stay on your device. No upload to any server." },
        { title: "Professional Output", description: "Clean, diagonal text watermark that looks professional on any document." },
        { title: "Free & Unlimited", description: "No signup, no daily limits, no watermarks on the watermark tool itself." },
      ]}
      howToSteps={[
        { step: "Upload Your PDF", description: "Select or drag your PDF document into the upload area." },
        { step: "Configure Watermark", description: "Enter your watermark text and adjust the opacity slider." },
        { step: "Apply & Download", description: "Click Process to apply the watermark and download your protected PDF." },
      ]}
      faqs={[
        { question: "How to add watermark to PDF free?", answer: "Upload your PDF, type your watermark text, adjust opacity, and click Process. Your watermarked PDF downloads instantly — completely free." },
        { question: "Can I use custom watermark text?", answer: "Yes! Enter any text you want. Common choices include CONFIDENTIAL, DRAFT, COPY, DO NOT DISTRIBUTE, or your company name." },
        { question: "Will the watermark cover the content?", answer: "The watermark is semi-transparent, so your document content remains readable. Adjust the opacity slider to find the right balance." },
      ]}
      relatedTools={[
        { name: "Protect PDF", url: "/protect-pdf", description: "Password lock" },
        { name: "Stamp PDF", url: "/pdf-tools", description: "Add stamps" },
        { name: "Merge PDF", url: "/merge-pdf", description: "Combine PDFs" },
        { name: "Compress PDF", url: "/compress-pdf", description: "Reduce size" },
      ]}
      longDescription={`Adding watermarks to PDF documents is essential for protecting intellectual property, marking draft versions, and preventing unauthorized distribution. PineToolsHub's free watermark tool makes this process simple and instant.

Whether you need to mark documents as CONFIDENTIAL before sharing with external parties, label DRAFT versions during review cycles, or add your company name for branding — our tool handles it all with adjustable opacity for a professional appearance.

The watermark is applied diagonally across every page for maximum visibility while maintaining document readability. You control the transparency level to strike the perfect balance between protection and usability.`}
      toolLink="/pdf-tools"
    />
  );
}
