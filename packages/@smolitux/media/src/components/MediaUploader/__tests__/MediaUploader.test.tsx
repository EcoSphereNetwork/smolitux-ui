import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MediaUploader } from '../MediaUploader';

// Mock the Button component from @smolitux/core
jest.mock('@smolitux/core', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
  ProgressBar: ({ value }: { value: number }) => (
    <div role="progressbar" aria-valuenow={value} data-testid="progress-bar">
      {value}%
    </div>
  ),
}));

describe('MediaUploader', () => {
  const mockOnUpload = jest.fn().mockResolvedValue(undefined);
  const mockOnError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders uploader with default props', () => {
    render(<MediaUploader onUpload={mockOnUpload} />);

    expect(screen.getByText('Drag & Drop Media Files')).toBeInTheDocument();
    expect(screen.getByText('or')).toBeInTheDocument();
    expect(screen.getByText('Browse Files')).toBeInTheDocument();
  });

  test('renders with custom className', () => {
    render(<MediaUploader onUpload={mockOnUpload} className="custom-uploader" />);

    const uploaderContainer = screen.getByTestId('media-uploader');
    expect(uploaderContainer).toHaveClass('custom-uploader');
  });

  test('handles file selection via button click', async () => {
    render(<MediaUploader onUpload={mockOnUpload} />);

    const browseButton = screen.getByText('Browse Files');
    expect(browseButton).toBeInTheDocument();

    // Create a mock file
    const file = new File(['file content'], 'test.mp4', { type: 'video/mp4' });

    // Mock the file input change event
    const fileInput = screen.getByTestId('file-input');
    Object.defineProperty(fileInput, 'files', {
      value: [file],
    });

    fireEvent.change(fileInput);

    // Check if the file is displayed
    expect(screen.getByText('test.mp4')).toBeInTheDocument();

    // Click upload button
    const uploadButton = screen.getByText('Upload');
    fireEvent.click(uploadButton);

    // Check if onUpload was called with the file
    await waitFor(() => {
      expect(mockOnUpload).toHaveBeenCalledWith([file]);
    });
  });

  test('handles drag and drop', async () => {
    render(<MediaUploader onUpload={mockOnUpload} />);

    const dropzone = screen.getByTestId('media-uploader');

    // Create a mock file
    const file = new File(['file content'], 'test.mp4', { type: 'video/mp4' });

    // Mock the drag events
    fireEvent.dragEnter(dropzone, {
      dataTransfer: {
        files: [file],
      },
    });

    // Check if the dropzone has the dragging class
    expect(dropzone).toHaveClass('dragging');

    // Mock the drop event
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
      },
    });

    // Check if the file is displayed
    expect(screen.getByText('test.mp4')).toBeInTheDocument();

    // Click upload button
    const uploadButton = screen.getByText('Upload');
    fireEvent.click(uploadButton);

    // Check if onUpload was called with the file
    await waitFor(() => {
      expect(mockOnUpload).toHaveBeenCalledWith([file]);
    });
  });

  test('validates file type', () => {
    render(<MediaUploader onUpload={mockOnUpload} accept="image/*" onError={mockOnError} />);

    // Create a mock file with invalid type
    const file = new File(['file content'], 'test.mp4', { type: 'video/mp4' });

    // Mock the file input change event
    const fileInput = screen.getByTestId('file-input');
    Object.defineProperty(fileInput, 'files', {
      value: [file],
    });

    fireEvent.change(fileInput);

    // Check if error message is displayed
    expect(screen.getByText(/Ungültiger Dateityp/)).toBeInTheDocument();
    expect(mockOnError).toHaveBeenCalled();
  });

  test('validates file size', () => {
    render(<MediaUploader onUpload={mockOnUpload} maxSize={1000} onError={mockOnError} />);

    // Create a mock file with size larger than maxSize
    const file = new File(['x'.repeat(2000)], 'test.mp4', { type: 'video/mp4' });
    Object.defineProperty(file, 'size', { value: 2000 });

    // Mock the file input change event
    const fileInput = screen.getByTestId('file-input');
    Object.defineProperty(fileInput, 'files', {
      value: [file],
    });

    fireEvent.change(fileInput);

    // Check if error message is displayed
    expect(screen.getByText(/Datei zu groß/)).toBeInTheDocument();
    expect(mockOnError).toHaveBeenCalled();
  });

  test('handles multiple files when multiple prop is true', async () => {
    render(<MediaUploader onUpload={mockOnUpload} multiple={true} />);

    // Create mock files
    const file1 = new File(['file content 1'], 'test1.mp4', { type: 'video/mp4' });
    const file2 = new File(['file content 2'], 'test2.mp4', { type: 'video/mp4' });

    // Mock the file input change event
    const fileInput = screen.getByTestId('file-input');
    Object.defineProperty(fileInput, 'files', {
      value: [file1, file2],
    });

    fireEvent.change(fileInput);

    // Check if both files are displayed
    expect(screen.getByText('test1.mp4')).toBeInTheDocument();
    expect(screen.getByText('test2.mp4')).toBeInTheDocument();

    // Click upload button
    const uploadButton = screen.getByText('Upload');
    fireEvent.click(uploadButton);

    // Check if onUpload was called with both files
    await waitFor(() => {
      expect(mockOnUpload).toHaveBeenCalledWith([file1, file2]);
    });
  });

  test('shows progress during upload', async () => {
    // Mock the onUpload function to update progress
    const mockUploadWithProgress = jest.fn().mockImplementation(() => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 100);
      });
    });

    render(<MediaUploader onUpload={mockUploadWithProgress} />);

    // Create a mock file
    const file = new File(['file content'], 'test.mp4', { type: 'video/mp4' });

    // Mock the file input change event
    const fileInput = screen.getByTestId('file-input');
    Object.defineProperty(fileInput, 'files', {
      value: [file],
    });

    fireEvent.change(fileInput);

    // Click upload button
    const uploadButton = screen.getByText('Upload');
    fireEvent.click(uploadButton);

    // Check if progress bar is displayed
    await waitFor(() => {
      expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
    });
  });

  test('allows removing selected files', () => {
    render(<MediaUploader onUpload={mockOnUpload} />);

    // Create a mock file
    const file = new File(['file content'], 'test.mp4', { type: 'video/mp4' });

    // Mock the file input change event
    const fileInput = screen.getByTestId('file-input');
    Object.defineProperty(fileInput, 'files', {
      value: [file],
    });

    fireEvent.change(fileInput);

    // Check if the file is displayed
    expect(screen.getByText('test.mp4')).toBeInTheDocument();

    // Click remove button
    const removeButton = screen.getByLabelText('Remove file');
    fireEvent.click(removeButton);

    // Check if the file is removed
    expect(screen.queryByText('test.mp4')).not.toBeInTheDocument();
  });
});
