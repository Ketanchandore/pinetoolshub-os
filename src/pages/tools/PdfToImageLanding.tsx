import { ToolLandingPage } from "@/components/ToolLandingPage";
import { Image } from "lucide-react";

export default function PdfToImageLanding() {
  return (
    <ToolLandingPage
      toolId="pdf2img"
      title="PDF to Images"
      seoTitle="Convert PDF to JPG Images Online Free — Extract Pages as Pictures (2026)"
      seoDescription="Convert PDF to JPG images online for free. Extract every page of your PDF as high-quality JPEG images instantly. No signup, no watermarks, no file limits. 100% browser-based conversion — your files stay private. Perfect for presentations, social media, and document sharing."
      canonical="/pdf-to-jpg"
      keywords="pdf to jpg online free, convert pdf to image, pdf to jpeg, extract images from pdf, pdf to picture converter, pdf to jpg converter free 2026"
      icon={Image}
      iconGradient="from-indigo-500 to-blue-500"
      heroTitle="Convert PDF to JPG Images — Free"
      heroSubtitle="Extract every page of your PDF as high-quality JPEG images. Perfect for presentations and social sharing."
      features={[
        { title: "High-Quality Output", description: "Extract pages as crisp, clear JPEG images suitable for presentations and printing." },
        { title: "All Pages Extracted", description: "Convert every page of your PDF into individual image files automatically." },
        { title: "Individual Downloads", description: "Download each page image separately — choose only the pages you need." },
        { title: "100% Private", description: "Conversion happens in your browser. No files are uploaded to any server." },
        { title: "No Registration", description: "Start converting immediately. No account, no email verification needed." },
        { title: "Mobile Friendly", description: "Convert PDFs to images on your phone or tablet — works on all devices." },
      ]}
      howToSteps={[
        { step: "Upload Your PDF", description: "Select or drag your PDF file into the upload area." },
        { step: "Convert to Images", description: "Click Process to extract all pages as JPEG images." },
        { step: "Download Images", description: "Preview each page image and download individually." },
      ]}
      faqs={[
        { question: "How to convert PDF to JPG online free?", answer: "Upload your PDF to PineToolsHub's PDF to Images tool and click Process. Each page is extracted as a high-quality JPEG image that you can download individually." },
        { question: "Can I convert a multi-page PDF to images?", answer: "Yes! Every page in your PDF is automatically converted to a separate JPEG image." },
        { question: "What image quality do I get?", answer: "PineToolsHub extracts pages at high resolution, suitable for presentations, printing, and social media sharing." },
        { question: "Is it safe to convert PDF to images online?", answer: "Yes. All processing happens in your browser. Your PDF is never uploaded to any server." },
      ]}
      relatedTools={[
        { name: "Images to PDF", url: "/jpg-to-pdf", description: "Convert images to PDF" },
        { name: "Compress Image", url: "/compress-image", description: "Reduce image size" },
        { name: "Merge PDF", url: "/merge-pdf", description: "Combine PDFs" },
        { name: "Split PDF", url: "/split-pdf", description: "Extract pages" },
      ]}
      longDescription={`Converting PDF to images is essential for sharing document pages on social media, inserting into presentations, or extracting visual content from reports. PineToolsHub's free PDF to JPG converter makes this process instant and effortless.

Each page of your PDF is extracted as a separate high-quality JPEG image. You can preview all extracted images and download the specific pages you need. This is particularly useful for:
• Creating presentation slides from PDF reports
• Sharing individual pages on social media platforms
• Extracting charts, graphs, and visual content from documents
• Creating thumbnails for document management systems
• Converting scanned documents to image format for further editing

All processing happens in your browser using the Canvas API, ensuring complete privacy for your documents.`}
      toolLink="/pdf-tools"
    />
  );
}
