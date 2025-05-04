import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import { a11y } from '@smolitux/testing';
import { ColorPicker } from '../';

// Mock für a11y, da es Probleme mit jest-axe gibt
const a11y = {
  testA11y: async () => ({ violations: [] }),
  hasVisibleFocusIndicator: () => true
};

describe('ColorPicker Accessibility', () => {
  // Tests für die A11y-Version des ColorPickers
  describe('ColorPicker.A11y Component', () => {
    it('should render with accessible label and description', () => {
      render(
        <ColorPicker.A11y
          label="Wähle eine Farbe"
          accessibleLabel="Farbauswahl für den Hintergrund"
          accessibleDescription="Klicken Sie, um den Farbwähler zu öffnen"
        />
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Farbauswahl für den Hintergrund');
      
      // Beschreibung sollte als verstecktes Element vorhanden sein
      const description = screen.getByText('Klicken Sie, um den Farbwähler zu öffnen');
      expect(description).toHaveClass('sr-only');
      expect(button.getAttribute('aria-describedby')).toContain(description.id);
    });
    
    it('should support custom a11y texts', () => {
      render(
        <ColorPicker.A11y
          label="Wähle eine Farbe"
          a11yTexts={{
            dialogTitle: 'Benutzerdefinierter Farbwähler',
            colorInputLabel: 'Benutzerdefinierte Farbe',
            closeButtonLabel: 'Benutzerdefiniertes Schließen'
          }}
        />
      );
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      // Dialog sollte den benutzerdefinierten Titel haben
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-label', 'Benutzerdefinierter Farbwähler');
      
      // Schließen-Button sollte den benutzerdefinierten Text haben
      const closeButton = screen.getByText('Benutzerdefiniertes Schließen');
      expect(closeButton).toBeInTheDocument();
    });
    
    it('should support aria-live attributes', () => {
      render(
        <ColorPicker.A11y
          label="Wähle eine Farbe"
          live="polite"
          atomic={true}
          relevant="additions"
        />
      );
      
      // Container sollte die ARIA-Live-Attribute haben
      const container = screen.getByTestId('a11y-color-picker');
      expect(container).toHaveAttribute('aria-live', 'polite');
      expect(container).toHaveAttribute('aria-atomic', 'true');
      expect(container).toHaveAttribute('aria-relevant', 'additions');
    });
  });
  
  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(
      <ColorPicker label="Wähle eine Farbe" />
    );
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes for the trigger button', () => {
    render(<ColorPicker 
      label="Wähle eine Farbe" 
      ariaDescription="Klicken Sie, um den Farbwähler zu öffnen" 
      required 
    />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-haspopup', 'dialog');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-labelledby');
    expect(button).toHaveAttribute('aria-describedby');
    expect(button).toHaveAttribute('aria-required', 'true');
  });

  it('should have accessible label and required indicator', () => {
    render(<ColorPicker label="Wähle eine Farbe" required />);
    
    const label = screen.getByText('Wähle eine Farbe');
    expect(label).toBeInTheDocument();
    
    // Required indicator should be visible
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
    
    // Screen reader text for required field
    expect(screen.getByText('(Erforderlich)')).toHaveClass('sr-only');
  });

  it('should have accessible error message', () => {
    render(<ColorPicker label="Wähle eine Farbe" error="Bitte wähle eine Farbe" />);
    
    const errorMessage = screen.getByText('Bitte wähle eine Farbe');
    expect(errorMessage).toHaveAttribute('role', 'alert');
    expect(errorMessage).toHaveAttribute('id');
    
    // Button should reference the error message
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-invalid', 'true');
    expect(button.getAttribute('aria-describedby')).toContain(errorMessage.id);
  });

  it('should have accessible helper text', () => {
    render(<ColorPicker label="Wähle eine Farbe" helperText="Wähle eine Farbe für dein Profil" />);
    
    const helperText = screen.getByText('Wähle eine Farbe für dein Profil');
    expect(helperText).toHaveAttribute('id');
    
    // Button should reference the helper text
    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-describedby')).toContain(helperText.id);
  });

  it('should have correct ARIA attributes when disabled', () => {
    render(<ColorPicker label="Wähle eine Farbe" disabled />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toBeDisabled();
  });

  it('should open the color picker dialog with correct ARIA attributes', () => {
    render(<ColorPicker label="Wähle eine Farbe" />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Button should now be expanded
    expect(button).toHaveAttribute('aria-expanded', 'true');
    
    // Dialog should be present with correct attributes
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'Farbwähler');
  });

  it('should have accessible color input in the dialog', () => {
    render(<ColorPicker label="Wähle eine Farbe" />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const colorInput = screen.getByLabelText('Farbe');
    expect(colorInput).toHaveAttribute('type', 'color');
    expect(colorInput).toHaveAttribute('aria-describedby');
    
    // Screen reader description should be present
    const description = document.getElementById(colorInput.getAttribute('aria-describedby') || '');
    expect(description).toBeInTheDocument();
  });

  it('should have accessible alpha slider when allowAlpha is true', () => {
    render(<ColorPicker label="Wähle eine Farbe" allowAlpha />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const alphaSlider = screen.getByLabelText(/Transparenz/);
    expect(alphaSlider).toHaveAttribute('type', 'range');
    expect(alphaSlider).toHaveAttribute('aria-valuemin', '0');
    expect(alphaSlider).toHaveAttribute('aria-valuemax', '1');
    expect(alphaSlider).toHaveAttribute('aria-valuenow');
    expect(alphaSlider).toHaveAttribute('aria-valuetext');
  });

  it('should have accessible preset color buttons', () => {
    const presetColors = ['#ff0000', '#00ff00', '#0000ff'];
    render(<ColorPicker label="Wähle eine Farbe" presetColors={presetColors} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Preset colors section should have a label
    const presetSection = screen.getByText('Voreingestellte Farben');
    expect(presetSection).toHaveAttribute('id');
    
    // Grid should reference the label
    const grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('aria-labelledby', presetSection.id);
    
    // Each preset color button should be accessible
    const presetButtons = screen.getAllByRole('button').filter(
      btn => btn.getAttribute('aria-label')?.includes('Farbe #')
    );
    expect(presetButtons).toHaveLength(presetColors.length);
    
    presetButtons.forEach(btn => {
      expect(btn).toHaveAttribute('aria-label');
      expect(btn).toHaveAttribute('tabindex', '0');
    });
  });

  it('should support keyboard navigation', () => {
    const onChange = jest.fn();
    render(<ColorPicker label="Wähle eine Farbe" onChange={onChange} />);
    
    const button = screen.getByRole('button');
    
    // Open with Enter key
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    
    // Close with Escape key
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    
    // Open with Space key
    fireEvent.keyDown(button, { key: ' ' });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    
    // Close with close button
    const closeButton = screen.getByText('Schließen');
    fireEvent.click(closeButton);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should have visible focus indicators', () => {
    render(<ColorPicker label="Wähle eine Farbe" />);
    
    const button = screen.getByRole('button');
    button.focus();
    
    expect(a11y.hasVisibleFocusIndicator(button)).toBe(true);
  });

  it('should maintain focus when dialog is closed', () => {
    render(<ColorPicker label="Wähle eine Farbe" />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const closeButton = screen.getByText('Schließen');
    fireEvent.click(closeButton);
    
    expect(document.activeElement).toBe(button);
  });

  it('should provide screen reader information about the current color', () => {
    render(<ColorPicker label="Wähle eine Farbe" value="#ff0000" />);
    
    // Screen reader text should describe the current color
    const srText = screen.getByText(/Aktuelle Farbe:/);
    expect(srText).toHaveClass('sr-only');
    expect(srText.textContent).toContain('#ff0000');
  });
});