import { motion } from "framer-motion";
import { FileText, Clock, Zap, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Files Processed",
    value: "1,284",
    change: "+12%",
    trend: "up",
    icon: FileText,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Time Saved",
    value: "48h",
    change: "+8h this week",
    trend: "up",
    icon: Clock,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Workflows Run",
    value: "156",
    change: "+23%",
    trend: "up",
    icon: Zap,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    title: "Productivity",
    value: "94%",
    change: "+5%",
    trend: "up",
    icon: TrendingUp,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.05 }}
          className="rounded-xl border border-border/50 bg-card p-5"
        >
          <div className="flex items-start justify-between">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg",
                stat.bgColor
              )}
            >
              <stat.icon className={cn("h-5 w-5", stat.color)} />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-green-500">
              <TrendingUp className="h-3 w-3" />
              {stat.change}
            </span>
          </div>

          <div className="mt-4">
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
