import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Toast } from '../Toast';

describe('Toast Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders correctly with default props', () => {
    render(<Toast message="Test message" />);
    
    expect(screen.getByTestId('toast-message')).toHaveTextContent('Test message');
    expect(screen.getByTestId('toast')).toHaveAttribute('data-type', 'info');
  });
  
  test('renders with different types', () => {
    const { rerender } = render(<Toast message="Info toast" type="info" />);
    expect(screen.getByTestId('toast')).toHaveClass('bg-blue-50');
    expect(screen.getByTestId('toast-info-icon')).toBeInTheDocument();
    
    rerender(<Toast message="Success toast" type="success" />);
    expect(screen.getByTestId('toast')).toHaveClass('bg-green-50');
    expect(screen.getByTestId('toast-success-icon')).toBeInTheDocument();
    
    rerender(<Toast message="Warning toast" type="warning" />);
    expect(screen.getByTestId('toast')).toHaveClass('bg-yellow-50');
    expect(screen.getByTestId('toast-warning-icon')).toBeInTheDocument();
    
    rerender(<Toast message="Error toast" type="error" />);
    expect(screen.getByTestId('toast')).toHaveClass('bg-red-50');
    expect(screen.getByTestId('toast-error-icon')).toBeInTheDocument();
  });
  
  test('renders with custom className', () => {
    render(<Toast message="Custom toast" className="custom-toast" />);
    expect(screen.getByTestId('toast')).toHaveClass('custom-toast');
  });
  
  test('renders with title', () => {
    render(<Toast message="Message" title="Toast Title" />);
    expect(screen.getByTestId('toast-title')).toHaveTextContent('Toast Title');
  });
  
  test('renders with custom icon', () => {
    render(<Toast message="Message with icon" icon={<span data-testid="custom-icon">🔔</span>} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
  
  test('closes when close button is clicked', () => {
    const onClose = jest.fn();
    render(<Toast message="Closable toast" onClose={onClose} />);
    
    const closeButton = screen.getByTestId('toast-close-button');
    fireEvent.click(closeButton);
    
    // Warten auf die Animation
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  
  test('auto-closes after duration', () => {
    const onClose = jest.fn();
    render(<Toast message="Auto-close toast" duration={3000} onClose={onClose} />);
    
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    // Warten auf die Animation
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  
  test('does not auto-close if duration is 0', () => {
    const onClose = jest.fn();
    render(<Toast message="Persistent toast" duration={0} onClose={onClose} />);
    
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    
    expect(onClose).not.toHaveBeenCalled();
  });
  
  test('renders with action button', () => {
    const handleAction = jest.fn();
    render(
      <Toast 
        message="Toast with action" 
        actions={
          <button onClick={handleAction} data-testid="action-button">Undo</button>
        }
      />
    );
    
    expect(screen.getByTestId('toast-actions')).toBeInTheDocument();
    const actionButton = screen.getByTestId('action-button');
    fireEvent.click(actionButton);
    
    expect(handleAction).toHaveBeenCalledTimes(1);
  });
  
  test('renders with different positions', () => {
    const { rerender } = render(<Toast message="Top-right toast" position="top-right" />);
    expect(screen.getByTestId('toast')).toHaveClass('top-4 right-4');
    
    rerender(<Toast message="Top-left toast" position="top-left" />);
    expect(screen.getByTestId('toast')).toHaveClass('top-4 left-4');
    
    rerender(<Toast message="Bottom-right toast" position="bottom-right" />);
    expect(screen.getByTestId('toast')).toHaveClass('bottom-4 right-4');
    
    rerender(<Toast message="Bottom-left toast" position="bottom-left" />);
    expect(screen.getByTestId('toast')).toHaveClass('bottom-4 left-4');
    
    rerender(<Toast message="Top-center toast" position="top-center" />);
    expect(screen.getByTestId('toast')).toHaveClass('top-4 left-1/2');
    
    rerender(<Toast message="Bottom-center toast" position="bottom-center" />);
    expect(screen.getByTestId('toast')).toHaveClass('bottom-4 left-1/2');
  });
  
  test('renders progress bar when duration is set', () => {
    render(<Toast message="Toast with progress" duration={5000} />);
    
    expect(screen.getByTestId('toast-progress')).toBeInTheDocument();
    expect(screen.getByTestId('toast-progress')).toHaveAttribute('role', 'progressbar');
  });
  
  test('does not render progress bar when duration is 0', () => {
    render(<Toast message="Toast without progress" duration={0} />);
    
    expect(screen.queryByTestId('toast-progress')).not.toBeInTheDocument();
  });
  
  test('renders with custom data-testid', () => {
    render(<Toast message="Custom testid" data-testid="custom-toast" />);
    
    expect(screen.getByTestId('custom-toast')).toBeInTheDocument();
    expect(screen.getByTestId('custom-toast-message')).toHaveTextContent('Custom testid');
  });
  
  test('does not render icon when showIcon is false', () => {
    render(<Toast message="No icon" showIcon={false} />);
    
    expect(screen.queryByTestId('toast-icon-container')).not.toBeInTheDocument();
  });
  
  test('does not render close button when showCloseButton is false', () => {
    render(<Toast message="No close button" showCloseButton={false} />);
    
    expect(screen.queryByTestId('toast-close-button')).not.toBeInTheDocument();
  });
  
  test('closes immediately when animateOut is false', () => {
    const onClose = jest.fn();
    render(<Toast message="No animation" animateOut={false} onClose={onClose} />);
    
    const closeButton = screen.getByTestId('toast-close-button');
    fireEvent.click(closeButton);
    
    // Sollte sofort geschlossen werden, ohne auf Animation zu warten
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});