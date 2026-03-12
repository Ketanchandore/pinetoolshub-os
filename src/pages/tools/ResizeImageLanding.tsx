import { ToolLandingPage } from "@/components/ToolLandingPage";
import { Maximize2 } from "lucide-react";

export default function ResizeImageLanding() {
  return (
    <ToolLandingPage
      toolId="resize"
      title="Resize Image"
      seoTitle="Resize Image Online Free — Change Image Dimensions & Resolution Instantly (2026)"
      seoDescription="Resize images online for free. Change width, height, and resolution of JPEG, PNG, WebP images. Lock aspect ratio, set custom dimensions. No signup, no watermarks. 100% browser-based — your images stay private. Perfect for social media, thumbnails, and web design."
      canonical="/resize-image"
      keywords="resize image online free, change image size, resize photo, image resizer free, resize image for social media, change image dimensions 2026"
      icon={Maximize2}
      iconGradient="from-blue-500 to-cyan-500"
      heroTitle="Resize Images Online — Free & Instant"
      heroSubtitle="Change image dimensions with locked aspect ratio. Set custom width and height for any purpose."
      features={[
        { title: "Custom Dimensions", description: "Set exact width and height in pixels for precise resizing." },
        { title: "Lock Aspect Ratio", description: "Maintain proportions automatically when changing one dimension." },
        { title: "Quality Control", description: "Adjust output quality to balance file size and image clarity." },
        { title: "All Formats", description: "Resize JPEG, PNG, WebP, and BMP images." },
        { title: "100% Private", description: "Images are resized in your browser. No server upload." },
        { title: "Free & Unlimited", description: "No signup, no limits, no watermarks." },
      ]}
      howToSteps={[
        { step: "Upload Image", description: "Drop your image into the upload area or click to browse." },
        { step: "Set Dimensions", description: "Enter width and height. Toggle aspect ratio lock as needed." },
        { step: "Resize & Download", description: "Click Process and download your resized image instantly." },
      ]}
      faqs={[
        { question: "How to resize an image online for free?", answer: "Upload your image, enter the desired width and height, and click Process. Your resized image downloads instantly — free, no signup." },
        { question: "Can I maintain aspect ratio while resizing?", answer: "Yes! Enable the aspect ratio lock and changing one dimension automatically adjusts the other." },
        { question: "What's the maximum size I can resize to?", answer: "You can resize to any dimensions your device can handle. There are no artificial limits." },
      ]}
      relatedTools={[
        { name: "Compress Image", url: "/compress-image", description: "Reduce file size" },
        { name: "Convert Image", url: "/media-tools", description: "Change format" },
        { name: "Images to PDF", url: "/jpg-to-pdf", description: "Create PDF" },
        { name: "PDF to Images", url: "/pdf-to-jpg", description: "Extract as JPG" },
      ]}
      longDescription={`Resizing images is essential for social media posts, website thumbnails, email marketing, and print materials. PineToolsHub's free image resizer lets you set exact pixel dimensions with optional aspect ratio locking.

Whether you need Instagram-ready 1080x1080 squares, YouTube thumbnails at 1280x720, LinkedIn banners at 1584x396, or custom dimensions for your website — this tool handles it all instantly in your browser.`}
      toolLink="/media-tools"
    />
  );
}
