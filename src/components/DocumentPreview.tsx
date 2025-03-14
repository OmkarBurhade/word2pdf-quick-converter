
import React from 'react';
import { cn } from "@/lib/utils";
import { FileText } from 'lucide-react';

interface DocumentPreviewProps {
  fileName: string;
  fileSize: number;
  className?: string;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  fileName,
  fileSize,
  className
}) => {
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Get file extension
  const getFileExtension = (name: string): string => {
    return name.split('.').pop()?.toUpperCase() || '';
  };

  return (
    <div className={cn(
      "bg-white border border-border rounded-lg p-4 shadow-sm transition-all duration-300 hover:shadow-md",
      className
    )}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-14 bg-blue-50 rounded-md flex items-center justify-center relative">
          <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-primary text-white text-[10px] px-1 py-0.5 rounded">
            {getFileExtension(fileName)}
          </div>
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate" title={fileName}>
            {fileName}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{formatFileSize(fileSize)}</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
