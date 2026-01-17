import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Brain, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WelcomeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-pine-400 p-8 text-primary-foreground"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Orb */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">AI Productivity OS</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-2 font-display text-3xl font-bold md:text-4xl"
        >
          Welcome to PineToolsHub
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 max-w-lg text-primary-foreground/80"
        >
          Your intelligent workspace that remembers, understands, and automates. 
          Turn tools into workflows and reclaim your time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          <Button
            size="lg"
            className="bg-accent text-accent-foreground shadow-glow-accent hover:bg-accent/90"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white/10 text-primary-foreground backdrop-blur-sm hover:bg-white/20"
          >
            Watch Demo
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
