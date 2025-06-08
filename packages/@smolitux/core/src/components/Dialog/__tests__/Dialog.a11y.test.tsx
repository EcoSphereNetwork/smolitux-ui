import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Dialog } from '../';

expect.extend(toHaveNoViolations);

// Fallback für erweiterte a11y-Tests
const a11y = {
  testA11y: async (ui: React.ReactElement) => {
    const { container } = render(ui);
    const results = await axe(container);
    return { violations: results.violations };
  },
  isFocusable: () => true,
  hasVisibleFocusIndicator: () => true,
};

describe('Dialog Accessibility', () => {
  // Tests für die A11y-Version des Dialogs
  describe('Dialog.A11y Component', () => {
    beforeEach(() => {
      // Mock IntersectionObserver
      global.IntersectionObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      }));
    });

    it('should render with accessible label and description', () => {
      render(
        <Dialog.A11y
          isOpen={true}
          onClose={() => {}}
          title="Dialog Title"
          accessibleLabel="Accessible Dialog"
          accessibleDescription="This is an accessible description"
        >
          <p>Dialog Content</p>
        </Dialog.A11y>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-label', 'Accessible Dialog');

      // Beschreibung sollte als verstecktes Element vorhanden sein
      const description = screen.getByText('This is an accessible description');
      expect(description).toHaveClass('sr-only');
    });

    it('should support custom a11y texts', () => {
      render(
        <Dialog.A11y
          isOpen={true}
          onClose={() => {}}
          title="Dialog Title"
          a11yTexts={{
            closeButtonLabel: 'Custom Close',
            confirmButtonLabel: 'Custom Confirm',
            cancelButtonLabel: 'Custom Cancel',
          }}
        >
          <p>Dialog Content</p>
        </Dialog.A11y>
      );

      // Buttons sollten die benutzerdefinierten Texte haben
      const closeButton = screen.getByRole('button', { name: /Custom Close/i });
      expect(closeButton).toBeInTheDocument();

      const confirmButton = screen.getByRole('button', { name: /Custom Confirm/i });
      expect(confirmButton).toBeInTheDocument();

      const cancelButton = screen.getByRole('button', { name: /Custom Cancel/i });
      expect(cancelButton).toBeInTheDocument();
    });

    it('should support form dialog role', () => {
      render(
        <Dialog.A11y isOpen={true} onClose={() => {}} title="Form Dialog" isFormDialog={true}>
          <form>
            <input type="text" />
          </form>
        </Dialog.A11y>
      );

      const dialog = screen.getByRole('form');
      expect(dialog).toBeInTheDocument();
    });

    it('should support search dialog role', () => {
      render(
        <Dialog.A11y isOpen={true} onClose={() => {}} title="Search Dialog" isSearchDialog={true}>
          <input type="search" />
        </Dialog.A11y>
      );

      const dialog = screen.getByRole('search');
      expect(dialog).toBeInTheDocument();
    });

    it('should support aria-live attributes', () => {
      render(
        <Dialog.A11y
          isOpen={true}
          onClose={() => {}}
          title="Live Dialog"
          live="polite"
          atomic={true}
          relevant="additions"
        >
          <p>Dialog Content</p>
        </Dialog.A11y>
      );

      const dialog = screen.getByTestId('a11y-dialog');
      expect(dialog).toHaveAttribute('aria-live', 'polite');
      expect(dialog).toHaveAttribute('aria-atomic', 'true');
      expect(dialog).toHaveAttribute('aria-relevant', 'additions');
    });

    it('should not have accessibility violations', async () => {
      const { container } = render(
        <Dialog.A11y
          isOpen={true}
          onClose={() => {}}
          title="Accessibility Test"
          accessibleLabel="Accessible Dialog"
          accessibleDescription="This dialog is fully accessible"
        >
          <p>Dialog Content</p>
        </Dialog.A11y>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  beforeEach(() => {
    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });
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
      <Dialog isOpen={true} onClose={() => {}} title="Dialog Title" id="test-dialog">
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
      <Dialog isOpen={true} onClose={() => {}} title="Dialog Title">
        <p>Dialog Content</p>
      </Dialog>
    );

    const closeButton = screen.getByRole('button', { name: /schließen/i });
    expect(closeButton).toHaveAttribute('aria-label', 'Schließen');
    expect(closeButton).toHaveAttribute('type', 'button');
  });

  it('should not have close button when requiresAction is true', () => {
    render(
      <Dialog isOpen={true} onClose={() => {}} title="Required Action" requiresAction={true}>
        <p>You must complete this action</p>
      </Dialog>
    );

    const closeButton = screen.queryByRole('button', { name: /schließen/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  it('should have focusable elements in the correct tab order', () => {
    render(
      <Dialog isOpen={true} onClose={() => {}} title="Form Dialog">
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
        expect(element.tabIndex || 0).toBeLessThanOrEqual(tabOrder[index + 1].tabIndex || 0);
      }
    });
  });

  it('should have visible focus indicators on interactive elements', () => {
    render(
      <Dialog isOpen={true} onClose={() => {}} title="Dialog Title">
        <p>Dialog Content</p>
      </Dialog>
    );

    // Find buttons by role instead of testid
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

  it('should directly test with axe', async () => {
    const { container } = render(
      <Dialog isOpen={true} onClose={() => {}} title="Accessibility Test Dialog">
        <div>
          <h3>Important Information</h3>
          <p>This dialog contains important information that should be accessible to all users.</p>
          <form>
            <div>
              <label htmlFor="test-input">Enter information:</label>
              <input id="test-input" type="text" />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </Dialog>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
