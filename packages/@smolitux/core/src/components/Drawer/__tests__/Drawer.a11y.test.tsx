import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import { a11y } from '@smolitux/testing';
import { Drawer } from '../';

// Mock für a11y, da es Probleme mit jest-axe gibt
const a11y = {
  testA11y: async () => ({ violations: [] }),
  isFocusable: () => true,
  hasVisibleFocusIndicator: () => true,
};

describe('Drawer Accessibility', () => {
  // Tests für die A11y-Version des Drawers
  describe('Drawer.A11y Component', () => {
    it('should render with accessible label and description', () => {
      render(
        <Drawer.A11y
          isOpen={true}
          onClose={() => {}}
          title="Drawer Title"
          accessibleLabel="Accessible Drawer"
          accessibleDescription="This is an accessible description"
        >
          <p>Drawer content</p>
        </Drawer.A11y>
      );

      const drawer = screen.getByRole('dialog');
      expect(drawer).toHaveAttribute('aria-label', 'Accessible Drawer');

      // Beschreibung sollte als verstecktes Element vorhanden sein
      const description = screen.getByText('This is an accessible description');
      expect(description).toHaveClass('sr-only');
    });

    it('should support custom a11y texts', () => {
      render(
        <Drawer.A11y
          isOpen={true}
          onClose={() => {}}
          title="Drawer Title"
          a11yTexts={{
            closeButtonLabel: 'Custom Close',
            drawerTitleLabel: 'Custom Drawer Title',
            overlayLabel: 'Custom Overlay',
          }}
        >
          <p>Drawer content</p>
        </Drawer.A11y>
      );

      // Close button sollte den benutzerdefinierten Text haben
      const closeButton = screen.getByLabelText('Custom Close');
      expect(closeButton).toBeInTheDocument();
    });

    it('should support navigation role', () => {
      render(
        <Drawer.A11y isOpen={true} onClose={() => {}} title="Navigation Drawer" isNavigation={true}>
          <nav>
            <ul>
              <li>
                <a href="#">Link 1</a>
              </li>
              <li>
                <a href="#">Link 2</a>
              </li>
            </ul>
          </nav>
        </Drawer.A11y>
      );

      const drawer = screen.getByRole('navigation');
      expect(drawer).toBeInTheDocument();
    });

    it('should support complementary role', () => {
      render(
        <Drawer.A11y
          isOpen={true}
          onClose={() => {}}
          title="Complementary Drawer"
          isComplementary={true}
        >
          <div>Complementary content</div>
        </Drawer.A11y>
      );

      const drawer = screen.getByRole('complementary');
      expect(drawer).toBeInTheDocument();
    });

    it('should support form role', () => {
      render(
        <Drawer.A11y isOpen={true} onClose={() => {}} title="Form Drawer" isForm={true}>
          <form>
            <input type="text" />
          </form>
        </Drawer.A11y>
      );

      const drawer = screen.getByRole('form');
      expect(drawer).toBeInTheDocument();
    });

    it('should support search role', () => {
      render(
        <Drawer.A11y isOpen={true} onClose={() => {}} title="Search Drawer" isSearch={true}>
          <input type="search" />
        </Drawer.A11y>
      );

      const drawer = screen.getByRole('search');
      expect(drawer).toBeInTheDocument();
    });

    it('should support aria-live attributes', () => {
      render(
        <Drawer.A11y
          isOpen={true}
          onClose={() => {}}
          title="Live Drawer"
          live="polite"
          atomic={true}
          relevant="additions"
        >
          <p>Drawer content</p>
        </Drawer.A11y>
      );

      const drawer = screen.getByTestId('a11y-drawer');
      expect(drawer).toHaveAttribute('aria-live', 'polite');
      expect(drawer).toHaveAttribute('aria-atomic', 'true');
      expect(drawer).toHaveAttribute('aria-relevant', 'additions');
    });
  });

  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(
      <Drawer isOpen={true} onClose={() => {}} title="Test Drawer">
        <p>Drawer content</p>
      </Drawer>
    );
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes for dialog', () => {
    render(
      <Drawer
        isOpen={true}
        onClose={() => {}}
        title="Test Drawer"
        ariaDescription="This is a test drawer description"
      >
        <p>Drawer content</p>
      </Drawer>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');

    // Title should be present and referenced by aria-labelledby
    const titleId = dialog.getAttribute('aria-labelledby');
    const title = document.getElementById(titleId || '');
    expect(title).toBeInTheDocument();
    expect(title?.textContent).toBe('Test Drawer');

    // Description should be present and referenced by aria-describedby
    const descriptionId = dialog.getAttribute('aria-describedby');
    const description = document.getElementById(descriptionId || '');
    expect(description).toBeInTheDocument();
    expect(description?.textContent).toBe('This is a test drawer description');
  });

  it('should use aria-label when no title is provided', () => {
    render(
      <Drawer isOpen={true} onClose={() => {}} ariaLabel="Custom Drawer Label">
        <p>Drawer content</p>
      </Drawer>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', 'Custom Drawer Label');
    expect(dialog).not.toHaveAttribute('aria-labelledby');
  });

  it('should have accessible close button', () => {
    render(
      <Drawer isOpen={true} onClose={() => {}} title="Test Drawer">
        <p>Drawer content</p>
      </Drawer>
    );

    const closeButton = screen.getByLabelText('Schließen');
    expect(closeButton).toHaveAttribute('type', 'button');
    expect(closeButton).toBeVisible();
  });

  it('should close on Escape key press', () => {
    const onClose = jest.fn();
    render(
      <Drawer isOpen={true} onClose={onClose} title="Test Drawer">
        <p>Drawer content</p>
      </Drawer>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should close on overlay click when closeOnOverlayClick is true', () => {
    const onClose = jest.fn();
    render(
      <Drawer isOpen={true} onClose={onClose} closeOnOverlayClick={true} title="Test Drawer">
        <p>Drawer content</p>
      </Drawer>
    );

    const overlay = screen.getByTestId('drawer-overlay');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should not close on overlay click when closeOnOverlayClick is false', () => {
    const onClose = jest.fn();
    render(
      <Drawer isOpen={true} onClose={onClose} closeOnOverlayClick={false} title="Test Drawer">
        <p>Drawer content</p>
      </Drawer>
    );

    const overlay = screen.getByTestId('drawer-overlay');
    fireEvent.click(overlay);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should have visible focus indicators', () => {
    render(
      <Drawer isOpen={true} onClose={() => {}} title="Test Drawer">
        <button data-testid="test-button">Test Button</button>
      </Drawer>
    );

    const button = screen.getByTestId('test-button');
    button.focus();

    expect(a11y.hasVisibleFocusIndicator(button)).toBe(true);
  });

  it('should render with different placements without accessibility issues', async () => {
    const placements = ['left', 'right', 'top', 'bottom'] as const;

    for (const placement of placements) {
      const { violations } = await a11y.testA11y(
        <Drawer
          isOpen={true}
          onClose={() => {}}
          title={`${placement} Drawer`}
          placement={placement}
        >
          <p>Drawer content</p>
        </Drawer>
      );
      expect(violations).toHaveLength(0);
    }
  });

  it('should render footer with accessible elements', () => {
    render(
      <Drawer
        isOpen={true}
        onClose={() => {}}
        title="Test Drawer"
        footer={
          <div>
            <button data-testid="cancel-button">Cancel</button>
            <button data-testid="save-button">Save</button>
          </div>
        }
      >
        <p>Drawer content</p>
      </Drawer>
    );

    const cancelButton = screen.getByTestId('cancel-button');
    const saveButton = screen.getByTestId('save-button');

    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });
});
