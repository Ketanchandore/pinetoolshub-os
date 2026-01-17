import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";
import { CommandDialog } from "@/components/command/CommandDialog";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col">
          <TopBar onCommandOpen={() => setCommandOpen(true)} />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen} />
    </SidebarProvider>
  );
}
