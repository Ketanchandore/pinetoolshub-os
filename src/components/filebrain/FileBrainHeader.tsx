import { motion } from 'framer-motion';
import { 
  Search, Grid3X3, List, Filter, Brain, Sparkles, 
  FileText, Image, Table, Link as LinkIcon, Video, Music
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface FileBrainHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterType: string;
  onFilterChange: (type: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  fileCount: number;
}

const filterOptions = [
  { value: 'all', label: 'All Files', icon: Filter },
  { value: 'pdf', label: 'PDFs', icon: FileText },
  { value: 'image', label: 'Images', icon: Image },
  { value: 'csv', label: 'Spreadsheets', icon: Table },
  { value: 'doc', label: 'Documents', icon: FileText },
  { value: 'link', label: 'Links', icon: LinkIcon },
  { value: 'video', label: 'Videos', icon: Video },
  { value: 'audio', label: 'Audio', icon: Music },
];

export function FileBrainHeader({
  searchQuery,
  onSearchChange,
  filterType,
  onFilterChange,
  viewMode,
  onViewModeChange,
  fileCount
}: FileBrainHeaderProps) {
  const currentFilter = filterOptions.find(f => f.value === filterType) || filterOptions[0];

  return (
    <div className="space-y-4">
      {/* Title Section */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
            >
              <Brain className="w-6 h-6 text-primary" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                File Brain
              </h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Your AI-powered file memory
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="px-3 py-1 rounded-full bg-muted/50">
            {fileCount} {fileCount === 1 ? 'file' : 'files'}
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search files by name or tag..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="pl-10 bg-card/50 border-border/50 focus:border-primary/50"
          />
        </div>

        {/* Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <currentFilter.icon className="w-4 h-4" />
              {currentFilter.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {filterOptions.map((option, index) => (
              <div key={option.value}>
                {index === 1 && <DropdownMenuSeparator />}
                <DropdownMenuItem
                  onClick={() => onFilterChange(option.value)}
                  className={filterType === option.value ? 'bg-primary/10' : ''}
                >
                  <option.icon className="w-4 h-4 mr-2" />
                  {option.label}
                </DropdownMenuItem>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* View Toggle */}
        <div className="flex items-center rounded-lg border border-border/50 p-1">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            onClick={() => onViewModeChange('grid')}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            onClick={() => onViewModeChange('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
