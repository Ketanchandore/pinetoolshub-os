import { motion } from "framer-motion";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { QuickActionsGrid } from "@/components/dashboard/QuickActionsGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StatsCards } from "@/components/dashboard/StatsCards";

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-full space-y-8 p-6 md:p-8"
    >
      {/* Welcome Section */}
      <WelcomeCard />

      {/* Stats Overview */}
      <StatsCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Quick Actions - Takes 2 columns */}
        <div className="lg:col-span-2">
          <QuickActionsGrid />
        </div>

        {/* Recent Activity - Takes 1 column */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </motion.div>
  );
}
