import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Command,
  Brain,
  PenTool,
  Zap,
  Image,
  Settings,
  ChevronLeft,
  Sparkles,
  TreePine,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Command Bar", url: "/command", icon: Command },
  { title: "File Brain", url: "/file-brain", icon: Brain },
  { title: "Content Studio", url: "/content-studio", icon: PenTool },
  { title: "Automations", url: "/automations", icon: Zap },
  { title: "Media Tools", url: "/media-tools", icon: Image },
];

const bottomNavItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0"
    >
      {/* Logo Header */}
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary shadow-glow-accent"
          >
            <TreePine className="h-5 w-5 text-sidebar-primary-foreground" />
          </motion.div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col"
              >
                <span className="font-display text-lg font-bold text-sidebar-foreground">
                  PineTools
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-sidebar-primary">
                  Hub
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* AI Badge */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-2 mb-4"
            >
              <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent/50 px-3 py-2.5 backdrop-blur-sm">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-sidebar-primary/20">
                  <Sparkles className="h-3.5 w-3.5 text-sidebar-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-sidebar-accent-foreground">
                    AI-Powered
                  </span>
                  <span className="text-[10px] text-sidebar-foreground/60">
                    Productivity OS
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={isActive(item.url)}
                  >
                    <Link to={item.url}>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </motion.div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-2">
        <SidebarMenu>
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={isActive(item.url)}
              >
                <Link to={item.url}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {/* Collapse Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mt-2 h-8 w-full text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-2 text-xs"
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
