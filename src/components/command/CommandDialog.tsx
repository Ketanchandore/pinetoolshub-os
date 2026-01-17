import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Wand2,
  Zap,
  Image,
  ArrowRight,
  Sparkles,
  Search,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface CommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const quickActions = [
  {
    icon: FileText,
    label: "Convert PDF",
    description: "Transform documents",
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-500/10 to-blue-600/5",
  },
  {
    icon: Wand2,
    label: "AI Writer",
    description: "Generate content",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/5",
  },
  {
    icon: Image,
    label: "Edit Image",
    description: "Resize & compress",
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-500/10 to-orange-500/5",
  },
  {
    icon: Zap,
    label: "Automation",
    description: "Run workflow",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/5",
  },
];

const recentItems = [
  { title: "Marketing Report.pdf", type: "PDF", time: "2 hours ago" },
  { title: "Product Images", type: "Folder", time: "Yesterday" },
  { title: "Blog Post Draft", type: "Document", time: "2 days ago" },
];

export function CommandDialog({ open, onOpenChange }: CommandDialogProps) {
  const [query, setQuery] = useState("");

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gap-0 overflow-hidden rounded-2xl border-border/60 p-0 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.15 }}
        >
          {/* Search Input */}
          <div className="flex items-center gap-4 border-b border-border/50 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <input
              type="text"
              placeholder="What would you like to do?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-lg font-medium outline-none placeholder:text-muted-foreground"
              autoFocus
            />
            <div className="flex items-center gap-1 rounded-lg bg-muted px-2.5 py-1.5">
              <span className="text-xs font-medium text-muted-foreground">ESC</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                  className={cn(
                    "group flex items-center gap-4 rounded-xl border border-border/50 p-4 text-left transition-all hover:border-border hover:shadow-md",
                    `bg-gradient-to-br ${action.bgGradient}`
                  )}
                >
                  <div className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
                    action.gradient
                  )}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{action.label}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Recent Files */}
          <div className="border-t border-border/50 p-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Recent Files
            </h3>
            <div className="space-y-1">
              {recentItems.map((item, index) => (
                <motion.button
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="flex w-full items-center gap-4 rounded-xl p-3 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.type}</p>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">{item.time}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border/50 bg-muted/30 px-5 py-4">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded-md bg-muted px-2 py-0.5 font-mono">↑↓</kbd> Navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded-md bg-muted px-2 py-0.5 font-mono">↵</kbd> Select
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-pink-500" />
              <span>Powered by AI</span>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
