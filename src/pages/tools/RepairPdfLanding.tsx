import { ToolLandingPage } from "@/components/ToolLandingPage";
import { ScanLine } from "lucide-react";

export default function RepairPdfLanding() {
  return (
    <ToolLandingPage
      toolId="repair"
      title="Repair PDF"
      seoTitle="Repair Corrupted PDF Online Free — Fix Damaged PDF Files Instantly (2026)"
      seoDescription="Repair corrupted or damaged PDF files online for free. Fix PDFs that won't open, have missing pages, or show error messages. No signup, no watermarks. 100% browser-based repair — your files stay private."
      canonical="/repair-pdf"
      keywords="repair pdf online free, fix corrupted pdf, repair damaged pdf, pdf repair tool free, fix broken pdf file 2026"
      icon={ScanLine}
      iconGradient="from-rose-400 to-pink-500"
      heroTitle="Repair Corrupted PDF — Free & Instant"
      heroSubtitle="Fix damaged PDF files that won't open or display errors. Recover your documents quickly."
      features={[
        { title: "Fix Corrupted Files", description: "Repair PDFs that show error messages or refuse to open." },
        { title: "Recover Content", description: "Extract and rebuild readable content from damaged PDFs." },
        { title: "100% Browser-Based", description: "Repair happens locally. Your files never leave your device." },
        { title: "Instant Processing", description: "Repaired PDF ready in seconds." },
        { title: "Free & Unlimited", description: "No signup, no limits." },
        { title: "All Devices", description: "Works on desktop and mobile." },
      ]}
      howToSteps={[
        { step: "Upload Damaged PDF", description: "Select the corrupted PDF file you want to repair." },
        { step: "Repair Automatically", description: "Click Process to attempt automatic repair of the PDF structure." },
        { step: "Download Fixed PDF", description: "Download your repaired PDF if recovery was successful." },
      ]}
      faqs={[
        { question: "Can I repair a corrupted PDF online?", answer: "Yes! Upload your damaged PDF and PineToolsHub will attempt to rebuild the file structure and recover content. Download the repaired file instantly." },
        { question: "What types of PDF damage can be fixed?", answer: "The tool can fix structural issues, cross-reference table errors, and minor corruption. Severely damaged files may not be fully recoverable." },
      ]}
      relatedTools={[
        { name: "Compress PDF", url: "/compress-pdf", description: "Reduce size" },
        { name: "Flatten PDF", url: "/flatten-pdf", description: "Flatten forms" },
        { name: "Merge PDF", url: "/merge-pdf", description: "Combine PDFs" },
        { name: "Metadata", url: "/edit-pdf-metadata", description: "Edit properties" },
      ]}
      longDescription={`Corrupted PDF files are a common frustration — files that won't open, display garbled content, or show error messages. PineToolsHub's free PDF repair tool attempts to rebuild the internal structure of damaged PDFs and recover your content.

The tool works by parsing the PDF structure, rebuilding the cross-reference table, and re-encoding the document. While severely damaged files may not be fully recoverable, many common corruption issues can be fixed instantly.`}
      toolLink="/pdf-tools"
    />
  );
}
