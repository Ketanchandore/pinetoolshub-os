import { motion } from "framer-motion";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandSuggestion, ActionCategory } from "./types";

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

// Category colors
const categoryColors: Record<ActionCategory, { gradient: string; bg: string }> = {
  document: {
    gradient: "from-blue-500 to-blue-600",
    bg: "bg-blue-500/10",
  },
  image: {
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-500/10",
  },
  ai: {
    gradient: "from-purple-500 to-pink-500",
    bg: "bg-purple-500/10",
  },
  automation: {
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/10",
  },
  media: {
    gradient: "from-rose-500 to-pink-500",
    bg: "bg-rose-500/10",
  },
  data: {
    gradient: "from-cyan-500 to-blue-500",
    bg: "bg-cyan-500/10",
  },
  content: {
    gradient: "from-violet-500 to-purple-500",
    bg: "bg-violet-500/10",
  },
};

interface CommandSuggestionsProps {
  suggestions: CommandSuggestion[];
  selectedIndex: number;
  onSelect: (suggestion: CommandSuggestion) => void;
  onHover: (index: number) => void;
}

export function CommandSuggestions({
  suggestions,
  selectedIndex,
  onSelect,
  onHover,
}: CommandSuggestionsProps) {
  if (suggestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-4">
          <Search className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">No matching commands</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Try a different search term</p>
      </div>
    );
  }

  return (
    <div className="py-3 px-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {suggestions[0]?.isFeatured ? "Try these commands" : "Suggestions"}
        </span>
        <span className="text-xs text-muted-foreground">
          {suggestions.length} result{suggestions.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-1">
        {suggestions.map((suggestion, index) => {
          const IconComponent = iconMap[suggestion.icon] || Sparkles;
          const colors = categoryColors[suggestion.category];
          const isSelected = index === selectedIndex;

          return (
            <motion.button
              key={suggestion.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => onSelect(suggestion)}
              onMouseEnter={() => onHover(index)}
              className={cn(
                "group flex w-full items-center gap-4 rounded-xl p-3 text-left transition-all duration-200",
                isSelected
                  ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                  : "hover:bg-muted/50"
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl transition-all",
                  isSelected
                    ? `bg-gradient-to-br ${colors.gradient} shadow-lg`
                    : colors.bg
                )}
              >
                <IconComponent
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isSelected ? "text-white" : "text-foreground/70"
                  )}
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium truncate transition-colors",
                    isSelected ? "text-foreground" : "text-foreground/80"
                  )}
                >
                  {suggestion.text}
                </p>
                {suggestion.isFeatured && (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Sparkles className="h-3 w-3 text-purple-500" />
                    <span className="text-xs text-purple-500">AI-powered workflow</span>
                  </div>
                )}
              </div>

              {/* Category badge */}
              <span
                className={cn(
                  "hidden sm:inline-flex text-xs font-medium px-2.5 py-1 rounded-lg transition-colors capitalize",
                  isSelected
                    ? "bg-white/20 text-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {suggestion.category}
              </span>

              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  layoutId="selection-indicator"
                  className="hidden sm:flex items-center gap-1 rounded-lg bg-purple-500/20 px-2 py-1"
                >
                  <kbd className="text-xs font-medium text-purple-600">↵</kbd>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
