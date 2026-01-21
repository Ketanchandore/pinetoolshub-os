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
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-500/10 to-blue-600/5",
    hoverBorder: "hover:border-blue-300",
    shadowColor: "group-hover:shadow-blue-500/20",
  },
  {
    icon: Image,
    title: "Image Tools",
    description: "Resize & optimize images",
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-500/10 to-orange-500/5",
    hoverBorder: "hover:border-amber-300",
    shadowColor: "group-hover:shadow-amber-500/20",
  },
  {
    icon: Wand2,
    title: "AI Writer",
    description: "Generate with AI magic",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/5",
    hoverBorder: "hover:border-purple-300",
    shadowColor: "group-hover:shadow-purple-500/20",
  },
  {
    icon: Zap,
    title: "Automations",
    description: "Build smart workflows",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/5",
    hoverBorder: "hover:border-emerald-300",
    shadowColor: "group-hover:shadow-emerald-500/20",
  },
  {
    icon: Brain,
    title: "File Brain",
    description: "AI-powered organization",
    gradient: "from-cyan-500 to-blue-500",
    bgGradient: "from-cyan-500/10 to-blue-500/5",
    hoverBorder: "hover:border-cyan-300",
    shadowColor: "group-hover:shadow-cyan-500/20",
  },
  {
    icon: Upload,
    title: "Quick Upload",
    description: "Drag & drop any file",
    gradient: "from-slate-500 to-slate-600",
    bgGradient: "from-slate-500/10 to-slate-600/5",
    hoverBorder: "hover:border-slate-300",
    shadowColor: "group-hover:shadow-slate-500/20",
  },
];

export function QuickActionsGrid() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Quick Actions
          </h2>
        </div>
        <button className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group">
          View all
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
            whileHover={{ y: -4 }}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 text-left transition-all duration-300",
              action.hoverBorder,
              action.shadowColor,
              "hover:shadow-xl"
            )}
          >
            {/* Gradient background on hover */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                action.bgGradient
              )}
            />

            <div className="relative">
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className={cn(
                  "mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
                  action.gradient
                )}
              >
                <action.icon className="h-6 w-6 text-white" />
              </motion.div>

              <h3 className="mb-1 text-base font-semibold text-foreground">
                {action.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>

              {/* Arrow on hover */}
              <div className="absolute bottom-0 right-0 translate-x-2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br", action.gradient)}>
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
