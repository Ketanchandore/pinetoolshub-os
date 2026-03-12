import { ToolLandingPage } from "@/components/ToolLandingPage";
import { Hash } from "lucide-react";

export default function PageNumbersPdfLanding() {
  return (
    <ToolLandingPage
      toolId="pagenumbers"
      title="Add Page Numbers"
      seoTitle="Add Page Numbers to PDF Online Free — Number PDF Pages Automatically (2026)"
      seoDescription="Add page numbers to PDF files online for free. Automatically number all pages with professional formatting. No signup, no watermarks. 100% browser-based — files never leave your device. Perfect for reports, theses, manuals and books."
      canonical="/add-page-numbers-pdf"
      keywords="add page numbers to pdf online free, number pdf pages, pdf page numbering, insert page numbers pdf free 2026"
      icon={Hash}
      iconGradient="from-sky-500 to-blue-500"
      heroTitle="Add Page Numbers to PDF — Free"
      heroSubtitle="Automatically number all pages in your PDF document. Professional formatting for reports and books."
      features={[
        { title: "Automatic Numbering", description: "All pages are numbered sequentially starting from page 1." },
        { title: "Professional Format", description: "Clean page numbers positioned at the bottom of each page." },
        { title: "100% Private", description: "Processing happens entirely in your browser — no server upload." },
        { title: "Works on All PDFs", description: "Add numbers to any PDF regardless of size or complexity." },
        { title: "Free & Unlimited", description: "No signup, no limits, no watermarks on output." },
        { title: "Mobile Support", description: "Works on phone and tablet browsers too." },
      ]}
      howToSteps={[
        { step: "Upload Your PDF", description: "Select the PDF document you want to add page numbers to." },
        { step: "Process Automatically", description: "Click Process to add sequential page numbers to all pages." },
        { step: "Download Numbered PDF", description: "Your numbered PDF downloads instantly — ready to use." },
      ]}
      faqs={[
        { question: "How to add page numbers to PDF free?", answer: "Upload your PDF to PineToolsHub and click Process. Page numbers are added to every page automatically. Download your numbered PDF for free." },
        { question: "Where are page numbers placed?", answer: "Page numbers are placed at the bottom center of each page for a clean, professional appearance." },
        { question: "Can I customize the page number format?", answer: "Currently, the tool adds sequential numbers (1, 2, 3...) starting from the first page." },
      ]}
      relatedTools={[
        { name: "Header & Footer", url: "/pdf-tools", description: "Custom header/footer" },
        { name: "Merge PDF", url: "/merge-pdf", description: "Combine PDFs" },
        { name: "Split PDF", url: "/split-pdf", description: "Extract pages" },
        { name: "Compress PDF", url: "/compress-pdf", description: "Reduce size" },
      ]}
      longDescription={`Adding page numbers to PDF documents is essential for professional reports, academic theses, user manuals, and books. PineToolsHub's free tool adds sequential page numbers to every page in your PDF automatically.

This is particularly useful after merging multiple PDFs, as the original page numbers may be inconsistent. Our tool adds fresh, sequential numbers starting from page 1.`}
      toolLink="/pdf-tools"
    />
  );
}
