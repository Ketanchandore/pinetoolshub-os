import { motion } from 'framer-motion';
import { 
  FileText, Image, Table, Link, Video, Music, Archive, File,
  Clock, Sparkles, ArrowRight
} from 'lucide-react';
import { FileItem, FileActivity, fileTypeConfig, formatTimeAgo } from './types';

const iconMap: Record<string, React.ComponentType<any>> = {
  FileText, Image, Table, Link, Video, Music, Archive, File
};

interface FileTimelineProps {
  activities: FileActivity[];
  files: FileItem[];
  onFileClick: (file: FileItem) => void;
}

export function FileTimeline({ activities, files, onFileClick }: FileTimelineProps) {
  const getFileById = (id: string) => files.find(f => f.id === id);

  if (activities.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No activity yet</p>
        <p className="text-sm">Upload files to see your timeline</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-4">
        {activities.slice(0, 10).map((activity, index) => {
          const file = getFileById(activity.fileId);
          if (!file) return null;

          const config = fileTypeConfig[file.type];
          const IconComponent = iconMap[config.icon] || File;

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative flex items-start gap-4 pl-4"
            >
              {/* Timeline dot */}
              <div className={`
                relative z-10 w-5 h-5 rounded-full bg-gradient-to-br ${config.gradient} 
                flex items-center justify-center ring-4 ring-background
              `}>
                <div className="w-2 h-2 rounded-full bg-background" />
              </div>

              {/* Content */}
              <motion.div
                whileHover={{ x: 4 }}
                onClick={() => onFileClick(file)}
                className="flex-1 p-3 rounded-xl bg-card/50 border border-border/50 hover:border-border cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className={`
                    w-10 h-10 rounded-lg bg-gradient-to-br ${config.gradient} 
                    flex items-center justify-center shrink-0
                  `}>
                    <IconComponent className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span className="text-sm font-medium">{activity.action}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
