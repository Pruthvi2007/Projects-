
import React, { useState, useCallback, useRef } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { UploadIcon, FileTextIcon } from './Icons';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  isLoading: boolean;
  error: string | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload, isLoading, error }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const acceptedFiles = Array.from(e.target.files);
      setFiles(acceptedFiles);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const acceptedFiles = Array.from(e.dataTransfer.files);
      setFiles(acceptedFiles);
      e.dataTransfer.clearData();
    }
  };

  const handleSubmit = () => {
    if (files.length > 0) {
      onUpload(files);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center p-4 animate-fade-in">
      <div className="w-full max-w-2xl bg-secondary shadow-2xl rounded-2xl p-8 space-y-6 text-center border border-slate-600">
        <h2 className="text-3xl font-bold text-text-primary">Upload Syllabus</h2>
        <p className="text-text-secondary">
          Upload your VTU 2025 syllabus files to begin.
        </p>

        <div
          onClick={triggerFileSelect}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-10 cursor-pointer transition-colors duration-300
            ${isDragging ? 'border-accent bg-slate-700/50' : 'border-slate-500 hover:border-accent hover:bg-slate-700/30'}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".txt,.md,.json,.pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col items-center space-y-4">
            <UploadIcon className="w-12 h-12 text-slate-400" />
            <p className="text-text-secondary">
              <span className="font-semibold text-accent">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-400">Supported formats: TXT, MD, JSON, PDF, JPG, PNG</p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="text-left space-y-2 animate-slide-up">
            <h3 className="font-semibold text-text-primary">Selected Files:</h3>
            <ul className="max-h-32 overflow-y-auto bg-slate-800 p-3 rounded-md border border-slate-700">
              {files.map((file, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary truncate">
                  <FileTextIcon className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>{file.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {error && <p className="text-red-400 text-sm animate-fade-in">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={files.length === 0 || isLoading}
          className="w-full bg-accent text-primary font-bold py-3 px-4 rounded-lg hover:bg-sky-400 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex justify-center items-center space-x-2"
        >
          {isLoading ? <LoadingSpinner /> : <span>Analyze Files</span>}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
