import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Toast } from '../Toast';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('Toast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders correctly with default props', () => {
    render(<Toast message="Test message" isOpen />);
    
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(<Toast title="Test Title" message="Test message" isOpen />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders with different types', () => {
    const { rerender } = render(<Toast message="Success toast" type="success" isOpen />);
    expect(screen.getByRole('alert')).toHaveClass('bg-green-100');
    
    rerender(<Toast message="Error toast" type="error" isOpen />);
    expect(screen.getByRole('alert')).toHaveClass('bg-red-100');
    
    rerender(<Toast message="Warning toast" type="warning" isOpen />);
    expect(screen.getByRole('alert')).toHaveClass('bg-yellow-100');
    
    rerender(<Toast message="Info toast" type="info" isOpen />);
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-100');
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<Toast message="Test message" onClose={handleClose} showCloseButton isOpen />);
    
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose after duration', () => {
    const handleClose = jest.fn();
    render(<Toast message="Test message" duration={2000} onClose={handleClose} isOpen />);
    
    expect(handleClose).not.toHaveBeenCalled();
    
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose if duration is 0', () => {
    const handleClose = jest.fn();
    render(<Toast message="Test message" duration={0} onClose={handleClose} isOpen />);
    
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('renders with icon when showIcon is true', () => {
    render(<Toast message="Test message" showIcon isOpen />);
    
    expect(screen.getByTestId('toast-icon')).toBeInTheDocument();
  });

  it('renders with custom icon', () => {
    render(
      <Toast 
        message="Test message" 
        icon={<span data-testid="custom-icon">🔔</span>} 
        isOpen 
      />
    );
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders with actions', () => {
    render(
      <Toast 
        message="Test message" 
        actions={<button data-testid="action-button">Action</button>} 
        isOpen 
      />
    );
    
    expect(screen.getByTestId('action-button')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<Toast message="Test message" className="custom-toast" isOpen />);
    
    expect(screen.getByRole('alert')).toHaveClass('custom-toast');
  });

  it('does not render when isOpen is false', () => {
    render(<Toast message="Test message" isOpen={false} />);
    
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('pauses timer when hovered', () => {
    const handleClose = jest.fn();
    render(<Toast message="Test message" duration={2000} onClose={handleClose} isOpen />);
    
    const toast = screen.getByRole('alert');
    
    // Hover over toast
    fireEvent.mouseEnter(toast);
    
    // Advance time
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    // onClose should not be called because timer is paused
    expect(handleClose).not.toHaveBeenCalled();
    
    // Mouse leave
    fireEvent.mouseLeave(toast);
    
    // Advance time again
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    // Now onClose should be called
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders with different positions', () => {
    const { rerender } = render(<Toast message="Test message" position="top-right" isOpen />);
    expect(screen.getByRole('alert')).toHaveClass('top-4 right-4');
    
    rerender(<Toast message="Test message" position="top-left" isOpen />);
    expect(screen.getByRole('alert')).toHaveClass('top-4 left-4');
    
    rerender(<Toast message="Test message" position="bottom-right" isOpen />);
    expect(screen.getByRole('alert')).toHaveClass('bottom-4 right-4');
    
    rerender(<Toast message="Test message" position="bottom-left" isOpen />);
    expect(screen.getByRole('alert')).toHaveClass('bottom-4 left-4');
    
    rerender(<Toast message="Test message" position="top-center" isOpen />);
    expect(screen.getByRole('alert')).toHaveClass('top-4 left-1/2 -translate-x-1/2');
    
    rerender(<Toast message="Test message" position="bottom-center" isOpen />);
    expect(screen.getByRole('alert')).toHaveClass('bottom-4 left-1/2 -translate-x-1/2');
  });

  it('applies animation classes when animateOut is true', () => {
    render(<Toast message="Test message" animateOut isOpen />);
    
    expect(screen.getByRole('alert')).toHaveClass('animate-fade-in');
  });

  it('has correct accessibility attributes', () => {
    render(<Toast message="Test message" type="error" isOpen />);
    
    const toast = screen.getByRole('alert');
    expect(toast).toHaveAttribute('aria-live', 'assertive');
  });
});