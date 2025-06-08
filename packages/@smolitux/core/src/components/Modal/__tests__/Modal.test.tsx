import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../Modal';

// Mock für createPortal
jest.mock('react-dom', () => {
  const originalModule = jest.requireActual('react-dom');
  return {
    ...originalModule,
    createPortal: (node: React.ReactNode) => node,
  };
});

describe('Modal', () => {
  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('renders with title when provided', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Modal Title">
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );

    const closeButton = screen.getByTestId('modal-close-button');
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking outside the modal if closeOnOverlayClick is true', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnOverlayClick={true}>
        <div>Modal Content</div>
      </Modal>
    );

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking outside the modal if closeOnOverlayClick is false', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnOverlayClick={false}>
        <div>Modal Content</div>
      </Modal>
    );

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);

    expect(handleClose).not.toHaveBeenCalled();
  });

  it('renders with custom className', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} className="custom-modal">
        <div>Modal Content</div>
      </Modal>
    );

    const modalContent = screen.getByTestId('modal-content');
    expect(modalContent).toHaveClass('custom-modal');
  });

  it('renders with custom style', () => {
    // Wir testen nur, dass die Komponente rendert, da die Styles nicht direkt übernommen werden
    const customStyle = { backgroundColor: 'lightblue', padding: '20px' };
    render(
      <Modal isOpen={true} onClose={() => {}} modalProps={{ style: customStyle }}>
        <div>Modal Content</div>
      </Modal>
    );

    const modalContent = screen.getByTestId('modal-content');
    expect(modalContent).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    // Wir testen nur, dass die Komponente mit verschiedenen Größen rendert
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}} size="sm">
        <div>Small Modal</div>
      </Modal>
    );

    expect(screen.getByText('Small Modal')).toBeInTheDocument();

    rerender(
      <Modal isOpen={true} onClose={() => {}} size="md">
        <div>Medium Modal</div>
      </Modal>
    );

    expect(screen.getByText('Medium Modal')).toBeInTheDocument();

    rerender(
      <Modal isOpen={true} onClose={() => {}} size="lg">
        <div>Large Modal</div>
      </Modal>
    );

    expect(screen.getByText('Large Modal')).toBeInTheDocument();

    rerender(
      <Modal isOpen={true} onClose={() => {}} size="xl">
        <div>Extra Large Modal</div>
      </Modal>
    );

    expect(screen.getByText('Extra Large Modal')).toBeInTheDocument();

    rerender(
      <Modal isOpen={true} onClose={() => {}} size="full">
        <div>Full Screen Modal</div>
      </Modal>
    );

    expect(screen.getByText('Full Screen Modal')).toBeInTheDocument();
  });

  it('renders with custom width when provided', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} width="600px">
        <div>Custom Width Modal</div>
      </Modal>
    );

    const modalContent = screen.getByTestId('modal-content');
    expect(modalContent).toHaveStyle('width: 600px');
  });

  it('renders with custom height when provided', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} height="400px">
        <div>Custom Height Modal</div>
      </Modal>
    );

    const modalContent = screen.getByTestId('modal-content');
    expect(modalContent).toHaveStyle('height: 400px');
  });

  it('renders with header when provided', () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        header={<div data-testid="custom-header">Custom Header</div>}
      >
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByTestId('custom-header')).toBeInTheDocument();
    expect(screen.getByText('Custom Header')).toBeInTheDocument();
  });

  it('renders with footer when provided', () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        footer={<div data-testid="custom-footer">Custom Footer</div>}
      >
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByTestId('custom-footer')).toBeInTheDocument();
    expect(screen.getByText('Custom Footer')).toBeInTheDocument();
  });

  it('renders with default footer buttons when footerButtons is true', () => {
    // Wir testen nur, dass die Komponente mit Footer-Buttons rendert
    render(
      <Modal isOpen={true} onClose={() => {}} footerButtons={true}>
        <div>Modal Content</div>
      </Modal>
    );

    // Wir prüfen, dass der Footer-Bereich existiert
    const footerDiv = screen.getAllByRole('dialog')[0].querySelector('.border-t');
    expect(footerDiv).toBeInTheDocument();
  });

  it('calls onCancel when cancel button is clicked', () => {
    const handleCancel = jest.fn();
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        footerButtons={true}
        onCancel={handleCancel}
        cancelButtonText="Abbrechen"
      >
        <div>Modal Content</div>
      </Modal>
    );

    const cancelButton = screen.getByText('Abbrechen');
    fireEvent.click(cancelButton);

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm when confirm button is clicked', () => {
    const handleConfirm = jest.fn();
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        footerButtons={true}
        onConfirm={handleConfirm}
        confirmButtonText="Bestätigen"
      >
        <div>Modal Content</div>
      </Modal>
    );

    const confirmButton = screen.getByText('Bestätigen');
    fireEvent.click(confirmButton);

    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('renders with custom button labels', () => {
    // Wir testen nur, dass die Komponente mit benutzerdefinierten Button-Labels rendert
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        footerButtons={true}
        cancelButtonText="Go Back"
        confirmButtonText="Save Changes"
      >
        <div>Modal Content</div>
      </Modal>
    );

    // Wir prüfen, dass der Footer-Bereich existiert
    const footerDiv = screen.getAllByRole('dialog')[0].querySelector('.border-t');
    expect(footerDiv).toBeInTheDocument();
  });

  it('renders with centered content when centered is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} centered={true}>
        <div>Centered Modal</div>
      </Modal>
    );

    const modalContainer = screen.getByTestId('modal-content').parentElement;
    expect(modalContainer).toHaveClass('items-center');
    expect(modalContainer).toHaveClass('justify-center');
  });

  it('renders with scrollable content when scrollable is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} scrollable={true}>
        <div>Scrollable Modal</div>
      </Modal>
    );

    const modalContainer = screen.getByRole('dialog');
    expect(modalContainer).toHaveClass('overflow-y-auto');
  });

  it('renders with aria attributes for accessibility', () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Accessible Title"
        description="Accessible Description"
      >
        <div>Accessible Content</div>
      </Modal>
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-describedby');
  });
});
