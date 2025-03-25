import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../Modal';

// Mock für createPortal
jest.mock('react-dom', () => {
  const originalModule = jest.requireActual('react-dom');
  return {
    ...originalModule,
    createPortal: (node: React.ReactNode) => node,
  };
});

describe('Modal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnOpen = jest.fn();
  const mockOnClosed = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders correctly when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
  
  test('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );
    
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
  
  test('calls onClose when close button is clicked', async () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );
    
    await userEvent.click(screen.getByRole('button', { name: /close/i }));
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  
  test('calls onClose when overlay is clicked and closeOnOverlayClick is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} closeOnOverlayClick={true}>
        <p>Modal Content</p>
      </Modal>
    );
    
    // Klick auf das Overlay (das erste div mit aria-hidden="true")
    fireEvent.click(screen.getByRole('dialog').querySelector('[aria-hidden="true"]')!);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  
  test('does not call onClose when overlay is clicked and closeOnOverlayClick is false', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} closeOnOverlayClick={false}>
        <p>Modal Content</p>
      </Modal>
    );
    
    // Klick auf das Overlay (das erste div mit aria-hidden="true")
    fireEvent.click(screen.getByRole('dialog').querySelector('[aria-hidden="true"]')!);
    
    expect(mockOnClose).not.toHaveBeenCalled();
  });
  
  test('calls onClose when Escape key is pressed and closeOnEsc is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} closeOnEsc={true}>
        <p>Modal Content</p>
      </Modal>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  
  test('does not call onClose when Escape key is pressed and closeOnEsc is false', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} closeOnEsc={false}>
        <p>Modal Content</p>
      </Modal>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(mockOnClose).not.toHaveBeenCalled();
  });
  
  test('renders with footer when provided', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={mockOnClose} 
        title="Test Modal"
        footer={<button>Save</button>}
      >
        <p>Modal Content</p>
      </Modal>
    );
    
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
  
  test('renders with different sizes', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={mockOnClose} size="sm">
        <p>Small Modal</p>
      </Modal>
    );
    
    expect(screen.getByRole('dialog').querySelector('[tabindex="-1"]')).toHaveClass('max-w-sm');
    
    rerender(
      <Modal isOpen={true} onClose={mockOnClose} size="lg">
        <p>Large Modal</p>
      </Modal>
    );
    
    expect(screen.getByRole('dialog').querySelector('[tabindex="-1"]')).toHaveClass('max-w-lg');
  });
  
  test('renders with different positions', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={mockOnClose} position="top">
        <p>Top Modal</p>
      </Modal>
    );
    
    expect(screen.getByRole('dialog').querySelector('.flex')).toHaveClass('items-start');
    
    rerender(
      <Modal isOpen={true} onClose={mockOnClose} position="bottom">
        <p>Bottom Modal</p>
      </Modal>
    );
    
    expect(screen.getByRole('dialog').querySelector('.flex')).toHaveClass('items-end');
  });
  
  test('renders without close button when showCloseButton is false', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal" showCloseButton={false}>
        <p>Modal Content</p>
      </Modal>
    );
    
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });
  
  test('renders with custom className', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} className="custom-class">
        <p>Modal Content</p>
      </Modal>
    );
    
    expect(screen.getByRole('dialog').querySelector('[tabindex="-1"]')).toHaveClass('custom-class');
  });
  
  test('renders with custom ID', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} id="custom-modal-id">
        <p>Modal Content</p>
      </Modal>
    );
    
    expect(screen.getByRole('dialog').querySelector('[tabindex="-1"]')).toHaveAttribute('id', 'custom-modal-id');
  });
  
  test('calls onOpen when modal is opened with animation', async () => {
    jest.useFakeTimers();
    
    render(
      <Modal isOpen={true} onClose={mockOnClose} onOpen={mockOnOpen} animated={true}>
        <p>Modal Content</p>
      </Modal>
    );
    
    jest.advanceTimersByTime(300);
    
    expect(mockOnOpen).toHaveBeenCalledTimes(1);
    
    jest.useRealTimers();
  });
  
  test('calls onClosed when modal is closed with animation', async () => {
    jest.useFakeTimers();
    
    const { rerender } = render(
      <Modal isOpen={true} onClose={mockOnClose} onClosed={mockOnClosed} animated={true}>
        <p>Modal Content</p>
      </Modal>
    );
    
    rerender(
      <Modal isOpen={false} onClose={mockOnClose} onClosed={mockOnClosed} animated={true}>
        <p>Modal Content</p>
      </Modal>
    );
    
    jest.advanceTimersByTime(300);
    
    expect(mockOnClosed).toHaveBeenCalledTimes(1);
    
    jest.useRealTimers();
  });
});