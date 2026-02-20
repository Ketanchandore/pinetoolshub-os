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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

