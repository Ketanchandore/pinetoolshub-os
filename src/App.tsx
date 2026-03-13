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
import ExtractPagesBlog from "./pages/blog/ExtractPagesBlog";
import ReorderPagesBlog from "./pages/blog/ReorderPagesBlog";
import PdfToTextBlog from "./pages/blog/PdfToTextBlog";
import FlattenPdfBlog from "./pages/blog/FlattenPdfBlog";
import GrayscalePdfBlog from "./pages/blog/GrayscalePdfBlog";
import StampPdfBlog from "./pages/blog/StampPdfBlog";
import SignPdfBlog from "./pages/blog/SignPdfBlog";
import UnlockPdfBlog from "./pages/blog/UnlockPdfBlog";
import PdfMetadataBlog from "./pages/blog/PdfMetadataBlog";
import CropPdfBlog from "./pages/blog/CropPdfBlog";
import ResizePagesBlog from "./pages/blog/ResizePagesBlog";
import HeaderFooterBlog from "./pages/blog/HeaderFooterBlog";
import DuplicatePagesBlog from "./pages/blog/DuplicatePagesBlog";
import ReversePagesBlog from "./pages/blog/ReversePagesBlog";
import RepairPdfBlog from "./pages/blog/RepairPdfBlog";
import PdfToBase64Blog from "./pages/blog/PdfToBase64Blog";
import ResizeImageBlog from "./pages/blog/ResizeImageBlog";
import NotFound from "./pages/NotFound";
import RedirectPage from "./pages/RedirectPage";

// Tool Landing Pages
import MergePdfLanding from "./pages/tools/MergePdfLanding";
import SplitPdfLanding from "./pages/tools/SplitPdfLanding";
import CompressPdfLanding from "./pages/tools/CompressPdfLanding";
import RotatePdfLanding from "./pages/tools/RotatePdfLanding";
import PdfToImageLanding from "./pages/tools/PdfToImageLanding";
import ImageToPdfLanding from "./pages/tools/ImageToPdfLanding";
import WatermarkPdfLanding from "./pages/tools/WatermarkPdfLanding";
import ProtectPdfLanding from "./pages/tools/ProtectPdfLanding";
import UnlockPdfLanding from "./pages/tools/UnlockPdfLanding";
import PageNumbersPdfLanding from "./pages/tools/PageNumbersPdfLanding";
import RemovePagesPdfLanding from "./pages/tools/RemovePagesPdfLanding";
import CompressImageLanding from "./pages/tools/CompressImageLanding";
import ResizeImageLanding from "./pages/tools/ResizeImageLanding";
import ConvertImageLanding from "./pages/tools/ConvertImageLanding";
import FlattenPdfLanding from "./pages/tools/FlattenPdfLanding";
import GrayscalePdfLanding from "./pages/tools/GrayscalePdfLanding";
import MetadataPdfLanding from "./pages/tools/MetadataPdfLanding";
import StampPdfLanding from "./pages/tools/StampPdfLanding";
import RepairPdfLanding from "./pages/tools/RepairPdfLanding";

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

            {/* Dedicated Tool Landing Pages */}
            <Route path="/merge-pdf" element={<MergePdfLanding />} />
            <Route path="/split-pdf" element={<SplitPdfLanding />} />
            <Route path="/compress-pdf" element={<CompressPdfLanding />} />
            <Route path="/rotate-pdf" element={<RotatePdfLanding />} />
            <Route path="/pdf-to-jpg" element={<PdfToImageLanding />} />
            <Route path="/jpg-to-pdf" element={<ImageToPdfLanding />} />
            <Route path="/add-watermark-pdf" element={<WatermarkPdfLanding />} />
            <Route path="/protect-pdf" element={<ProtectPdfLanding />} />
            <Route path="/unlock-pdf" element={<UnlockPdfLanding />} />
            <Route path="/add-page-numbers-pdf" element={<PageNumbersPdfLanding />} />
            <Route path="/remove-pages-pdf" element={<RemovePagesPdfLanding />} />
            <Route path="/compress-image" element={<CompressImageLanding />} />
            <Route path="/resize-image" element={<ResizeImageLanding />} />
            <Route path="/convert-image" element={<ConvertImageLanding />} />
            <Route path="/flatten-pdf" element={<FlattenPdfLanding />} />
            <Route path="/grayscale-pdf" element={<GrayscalePdfLanding />} />
            <Route path="/edit-pdf-metadata" element={<MetadataPdfLanding />} />
            <Route path="/stamp-pdf" element={<StampPdfLanding />} />
            <Route path="/repair-pdf" element={<RepairPdfLanding />} />

            {/* Blog Routes */}
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
            <Route path="/blog/extract-pages-from-pdf" element={<ExtractPagesBlog />} />
            <Route path="/blog/reorder-pdf-pages" element={<ReorderPagesBlog />} />
            <Route path="/blog/convert-pdf-to-text" element={<PdfToTextBlog />} />
            <Route path="/blog/flatten-pdf-online" element={<FlattenPdfBlog />} />
            <Route path="/blog/convert-pdf-to-grayscale" element={<GrayscalePdfBlog />} />
            <Route path="/blog/stamp-pdf-confidential-draft" element={<StampPdfBlog />} />
            <Route path="/blog/sign-pdf-online-free" element={<SignPdfBlog />} />
            <Route path="/blog/unlock-pdf-remove-restrictions" element={<UnlockPdfBlog />} />
            <Route path="/blog/edit-pdf-metadata" element={<PdfMetadataBlog />} />
            <Route path="/blog/crop-pdf-online-free" element={<CropPdfBlog />} />
            <Route path="/blog/resize-pdf-pages" element={<ResizePagesBlog />} />
            <Route path="/blog/add-header-footer-to-pdf" element={<HeaderFooterBlog />} />
            <Route path="/blog/duplicate-pdf-pages" element={<DuplicatePagesBlog />} />
            <Route path="/blog/reverse-pdf-page-order" element={<ReversePagesBlog />} />
            <Route path="/blog/repair-corrupted-pdf" element={<RepairPdfBlog />} />
            <Route path="/blog/convert-pdf-to-base64" element={<PdfToBase64Blog />} />
            <Route path="/blog/resize-image-online-free" element={<ResizeImageBlog />} />
            {/* Redirect old 404 URLs from Google Search Console */}
            <Route path="/pdf-to-image" element={<RedirectPage to="/pdf-to-jpg" />} />
            <Route path="/embed" element={<RedirectPage to="/" />} />
            <Route path="/wordpress-plugin" element={<RedirectPage to="/" />} />
            <Route path="/blog-rewriter" element={<RedirectPage to="/content-studio" />} />
            <Route path="/text-to-speech" element={<RedirectPage to="/" />} />
            <Route path="/code-generator" element={<RedirectPage to="/" />} />
            <Route path="/website-analyzer" element={<RedirectPage to="/" />} />
            <Route path="/cover-letter" element={<RedirectPage to="/content-studio" />} />
            <Route path="/pricing" element={<RedirectPage to="/" />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
