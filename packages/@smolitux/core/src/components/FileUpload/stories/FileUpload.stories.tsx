import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from '../FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Core/Forms/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    accept: {
      control: 'text',
      description: 'Die akzeptierten Dateitypen',
    },
    multiple: {
      control: 'boolean',
      description: 'Gibt an, ob mehrere Dateien hochgeladen werden können',
    },
    disabled: {
      control: 'boolean',
      description: 'Gibt an, ob der FileUpload deaktiviert ist',
    },
    maxSize: {
      control: 'number',
      description: 'Die maximale Dateigröße in Bytes',
    },
    minSize: {
      control: 'number',
      description: 'Die minimale Dateigröße in Bytes',
    },
    maxFiles: {
      control: 'number',
      description: 'Die maximale Anzahl an Dateien',
    },
    onDrop: {
      action: 'dropped',
      description: 'Callback, der aufgerufen wird, wenn Dateien abgelegt werden',
    },
    onDropAccepted: {
      action: 'dropAccepted',
      description: 'Callback, der aufgerufen wird, wenn akzeptierte Dateien abgelegt werden',
    },
    onDropRejected: {
      action: 'dropRejected',
      description: 'Callback, der aufgerufen wird, wenn abgelehnte Dateien abgelegt werden',
    },
    onFileDialogCancel: {
      action: 'fileDialogCanceled',
      description: 'Callback, der aufgerufen wird, wenn der Dateidialog abgebrochen wird',
    },
    preventDropOnDocument: {
      control: 'boolean',
      description: 'Verhindert das Ablegen von Dateien auf dem Dokument',
    },
    noClick: {
      control: 'boolean',
      description: 'Deaktiviert das Öffnen des Dateidialogs beim Klicken',
    },
    noKeyboard: {
      control: 'boolean',
      description: 'Deaktiviert das Öffnen des Dateidialogs über die Tastatur',
    },
    noDrag: {
      control: 'boolean',
      description: 'Deaktiviert das Drag-and-Drop-Verhalten',
    },
    noDragEventsBubbling: {
      control: 'boolean',
      description: 'Verhindert das Bubbling von Drag-Events',
    },
    children: {
      description: 'Der Inhalt des FileUploads',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Basic: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);

    const onDrop = React.useCallback((acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
    }, []);

    return (
      <div className="w-[500px] space-y-4">
        <FileUpload onDrop={onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={`p-8 border-2 border-dashed rounded-md text-center cursor-pointer ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Dateien hier ablegen...</p>
              ) : (
                <p>Dateien hier ablegen oder klicken, um Dateien auszuwählen</p>
              )}
            </div>
          )}
        </FileUpload>

        {files.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2">Hochgeladene Dateien:</h3>
            <ul className="list-disc pl-5">
              {files.map((file) => (
                <li key={file.name}>
                  {file.name} - {(file.size / 1024).toFixed(2)} KB
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

export const WithFileTypeRestriction: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);

    const onDrop = React.useCallback((acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
    }, []);

    return (
      <div className="w-[500px] space-y-4">
        <FileUpload onDrop={onDrop} accept={{ 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] }}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={`p-8 border-2 border-dashed rounded-md text-center cursor-pointer ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Bilder hier ablegen...</p>
              ) : (
                <div>
                  <p>Bilder hier ablegen oder klicken, um Bilder auszuwählen</p>
                  <p className="text-sm text-gray-500 mt-2">
                    (Nur JPEG, PNG und GIF-Dateien werden akzeptiert)
                  </p>
                </div>
              )}
            </div>
          )}
        </FileUpload>

        {files.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2">Hochgeladene Bilder:</h3>
            <ul className="list-disc pl-5">
              {files.map((file) => (
                <li key={file.name}>
                  {file.name} - {(file.size / 1024).toFixed(2)} KB
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

export const WithMultipleFiles: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);

    const onDrop = React.useCallback((acceptedFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }, []);

    const removeFile = (index: number) => {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
      <div className="w-[500px] space-y-4">
        <FileUpload onDrop={onDrop} multiple>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={`p-8 border-2 border-dashed rounded-md text-center cursor-pointer ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Dateien hier ablegen...</p>
              ) : (
                <div>
                  <p>Dateien hier ablegen oder klicken, um Dateien auszuwählen</p>
                  <p className="text-sm text-gray-500 mt-2">
                    (Mehrere Dateien können ausgewählt werden)
                  </p>
                </div>
              )}
            </div>
          )}
        </FileUpload>

        {files.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2">Hochgeladene Dateien:</h3>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {files.map((file, index) => (
                <li key={index} className="py-2 flex justify-between items-center">
                  <div>
                    <span className="font-medium">{file.name}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {(file.size / 1024).toFixed(2)} KB
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Entfernen
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

export const WithFileSizeLimit: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);
    const [rejectedFiles, setRejectedFiles] = React.useState<
      { file: File; errors: { message: string }[] }[]
    >([]);

    const onDrop = React.useCallback(
      (acceptedFiles: File[], rejectedFiles: { file: File; errors: { message: string }[] }[]) => {
        setFiles(acceptedFiles);
        setRejectedFiles(rejectedFiles);
      },
      []
    );

    // 1MB Limit
    const maxSize = 1024 * 1024;

    return (
      <div className="w-[500px] space-y-4">
        <FileUpload
          onDrop={onDrop}
          maxSize={maxSize}
          onDropRejected={(rejectedFiles) => setRejectedFiles(rejectedFiles)}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={`p-8 border-2 border-dashed rounded-md text-center cursor-pointer ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Dateien hier ablegen...</p>
              ) : (
                <div>
                  <p>Dateien hier ablegen oder klicken, um Dateien auszuwählen</p>
                  <p className="text-sm text-gray-500 mt-2">(Maximale Dateigröße: 1MB)</p>
                </div>
              )}
            </div>
          )}
        </FileUpload>

        {files.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2">Akzeptierte Dateien:</h3>
            <ul className="list-disc pl-5">
              {files.map((file) => (
                <li key={file.name}>
                  {file.name} - {(file.size / 1024).toFixed(2)} KB
                </li>
              ))}
            </ul>
          </div>
        )}

        {rejectedFiles.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2 text-red-500">Abgelehnte Dateien:</h3>
            <ul className="list-disc pl-5 text-red-500">
              {rejectedFiles.map(({ file, errors }) => (
                <li key={file.name}>
                  {file.name} - {(file.size / 1024).toFixed(2)} KB
                  <ul className="list-disc pl-5 text-sm">
                    {errors.map((error, index) => (
                      <li key={index}>{error.message}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

export const WithImagePreview: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);
    const [previews, setPreviews] = React.useState<string[]>([]);

    const onDrop = React.useCallback((acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      // Erstelle Vorschaubilder
      const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
      setPreviews(newPreviews);

      // Bereinige die Vorschaubilder, wenn die Komponente unmountet
      return () => {
        newPreviews.forEach((preview) => URL.revokeObjectURL(preview));
      };
    }, []);

    return (
      <div className="w-[500px] space-y-4">
        <FileUpload onDrop={onDrop} accept={{ 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] }}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={`p-8 border-2 border-dashed rounded-md text-center cursor-pointer ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Bilder hier ablegen...</p>
              ) : (
                <div>
                  <p>Bilder hier ablegen oder klicken, um Bilder auszuwählen</p>
                  <p className="text-sm text-gray-500 mt-2">(Nur Bilder werden akzeptiert)</p>
                </div>
              )}
            </div>
          )}
        </FileUpload>

        {previews.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2">Vorschau:</h3>
            <div className="grid grid-cols-2 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="border rounded-md overflow-hidden">
                  <img src={preview} alt={`Vorschau ${index + 1}`} className="w-full h-auto" />
                  <div className="p-2 text-sm">
                    {files[index].name} - {(files[index].size / 1024).toFixed(2)} KB
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const WithProgressBar: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);
    const [uploading, setUploading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);

    const onDrop = React.useCallback((acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
    }, []);

    const uploadFiles = () => {
      if (files.length === 0) return;

      setUploading(true);
      setProgress(0);

      // Simuliere einen Upload mit einem Fortschrittsbalken
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 5;

          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setUploading(false);
              // Hier würde normalerweise eine Erfolgsmeldung angezeigt werden
            }, 500);
            return 100;
          }

          return newProgress;
        });
      }, 200);
    };

    return (
      <div className="w-[500px] space-y-4">
        <FileUpload onDrop={onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={`p-8 border-2 border-dashed rounded-md text-center cursor-pointer ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Dateien hier ablegen...</p>
              ) : (
                <p>Dateien hier ablegen oder klicken, um Dateien auszuwählen</p>
              )}
            </div>
          )}
        </FileUpload>

        {files.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2">Ausgewählte Dateien:</h3>
            <ul className="list-disc pl-5 mb-4">
              {files.map((file) => (
                <li key={file.name}>
                  {file.name} - {(file.size / 1024).toFixed(2)} KB
                </li>
              ))}
            </ul>

            <button
              onClick={uploadFiles}
              disabled={uploading}
              className={`px-4 py-2 rounded-md ${
                uploading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {uploading ? 'Wird hochgeladen...' : 'Hochladen'}
            </button>

            {uploading && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm mt-1">{progress}%</div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[500px]">
      <FileUpload disabled>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md text-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
          >
            <input {...getInputProps()} />
            <p>Datei-Upload ist deaktiviert</p>
          </div>
        )}
      </FileUpload>
    </div>
  ),
};

export const WithCustomUI: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);

    const onDrop = React.useCallback((acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
    }, []);

    return (
      <div className="w-[500px] space-y-4">
        <FileUpload onDrop={onDrop}>
          {({ getRootProps, getInputProps, isDragActive, open }) => (
            <div className="space-y-4">
              <div
                {...getRootProps()}
                className={`p-8 border-2 border-dashed rounded-md text-center ${
                  isDragActive
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-12 w-12 mb-4 ${
                      isDragActive ? 'text-purple-500' : 'text-gray-400'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  {isDragActive ? (
                    <p className="text-purple-500 font-medium">Dateien hier ablegen...</p>
                  ) : (
                    <>
                      <p className="font-medium">Dateien hier ablegen</p>
                      <p className="text-sm text-gray-500 mt-1">oder</p>
                    </>
                  )}
                </div>
              </div>

              {!isDragActive && (
                <button
                  type="button"
                  onClick={open}
                  className="w-full py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Dateien auswählen
                </button>
              )}
            </div>
          )}
        </FileUpload>

        {files.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2">Ausgewählte Dateien:</h3>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {files.map((file, index) => (
                <li key={index} className="py-3 flex items-center">
                  <div className="mr-3 text-purple-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};
