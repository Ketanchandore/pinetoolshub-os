import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  Sparkles,
  Bell,
  User,
  Menu,
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
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 px-4 backdrop-blur-xl md:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground md:hidden" />
        
        {/* Command Bar Trigger */}
        <motion.button
          onClick={onCommandOpen}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={cn(
            "group flex h-10 w-64 items-center gap-3 rounded-xl border border-border/50 bg-muted/30 px-4 transition-all duration-200 md:w-80 lg:w-96",
            isSearchFocused && "border-primary/50 bg-card shadow-soft ring-2 ring-primary/10"
          )}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="flex-1 text-left text-sm text-muted-foreground">
            Ask AI anything...
          </span>
          <div className="flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5">
            <Command className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">K</span>
          </div>
        </motion.button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent"
          />
        </Button>

        {/* User Profile */}
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
        </Button>
      </div>
    </header>
  );
}
