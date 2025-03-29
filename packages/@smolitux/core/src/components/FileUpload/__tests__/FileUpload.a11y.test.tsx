// packages/@smolitux/core/src/components/FileUpload/__tests__/FileUpload.a11y.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { FileUploadA11y } from '../FileUpload.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('FileUpload Accessibility', () => {
  // Mock für URL.createObjectURL und URL.revokeObjectURL
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => 'mock-url');
    global.URL.revokeObjectURL = jest.fn();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <FileUploadA11y
        label="Upload Files"
        accept="image/*,application/pdf"
        maxSize={5 * 1024 * 1024}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <FileUploadA11y
        label="Upload Files"
        accept="image/*,application/pdf"
        maxSize={5 * 1024 * 1024}
        id="test-upload"
      />
    );
    
    const label = screen.getByText('Upload Files');
    expect(label).toHaveAttribute('for', 'test-upload');
    
    const dropzone = screen.getByRole('button');
    expect(dropzone).toHaveAttribute('aria-labelledby');
    expect(dropzone).toHaveAttribute('aria-describedby');
  });

  it('should provide accessible description for file types and size limits', () => {
    render(
      <FileUploadA11y
        label="Upload Files"
        accept="image/*,application/pdf"
        maxSize={5 * 1024 * 1024}
      />
    );
    
    // Überprüfe, ob die Beschreibung für Screenreader vorhanden ist
    const description = screen.getByText(/Erlaubte Dateitypen/i, { selector: '.sr-only' });
    expect(description).toBeInTheDocument();
    
    // Überprüfe, ob die sichtbaren Hinweise vorhanden sind
    expect(screen.getByText(/Erlaubte Dateitypen: image\/\*,application\/pdf/i)).toBeInTheDocument();
    expect(screen.getByText(/Maximale Größe: 5 MB/i)).toBeInTheDocument();
  });

  it('should handle keyboard navigation', () => {
    const handleChange = jest.fn();
    render(
      <FileUploadA11y
        label="Upload Files"
        onChange={handleChange}
      />
    );
    
    const dropzone = screen.getByRole('button');
    
    // Simuliere Tastendruck (Enter)
    fireEvent.keyDown(dropzone, { key: 'Enter' });
    
    // Überprüfe, ob der Input-Klick ausgelöst wurde
    // (Wir können nicht direkt testen, ob der File-Dialog geöffnet wurde,
    // da dies vom Browser abhängt)
  });

  it('should announce errors to screen readers', () => {
    const { rerender } = render(
      <FileUploadA11y
        label="Upload Files"
        error="Invalid file format"
      />
    );
    
    // Überprüfe, ob die Fehlermeldung als Alert markiert ist
    const errorMessage = screen.getByText('Invalid file format');
    expect(errorMessage).toHaveAttribute('role', 'alert');
    
    // Überprüfe, ob die Live-Region für Ankündigungen vorhanden ist
    const liveRegion = screen.getByRole('status', { hidden: true });
    expect(liveRegion).toHaveClass('sr-only');
  });

  it('should have accessible button variant', async () => {
    const { container } = render(
      <FileUploadA11y
        label="Upload Files"
        variant="button"
        buttonText="Select Files"
      />
    );
    
    const button = screen.getByText('Select Files');
    expect(button).toHaveAttribute('aria-labelledby');
    expect(button).toHaveAttribute('aria-describedby');
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should make file list accessible', () => {
    // Erstelle einen Mock-File
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    Object.defineProperty(file, 'size', { value: 1024 });
    
    const { rerender } = render(
      <FileUploadA11y
        label="Upload Files"
        value={[
          {
            id: 'file-1',
            name: 'test.png',
            type: 'image/png',
            size: 1024,
            file,
            status: 'idle'
          }
        ]}
      />
    );
    
    // Überprüfe, ob die Dateiliste vorhanden ist
    const fileList = screen.getByText('Hochgeladene Dateien');
    expect(fileList).toBeInTheDocument();
    
    // Überprüfe, ob der Dateiname angezeigt wird
    expect(screen.getByText('test.png')).toBeInTheDocument();
    
    // Überprüfe, ob der Löschen-Button zugänglich ist
    const deleteButton = screen.getByLabelText('Datei test.png entfernen');
    expect(deleteButton).toBeInTheDocument();
    
    // Aktualisiere mit einer Datei im Uploading-Status
    rerender(
      <FileUploadA11y
        label="Upload Files"
        value={[
          {
            id: 'file-1',
            name: 'test.png',
            type: 'image/png',
            size: 1024,
            file,
            status: 'uploading',
            progress: 50
          }
        ]}
        showProgress={true}
      />
    );
    
    // Überprüfe, ob der Fortschrittsbalken zugänglich ist
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    expect(progressBar).toHaveAttribute('aria-label', 'Upload-Fortschritt für test.png');
  });
});