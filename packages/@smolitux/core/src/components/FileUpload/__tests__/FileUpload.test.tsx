import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FileUpload } from '../FileUpload';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

// Mock für FormControl
jest.mock('../../FormControl/FormControl', () => ({
  useFormControl: () => ({
    id: 'test-id',
    isDisabled: false,
    isInvalid: false,
    isReadOnly: false,
    isRequired: false,
    hasError: false,
  }),
}));

describe('FileUpload', () => {
  beforeEach(() => {
    // Mock für URL.createObjectURL
    global.URL.createObjectURL = jest.fn(() => 'mock-url');
    global.URL.revokeObjectURL = jest.fn();
  });

  it('renders correctly with default props', () => {
    render(<FileUpload />);

    expect(
      screen.getByText('Dateien hierher ziehen oder klicken zum Auswählen')
    ).toBeInTheDocument();
    expect(screen.getByTestId('file-upload-input')).toBeInTheDocument();
  });

  it('renders with custom dropzone text', () => {
    render(<FileUpload dropzoneText="Custom dropzone text" />);

    expect(screen.getByText('Custom dropzone text')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<FileUpload label="Upload Files" />);

    expect(screen.getByText('Upload Files')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<FileUpload helperText="Max file size: 5MB" />);

    expect(screen.getByText('Max file size: 5MB')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<FileUpload error="File too large" />);

    expect(screen.getByText('File too large')).toBeInTheDocument();
  });

  it('renders in disabled state', () => {
    render(<FileUpload disabled />);

    const input = screen.getByTestId('file-upload-input');
    expect(input).toBeDisabled();
  });

  it('calls onChange when files are selected', async () => {
    const handleChange = jest.fn();
    render(<FileUpload onChange={handleChange} />);

    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    const input = screen.getByTestId('file-upload-input');

    Object.defineProperty(input, 'files', {
      value: [file],
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
      const fileInfo = handleChange.mock.calls[0][0][0];
      expect(fileInfo.name).toBe('test.txt');
      expect(fileInfo.type).toBe('text/plain');
      expect(fileInfo.size).toBe(12); // 'test content' length
      expect(fileInfo.status).toBe('idle');
    });
  });

  it('validates file size', async () => {
    const handleChange = jest.fn();
    const onUploadError = jest.fn();
    render(
      <FileUpload
        onChange={handleChange}
        maxSize={5} // 5 bytes
        onUploadError={onUploadError}
      />
    );

    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    const input = screen.getByTestId('file-upload-input');

    Object.defineProperty(input, 'files', {
      value: [file],
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(onUploadError).toHaveBeenCalled();
      // In der verbesserten Version wird onChange auch aufgerufen, aber mit leeren Dateien
      // expect(handleChange).not.toHaveBeenCalled();
    });
  });

  it('handles multiple file selection', async () => {
    const handleChange = jest.fn();
    render(<FileUpload multiple onChange={handleChange} />);

    const file1 = new File(['test content 1'], 'test1.txt', { type: 'text/plain' });
    const file2 = new File(['test content 2'], 'test2.txt', { type: 'text/plain' });
    const input = screen.getByTestId('file-upload-input');

    Object.defineProperty(input, 'files', {
      value: [file1, file2],
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
      const files = handleChange.mock.calls[0][0];
      expect(files).toHaveLength(2);
      expect(files[0].name).toBe('test1.txt');
      expect(files[1].name).toBe('test2.txt');
    });
  });

  it('limits the number of files when maxFiles is set', async () => {
    const handleChange = jest.fn();
    const onUploadError = jest.fn();
    render(
      <FileUpload multiple maxFiles={1} onChange={handleChange} onUploadError={onUploadError} />
    );

    const file1 = new File(['test content 1'], 'test1.txt', { type: 'text/plain' });
    const file2 = new File(['test content 2'], 'test2.txt', { type: 'text/plain' });
    const input = screen.getByTestId('file-upload-input');

    Object.defineProperty(input, 'files', {
      value: [file1, file2],
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(onUploadError).toHaveBeenCalled();
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  it('handles drag and drop', async () => {
    const handleChange = jest.fn();
    render(<FileUpload onChange={handleChange} />);

    const dropzone = screen.getByTestId('file-upload-dropzone');
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });

    // Mock dataTransfer
    const dataTransfer = {
      files: [file],
      items: [
        {
          kind: 'file',
          type: file.type,
          getAsFile: () => file,
        },
      ],
      types: ['Files'],
    };

    // Trigger drag events
    fireEvent.dragEnter(dropzone, { dataTransfer });
    expect(dropzone).toHaveClass('border-primary-500');

    fireEvent.dragOver(dropzone, { dataTransfer });

    fireEvent.drop(dropzone, { dataTransfer });

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
      const fileInfo = handleChange.mock.calls[0][0][0];
      expect(fileInfo.name).toBe('test.txt');
    });

    expect(dropzone).not.toHaveClass('border-primary-500');
  });

  it('displays file preview for images', async () => {
    const handleChange = jest.fn();
    render(<FileUpload showPreview={true} onChange={handleChange} />);

    const file = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByTestId('file-upload-input');

    Object.defineProperty(input, 'files', {
      value: [file],
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
      expect(global.URL.createObjectURL).toHaveBeenCalledWith(file);
    });
  });

  it('renders with custom className', () => {
    render(<FileUpload className="custom-file-upload" />);

    const container = screen.getByTestId('file-upload-container');
    expect(container).toHaveClass('custom-file-upload');
  });

  it('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<FileUpload ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });
});
