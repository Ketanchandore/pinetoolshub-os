import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Command,
  Search,
  FileText,
  Wand2,
  Zap,
  Image,
  Upload,
  ArrowRight,
  Sparkles,
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
    description: "Transform PDF documents",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Wand2,
    label: "AI Writer",
    description: "Generate content with AI",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Image,
    label: "Edit Image",
    description: "Resize, crop, compress",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Zap,
    label: "Run Workflow",
    description: "Execute saved automation",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
];

const recentItems = [
  { title: "Marketing Report.pdf", type: "PDF", time: "2 hours ago" },
  { title: "Product Images", type: "Folder", time: "Yesterday" },
  { title: "Blog Post Draft", type: "Document", time: "2 days ago" },
];

export function CommandDialog({ open, onOpenChange }: CommandDialogProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

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
      <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.15 }}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 border-b border-border/50 p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <input
              type="text"
              placeholder="What would you like to do?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
              autoFocus
            />
            <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1">
              <span className="text-xs text-muted-foreground">ESC</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4">
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl p-3 text-left transition-all hover:bg-muted",
                    selectedIndex === index && "bg-muted"
                  )}
                >
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", action.bgColor)}>
                    <action.icon className={cn("h-5 w-5", action.color)} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{action.label}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Recent Files */}
          <div className="border-t border-border/50 p-4">
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Recent Files
            </h3>
            <div className="space-y-1">
              {recentItems.map((item, index) => (
                <motion.button
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted"
                >
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.type}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border/50 bg-muted/30 px-4 py-3">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-muted px-1.5 py-0.5">↑↓</kbd> Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-muted px-1.5 py-0.5">↵</kbd> Select
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Powered by AI
            </span>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
