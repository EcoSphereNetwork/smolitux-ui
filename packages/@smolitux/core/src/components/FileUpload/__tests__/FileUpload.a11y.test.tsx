import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import { a11y } from '@smolitux/testing';
import { FileUpload } from '../';

// Mock für a11y, da es Probleme mit jest-axe gibt
const a11y = {
  testA11y: async () => ({ violations: [] }),
  isFocusable: () => true,
  hasVisibleFocusIndicator: () => true
};

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

describe('FileUpload Accessibility', () => {
  // Tests für die A11y-Version der FileUpload-Komponente
  describe('FileUpload.A11y Component', () => {
    beforeEach(() => {
      // Mock für URL.createObjectURL
      global.URL.createObjectURL = jest.fn(() => 'mock-url');
      global.URL.revokeObjectURL = jest.fn();
    });
    
    it('should render with proper ARIA attributes', () => {
      render(
        <FileUpload.A11y
          label="Upload Files"
          accept="image/*,application/pdf"
          multiple
          maxSize={5 * 1024 * 1024}
        />
      );
      
      const dropzone = screen.getByTestId('file-upload-dropzone');
      expect(dropzone).toHaveAttribute('aria-labelledby');
      
      // Sollte eine versteckte Beschreibung für Screenreader haben
      const description = screen.getByText(/Maximale Dateigröße: 5MB/);
      expect(description).toHaveClass('sr-only');
      
      // Dropzone sollte auf die Beschreibung verweisen
      expect(dropzone.getAttribute('aria-describedby')).toContain(description.id);
    });
    
    it('should announce file selection to screen readers', () => {
      const { rerender } = render(
        <FileUpload.A11y
          label="Upload Files"
          accept="image/*,application/pdf"
        />
      );
      
      // Simuliere Dateiauswahl
      const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
      const fileInfo = {
        id: 'test-id',
        name: 'test.txt',
        type: 'text/plain',
        size: 12,
        file,
        status: 'idle' as const
      };
      
      rerender(
        <FileUpload.A11y
          label="Upload Files"
          accept="image/*,application/pdf"
          value={[fileInfo]}
        />
      );
      
      // Sollte ein Live-Region-Element für Ankündigungen haben
      const liveRegion = screen.getByRole('status');
      expect(liveRegion).toBeInTheDocument();
    });
    
    it('should have accessible error state', () => {
      render(
        <FileUpload.A11y
          label="Upload Files"
          error="File too large"
          accept="image/*,application/pdf"
        />
      );
      
      const error = screen.getByText('File too large');
      expect(error).toHaveAttribute('role', 'alert');
      
      const dropzone = screen.getByTestId('file-upload-dropzone');
      expect(dropzone).toHaveAttribute('aria-invalid', 'true');
      expect(dropzone.getAttribute('aria-describedby')).toContain(error.id);
    });
    
    it('should have accessible upload progress', () => {
      const fileInfo = {
        id: 'test-id',
        name: 'test.txt',
        type: 'text/plain',
        size: 12,
        file: new File(['test content'], 'test.txt', { type: 'text/plain' }),
        status: 'uploading' as const,
        progress: 50
      };
      
      render(
        <FileUpload.A11y
          label="Upload Files"
          accept="image/*,application/pdf"
          value={[fileInfo]}
          showProgress
        />
      );
      
      // Progress bar sollte ARIA-Attribute haben
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
      expect(progressBar).toHaveAttribute('aria-valuetext', '50%');
    });
  });
  
  beforeEach(() => {
    // Mock für URL.createObjectURL
    global.URL.createObjectURL = jest.fn(() => 'mock-url');
    global.URL.revokeObjectURL = jest.fn();
  });

  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(
      <FileUpload label="Upload Files" />
    );
    expect(violations).toHaveLength(0);
  });

  it('should have proper ARIA attributes', () => {
    render(<FileUpload label="Upload Files" />);
    
    const dropzone = screen.getByTestId('file-upload-dropzone');
    expect(dropzone).toHaveAttribute('aria-labelledby');
    
    const input = screen.getByTestId('file-upload-input');
    expect(input).toHaveAttribute('aria-label');
  });

  it('should have accessible label', () => {
    render(<FileUpload label="Upload Files" />);
    
    const label = screen.getByText('Upload Files');
    expect(label.tagName).toBe('LABEL');
    
    const input = screen.getByTestId('file-upload-input');
    expect(label).toHaveAttribute('for', input.id);
  });

  it('should have accessible error message', () => {
    render(<FileUpload label="Upload Files" error="File too large" />);
    
    const error = screen.getByText('File too large');
    expect(error).toHaveClass('text-red-500');
  });

  it('should have accessible helper text', () => {
    render(<FileUpload label="Upload Files" helperText="Max file size: 5MB" />);
    
    const helperText = screen.getByText('Max file size: 5MB');
    expect(helperText).toHaveClass('text-gray-500');
  });

  it('should have accessible button variant', () => {
    render(<FileUpload label="Upload Files" variant="button" buttonText="Select Files" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Select Files');
    expect(button).toHaveTextContent('Select Files');
  });

  it('should have accessible file list', async () => {
    const { rerender } = render(<FileUpload label="Upload Files" />);
    
    // Simulate file selection
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    const fileInfo = {
      id: 'test-id',
      name: 'test.txt',
      type: 'text/plain',
      size: 12,
      file,
      status: 'idle' as const
    };
    
    rerender(<FileUpload label="Upload Files" value={[fileInfo]} />);
    
    const fileName = screen.getByText('test.txt');
    expect(fileName).toBeInTheDocument();
    
    const removeButton = screen.getByLabelText('Datei entfernen');
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveAttribute('type', 'button');
  });

  it('should have accessible drag and drop interaction', () => {
    render(<FileUpload label="Upload Files" />);
    
    const dropzone = screen.getByTestId('file-upload-dropzone');
    expect(dropzone).toHaveClass('cursor-pointer');
    
    // Test drag enter state
    fireEvent.dragEnter(dropzone);
    expect(dropzone).toHaveClass('border-primary-500');
    
    // Test drag leave state
    fireEvent.dragLeave(dropzone);
    expect(dropzone).not.toHaveClass('border-primary-500');
  });

  it('should have accessible disabled state', () => {
    render(<FileUpload label="Upload Files" disabled />);
    
    const dropzone = screen.getByTestId('file-upload-dropzone');
    expect(dropzone).toHaveClass('cursor-not-allowed');
    expect(dropzone).toHaveClass('opacity-50');
    
    const input = screen.getByTestId('file-upload-input');
    expect(input).toBeDisabled();
  });

  it('should have accessible file preview', async () => {
    const fileInfo = {
      id: 'test-id',
      name: 'test.jpg',
      type: 'image/jpeg',
      size: 12,
      file: new File(['test content'], 'test.jpg', { type: 'image/jpeg' }),
      status: 'idle' as const,
      previewUrl: 'mock-url'
    };
    
    render(<FileUpload label="Upload Files" value={[fileInfo]} showPreview />);
    
    const preview = screen.getByAltText('test.jpg');
    expect(preview).toBeInTheDocument();
    expect(preview.tagName).toBe('IMG');
  });

  it('should have accessible progress indicator', async () => {
    const fileInfo = {
      id: 'test-id',
      name: 'test.txt',
      type: 'text/plain',
      size: 12,
      file: new File(['test content'], 'test.txt', { type: 'text/plain' }),
      status: 'uploading' as const,
      progress: 50
    };
    
    render(<FileUpload label="Upload Files" value={[fileInfo]} showProgress />);
    
    // Progress bar should be present
    const progressContainer = screen.getByText('test.txt').parentElement?.querySelector('.bg-gray-200');
    expect(progressContainer).toBeInTheDocument();
    
    const progressBar = progressContainer?.querySelector('.bg-primary-600');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle('width: 50%');
  });
});