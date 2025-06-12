import React, { forwardRef, useRef, useState } from 'react';
import clsx from 'clsx';

export interface FileUploadProps {
  /** Callback when files change */
  onChange: (files: File[]) => void;
  /** Accepted file types */
  accept?: string;
  /** Allow selecting multiple files */
  multiple?: boolean;
  /** Disable the upload */
  disabled?: boolean;
  /** Optional label */
  label?: string;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Custom renderer for the file list */
  fileListRenderer?: (files: File[], remove: (index: number) => void) => React.ReactNode;
  className?: string;
  id?: string;
}

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      onChange,
      accept,
      multiple = false,
      disabled = false,
      label,
      maxSize,
      fileListRenderer,
      className,
      id,
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [dragOver, setDragOver] = useState(false);

    const triggerSelect = () => {
      if (!disabled) inputRef.current?.click();
    };

    const handleFiles = (fileList: FileList) => {
      const selected = Array.from(fileList).filter((f) => {
        if (maxSize && f.size > maxSize) return false;
        if (accept) {
          const types = accept.split(',').map((t) => t.trim());
          const valid = types.some((t) => {
            if (t.startsWith('.')) return f.name.toLowerCase().endsWith(t.toLowerCase());
            if (t.endsWith('/*')) return f.type.startsWith(t.replace('/*', ''));
            return f.type === t;
          });
          if (!valid) return false;
        }
        return true;
      });
      if (selected.length) {
        const newFiles = multiple ? [...files, ...selected] : selected;
        setFiles(newFiles);
        onChange(newFiles);
      }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) handleFiles(e.target.files);
      e.target.value = '';
    };

    const onDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
    };

    const removeFile = (index: number) => {
      const newFiles = files.slice();
      newFiles.splice(index, 1);
      setFiles(newFiles);
      onChange(newFiles);
    };

    const defaultRenderer = () => (
      <ul className="mt-2 text-sm" data-testid="file-upload-list">
        {files.map((file, i) => (
          <li key={i} className="flex items-center justify-between">
            <span>{file.name}</span>
            <button
              type="button"
              onClick={() => removeFile(i)}
              className="text-red-600 ml-2"
              aria-label={`Remove ${file.name}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    );

    return (
      <div ref={ref} className={clsx('smx-file-upload', className)} id={id}>
        {label && (
          <label className="block mb-1 text-sm font-medium" htmlFor={`${id}-input`}>
            {label}
          </label>
        )}
        <div
          role="group"
          tabIndex={0}
          onClick={triggerSelect}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? (e.preventDefault(), triggerSelect()) : null)}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          aria-label={label || 'File upload'}
          aria-disabled={disabled}
          aria-describedby={maxSize ? `${id}-desc` : undefined}
          className={clsx(
            'border-2 border-dashed rounded p-4 text-center cursor-pointer',
            dragOver && 'bg-primary-50 border-primary-500',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
          data-testid="file-upload-dropzone"
        >
          <p>Drag files here or click to select</p>
          <input
            ref={inputRef}
            id={`${id}-input`}
            type="file"
            className="hidden"
            onChange={onInputChange}
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            aria-label={label || 'File upload'}
            tabIndex={-1}
            aria-hidden="true"
            data-testid="file-upload-input"
          />
        </div>
        {maxSize && (
          <p id={`${id}-desc`} className="mt-1 text-xs text-gray-500">
            Max size: {Math.round(maxSize / 1024)} KB
          </p>
        )}
        {files.length > 0 && (fileListRenderer ? fileListRenderer(files, removeFile) : defaultRenderer())}
      </div>
    );
  },
);

FileUpload.displayName = 'FileUpload';

export default FileUpload;
