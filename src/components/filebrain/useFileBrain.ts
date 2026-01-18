import { useState, useCallback } from 'react';
import { FileItem, FileActivity, detectFileType } from './types';

// Mock initial files for demo
const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'Q4 Financial Report.pdf',
    type: 'pdf',
    size: 2456000,
    uploadedAt: new Date(Date.now() - 86400000 * 2),
    lastUsedAt: new Date(Date.now() - 3600000),
    usageCount: 5,
    tags: ['finance', 'quarterly', 'report'],
    status: 'ready',
    context: 'Used for quarterly summary generation'
  },
  {
    id: '2',
    name: 'Product Hero Banner.png',
    type: 'image',
    size: 1234000,
    uploadedAt: new Date(Date.now() - 86400000 * 5),
    lastUsedAt: new Date(Date.now() - 7200000),
    usageCount: 12,
    tags: ['marketing', 'banner', 'product'],
    status: 'ready',
    context: 'Resized for social media 3 times'
  },
  {
    id: '3',
    name: 'Customer Data Export.csv',
    type: 'csv',
    size: 567000,
    uploadedAt: new Date(Date.now() - 86400000),
    lastUsedAt: new Date(Date.now() - 1800000),
    usageCount: 8,
    tags: ['customers', 'data', 'export'],
    status: 'ready',
    context: 'Analyzed for customer insights'
  },
  {
    id: '4',
    name: 'Blog Post Draft.docx',
    type: 'doc',
    size: 45000,
    uploadedAt: new Date(Date.now() - 3600000 * 4),
    lastUsedAt: new Date(Date.now() - 900000),
    usageCount: 3,
    tags: ['blog', 'content', 'draft'],
    status: 'ready',
    context: 'Repurposed into Twitter thread'
  },
  {
    id: '5',
    name: 'https://example.com/article',
    type: 'link',
    size: 0,
    uploadedAt: new Date(Date.now() - 7200000),
    lastUsedAt: new Date(Date.now() - 600000),
    usageCount: 2,
    tags: ['reference', 'article'],
    status: 'ready',
    context: 'Summarized for research'
  }
];

const mockActivities: FileActivity[] = [
  { id: '1', fileId: '4', action: 'Repurposed to Twitter thread', timestamp: new Date(Date.now() - 900000) },
  { id: '2', fileId: '3', action: 'Generated data insights', timestamp: new Date(Date.now() - 1800000) },
  { id: '3', fileId: '2', action: 'Resized to 1200x630', timestamp: new Date(Date.now() - 7200000) },
  { id: '4', fileId: '1', action: 'Created executive summary', timestamp: new Date(Date.now() - 86400000) },
  { id: '5', fileId: '2', action: 'Compressed by 45%', timestamp: new Date(Date.now() - 172800000) },
];

export function useFileBrain() {
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [activities, setActivities] = useState<FileActivity[]>(mockActivities);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const uploadFiles = useCallback(async (fileList: FileList | File[]) => {
    setIsUploading(true);
    setUploadProgress(0);

    const newFiles: FileItem[] = [];
    const filesArray = Array.from(fileList);

    for (let i = 0; i < filesArray.length; i++) {
      const file = filesArray[i];
      
      // Simulate upload progress
      await new Promise(resolve => setTimeout(resolve, 500));
      setUploadProgress(((i + 1) / filesArray.length) * 100);

      const newFile: FileItem = {
        id: Date.now().toString() + i,
        name: file.name,
        type: detectFileType(file),
        size: file.size,
        uploadedAt: new Date(),
        lastUsedAt: new Date(),
        usageCount: 0,
        tags: [],
        status: 'processing',
      };

      newFiles.push(newFile);
    }

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    setFiles(prev => [
      ...newFiles.map(f => ({ ...f, status: 'ready' as const })),
      ...prev
    ]);

    setIsUploading(false);
    setUploadProgress(0);
  }, []);

  const addLink = useCallback(async (url: string) => {
    setIsUploading(true);
    
    const newFile: FileItem = {
      id: Date.now().toString(),
      name: url,
      type: 'link',
      size: 0,
      uploadedAt: new Date(),
      lastUsedAt: new Date(),
      usageCount: 0,
      tags: [],
      status: 'processing',
    };

    await new Promise(resolve => setTimeout(resolve, 1500));

    setFiles(prev => [{ ...newFile, status: 'ready' }, ...prev]);
    setIsUploading(false);
  }, []);

  const executeAction = useCallback(async (fileId: string, actionId: string) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    // Update last used
    setFiles(prev => prev.map(f => 
      f.id === fileId 
        ? { ...f, lastUsedAt: new Date(), usageCount: f.usageCount + 1 }
        : f
    ));

    // Add activity
    const newActivity: FileActivity = {
      id: Date.now().toString(),
      fileId,
      action: `Executed ${actionId}`,
      timestamp: new Date(),
    };

    setActivities(prev => [newActivity, ...prev]);
  }, [files]);

  const deleteFile = useCallback((fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (selectedFile?.id === fileId) {
      setSelectedFile(null);
    }
  }, [selectedFile]);

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || file.type === filterType;
    return matchesSearch && matchesType;
  });

  return {
    files: filteredFiles,
    allFiles: files,
    activities,
    selectedFile,
    setSelectedFile,
    isUploading,
    uploadProgress,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    viewMode,
    setViewMode,
    uploadFiles,
    addLink,
    executeAction,
    deleteFile,
  };
}
