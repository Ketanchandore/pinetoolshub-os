import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Command,
  Sparkles,
  Bell,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface TopBarProps {
  onCommandOpen?: () => void;
}

export function TopBar({ onCommandOpen }: TopBarProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/40 bg-background/80 px-4 backdrop-blur-xl md:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground md:hidden" />
        
        {/* Command Bar Trigger */}
        <motion.button
          onClick={onCommandOpen}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={cn(
            "group flex h-11 w-64 items-center gap-3 rounded-xl border bg-card px-4 transition-all duration-200 md:w-80 lg:w-[420px]",
            isSearchFocused 
              ? "border-pink-300 shadow-lg shadow-pink-500/10 ring-2 ring-pink-500/20" 
              : "border-border/60 hover:border-border hover:shadow-md"
          )}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="flex-1 text-left text-sm text-muted-foreground">
            Ask AI anything...
          </span>
          <div className="flex items-center gap-1 rounded-lg bg-muted/80 px-2 py-1">
            <Command className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">K</span>
          </div>
        </motion.button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-muted">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 ring-2 ring-background"
          />
        </Button>

        {/* User Profile */}
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-md">
            <User className="h-4 w-4 text-white" />
          </div>
        </Button>
      </div>
    </header>
  );
}
