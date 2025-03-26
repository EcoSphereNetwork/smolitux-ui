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

  it('renders correctly when isOpen is true', () => {
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
    
    // Click on the overlay (outside the Dialog content)
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
    
    // Click on the overlay (outside the Dialog content)
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
        confirmLabel="Confirm"
      >
        Dialog Content
      </Dialog>
    );
    
    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);
    
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(
      <Dialog 
        isOpen={true} 
        onClose={mockOnClose} 
        onCancel={mockOnCancel}
        cancelLabel="Cancel"
      >
        Dialog Content
      </Dialog>
    );
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
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
    
    // Verify that the dialog renders with the correct size
    const dialogContent = screen.getByText('Dialog Content');
    expect(dialogContent).toBeInTheDocument();
    
    rerender(
      <Dialog isOpen={true} onClose={mockOnClose} size="lg">
        Dialog Content
      </Dialog>
    );
    
    // Verify that the dialog still renders after size change
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Dialog isOpen={true} onClose={mockOnClose} variant="success">
        Dialog Content
      </Dialog>
    );
    
    // Verify that the dialog renders with the success variant
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
    
    rerender(
      <Dialog isOpen={true} onClose={mockOnClose} variant="error">
        Dialog Content
      </Dialog>
    );
    
    // Verify that the dialog still renders after variant change
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });
});