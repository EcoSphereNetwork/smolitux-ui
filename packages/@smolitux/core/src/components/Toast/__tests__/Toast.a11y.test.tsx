import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Toast } from '../Toast';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('Toast Accessibility', () => {
  it('should have no accessibility violations in basic state', async () => {
    const { container } = render(<Toast message="Test message" />);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with title and actions', async () => {
    const { container } = render(
      <Toast 
        title="Test Title" 
        message="Test message" 
        actions={<button>Action</button>}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
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
    
    const toast = screen.getByRole('alert');
    const title = screen.getByTestId('toast-title');
    const message = screen.getByTestId('toast-message');
    
    expect(toast).toHaveAttribute('aria-labelledby', title.id);
    expect(toast).toHaveAttribute('aria-describedby', message.id);
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
    
    const progressBar = screen.getByTestId('toast-progress');
    expect(progressBar).toHaveAttribute('role', 'progressbar');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    expect(progressBar).toHaveAttribute('aria-valuenow', '100');
    expect(progressBar).toHaveAttribute('aria-label', 'Automatisches Schließen');
  });

  it('should hide icons from screen readers', () => {
    render(<Toast message="Test message" showIcon />);
    
    const iconContainer = screen.getByTestId('toast-icon-container');
    expect(iconContainer).toHaveAttribute('aria-hidden', 'true');
  });

  it('should support keyboard navigation to close button', () => {
    render(<Toast message="Test message" showCloseButton />);
    
    const closeButton = screen.getByTestId('toast-close-button');
    
    // Focus the button
    closeButton.focus();
    expect(document.activeElement).toBe(closeButton);
    
    // Verify it has the correct attributes
    expect(closeButton).toHaveAttribute('type', 'button');
    expect(closeButton).toHaveAttribute('aria-label', 'Schließen');
  });

  it('should support keyboard navigation to action buttons', () => {
    render(
      <Toast 
        message="Test message" 
        actions={
          <button 
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
  });

  it('should have proper focus management', () => {
    render(<Toast message="Test message" showCloseButton />);
    
    const closeButton = screen.getByTestId('toast-close-button');
    
    // Tab should focus the close button
    closeButton.focus();
    expect(document.activeElement).toBe(closeButton);
    
    // Should have visible focus indicator
    expect(closeButton).toHaveClass('focus:ring-2');
  });
});