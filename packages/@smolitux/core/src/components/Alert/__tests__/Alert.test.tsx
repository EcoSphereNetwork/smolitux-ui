import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from '../Alert';

describe('Alert Component', () => {
  test('renders correctly with default props', () => {
    render(<Alert type="info" message="Test message" />);
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-50');
  });
  
  test('renders with title', () => {
    render(<Alert type="info" title="Test Title" message="Test message" />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });
  
  test('renders with different types', () => {
    const { rerender } = render(<Alert type="success" message="Success message" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-green-50');
    
    rerender(<Alert type="error" message="Error message" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-red-50');
    
    rerender(<Alert type="warning" message="Warning message" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-yellow-50');
    
    rerender(<Alert type="info" message="Info message" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-50');
  });
  
  test('renders without icon when showIcon is false', () => {
    render(<Alert type="info" message="Test message" showIcon={false} />);
    
    // Prüfen, ob kein SVG vorhanden ist
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
  
  test('renders close button when closable is true', () => {
    render(<Alert type="info" message="Test message" closable />);
    
    expect(screen.getByTestId('alert-close-button')).toBeInTheDocument();
  });
  
  test('calls onClose when close button is clicked', async () => {
    const handleClose = jest.fn();
    render(<Alert type="info" message="Test message" closable onClose={handleClose} />);
    
    await userEvent.click(screen.getByTestId('alert-close-button'));
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
  
  test('calls onClose when Escape key is pressed', () => {
    const handleClose = jest.fn();
    render(<Alert type="info" message="Test message" closable onClose={handleClose} />);
    
    fireEvent.keyDown(screen.getByRole('alert'), { key: 'Escape' });
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
  
  test('auto-closes after specified time', async () => {
    jest.useFakeTimers();
    const handleClose = jest.fn();
    
    render(<Alert type="info" message="Test message" autoClose={500} onClose={handleClose} />);
    
    expect(handleClose).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(600);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
    
    jest.useRealTimers();
  });
  
  test('renders with children', () => {
    render(
      <Alert type="info" message="Test message">
        <button>Action Button</button>
      </Alert>
    );
    
    expect(screen.getByRole('button', { name: /action button/i })).toBeInTheDocument();
  });
  
  test('sets correct aria attributes for accessibility', () => {
    render(<Alert type="error" title="Error Title" message="Error message" id="test-alert" />);
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('id', 'test-alert');
    expect(alert).toHaveAttribute('aria-labelledby', 'test-alert-title');
    expect(alert).toHaveAttribute('aria-describedby', 'test-alert-message');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });
  
  test('focuses alert when autoFocus is true', () => {
    render(<Alert type="info" message="Test message" autoFocus />);
    
    expect(screen.getByRole('alert')).toHaveFocus();
  });
  
  test('renders with ReactNode as message', () => {
    render(
      <Alert 
        type="info" 
        message={<span data-testid="custom-message">Custom Message</span>} 
      />
    );
    
    expect(screen.getByTestId('custom-message')).toBeInTheDocument();
  });
});