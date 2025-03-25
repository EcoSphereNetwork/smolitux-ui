import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ToastProvider } from '../ToastProvider';
import { useToast } from '../index';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

// Test-Komponente, die den useToast-Hook verwendet
const TestComponent = () => {
  const { addToast, removeAllToasts } = useToast();
  
  const showSuccessToast = () => {
    addToast({
      title: 'Success',
      message: 'Operation successful',
      type: 'success',
      duration: 3000
    });
  };
  
  const showErrorToast = () => {
    addToast({
      title: 'Error',
      message: 'Something went wrong',
      type: 'error',
      duration: 3000
    });
  };
  
  const clearAllToasts = () => {
    removeAllToasts();
  };
  
  return (
    <div>
      <button onClick={showSuccessToast}>Show Success</button>
      <button onClick={showErrorToast}>Show Error</button>
      <button onClick={clearAllToasts}>Clear All</button>
    </div>
  );
};

describe('ToastProvider', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders children correctly', () => {
    render(
      <ToastProvider>
        <div data-testid="test-child">Test Child</div>
      </ToastProvider>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('shows toast when addToast is called', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    fireEvent.click(screen.getByText('Show Success'));
    
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Operation successful')).toBeInTheDocument();
  });

  it('removes toast after duration', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    fireEvent.click(screen.getByText('Show Success'));
    
    expect(screen.getByText('Success')).toBeInTheDocument();
    
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    expect(screen.queryByText('Success')).not.toBeInTheDocument();
  });

  it('removes all toasts when removeAllToasts is called', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    // Show multiple toasts
    fireEvent.click(screen.getByText('Show Success'));
    fireEvent.click(screen.getByText('Show Error'));
    
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    
    // Clear all toasts
    fireEvent.click(screen.getByText('Clear All'));
    
    expect(screen.queryByText('Success')).not.toBeInTheDocument();
    expect(screen.queryByText('Error')).not.toBeInTheDocument();
  });

  it('respects the limit prop', () => {
    render(
      <ToastProvider limit={2}>
        <TestComponent />
      </ToastProvider>
    );
    
    // Show 3 toasts (exceeding the limit)
    fireEvent.click(screen.getByText('Show Success'));
    fireEvent.click(screen.getByText('Show Error'));
    fireEvent.click(screen.getByText('Show Success'));
    
    // Only the 2 most recent toasts should be visible
    const successToasts = screen.getAllByText('Success');
    const errorToasts = screen.getAllByText('Error');
    
    expect(successToasts).toHaveLength(1);
    expect(errorToasts).toHaveLength(1);
    expect(screen.getAllByRole('alert')).toHaveLength(2);
  });

  it('applies position to all toasts', () => {
    render(
      <ToastProvider position="bottom-center">
        <TestComponent />
      </ToastProvider>
    );
    
    fireEvent.click(screen.getByText('Show Success'));
    
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bottom-4');
    expect(toast).toHaveClass('left-1/2');
  });

  it('removes toast when close button is clicked', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    fireEvent.click(screen.getByText('Show Success'));
    
    expect(screen.getByText('Success')).toBeInTheDocument();
    
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    
    expect(screen.queryByText('Success')).not.toBeInTheDocument();
  });

  it('stacks multiple toasts correctly', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    // Show multiple toasts
    fireEvent.click(screen.getByText('Show Success'));
    fireEvent.click(screen.getByText('Show Error'));
    
    const toastContainer = screen.getByTestId('toast-container');
    const toasts = screen.getAllByRole('alert');
    
    expect(toastContainer).toBeInTheDocument();
    expect(toasts).toHaveLength(2);
    
    // Toasts should be stacked with the most recent on top
    expect(toasts[0].textContent).toContain('Error');
    expect(toasts[1].textContent).toContain('Success');
  });

  it('throws error when useToast is used outside of ToastProvider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useToast must be used within a ToastProvider');
    
    // Restore console.error
    console.error = originalError;
  });
});