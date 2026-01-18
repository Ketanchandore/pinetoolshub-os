import { motion } from "framer-motion";
import {
  FileText,
  Wand2,
  Image,
  Zap,
  ArrowRight,
  FileSearch,
  MessageSquare,
  Repeat,
  Table,
} from "lucide-react";
import { cn } from "@/lib/utils";

const quickActions = [
  {
    icon: FileText,
    label: "PDF Tools",
    description: "Convert, merge, extract",
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-500/10 to-blue-600/5",
    command: "Convert PDF to Word document",
  },
  {
    icon: Wand2,
    label: "AI Writer",
    description: "Generate any content",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/5",
    command: "Write a professional email about project update",
  },
  {
    icon: Image,
    label: "Image Tools",
    description: "Resize, compress, convert",
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-500/10 to-orange-500/5",
    command: "Resize image to 1920x1080 and compress",
  },
  {
    icon: Zap,
    label: "Automations",
    description: "Run workflows",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/5",
    command: "Process all images in folder and create ZIP",
  },
  {
    icon: MessageSquare,
    label: "Content AI",
    description: "Captions & posts",
    gradient: "from-rose-500 to-pink-500",
    bgGradient: "from-rose-500/10 to-pink-500/5",
    command: "Generate LinkedIn caption for product launch",
  },
  {
    icon: Repeat,
    label: "Repurpose",
    description: "Transform content",
    gradient: "from-violet-500 to-purple-500",
    bgGradient: "from-violet-500/10 to-purple-500/5",
    command: "Repurpose this blog into a Twitter thread",
  },
  {
    icon: Table,
    label: "Data Tools",
    description: "CSV, Excel, analyze",
    gradient: "from-cyan-500 to-blue-500",
    bgGradient: "from-cyan-500/10 to-blue-500/5",
    command: "Convert CSV to Excel and summarize the data",
  },
  {
    icon: FileSearch,
    label: "Extract",
    description: "OCR & text extraction",
    gradient: "from-indigo-500 to-blue-500",
    bgGradient: "from-indigo-500/10 to-blue-500/5",
    command: "Extract text from PDF and translate to Spanish",
  },
];

interface QuickActionsProps {
  onSelect: (command: string) => void;
}

export function QuickActions({ onSelect }: QuickActionsProps) {
  return (
    <div className="p-5">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
        <Zap className="h-3.5 w-3.5" />
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(action.command)}
            className={cn(
              "group relative flex flex-col items-start gap-3 rounded-xl border border-border/50 p-4 text-left transition-all duration-200",
              "hover:border-border hover:shadow-lg",
              `bg-gradient-to-br ${action.bgGradient}`
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg transition-transform group-hover:scale-110",
                action.gradient
              )}
            >
              <action.icon className="h-5 w-5 text-white" />
            </div>

            {/* Content */}
            <div>
              <p className="font-semibold text-foreground text-sm">{action.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
            </div>

            {/* Hover arrow */}
            <ArrowRight className="absolute right-3 top-3 h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
