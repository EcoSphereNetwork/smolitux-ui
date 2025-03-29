// packages/@smolitux/core/src/components/FileUpload/FileUpload.a11y.tsx
import React, { forwardRef, useState, useRef, useEffect, useId } from 'react';
import { useFormControl } from '../FormControl/FormControl';
import { FileInfo, FileUploadProps } from './FileUpload';

/**
 * FileUpload-Komponente für Datei-Uploads und Drag-and-Drop mit verbesserter Barrierefreiheit
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
export const FileUploadA11y = forwardRef<HTMLInputElement, FileUploadProps>(({
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
  
  // Eindeutige IDs für ARIA-Attribute
  const uniqueId = useId();
  const inputId = rest.id || `file-upload-${uniqueId}`;
  const labelId = `file-upload-label-${uniqueId}`;
  const descriptionId = `file-upload-description-${uniqueId}`;
  const errorId = `file-upload-error-${uniqueId}`;
  const helperId = `file-upload-helper-${uniqueId}`;
  const fileListId = `file-upload-list-${uniqueId}`;
  
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
      
      // Ankündigung für Screenreader
      announceError(error);
      
      return;
    }
    
    // Dateien verarbeiten
    const updatedFiles = [...files];
    const newFileInfos: FileInfo[] = [];
    const errors: string[] = [];
    
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      
      // Prüfen, ob die Datei zu groß ist
      if (maxSize && file.size > maxSize) {
        const error = `Datei ${file.name} ist zu groß. Maximal ${formatFileSize(maxSize)} erlaubt.`;
        errors.push(error);
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
          errors.push(error);
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
    
    // Ankündigung für Screenreader
    if (newFileInfos.length > 0) {
      const message = newFileInfos.length === 1
        ? `Datei ${newFileInfos[0].name} hinzugefügt.`
        : `${newFileInfos.length} Dateien hinzugefügt.`;
      announceSuccess(message);
    }
    
    if (errors.length > 0) {
      announceError(errors.join(' '));
    }
    
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
    const fileToRemove = files.find(file => file.id === fileId);
    const newFiles = files.filter(file => file.id !== fileId);
    
    // Vorschau-URL freigeben, wenn vorhanden
    if (fileToRemove?.previewUrl) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }
    
    setFiles(newFiles);
    onChange?.(newFiles);
    
    // Ankündigung für Screenreader
    if (fileToRemove) {
      announceSuccess(`Datei ${fileToRemove.name} entfernt.`);
    }
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
    
    // Ankündigung für Screenreader
    announceInfo(`Upload von ${fileInfo.name} gestartet.`);
    
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
            
            // Bei 50% und 100% Fortschritt für Screenreader ankündigen
            if (progress === 50 || progress === 100) {
              announceInfo(`Upload von ${fileInfo.name}: ${progress}% abgeschlossen.`);
            }
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
        
        // Ankündigung für Screenreader
        announceSuccess(`Upload von ${fileInfo.name} erfolgreich abgeschlossen.`);
      }
    } catch (error: any) {
      // Upload fehlgeschlagen
      const errorMessage = error.message || 'Unbekannter Fehler beim Upload.';
      updateFileError(fileInfo.id, errorMessage);
      onUploadError?.(
        { ...fileInfo, status: 'error', error: errorMessage },
        error
      );
      
      // Ankündigung für Screenreader
      announceError(`Upload von ${fileInfo.name} fehlgeschlagen: ${errorMessage}`);
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
    
    // Ankündigung für Screenreader
    announceInfo('Dateien können jetzt abgelegt werden.');
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
      
      // Ankündigung für Screenreader
      announceInfo(`Upload von ${filesToUpload.length} Dateien gestartet.`);
      
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
  
  // Screenreader-Ankündigungen
  const [announcement, setAnnouncement] = useState('');
  
  const announceInfo = (message: string) => {
    setAnnouncement(message);
  };
  
  const announceSuccess = (message: string) => {
    setAnnouncement(message);
  };
  
  const announceError = (message: string) => {
    setAnnouncement(message);
  };
  
  // Icon-Komponenten
  const UploadIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={sizeClasses[size].icon} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  );
  
  // Beschreibungstext für Screenreader
  const getAccessibleDescription = () => {
    const parts = [];
    
    if (maxSize) {
      parts.push(`Maximale Dateigröße: ${formatFileSize(maxSize)}.`);
    }
    
    if (accept) {
      const acceptTypes = accept.split(',').map(type => type.trim());
      const formattedTypes = acceptTypes.map(type => {
        if (type.startsWith('.')) {
          return type.substring(1).toUpperCase();
        } else if (type.endsWith('/*')) {
          return type.replace('/*', '-Dateien');
        } else {
          return type;
        }
      });
      
      parts.push(`Erlaubte Dateitypen: ${formattedTypes.join(', ')}.`);
    }
    
    if (multiple) {
      parts.push('Mehrere Dateien können ausgewählt werden.');
    } else {
      parts.push('Nur eine Datei kann ausgewählt werden.');
    }
    
    if (maxFiles) {
      parts.push(`Maximal ${maxFiles} Dateien erlaubt.`);
    }
    
    return parts.join(' ');
  };
  
  // Button-Variante rendern
  if (variant === 'button') {
    return (
      <div className={`${className}`} data-testid="file-upload-container">
        {/* Label */}
        {(label || formControl.label) && (
          <label 
            id={labelId}
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label || formControl.label}
            {formControl.required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
            {formControl.required && <span className="sr-only">(Erforderlich)</span>}
          </label>
        )}
        
        {/* Beschreibung für Screenreader */}
        <div id={descriptionId} className="sr-only">
          {getAccessibleDescription()}
        </div>
        
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
            aria-labelledby={labelId}
            aria-describedby={descriptionId}
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
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
            id={inputId}
            type="file"
            className="hidden"
            onChange={handleInputChange}
            accept={accept}
            multiple={multiple}
            disabled={rest.disabled}
            aria-labelledby={labelId}
            aria-describedby={descriptionId}
            {...rest}
          />
          
          {/* Dateiliste */}
          {files.length > 0 && (
            <div className="mt-2">
              <ul 
                id={fileListId}
                className="space-y-2"
                aria-label="Hochgeladene Dateien"
              >
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
                            <img 
                              src={file.previewUrl} 
                              alt={`Vorschau von ${file.name}`} 
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      )}
                      
                      {/* Dateiinfo */}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatFileSize(file.size)}
                        </span>
                        
                        {/* Fehler */}
                        {file.status === 'error' && (
                          <span className="text-xs text-red-500" role="alert">
                            {file.error}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Status und Aktionen */}
                    <div className="flex items-center">
                      {/* Fortschritt */}
                      {showProgress && file.status === 'uploading' && (
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2 overflow-hidden">
                          <div 
                            className="h-full bg-primary-500 rounded-full" 
                            style={{ width: `${file.progress || 0}%` }}
                            role="progressbar"
                            aria-valuenow={file.progress || 0}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`Upload-Fortschritt für ${file.name}`}
                          />
                        </div>
                      )}
                      
                      {/* Status-Icon */}
                      {file.status === 'success' && (
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      )}
                      
                      {file.status === 'error' && (
                        <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      )}
                      
                      {/* Löschen-Button */}
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                        aria-label={`Datei ${file.name} entfernen`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Upload-Button (wenn nicht autoUpload) */}
          {!autoUpload && files.some(file => file.status === 'idle') && (
            <button
              type="button"
              onClick={uploadAllFiles}
              className="mt-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded py-2 px-4 transition duration-150 ease-in-out"
              aria-label="Alle Dateien hochladen"
            >
              Hochladen
            </button>
          )}
          
          {/* Hilfetext */}
          {(helperText || formControl.helperText) && !error && !formControl.hasError && (
            <p id={helperId} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {helperText || formControl.helperText}
            </p>
          )}
          
          {/* Fehlermeldung */}
          {(error || formControl.hasError) && (
            <p id={errorId} className="mt-1 text-sm text-red-500" role="alert">
              {error || formControl.errorMessage}
            </p>
          )}
          
          {/* Live-Region für Screenreader-Ankündigungen */}
          <div 
            aria-live="polite" 
            className="sr-only"
            role="status"
          >
            {announcement}
          </div>
        </div>
      </div>
    );
  }
  
  // Standard-Variante mit Dropzone
  return (
    <div className={`${className}`} data-testid="file-upload-container">
      {/* Label */}
      {(label || formControl.label) && (
        <label 
          id={labelId}
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label || formControl.label}
          {formControl.required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
          {formControl.required && <span className="sr-only">(Erforderlich)</span>}
        </label>
      )}
      
      {/* Beschreibung für Screenreader */}
      <div id={descriptionId} className="sr-only">
        {getAccessibleDescription()}
      </div>
      
      {/* Dropzone */}
      <div
        ref={dropzoneRef}
        className={`
          border-2 border-dashed rounded-lg
          flex flex-col items-center justify-center
          transition-colors duration-150 ease-in-out
          ${isDragging ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-700'}
          ${sizeClasses[size].dropzone}
          ${rest.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onClick={rest.disabled ? undefined : triggerFileInput}
        onDragEnter={rest.disabled ? undefined : handleDragEnter}
        onDragOver={rest.disabled ? undefined : handleDragOver}
        onDragLeave={rest.disabled ? undefined : handleDragLeave}
        onDrop={rest.disabled ? undefined : handleDrop}
        tabIndex={rest.disabled ? undefined : 0}
        role="button"
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        onKeyDown={(e) => {
          if (rest.disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            triggerFileInput();
          }
        }}
      >
        <UploadIcon />
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
          {dropzoneText}
        </p>
        {accept && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
            Erlaubte Dateitypen: {accept}
          </p>
        )}
        {maxSize && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
            Maximale Größe: {formatFileSize(maxSize)}
          </p>
        )}
      </div>
      
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
        id={inputId}
        type="file"
        className="hidden"
        onChange={handleInputChange}
        accept={accept}
        multiple={multiple}
        disabled={rest.disabled}
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        {...rest}
      />
      
      {/* Dateiliste */}
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Hochgeladene Dateien</h3>
          <ul 
            id={fileListId}
            className="space-y-2"
            aria-label="Hochgeladene Dateien"
          >
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
                        <img 
                          src={file.previewUrl} 
                          alt={`Vorschau von ${file.name}`} 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  )}
                  
                  {/* Dateiinfo */}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{file.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)}
                    </span>
                    
                    {/* Fehler */}
                    {file.status === 'error' && (
                      <span className="text-xs text-red-500" role="alert">
                        {file.error}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Status und Aktionen */}
                <div className="flex items-center">
                  {/* Fortschritt */}
                  {showProgress && file.status === 'uploading' && (
                    <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2 overflow-hidden">
                      <div 
                        className="h-full bg-primary-500 rounded-full" 
                        style={{ width: `${file.progress || 0}%` }}
                        role="progressbar"
                        aria-valuenow={file.progress || 0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Upload-Fortschritt für ${file.name}`}
                      />
                    </div>
                  )}
                  
                  {/* Status-Icon */}
                  {file.status === 'success' && (
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  )}
                  
                  {file.status === 'error' && (
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  )}
                  
                  {/* Löschen-Button */}
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                    aria-label={`Datei ${file.name} entfernen`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Upload-Button (wenn nicht autoUpload) */}
      {!autoUpload && files.some(file => file.status === 'idle') && (
        <button
          type="button"
          onClick={uploadAllFiles}
          className="mt-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded py-2 px-4 transition duration-150 ease-in-out"
          aria-label="Alle Dateien hochladen"
        >
          Hochladen
        </button>
      )}
      
      {/* Hilfetext */}
      {(helperText || formControl.helperText) && !error && !formControl.hasError && (
        <p id={helperId} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helperText || formControl.helperText}
        </p>
      )}
      
      {/* Fehlermeldung */}
      {(error || formControl.hasError) && (
        <p id={errorId} className="mt-1 text-sm text-red-500" role="alert">
          {error || formControl.errorMessage}
        </p>
      )}
      
      {/* Live-Region für Screenreader-Ankündigungen */}
      <div 
        aria-live="polite" 
        className="sr-only"
        role="status"
      >
        {announcement}
      </div>
    </div>
  );
});

FileUploadA11y.displayName = 'FileUploadA11y';

export default FileUploadA11y;