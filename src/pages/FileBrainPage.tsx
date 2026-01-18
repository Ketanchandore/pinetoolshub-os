import { MainLayout } from "@/components/layout/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { FileUploadZone } from "@/components/filebrain/FileUploadZone";
import { FileCard } from "@/components/filebrain/FileCard";
import { FileDetailPanel } from "@/components/filebrain/FileDetailPanel";
import { FileTimeline } from "@/components/filebrain/FileTimeline";
import { FileBrainHeader } from "@/components/filebrain/FileBrainHeader";
import { useFileBrain } from "@/components/filebrain/useFileBrain";
import { Clock, FolderOpen } from "lucide-react";
import { toast } from "sonner";

export default function FileBrainPage() {
  const {
    files,
    allFiles,
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
  } = useFileBrain();

  const handleExecuteAction = (actionId: string) => {
    if (selectedFile) {
      executeAction(selectedFile.id, actionId);
      toast.success(`Executing ${actionId}...`, {
        description: `Processing ${selectedFile.name}`,
      });
    }
  };

  const handleUpload = (fileList: FileList | File[]) => {
    uploadFiles(fileList);
    toast.success("Files uploaded!", {
      description: `${Array.from(fileList).length} file(s) added to your brain`,
    });
  };

  const handleAddLink = (url: string) => {
    addLink(url);
    toast.success("Link added!", {
      description: "Extracting content...",
    });
  };

  const handleDelete = (fileId: string) => {
    deleteFile(fileId);
    toast.success("File removed from brain");
  };

  return (
    <MainLayout>
      <div className="h-full flex">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Header */}
              <FileBrainHeader
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filterType={filterType}
                onFilterChange={setFilterType}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                fileCount={allFiles.length}
              />

              {/* Upload Zone */}
              <FileUploadZone
                onUpload={handleUpload}
                onAddLink={handleAddLink}
                isUploading={isUploading}
                uploadProgress={uploadProgress}
              />

              {/* File Grid/List */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-primary" />
                  Your Files
                </h2>

                {files.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-muted-foreground"
                  >
                    <FolderOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No files found</p>
                    <p className="text-sm">
                      {searchQuery
                        ? "Try a different search term"
                        : "Upload files to get started"}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    layout
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                        : "space-y-2"
                    }
                  >
                    <AnimatePresence mode="popLayout">
                      {files.map((file) => (
                        <FileCard
                          key={file.id}
                          file={file}
                          isSelected={selectedFile?.id === file.id}
                          viewMode={viewMode}
                          onClick={() => setSelectedFile(file)}
                          onDelete={() => handleDelete(file.id)}
                        />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>

              {/* Timeline Section */}
              <div className="space-y-4 pb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Activity
                </h2>
                <FileTimeline
                  activities={activities}
                  files={allFiles}
                  onFileClick={setSelectedFile}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedFile && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 380, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="shrink-0 overflow-hidden"
            >
              <FileDetailPanel
                file={selectedFile}
                onClose={() => setSelectedFile(null)}
                onExecuteAction={handleExecuteAction}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}
