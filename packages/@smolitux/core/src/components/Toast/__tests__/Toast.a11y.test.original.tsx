import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { a11y } from '@smolitux/testing';
import { Toast } from '../Toast';

describe('Toast Accessibility', () => {
  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(
      <Toast message="Test message" />
    );
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes for info toast', () => {
    render(<Toast type="info" message="Info message" />);
    
    const toast = screen.getByRole('alert');
    expect(toast).toHaveAttribute('aria-live', 'polite');
    expect(toast).toHaveAttribute('aria-atomic', 'true');
    expect(toast).toHaveAttribute('data-type', 'info');
  });

  it('should have correct ARIA attributes for error toast', () => {
    render(<Toast type="error" message="Error message" />);
    
    const toast = screen.getByRole('alert');
    expect(toast).toHaveAttribute('aria-live', 'assertive');
    expect(toast).toHaveAttribute('data-type', 'error');
  });

  it('should have correct ARIA attributes for warning toast', () => {
    render(<Toast type="warning" message="Warning message" />);
    
    const toast = screen.getByRole('alert');
    expect(toast).toHaveAttribute('aria-live', 'assertive');
    expect(toast).toHaveAttribute('data-type', 'warning');
  });

  it('should have correct ARIA attributes for success toast', () => {
    render(<Toast type="success" message="Success message" />);
    
    const toast = screen.getByRole('alert');
    expect(toast).toHaveAttribute('aria-live', 'polite');
    expect(toast).toHaveAttribute('data-type', 'success');
  });

  it('should have accessible title and message', () => {
    render(<Toast title="Test Title" message="Test message" />);
    
    const title = screen.getByText('Test Title');
    expect(title).toHaveAttribute('id', expect.stringMatching(/toast-title-/));
    
    const message = screen.getByText('Test message');
    expect(message.parentElement).toHaveAttribute('id', expect.stringMatching(/toast-message-/));
  });

  it('should have accessible close button', () => {
    render(<Toast message="Test message" showCloseButton />);
    
    const closeButton = screen.getByTestId('toast-close-button');
    expect(closeButton).toHaveAttribute('aria-label', 'Schließen');
    expect(closeButton).toHaveAttribute('type', 'button');
    
    // The SVG icon should be hidden from screen readers
    const svg = closeButton.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('should have accessible progress bar', () => {
    render(<Toast message="Test message" duration={5000} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    expect(progressBar).toHaveAttribute('aria-label', 'Automatisches Schließen');
  });

  it('should hide icons from screen readers', () => {
    render(<Toast message="Test message" showIcon />);
    
    const iconContainer = screen.getByText('Test message').parentElement?.previousSibling;
    expect(iconContainer).toHaveAttribute('aria-hidden', 'true');
  });

  it('should support keyboard interaction for close button', () => {
    const onClose = jest.fn();
    render(<Toast message="Test message" showCloseButton onClose={onClose} />);
    
    const closeButton = screen.getByTestId('toast-close-button');
    
    // Focus the button
    closeButton.focus();
    expect(document.activeElement).toBe(closeButton);
    
    // Press Enter to close
    fireEvent.keyDown(closeButton, { key: 'Enter' });
    fireEvent.keyUp(closeButton, { key: 'Enter' });
    expect(onClose).toHaveBeenCalled();
  });

  it('should have visible focus indicators', () => {
    render(<Toast message="Test message" showCloseButton />);
    
    const closeButton = screen.getByTestId('toast-close-button');
    closeButton.focus();
    
    expect(a11y.hasVisibleFocusIndicator(closeButton)).toBe(true);
  });

  it('should support actions with keyboard navigation', () => {
    const actionHandler = jest.fn();
    render(
      <Toast 
        message="Test message" 
        actions={
          <button 
            onClick={actionHandler}
            data-testid="toast-action-button"
          >
            Action
          </button>
        } 
      />
    );
    
    const actionButton = screen.getByTestId('toast-action-button');
    
    // Focus the button
    actionButton.focus();
    expect(document.activeElement).toBe(actionButton);
    
    // Press Enter to activate
    fireEvent.keyDown(actionButton, { key: 'Enter' });
    fireEvent.keyUp(actionButton, { key: 'Enter' });
    expect(actionHandler).toHaveBeenCalled();
  });
});