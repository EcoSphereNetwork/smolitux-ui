import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ToastProvider, useToast } from '../ToastProvider';

// Test-Komponente, die den useToast-Hook verwendet
const TestComponent = () => {
  const toast = useToast();
  
  return (
    <div>
      <button onClick={() => toast.show({ message: 'Info Toast' })}>Show Info</button>
      <button onClick={() => toast.show({ message: 'Success Toast', variant: 'success' })}>Show Success</button>
      <button onClick={() => toast.show({ message: 'Warning Toast', variant: 'warning' })}>Show Warning</button>
      <button onClick={() => toast.show({ message: 'Error Toast', variant: 'error' })}>Show Error</button>
      <button onClick={() => toast.close()}>Close All</button>
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

  test('renders toast when show is called', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    // Klick auf "Show Info" Button
    fireEvent.click(screen.getByText('Show Info'));
    
    // Toast sollte angezeigt werden
    expect(screen.getByText('Info Toast')).toBeInTheDocument();
  });

  test('renders different toast variants', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    // Success Toast anzeigen
    fireEvent.click(screen.getByText('Show Success'));
    expect(screen.getByText('Success Toast')).toBeInTheDocument();
    
    // Warning Toast anzeigen
    fireEvent.click(screen.getByText('Show Warning'));
    expect(screen.getByText('Warning Toast')).toBeInTheDocument();
    
    // Error Toast anzeigen
    fireEvent.click(screen.getByText('Show Error'));
    expect(screen.getByText('Error Toast')).toBeInTheDocument();
  });

  test('closes toast after duration', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    // Toast anzeigen
    fireEvent.click(screen.getByText('Show Info'));
    expect(screen.getByText('Info Toast')).toBeInTheDocument();
    
    // Zeit voranschreiten lassen (Standard-Dauer ist 5000ms)
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    // Toast sollte nicht mehr angezeigt werden
    expect(screen.queryByText('Info Toast')).not.toBeInTheDocument();
  });

  test('closes all toasts when close is called', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    // Mehrere Toasts anzeigen
    fireEvent.click(screen.getByText('Show Info'));
    fireEvent.click(screen.getByText('Show Success'));
    
    // Beide Toasts sollten angezeigt werden
    expect(screen.getByText('Info Toast')).toBeInTheDocument();
    expect(screen.getByText('Success Toast')).toBeInTheDocument();
    
    // Alle Toasts schließen
    fireEvent.click(screen.getByText('Close All'));
    
    // Keine Toasts sollten mehr angezeigt werden
    expect(screen.queryByText('Info Toast')).not.toBeInTheDocument();
    expect(screen.queryByText('Success Toast')).not.toBeInTheDocument();
  });
});