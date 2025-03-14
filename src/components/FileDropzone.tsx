
import React, { useState, useCallback, useRef } from 'react';
import { cn } from "@/lib/utils";
import { FileText, Upload, Check, AlertCircle } from 'lucide-react';

interface FileDropzoneProps {
  onFileSelected: (file: File) => void;
  acceptedFileTypes: string[];
  maxSize?: number; // in bytes
  className?: string;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFileSelected,
  acceptedFileTypes,
  maxSize = 10 * 1024 * 1024, // Default 10MB
  className
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): boolean => {
    // Check file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const isValidType = acceptedFileTypes.some(type => 
      type.toLowerCase() === `.${fileExtension}` || 
      type.toLowerCase().includes(fileExtension || '')
    );
    
    if (!isValidType) {
      setError(`Invalid file type. Please upload ${acceptedFileTypes.join(', ')} files only.`);
      return false;
    }
    
    // Check file size
    if (file.size > maxSize) {
      setError(`File too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`);
      return false;
    }
    
    setError(null);
    return true;
  }, [acceptedFileTypes, maxSize]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const droppedFile = files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        onFileSelected(droppedFile);
      }
    }
  }, [onFileSelected, validateFile]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        onFileSelected(selectedFile);
      }
    }
  }, [onFileSelected, validateFile]);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "w-full h-64 border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer group",
          isDragging 
            ? "border-primary bg-primary/5 scale-[1.02]" 
            : "border-border hover:border-primary/50 hover:bg-secondary/50",
          file && !error ? "border-green-500 bg-green-50/20" : "",
          error ? "border-red-500 bg-red-50/20" : "",
          className
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept={acceptedFileTypes.join(",")}
          className="hidden"
        />
        
        <div className={cn(
          "w-16 h-16 mb-4 flex items-center justify-center rounded-full transition-all duration-300",
          isDragging ? "bg-primary/10" : "bg-muted group-hover:bg-muted/80",
          file && !error ? "bg-green-500/10" : "",
          error ? "bg-red-500/10" : ""
        )}>
          {error ? (
            <AlertCircle className="h-8 w-8 text-red-500" />
          ) : file ? (
            <Check className="h-8 w-8 text-green-500" />
          ) : isDragging ? (
            <FileText className="h-8 w-8 text-primary animate-pulse" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground group-hover:text-primary/80 transition-all duration-300" />
          )}
        </div>
        
        <div className="text-center space-y-2">
          {error ? (
            <p className="text-red-500 font-medium">{error}</p>
          ) : file ? (
            <>
              <p className="text-green-600 font-medium">File selected!</p>
              <p className="text-sm text-muted-foreground">{file.name}</p>
            </>
          ) : (
            <>
              <p className="font-medium">Drop your Word document here</p>
              <p className="text-sm text-muted-foreground">or click to browse</p>
              <p className="text-xs text-muted-foreground mt-2">
                Accepts {acceptedFileTypes.join(", ")} files
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileDropzone;
