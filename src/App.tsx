import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import CommandPage from "./pages/CommandPage";
import FileBrainPage from "./pages/FileBrainPage";
import ContentStudioPage from "./pages/ContentStudioPage";
import AutomationsPage from "./pages/AutomationsPage";
import MediaToolsPage from "./pages/MediaToolsPage";
import SettingsPage from "./pages/SettingsPage";
import BrandKitPage from "./pages/BrandKitPage";
import AuthPage from "./pages/AuthPage";
import PDFToolsPage from "./pages/PDFToolsPage";
import BlogPage from "./pages/BlogPage";
import AIToolsGuide2026 from "./pages/blog/AIToolsGuide2026";
import FreePDFToolsGuide from "./pages/blog/FreePDFToolsGuide";
import WhyPineToolsHub from "./pages/blog/WhyPineToolsHub";
import ImageCompressionGuide from "./pages/blog/ImageCompressionGuide";
import AIContentWritingWorkflow from "./pages/blog/AIContentWritingWorkflow";
import MergePdfGuide from "./pages/blog/MergePdfGuide";
import SplitPdfBlog from "./pages/blog/SplitPdfBlog";
import CompressPdfBlog from "./pages/blog/CompressPdfBlog";
import RotatePdfBlog from "./pages/blog/RotatePdfBlog";
import WatermarkPdfBlog from "./pages/blog/WatermarkPdfBlog";
import ProtectPdfBlog from "./pages/blog/ProtectPdfBlog";
import PdfToImagesBlog from "./pages/blog/PdfToImagesBlog";
import ImagesToPdfBlog from "./pages/blog/ImagesToPdfBlog";
import PageNumbersBlog from "./pages/blog/PageNumbersBlog";
import RemovePagesBlog from "./pages/blog/RemovePagesBlog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/command" element={<CommandPage />} />
            <Route path="/file-brain" element={<FileBrainPage />} />
            <Route path="/content-studio" element={<ContentStudioPage />} />
            <Route path="/automations" element={<AutomationsPage />} />
            <Route path="/media-tools" element={<MediaToolsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/brandkit" element={<BrandKitPage />} />
            <Route path="/pdf-tools" element={<PDFToolsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/best-free-ai-tools-2026" element={<AIToolsGuide2026 />} />
            <Route path="/blog/free-pdf-tools-online-guide" element={<FreePDFToolsGuide />} />
            <Route path="/blog/why-pinetoolshub-replaces-10-apps" element={<WhyPineToolsHub />} />
            <Route path="/blog/image-compression-resize-guide" element={<ImageCompressionGuide />} />
            <Route path="/blog/ai-content-writing-workflow" element={<AIContentWritingWorkflow />} />
            <Route path="/blog/how-to-merge-pdf-online-free" element={<MergePdfGuide />} />
            <Route path="/blog/how-to-split-pdf-pages" element={<SplitPdfBlog />} />
            <Route path="/blog/compress-pdf-reduce-size" element={<CompressPdfBlog />} />
            <Route path="/blog/rotate-pdf-pages-online" element={<RotatePdfBlog />} />
            <Route path="/blog/add-watermark-to-pdf" element={<WatermarkPdfBlog />} />
            <Route path="/blog/password-protect-pdf" element={<ProtectPdfBlog />} />
            <Route path="/blog/convert-pdf-to-images" element={<PdfToImagesBlog />} />
            <Route path="/blog/convert-images-to-pdf" element={<ImagesToPdfBlog />} />
            <Route path="/blog/add-page-numbers-to-pdf" element={<PageNumbersBlog />} />
            <Route path="/blog/remove-pages-from-pdf" element={<RemovePagesBlog />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
