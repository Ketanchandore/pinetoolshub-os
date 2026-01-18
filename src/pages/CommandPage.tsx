import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  FileText,
  Image,
  Wand2,
  ArrowRight,
  Command,
  Keyboard,
  Play,
  Clock,
  TrendingUp,
  Star,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const featuredWorkflows = [
  {
    title: "Content Repurposing",
    description: "Transform blog posts into social media threads, newsletters, and more",
    steps: ["Extract content", "AI Analysis", "Generate formats", "Schedule posts"],
    icon: Wand2,
    gradient: "from-purple-500 to-pink-500",
    users: "2.4k",
  },
  {
    title: "Image Optimization",
    description: "Resize, compress, and convert images in bulk with one command",
    steps: ["Select images", "Resize", "Compress", "Export"],
    icon: Image,
    gradient: "from-amber-500 to-orange-500",
    users: "1.8k",
  },
  {
    title: "Document Workflow",
    description: "Extract, translate, and summarize documents automatically",
    steps: ["OCR Extract", "Translate", "Summarize", "Export"],
    icon: FileText,
    gradient: "from-blue-500 to-cyan-500",
    users: "3.1k",
  },
];

const popularCommands = [
  { command: "Resize all images to 1080p and compress", category: "Image" },
  { command: "Extract text from PDF and summarize", category: "Document" },
  { command: "Generate social media captions for my product", category: "AI" },
  { command: "Convert CSV to Excel with charts", category: "Data" },
  { command: "Repurpose this blog into Twitter thread", category: "Content" },
  { command: "Transcribe video and create blog post", category: "Media" },
];

export default function CommandPage() {
  return (
    <MainLayout>
      <div className="min-h-full bg-gradient-to-b from-background via-muted/20 to-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 pt-12 pb-16">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 px-4 py-2 mb-6"
            >
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-600">The Brain of PineToolsHub</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="text-foreground">AI Command Bar</span>
              <br />
              <span className="text-gradient-purple">Your Words, Our Actions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              Describe what you want in plain English. Our AI understands your intent,
              chains the right tools, and executes complex workflows automatically.
            </motion.p>

            {/* Command Bar Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition-opacity" />
                <div className="relative flex items-center gap-4 bg-card border border-border/60 rounded-2xl p-6 shadow-xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30">
                    <Sparkles className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-lg font-medium text-muted-foreground">
                      "Resize this image, compress it, and generate a LinkedIn caption"
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="hidden md:flex items-center gap-1 rounded-lg bg-muted px-3 py-2">
                      <Command className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">K</span>
                    </kbd>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
                <Keyboard className="h-4 w-4" />
                Press <kbd className="px-2 py-0.5 rounded bg-muted font-mono text-xs">⌘K</kbd> anywhere to open
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Workflows */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <Star className="h-6 w-6 text-amber-500" />
                  Featured Workflows
                </h2>
                <p className="text-muted-foreground mt-1">
                  Popular multi-step workflows used by our community
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredWorkflows.map((workflow, index) => (
                <motion.div
                  key={workflow.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="group relative bg-card border border-border/60 rounded-2xl p-6 transition-all hover:shadow-xl hover:border-border"
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg mb-4",
                      workflow.gradient
                    )}
                  >
                    <workflow.icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {workflow.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {workflow.description}
                  </p>

                  {/* Steps */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {workflow.steps.map((step, i) => (
                      <span
                        key={step}
                        className="inline-flex items-center gap-1 text-xs bg-muted rounded-full px-2.5 py-1"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {step}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {workflow.users} users
                    </span>
                    <Button size="sm" variant="ghost" className="gap-1.5 group-hover:text-primary">
                      Try it
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Commands */}
        <section className="px-6 py-12 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Zap className="h-6 w-6 text-emerald-500" />
              Popular Commands
            </h2>

            <div className="grid gap-3">
              {popularCommands.map((item, index) => (
                <motion.button
                  key={item.command}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  whileHover={{ x: 5 }}
                  className="group flex items-center gap-4 bg-card border border-border/50 rounded-xl p-4 text-left transition-all hover:border-border hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                    <Play className="h-4 w-4 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.command}</p>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-lg">
                    {item.category}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl" />
              <div className="relative bg-card border border-border/60 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Ready to 10x Your Productivity?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  Stop switching between tools. Let AI handle the complexity while you focus on what matters.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25 gap-2"
                >
                  <Command className="h-5 w-5" />
                  Open Command Bar
                  <kbd className="ml-2 rounded bg-white/20 px-2 py-0.5 text-xs">⌘K</kbd>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
