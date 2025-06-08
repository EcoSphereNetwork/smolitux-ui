import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from '../';
import { Button } from '../../Button';

const meta: Meta<typeof FileUpload.A11y> = {
  title: 'Core/FileUpload/A11y',
  component: FileUpload.A11y,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Eine barrierefreie Version der FileUpload-Komponente mit verbesserten ARIA-Attributen und Screenreader-Unterstuetzung.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'button'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    maxSize: { control: 'number' },
    maxFiles: { control: 'number' },
    showPreview: { control: 'boolean' },
    showProgress: { control: 'boolean' },
    buttonText: { control: 'text' },
    dropzoneText: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload.A11y>;

export const Default: Story = {
  args: {
    label: 'Dateien hochladen',
    helperText: 'Maximale Dateigröße: 5MB',
    accept: 'image/*,application/pdf',
    multiple: true,
    maxSize: 5 * 1024 * 1024, // 5MB
    showPreview: true,
    showProgress: true,
  },
};

export const ButtonVariant: Story = {
  args: {
    label: 'Dateien hochladen',
    helperText: 'Maximale Dateigröße: 5MB',
    variant: 'button',
    buttonText: 'Dateien auswählen',
    accept: 'image/*,application/pdf',
    multiple: true,
    maxSize: 5 * 1024 * 1024, // 5MB
  },
};

export const WithError: Story = {
  args: {
    label: 'Dateien hochladen',
    error: 'Die Datei ist zu groß. Maximale Größe: 5MB',
    accept: 'image/*,application/pdf',
    multiple: true,
    maxSize: 5 * 1024 * 1024, // 5MB
  },
};

export const Disabled: Story = {
  args: {
    label: 'Dateien hochladen',
    helperText: 'Diese Funktion ist derzeit deaktiviert',
    disabled: true,
    accept: 'image/*,application/pdf',
    multiple: true,
  },
};

export const SingleFile: Story = {
  args: {
    label: 'Profilbild hochladen',
    helperText: 'Nur Bilder erlaubt (JPG, PNG, GIF)',
    accept: 'image/*',
    multiple: false,
    maxSize: 2 * 1024 * 1024, // 2MB
    showPreview: true,
  },
};

export const CustomDropzoneText: Story = {
  args: {
    label: 'Dateien hochladen',
    dropzoneText: 'Ziehen Sie Ihre Dateien hierher oder klicken Sie, um Dateien auszuwählen',
    accept: 'image/*,application/pdf',
    multiple: true,
  },
};

export const WithPreview: Story = {
  render: () => {
    const [files, setFiles] = useState<any[]>([]);

    // Simuliere einen Datei-Upload
    const handleChange = (newFiles: any[]) => {
      setFiles(newFiles);
    };

    return (
      <div className="p-4 max-w-md">
        <FileUpload.A11y
          label="Bilder hochladen"
          helperText="Maximale Dateigröße: 5MB"
          accept="image/*"
          multiple
          maxSize={5 * 1024 * 1024}
          showPreview
          showProgress
          value={files}
          onChange={handleChange}
        />

        {files.length > 0 && (
          <div className="mt-4">
            <Button
              variant="primary"
              onClick={() => {
                // Simuliere einen Upload-Fortschritt
                const updatedFiles = files.map((file) => ({
                  ...file,
                  status: 'uploading',
                  progress: 0,
                }));
                setFiles(updatedFiles);

                // Simuliere Fortschritt über Zeit
                let progress = 0;
                const interval = setInterval(() => {
                  progress += 10;

                  if (progress <= 100) {
                    const progressFiles = files.map((file) => ({
                      ...file,
                      status: progress < 100 ? 'uploading' : 'success',
                      progress,
                    }));
                    setFiles(progressFiles);
                  } else {
                    clearInterval(interval);
                  }
                }, 500);
              }}
            >
              Dateien hochladen
            </Button>
          </div>
        )}
      </div>
    );
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <FileUpload.A11y label="Klein" size="sm" accept="image/*,application/pdf" multiple />
      <FileUpload.A11y label="Mittel" size="md" accept="image/*,application/pdf" multiple />
      <FileUpload.A11y label="Groß" size="lg" accept="image/*,application/pdf" multiple />
    </div>
  ),
};
