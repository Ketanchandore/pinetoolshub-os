import { MainLayout } from "@/components/layout/MainLayout";
import ComingSoon from "./ComingSoon";

export default function MediaToolsPage() {
  return (
    <MainLayout>
      <ComingSoon
        title="Media Tools"
        description="Powerful image and video tools. Resize, compress, convert, and enhance your media files with one click."
      />
    </MainLayout>
  );
}
