import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@smolitux/core';
import { ProgressBar } from '@smolitux/core';

export interface MediaUploaderProps {
  /** Akzeptierte Dateitypen */
  accept?: string;
  /** Maximale Dateigröße in Bytes */
  maxSize?: number;
  /** Mehrere Dateien erlauben */
  multiple?: boolean;
  /** Callback beim Hochladen */
  onUpload: (files: File[]) => Promise<void>;
  /** Callback bei Fehler */
  onError?: (error: string) => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * MediaUploader-Komponente für den Upload von Mediendateien
 */
export const MediaUploader: React.FC<MediaUploaderProps> = ({
  accept = 'audio/*,video/*',
  maxSize = 1024 * 1024 * 100, // 100MB
  multiple = false,
  onUpload,
  onError,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Dateien validieren
  const validateFiles = (fileList: FileList | null): File[] => {
    if (!fileList) return [];
    
    const validFiles: File[] = [];
    const errors: string[] = [];
    
    Array.from(fileList).forEach(file => {
      // Dateityp prüfen
      const fileType = file.type.split('/')[0];
      if (!accept.includes(fileType) && !accept.includes('*')) {
        errors.push(`${file.name}: Ungültiger Dateityp. Erlaubt sind ${accept}`);
        return;
      }
      
      // Dateigröße prüfen
      if (file.size > maxSize) {
        const maxSizeMB = Math.round(maxSize / (1024 * 1024));
        errors.push(`${file.name}: Datei zu groß. Maximale Größe ist ${maxSizeMB}MB`);
        return;
      }
      
      validFiles.push(file);
    });
    
    if (errors.length > 0) {
      const errorMessage = errors.join('\n');
      setError(errorMessage);
      onError?.(errorMessage);
    } else {
      setError(null);
    }
    
    return validFiles;
  };
  
  // Dateien hinzufügen
  const addFiles = (fileList: FileList | null) => {
    const validFiles = validateFiles(fileList);
    
    if (validFiles.length > 0) {
      if (multiple) {
        setFiles(prevFiles => [...prevFiles, ...validFiles]);
      } else {
        setFiles(validFiles.slice(0, 1));
      }
    }
  };
  
  // Datei entfernen
  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };
  
  // Dateien hochladen
  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Keine Dateien ausgewählt');
      onError?.('Keine Dateien ausgewählt');
      return;
    }
    
    setUploading(true);
    setProgress(0);
    setError(null);
    
    try {
      // Simuliere Fortschritt
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 5;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 300);
      
      await onUpload(files);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // Zurücksetzen nach erfolgreichem Upload
      setTimeout(() => {
        setFiles([]);
        setUploading(false);
        setProgress(0);
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload fehlgeschlagen';
      setError(errorMessage);
      onError?.(errorMessage);
      setUploading(false);
      setProgress(0);
    }
  };
  
  // Drag & Drop Handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const { files } = e.dataTransfer;
    addFiles(files);
  }, []);
  
  // Datei-Input Handler
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    addFiles(files);
  };
  
  // Datei-Input öffnen
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };
  
  // Dateigröße formatieren
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Medien hochladen
      </h3>
      
      {/* Drag & Drop Bereich */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        <svg
          className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Dateien hierher ziehen oder <span className="text-primary-600 dark:text-primary-400">durchsuchen</span>
        </p>
        
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
          {multiple ? 'Mehrere Dateien erlaubt' : 'Nur eine Datei erlaubt'} • Max. {formatFileSize(maxSize)}
        </p>
      </div>
      
      {/* Fehleranzeige */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md text-sm">
          <p className="font-medium">Fehler:</p>
          <p className="whitespace-pre-line">{error}</p>
        </div>
      )}
      
      {/* Dateiliste */}
      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ausgewählte Dateien ({files.length})
          </h4>
          
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md"
              >
                <div className="flex items-center">
                  <svg
                    className={`h-5 w-5 mr-2 ${
                      file.type.startsWith('audio/')
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'text-purple-500 dark:text-purple-400'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {file.type.startsWith('audio/') ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    )}
                  </svg>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)} • {file.type}
                    </p>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="ml-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                  disabled={uploading}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Fortschrittsanzeige */}
      {uploading && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload-Fortschritt
          </p>
          <ProgressBar value={progress} max={100} />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
            {progress}%
          </p>
        </div>
      )}
      
      {/* Aktionen */}
      <div className="mt-4 flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => {
            setFiles([]);
            setError(null);
          }}
          disabled={files.length === 0 || uploading}
        >
          Zurücksetzen
        </Button>
        
        <Button
          variant="primary"
          onClick={handleUpload}
          disabled={files.length === 0 || uploading}
        >
          {uploading ? 'Wird hochgeladen...' : 'Hochladen'}
        </Button>
      </div>
    </div>
  );
};