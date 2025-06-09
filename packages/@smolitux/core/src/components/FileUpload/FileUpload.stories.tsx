import type { Meta, StoryObj } from '@storybook/react';
import FileUpload, { FileInfo } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Core/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'simple', 'button'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
    dropzoneText: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    buttonText: { control: 'text' },
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    autoUpload: { control: 'boolean' },
    showPreview: { control: 'boolean' },
    showProgress: { control: 'boolean' },
    maxSize: { control: 'number' },
    maxFiles: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    label: 'Dateien hochladen',
    dropzoneText: 'Dateien hierher ziehen oder klicken zum Auswählen',
    helperText: 'Maximale Dateigröße: 5MB',
    multiple: true,
    maxSize: 5 * 1024 * 1024, // 5MB
  },
};

export const SimpleVariant: Story = {
  args: {
    label: 'Profilbild hochladen',
    variant: 'simple',
    accept: 'image/*',
    helperText: 'JPG, PNG oder GIF, max. 2MB',
    maxSize: 2 * 1024 * 1024, // 2MB
  },
};

export const ButtonVariant: Story = {
  args: {
    label: 'Dokumente anhängen',
    variant: 'button',
    buttonText: 'Dokumente auswählen',
    accept: '.pdf,.doc,.docx',
    helperText: 'PDF oder Word-Dokumente',
    multiple: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Dateien hochladen',
    error: 'Bitte wählen Sie eine gültige Datei aus',
    accept: 'image/*',
  },
};

export const ImageUpload: Story = {
  args: {
    label: 'Bilder hochladen',
    accept: 'image/*',
    multiple: true,
    showPreview: true,
    helperText: 'Nur Bilder (JPG, PNG, GIF)',
  },
};

export const WithSizeLimit: Story = {
  args: {
    label: 'Dateien hochladen (max. 1MB)',
    maxSize: 1 * 1024 * 1024, // 1MB
    helperText: 'Maximale Dateigröße: 1MB',
  },
};

export const WithFileLimit: Story = {
  args: {
    label: 'Dateien hochladen (max. 3 Dateien)',
    multiple: true,
    maxFiles: 3,
    helperText: 'Maximal 3 Dateien erlaubt',
  },
};

export const AutoUpload: Story = {
  args: {
    label: 'Automatischer Upload',
    autoUpload: true,
    uploadUrl: 'https://httpbin.org/post', // Dummy-URL für Testzwecke
    helperText: 'Dateien werden automatisch hochgeladen',
    showProgress: true,
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-8">
      <FileUpload label="Small" size="sm" variant="default" />
      <FileUpload label="Medium (Default)" size="md" variant="default" />
      <FileUpload label="Large" size="lg" variant="default" />
    </div>
  ),
};

export const ControlledComponent: Story = {
  render: () => {
    const [files, setFiles] = useState<FileInfo[]>([]);

    const handleChange = (newFiles: FileInfo[]) => {
      setFiles(newFiles);
    };

    const handleUploadStart = (filesToUpload: FileInfo[]) => {
      console.log('Upload gestartet für:', filesToUpload);
    };

    const handleUploadProgress = (file: FileInfo, progress: number) => {
      console.log(`Upload-Fortschritt für ${file.name}: ${progress}%`);
    };

    const handleUploadComplete = (file: FileInfo) => {
      console.log(`Upload abgeschlossen für ${file.name}`);
    };

    const handleUploadError = (file: FileInfo, error: unknown) => {
      console.error(`Upload-Fehler für ${file.name}:`, error);
    };

    return (
      <div className="space-y-4">
        <FileUpload
          label="Kontrollierter FileUpload"
          value={files}
          onChange={handleChange}
          onUploadStart={handleUploadStart}
          onUploadProgress={handleUploadProgress}
          onUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
          multiple
          showPreview
          showProgress
        />

        <div className="p-4 bg-gray-100 rounded">
          <h3 className="font-medium mb-2">Ausgewählte Dateien:</h3>
          {files.length === 0 ? (
            <p className="text-gray-500">Keine Dateien ausgewählt</p>
          ) : (
            <ul className="list-disc pl-5">
              {files.map((file) => (
                <li key={file.id}>
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  },
};

export const CustomPreviewRenderer: Story = {
  args: {
    label: 'Dateien mit benutzerdefinierter Vorschau',
    accept: 'image/*,.pdf',
    multiple: true,
    showPreview: true,
    previewRenderer: (file: FileInfo) => {
      if (file.type.startsWith('image/')) {
        return (
          <div className="relative">
            <img src={file.previewUrl} alt={file.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </div>
        );
      } else if (file.type === 'application/pdf') {
        return (
          <div className="w-full h-full flex items-center justify-center bg-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
        );
      } else {
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        );
      }
    },
  },
};

export const CustomUploader: Story = {
  args: {
    label: 'Dateien mit benutzerdefiniertem Uploader',
    autoUpload: true,
    showProgress: true,
    customUploader: async (file: File) => {
      // Simuliere einen Upload mit Verzögerung
      return new Promise((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          if (progress >= 100) {
            clearInterval(interval);
            resolve({ success: true, url: 'https://example.com/uploaded/' + file.name });
          }
        }, 300);
      });
    },
  },
};
