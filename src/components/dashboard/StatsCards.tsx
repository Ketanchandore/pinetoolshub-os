import { motion } from "framer-motion";
import { FileText, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Files Processed",
    value: "12,847",
    icon: FileText,
    gradient: "from-purple-500/8 via-purple-400/5 to-pink-500/3",
    iconBg: "bg-gradient-to-br from-purple-400 to-purple-500",
    iconColor: "text-white",
  },
  {
    title: "Time Saved",
    value: "156h",
    icon: Clock,
    gradient: "from-pink-500/8 via-pink-400/5 to-rose-500/3",
    iconBg: "bg-gradient-to-br from-pink-400 to-pink-500",
    iconColor: "text-white",
  },
  {
    title: "Active Users",
    value: "2,543",
    icon: Users,
    gradient: "from-purple-400/8 via-purple-300/5 to-pink-400/3",
    iconBg: "bg-gradient-to-br from-purple-300 to-pink-400",
    iconColor: "text-white",
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
          whileHover={{ y: -3, transition: { duration: 0.25, ease: "easeOut" } }}
          whileTap={{ scale: 0.99 }}
          className={cn(
            "glass-card group relative overflow-hidden p-6 cursor-pointer",
            "bg-gradient-to-br",
            stat.gradient
          )}
        >
          {/* Subtle shimmer on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 animate-shimmer" />
          </div>

          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground/80 mb-1.5">
                {stat.title}
              </p>
              <p className="text-4xl font-bold tracking-tight text-foreground">
                {stat.value}
              </p>
            </div>

            <motion.div
              whileHover={{ rotate: 4, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl shadow-md",
                stat.iconBg
              )}
            >
              <stat.icon className={cn("h-5 w-5", stat.iconColor)} />
            </motion.div>
          </div>

          {/* Soft glow */}
          <div className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-gradient-to-br from-purple-400/5 to-pink-400/3 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      ))}
    </div>
  );
}
