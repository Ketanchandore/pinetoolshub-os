import { MainLayout } from "@/components/layout/MainLayout";
import ComingSoon from "./ComingSoon";

export default function SettingsPage() {
  return (
    <MainLayout>
      <ComingSoon
        title="Settings"
        description="Customize your workspace, manage integrations, and configure your productivity preferences."
      />
    </MainLayout>
  );
}
