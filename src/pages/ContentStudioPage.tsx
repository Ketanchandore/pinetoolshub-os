import { MainLayout } from "@/components/layout/MainLayout";
import ComingSoon from "./ComingSoon";

export default function ContentStudioPage() {
  return (
    <MainLayout>
      <ComingSoon
        title="Content Studio"
        description="AI-powered content creation. Write blog posts, marketing copy, social media content, and more with intelligent assistance."
      />
    </MainLayout>
  );
}
