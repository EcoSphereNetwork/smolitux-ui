import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Toast } from '../Toast';

describe('Toast Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders correctly with default props', () => {
    render(<Toast message="Test message" />);
    
    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByTestId('toast')).toHaveClass('bg-white');
  });
  
  test('renders with different variants', () => {
    const { rerender } = render(<Toast message="Info toast" variant="info" />);
    expect(screen.getByTestId('toast')).toHaveClass('bg-blue-50');
    
    rerender(<Toast message="Success toast" variant="success" />);
    expect(screen.getByTestId('toast')).toHaveClass('bg-green-50');
    
    rerender(<Toast message="Warning toast" variant="warning" />);
    expect(screen.getByTestId('toast')).toHaveClass('bg-yellow-50');
    
    rerender(<Toast message="Error toast" variant="error" />);
    expect(screen.getByTestId('toast')).toHaveClass('bg-red-50');
  });
  
  test('renders with custom className', () => {
    render(<Toast message="Custom toast" className="custom-toast" />);
    expect(screen.getByTestId('toast')).toHaveClass('custom-toast');
  });
  
  test('renders with title', () => {
    render(<Toast message="Message" title="Toast Title" />);
    expect(screen.getByText('Toast Title')).toBeInTheDocument();
  });
  
  test('renders with icon', () => {
    render(<Toast message="Message with icon" icon={<span data-testid="custom-icon">🔔</span>} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
  
  test('closes when close button is clicked', () => {
    const onClose = jest.fn();
    render(<Toast message="Closable toast" onClose={onClose} />);
    
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  
  test('auto-closes after duration', () => {
    const onClose = jest.fn();
    render(<Toast message="Auto-close toast" duration={3000} onClose={onClose} />);
    
    act(() => {
      jest.advanceTimersByTime(3000);
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
  });
});