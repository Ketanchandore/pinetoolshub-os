import { ToolLandingPage } from "@/components/ToolLandingPage";
import { Minimize2 } from "lucide-react";

export default function CompressImageLanding() {
  return (
    <ToolLandingPage
      toolId="compress"
      title="Compress Image"
      seoTitle="Compress Image Online Free — Reduce Image File Size Up to 80% Without Quality Loss (2026)"
      seoDescription="Compress images online for free. Reduce JPEG, PNG, WebP file size by up to 80% without visible quality loss. No signup, no watermarks, no file limits. 100% browser-based image compression with instant before/after comparison. Perfect for websites, emails, and social media."
      canonical="/compress-image"
      keywords="compress image online free, reduce image size, image compressor free, compress jpeg png webp, reduce photo file size, image optimization tool 2026"
      icon={Minimize2}
      iconGradient="from-green-500 to-teal-500"
      heroTitle="Compress Images Online — Free & Instant"
      heroSubtitle="Reduce image file size by up to 80% while keeping visual quality. Before/after comparison included."
      features={[
        { title: "Up to 80% Size Reduction", description: "Smart compression reduces file size dramatically without visible quality loss." },
        { title: "All Formats Supported", description: "Compress JPEG, PNG, WebP, and BMP images with one tool." },
        { title: "Quality Slider", description: "Adjust compression level from 1-100 to find the perfect size/quality balance." },
        { title: "Before/After Preview", description: "See the original and compressed images side by side with size comparison." },
        { title: "100% Browser-Based", description: "Images are compressed locally. No upload to any server — total privacy." },
        { title: "Free & Unlimited", description: "No signup, no daily limits, no watermarks on output." },
      ]}
      howToSteps={[
        { step: "Upload Your Image", description: "Drop your image (JPG, PNG, WebP) into the upload area or click to browse." },
        { step: "Adjust Quality", description: "Use the quality slider to set your preferred compression level." },
        { step: "Download Compressed Image", description: "Preview the result and download your smaller image file." },
      ]}
      faqs={[
        { question: "How to compress images online for free?", answer: "Upload your image to PineToolsHub, adjust the quality slider, and click Process. Your compressed image downloads instantly with a before/after size comparison." },
        { question: "Does compression reduce image quality?", answer: "Smart compression at quality 70-80 produces virtually no visible difference while reducing file size by 50-80%." },
        { question: "What image formats can I compress?", answer: "JPEG, PNG, WebP, and BMP formats are all supported." },
        { question: "Is there a file size limit?", answer: "No! Compression happens in your browser, so there are no server-imposed limits." },
      ]}
      relatedTools={[
        { name: "Resize Image", url: "/resize-image", description: "Change dimensions" },
        { name: "Convert Image", url: "/media-tools", description: "Change format" },
        { name: "PDF to Images", url: "/pdf-to-jpg", description: "Extract as JPG" },
        { name: "Images to PDF", url: "/jpg-to-pdf", description: "Create PDF" },
      ]}
      longDescription={`Image compression is critical for website performance, email deliverability, and storage optimization. PineToolsHub's free image compressor reduces file sizes by up to 80% while maintaining visual quality that's virtually indistinguishable from the original.

Our compression tool uses the HTML5 Canvas API to re-encode images at your desired quality level. This means actual, real file size reduction — not fake processing.

Use cases:
• Website optimization — faster page loads improve SEO ranking and user experience
• Email attachments — fit more images within email size limits
• Social media — faster upload and download times
• Storage — reduce cloud storage costs for image archives
• E-commerce — optimize product photos for fast-loading product pages`}
      toolLink="/media-tools"
    />
  );
}
