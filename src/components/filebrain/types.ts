export type FileType = 'pdf' | 'image' | 'csv' | 'doc' | 'link' | 'video' | 'audio' | 'archive' | 'unknown';

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size: number;
  uploadedAt: Date;
  lastUsedAt: Date;
  usageCount: number;
  thumbnail?: string;
  tags: string[];
  status: 'processing' | 'ready' | 'error';
  context?: string;
}

export interface FileAction {
  id: string;
  label: string;
  icon: string;
  category: 'transform' | 'analyze' | 'extract' | 'share';
  description: string;
}

export interface FileActivity {
  id: string;
  fileId: string;
  action: string;
  timestamp: Date;
  result?: string;
}

export const fileTypeConfig: Record<FileType, {
  icon: string;
  color: string;
  gradient: string;
  actions: FileAction[];
}> = {
  pdf: {
    icon: 'FileText',
    color: 'text-red-500',
    gradient: 'from-red-500/20 to-orange-500/20',
    actions: [
      { id: 'summarize', label: 'Summarize', icon: 'Sparkles', category: 'analyze', description: 'AI-powered summary' },
      { id: 'extract-text', label: 'Extract Text', icon: 'FileOutput', category: 'extract', description: 'Get all text content' },
      { id: 'convert-docx', label: 'Convert to DOCX', icon: 'FileType', category: 'transform', description: 'Transform to Word format' },
      { id: 'compress', label: 'Compress', icon: 'Minimize2', category: 'transform', description: 'Reduce file size' },
    ]
  },
  image: {
    icon: 'Image',
    color: 'text-purple-500',
    gradient: 'from-purple-500/20 to-pink-500/20',
    actions: [
      { id: 'resize', label: 'Resize', icon: 'Maximize2', category: 'transform', description: 'Change dimensions' },
      { id: 'compress', label: 'Compress', icon: 'Minimize2', category: 'transform', description: 'Optimize file size' },
      { id: 'convert', label: 'Convert Format', icon: 'RefreshCw', category: 'transform', description: 'PNG, JPG, WebP' },
      { id: 'remove-bg', label: 'Remove Background', icon: 'Eraser', category: 'transform', description: 'AI background removal' },
      { id: 'generate-alt', label: 'Generate Alt Text', icon: 'MessageSquare', category: 'analyze', description: 'AI accessibility text' },
      { id: 'extract-colors', label: 'Extract Colors', icon: 'Palette', category: 'extract', description: 'Get color palette' },
    ]
  },
  csv: {
    icon: 'Table',
    color: 'text-green-500',
    gradient: 'from-green-500/20 to-emerald-500/20',
    actions: [
      { id: 'analyze', label: 'Analyze Data', icon: 'BarChart3', category: 'analyze', description: 'AI insights' },
      { id: 'convert-excel', label: 'Convert to Excel', icon: 'FileSpreadsheet', category: 'transform', description: 'Export as XLSX' },
      { id: 'visualize', label: 'Create Charts', icon: 'PieChart', category: 'analyze', description: 'Generate visualizations' },
      { id: 'clean', label: 'Clean Data', icon: 'Sparkles', category: 'transform', description: 'Remove duplicates, fix errors' },
    ]
  },
  doc: {
    icon: 'FileText',
    color: 'text-blue-500',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    actions: [
      { id: 'summarize', label: 'Summarize', icon: 'Sparkles', category: 'analyze', description: 'AI-powered summary' },
      { id: 'convert-pdf', label: 'Convert to PDF', icon: 'FileText', category: 'transform', description: 'Export as PDF' },
      { id: 'repurpose', label: 'Repurpose Content', icon: 'Repeat', category: 'transform', description: 'Blog → Thread, Newsletter' },
      { id: 'translate', label: 'Translate', icon: 'Languages', category: 'transform', description: 'Multi-language support' },
    ]
  },
  link: {
    icon: 'Link',
    color: 'text-indigo-500',
    gradient: 'from-indigo-500/20 to-violet-500/20',
    actions: [
      { id: 'scrape', label: 'Extract Content', icon: 'Download', category: 'extract', description: 'Get page content' },
      { id: 'screenshot', label: 'Screenshot', icon: 'Camera', category: 'extract', description: 'Capture full page' },
      { id: 'summarize', label: 'Summarize', icon: 'Sparkles', category: 'analyze', description: 'AI summary of page' },
      { id: 'archive', label: 'Archive', icon: 'Archive', category: 'transform', description: 'Save permanently' },
    ]
  },
  video: {
    icon: 'Video',
    color: 'text-rose-500',
    gradient: 'from-rose-500/20 to-red-500/20',
    actions: [
      { id: 'compress', label: 'Compress', icon: 'Minimize2', category: 'transform', description: 'Reduce file size' },
      { id: 'extract-audio', label: 'Extract Audio', icon: 'Music', category: 'extract', description: 'Get audio track' },
      { id: 'transcribe', label: 'Transcribe', icon: 'FileText', category: 'extract', description: 'Speech to text' },
      { id: 'clip', label: 'Create Clips', icon: 'Scissors', category: 'transform', description: 'Cut short segments' },
    ]
  },
  audio: {
    icon: 'Music',
    color: 'text-amber-500',
    gradient: 'from-amber-500/20 to-yellow-500/20',
    actions: [
      { id: 'transcribe', label: 'Transcribe', icon: 'FileText', category: 'extract', description: 'Speech to text' },
      { id: 'convert', label: 'Convert Format', icon: 'RefreshCw', category: 'transform', description: 'MP3, WAV, AAC' },
      { id: 'compress', label: 'Compress', icon: 'Minimize2', category: 'transform', description: 'Reduce file size' },
    ]
  },
  archive: {
    icon: 'Archive',
    color: 'text-slate-500',
    gradient: 'from-slate-500/20 to-gray-500/20',
    actions: [
      { id: 'extract', label: 'Extract Files', icon: 'FolderOpen', category: 'extract', description: 'Unzip contents' },
      { id: 'list', label: 'List Contents', icon: 'List', category: 'analyze', description: 'View file structure' },
    ]
  },
  unknown: {
    icon: 'File',
    color: 'text-gray-500',
    gradient: 'from-gray-500/20 to-slate-500/20',
    actions: [
      { id: 'analyze', label: 'Analyze', icon: 'Search', category: 'analyze', description: 'Detect file type' },
    ]
  }
};

export const detectFileType = (file: File | string): FileType => {
  const name = typeof file === 'string' ? file : file.name;
  const extension = name.split('.').pop()?.toLowerCase() || '';
  
  const typeMap: Record<string, FileType> = {
    pdf: 'pdf',
    jpg: 'image', jpeg: 'image', png: 'image', gif: 'image', webp: 'image', svg: 'image',
    csv: 'csv', xlsx: 'csv', xls: 'csv',
    doc: 'doc', docx: 'doc', txt: 'doc', md: 'doc', rtf: 'doc',
    mp4: 'video', mov: 'video', avi: 'video', webm: 'video',
    mp3: 'audio', wav: 'audio', aac: 'audio', flac: 'audio',
    zip: 'archive', rar: 'archive', '7z': 'archive', tar: 'archive',
  };
  
  if (typeof file === 'string' && (file.startsWith('http://') || file.startsWith('https://'))) {
    return 'link';
  }
  
  return typeMap[extension] || 'unknown';
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const formatTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
};
