// packages/@smolitux/core/src/components/FileUpload/FileUpload.tsx
import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { useFormControl } from '../FormControl/FormControl';

export interface FileInfo {
  /** Eindeutige ID des Files */
  id: string;
  /** Original-Dateiname */
  name: string;
  /** MIME-Typ */
  type: string;
  /** Dateigröße in Bytes */
  size: number;
  /** Datei-Objekt */
  file: File;
  /** Fortschritt (0-100) */
  progress?: number;
  /** Fehler */
  error?: string;
  /** Status */
  status: 'idle' | 'uploading' | 'success' | 'error';
  /** Vorschau-URL */
  previewUrl?: string;
}

export interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange' | 'size'> {
  /** Label für die Dateiauswahl */
  label?: string;
  /** Text im Dropbereich */
  dropzoneText?: string;
  /** Hilfetext */
  helperText?: React.ReactNode;
  /** Fehlermeldung */
  error?: React.ReactNode;
  /** Aktuelle Dateien */
  value?: FileInfo[];
  /** Callback bei Datei-Änderungen */
  onChange?: (files: FileInfo[]) => void;
  /** Callback bei Upload-Start */
  onUploadStart?: (files: FileInfo[]) => void;
  /** Callback bei Upload-Fortschritt */
  onUploadProgress?: (file: FileInfo, progress: number) => void;
  /** Callback bei Upload-Abschluss */
  onUploadComplete?: (file: FileInfo) => void;
  /** Callback bei Upload-Fehler */
  onUploadError?: (file: FileInfo, error: any) => void;
  /** Automatischer Upload */
  autoUpload?: boolean;
  /** Maximale Dateigröße in Bytes */
  maxSize?: number;
  /** Erlaubte Dateitypen */
  accept?: string;
  /** Mehrere Dateien erlauben */
  multiple?: boolean;
  /** Variante */
  variant?: 'default' | 'simple' | 'button';
  /** Größe des Uploaders */
  size?: 'sm' | 'md' | 'lg';
  /** Vorschau anzeigen */
  showPreview?: boolean;
  /** Datei-Fortschritt anzeigen */
  showProgress?: boolean;
  /** Titel des Upload-Buttons */
  buttonText?: string;
  /** Benutzerdefinierte Vorschau-Komponente */
  previewRenderer?: (file: FileInfo) => React.ReactNode;
  /** Benutzerdefinierte Upload-Funktion */
  customUploader?: (file: File) => Promise<any>;
  /** Maximale Anzahl an Dateien */
  maxFiles?: number;
  /** Standard-Upload-URL */
  uploadUrl?: string;
  /** Name des Formularfelds für den Upload */
  fieldName?: string;
}

/**
 * FileUpload-Komponente für Datei-Uploads und Drag-and-Drop
 * 
 * @example
 * ```tsx
 * <FileUpload
 *   label="Anhänge"
 *   accept="image/*,application/pdf"
 *   multiple
 *   maxSize={5 * 1024 * 1024} // 5MB
 *   onChange={files => console.log(files)}
 * />
 * ```
 */
export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(({
  label,
  dropzoneText = 'Dateien hierher ziehen oder klicken zum Auswählen',
  helperText,
  error,
  value,
  onChange,
  onUploadStart,
  onUploadProgress,
  onUploadComplete,
  onUploadError,
  autoUpload = false,
  maxSize,
  accept,
  multiple = false,
  variant = 'default',
  size = 'md',
  showPreview = true,
  showProgress = true,
  buttonText = 'Dateien auswählen',
  previewRenderer,
  customUploader,
  maxFiles,
  uploadUrl,
  fieldName = 'file',
  className = '',
  ...rest
}, ref) => {
  // FormControl-Context
  const formControl = useFormControl();
  
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  
  // Status
  const [files, setFiles] = useState<FileInfo[]>(value || []);
  const [isDragging, setIsDragging] = useState(false);
  
  // Größen
  const sizeClasses = {
    sm: {
      dropzone: 'p-4',
      button: 'text-sm py-1 px-3',
      icon: 'h-8 w-8'
    },
    md: {
      dropzone: 'p-6',
      button: 'text-base py-2 px-4',
      icon: 'h-12 w-12'
    },
    lg: {
      dropzone: 'p-8',
      button: 'text-lg py-3 px-6',
      icon: 'h-16 w-16'
    }
  };
  
  // Wartung des Files-State
  useEffect(() => {
    if (value) {
      setFiles(value);
    }
  }, [value]);
  
  // Dateien hinzufügen
  const addFiles = (newFiles: FileList | File[]) => {
    // Prüfen, ob die maximale Anzahl erreicht ist
    if (maxFiles && files.length + newFiles.length > maxFiles) {
      const error = `Maximal ${maxFiles} Dateien erlaubt.`;
      
      if (formControl.hasError) {
        console.error(error);
      } else {
        onUploadError?.(
          {
            id: 'error',
            name: 'Too many files',
            type: '',
            size: 0,
            file: new File([], ''),
            status: 'error',
            error
          },
          new Error(error)
        );
      }
      
      return;
    }
    
    // Dateien verarbeiten
    const updatedFiles = [...files];
    const newFileInfos: FileInfo[] = [];
    
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      
      // Prüfen, ob die Datei zu groß ist
      if (maxSize && file.size > maxSize) {
        const error = `Datei ${file.name} ist zu groß. Maximal ${formatFileSize(maxSize)} erlaubt.`;
        onUploadError?.(
          {
            id: 'size-error-' + Date.now(),
            name: file.name,
            type: file.type,
            size: file.size,
            file,
            status: 'error',
            error
          },
          new Error(error)
        );
        continue;
      }
      
      // Prüfen, ob der Dateityp erlaubt ist
      if (accept) {
        const acceptTypes = accept.split(',').map(type => type.trim());
        const fileType = file.type;
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        
        const isTypeAllowed = acceptTypes.some(type => {
          if (type.startsWith('.')) {
            // Prüfen auf Dateiendung
            return `.${fileExtension}` === type;
          } else if (type.endsWith('/*')) {
            // Prüfen auf Mime-Type-Gruppe (z.B. image/*)
            const typeGroup = type.replace('/*', '');
            return fileType.startsWith(typeGroup + '/');
          } else {
            // Exakter Mime-Type
            return fileType === type;
          }
        });
        
        if (!isTypeAllowed) {
          const error = `Dateityp von ${file.name} ist nicht erlaubt.`;
          onUploadError?.(
            {
              id: 'type-error-' + Date.now(),
              name: file.name,
              type: file.type,
              size: file.size,
              file,
              status: 'error',
              error
            },
            new Error(error)
          );
          continue;
        }
      }
      
      // FileInfo erstellen
      const fileId = `file-${Date.now()}-${i}`;
      const fileInfo: FileInfo = {
        id: fileId,
        name: file.name,
        type: file.type,
        size: file.size,
        file,
        status: 'idle',
        progress: 0
      };
      
      // Vorschau-URL erstellen für Bilder
      if (showPreview && file.type.startsWith('image/')) {
        fileInfo.previewUrl = URL.createObjectURL(file);
      }
      
      newFileInfos.push(fileInfo);
      updatedFiles.push(fileInfo);
    }
    
    // State und Callback aktualisieren
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
    
    // Automatischer Upload
    if (autoUpload && newFileInfos.length > 0) {
      onUploadStart?.(newFileInfos);
      
      newFileInfos.forEach(fileInfo => {
        uploadFile(fileInfo);
      });
    }
  };
  
  // Datei entfernen
  const removeFile = (fileId: string) => {
    const newFiles = files.filter(file => file.id !== fileId);
    
    // Vorschau-URL freigeben, wenn vorhanden
    const fileToRemove = files.find(file => file.id === fileId);
    if (fileToRemove?.previewUrl) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }
    
    setFiles(newFiles);
    onChange?.(newFiles);
  };
  
  // Datei hochladen
  const uploadFile = async (fileInfo: FileInfo) => {
    // Wenn weder customUploader noch uploadUrl angegeben ist, nichts tun
    if (!customUploader && !uploadUrl) {
      console.warn('Kein Uploader oder Upload-URL definiert.');
      return;
    }
    
    // Status auf "uploading" setzen
    updateFileStatus(fileInfo.id, 'uploading');
    
    try {
      if (customUploader) {
        // Benutzerdefinierten Uploader verwenden
        await customUploader(fileInfo.file);
      } else if (uploadUrl) {
        // Standard-XHR-Upload
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        
        formData.append(fieldName, fileInfo.file);
        
        // Fortschritt überwachen
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            updateFileProgress(fileInfo.id, progress);
            onUploadProgress?.(
              { ...fileInfo, progress },
              progress
            );
          }
        });
        
        // Promise für das Ergebnis
        const result = await new Promise<any>((resolve, reject) => {
          xhr.open('POST', uploadUrl);
          
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(xhr.response);
            } else {
              reject(new Error(`Upload fehlgeschlagen: ${xhr.statusText}`));
            }
          };
          
          xhr.onerror = () => {
            reject(new Error('Netzwerkfehler beim Upload.'));
          };
          
          xhr.send(formData);
        });
        
        // Upload erfolgreich
        updateFileStatus(fileInfo.id, 'success');
        onUploadComplete?.({ ...fileInfo, status: 'success' });
      }
    } catch (error: any) {
      // Upload fehlgeschlagen
      const errorMessage = error.message || 'Unbekannter Fehler beim Upload.';
      updateFileError(fileInfo.id, errorMessage);
      onUploadError?.(
        { ...fileInfo, status: 'error', error: errorMessage },
        error
      );
    }
  };
  
  // Hilfsfunktionen für File-Updates
  const updateFileStatus = (fileId: string, status: FileInfo['status']) => {
    setFiles(prev => 
      prev.map(file => 
        file.id === fileId ? { ...file, status } : file
      )
    );
  };
  
  const updateFileProgress = (fileId: string, progress: number) => {
    setFiles(prev => 
      prev.map(file => 
        file.id === fileId ? { ...file, progress } : file
      )
    );
  };
  
  const updateFileError = (fileId: string, error: string) => {
    setFiles(prev => 
      prev.map(file => 
        file.id === fileId ? { ...file, status: 'error', error } : file
      )
    );
  };
  
  // Input-Klick auslösen
  const triggerFileInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  
  // Drag & Drop Handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Nur setzen, wenn wir den Dropzone wirklich verlassen (nicht für Child-Elemente)
    if (e.currentTarget === e.target) {
      setIsDragging(false);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };
  
  // Input Change Handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
      
      // Input zurücksetzen, damit derselbe File erneut ausgewählt werden kann
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };
  
  // Alle Dateien hochladen
  const uploadAllFiles = () => {
    const filesToUpload = files.filter(file => file.status === 'idle');
    
    if (filesToUpload.length > 0) {
      onUploadStart?.(filesToUpload);
      
      filesToUpload.forEach(fileInfo => {
        uploadFile(fileInfo);
      });
    }
  };
  
  // Dateigröße formatieren
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Icon-Komponenten
  const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={sizeClasses[size].icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  );
  
  // Button-Variante rendern
  if (variant === 'button') {
    return (
      <div className={`${className}`}>
        {/* Label */}
        {(label || formControl.label) && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label || formControl.label}
            {formControl.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        
        {/* Button und Input */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={triggerFileInput}
            className={`
              bg-primary-600 hover:bg-primary-700 text-white font-medium
              rounded transition duration-150 ease-in-out
              flex items-center justify-center
              ${sizeClasses[size].button}
              ${rest.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            disabled={rest.disabled}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
            </svg>
            {buttonText}
          </button>
          
          <input
            ref={(el) => {
              // Combine refs
              if (typeof ref === 'function') {
                ref(el);
              } else if (ref) {
                (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
              }
              if (inputRef) {
                (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
              }
            }}
            type="file"
            className="hidden"
            onChange={handleInputChange}
            accept={accept}
            multiple={multiple}
            disabled={rest.disabled}
            {...rest}
          />
          
          {/* Dateiliste */}
          {files.length > 0 && (
            <div className="mt-2">
              <ul className="space-y-2">
                {files.map(file => (
                  <li 
                    key={file.id} 
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded p-2"
                  >
                    <div className="flex items-center">
                      {/* Vorschau, falls verfügbar */}
                      {showPreview && file.previewUrl && (
                        <div className="mr-2 w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                          {previewRenderer ? (
                            previewRenderer(file)
                          ) : (
                            <img src={file.previewUrl} alt={file.name} className="w-full h-full object-cover"/>
                          )}
                        </div>
                      )}
                      
                      {/* Dateiinfo */}
                      <div className="overflow-hidden">
                        <div className="text-sm font-medium truncate">{file.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {formatFileSize(file.size)}
                          {file.status === 'uploading' && ' - Uploading...'}
                          {file.status === 'success' && ' - Upload Complete'}
                          {file.status === 'error' && ` - Error: ${file.error}`}
                        </div>
                      </div>
                    </div>
                    
                    {/* Aktionen */}
                    <div className="flex items-center">
                      {/* Fortschrittsanzeige */}
                      {showProgress && file.status === 'uploading' && (
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full mr-2 h-2">
                          <div 
                            className="bg-primary-500 rounded-full h-2" 
                            style={{ width: `${file.progress || 0}%` }}
                          />
                        </div>
                      )}
                      
                      {/* Löschen-Button */}
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                        title="Remove file"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              
              {/* Upload-Button wenn nicht autoUpload */}
              {!autoUpload && files.some(file => file.status === 'idle') && (
                <button
                  type="button"
                  onClick={uploadAllFiles}
                  className="mt-3 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-1 px-3 rounded"
                >
                  Dateien hochladen
                </button>
              )}
            </div>
          )}
          
          {/* Hilfetexzt oder Fehlermeldung */}
          {((helperText && !formControl.hasError) || (error || formControl.hasError)) && (
            <div className="mt-1 text-sm">
              {error || formControl.hasError ? (
                <p className="text-red-600 dark:text-red-400">
                  {error}
                </p>
              ) : helperText ? (
                <p className="text-gray-500 dark:text-gray-400">
                  {helperText}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Simple Variante rendern (nur Input und Dateiliste, ohne Dropzone)
  if (variant === 'simple') {
    return (
      <div className={`${className}`}>
        {/* Label */}
        {(label || formControl.label) && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label || formControl.label}
            {formControl.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        
        {/* Simple Input */}
        <div className="flex flex-col gap-2">
          <div className="flex">
            <input
              ref={(el) => {
                // Combine refs
                if (typeof ref === 'function') {
                  ref(el);
                } else if (ref) {
                  (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
                }
                if (inputRef) {
                  (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
                }
              }}
              type="file"
              className="
                block w-full text-sm text-gray-500 dark:text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-medium
                file:bg-primary-50 file:text-primary-700
                dark:file:bg-primary-900/20 dark:file:text-primary-300
                hover:file:bg-primary-100 dark:hover:file:bg-primary-800/30
              "
              onChange={handleInputChange}
              accept={accept}
              multiple={multiple}
              disabled={rest.disabled}
              {...rest}
            />
          </div>
          
          {/* Dateiliste */}
          {files.length > 0 && (
            <div className="mt-2">
              <ul className="space-y-2">
                {files.map(file => (
                  <li 
                    key={file.id} 
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded p-2"
                  >
                    <div className="flex items-center">
                      {/* Dateiinfo */}
                      <div className="overflow-hidden">
                        <div className="text-sm font-medium truncate">{file.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {formatFileSize(file.size)}
                          {file.status === 'uploading' && ' - Uploading...'}
                          {file.status === 'success' && ' - Upload Complete'}
                          {file.status === 'error' && ` - Error: ${file.error}`}
                        </div>
                      </div>
                    </div>
                    
                    {/* Aktionen */}
                    <div className="flex items-center">
                      {/* Fortschrittsanzeige */}
                      {showProgress && file.status === 'uploading' && (
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full mr-2 h-2">
                          <div 
                            className="bg-primary-500 rounded-full h-2" 
                            style={{ width: `${file.progress || 0}%` }}
                          />
                        </div>
                      )}
                      
                      {/* Löschen-Button */}
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                        title="Remove file"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              
              {/* Upload-Button wenn nicht autoUpload */}
              {!autoUpload && files.some(file => file.status === 'idle') && (
                <button
                  type="button"
                  onClick={uploadAllFiles}
                  className="mt-3 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-1 px-3 rounded"
                >
                  Dateien hochladen
                </button>
              )}
            </div>
          )}
          
          {/* Hilfetexzt oder Fehlermeldung */}
          {((helperText && !formControl.hasError) || (error || formControl.hasError)) && (
            <div className="mt-1 text-sm">
              {error || formControl.hasError ? (
                <p className="text-red-600 dark:text-red-400">
                  {error}
                </p>
              ) : helperText ? (
                <p className="text-gray-500 dark:text-gray-400">
                  {helperText}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Default Variante mit Dropzone rendern
  return (
    <div className={`${className}`}>
      {/* Label */}
      {(label || formControl.label) && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label || formControl.label}
          {formControl.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      
      {/* Dropzone und Input */}
      <div
        ref={dropzoneRef}
        className={`
          border-2 border-dashed rounded-lg
          flex flex-col items-center justify-center
          transition-colors duration-150
          ${sizeClasses[size].dropzone}
          ${isDragging 
            ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'}
          ${rest.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onClick={rest.disabled ? undefined : triggerFileInput}
        onDragEnter={rest.disabled ? undefined : handleDragEnter}
        onDragOver={rest.disabled ? undefined : handleDragOver}
        onDragLeave={rest.disabled ? undefined : handleDragLeave}
        onDrop={rest.disabled ? undefined : handleDrop}
      >
        <input
          ref={(el) => {
            // Combine refs
            if (typeof ref === 'function') {
              ref(el);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
            }
            if (inputRef) {
              (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
            }
          }}
          type="file"
          className="hidden"
          onChange={handleInputChange}
          accept={accept}
          multiple={multiple}
          disabled={rest.disabled}
          {...rest}
        />
        
        <UploadIcon />
        
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{dropzoneText}</p>
        
        {accept && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Erlaubte Dateitypen: {accept}
          </p>
        )}
        
        {maxSize && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Max. Größe: {formatFileSize(maxSize)}
          </p>
        )}
      </div>
      
      {/* Dateiliste */}
      {files.length > 0 && (
        <div className="mt-3">
          <ul className="space-y-2">
            {files.map(file => (
              <li 
                key={file.id} 
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded p-2"
              >
                <div className="flex items-center">
                  {/* Vorschau, falls verfügbar */}
                  {showPreview && file.previewUrl && (
                    <div className="mr-2 w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                      {previewRenderer ? (
                        previewRenderer(file)
                      ) : (
                        <img src={file.previewUrl} alt={file.name} className="w-full h-full object-cover"/>
                      )}
                    </div>
                  )}
                  
                  {/* Dateiinfo */}
                  <div className="overflow-hidden">
                    <div className="text-sm font-medium truncate">{file.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)}
                      {file.status === 'uploading' && ' - Uploading...'}
                      {file.status === 'success' && ' - Upload Complete'}
                      {file.status === 'error' && ` - Error: ${file.error}`}
                    </div>
                  </div>
                </div>
                
                {/* Aktionen */}
                <div className="flex items-center">
                  {/* Fortschrittsanzeige */}
                  {showProgress && file.status === 'uploading' && (
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full mr-2 h-2">
                      <div 
                        className="bg-primary-500 rounded-full h-2" 
                        style={{ width: `${file.progress || 0}%` }}
                      />
                    </div>
                  )}
                  
                  {/* Status-Icon */}
                  {file.status === 'success' && (
                    <span className="mr-2 text-green-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </span>
                  )}
                  
                  {file.status === 'error' && (
                    <span className="mr-2 text-red-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </span>
                  )}
                  
                  {/* Löschen-Button */}
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                    title="Remove file"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          {/* Upload-Button wenn nicht autoUpload */}
          {!autoUpload && files.some(file => file.status === 'idle') && (
            <button
              type="button"
              onClick={uploadAllFiles}
              className="mt-3 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded"
            >
              Dateien hochladen
            </button>
          )}
        </div>
      )}
      
      {/* Hilfetexzt oder Fehlermeldung */}
      {((helperText && !formControl.hasError) || (error || formControl.hasError)) && (
        <div className="mt-1 text-sm">
          {error || formControl.hasError ? (
            <p className="text-red-600 dark:text-red-400">
              {error}
            </p>
          ) : helperText ? (
            <p className="text-gray-500 dark:text-gray-400">
              {helperText}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
});

FileUpload.displayName = 'FileUpload';

export default FileUpload;
