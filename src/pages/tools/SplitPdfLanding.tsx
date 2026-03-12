import { ToolLandingPage } from "@/components/ToolLandingPage";
import { Scissors } from "lucide-react";

export default function SplitPdfLanding() {
  return (
    <ToolLandingPage
      toolId="split"
      title="Split PDF"
      seoTitle="Split PDF Online Free — Extract Pages From PDF Files Instantly (2026)"
      seoDescription="Split PDF files online for free. Extract specific pages, split by page range, or separate every page into individual PDF files. No signup, no watermarks, no file limits. 100% browser-based privacy — your files never leave your device. Works on all devices including mobile phones and tablets."
      canonical="/split-pdf"
      keywords="split pdf online free, extract pages from pdf, separate pdf pages, split pdf by page range, pdf splitter free no signup, split pdf into individual pages 2026"
      icon={Scissors}
      iconGradient="from-purple-500 to-violet-500"
      heroTitle="Split PDF Pages Online — Free & Instant"
      heroSubtitle="Extract specific pages or split your PDF into separate files. Select page ranges and download — all in your browser."
      features={[
        { title: "Split by Page Range", description: "Extract pages 1-5, 10-15, or any custom range from your PDF document." },
        { title: "100% Browser-Based", description: "Your PDF never leaves your device. All splitting happens locally in your browser." },
        { title: "No File Size Limits", description: "Split PDFs of any size — 1 page or 1000 pages, no restrictions." },
        { title: "Preserve Original Quality", description: "Extracted pages maintain original formatting, images, fonts and hyperlinks." },
        { title: "Works on Mobile", description: "Split PDFs on iPhone, Android, iPad — any device with a web browser." },
        { title: "Instant Download", description: "Your split PDF is ready to download in seconds. No waiting, no email required." },
      ]}
      howToSteps={[
        { step: "Upload Your PDF", description: "Click upload or drag and drop your PDF file into the tool." },
        { step: "Select Page Range", description: "Enter the start and end page numbers you want to extract." },
        { step: "Split & Download", description: "Click Process and your extracted pages download as a new PDF instantly." },
      ]}
      faqs={[
        { question: "How to split a PDF file online for free?", answer: "Upload your PDF to PineToolsHub, enter the page range you want to extract, and click Process. Your split PDF downloads instantly — completely free, no signup needed." },
        { question: "Can I extract specific pages from a PDF?", answer: "Yes! Enter any page range like 1-5 or specific pages. The tool creates a new PDF with only the pages you selected." },
        { question: "Is splitting PDFs online safe?", answer: "Yes. PineToolsHub processes files entirely in your browser. Your PDF is never uploaded to any server." },
        { question: "Can I split a PDF on my phone?", answer: "Absolutely! PineToolsHub works on all mobile devices including iPhone and Android. No app download needed." },
      ]}
      relatedTools={[
        { name: "Merge PDF", url: "/merge-pdf", description: "Combine multiple PDFs" },
        { name: "Extract Pages", url: "/pdf-tools", description: "Save selected pages" },
        { name: "Remove Pages", url: "/pdf-tools", description: "Delete specific pages" },
        { name: "Compress PDF", url: "/compress-pdf", description: "Reduce file size" },
      ]}
      longDescription={`Splitting PDF files is essential when you need to extract specific pages from a large document. Whether you're a student extracting chapters from a textbook, a professional pulling pages from a report, or a lawyer separating sections of a legal document — PineToolsHub's Split PDF tool does it instantly and for free.

Our browser-based PDF splitter uses the pdf-lib library to precisely extract your selected pages while maintaining the original document quality. All fonts, images, formatting, and hyperlinks are preserved in the output file.

Unlike cloud-based PDF splitters, PineToolsHub never uploads your files to any server. Your documents stay on your device throughout the entire process, making it the safest option for splitting confidential or sensitive PDFs.`}
      toolLink="/pdf-tools"
    />
  );
}
