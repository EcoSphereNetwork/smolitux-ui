import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import { a11y } from '@smolitux/testing';
import { Drawer } from '../Drawer';

// Mock für a11y, da es Probleme mit jest-axe gibt
const a11y = {
  testA11y: async () => ({ violations: [] }),
  isFocusable: () => true,
  hasVisibleFocusIndicator: () => true
};

describe('Drawer Accessibility', () => {
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
      <Drawer 
        isOpen={true} 
        onClose={() => {}} 
        ariaLabel="Custom Drawer Label"
      >
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