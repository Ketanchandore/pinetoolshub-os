import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Image, Table, Link, Video, Music, Archive, File,
  X, Clock, Zap, Tag, History, Sparkles, ArrowRight, Play
} from 'lucide-react';
import { FileItem, FileAction, fileTypeConfig, formatFileSize, formatTimeAgo } from './types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const iconMap: Record<string, React.ComponentType<any>> = {
  FileText, Image, Table, Link, Video, Music, Archive, File,
  Sparkles, Maximize2: File, Minimize2: File, RefreshCw: File, Eraser: File,
  MessageSquare: File, Palette: File, BarChart3: File, FileSpreadsheet: File,
  PieChart: File, FileOutput: File, FileType: File, Repeat: File, Languages: File,
  Download: File, Camera: File, Scissors: File, FolderOpen: File, List: File, Search: File
};

interface FileDetailPanelProps {
  file: FileItem | null;
  onClose: () => void;
  onExecuteAction: (actionId: string) => void;
}

export function FileDetailPanel({ file, onClose, onExecuteAction }: FileDetailPanelProps) {
  if (!file) return null;

  const config = fileTypeConfig[file.type];
  const IconComponent = iconMap[config.icon] || File;

  const groupedActions = config.actions.reduce((acc, action) => {
    if (!acc[action.category]) acc[action.category] = [];
    acc[action.category].push(action);
    return acc;
  }, {} as Record<string, FileAction[]>);

  const categoryLabels: Record<string, string> = {
    transform: '✨ Transform',
    analyze: '🔍 Analyze',
    extract: '📤 Extract',
    share: '🔗 Share'
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="h-full flex flex-col bg-card border-l border-border"
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className={`
              w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} 
              flex items-center justify-center shrink-0
            `}>
              <IconComponent className={`w-6 h-6 ${config.color}`} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold truncate" title={file.name}>
                {file.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(file.size)} • {file.type.toUpperCase()}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-muted/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <Clock className="w-3 h-3" />
                  Last Used
                </div>
                <p className="font-medium text-sm">{formatTimeAgo(file.lastUsedAt)}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <Zap className="w-3 h-3" />
                  Usage Count
                </div>
                <p className="font-medium text-sm">{file.usageCount} times</p>
              </div>
            </div>

            {/* Tags */}
            {file.tags.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Tag className="w-3 h-3" />
                  Tags
                </div>
                <div className="flex flex-wrap gap-2">
                  {file.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Context */}
            {file.context && (
              <div className="p-3 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 text-xs text-primary mb-1">
                  <History className="w-3 h-3" />
                  Context
                </div>
                <p className="text-sm">{file.context}</p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="font-semibold text-sm">Available Actions</span>
              </div>

              {Object.entries(groupedActions).map(([category, actions]) => (
                <div key={category} className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    {categoryLabels[category] || category}
                  </p>
                  <div className="space-y-2">
                    {actions.map(action => {
                      const ActionIcon = iconMap[action.icon] || Sparkles;
                      return (
                        <motion.button
                          key={action.id}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onExecuteAction(action.id)}
                          className="w-full flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors text-left group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                            <ActionIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{action.label}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {action.description}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* Quick Action */}
        <div className="p-4 border-t border-border">
          <Button 
            className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
            onClick={() => onExecuteAction(config.actions[0]?.id)}
          >
            <Play className="w-4 h-4" />
            {config.actions[0]?.label || 'Process'}
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
