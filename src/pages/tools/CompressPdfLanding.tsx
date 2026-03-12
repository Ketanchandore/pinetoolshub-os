import { ToolLandingPage } from "@/components/ToolLandingPage";
import { Download } from "lucide-react";

export default function CompressPdfLanding() {
  return (
    <ToolLandingPage
      toolId="compress"
      title="Compress PDF"
      seoTitle="Compress PDF Online Free — Reduce PDF File Size Without Losing Quality (2026)"
      seoDescription="Compress PDF files online for free and reduce file size by up to 60% without losing quality. No signup, no watermarks, no file limits. 100% browser-based compression — your files never leave your device. Perfect for email attachments, website uploads, and reducing storage space. Works on Windows, Mac, iPhone, Android."
      canonical="/compress-pdf"
      keywords="compress pdf online free, reduce pdf file size, shrink pdf, pdf compressor free, reduce pdf size without losing quality, compress pdf for email, pdf file size reducer 2026"
      icon={Download}
      iconGradient="from-green-500 to-teal-500"
      heroTitle="Compress PDF — Reduce File Size Free"
      heroSubtitle="Shrink your PDF files by up to 60% without visible quality loss. Perfect for email attachments and uploads."
      features={[
        { title: "Up to 60% Size Reduction", description: "Smart compression optimizes internal structures, fonts, and metadata to dramatically reduce file size." },
        { title: "No Quality Loss", description: "Text stays sharp, images stay clear. Our algorithm targets redundant data, not visual quality." },
        { title: "100% Browser-Based", description: "Your PDF is compressed entirely on your device. No upload to any server — maximum privacy." },
        { title: "Perfect for Email", description: "Reduce PDF size to fit email attachment limits. Send large documents without file hosting services." },
        { title: "Batch Processing", description: "Compress multiple PDFs one after another. No daily limits or usage caps." },
        { title: "All Devices Supported", description: "Works on desktop, laptop, tablet, and mobile — any device with a modern browser." },
      ]}
      howToSteps={[
        { step: "Upload Your PDF", description: "Drop your PDF file into the upload area or click to browse files from your device." },
        { step: "Compress Automatically", description: "Our smart algorithm analyzes and compresses your PDF optimizing internal structures." },
        { step: "Download Smaller File", description: "Your compressed PDF downloads instantly. See exactly how much file size was saved." },
      ]}
      faqs={[
        { question: "How to compress a PDF file size online?", answer: "Upload your PDF to PineToolsHub's Compress tool and click Process. The tool automatically reduces file size by optimizing internal structures. Download your smaller PDF instantly — free, no signup." },
        { question: "Does compressing PDF reduce quality?", answer: "No. PineToolsHub's compression targets redundant metadata, unused fonts, and internal structures — not the visual content. Text and images remain sharp." },
        { question: "How much can I reduce PDF size?", answer: "Typical savings are 20-60% depending on the PDF content. Documents with lots of embedded fonts or metadata see the biggest reductions." },
        { question: "Is there a file size limit?", answer: "No file size limit. All compression happens in your browser, so you can compress any size PDF." },
        { question: "Can I compress PDF on phone?", answer: "Yes! PineToolsHub works perfectly on iPhone and Android browsers. No app download needed." },
      ]}
      relatedTools={[
        { name: "Merge PDF", url: "/merge-pdf", description: "Combine multiple PDFs" },
        { name: "Split PDF", url: "/split-pdf", description: "Extract pages" },
        { name: "Resize Pages", url: "/pdf-tools", description: "Change page dimensions" },
        { name: "Flatten PDF", url: "/pdf-tools", description: "Flatten form fields" },
      ]}
      longDescription={`Large PDF files can be a headache — they're slow to email, difficult to upload, and take up valuable storage space. PineToolsHub's free PDF compressor solves this problem by intelligently reducing file size without compromising visual quality.

Our compression algorithm works by optimizing the internal structure of your PDF: removing duplicate font subsets, cleaning up unused metadata, optimizing the cross-reference table, and streamlining object encoding. The result is a significantly smaller file that looks identical to the original.

This is especially useful for:
• Email attachments — most email services limit attachments to 25MB
• Website uploads — smaller PDFs load faster for visitors
• Cloud storage — reduce storage costs by compressing archives
• Printing — compressed PDFs process faster on printers
• Sharing — smaller files transfer faster over slow internet connections

PineToolsHub compresses PDFs entirely in your browser using the pdf-lib JavaScript library. Your documents are never uploaded to any server, making this the safest compression tool available online.`}
      toolLink="/pdf-tools"
    />
  );
}
