import { motion } from "framer-motion";
import {
  FileText,
  Image,
  CheckCircle2,
  Clock,
  ArrowRight,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    title: "PDF Merged",
    description: "3 documents combined",
    icon: FileText,
    time: "2 min ago",
    status: "completed",
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "Images Compressed",
    description: "12 images optimized",
    icon: Image,
    time: "15 min ago",
    status: "completed",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
  },
  {
    id: 3,
    title: "Automation Running",
    description: "Daily backup in progress",
    icon: Clock,
    time: "1 hour ago",
    status: "running",
    iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    id: 4,
    title: "AI Content Generated",
    description: "Blog post created",
    icon: FileText,
    time: "3 hours ago",
    status: "completed",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500",
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-rose-500">
            <Activity className="h-4 w-4 text-white" />
          </div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Recent Activity
          </h2>
        </div>
        <button className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group">
          View all
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
        <div className="divide-y divide-border/50">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
              className="group flex items-center gap-4 p-4 transition-colors hover:bg-muted/30"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl shadow-md",
                  activity.iconBg
                )}
              >
                <activity.icon className="h-5 w-5 text-white" />
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">
                    {activity.title}
                  </h3>
                  {activity.status === "completed" && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  )}
                  {activity.status === "running" && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 rounded-full border-2 border-purple-500 border-t-transparent"
                    />
                  )}
                </div>
                <p className="truncate text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>

              <span className="text-xs font-medium text-muted-foreground whitespace-nowrap px-2 py-1 rounded-full bg-muted">
                {activity.time}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
