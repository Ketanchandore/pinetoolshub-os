import { motion } from "framer-motion";
import {
  FileText,
  Image,
  Wand2,
  Zap,
  Brain,
  Upload,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const quickActions = [
  {
    icon: FileText,
    title: "PDF Tools",
    description: "Convert, merge & compress",
    gradient: "from-purple-400 to-purple-500",
    bgGradient: "from-purple-400/6 to-purple-500/3",
  },
  {
    icon: Image,
    title: "Image Tools",
    description: "Resize & optimize images",
    gradient: "from-pink-400 to-pink-500",
    bgGradient: "from-pink-400/6 to-pink-500/3",
  },
  {
    icon: Wand2,
    title: "AI Writer",
    description: "Generate with AI magic",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/6 to-pink-500/3",
  },
  {
    icon: Zap,
    title: "Automations",
    description: "Build smart workflows",
    gradient: "from-purple-300 to-purple-400",
    bgGradient: "from-purple-300/6 to-purple-400/3",
  },
  {
    icon: Brain,
    title: "File Brain",
    description: "AI-powered organization",
    gradient: "from-pink-300 to-purple-400",
    bgGradient: "from-pink-300/6 to-purple-400/3",
  },
  {
    icon: Upload,
    title: "Quick Upload",
    description: "Drag & drop any file",
    gradient: "from-purple-400 to-pink-300",
    bgGradient: "from-purple-400/6 to-pink-300/3",
  },
];

export function QuickActionsGrid() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-400 to-pink-400">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Quick Actions
          </h2>
        </div>
        <button className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground group">
          View all
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
            whileHover={{ y: -3, transition: { duration: 0.25, ease: "easeOut" } }}
            whileTap={{ scale: 0.98 }}
            className="glass-card group relative overflow-hidden p-5 text-left"
          >
            {/* Gradient background on hover */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-400 group-hover:opacity-100",
                action.bgGradient
              )}
            />

            <div className="relative">
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 4, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={cn(
                  "mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-md",
                  action.gradient
                )}
              >
                <action.icon className="h-5 w-5 text-white" />
              </motion.div>

              <h3 className="mb-1 text-base font-semibold text-foreground">
                {action.title}
              </h3>
              <p className="text-sm text-muted-foreground/80">
                {action.description}
              </p>

              {/* Arrow on hover */}
              <div className="absolute bottom-0 right-0 translate-x-2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br", action.gradient)}>
                  <ArrowRight className="h-3.5 w-3.5 text-white" />
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
