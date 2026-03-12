import { ToolLandingPage } from "@/components/ToolLandingPage";
import { MinusCircle } from "lucide-react";

export default function RemovePagesPdfLanding() {
  return (
    <ToolLandingPage
      toolId="removepages"
      title="Remove Pages from PDF"
      seoTitle="Remove Pages from PDF Online Free — Delete Specific PDF Pages Instantly (2026)"
      seoDescription="Remove specific pages from PDF files online for free. Delete unwanted pages by page number. No signup, no watermarks. 100% browser-based — your files never leave your device. Perfect for cleaning up documents before sharing."
      canonical="/remove-pages-pdf"
      keywords="remove pages from pdf online free, delete pdf pages, remove specific pages pdf, pdf page remover free 2026"
      icon={MinusCircle}
      iconGradient="from-red-400 to-rose-500"
      heroTitle="Remove Pages from PDF — Free"
      heroSubtitle="Delete specific pages from your PDF document. Enter page numbers and download the cleaned file."
      features={[
        { title: "Select Pages to Remove", description: "Enter specific page numbers (e.g., 1,3,5) to delete from your PDF." },
        { title: "100% Browser-Based", description: "Your document stays on your device throughout the process." },
        { title: "Instant Processing", description: "Pages are removed in seconds, no matter the document size." },
        { title: "Free & Unlimited", description: "No signup, no limits, no watermarks." },
        { title: "Quality Preserved", description: "Remaining pages maintain original formatting and quality." },
        { title: "All Devices", description: "Works on desktop, mobile, and tablet browsers." },
      ]}
      howToSteps={[
        { step: "Upload Your PDF", description: "Select or drag your PDF file into the tool." },
        { step: "Enter Page Numbers", description: "Type the page numbers you want to remove (e.g., 1,3,7)." },
        { step: "Remove & Download", description: "Click Process to delete those pages and download the cleaned PDF." },
      ]}
      faqs={[
        { question: "How to delete pages from a PDF free?", answer: "Upload your PDF, enter the page numbers to remove, and click Process. Your cleaned PDF downloads instantly — free and private." },
        { question: "Can I remove multiple pages at once?", answer: "Yes! Enter multiple page numbers separated by commas (e.g., 1,3,5,7) to remove them all at once." },
      ]}
      relatedTools={[
        { name: "Extract Pages", url: "/pdf-tools", description: "Save specific pages" },
        { name: "Split PDF", url: "/split-pdf", description: "Split by range" },
        { name: "Merge PDF", url: "/merge-pdf", description: "Combine PDFs" },
        { name: "Reorder Pages", url: "/pdf-tools", description: "Rearrange pages" },
      ]}
      longDescription={`Sometimes you need to remove specific pages from a PDF before sharing — blank pages, cover pages, appendices, or irrelevant sections. PineToolsHub's free page removal tool makes this quick and easy.

Simply specify which pages to delete by entering their page numbers, and the tool creates a clean PDF with those pages removed. All remaining pages maintain their original quality.`}
      toolLink="/pdf-tools"
    />
  );
}
