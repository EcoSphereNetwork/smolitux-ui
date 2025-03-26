import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

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
    
    const closeButton = screen.getByRole('button', { name: /close/i });
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
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('custom-modal');
  });

  it('renders with custom style', () => {
    const customStyle = { backgroundColor: 'lightblue', padding: '20px' };
    render(
      <Modal isOpen={true} onClose={() => {}} style={customStyle}>
        <div>Modal Content</div>
      </Modal>
    );
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveStyle('background-color: lightblue');
    expect(modal).toHaveStyle('padding: 20px');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}} size="sm">
        <div>Small Modal</div>
      </Modal>
    );
    
    let modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('modal-sm');
    
    rerender(
      <Modal isOpen={true} onClose={() => {}} size="md">
        <div>Medium Modal</div>
      </Modal>
    );
    
    modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('modal-md');
    
    rerender(
      <Modal isOpen={true} onClose={() => {}} size="lg">
        <div>Large Modal</div>
      </Modal>
    );
    
    modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('modal-lg');
    
    rerender(
      <Modal isOpen={true} onClose={() => {}} size="xl">
        <div>Extra Large Modal</div>
      </Modal>
    );
    
    modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('modal-xl');
    
    rerender(
      <Modal isOpen={true} onClose={() => {}} size="full">
        <div>Full Screen Modal</div>
      </Modal>
    );
    
    modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('modal-full');
  });

  it('renders with custom width when provided', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} width="600px">
        <div>Custom Width Modal</div>
      </Modal>
    );
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveStyle('width: 600px');
  });

  it('renders with custom height when provided', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} height="400px">
        <div>Custom Height Modal</div>
      </Modal>
    );
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveStyle('height: 400px');
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
    render(
      <Modal isOpen={true} onClose={() => {}} footerButtons={true}>
        <div>Modal Content</div>
      </Modal>
    );
    
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
  });

  it('calls onCancel when cancel button is clicked', () => {
    const handleCancel = jest.fn();
    render(
      <Modal 
        isOpen={true} 
        onClose={() => {}} 
        footerButtons={true}
        onCancel={handleCancel}
      >
        <div>Modal Content</div>
      </Modal>
    );
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
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
      >
        <div>Modal Content</div>
      </Modal>
    );
    
    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmButton);
    
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('renders with custom button labels', () => {
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
    
    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  it('renders with centered content when centered is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} centered={true}>
        <div>Centered Modal</div>
      </Modal>
    );
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('modal-centered');
  });

  it('renders with scrollable content when scrollable is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} scrollable={true}>
        <div>Scrollable Modal</div>
      </Modal>
    );
    
    const modalBody = screen.getByTestId('modal-body');
    expect(modalBody).toHaveClass('modal-body-scrollable');
  });

  it('renders with aria attributes for accessibility', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={() => {}} 
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div id="modal-title">Accessible Title</div>
        <div id="modal-description">Accessible Description</div>
      </Modal>
    );
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
    expect(modal).toHaveAttribute('aria-describedby', 'modal-description');
  });
});