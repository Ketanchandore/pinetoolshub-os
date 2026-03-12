import { ToolLandingPage } from "@/components/ToolLandingPage";
import { RefreshCw } from "lucide-react";

export default function ConvertImageLanding() {
  return (
    <ToolLandingPage
      toolId="convert"
      title="Convert Image Format"
      seoTitle="Convert Image Format Online Free — JPG to PNG, PNG to WebP, BMP Converter (2026)"
      seoDescription="Convert images between JPEG, PNG, WebP and BMP formats online for free. Change image format with adjustable quality. No signup, no watermarks. 100% browser-based — your images stay private. Perfect for web optimization and compatibility."
      canonical="/convert-image"
      keywords="convert image format online free, jpg to png converter, png to webp, image format converter, convert photo format free 2026"
      icon={RefreshCw}
      iconGradient="from-purple-500 to-pink-500"
      heroTitle="Convert Image Format — Free & Instant"
      heroSubtitle="Switch between JPEG, PNG, WebP, and BMP formats with adjustable quality settings."
      features={[
        { title: "Multiple Formats", description: "Convert between JPEG, PNG, WebP, and BMP formats." },
        { title: "Quality Control", description: "Adjust output quality for optimal file size and clarity." },
        { title: "WebP Support", description: "Convert to WebP for modern web optimization — up to 30% smaller than JPEG." },
        { title: "PNG Transparency", description: "Convert to PNG to preserve transparency in logos and graphics." },
        { title: "100% Browser-Based", description: "No upload to any server. Complete privacy." },
        { title: "Free & Unlimited", description: "No signup, no limits, no watermarks." },
      ]}
      howToSteps={[
        { step: "Upload Image", description: "Select your image file (JPG, PNG, WebP, or BMP)." },
        { step: "Choose Format", description: "Select the output format and adjust quality if needed." },
        { step: "Convert & Download", description: "Click Process and download your converted image." },
      ]}
      faqs={[
        { question: "How to convert JPG to PNG free?", answer: "Upload your JPG image, select PNG as output format, and click Process. Your converted image downloads instantly." },
        { question: "Which format is best for web?", answer: "WebP offers the best compression for web use. PNG is best for images with transparency. JPEG is universal." },
        { question: "Does conversion lose quality?", answer: "Converting to lossless formats (PNG) preserves all quality. Converting to lossy formats (JPEG, WebP) may reduce quality slightly at lower quality settings." },
      ]}
      relatedTools={[
        { name: "Compress Image", url: "/compress-image", description: "Reduce size" },
        { name: "Resize Image", url: "/resize-image", description: "Change dimensions" },
        { name: "Images to PDF", url: "/jpg-to-pdf", description: "Create PDF" },
        { name: "PDF to Images", url: "/pdf-to-jpg", description: "Extract as JPG" },
      ]}
      longDescription={`Different image formats serve different purposes. JPEG is universal and compact, PNG supports transparency, WebP offers superior compression for web, and BMP provides uncompressed quality.

PineToolsHub's free format converter lets you switch between these formats instantly in your browser. This is essential for web developers optimizing images for page speed, designers preparing assets for different platforms, and anyone who needs to convert between formats without installing software.`}
      toolLink="/media-tools"
    />
  );
}
