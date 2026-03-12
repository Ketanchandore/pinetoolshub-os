import { ToolLandingPage } from "@/components/ToolLandingPage";
import { FileKey } from "lucide-react";

export default function MetadataPdfLanding() {
  return (
    <ToolLandingPage
      toolId="metadata"
      title="Edit PDF Metadata"
      seoTitle="Edit PDF Metadata Online Free — Change Title, Author, Subject of PDF (2026)"
      seoDescription="Edit PDF metadata online for free. Change the title, author, subject, and keywords of any PDF document. No signup, no watermarks. 100% browser-based — your files stay private."
      canonical="/edit-pdf-metadata"
      keywords="edit pdf metadata online free, change pdf title author, pdf metadata editor, modify pdf properties free 2026"
      icon={FileKey}
      iconGradient="from-indigo-400 to-violet-500"
      heroTitle="Edit PDF Metadata — Free & Instant"
      heroSubtitle="Change the title, author, and subject of your PDF documents. Update document properties easily."
      features={[
        { title: "Edit Title", description: "Change the document title that appears in PDF readers and search results." },
        { title: "Edit Author", description: "Update or remove the author name in document properties." },
        { title: "Edit Subject", description: "Add or modify the subject/description metadata field." },
        { title: "100% Browser-Based", description: "Metadata editing happens locally on your device." },
        { title: "Instant Results", description: "Updated PDF downloads in seconds." },
        { title: "Free & Unlimited", description: "No signup, no limits, no watermarks." },
      ]}
      howToSteps={[
        { step: "Upload PDF", description: "Select the PDF whose metadata you want to edit." },
        { step: "Enter Metadata", description: "Fill in the title, author, and subject fields." },
        { step: "Save & Download", description: "Click Process to update metadata and download the modified PDF." },
      ]}
      faqs={[
        { question: "How to edit PDF metadata free?", answer: "Upload your PDF, enter new title/author/subject, and click Process. Your updated PDF downloads instantly." },
        { question: "What is PDF metadata?", answer: "PDF metadata includes document properties like title, author, subject, and creation date. These appear in PDF reader info panels and search results." },
      ]}
      relatedTools={[
        { name: "Flatten PDF", url: "/flatten-pdf", description: "Flatten forms" },
        { name: "Compress PDF", url: "/compress-pdf", description: "Reduce size" },
        { name: "Protect PDF", url: "/protect-pdf", description: "Password lock" },
        { name: "Merge PDF", url: "/merge-pdf", description: "Combine PDFs" },
      ]}
      longDescription={`PDF metadata (title, author, subject, keywords) is important for document organization, searchability, and professional presentation. PineToolsHub's free metadata editor lets you update these properties instantly in your browser.`}
      toolLink="/pdf-tools"
    />
  );
}
