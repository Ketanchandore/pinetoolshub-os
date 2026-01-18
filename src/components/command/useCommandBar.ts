import { useState, useCallback, useMemo } from "react";
import { 
  availableTools, 
  ToolAction, 
  DetectedIntent, 
  WorkflowStep,
  CommandSuggestion,
  exampleCommands,
} from "./types";

// Simulate AI intent detection based on keywords
function detectIntentFromQuery(query: string): DetectedIntent | null {
  if (!query || query.length < 3) return null;

  const lowerQuery = query.toLowerCase();
  const matchedTools: ToolAction[] = [];
  const workflowSteps: WorkflowStep[] = [];
  let confidence = 0;
  let actionDescription = "";

  // Find matching tools based on keywords
  availableTools.forEach((tool) => {
    const matchScore = tool.keywords.reduce((score, keyword) => {
      if (lowerQuery.includes(keyword)) {
        return score + 1;
      }
      return score;
    }, 0);

    if (matchScore > 0) {
      matchedTools.push(tool);
    }
  });

  // Calculate confidence based on matches
  if (matchedTools.length > 0) {
    confidence = Math.min(95, 50 + matchedTools.length * 15);
  }

  // Build workflow from matched tools
  matchedTools.forEach((tool, index) => {
    workflowSteps.push({
      id: `step-${index + 1}`,
      order: index + 1,
      tool,
      status: "pending",
    });
  });

  // Generate action description
  if (matchedTools.length === 1) {
    actionDescription = `Execute ${matchedTools[0].name}`;
  } else if (matchedTools.length > 1) {
    actionDescription = `Chain ${matchedTools.length} tools: ${matchedTools.map(t => t.name).join(" → ")}`;
  } else {
    // Fallback suggestions
    if (lowerQuery.includes("help") || lowerQuery.includes("?")) {
      actionDescription = "Show help and available commands";
      confidence = 80;
    } else {
      actionDescription = "Searching for matching tools...";
      confidence = 30;
    }
  }

  return {
    confidence,
    action: matchedTools.length > 0 ? matchedTools[0].id : "search",
    description: actionDescription,
    requiredTools: matchedTools,
    suggestedWorkflow: workflowSteps,
  };
}

// Generate suggestions based on query
function generateSuggestions(query: string): CommandSuggestion[] {
  const lowerQuery = query.toLowerCase();
  const suggestions: CommandSuggestion[] = [];

  // If no query, show featured examples
  if (!query) {
    return exampleCommands.slice(0, 4).map((cmd, index) => ({
      id: `example-${index}`,
      text: cmd,
      icon: "Sparkles",
      category: "ai" as const,
      isFeatured: true,
    }));
  }

  // Match against available tools
  availableTools.forEach((tool) => {
    const matches = tool.keywords.some((kw) => lowerQuery.includes(kw)) ||
                   tool.name.toLowerCase().includes(lowerQuery);
    if (matches) {
      suggestions.push({
        id: tool.id,
        text: `${tool.name}: ${tool.description}`,
        icon: tool.icon,
        category: tool.category,
      });
    }
  });

  // Add example commands that match
  exampleCommands.forEach((cmd, index) => {
    if (cmd.toLowerCase().includes(lowerQuery)) {
      suggestions.push({
        id: `cmd-${index}`,
        text: cmd,
        icon: "Sparkles",
        category: "ai",
        isFeatured: true,
      });
    }
  });

  return suggestions.slice(0, 6);
}

export function useCommandBar() {
  const [query, setQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [executionSteps, setExecutionSteps] = useState<WorkflowStep[]>([]);

  // Detect intent from current query
  const detectedIntent = useMemo(() => {
    return detectIntentFromQuery(query);
  }, [query]);

  // Generate suggestions based on query
  const suggestions = useMemo(() => {
    return generateSuggestions(query);
  }, [query]);

  // Handle query change
  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setSelectedIndex(0);
    setShowPreview(false);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const totalItems = suggestions.length;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, totalItems));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + totalItems) % Math.max(1, totalItems));
        break;
      case "Tab":
        e.preventDefault();
        if (detectedIntent?.requiredTools.length) {
          setShowPreview(true);
        }
        break;
      case "Enter":
        e.preventDefault();
        if (showPreview && detectedIntent) {
          executeWorkflow(detectedIntent.suggestedWorkflow);
        } else if (suggestions[selectedIndex]) {
          setQuery(suggestions[selectedIndex].text);
          setShowPreview(true);
        }
        break;
      case "Escape":
        if (showPreview) {
          e.preventDefault();
          setShowPreview(false);
        }
        break;
    }
  }, [suggestions, selectedIndex, showPreview, detectedIntent]);

  // Execute workflow
  const executeWorkflow = useCallback(async (steps: WorkflowStep[]) => {
    setIsProcessing(true);
    setShowPreview(true);
    setExecutionSteps(steps.map(s => ({ ...s, status: "pending" })));

    // Simulate step-by-step execution
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setExecutionSteps(prev => prev.map((step, idx) => ({
        ...step,
        status: idx < i ? "completed" : idx === i ? "processing" : "pending",
      })));

      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setExecutionSteps(prev => prev.map((step, idx) => ({
        ...step,
        status: idx <= i ? "completed" : "pending",
      })));
    }

    setIsProcessing(false);
  }, []);

  // Reset command bar
  const reset = useCallback(() => {
    setQuery("");
    setIsProcessing(false);
    setSelectedIndex(0);
    setShowPreview(false);
    setExecutionSteps([]);
  }, []);

  return {
    query,
    setQuery: handleQueryChange,
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
  };
}
