import { motion } from "framer-motion";
import { Sparkles, Loader2, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { DetectedIntent } from "./types";

interface CommandInputProps {
  query: string;
  onQueryChange: (query: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  isProcessing: boolean;
  detectedIntent: DetectedIntent | null;
}

export function CommandInput({
  query,
  onQueryChange,
  onKeyDown,
  isProcessing,
  detectedIntent,
}: CommandInputProps) {
  return (
    <div className="relative">
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-blue-500/5 rounded-t-2xl" />
      
      <div className="relative flex items-center gap-4 p-6">
        {/* AI Icon */}
        <motion.div
          animate={isProcessing ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 2, repeat: isProcessing ? Infinity : 0, ease: "linear" }}
          className="relative"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-violet-600 shadow-lg shadow-purple-500/30">
            {isProcessing ? (
              <Loader2 className="h-6 w-6 text-white animate-spin" />
            ) : (
              <Sparkles className="h-6 w-6 text-white" />
            )}
          </div>
          {/* Pulsing ring when processing */}
          {isProcessing && (
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl bg-purple-500"
            />
          )}
        </motion.div>

        {/* Input Field */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Describe what you want to do..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={isProcessing}
            className={cn(
              "w-full bg-transparent text-xl font-medium outline-none",
              "placeholder:text-muted-foreground/60",
              "disabled:cursor-not-allowed disabled:opacity-60"
            )}
            autoFocus
          />
          
          {/* Intent confidence indicator */}
          {detectedIntent && detectedIntent.confidence > 0 && !isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 flex items-center gap-2"
            >
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${detectedIntent.confidence}%` }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "h-full rounded-full",
                    detectedIntent.confidence > 70
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                      : detectedIntent.confidence > 40
                      ? "bg-gradient-to-r from-amber-500 to-orange-500"
                      : "bg-gradient-to-r from-gray-400 to-gray-500"
                  )}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {detectedIntent.confidence}% confident
              </span>
            </motion.div>
          )}
        </div>

        {/* Keyboard shortcuts */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-muted/80 px-3 py-2">
            <Command className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">K</span>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-muted/80 px-3 py-2">
            <span className="text-xs font-medium text-muted-foreground">ESC</span>
          </div>
        </div>
      </div>

      {/* Bottom border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
