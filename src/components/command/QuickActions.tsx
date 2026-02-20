import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FileText, Wand2, Image, Zap, ArrowRight, FileSearch, MessageSquare,
  Repeat, Layers, Minimize2, Scissors, RotateCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

const quickActions = [
  {
    icon: Layers,
    label: "Merge PDF",
    description: "Combine multiple PDFs",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/5",
    command: "Merge PDF files",
    route: "/pdf-tools",
  },
  {
    icon: Minimize2,
    label: "Compress PDF",
    description: "Reduce PDF size",
    gradient: "from-green-500 to-teal-500",
    bgGradient: "from-green-500/10 to-teal-500/5",
    command: "Compress PDF file",
    route: "/pdf-tools",
  },
  {
    icon: Wand2,
    label: "AI Writer",
    description: "Generate any content",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/5",
    command: "Write a professional email about project update",
    route: "/content-studio",
  },
  {
    icon: Image,
    label: "Compress Image",
    description: "Reduce image size",
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-500/10 to-orange-500/5",
    command: "Compress and optimize image file",
    route: "/media-tools",
  },
  {
    icon: Scissors,
    label: "Split PDF",
    description: "Extract page ranges",
    gradient: "from-violet-500 to-purple-500",
    bgGradient: "from-violet-500/10 to-purple-500/5",
    command: "Split PDF by page range",
    route: "/pdf-tools",
  },
  {
    icon: MessageSquare,
    label: "Content AI",
    description: "Captions & posts",
    gradient: "from-rose-500 to-pink-500",
    bgGradient: "from-rose-500/10 to-pink-500/5",
    command: "Generate LinkedIn caption for product launch",
    route: "/content-studio",
  },
  {
    icon: Zap,
    label: "Automations",
    description: "Run workflows",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/5",
    command: "Process all images in folder and create ZIP",
    route: "/automations",
  },
  {
    icon: FileSearch,
    label: "File Brain",
    description: "AI file memory",
    gradient: "from-cyan-500 to-blue-500",
    bgGradient: "from-cyan-500/10 to-blue-500/5",
    command: "Upload and analyze file with AI",
    route: "/file-brain",
  },
];

interface QuickActionsProps {
  onSelect: (command: string) => void;
}

export function QuickActions({ onSelect }: QuickActionsProps) {
  const navigate = useNavigate();

  const handleAction = (action: typeof quickActions[0]) => {
    if (action.route) {
      navigate(action.route);
    } else {
      onSelect(action.command);
    }
  };

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
            onClick={() => handleAction(action)}
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
