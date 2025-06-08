import React from 'react';
import * as ReactDOM from 'react-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('Modal Component', () => {
  // Mock für createPortal
  beforeAll(() => {
    jest
      .spyOn(ReactDOM, 'createPortal')
      .mockImplementation(
        (node: React.ReactNode) => node as unknown as React.ReactPortal
      );
  });

  afterAll(() => {
    (ReactDOM.createPortal as jest.Mock).mockRestore();
  });

  test('renders modal when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('does not render modal when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    const closeButton = screen.getByTestId('modal-close-button');
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when overlay is clicked and closeOnOverlayClick is true', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnOverlayClick={true} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when overlay is clicked and closeOnOverlayClick is false', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnOverlayClick={false} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);

    expect(handleClose).not.toHaveBeenCalled();
  });

  test('calls onClose when Escape key is pressed and closeOnEsc is true', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnEsc={true} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when Escape key is pressed and closeOnEsc is false', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnEsc={false} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(handleClose).not.toHaveBeenCalled();
  });

  test('renders footer buttons when footerButtons is true', () => {
    const handleCancel = jest.fn();
    const handleConfirm = jest.fn();
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Test Modal"
        footerButtons={true}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        cancelButtonText="Cancel Test"
        confirmButtonText="Confirm Test"
      >
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByText('Cancel Test')).toBeInTheDocument();
    expect(screen.getByText('Confirm Test')).toBeInTheDocument();
  });

  test('calls onCancel and onClose when cancel button is clicked', () => {
    const handleClose = jest.fn();
    const handleCancel = jest.fn();
    render(
      <Modal
        isOpen={true}
        onClose={handleClose}
        title="Test Modal"
        footerButtons={true}
        onCancel={handleCancel}
      >
        <p>Modal Content</p>
      </Modal>
    );

    const cancelButton = screen.getByText('Abbrechen');
    fireEvent.click(cancelButton);

    expect(handleCancel).toHaveBeenCalledTimes(1);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('calls onConfirm and onClose when confirm button is clicked', () => {
    const handleClose = jest.fn();
    const handleConfirm = jest.fn();
    render(
      <Modal
        isOpen={true}
        onClose={handleClose}
        title="Test Modal"
        footerButtons={true}
        onConfirm={handleConfirm}
      >
        <p>Modal Content</p>
      </Modal>
    );

    const confirmButton = screen.getByText('Bestätigen');
    fireEvent.click(confirmButton);

    expect(handleConfirm).toHaveBeenCalledTimes(1);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('renders with different sizes', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal" size="xs">
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByTestId('modal-content')).toHaveClass('max-w-xs');

    rerender(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal" size="lg">
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByTestId('modal-content')).toHaveClass('max-w-lg');
  });

  test('renders with different positions', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal" position="top">
        <p>Modal Content</p>
      </Modal>
    );

    const container = screen.getByTestId('modal-content').parentElement;
    expect(container).toHaveClass('items-start');

    rerender(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal" position="bottom">
        <p>Modal Content</p>
      </Modal>
    );

    expect(container).toHaveClass('items-end');
  });

  test('renders with custom width and height', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal" width="600px" height="400px">
        <p>Modal Content</p>
      </Modal>
    );

    const modalContent = screen.getByTestId('modal-content');
    expect(modalContent).toHaveStyle('width: 600px');
    expect(modalContent).toHaveStyle('height: 400px');
  });

  test('renders with correct dialog role for different types', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal" isAlertDialog={true}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();

    rerender(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal" isFormDialog={true}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  test('renders with custom animation type', async () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Test Modal"
        animated={true}
        animation="slide-up"
      >
        <p>Modal Content</p>
      </Modal>
    );

    // Warten auf Animation
    await waitFor(() => {
      expect(screen.getByTestId('modal-content')).toHaveClass('animate-slideInUp');
    });
  });

  test('allows focus to leave when trapFocus is false', async () => {
    render(
      <>
        <button data-testid="outside">outside</button>
        <Modal isOpen={true} onClose={() => {}} trapFocus={false}>
          <button data-testid="inside">inside</button>
        </Modal>
      </>
    );

    const inside = screen.getByTestId('inside');
    const outside = screen.getByTestId('outside');

    inside.focus();
    await userEvent.tab();

    expect(document.activeElement).toBe(outside);
  });
});
