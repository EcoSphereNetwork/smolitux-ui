import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ToastProvider } from '../ToastProvider';
import { useToast } from '../ToastProvider';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

// Test-Komponente, die den useToast-Hook verwendet
const TestComponent = () => {
  const { addToast, removeAllToasts } = useToast();
  
  const handleAddSuccessToast = () => {
    addToast({
      title: 'Success',
      message: 'Operation successful',
      type: 'success',
      duration: 3000,
    });
  };
  
  const handleAddErrorToast = () => {
    addToast({
      title: 'Error',
      message: 'Something went wrong',
      type: 'error',
      duration: 3000,
    });
  };
  
  const handleClearToasts = () => {
    removeAllToasts();
  };
  
  return (
    <div>
      <button onClick={handleAddSuccessToast}>Add Success Toast</button>
      <button onClick={handleAddErrorToast}>Add Error Toast</button>
      <button onClick={handleClearToasts}>Clear All Toasts</button>
    </div>
  );
};

describe('ToastProvider', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
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

  it('allows adding toasts', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    const addSuccessButton = screen.getByText('Add Success Toast');
    fireEvent.click(addSuccessButton);
    
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Operation successful')).toBeInTheDocument();
  });

  it('allows adding multiple toasts', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    const addSuccessButton = screen.getByText('Add Success Toast');
    const addErrorButton = screen.getByText('Add Error Toast');
    
    fireEvent.click(addSuccessButton);
    fireEvent.click(addErrorButton);
    
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Operation successful')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('removes toasts after duration', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    const addSuccessButton = screen.getByText('Add Success Toast');
    fireEvent.click(addSuccessButton);
    
    expect(screen.getByText('Success')).toBeInTheDocument();
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    // Toast should be removed
    expect(screen.queryByText('Success')).not.toBeInTheDocument();
  });

  it('allows clearing all toasts', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    const addSuccessButton = screen.getByText('Add Success Toast');
    const addErrorButton = screen.getByText('Add Error Toast');
    const clearButton = screen.getByText('Clear All Toasts');
    
    fireEvent.click(addSuccessButton);
    fireEvent.click(addErrorButton);
    
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    
    fireEvent.click(clearButton);
    
    expect(screen.queryByText('Success')).not.toBeInTheDocument();
    expect(screen.queryByText('Error')).not.toBeInTheDocument();
  });

  it('respects the limit prop', () => {
    render(
      <ToastProvider limit={2}>
        <TestComponent />
      </ToastProvider>
    );
    
    const addSuccessButton = screen.getByText('Add Success Toast');
    const addErrorButton = screen.getByText('Add Error Toast');
    
    // Add 3 toasts
    fireEvent.click(addSuccessButton);
    fireEvent.click(addErrorButton);
    fireEvent.click(addSuccessButton);
    
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
    
    const addSuccessButton = screen.getByText('Add Success Toast');
    fireEvent.click(addSuccessButton);
    
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bottom-4 left-1/2 -translate-x-1/2');
  });

  it('allows closing individual toasts', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    const addSuccessButton = screen.getByText('Add Success Toast');
    const addErrorButton = screen.getByText('Add Error Toast');
    
    fireEvent.click(addSuccessButton);
    fireEvent.click(addErrorButton);
    
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    
    // Close the success toast
    const closeButtons = screen.getAllByLabelText('Close');
    fireEvent.click(closeButtons[0]);
    
    // Success toast should be removed, but error toast should remain
    expect(screen.queryByText('Success')).not.toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
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