import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dialog } from '../Dialog';

describe('Dialog', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(
      <Dialog isOpen={true} onClose={mockOnClose}>
        Dialog Content
      </Dialog>
    );
    
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Dialog isOpen={false} onClose={mockOnClose}>
        Dialog Content
      </Dialog>
    );
    
    expect(screen.queryByText('Dialog Content')).not.toBeInTheDocument();
  });

  it('renders with title', () => {
    render(
      <Dialog isOpen={true} onClose={mockOnClose} title="Dialog Title">
        Dialog Content
      </Dialog>
    );
    
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Dialog isOpen={true} onClose={mockOnClose}>
        Dialog Content
      </Dialog>
    );
    
    const closeButton = screen.getByLabelText('Schließen');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking on overlay if closeOnOverlayClick is true', () => {
    render(
      <Dialog isOpen={true} onClose={mockOnClose} closeOnOverlayClick={true}>
        Dialog Content
      </Dialog>
    );
    
    // Klick auf das Overlay (außerhalb des Dialog-Inhalts)
    const overlay = screen.getByTestId('dialog-overlay');
    fireEvent.click(overlay);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking on overlay if closeOnOverlayClick is false', () => {
    render(
      <Dialog isOpen={true} onClose={mockOnClose} closeOnOverlayClick={false}>
        Dialog Content
      </Dialog>
    );
    
    // Klick auf das Overlay (außerhalb des Dialog-Inhalts)
    const overlay = screen.getByTestId('dialog-overlay');
    fireEvent.click(overlay);
    
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('calls onConfirm when confirm button is clicked', () => {
    render(
      <Dialog 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm}
        confirmLabel="Bestätigen"
      >
        Dialog Content
      </Dialog>
    );
    
    const confirmButton = screen.getByText('Bestätigen');
    fireEvent.click(confirmButton);
    
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(
      <Dialog 
        isOpen={true} 
        onClose={mockOnClose} 
        onCancel={mockOnCancel}
        cancelLabel="Abbrechen"
      >
        Dialog Content
      </Dialog>
    );
    
    const cancelButton = screen.getByText('Abbrechen');
    fireEvent.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('renders with custom button labels', () => {
    render(
      <Dialog 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        confirmLabel="Ja, fortfahren"
        cancelLabel="Nein, abbrechen"
      >
        Dialog Content
      </Dialog>
    );
    
    expect(screen.getByText('Ja, fortfahren')).toBeInTheDocument();
    expect(screen.getByText('Nein, abbrechen')).toBeInTheDocument();
  });

  it('renders with custom footer buttons', () => {
    render(
      <Dialog 
        isOpen={true} 
        onClose={mockOnClose} 
        footerButtons={<button>Custom Button</button>}
      >
        Dialog Content
      </Dialog>
    );
    
    expect(screen.getByText('Custom Button')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Dialog isOpen={true} onClose={mockOnClose} size="sm">
        Dialog Content
      </Dialog>
    );
    
    let dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('max-w-sm');
    
    rerender(
      <Dialog isOpen={true} onClose={mockOnClose} size="lg">
        Dialog Content
      </Dialog>
    );
    
    dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('max-w-lg');
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Dialog isOpen={true} onClose={mockOnClose} variant="success">
        Dialog Content
      </Dialog>
    );
    
    let header = screen.getByTestId('dialog-header');
    expect(header).toHaveClass('bg-success-100');
    
    rerender(
      <Dialog isOpen={true} onClose={mockOnClose} variant="error">
        Dialog Content
      </Dialog>
    );
    
    header = screen.getByTestId('dialog-header');
    expect(header).toHaveClass('bg-error-100');
  });

  it('renders with icon', () => {
    render(
      <Dialog 
        isOpen={true} 
        onClose={mockOnClose} 
        icon={<span data-testid="custom-icon">🔔</span>}
      >
        Dialog Content
      </Dialog>
    );
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('traps focus within the dialog', () => {
    render(
      <Dialog isOpen={true} onClose={mockOnClose}>
        <button>Button 1</button>
        <button>Button 2</button>
      </Dialog>
    );
    
    // Überprüfen, ob der Fokus im Dialog ist
    expect(document.activeElement).toBeInTheDocument();
    expect(document.activeElement?.closest('[role="dialog"]')).toBeInTheDocument();
  });
});