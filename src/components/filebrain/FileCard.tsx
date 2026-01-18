import { motion } from 'framer-motion';
import { 
  FileText, Image, Table, Link, Video, Music, Archive, File,
  MoreVertical, Clock, Zap, Trash2, ExternalLink
} from 'lucide-react';
import { FileItem, fileTypeConfig, formatFileSize, formatTimeAgo } from './types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const iconMap: Record<string, React.ComponentType<any>> = {
  FileText, Image, Table, Link, Video, Music, Archive, File
};

interface FileCardProps {
  file: FileItem;
  isSelected: boolean;
  viewMode: 'grid' | 'list';
  onClick: () => void;
  onDelete: () => void;
}

export function FileCard({ file, isSelected, viewMode, onClick, onDelete }: FileCardProps) {
  const config = fileTypeConfig[file.type];
  const IconComponent = iconMap[config.icon] || File;

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        whileHover={{ x: 4 }}
        onClick={onClick}
        className={`
          group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all
          ${isSelected 
            ? 'bg-primary/10 border border-primary/30' 
            : 'bg-card/50 border border-border/50 hover:bg-card hover:border-border'
          }
        `}
      >
        {/* Icon */}
        <div className={`
          w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} 
          flex items-center justify-center shrink-0
        `}>
          <IconComponent className={`w-6 h-6 ${config.color}`} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{file.name}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
            <span>{formatFileSize(file.size)}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTimeAgo(file.lastUsedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Used {file.usageCount}x
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="hidden lg:flex items-center gap-2">
          {file.tags.slice(0, 2).map(tag => (
            <span 
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="opacity-0 group-hover:opacity-100"
              onClick={e => e.stopPropagation()}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <ExternalLink className="w-4 h-4 mr-2" />
              Open
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={e => { e.stopPropagation(); onDelete(); }}
              className="text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={onClick}
      className={`
        group relative p-4 rounded-2xl cursor-pointer transition-all
        ${isSelected 
          ? 'bg-primary/10 border-2 border-primary/50 shadow-lg shadow-primary/10' 
          : 'bg-card/50 border border-border/50 hover:bg-card hover:border-border hover:shadow-lg'
        }
      `}
    >
      {/* Processing indicator */}
      {file.status === 'processing' && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
          />
        </div>
      )}

      {/* Menu */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 bg-background/80 backdrop-blur-sm"
              onClick={e => e.stopPropagation()}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <ExternalLink className="w-4 h-4 mr-2" />
              Open
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={e => { e.stopPropagation(); onDelete(); }}
              className="text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Icon */}
      <div className={`
        w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${config.gradient} 
        flex items-center justify-center transition-transform group-hover:scale-110
      `}>
        <IconComponent className={`w-8 h-8 ${config.color}`} />
      </div>

      {/* Info */}
      <div className="text-center space-y-1">
        <p className="font-medium text-sm truncate" title={file.name}>
          {file.name}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatFileSize(file.size)}
        </p>
      </div>

      {/* Usage badge */}
      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted/50">
          <Zap className="w-3 h-3 text-primary" />
          {file.usageCount}
        </span>
        <span>{formatTimeAgo(file.lastUsedAt)}</span>
      </div>

      {/* Context hint */}
      {file.context && (
        <p className="mt-2 text-xs text-muted-foreground text-center line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {file.context}
        </p>
      )}
    </motion.div>
  );
}
