import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Keyboard } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCommandBar } from "./useCommandBar";
import { CommandInput } from "./CommandInput";
import { CommandSuggestions } from "./CommandSuggestions";
import { WorkflowPreview } from "./WorkflowPreview";
import { QuickActions } from "./QuickActions";

interface CommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandDialog({ open, onOpenChange }: CommandDialogProps) {
  const {
    query,
    setQuery,
    isProcessing,
    selectedIndex,
    setSelectedIndex,
    showPreview,
    setShowPreview,
    detectedIntent,
    suggestions,
    executionSteps,
    handleKeyDown,
    executeWorkflow,
    reset,
  } = useCommandBar();

  // Reset on close
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  // Global keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [open, onOpenChange]);

  const handleSuggestionSelect = useCallback(
    (suggestion: { text: string }) => {
      setQuery(suggestion.text);
      setShowPreview(true);
    },
    [setQuery, setShowPreview]
  );

  const handleQuickActionSelect = useCallback(
    (command: string) => {
      setQuery(command);
      setShowPreview(true);
    },
    [setQuery, setShowPreview]
  );

  const handleExecute = useCallback(() => {
    if (detectedIntent) {
      executeWorkflow(detectedIntent.suggestedWorkflow);
    }
  }, [detectedIntent, executeWorkflow]);

  const handleClose = useCallback(() => {
    reset();
    onOpenChange(false);
  }, [reset, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden rounded-2xl border-border/60 p-0 shadow-2xl [&>button]:hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative overflow-hidden"
        >
          {/* Background gradient decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Command Input */}
          <CommandInput
            query={query}
            onQueryChange={setQuery}
            onKeyDown={handleKeyDown}
            isProcessing={isProcessing}
            detectedIntent={detectedIntent}
          />

          {/* Main content area */}
          <div className="relative max-h-[60vh] overflow-y-auto">
            <AnimatePresence mode="wait">
              {showPreview && detectedIntent && detectedIntent.requiredTools.length > 0 ? (
                <WorkflowPreview
                  key="preview"
                  intent={detectedIntent}
                  steps={executionSteps}
                  isProcessing={isProcessing}
                  onExecute={handleExecute}
                  onClose={handleClose}
                />
              ) : query.length > 0 ? (
                <motion.div
                  key="suggestions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CommandSuggestions
                    suggestions={suggestions}
                    selectedIndex={selectedIndex}
                    onSelect={handleSuggestionSelect}
                    onHover={setSelectedIndex}
                  />

                  {/* Tab hint */}
                  {detectedIntent && detectedIntent.requiredTools.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mx-5 mb-4 p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20">
                          <Sparkles className="h-4 w-4 text-purple-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {detectedIntent.requiredTools.length} tool
                            {detectedIntent.requiredTools.length > 1 ? "s" : ""} detected
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Press <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">Tab</kbd> to preview workflow
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="quick-actions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <QuickActions onSelect={handleQuickActionSelect} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="relative flex items-center justify-between border-t border-border/50 bg-muted/30 px-5 py-3">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded-md bg-muted px-2 py-0.5 font-mono">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded-md bg-muted px-2 py-0.5 font-mono">Tab</kbd>
                Preview
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded-md bg-muted px-2 py-0.5 font-mono">↵</kbd>
                Execute
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-purple-500">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="font-medium">AI-Powered</span>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
