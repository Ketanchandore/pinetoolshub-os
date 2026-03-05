import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, softwareSchema } from "@/components/SEOHead";
import Dashboard from "./Dashboard";

const Index = () => {
  return (
    <MainLayout>
      <SEOHead
        title="PineToolsHub — Free Online PDF Tools, AI File Manager & Image Compressor (2026)"
        description="30+ free online PDF tools — merge, split, compress, rotate, watermark, page numbers, resize & more. AI-powered file manager, image compressor, content writer. 100% browser-based, no signup, no ads. The ultimate free productivity OS for students, freelancers and professionals worldwide."
        canonical="/"
        keywords="free pdf tools online, merge pdf free, compress pdf online, split pdf, ai file manager, image compressor free, ai content writer, pdf editor online free 2026"
        jsonLd={softwareSchema()}
      />
      <Dashboard />
    </MainLayout>
  );
};

export default Index;
