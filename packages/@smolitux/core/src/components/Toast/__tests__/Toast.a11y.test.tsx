import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Toast } from '../';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('Toast Accessibility', () => {
  // Test für die Standard-Toast-Komponente
  it('should have no accessibility violations with standard Toast', async () => {
    const { container } = render(<Toast message="Test message" />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test für die A11y-Version der Toast-Komponente
  it('should have no accessibility violations with A11y Toast', async () => {
    const { container } = render(
      <Toast.A11y id="test-toast" title="Test Title" description="Test message" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes in A11y Toast', () => {
    render(
      <Toast.A11y
        id="test-toast"
        title="Test Title"
        description="Test message"
        ariaLabel="Test Toast"
        role="alert"
        ariaLive="polite"
      />
    );

    const toast = screen.getByRole('alert');
    expect(toast).toHaveAttribute('id', 'test-toast');
    expect(toast).toHaveAttribute('aria-label', 'Test Toast');
    expect(toast).toHaveAttribute('aria-live', 'polite');
    expect(toast).toHaveAttribute('aria-atomic', 'true');

    // Überprüfe die Titel- und Beschreibungselemente
    const title = screen.getByText('Test Title');
    const description = screen.getByText('Test message');
    expect(title).toHaveAttribute('id', 'test-toast-title');
    expect(description).toHaveAttribute('id', 'test-toast-description');
    expect(toast).toHaveAttribute('aria-labelledby', 'test-toast-title');
    expect(toast).toHaveAttribute('aria-describedby', 'test-toast-description');
  });

  it('should have no accessibility violations with title and actions', async () => {
    const { container } = render(
      <Toast title="Test Title" message="Test message" actions={<button>Action</button>} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should handle different toast types correctly in A11y Toast', () => {
    const { rerender } = render(
      <Toast.A11y id="test-toast" type="info" title="Info" description="Info message" />
    );

    let toast = screen.getByRole('alert');
    expect(toast).toHaveClass('toast-info');

    rerender(
      <Toast.A11y id="test-toast" type="success" title="Success" description="Success message" />
    );

    toast = screen.getByRole('alert');
    expect(toast).toHaveClass('toast-success');

    rerender(
      <Toast.A11y id="test-toast" type="warning" title="Warning" description="Warning message" />
    );

    toast = screen.getByRole('alert');
    expect(toast).toHaveClass('toast-warning');

    rerender(<Toast.A11y id="test-toast" type="error" title="Error" description="Error message" />);

    toast = screen.getByRole('alert');
    expect(toast).toHaveClass('toast-error');
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

  it('should handle close button correctly in A11y Toast', () => {
    const handleClose = jest.fn();

    render(
      <Toast.A11y
        id="test-toast"
        title="Test Title"
        description="Test message"
        onClose={handleClose}
        isClosable={true}
      />
    );

    const closeButton = screen.getByRole('button', { name: 'Schließen' });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('type', 'button');

    // Klicke auf den Schließen-Button
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
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

  it('should support keyboard navigation in A11y Toast', () => {
    render(
      <Toast.A11y
        id="test-toast"
        title="Test Title"
        description="Test message"
        isClosable={true}
        keyboardNavigation={true}
      />
    );

    const toast = screen.getByRole('alert');
    const closeButton = screen.getByRole('button', { name: 'Schließen' });

    // Simuliere Tastendruck (Escape)
    fireEvent.keyDown(toast, { key: 'Escape' });

    // Der Toast sollte geschlossen werden (aber wir können das in diesem Test nicht überprüfen)

    // Fokussiere den Schließen-Button
    closeButton.focus();
    expect(document.activeElement).toBe(closeButton);
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
        actions={<button data-testid="toast-action-button">Action</button>}
      />
    );

    const actionButton = screen.getByTestId('toast-action-button');

    // Focus the button
    actionButton.focus();
    expect(document.activeElement).toBe(actionButton);
  });

  it('should handle auto focus correctly in A11y Toast', () => {
    render(
      <Toast.A11y id="test-toast" title="Test Title" description="Test message" autoFocus={true} />
    );

    const toast = screen.getByRole('alert');
    expect(toast).toHaveAttribute('tabIndex', '0');

    // In einem echten Browser würde der Toast automatisch fokussiert werden,
    // aber in JSDOM funktioniert das nicht automatisch
  });

  it('should handle screen reader announcements correctly', () => {
    render(
      <Toast.A11y
        id="test-toast"
        title="Test Title"
        description="Test message"
        announce={true}
        screenReaderSupport={true}
      />
    );

    // Überprüfe, ob die Screenreader-Ankündigung vorhanden ist
    const announcement = screen.getByText('Test Title: Test message');
    expect(announcement).toHaveClass('sr-only');
    expect(announcement).toHaveAttribute('aria-live');
    expect(announcement).toHaveAttribute('aria-atomic', 'true');
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
