import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Modal } from '../';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('Modal.A11y', () => {
  // Setze NODE_ENV auf 'test' für die Tests
  const originalNodeEnv = process.env.NODE_ENV;
  
  beforeAll(() => {
    process.env.NODE_ENV = 'test';
  });

  afterAll(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  test('renders with default props when open', () => {
    render(
      <Modal.A11y isOpen={true} onClose={jest.fn()} title="Test Modal">
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
    expect(screen.getByTestId('modal-close-button')).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    const { container } = render(
      <Modal.A11y isOpen={false} onClose={jest.fn()} title="Test Modal">
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    // Überprüfe, ob der Container leer ist oder der Modal nicht sichtbar ist
    expect(container.querySelector('[style="display: none;"]')).toBeTruthy();
  });

  test('has no accessibility violations', async () => {
    const { container } = render(
      <Modal.A11y 
        isOpen={true} 
        onClose={jest.fn()} 
        title="Accessible Modal"
        ariaLabel="Test modal dialog"
        description="This is a test modal dialog"
      >
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('has proper ARIA attributes', () => {
    render(
      <Modal.A11y 
        isOpen={true} 
        onClose={jest.fn()} 
        title="Accessible Modal"
        ariaLabel="Test modal dialog"
        description="This is a test modal dialog"
        id="test-modal"
      >
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    const modal = screen.getByTestId('modal-content');
    expect(modal).toHaveAttribute('role', 'dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-label', 'Test modal dialog');
    expect(modal).toHaveAttribute('id', 'test-modal');
    
    // Überprüfe, ob der Titel vorhanden ist
    const title = screen.getByText('Accessible Modal');
    expect(title).toBeInTheDocument();
    
    // Überprüfe die Beschreibung
    const description = screen.getByText('This is a test modal dialog');
    expect(description).toHaveClass('sr-only');
  });

  test('handles close button click', () => {
    const handleClose = jest.fn();
    render(
      <Modal.A11y isOpen={true} onClose={handleClose} title="Test Modal">
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    const closeButton = screen.getByTestId('modal-close-button');
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('handles overlay click', () => {
    const handleClose = jest.fn();
    render(
      <Modal.A11y 
        isOpen={true} 
        onClose={handleClose} 
        title="Test Modal"
        closeOnOverlayClick={true}
      >
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('does not close on overlay click when closeOnOverlayClick is false', () => {
    const handleClose = jest.fn();
    render(
      <Modal.A11y 
        isOpen={true} 
        onClose={handleClose} 
        title="Test Modal"
        closeOnOverlayClick={false}
      >
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    
    expect(handleClose).not.toHaveBeenCalled();
  });

  test('handles escape key press', () => {
    const handleClose = jest.fn();
    render(
      <Modal.A11y 
        isOpen={true} 
        onClose={handleClose} 
        title="Test Modal"
        closeOnEsc={true}
      >
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('does not close on escape key press when closeOnEsc is false', () => {
    const handleClose = jest.fn();
    render(
      <Modal.A11y 
        isOpen={true} 
        onClose={handleClose} 
        title="Test Modal"
        closeOnEsc={false}
      >
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(handleClose).not.toHaveBeenCalled();
  });

  test('renders confirm and cancel buttons when enabled', () => {
    const handleConfirm = jest.fn();
    const handleCancel = jest.fn();
    
    render(
      <Modal.A11y 
        isOpen={true} 
        onClose={jest.fn()} 
        title="Test Modal"
        showConfirmButton={true}
        showCancelButton={true}
        confirmButtonText="Confirm Test"
        cancelButtonText="Cancel Test"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      >
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    const confirmButton = screen.getByTestId('modal-confirm-button');
    const cancelButton = screen.getByTestId('modal-cancel-button');
    
    expect(confirmButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(confirmButton).toHaveTextContent('Confirm Test');
    expect(cancelButton).toHaveTextContent('Cancel Test');
    
    fireEvent.click(confirmButton);
    expect(handleConfirm).toHaveBeenCalledTimes(1);
    
    fireEvent.click(cancelButton);
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  test('renders with different sizes', () => {
    const { rerender } = render(
      <Modal.A11y 
        isOpen={true} 
        onClose={jest.fn()} 
        title="Small Modal"
        size="sm"
      >
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    let modal = screen.getByTestId('modal-content');
    expect(modal).toHaveClass('max-w-sm');
    
    rerender(
      <Modal.A11y 
        isOpen={true} 
        onClose={jest.fn()} 
        title="Large Modal"
        size="lg"
      >
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    modal = screen.getByTestId('modal-content');
    expect(modal).toHaveClass('max-w-lg');
  });

  test('renders with different positions', () => {
    const { rerender } = render(
      <Modal.A11y 
        isOpen={true} 
        onClose={jest.fn()} 
        title="Centered Modal"
        position="center"
      >
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    let overlay = screen.getByTestId('modal-overlay');
    expect(overlay).toHaveClass('items-center');
    expect(overlay).toHaveClass('justify-center');
    
    rerender(
      <Modal.A11y 
        isOpen={true} 
        onClose={jest.fn()} 
        title="Top Modal"
        position="top"
      >
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    overlay = screen.getByTestId('modal-overlay');
    expect(overlay).toHaveClass('items-start');
    expect(overlay).toHaveClass('justify-center');
  });

  test('renders with custom footer', () => {
    render(
      <Modal.A11y 
        isOpen={true} 
        onClose={jest.fn()} 
        title="Modal with Custom Footer"
        footer={<button>Custom Footer Button</button>}
      >
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    expect(screen.getByText('Custom Footer Button')).toBeInTheDocument();
  });

  test('renders as alert dialog when specified', () => {
    render(
      <Modal.A11y 
        isOpen={true} 
        onClose={jest.fn()} 
        title="Alert Dialog"
        isAlertDialog={true}
      >
        <p>Alert content</p>
      </Modal.A11y>
    );
    
    const modal = screen.getByTestId('modal-content');
    expect(modal).toHaveAttribute('role', 'alertdialog');
  });

  test('handles busy state correctly', () => {
    render(
      <Modal.A11y 
        isOpen={true} 
        onClose={jest.fn()} 
        title="Busy Modal"
        busy={true}
      >
        <p>Loading content...</p>
      </Modal.A11y>
    );
    
    const modal = screen.getByTestId('modal-content');
    expect(modal).toHaveAttribute('aria-busy', 'true');
  });

  test('renders live region for announcements', () => {
    render(
      <Modal.A11y 
        isOpen={true} 
        onClose={jest.fn()} 
        title="Announced Modal"
        announceOnOpen={true}
        openAnnouncement="Modal has been opened"
        liveRegionPoliteness="assertive"
      >
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    // Überprüfe, ob die Ankündigung im DOM vorhanden ist
    const liveRegion = screen.getByText('Modal has been opened');
    expect(liveRegion).toBeInTheDocument();
  });

  test('applies animation classes when animated', () => {
    render(
      <Modal.A11y 
        isOpen={true} 
        onClose={jest.fn()} 
        title="Animated Modal"
        animated={true}
        animation="fade"
      >
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    const modal = screen.getByTestId('modal-content');
    expect(modal).toHaveClass('animate-fade-in');
  });

  test('does not apply animation classes when not animated', () => {
    render(
      <Modal.A11y 
        isOpen={true} 
        onClose={jest.fn()} 
        title="Non-Animated Modal"
        animated={false}
        animation="fade"
      >
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    const modal = screen.getByTestId('modal-content');
    expect(modal).not.toHaveClass('animate-fade-in');
  });

  test('applies effect classes correctly', () => {
    render(
      <Modal.A11y 
        isOpen={true} 
        onClose={jest.fn()} 
        title="Styled Modal"
        shadow={true}
        rounded={true}
        bordered={true}
        transparent={false}
        hoverable={true}
        focusable={true}
        transition={true}
      >
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    const modal = screen.getByTestId('modal-content');
    expect(modal).toHaveClass('shadow-lg');
    expect(modal).toHaveClass('rounded-lg');
    expect(modal).toHaveClass('border');
    expect(modal).toHaveClass('bg-white');
    expect(modal).toHaveClass('hover:shadow-xl');
    expect(modal).toHaveClass('focus:outline-none');
    expect(modal).toHaveClass('transition-all');
  });

  test('does not render header when showHeader is false', () => {
    render(
      <Modal.A11y 
        isOpen={true} 
        onClose={jest.fn()} 
        title="Hidden Header Modal"
        showHeader={false}
      >
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    expect(screen.queryByText('Hidden Header Modal')).not.toBeInTheDocument();
  });

  test('does not render footer when showFooter is false', () => {
    render(
      <Modal.A11y 
        isOpen={true} 
        onClose={jest.fn()} 
        title="No Footer Modal"
        showFooter={false}
      >
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    // Überprüfe, ob kein Footer vorhanden ist
    const footerElements = document.querySelectorAll('.border-t');
    expect(footerElements.length).toBe(0);
  });

  test('applies custom class names', () => {
    render(
      <Modal.A11y 
        isOpen={true} 
        onClose={jest.fn()} 
        title="Custom Classes Modal"
        className="custom-modal"
        headerClassName="custom-header"
        bodyClassName="custom-body"
        footerClassName="custom-footer"
        overlayClassName="custom-overlay"
      >
        <p>Modal content</p>
      </Modal.A11y>
    );
    
    const modal = screen.getByTestId('modal-content');
    const overlay = screen.getByTestId('modal-overlay');
    const body = screen.getByTestId('modal-body');
    
    expect(modal).toHaveClass('custom-modal');
    expect(overlay).toHaveClass('custom-overlay');
    expect(body).toHaveClass('custom-body');
  });
});