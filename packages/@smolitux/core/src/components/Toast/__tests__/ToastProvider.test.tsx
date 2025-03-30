import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ToastProvider, useToast } from '../ToastProvider';

// Test-Komponente, die den useToast-Hook verwendet
const TestComponent = () => {
  const toast = useToast();
  
  return (
    <div>
      <button data-testid="show-info" onClick={() => toast.info('Info Toast')}>Show Info</button>
      <button data-testid="show-success" onClick={() => toast.success('Success Toast')}>Show Success</button>
      <button data-testid="show-warning" onClick={() => toast.warning('Warning Toast')}>Show Warning</button>
      <button data-testid="show-error" onClick={() => toast.error('Error Toast')}>Show Error</button>
      <button data-testid="show-custom" onClick={() => toast.show({ message: 'Custom Toast', title: 'Custom' })}>Show Custom</button>
      <button data-testid="close-all" onClick={() => toast.closeAll()}>Close All</button>
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

  test('renders toast when info is called', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    // Klick auf "Show Info" Button
    fireEvent.click(screen.getByTestId('show-info'));
    
    // Toast sollte angezeigt werden
    expect(screen.getByText('Info Toast')).toBeInTheDocument();
    const toast = screen.getByText('Info Toast').closest('[role="alert"]');
    expect(toast).toHaveAttribute('data-type', 'info');
  });

  test('renders different toast types', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    // Success Toast anzeigen
    fireEvent.click(screen.getByTestId('show-success'));
    expect(screen.getByText('Success Toast')).toBeInTheDocument();
    const successToast = screen.getByText('Success Toast').closest('[role="alert"]');
    expect(successToast).toHaveAttribute('data-type', 'success');
    
    // Warning Toast anzeigen
    fireEvent.click(screen.getByTestId('show-warning'));
    expect(screen.getByText('Warning Toast')).toBeInTheDocument();
    const warningToast = screen.getByText('Warning Toast').closest('[role="alert"]');
    expect(warningToast).toHaveAttribute('data-type', 'warning');
    
    // Error Toast anzeigen
    fireEvent.click(screen.getByTestId('show-error'));
    expect(screen.getByText('Error Toast')).toBeInTheDocument();
    const errorToast = screen.getByText('Error Toast').closest('[role="alert"]');
    expect(errorToast).toHaveAttribute('data-type', 'error');
  });

  test('renders custom toast with title', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    // Custom Toast anzeigen
    fireEvent.click(screen.getByTestId('show-custom'));
    
    expect(screen.getByText('Custom')).toBeInTheDocument();
    expect(screen.getByText('Custom Toast')).toBeInTheDocument();
  });

  test('closes toast after duration', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    // Toast anzeigen
    fireEvent.click(screen.getByTestId('show-info'));
    expect(screen.getByText('Info Toast')).toBeInTheDocument();
    
    // Zeit voranschreiten lassen (Standard-Dauer ist 5000ms)
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    // Warten auf die Animation
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // Toast sollte nicht mehr angezeigt werden
    expect(screen.queryByText('Info Toast')).not.toBeInTheDocument();
  });

  test('closes all toasts when closeAll is called', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    // Mehrere Toasts anzeigen
    fireEvent.click(screen.getByTestId('show-info'));
    fireEvent.click(screen.getByTestId('show-success'));
    
    // Beide Toasts sollten angezeigt werden
    expect(screen.getByText('Info Toast')).toBeInTheDocument();
    expect(screen.getByText('Success Toast')).toBeInTheDocument();
    
    // Alle Toasts schließen
    fireEvent.click(screen.getByTestId('close-all'));
    
    // Keine Toasts sollten mehr angezeigt werden
    expect(screen.queryByText('Info Toast')).not.toBeInTheDocument();
    expect(screen.queryByText('Success Toast')).not.toBeInTheDocument();
  });

  test('limits the number of toasts shown', () => {
    render(
      <ToastProvider limit={2}>
        <TestComponent />
      </ToastProvider>
    );
    
    // Drei Toasts anzeigen
    fireEvent.click(screen.getByTestId('show-info'));
    fireEvent.click(screen.getByTestId('show-success'));
    fireEvent.click(screen.getByTestId('show-warning'));
    
    // Nur die neuesten zwei sollten angezeigt werden
    expect(screen.queryByText('Info Toast')).not.toBeInTheDocument();
    expect(screen.getByText('Success Toast')).toBeInTheDocument();
    expect(screen.getByText('Warning Toast')).toBeInTheDocument();
  });

  test('renders with custom position', () => {
    render(
      <ToastProvider position="bottom-center">
        <TestComponent />
      </ToastProvider>
    );
    
    // Toast anzeigen
    fireEvent.click(screen.getByTestId('show-info'));
    
    // Toast sollte die angegebene Position haben
    const toast = screen.getByText('Info Toast').closest('[role="alert"]');
    expect(toast).toHaveClass('bottom-4 left-1/2');
  });

  test('renders with custom data-testid', () => {
    render(
      <ToastProvider data-testid="custom-provider">
        <TestComponent />
      </ToastProvider>
    );
    
    expect(screen.getByTestId('custom-provider')).toBeInTheDocument();
    
    // Toast anzeigen
    fireEvent.click(screen.getByTestId('show-info'));
    
    // Toast sollte den angepassten testid haben
    const toast = screen.getByText('Info Toast').closest('[role="alert"]');
    expect(toast.getAttribute('data-testid')).toMatch(/^custom-provider-toast-/);
  });

  test('throws error when useToast is used outside provider', () => {
    // Fehler-Spy
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Komponente, die useToast außerhalb des Providers verwendet
    const InvalidComponent = () => {
      const toast = useToast();
      return <div />;
    };
    
    // Erwarten, dass ein Fehler geworfen wird
    expect(() => {
      render(<InvalidComponent />);
    }).toThrow('useToast must be used within a ToastProvider');
    
    // Spy zurücksetzen
    consoleErrorSpy.mockRestore();
  });
});