import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from './Alert';

describe('Alert Component', () => {
  test('renders alert with message', () => {
    render(<Alert type="info" message="Test message" />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  test('renders alert with title and message', () => {
    render(<Alert type="info" title="Test Title" message="Test message" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  test('renders alert with different types', () => {
    const { rerender } = render(<Alert type="success" message="Success message" />);
    expect(screen.getByRole('alert')).toHaveAttribute('data-type', 'success');

    rerender(<Alert type="error" message="Error message" />);
    expect(screen.getByRole('alert')).toHaveAttribute('data-type', 'error');

    rerender(<Alert type="warning" message="Warning message" />);
    expect(screen.getByRole('alert')).toHaveAttribute('data-type', 'warning');

    rerender(<Alert type="info" message="Info message" />);
    expect(screen.getByRole('alert')).toHaveAttribute('data-type', 'info');
  });

  test('renders alert with different variants', () => {
    const { rerender } = render(<Alert type="info" message="Default variant" />);
    expect(screen.getByRole('alert')).toHaveAttribute('data-variant', 'default');

    rerender(<Alert type="info" message="Outline variant" variant="outline" />);
    expect(screen.getByRole('alert')).toHaveAttribute('data-variant', 'outline');

    rerender(<Alert type="info" message="Filled variant" variant="filled" />);
    expect(screen.getByRole('alert')).toHaveAttribute('data-variant', 'filled');

    rerender(<Alert type="info" message="Subtle variant" variant="subtle" />);
    expect(screen.getByRole('alert')).toHaveAttribute('data-variant', 'subtle');
  });

  test('renders alert with icon', () => {
    render(<Alert type="info" message="With icon" showIcon={true} />);
    expect(screen.getByRole('alert').querySelector('svg')).toBeInTheDocument();
  });

  test('renders alert without icon', () => {
    render(<Alert type="info" message="Without icon" showIcon={false} />);
    expect(screen.getByRole('alert').querySelector('svg')).toBeNull();
  });

  test('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<Alert type="info" message="Closable alert" closable onClose={handleClose} />);
    
    const closeButton = screen.getByTestId('alert-close-button');
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('renders alert with actions', () => {
    const handleAction1 = jest.fn();
    const handleAction2 = jest.fn();
    
    render(
      <Alert 
        type="info" 
        message="Alert with actions" 
        actions={[
          { label: 'Action 1', onClick: handleAction1 },
          { label: 'Action 2', onClick: handleAction2, variant: 'primary' }
        ]}
      />
    );
    
    const action1Button = screen.getByText('Action 1');
    const action2Button = screen.getByText('Action 2');
    
    expect(action1Button).toBeInTheDocument();
    expect(action2Button).toBeInTheDocument();
    
    fireEvent.click(action1Button);
    expect(handleAction1).toHaveBeenCalledTimes(1);
    
    fireEvent.click(action2Button);
    expect(handleAction2).toHaveBeenCalledTimes(1);
  });

  test('auto-closes after specified time', async () => {
    jest.useFakeTimers();
    const handleClose = jest.fn();
    
    render(<Alert type="info" message="Auto-close alert" autoClose={1000} onClose={handleClose} />);
    
    expect(handleClose).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
    
    jest.useRealTimers();
  });

  test('closes on Escape key press', () => {
    const handleClose = jest.fn();
    render(<Alert type="info" message="Escape to close" onClose={handleClose} />);
    
    fireEvent.keyDown(screen.getByRole('alert'), { key: 'Escape' });
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('renders with custom className', () => {
    render(<Alert type="info" message="Custom class" className="custom-class" />);
    expect(screen.getByRole('alert')).toHaveClass('custom-class');
  });

  test('renders with compact style', () => {
    render(<Alert type="info" message="Compact alert" compact />);
    expect(screen.getByRole('alert')).toHaveClass('p-3');
  });

  test('renders with shadow', () => {
    render(<Alert type="info" message="Shadow alert" shadow />);
    expect(screen.getByRole('alert')).toHaveClass('shadow-md');
  });

  test('renders without border', () => {
    render(<Alert type="info" message="No border alert" bordered={false} />);
    expect(screen.getByRole('alert')).not.toHaveClass('border');
  });

  test('renders without rounded corners', () => {
    render(<Alert type="info" message="No rounded corners alert" rounded={false} />);
    expect(screen.getByRole('alert')).not.toHaveClass('rounded-lg');
  });

  test('renders with description for screenreader', () => {
    render(
      <Alert 
        type="info" 
        message="Alert with description" 
        description="This is a detailed description for screenreaders"
      />
    );
    
    expect(screen.getByText('This is a detailed description for screenreaders')).toBeInTheDocument();
    expect(screen.getByText('This is a detailed description for screenreaders')).toHaveClass('sr-only');
  });
});