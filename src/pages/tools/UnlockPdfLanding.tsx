import { ToolLandingPage } from "@/components/ToolLandingPage";
import { Unlock } from "lucide-react";

export default function UnlockPdfLanding() {
  return (
    <ToolLandingPage
      toolId="unlock"
      title="Unlock PDF"
      seoTitle="Unlock PDF Online Free — Remove PDF Restrictions & Permissions (2026)"
      seoDescription="Unlock PDF files online for free. Remove editing restrictions, printing restrictions, and copy-paste limitations from PDF documents. No signup, no watermarks. 100% browser-based — your files stay completely private."
      canonical="/unlock-pdf"
      keywords="unlock pdf online free, remove pdf restrictions, unlock pdf for editing, remove pdf password, pdf unlocker free 2026"
      icon={Unlock}
      iconGradient="from-green-500 to-emerald-600"
      heroTitle="Unlock PDF — Remove Restrictions Free"
      heroSubtitle="Remove editing, printing, and copy restrictions from your PDF files. Free and instant."
      features={[
        { title: "Remove Restrictions", description: "Unlock PDFs that have editing, printing, or copy-paste restrictions." },
        { title: "Browser-Based Processing", description: "Your PDF stays on your device. No file upload to any server." },
        { title: "Instant Results", description: "Unlocked PDF is ready to download in seconds." },
        { title: "Free & Unlimited", description: "No signup required, no daily limits, no watermarks." },
        { title: "All Devices", description: "Works on desktop, laptop, tablet, and phone." },
        { title: "Preserves Content", description: "All text, images, and formatting remain intact." },
      ]}
      howToSteps={[
        { step: "Upload Locked PDF", description: "Select the PDF with restrictions you want to remove." },
        { step: "Unlock Automatically", description: "Click Process to remove restrictions from your PDF." },
        { step: "Download Free PDF", description: "Download your unlocked PDF with full editing permissions." },
      ]}
      faqs={[
        { question: "How to unlock a PDF online free?", answer: "Upload your restricted PDF to PineToolsHub and click Process. Restrictions are removed and you can download the unlocked PDF instantly." },
        { question: "Can I unlock password-protected PDFs?", answer: "This tool removes permission restrictions (editing, printing). For password-encrypted PDFs, you'll need the original password." },
        { question: "Is it legal to unlock PDFs?", answer: "Unlocking PDFs you own or have permission to modify is legal. Always respect copyright and document ownership." },
      ]}
      relatedTools={[
        { name: "Protect PDF", url: "/protect-pdf", description: "Add password" },
        { name: "Merge PDF", url: "/merge-pdf", description: "Combine PDFs" },
        { name: "Compress PDF", url: "/compress-pdf", description: "Reduce size" },
        { name: "Flatten PDF", url: "/pdf-tools", description: "Flatten forms" },
      ]}
      longDescription={`Sometimes you receive PDF files with restrictions that prevent editing, printing, or copying text. PineToolsHub's Unlock PDF tool removes these permission restrictions so you can work freely with your documents.

This is particularly useful when you need to edit form fields, copy text for reference, or print documents that have printing disabled. All processing happens in your browser for complete privacy.`}
      toolLink="/pdf-tools"
    />
  );
}
