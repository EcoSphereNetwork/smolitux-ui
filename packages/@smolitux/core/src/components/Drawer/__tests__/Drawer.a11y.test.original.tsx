import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { a11y } from '@smolitux/testing';
import { Drawer } from '../Drawer';

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

  it('should trap focus within the drawer', () => {
    const onClose = jest.fn();
    render(
      <Drawer isOpen={true} onClose={onClose} title="Test Drawer">
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
      </Drawer>
    );
    
    // First, check that the close button has focus initially
    const closeButton = screen.getByLabelText('Schließen');
    expect(document.activeElement).toBe(closeButton);
    
    // Tab to the first button
    fireEvent.keyDown(document.activeElement as Element, { key: 'Tab' });
    expect(document.activeElement).toBe(screen.getByText('Button 1'));
    
    // Tab to the second button
    fireEvent.keyDown(document.activeElement as Element, { key: 'Tab' });
    expect(document.activeElement).toBe(screen.getByText('Button 2'));
    
    // Tab to the third button
    fireEvent.keyDown(document.activeElement as Element, { key: 'Tab' });
    expect(document.activeElement).toBe(screen.getByText('Button 3'));
    
    // Tab should cycle back to the close button
    fireEvent.keyDown(document.activeElement as Element, { key: 'Tab' });
    expect(document.activeElement).toBe(closeButton);
    
    // Shift+Tab should go to the last button
    fireEvent.keyDown(document.activeElement as Element, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(screen.getByText('Button 3'));
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
        <button>Test Button</button>
      </Drawer>
    );
    
    const button = screen.getByText('Test Button');
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
            <button aria-label="Cancel">Cancel</button>
            <button aria-label="Save">Save</button>
          </div>
        }
      >
        <p>Drawer content</p>
      </Drawer>
    );
    
    const cancelButton = screen.getByLabelText('Cancel');
    const saveButton = screen.getByLabelText('Save');
    
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });
});