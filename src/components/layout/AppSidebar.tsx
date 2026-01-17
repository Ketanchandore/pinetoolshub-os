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
  LogOut,
  User,
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
      <SidebarHeader className="p-4 pb-6">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/25"
          >
            <TreePine className="h-6 w-6 text-white" />
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
                <span className="text-[11px] font-semibold uppercase tracking-widest bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Hub
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3">
        {/* AI Badge */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-3 py-3 border border-purple-500/20">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-sidebar-accent-foreground">
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
                    className={cn(
                      "h-11 rounded-xl transition-all duration-200",
                      isActive(item.url) && "bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30"
                    )}
                  >
                    <Link to={item.url}>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        <div className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200",
                          isActive(item.url) 
                            ? "bg-gradient-to-br from-pink-500 to-purple-600 shadow-md shadow-pink-500/20" 
                            : "bg-sidebar-muted group-hover:bg-sidebar-accent"
                        )}>
                          <item.icon className={cn(
                            "h-4 w-4 transition-colors",
                            isActive(item.url) ? "text-white" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
                          )} />
                        </div>
                        <span className={cn(
                          "font-medium",
                          isActive(item.url) ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/80"
                        )}>{item.title}</span>
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
      <SidebarFooter className="p-3">
        <SidebarMenu>
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={isActive(item.url)}
                className="h-11 rounded-xl"
              >
                <Link to={item.url}>
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    isActive(item.url) 
                      ? "bg-gradient-to-br from-pink-500 to-purple-600" 
                      : "bg-sidebar-muted"
                  )}>
                    <item.icon className={cn(
                      "h-4 w-4",
                      isActive(item.url) ? "text-white" : "text-sidebar-foreground/70"
                    )} />
                  </div>
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {/* User Profile */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-center gap-3 rounded-xl bg-sidebar-accent/50 p-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">john@example.com</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent">
                <LogOut className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mt-3 h-9 w-full text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground rounded-xl"
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
