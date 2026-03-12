import { ToolLandingPage } from "@/components/ToolLandingPage";
import { RotateCw } from "lucide-react";

export default function RotatePdfLanding() {
  return (
    <ToolLandingPage
      toolId="rotate"
      title="Rotate PDF"
      seoTitle="Rotate PDF Pages Online Free — Turn PDF 90°, 180°, 270° Instantly (2026)"
      seoDescription="Rotate PDF pages online for free. Turn all pages 90°, 180° or 270° clockwise. Fix scanned documents, upside-down pages and landscape orientation issues. No signup, no watermarks. 100% browser-based — your files never leave your device. Works on all devices."
      canonical="/rotate-pdf"
      keywords="rotate pdf online free, turn pdf pages, rotate pdf 90 degrees, flip pdf upside down, rotate scanned pdf, pdf rotation tool free 2026"
      icon={RotateCw}
      iconGradient="from-amber-500 to-orange-500"
      heroTitle="Rotate PDF Pages Online — Free & Instant"
      heroSubtitle="Fix upside-down or sideways PDF pages. Rotate 90°, 180° or 270° and download instantly."
      features={[
        { title: "Multiple Rotation Angles", description: "Rotate pages 90° clockwise, 180° (flip), or 270° (90° counter-clockwise)." },
        { title: "Fix Scanned Documents", description: "Correct orientation issues from scanners that produce upside-down or sideways pages." },
        { title: "All Pages at Once", description: "Rotate all pages in your PDF simultaneously with one click." },
        { title: "100% Browser-Based", description: "No server upload. Your PDF stays on your device throughout the process." },
        { title: "Preserve Quality", description: "Original formatting, text, and images are perfectly maintained after rotation." },
        { title: "Works on Mobile", description: "Rotate PDFs directly on your phone — iPhone, Android, iPad supported." },
      ]}
      howToSteps={[
        { step: "Upload Your PDF", description: "Select or drag your PDF file into the upload area." },
        { step: "Choose Rotation Angle", description: "Select 90°, 180°, or 270° rotation for your pages." },
        { step: "Rotate & Download", description: "Click Process and download your correctly oriented PDF instantly." },
      ]}
      faqs={[
        { question: "How do I rotate a PDF online?", answer: "Upload your PDF to PineToolsHub, select the rotation angle (90°, 180°, or 270°), and click Process. Your rotated PDF downloads instantly — free and private." },
        { question: "Can I rotate just one page in a PDF?", answer: "Currently, PineToolsHub rotates all pages. To rotate specific pages, split the PDF first, rotate the pages you need, then merge them back together." },
        { question: "Is rotating PDF free?", answer: "Yes! Completely free with no watermarks, no signup, and no daily limits." },
      ]}
      relatedTools={[
        { name: "Merge PDF", url: "/merge-pdf", description: "Combine PDFs" },
        { name: "Split PDF", url: "/split-pdf", description: "Extract pages" },
        { name: "Compress PDF", url: "/compress-pdf", description: "Reduce size" },
        { name: "Add Watermark", url: "/add-watermark-pdf", description: "Text overlay" },
      ]}
      longDescription={`Scanned documents and downloaded PDFs often have orientation issues — pages might be upside down, sideways, or rotated incorrectly. PineToolsHub's free PDF rotation tool fixes these issues instantly.

Whether you received a scanned contract with pages in wrong orientation, downloaded a landscape document that displays in portrait mode, or need to correct a batch of scanned images — our rotation tool handles it all with one click.

The tool supports three rotation angles: 90° clockwise (landscape to portrait), 180° (flip upside down pages), and 270° (90° counter-clockwise). All pages in the document are rotated simultaneously.

Processing happens entirely in your browser, so your documents are never uploaded to any server. This makes PineToolsHub the safest option for rotating confidential PDFs like contracts, financial statements, or medical records.`}
      toolLink="/pdf-tools"
    />
  );
}
