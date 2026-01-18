// Command Bar Types - The Brain of PineToolsHub

export type ActionCategory = 
  | "document" 
  | "image" 
  | "ai" 
  | "automation" 
  | "media" 
  | "data" 
  | "content";

export interface ToolAction {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ActionCategory;
  keywords: string[];
  estimatedTime?: string;
}

export interface DetectedIntent {
  confidence: number;
  action: string;
  description: string;
  requiredTools: ToolAction[];
  suggestedWorkflow: WorkflowStep[];
}

export interface WorkflowStep {
  id: string;
  order: number;
  tool: ToolAction;
  status: "pending" | "ready" | "processing" | "completed" | "error";
  input?: string;
  output?: string;
}

export interface CommandSuggestion {
  id: string;
  text: string;
  icon: string;
  category: ActionCategory;
  isRecent?: boolean;
  isFeatured?: boolean;
}

export interface RecentFile {
  id: string;
  name: string;
  type: string;
  lastAccessed: string;
  size?: string;
}

// Example commands for demonstration
export const exampleCommands = [
  "Resize this image, compress it, and generate a LinkedIn caption",
  "Convert this CSV to Excel and summarize the data",
  "Repurpose this blog into a Twitter thread and newsletter draft",
  "Extract text from PDF and translate to Spanish",
  "Create a social media calendar from my content brief",
  "Compress all images in folder and create a ZIP",
  "Generate SEO meta tags from this article",
  "Transcribe this video and create blog post",
];

// Available tools in the system
export const availableTools: ToolAction[] = [
  // Document Tools
  {
    id: "pdf-convert",
    name: "PDF Converter",
    description: "Convert documents to/from PDF",
    icon: "FileText",
    category: "document",
    keywords: ["pdf", "convert", "document", "word", "excel"],
    estimatedTime: "~5s",
  },
  {
    id: "pdf-extract",
    name: "PDF Text Extractor",
    description: "Extract text from PDF files",
    icon: "FileSearch",
    category: "document",
    keywords: ["pdf", "extract", "text", "ocr"],
    estimatedTime: "~3s",
  },
  {
    id: "doc-merge",
    name: "Document Merger",
    description: "Merge multiple documents",
    icon: "FilePlus",
    category: "document",
    keywords: ["merge", "combine", "documents"],
    estimatedTime: "~4s",
  },
  
  // Image Tools
  {
    id: "image-resize",
    name: "Image Resizer",
    description: "Resize images to any dimension",
    icon: "Maximize2",
    category: "image",
    keywords: ["resize", "image", "dimension", "scale"],
    estimatedTime: "~2s",
  },
  {
    id: "image-compress",
    name: "Image Compressor",
    description: "Compress images without quality loss",
    icon: "Minimize2",
    category: "image",
    keywords: ["compress", "image", "optimize", "reduce"],
    estimatedTime: "~3s",
  },
  {
    id: "image-convert",
    name: "Image Converter",
    description: "Convert between image formats",
    icon: "RefreshCw",
    category: "image",
    keywords: ["convert", "image", "format", "png", "jpg", "webp"],
    estimatedTime: "~2s",
  },
  
  // AI Tools
  {
    id: "ai-writer",
    name: "AI Writer",
    description: "Generate content with AI",
    icon: "Wand2",
    category: "ai",
    keywords: ["write", "generate", "content", "ai", "text"],
    estimatedTime: "~10s",
  },
  {
    id: "ai-summarize",
    name: "AI Summarizer",
    description: "Summarize long content",
    icon: "FileText",
    category: "ai",
    keywords: ["summarize", "summary", "brief", "shorten"],
    estimatedTime: "~8s",
  },
  {
    id: "ai-translate",
    name: "AI Translator",
    description: "Translate text to any language",
    icon: "Languages",
    category: "ai",
    keywords: ["translate", "language", "spanish", "french", "german"],
    estimatedTime: "~5s",
  },
  {
    id: "ai-caption",
    name: "Caption Generator",
    description: "Generate social media captions",
    icon: "MessageSquare",
    category: "ai",
    keywords: ["caption", "social", "linkedin", "twitter", "instagram"],
    estimatedTime: "~6s",
  },
  
  // Content Tools
  {
    id: "content-repurpose",
    name: "Content Repurposer",
    description: "Transform content for different platforms",
    icon: "Repeat",
    category: "content",
    keywords: ["repurpose", "transform", "blog", "thread", "newsletter"],
    estimatedTime: "~15s",
  },
  {
    id: "seo-generator",
    name: "SEO Generator",
    description: "Generate SEO meta tags",
    icon: "Search",
    category: "content",
    keywords: ["seo", "meta", "tags", "optimize"],
    estimatedTime: "~4s",
  },
  
  // Data Tools
  {
    id: "csv-convert",
    name: "CSV Converter",
    description: "Convert CSV to Excel and vice versa",
    icon: "Table",
    category: "data",
    keywords: ["csv", "excel", "spreadsheet", "convert"],
    estimatedTime: "~3s",
  },
  {
    id: "data-analyze",
    name: "Data Analyzer",
    description: "Analyze and visualize data",
    icon: "BarChart3",
    category: "data",
    keywords: ["analyze", "data", "chart", "statistics"],
    estimatedTime: "~8s",
  },
  
  // Media Tools
  {
    id: "video-transcribe",
    name: "Video Transcriber",
    description: "Transcribe video to text",
    icon: "Video",
    category: "media",
    keywords: ["video", "transcribe", "audio", "speech"],
    estimatedTime: "~20s",
  },
  {
    id: "audio-convert",
    name: "Audio Converter",
    description: "Convert audio formats",
    icon: "Music",
    category: "media",
    keywords: ["audio", "convert", "mp3", "wav"],
    estimatedTime: "~5s",
  },
  
  // Automation
  {
    id: "batch-process",
    name: "Batch Processor",
    description: "Process multiple files at once",
    icon: "Layers",
    category: "automation",
    keywords: ["batch", "bulk", "multiple", "folder"],
    estimatedTime: "varies",
  },
  {
    id: "zip-create",
    name: "ZIP Creator",
    description: "Create ZIP archives",
    icon: "Archive",
    category: "automation",
    keywords: ["zip", "archive", "compress", "folder"],
    estimatedTime: "~5s",
  },
];
