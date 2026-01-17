import { motion } from "framer-motion";
import {
  FileText,
  Image,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    title: "PDF Merged",
    description: "3 documents combined into report.pdf",
    icon: FileText,
    time: "2 min ago",
    status: "completed",
  },
  {
    id: 2,
    title: "Images Compressed",
    description: "12 images optimized, saved 4.2MB",
    icon: Image,
    time: "15 min ago",
    status: "completed",
  },
  {
    id: 3,
    title: "Automation Running",
    description: "Daily backup workflow in progress",
    icon: Clock,
    time: "1 hour ago",
    status: "running",
  },
  {
    id: 4,
    title: "Content Generated",
    description: "Blog post draft created with AI",
    icon: FileText,
    time: "3 hours ago",
    status: "completed",
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Recent Activity
        </h2>
        <button className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
          View all
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="rounded-xl border border-border/50 bg-card">
        <div className="divide-y divide-border/50">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/30"
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  activity.status === "running"
                    ? "bg-amber-500/10 text-amber-500"
                    : "bg-primary/10 text-primary"
                )}
              >
                <activity.icon className="h-5 w-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">
                    {activity.title}
                  </h3>
                  {activity.status === "completed" && (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )}
                  {activity.status === "running" && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Clock className="h-4 w-4 text-amber-500" />
                    </motion.div>
                  )}
                </div>
                <p className="truncate text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>

              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
