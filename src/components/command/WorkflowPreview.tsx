import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  FileText,
  Image,
  Wand2,
  Zap,
  Table,
  Video,
  Music,
  Search,
  MessageSquare,
  Repeat,
  Layers,
  Archive,
  RefreshCw,
  Maximize2,
  Minimize2,
  Languages,
  BarChart3,
  FilePlus,
  FileSearch,
  Check,
  Loader2,
  ArrowRight,
  Play,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WorkflowStep, DetectedIntent } from "./types";
import { Button } from "@/components/ui/button";

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  FileText,
  Image,
  Wand2,
  Zap,
  Table,
  Video,
  Music,
  Search,
  MessageSquare,
  Repeat,
  Layers,
  Archive,
  RefreshCw,
  Maximize2,
  Minimize2,
  Languages,
  BarChart3,
  FilePlus,
  FileSearch,
};

interface WorkflowPreviewProps {
  intent: DetectedIntent;
  steps: WorkflowStep[];
  isProcessing: boolean;
  onExecute: () => void;
  onClose: () => void;
}

export function WorkflowPreview({
  intent,
  steps,
  isProcessing,
  onExecute,
  onClose,
}: WorkflowPreviewProps) {
  const displaySteps = steps.length > 0 ? steps : intent.suggestedWorkflow;
  const allCompleted = displaySteps.every((s) => s.status === "completed");
  const totalTime = displaySteps.reduce((acc, step) => {
    const time = parseInt(step.tool.estimatedTime?.replace(/[^0-9]/g, "") || "5");
    return acc + time;
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="border-t border-border/50 bg-gradient-to-b from-muted/30 to-muted/10"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/30">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Workflow Preview</h3>
            <p className="text-xs text-muted-foreground">{intent.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>~{totalTime}s estimated</span>
          </div>
          {!isProcessing && !allCompleted && (
            <Button
              onClick={onExecute}
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25"
            >
              <Play className="h-4 w-4 mr-1.5" />
              Execute
            </Button>
          )}
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="px-6 py-5">
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-violet-500/50" />

          <div className="space-y-4">
            {displaySteps.map((step, index) => {
              const IconComponent = iconMap[step.tool.icon] || Zap;
              const isActive = step.status === "processing";
              const isCompleted = step.status === "completed";
              const isPending = step.status === "pending";

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start gap-4"
                >
                  {/* Step indicator */}
                  <motion.div
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.8, repeat: isActive ? Infinity : 0 }}
                    className={cn(
                      "relative z-10 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300",
                      isCompleted
                        ? "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30"
                        : isActive
                        ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30"
                        : "bg-muted border-2 border-border/50"
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {isCompleted ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Check className="h-6 w-6 text-white" />
                        </motion.div>
                      ) : isActive ? (
                        <motion.div
                          key="loader"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, rotate: 360 }}
                          transition={{ rotate: { duration: 1, repeat: Infinity, ease: "linear" } }}
                        >
                          <Loader2 className="h-6 w-6 text-white" />
                        </motion.div>
                      ) : (
                        <motion.div key="icon" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <IconComponent className="h-5 w-5 text-muted-foreground" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Pulse effect for active step */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="absolute inset-0 rounded-xl bg-purple-500"
                      />
                    )}
                  </motion.div>

                  {/* Step content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-2">
                      <h4
                        className={cn(
                          "font-semibold transition-colors",
                          isCompleted
                            ? "text-emerald-600"
                            : isActive
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {step.tool.name}
                      </h4>
                      {step.tool.estimatedTime && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                          {step.tool.estimatedTime}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {step.tool.description}
                    </p>

                    {/* Status message */}
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-purple-500 mt-2 flex items-center gap-1.5"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
                        Processing...
                      </motion.p>
                    )}
                    {isCompleted && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-emerald-600 mt-2"
                      >
                        ✓ Completed successfully
                      </motion.p>
                    )}
                  </div>

                  {/* Arrow to next step */}
                  {index < displaySteps.length - 1 && (
                    <div className="absolute left-[22px] top-14 text-muted-foreground/30">
                      <ArrowRight className="h-4 w-4 rotate-90" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Completion message */}
      <AnimatePresence>
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mx-6 mb-5 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500">
                <Check className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-emerald-700">Workflow Complete!</p>
                <p className="text-sm text-emerald-600/80">
                  All {displaySteps.length} steps executed successfully
                </p>
              </div>
              <Button
                onClick={onClose}
                variant="outline"
                size="sm"
                className="border-emerald-500/30 text-emerald-700 hover:bg-emerald-500/10"
              >
                Done
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
