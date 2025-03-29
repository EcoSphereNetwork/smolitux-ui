import React from 'react';
import { render, screen } from '@testing-library/react';
import { a11y } from '@smolitux/testing';
import { Modal } from '../Modal';

describe('Modal Accessibility', () => {
  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Modal Content</p>
      </Modal>
    );
    expect(violations).toHaveLength(0);
  });

  it('should not have accessibility violations with title and description', async () => {
    const { violations } = await a11y.testA11y(
      <Modal 
        isOpen={true} 
        onClose={() => {}} 
        title="Modal Title"
        description="This is a description of the modal for screen readers"
      >
        <p>Modal Content</p>
      </Modal>
    );
    expect(violations).toHaveLength(0);
  });

  it('should not have accessibility violations as alert dialog', async () => {
    const { violations } = await a11y.testA11y(
      <Modal 
        isOpen={true} 
        onClose={() => {}} 
        title="Warning"
        description="This action cannot be undone"
        isAlertDialog={true}
        footerButtons={true}
        onCancel={() => {}}
        onConfirm={() => {}}
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
    );
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes for dialog role', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={() => {}} 
        title="Modal Title"
        id="test-modal"
      >
        <p>Modal Content</p>
      </Modal>
    );
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'test-modal-title');
    expect(dialog).toHaveAttribute('aria-describedby', 'test-modal-body');
  });

  it('should have correct ARIA attributes for alertdialog role', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={() => {}} 
        title="Warning"
        description="This is an important warning"
        isAlertDialog={true}
        id="test-alert"
      >
        <p>Alert Content</p>
      </Modal>
    );
    
    const alertDialog = screen.getByRole('alertdialog');
    expect(alertDialog).toHaveAttribute('aria-modal', 'true');
    expect(alertDialog).toHaveAttribute('aria-labelledby', 'test-alert-title');
    expect(alertDialog).toHaveAttribute('aria-describedby', 'test-alert-description');
  });

  it('should have close button with correct accessibility attributes', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={() => {}} 
        showCloseButton={true}
      >
        <p>Modal Content</p>
      </Modal>
    );
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toHaveAttribute('aria-label', 'Close');
    expect(closeButton).toHaveAttribute('type', 'button');
  });

  it('should have focusable elements in the correct tab order', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={() => {}} 
        title="Form Dialog"
        footerButtons={true}
        onCancel={() => {}}
        onConfirm={() => {}}
      >
        <form>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" data-testid="name-input" />
          <label htmlFor="email">Email</label>
          <input id="email" type="email" data-testid="email-input" />
        </form>
      </Modal>
    );
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    
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
      <Modal 
        isOpen={true} 
        onClose={() => {}} 
        footerButtons={true}
        onCancel={() => {}}
        onConfirm={() => {}}
      >
        <p>Modal Content</p>
      </Modal>
    );
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    
    // Focus each element and check for visible focus indicator
    closeButton.focus();
    expect(a11y.hasVisibleFocusIndicator(closeButton)).toBe(true);
    
    cancelButton.focus();
    expect(a11y.hasVisibleFocusIndicator(cancelButton)).toBe(true);
    
    confirmButton.focus();
    expect(a11y.hasVisibleFocusIndicator(confirmButton)).toBe(true);
  });
});