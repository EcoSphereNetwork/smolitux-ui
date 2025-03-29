import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { a11y } from '@smolitux/testing';
import { Alert } from '../Alert';

describe('Alert Accessibility', () => {
  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(
      <Alert type="info" message="Test message" />
    );
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes for info alert', () => {
    render(<Alert type="info" message="Info message" id="test-alert" />);
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('id', 'test-alert');
    expect(alert).toHaveAttribute('aria-live', 'polite');
    expect(alert).toHaveAttribute('aria-describedby', 'test-alert-message');
    expect(alert).toHaveAttribute('data-type', 'info');
  });

  it('should have correct ARIA attributes for error alert', () => {
    render(<Alert type="error" message="Error message" id="test-alert" />);
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
    expect(alert).toHaveAttribute('data-type', 'error');
  });

  it('should have correct ARIA attributes with title', () => {
    render(
      <Alert 
        type="warning" 
        title="Warning Title" 
        message="Warning message" 
        id="test-alert" 
      />
    );
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-labelledby', 'test-alert-title');
    expect(alert).toHaveAttribute('aria-describedby', 'test-alert-message');
    
    const title = screen.getByText('Warning Title');
    expect(title).toHaveAttribute('id', 'test-alert-title');
    
    const message = screen.getByText('Warning message');
    expect(message.parentElement).toHaveAttribute('id', 'test-alert-message');
  });

  it('should support keyboard interaction for closing', () => {
    const onClose = jest.fn();
    render(
      <Alert 
        type="success" 
        message="Success message" 
        closable 
        onClose={onClose} 
      />
    );
    
    const closeButton = screen.getByTestId('alert-close-button');
    expect(closeButton).toHaveAttribute('aria-label', 'Schließen');
    
    // Test keyboard interaction
    fireEvent.keyDown(closeButton, { key: 'Enter' });
    expect(onClose).toHaveBeenCalledTimes(1);
    
    // Test Escape key on alert
    const alert = screen.getByRole('alert');
    fireEvent.keyDown(alert, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('should be focusable when autoFocus is true', () => {
    render(
      <Alert 
        type="info" 
        message="Info message" 
        autoFocus 
      />
    );
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('tabIndex', '0');
    
    // In a real browser, this would be focused automatically
    // We can't test document.activeElement in JSDOM reliably
  });

  it('should have accessible icons', () => {
    render(<Alert type="info" message="Info message" showIcon />);
    
    // All icons should have aria-hidden="true"
    const icons = screen.getAllByRole('img', { hidden: true });
    icons.forEach(icon => {
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('should have accessible close button', () => {
    render(<Alert type="info" message="Info message" closable />);
    
    const closeButton = screen.getByTestId('alert-close-button');
    expect(closeButton).toHaveAttribute('type', 'button');
    expect(closeButton).toHaveAttribute('aria-label', 'Schließen');
    
    // The "Close" text should be visually hidden but available to screen readers
    const srOnlyText = screen.getByText('Schließen');
    expect(srOnlyText).toHaveClass('sr-only');
    
    // The icon should be hidden from screen readers
    const closeIcon = closeButton.querySelector('svg');
    expect(closeIcon).toHaveAttribute('aria-hidden', 'true');
  });

  it('should have visible focus indicators', () => {
    render(<Alert type="info" message="Info message" closable />);
    
    const closeButton = screen.getByTestId('alert-close-button');
    closeButton.focus();
    
    expect(a11y.hasVisibleFocusIndicator(closeButton)).toBe(true);
  });
});