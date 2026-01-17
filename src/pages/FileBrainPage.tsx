import { MainLayout } from "@/components/layout/MainLayout";
import ComingSoon from "./ComingSoon";

export default function FileBrainPage() {
  return (
    <MainLayout>
      <ComingSoon
        title="File Brain"
        description="Your AI-powered file memory. Upload once, find forever. Smart organization that learns from how you work."
      />
    </MainLayout>
  );
}
