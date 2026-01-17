import { motion } from "framer-motion";
import { FileText, Clock, Zap, TrendingUp, Sparkles, Users, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Files Processed",
    value: "12,847",
    icon: FileText,
    gradient: "from-purple-500/20 via-purple-400/10 to-pink-500/5",
    iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
    iconColor: "text-white",
    border: "border-purple-200/50",
  },
  {
    title: "Time Saved",
    value: "156h",
    icon: Clock,
    gradient: "from-pink-500/20 via-pink-400/10 to-rose-500/5",
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-500",
    iconColor: "text-white",
    border: "border-pink-200/50",
  },
  {
    title: "Active Users",
    value: "2,543",
    icon: Users,
    gradient: "from-cyan-500/20 via-cyan-400/10 to-blue-500/5",
    iconBg: "bg-gradient-to-br from-cyan-500 to-blue-500",
    iconColor: "text-white",
    border: "border-cyan-200/50",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={cn(
            "group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 transition-all duration-300",
            stat.gradient,
            stat.border
          )}
        >
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 animate-shimmer" />
          </div>

          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {stat.title}
              </p>
              <p className="text-4xl font-bold tracking-tight text-foreground">
                {stat.value}
              </p>
            </div>

            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl shadow-lg",
                stat.iconBg
              )}
            >
              <stat.icon className={cn("h-6 w-6", stat.iconColor)} />
            </motion.div>
          </div>

          {/* Decorative element */}
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-white/5 to-white/0 blur-2xl" />
        </motion.div>
      ))}
    </div>
  );
}
