import { MainLayout } from "@/components/layout/MainLayout";
import ComingSoon from "./ComingSoon";

export default function CommandPage() {
  return (
    <MainLayout>
      <ComingSoon
        title="Command Bar"
        description="A powerful command-line interface to control all your tools and workflows. Type natural commands and let AI understand your intent."
      />
    </MainLayout>
  );
}
