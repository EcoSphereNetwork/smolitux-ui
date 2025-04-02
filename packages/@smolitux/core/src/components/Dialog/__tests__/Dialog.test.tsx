import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from '../Dialog';
import { Button } from '../../Button/Button';

describe('Dialog', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
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

  it('calls onClose when cancel button is clicked', () => {
    render(
      <Dialog isOpen={true} onClose={mockOnClose}>
        Dialog Content
      </Dialog>
    );
    
    const cancelButton = screen.getByText('Abbrechen');
    fireEvent.click(cancelButton);
    
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

  it('focuses the initialFocusRef element when opened', async () => {
    const TestComponent = () => {
      const initialRef = React.useRef<HTMLButtonElement>(null);
      const [isOpen, setIsOpen] = React.useState(false);
      
      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
          <Dialog 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)} 
            initialFocusRef={initialRef}
          >
            <div>
              <button>First Button</button>
              <button ref={initialRef}>Focus Me</button>
            </div>
          </Dialog>
        </>
      );
    };
    
    render(<TestComponent />);
    
    // Open the dialog
    await userEvent.click(screen.getByText('Open Dialog'));
    
    // Wait for the focus to be set
    await waitFor(() => {
      expect(document.activeElement?.textContent).toBe('Focus Me');
    });
  });

  it('returns focus to the trigger element when closed', async () => {
    const TestComponent = () => {
      const triggerRef = React.useRef<HTMLButtonElement>(null);
      const [isOpen, setIsOpen] = React.useState(false);
      
      return (
        <>
          <Button ref={triggerRef} onClick={() => setIsOpen(true)}>Open Dialog</Button>
          <Dialog 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)}
            returnFocusOnClose={true}
          >
            <div>Dialog Content</div>
          </Dialog>
        </>
      );
    };
    
    render(<TestComponent />);
    
    const openButton = screen.getByText('Open Dialog');
    
    // Open the dialog
    await userEvent.click(openButton);
    
    // Close the dialog
    const cancelButton = screen.getByText('Abbrechen');
    await userEvent.click(cancelButton);
    
    // Wait for the focus to return to the trigger
    await waitFor(() => {
      expect(document.activeElement).toBe(openButton);
    });
  });

  it('renders with different motion presets', () => {
    const { rerender } = render(
      <Dialog isOpen={true} onClose={mockOnClose} motionPreset="fade">
        Dialog Content
      </Dialog>
    );

    // Verify that the dialog renders with the fade motion preset
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();

    rerender(
      <Dialog isOpen={true} onClose={mockOnClose} motionPreset="scale">
        Dialog Content
      </Dialog>
    );

    // Verify that the dialog still renders after motion preset change
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();

    rerender(
      <Dialog isOpen={true} onClose={mockOnClose} motionPreset="slide-from-top">
        Dialog Content
      </Dialog>
    );

    // Verify that the dialog still renders after motion preset change
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });
});