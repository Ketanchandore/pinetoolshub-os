import { MainLayout } from "@/components/layout/MainLayout";
import ComingSoon from "./ComingSoon";

export default function AutomationsPage() {
  return (
    <MainLayout>
      <ComingSoon
        title="Automations"
        description="Build powerful workflows that run on autopilot. Chain multiple tools together and let AI handle the repetitive work."
      />
    </MainLayout>
  );
}
