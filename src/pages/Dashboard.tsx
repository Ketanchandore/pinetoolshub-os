import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { QuickActionsGrid } from "@/components/dashboard/QuickActionsGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { SEOHead, softwareSchema } from "@/components/SEOHead";
import { useAuth } from "@/hooks/useAuth";
import { useFiles } from "@/hooks/useFiles";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, PenTool, Image, ArrowRight, Sparkles, FileText, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { user } = useAuth();
  const { files } = useFiles();
  const navigate = useNavigate();

  const featureCards = [
    {
      title: "PDF Tools",
      description: "Merge, split, compress, convert PDFs",
      icon: FileText,
      href: "/pdf-tools",
      gradient: "from-blue-500 to-cyan-500",
      badge: "8 Tools",
      highlight: true,
    },
    {
      title: "File Brain",
      description: `${files.length} files stored and AI-analyzed`,
      icon: Brain,
      href: "/file-brain",
      gradient: "from-cyan-500 to-blue-500",
      badge: files.length > 0 ? `${files.length} files` : "Upload files",
      highlight: false,
    },
    {
      title: "Content Studio",
      description: "AI-powered writing for any platform",
      icon: PenTool,
      href: "/content-studio",
      gradient: "from-purple-500 to-pink-500",
      badge: "AI Ready",
      highlight: false,
    },
    {
      title: "Automations",
      description: "4 active workflows running",
      icon: Zap,
      href: "/automations",
      gradient: "from-emerald-500 to-teal-500",
      badge: "4 Active",
      highlight: false,
    },
    {
      title: "Media Tools",
      description: "Real compress, resize & convert",
      icon: Image,
      href: "/media-tools",
      gradient: "from-amber-500 to-orange-500",
      badge: "Real Processing",
      highlight: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-full space-y-8 p-6 md:p-8"
    >
      <SEOHead
        title="PineToolsHub — Free AI Productivity OS with PDF & Image Tools"
        description="Free all-in-one AI workspace: PDF merge, split, compress, image optimization, AI content writer, file management. No signup, no ads. 20+ tools in one place."
        canonical="/"
        jsonLd={softwareSchema()}
      />
      {/* Welcome Section */}
      <WelcomeCard />

      {/* Stats Overview */}
      <StatsCards />

      {/* Feature Quick Access */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <h2 className="font-display text-xl font-bold text-foreground">Your Tools</h2>
          <Badge variant="outline" className="ml-auto text-xs border-blue-500/40 text-blue-600">New: PDF Tools</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {featureCards.map((card, index) => (
            <motion.button
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => navigate(card.href)}
              whileHover={{ y: -3 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border bg-card p-5 text-left transition-all hover:shadow-xl",
                card.highlight ? "border-blue-500/40 shadow-blue-500/10 shadow-md" : "border-border/60 hover:border-border"
              )}
            >
              {card.highlight && (
                <div className="absolute top-2 right-2">
                  <Star className="h-3.5 w-3.5 text-blue-500 fill-blue-500" />
                </div>
              )}
              <div className="relative space-y-3">
                <div className="flex items-start justify-between">
                  <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-md", card.gradient)}>
                    <card.icon className="h-5 w-5 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{card.badge}</Badge>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{card.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{card.description}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  Open <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

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

      {/* CTA for unauthenticated */}
      {!user && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 border border-purple-500/20 p-8 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
          <div className="relative">
            <Sparkles className="h-10 w-10 mx-auto text-purple-500 mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Sign in to unlock everything</h3>
            <p className="text-muted-foreground text-sm mb-6">Save files, create automations, and use AI features with a free account.</p>
            <Button onClick={() => navigate("/auth")} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
