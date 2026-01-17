import { motion } from "framer-motion";
import {
  FileText,
  Image,
  Wand2,
  Zap,
  Brain,
  Upload,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const quickActions = [
  {
    icon: FileText,
    title: "PDF Tools",
    description: "Convert, merge, compress PDFs",
    color: "from-blue-500/10 to-blue-600/10",
    iconColor: "text-blue-500",
    borderColor: "group-hover:border-blue-500/30",
  },
  {
    icon: Image,
    title: "Image Tools",
    description: "Resize, compress, convert images",
    color: "from-amber-500/10 to-orange-500/10",
    iconColor: "text-amber-500",
    borderColor: "group-hover:border-amber-500/30",
  },
  {
    icon: Wand2,
    title: "AI Writer",
    description: "Generate content with AI",
    color: "from-purple-500/10 to-pink-500/10",
    iconColor: "text-purple-500",
    borderColor: "group-hover:border-purple-500/30",
  },
  {
    icon: Zap,
    title: "Automations",
    description: "Create custom workflows",
    color: "from-green-500/10 to-emerald-500/10",
    iconColor: "text-green-500",
    borderColor: "group-hover:border-green-500/30",
  },
  {
    icon: Brain,
    title: "File Brain",
    description: "Smart file organization",
    color: "from-cyan-500/10 to-blue-500/10",
    iconColor: "text-cyan-500",
    borderColor: "group-hover:border-cyan-500/30",
  },
  {
    icon: Upload,
    title: "Quick Upload",
    description: "Drag & drop any file",
    color: "from-slate-500/10 to-gray-500/10",
    iconColor: "text-slate-500",
    borderColor: "group-hover:border-slate-500/30",
  },
];

export function QuickActionsGrid() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Quick Actions
        </h2>
        <button className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
          View all
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            whileHover={{ y: -2 }}
            className={cn(
              "group relative overflow-hidden rounded-xl border border-border/50 bg-card p-5 text-left transition-all duration-300",
              action.borderColor
            )}
          >
            {/* Gradient Background */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                action.color
              )}
            />

            <div className="relative">
              <div
                className={cn(
                  "mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted transition-transform duration-300 group-hover:scale-110",
                  action.iconColor
                )}
              >
                <action.icon className="h-6 w-6" />
              </div>

              <h3 className="mb-1 font-semibold text-foreground">
                {action.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>

              <ArrowRight className="absolute bottom-0 right-0 h-5 w-5 translate-x-2 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
