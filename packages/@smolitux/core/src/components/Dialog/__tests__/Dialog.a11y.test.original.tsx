import React from 'react';
import { render, screen } from '@testing-library/react';
import { a11y } from '@smolitux/testing';
import { Dialog } from '../Dialog';

describe('Dialog Accessibility', () => {
  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(
      <Dialog isOpen={true} onClose={() => {}}>
        <p>Dialog Content</p>
      </Dialog>
    );
    expect(violations).toHaveLength(0);
  });

  it('should not have accessibility violations with title and description', async () => {
    const { violations } = await a11y.testA11y(
      <Dialog 
        isOpen={true} 
        onClose={() => {}} 
        title="Dialog Title"
        description="This is a description of the dialog for screen readers"
      >
        <p>Dialog Content</p>
      </Dialog>
    );
    expect(violations).toHaveLength(0);
  });

  it('should not have accessibility violations as alert dialog', async () => {
    const { violations } = await a11y.testA11y(
      <Dialog 
        isOpen={true} 
        onClose={() => {}} 
        title="Warning"
        description="This action cannot be undone"
        isAlertDialog={true}
        variant="warning"
        onConfirm={() => {}}
      >
        <p>Are you sure you want to delete this item?</p>
      </Dialog>
    );
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes for dialog role', () => {
    render(
      <Dialog 
        isOpen={true} 
        onClose={() => {}} 
        title="Dialog Title"
        id="test-dialog"
      >
        <p>Dialog Content</p>
      </Dialog>
    );
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'test-dialog-title');
    expect(dialog).toHaveAttribute('aria-describedby', 'test-dialog-body');
  });

  it('should have correct ARIA attributes for alertdialog role', () => {
    render(
      <Dialog 
        isOpen={true} 
        onClose={() => {}} 
        title="Warning"
        description="This is an important warning"
        isAlertDialog={true}
        id="test-alert"
      >
        <p>Alert Content</p>
      </Dialog>
    );
    
    const alertDialog = screen.getByRole('alertdialog');
    expect(alertDialog).toHaveAttribute('aria-modal', 'true');
    expect(alertDialog).toHaveAttribute('aria-labelledby', 'test-alert-title');
    expect(alertDialog).toHaveAttribute('aria-describedby', 'test-alert-description');
  });

  it('should have close button with correct accessibility attributes', () => {
    render(
      <Dialog 
        isOpen={true} 
        onClose={() => {}} 
        title="Dialog Title"
      >
        <p>Dialog Content</p>
      </Dialog>
    );
    
    const closeButton = screen.getByRole('button', { name: /schließen/i });
    expect(closeButton).toHaveAttribute('aria-label', 'Schließen');
    expect(closeButton).toHaveAttribute('type', 'button');
  });

  it('should not have close button when requiresAction is true', () => {
    render(
      <Dialog 
        isOpen={true} 
        onClose={() => {}} 
        title="Required Action"
        requiresAction={true}
      >
        <p>You must complete this action</p>
      </Dialog>
    );
    
    const closeButton = screen.queryByRole('button', { name: /schließen/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  it('should have focusable elements in the correct tab order', () => {
    render(
      <Dialog 
        isOpen={true} 
        onClose={() => {}} 
        title="Form Dialog"
      >
        <form>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" data-testid="name-input" />
          <label htmlFor="email">Email</label>
          <input id="email" type="email" data-testid="email-input" />
        </form>
      </Dialog>
    );
    
    const closeButton = screen.getByRole('button', { name: /schließen/i });
    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const cancelButton = screen.getByRole('button', { name: /abbrechen/i });
    const confirmButton = screen.getByRole('button', { name: /bestätigen/i });
    
    // Check that all elements are focusable
    expect(a11y.isFocusable(closeButton)).toBe(true);
    expect(a11y.isFocusable(nameInput)).toBe(true);
    expect(a11y.isFocusable(emailInput)).toBe(true);
    expect(a11y.isFocusable(cancelButton)).toBe(true);
    expect(a11y.isFocusable(confirmButton)).toBe(true);
    
    // Check tab order (this is a simplified check)
    const tabOrder = [closeButton, nameInput, emailInput, cancelButton, confirmButton];
    tabOrder.forEach((element, index) => {
      if (index < tabOrder.length - 1) {
        expect(element.tabIndex).toBeLessThanOrEqual(tabOrder[index + 1].tabIndex || 0);
      }
    });
  });

  it('should have visible focus indicators on interactive elements', () => {
    render(
      <Dialog 
        isOpen={true} 
        onClose={() => {}} 
      >
        <p>Dialog Content</p>
      </Dialog>
    );
    
    const closeButton = screen.getByRole('button', { name: /schließen/i });
    const cancelButton = screen.getByRole('button', { name: /abbrechen/i });
    const confirmButton = screen.getByRole('button', { name: /bestätigen/i });
    
    // Focus each element and check for visible focus indicator
    closeButton.focus();
    expect(a11y.hasVisibleFocusIndicator(closeButton)).toBe(true);
    
    cancelButton.focus();
    expect(a11y.hasVisibleFocusIndicator(cancelButton)).toBe(true);
    
    confirmButton.focus();
    expect(a11y.hasVisibleFocusIndicator(confirmButton)).toBe(true);
  });
});