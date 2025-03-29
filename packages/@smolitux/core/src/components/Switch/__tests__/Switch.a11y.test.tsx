import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SwitchA11y } from '../Switch.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('Switch Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        ariaLabel="Benachrichtigungen"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        ariaLabel="Benachrichtigungen"
        description="Aktivieren Sie diese Option, um Benachrichtigungen zu erhalten"
        id="test-switch"
      />
    );
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('id', 'test-switch');
    expect(switchElement).toHaveAttribute('aria-label', 'Benachrichtigungen');
    expect(switchElement).toHaveAttribute('aria-checked', 'false');
    expect(switchElement).toHaveAttribute('aria-describedby', 'test-switch-description');
    
    // Überprüfe die Beschreibung
    const description = screen.getByText('Aktivieren Sie diese Option, um Benachrichtigungen zu erhalten');
    expect(description).toHaveClass('sr-only');
    expect(description.id).toBe('test-switch-description');
  });

  it('should handle checked state correctly', () => {
    render(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        checked
        ariaLabel="Benachrichtigungen"
      />
    );
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'true');
    
    // Überprüfe den versteckten Text für Screenreader
    expect(screen.getByText('eingeschaltet')).toHaveClass('sr-only');
  });

  it('should handle custom state text correctly', () => {
    render(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        checked
        ariaLabel="Benachrichtigungen"
        checkedStateText="aktiviert"
        uncheckedStateText="deaktiviert"
      />
    );
    
    expect(screen.getByText('aktiviert')).toHaveClass('sr-only');
    
    // Ändere den Zustand
    fireEvent.click(screen.getByRole('switch'));
    
    expect(screen.getByText('deaktiviert')).toHaveClass('sr-only');
  });

  it('should handle error state correctly', () => {
    render(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        error="Bitte wählen Sie eine Option"
        ariaLabel="Benachrichtigungen"
      />
    );
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-invalid', 'true');
    expect(switchElement).toHaveAttribute('aria-errormessage', 'switch-error');
    
    // Überprüfe die Fehlermeldung
    const error = screen.getByText('Bitte wählen Sie eine Option');
    expect(error).toHaveAttribute('role', 'alert');
  });

  it('should handle helper text correctly', () => {
    render(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        helperText="Sie können diese Einstellung jederzeit ändern"
        ariaLabel="Benachrichtigungen"
      />
    );
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-describedby', 'switch-helper');
    
    // Überprüfe den Hilfetext
    const helperText = screen.getByText('Sie können diese Einstellung jederzeit ändern');
    expect(helperText.id).toBe('switch-helper');
  });

  it('should handle disabled state correctly', () => {
    render(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        disabled
        ariaLabel="Benachrichtigungen"
      />
    );
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
    
    // Überprüfe, ob der Container die entsprechenden Klassen hat
    const container = screen.getByText('Benachrichtigungen aktivieren').closest('label');
    expect(container).toHaveClass('opacity-50');
    expect(container).toHaveClass('cursor-not-allowed');
  });

  it('should handle required state correctly', () => {
    render(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        required
        ariaLabel="Benachrichtigungen"
      />
    );
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeRequired();
    
    // Überprüfe das Sternchen im Label
    const label = screen.getByText('Benachrichtigungen aktivieren');
    expect(label.nextSibling).toHaveTextContent('*');
    expect(label.nextSibling).toHaveAttribute('aria-hidden', 'true');
  });

  it('should handle different label positions correctly', () => {
    const { rerender } = render(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        labelPosition="right"
        ariaLabel="Benachrichtigungen"
      />
    );
    
    // Bei labelPosition="right" sollte das Label nach dem Switch kommen
    const switchElement = screen.getByRole('switch');
    const label = screen.getByText('Benachrichtigungen aktivieren');
    expect(switchElement.compareDocumentPosition(label)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    
    rerender(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        labelPosition="left"
        ariaLabel="Benachrichtigungen"
      />
    );
    
    // Bei labelPosition="left" sollte das Label vor dem Switch kommen
    expect(switchElement.compareDocumentPosition(label)).toBe(Node.DOCUMENT_POSITION_PRECEDING);
  });

  it('should handle keyboard navigation correctly', () => {
    const handleChange = jest.fn();
    
    render(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        onChange={handleChange}
        ariaLabel="Benachrichtigungen"
      />
    );
    
    const switchElement = screen.getByRole('switch');
    
    // Fokussiere den Switch
    switchElement.focus();
    expect(document.activeElement).toBe(switchElement);
    
    // Drücke die Leertaste
    fireEvent.keyDown(switchElement, { key: ' ' });
    fireEvent.keyUp(switchElement, { key: ' ' });
    
    // Der onChange-Handler sollte aufgerufen worden sein
    expect(handleChange).toHaveBeenCalled();
  });

  it('should handle different sizes correctly', () => {
    const { rerender } = render(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        size="xs"
        ariaLabel="Benachrichtigungen"
      />
    );
    
    let switchContainer = screen.getByRole('switch').nextElementSibling;
    expect(switchContainer).toHaveClass('h-4');
    expect(switchContainer).toHaveClass('w-7');
    
    rerender(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        size="xl"
        ariaLabel="Benachrichtigungen"
      />
    );
    
    switchContainer = screen.getByRole('switch').nextElementSibling;
    expect(switchContainer).toHaveClass('h-8');
    expect(switchContainer).toHaveClass('w-16');
  });

  it('should handle different color schemes correctly', () => {
    const { rerender } = render(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        colorScheme="primary"
        checked
        ariaLabel="Benachrichtigungen"
      />
    );
    
    let switchContainer = screen.getByRole('switch').nextElementSibling;
    expect(switchContainer).toHaveClass('bg-primary-600');
    
    rerender(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        colorScheme="success"
        checked
        ariaLabel="Benachrichtigungen"
      />
    );
    
    switchContainer = screen.getByRole('switch').nextElementSibling;
    expect(switchContainer).toHaveClass('bg-green-600');
  });

  it('should handle icons correctly', () => {
    render(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        icons
        ariaLabel="Benachrichtigungen"
      />
    );
    
    const switchContainer = screen.getByRole('switch').nextElementSibling;
    const icons = switchContainer.querySelectorAll('[aria-hidden="true"]');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('should handle labels correctly', () => {
    render(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        labels={{ on: 'AN', off: 'AUS' }}
        ariaLabel="Benachrichtigungen"
      />
    );
    
    const switchContainer = screen.getByRole('switch').nextElementSibling;
    expect(switchContainer.textContent).toContain('AUS');
    
    // Ändere den Zustand
    fireEvent.click(screen.getByRole('switch'));
    
    expect(switchContainer.textContent).toContain('AN');
  });

  it('should handle auto focus correctly', () => {
    render(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        autoFocus
        ariaLabel="Benachrichtigungen"
      />
    );
    
    const switchElement = screen.getByRole('switch');
    expect(document.activeElement).toBe(switchElement);
  });

  it('should handle live region correctly', () => {
    render(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        liveRegionPoliteness="assertive"
        ariaLabel="Benachrichtigungen"
      />
    );
    
    // Es sollte eine Live-Region geben
    const liveRegion = screen.getByRole('switch').parentElement?.querySelector('[aria-live="assertive"]');
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion).toHaveClass('sr-only');
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
  });

  it('should handle busy state correctly', () => {
    render(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        busy
        ariaLabel="Benachrichtigungen"
      />
    );
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-busy', 'true');
  });

  it('should handle vertical layout correctly', () => {
    render(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        isVertical
        ariaLabel="Benachrichtigungen"
      />
    );
    
    const container = screen.getByRole('switch').closest('div');
    expect(container).toHaveClass('flex-col');
  });

  it('should handle custom icons correctly', () => {
    render(
      <SwitchA11y 
        label="Benachrichtigungen aktivieren"
        checkedIcon={<span data-testid="checked-icon">✓</span>}
        uncheckedIcon={<span data-testid="unchecked-icon">✕</span>}
        ariaLabel="Benachrichtigungen"
      />
    );
    
    // Zunächst sollte das uncheckedIcon sichtbar sein
    const uncheckedIcon = screen.getByTestId('unchecked-icon');
    expect(uncheckedIcon).toBeInTheDocument();
    
    // Ändere den Zustand
    fireEvent.click(screen.getByRole('switch'));
    
    // Jetzt sollte das checkedIcon sichtbar sein
    const checkedIcon = screen.getByTestId('checked-icon');
    expect(checkedIcon).toBeInTheDocument();
  });
});