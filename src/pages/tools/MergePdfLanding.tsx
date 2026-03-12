import { ToolLandingPage } from "@/components/ToolLandingPage";
import { Layers } from "lucide-react";

export default function MergePdfLanding() {
  return (
    <ToolLandingPage
      toolId="merge"
      title="Merge PDF"
      seoTitle="Merge PDF Online Free — Combine Multiple PDFs Into One File Instantly (2026)"
      seoDescription="Merge PDF files online for free with PineToolsHub. Combine 2, 5, 10 or unlimited PDF documents into one single file in seconds. No signup, no watermarks, no file size limits. 100% browser-based — your files never leave your device. Works on Windows, Mac, iPhone, Android. The fastest free PDF merger tool for students, teachers, freelancers and professionals worldwide."
      canonical="/merge-pdf"
      keywords="merge pdf online free, combine pdf files, join pdf documents, merge multiple pdfs into one, pdf combiner free no signup, merge pdf without watermark, combine pdf files online free 2026"
      icon={Layers}
      iconGradient="from-blue-500 to-cyan-500"
      heroTitle="Merge PDF Files Online — Free & Instant"
      heroSubtitle="Combine multiple PDF documents into one single file. Drag, drop, arrange, and download — all in your browser. No signup required."
      features={[
        { title: "Unlimited File Merging", description: "Merge 2, 5, 10 or even 100 PDF files at once. No file count or size restrictions." },
        { title: "Drag & Drop Reordering", description: "Simply drag files to rearrange the order before merging. Get the exact sequence you need." },
        { title: "100% Browser-Based Privacy", description: "Your PDFs never leave your device. All processing happens locally in your browser using JavaScript." },
        { title: "No Signup or Account", description: "Start merging PDFs instantly. No email, no account creation, no hidden costs." },
        { title: "Works on All Devices", description: "Use on Windows, Mac, Linux, iPhone, iPad, Android — any device with a web browser." },
        { title: "Lightning Fast Processing", description: "Merge large PDF files in seconds thanks to optimized client-side processing with pdf-lib." },
      ]}
      howToSteps={[
        { step: "Upload Your PDF Files", description: "Click 'Choose Files' or drag and drop your PDF documents into the upload area. Select multiple files at once." },
        { step: "Arrange the Order", description: "Drag files to rearrange them in your preferred order. Remove any files you don't want to include." },
        { step: "Merge & Download", description: "Click 'Process' and your merged PDF downloads instantly. That's it — completely free!" },
      ]}
      faqs={[
        { question: "How do I merge PDF files online for free?", answer: "Upload your PDF files to PineToolsHub's Merge PDF tool, arrange them in order, and click Process. Your combined PDF downloads instantly — no signup, no watermarks, completely free." },
        { question: "Is it safe to merge PDF files online?", answer: "Yes! PineToolsHub processes everything in your browser. Your files are never uploaded to any server. This is the most private PDF merger available online." },
        { question: "Can I merge more than 10 PDF files?", answer: "Absolutely! There's no limit on the number of files you can merge. Combine 2 or 200 PDFs — it works the same." },
        { question: "Does merging PDFs reduce quality?", answer: "No. PineToolsHub preserves the original quality of all pages, images, fonts, and formatting in your merged PDF." },
        { question: "Can I merge PDF on my phone?", answer: "Yes! PineToolsHub works on all devices including iPhone and Android phones. Just open the website in your mobile browser and start merging." },
        { question: "What is the file size limit for merging PDFs?", answer: "There is no file size limit. Processing happens locally on your device, so you can merge large PDFs as long as your device has enough memory." },
      ]}
      relatedTools={[
        { name: "Split PDF", url: "/split-pdf", description: "Extract specific pages" },
        { name: "Compress PDF", url: "/compress-pdf", description: "Reduce file size" },
        { name: "Rotate PDF", url: "/rotate-pdf", description: "Rotate pages" },
        { name: "Add Page Numbers", url: "/add-page-numbers-pdf", description: "Number your pages" },
      ]}
      longDescription={`Merging PDF files is one of the most common document tasks for students, professionals, and businesses. Whether you need to combine multiple assignment pages, merge invoices into a single file, or join contract documents — PineToolsHub's free online PDF merger makes it effortless.

Unlike other PDF merger tools that upload your files to remote servers, PineToolsHub processes everything entirely in your web browser. This means your sensitive documents — financial records, legal contracts, medical reports — never leave your device. No server storage, no data collection, no privacy risks.

Our PDF merger uses the powerful pdf-lib JavaScript library to handle the merging process. This ensures high-quality output while maintaining the original formatting, fonts, images, and hyperlinks in your documents.

Key advantages of using PineToolsHub Merge PDF over competitors like iLovePDF, SmallPDF, or Adobe Acrobat:
• No file upload required — 100% client-side processing
• No watermarks on output files
• No signup or account needed
• No daily usage limits
• Works offline after the page loads
• Compatible with all modern browsers and devices

Whether you're a student combining lecture notes, a lawyer merging legal documents, a teacher creating combined worksheets, or a business professional organizing reports — PineToolsHub's Merge PDF tool is the fastest, safest, and most convenient solution available in 2026.`}
      toolLink="/pdf-tools"
    />
  );
}
