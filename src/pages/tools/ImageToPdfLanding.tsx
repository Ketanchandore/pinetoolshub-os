import { ToolLandingPage } from "@/components/ToolLandingPage";
import { FileText } from "lucide-react";

export default function ImageToPdfLanding() {
  return (
    <ToolLandingPage
      toolId="img2pdf"
      title="Images to PDF"
      seoTitle="Convert JPG to PDF Online Free — Turn Images Into PDF Document Instantly (2026)"
      seoDescription="Convert JPG, PNG, WebP images to PDF online for free. Combine multiple photos into one PDF document. No signup, no watermarks, no file limits. 100% browser-based — your images stay private. Perfect for creating photo albums, portfolios, and document scans."
      canonical="/jpg-to-pdf"
      keywords="jpg to pdf online free, convert image to pdf, png to pdf, convert photos to pdf, image to pdf converter free, multiple images to pdf 2026"
      icon={FileText}
      iconGradient="from-emerald-500 to-green-500"
      heroTitle="Convert Images to PDF — Free & Instant"
      heroSubtitle="Turn your JPG, PNG, or WebP images into a PDF document. Combine multiple photos into one file."
      features={[
        { title: "Multiple Image Formats", description: "Convert JPG, JPEG, PNG, WebP, and BMP images to PDF format." },
        { title: "Combine Multiple Images", description: "Merge several images into a single PDF document — perfect for photo collections." },
        { title: "Maintain Image Quality", description: "Images are embedded at full resolution in the PDF output." },
        { title: "100% Private Processing", description: "Images are converted in your browser. Nothing is uploaded to any server." },
        { title: "No Signup Required", description: "Start converting immediately without any account or registration." },
        { title: "Mobile Support", description: "Convert camera photos to PDF directly from your phone." },
      ]}
      howToSteps={[
        { step: "Upload Images", description: "Select one or multiple images (JPG, PNG, WebP) from your device." },
        { step: "Arrange Order", description: "Reorder images if needed to set the page sequence in your PDF." },
        { step: "Convert & Download", description: "Click Process to create your PDF. Download the file instantly." },
      ]}
      faqs={[
        { question: "How to convert JPG to PDF online free?", answer: "Upload your JPG images to PineToolsHub, arrange them in order, and click Process. Your PDF with all images downloads instantly — free, no signup." },
        { question: "Can I combine multiple images into one PDF?", answer: "Yes! Upload multiple images and they'll all be combined into a single PDF document, one image per page." },
        { question: "What image formats are supported?", answer: "JPG, JPEG, PNG, WebP, and BMP formats are all supported for conversion to PDF." },
        { question: "Is the conversion free?", answer: "Yes, completely free with no watermarks, no daily limits, and no signup required." },
      ]}
      relatedTools={[
        { name: "PDF to Images", url: "/pdf-to-jpg", description: "Extract pages as JPG" },
        { name: "Compress Image", url: "/compress-image", description: "Reduce image size" },
        { name: "Merge PDF", url: "/merge-pdf", description: "Combine PDFs" },
        { name: "Resize Image", url: "/resize-image", description: "Change dimensions" },
      ]}
      longDescription={`Converting images to PDF is one of the most frequently needed document tasks. Whether you're a student scanning handwritten notes with your phone camera, a photographer creating a portfolio, or a professional compiling document scans — PineToolsHub makes it instant and free.

Our image to PDF converter accepts all common image formats including JPG, PNG, WebP, and BMP. You can upload multiple images at once, and each image becomes a full page in the resulting PDF document.

Key use cases:
• Converting phone camera scans to PDF for submission
• Creating photo albums and portfolios in PDF format
• Combining screenshot sequences into a single document
• Converting design mockups to PDF for client presentations
• Archiving image collections in a single portable file

All conversion happens in your browser using the pdf-lib library, ensuring your images remain completely private.`}
      toolLink="/pdf-tools"
    />
  );
}
