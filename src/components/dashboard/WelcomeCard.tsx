import { motion } from "framer-motion";
import { Sparkles, ArrowRight, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WelcomeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-10"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating orbs */}
        <motion.div
          animate={{ 
            y: [-20, 20, -20], 
            x: [-10, 10, -10],
            rotate: [0, 5, 0] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [20, -20, 20], 
            x: [10, -10, 10],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-gradient-to-tr from-cyan-500/15 to-blue-500/10 blur-3xl"
        />
        
        {/* Decorative floating shapes */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[15%] top-[20%] h-20 w-20 rounded-2xl bg-gradient-to-br from-pink-500/30 to-orange-400/20 backdrop-blur-sm"
          style={{ transform: "rotate(12deg)" }}
        />
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute right-[8%] top-[45%] h-16 w-16 rounded-xl bg-gradient-to-br from-amber-400/30 to-yellow-300/20 backdrop-blur-sm"
          style={{ transform: "rotate(-8deg)" }}
        />
        <motion.div
          animate={{ y: [-8, 12, -8], rotate: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-[22%] bottom-[15%] h-14 w-14 rounded-xl bg-gradient-to-br from-emerald-400/30 to-teal-300/20 backdrop-blur-sm"
          style={{ transform: "rotate(20deg)" }}
        />
        <motion.div
          animate={{ y: [12, -8, 12], rotate: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="absolute right-[35%] top-[30%] h-12 w-12 rounded-lg bg-gradient-to-br from-cyan-400/30 to-blue-400/20 backdrop-blur-sm"
          style={{ transform: "rotate(-15deg)" }}
        />
      </div>

      <div className="relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md border border-white/10"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
          <span className="text-sm font-medium text-white/90">AI Productivity OS</span>
        </motion.div>

        {/* Heading with gradient text */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-2 font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl"
        >
          Work Smarter with
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-6 font-display text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl"
        >
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            AI-Powered Tools
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-8 max-w-xl text-lg text-white/70 leading-relaxed"
        >
          Your intelligent workspace that remembers, understands, and automates. 
          Turn scattered tools into seamless workflows.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-wrap gap-4"
        >
          <Button
            size="lg"
            className="h-12 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-6 text-base font-semibold text-white shadow-lg shadow-pink-500/25 transition-all hover:shadow-xl hover:shadow-pink-500/30 hover:scale-[1.02] border-0"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-xl border-white/20 bg-white/5 px-6 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
          >
            Watch Demo
          </Button>
        </motion.div>

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 flex items-center gap-3"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full border-2 border-sidebar-background bg-gradient-to-br from-gray-300 to-gray-400"
              />
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Trusted by <span className="font-semibold text-white/80">2,500+</span> users</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
