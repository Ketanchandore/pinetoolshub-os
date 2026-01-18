import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Link, Cloud, Sparkles, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FileUploadZoneProps {
  onUpload: (files: FileList | File[]) => void;
  onAddLink: (url: string) => void;
  isUploading: boolean;
  uploadProgress: number;
}

export function FileUploadZone({ onUpload, onAddLink, isUploading, uploadProgress }: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
    }
  }, [onUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
    }
  }, [onUpload]);

  const handleAddLink = useCallback(() => {
    if (linkUrl.trim()) {
      onAddLink(linkUrl.trim());
      setLinkUrl('');
      setShowLinkInput(false);
    }
  }, [linkUrl, onAddLink]);

  return (
    <div className="relative">
      <motion.div
        className={`
          relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300
          ${isDragging 
            ? 'border-primary bg-primary/5 scale-[1.02]' 
            : 'border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        animate={isDragging ? { scale: 1.02 } : { scale: 1 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />
        </div>

        {/* Animated glow when dragging */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"
            />
          )}
        </AnimatePresence>

        <div className="relative p-8 text-center">
          {isUploading ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Cloud className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Uploading files...</p>
                <div className="w-48 mx-auto h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{Math.round(uploadProgress)}% complete</p>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div
                className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4"
                animate={isDragging ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              >
                <Upload className={`w-8 h-8 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
              </motion.div>

              <div className="space-y-2 mb-6">
                <p className="text-lg font-semibold">
                  {isDragging ? 'Drop files here' : 'Drag & drop files'}
                </p>
                <p className="text-sm text-muted-foreground">
                  PDF, Images, CSV, Documents, Videos, or Links
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.csv,.xlsx,.xls,.doc,.docx,.txt,.md,.mp4,.mov,.mp3,.wav,.zip,.rar"
                />
                
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Browse Files
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setShowLinkInput(true)}
                  className="gap-2"
                >
                  <Link className="w-4 h-4" />
                  Add Link
                </Button>
              </div>

              {/* Quick tips */}
              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-primary" />
                  Auto-detects file type
                </span>
                <span>•</span>
                <span>Files are remembered forever</span>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Link Input Modal */}
      <AnimatePresence>
        {showLinkInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={() => setShowLinkInput(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Add a link</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com/article"
                  value={linkUrl}
                  onChange={e => setLinkUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddLink()}
                  autoFocus
                />
                <Button onClick={handleAddLink} disabled={!linkUrl.trim()}>
                  Add
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                We'll extract content, create a summary, and remember it for you.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
