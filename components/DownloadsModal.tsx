
import React from 'react';
import type { SyllabusFile } from '../types';
import { DownloadIcon, FileTextIcon } from './Icons';
import { jsPDF } from 'jspdf';

interface DownloadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: SyllabusFile[];
}

const DownloadsModal: React.FC<DownloadsModalProps> = ({ isOpen, onClose, files }) => {
  if (!isOpen) return null;

  const handleDownload = (file: SyllabusFile) => {
    const doc = new jsPDF();
    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = pageWidth - margin * 2;

    doc.setFontSize(16);
    doc.text(file.name, margin, 20);

    doc.setFontSize(10);
    doc.text(file.content, margin, 30, { maxWidth: textWidth });
    
    doc.save(`${file.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-secondary w-full max-w-lg rounded-2xl shadow-2xl border border-slate-600 p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-2 border-b border-slate-700">
          <h2 className="text-xl font-bold text-text-primary">Download Syllabus Documents</h2>
          <button onClick={onClose} className="text-2xl text-slate-400 hover:text-white transition-colors">&times;</button>
        </div>
        <p className="text-sm text-text-secondary">
          Click the download button to save the content of a syllabus document as a PDF file.
        </p>
        <ul className="max-h-80 overflow-y-auto space-y-2 py-2">
          {files.map((file, index) => (
            <li key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700/50 transition-colors">
              <div className="flex items-center space-x-3 overflow-hidden">
                <FileTextIcon className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-text-primary truncate" title={file.name}>{file.name}</span>
              </div>
              <button 
                onClick={() => handleDownload(file)}
                className="flex items-center space-x-2 text-sm text-accent hover:text-sky-300 transition-colors p-2 rounded-md bg-slate-700/50 hover:bg-slate-700"
                aria-label={`Download ${file.name}`}
              >
                <DownloadIcon className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DownloadsModal;