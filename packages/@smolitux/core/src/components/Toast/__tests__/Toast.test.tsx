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
    jest.useRealTimers();
  });

  it('renders correctly with default props', () => {
    render(<Toast message="Test message" isOpen={true} />);
    
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(<Toast title="Test Title" message="Test message" isOpen={true} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders with different types', () => {
    const { rerender } = render(<Toast message="Test message" type="success" isOpen={true} />);
    
    let toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-success-100');
    
    rerender(<Toast message="Test message" type="error" isOpen={true} />);
    toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-error-100');
    
    rerender(<Toast message="Test message" type="warning" isOpen={true} />);
    toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-warning-100');
    
    rerender(<Toast message="Test message" type="info" isOpen={true} />);
    toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-info-100');
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Toast 
        message="Test message" 
        isOpen={true} 
        onClose={handleClose}
        showCloseButton={true}
      />
    );
    
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalled();
  });

  it('auto-closes after duration', () => {
    const handleClose = jest.fn();
    render(
      <Toast 
        message="Test message" 
        isOpen={true} 
        onClose={handleClose}
        duration={3000}
      />
    );
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    expect(handleClose).toHaveBeenCalled();
  });

  it('does not auto-close when duration is 0', () => {
    const handleClose = jest.fn();
    render(
      <Toast 
        message="Test message" 
        isOpen={true} 
        onClose={handleClose}
        duration={0}
      />
    );
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('renders with icon when showIcon is true', () => {
    render(
      <Toast 
        message="Test message" 
        isOpen={true} 
        showIcon={true}
        type="success"
      />
    );
    
    expect(screen.getByTestId('toast-icon')).toBeInTheDocument();
  });

  it('renders with custom icon', () => {
    render(
      <Toast 
        message="Test message" 
        isOpen={true} 
        icon={<span data-testid="custom-icon">🔔</span>}
      />
    );
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders with actions', () => {
    render(
      <Toast 
        message="Test message" 
        isOpen={true} 
        actions={<button data-testid="action-button">Action</button>}
      />
    );
    
    expect(screen.getByTestId('action-button')).toBeInTheDocument();
  });

  it('applies position class correctly', () => {
    const { rerender } = render(
      <Toast message="Test message" isOpen={true} position="top-right" />
    );
    
    let toast = screen.getByRole('alert');
    expect(toast).toHaveClass('top-4 right-4');
    
    rerender(<Toast message="Test message" isOpen={true} position="top-left" />);
    toast = screen.getByRole('alert');
    expect(toast).toHaveClass('top-4 left-4');
    
    rerender(<Toast message="Test message" isOpen={true} position="bottom-right" />);
    toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bottom-4 right-4');
    
    rerender(<Toast message="Test message" isOpen={true} position="bottom-left" />);
    toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bottom-4 left-4');
    
    rerender(<Toast message="Test message" isOpen={true} position="top-center" />);
    toast = screen.getByRole('alert');
    expect(toast).toHaveClass('top-4 left-1/2 -translate-x-1/2');
    
    rerender(<Toast message="Test message" isOpen={true} position="bottom-center" />);
    toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bottom-4 left-1/2 -translate-x-1/2');
  });

  it('applies animation classes when animateOut is true', () => {
    render(
      <Toast 
        message="Test message" 
        isOpen={true} 
        animateOut={true}
      />
    );
    
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('animate-fade-in');
  });

  it('does not render when isOpen is false', () => {
    render(<Toast message="Test message" isOpen={false} />);
    
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <Toast 
        message="Test message" 
        isOpen={true} 
        className="custom-toast"
      />
    );
    
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('custom-toast');
  });

  it('forwards ref to div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Toast message="Test message" isOpen={true} ref={ref} />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });

  it('resets auto-close timer when toast is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Toast 
        message="Test message" 
        isOpen={true} 
        onClose={handleClose}
        duration={3000}
      />
    );
    
    // Advance time a bit
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    
    // Click the toast
    const toast = screen.getByRole('alert');
    fireEvent.click(toast);
    
    // Advance time a bit more, but not enough for the full duration
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    
    // onClose should not have been called yet
    expect(handleClose).not.toHaveBeenCalled();
    
    // Advance time to complete the new duration
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    
    // Now onClose should have been called
    expect(handleClose).toHaveBeenCalled();
  });
});