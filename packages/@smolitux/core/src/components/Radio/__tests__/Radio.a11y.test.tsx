import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '@smolitux/testing';
import { axe, toHaveNoViolations } from 'jest-axe';
import { RadioA11y } from '../Radio.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('Radio Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <RadioA11y name="test" value="option1" label="Option 1" ariaLabel="Erste Option" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <RadioA11y
        name="test"
        value="option1"
        label="Option 1"
        ariaLabel="Erste Option"
        description="Dies ist die erste Option"
        id="test-radio"
      />
    );

    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('id', 'test-radio');
    expect(radio).toHaveAttribute('aria-label', 'Erste Option');
    expect(radio).toHaveAttribute('aria-checked', 'false');
    expect(radio).toHaveAttribute('aria-describedby', 'test-radio-description');

    // Überprüfe die Beschreibung
    const description = screen.getByText('Dies ist die erste Option');
    expect(description).toHaveClass('sr-only');
    expect(description.id).toBe('test-radio-description');
  });

  it('should handle checked state correctly', () => {
    render(
      <RadioA11y name="test" value="option1" label="Option 1" checked ariaLabel="Erste Option" />
    );

    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('aria-checked', 'true');

    // Überprüfe den versteckten Text für Screenreader
    expect(screen.getByText('ausgewählt')).toHaveClass('sr-only');
  });

  it('should handle custom checked state text correctly', () => {
    render(
      <RadioA11y
        name="test"
        value="option1"
        label="Option 1"
        checked
        ariaLabel="Erste Option"
        checkedStateText="aktiviert"
        uncheckedStateText="deaktiviert"
      />
    );

    expect(screen.getByText('aktiviert')).toHaveClass('sr-only');

    // Ändere den Zustand
    fireEvent.click(screen.getByRole('radio'));

    // Der Text sollte sich nicht ändern, da wir keinen onChange-Handler haben
    // In einer echten Anwendung würde sich der Zustand ändern
  });

  it('should handle error state correctly', () => {
    render(
      <RadioA11y
        name="test"
        value="option1"
        label="Option 1"
        error="Bitte wählen Sie eine Option"
        ariaLabel="Erste Option"
      />
    );

    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('aria-invalid', 'true');
    expect(radio).toHaveAttribute('aria-errormessage', 'radio-option1-error');

    // Überprüfe die Fehlermeldung
    const error = screen.getByText('Bitte wählen Sie eine Option');
    expect(error).toHaveAttribute('role', 'alert');
    expect(error.id).toBe('radio-option1-error');
  });

  it('should handle helper text correctly', () => {
    render(
      <RadioA11y
        name="test"
        value="option1"
        label="Option 1"
        helperText="Wählen Sie diese Option für mehr Funktionen"
        ariaLabel="Erste Option"
      />
    );

    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('aria-describedby', 'radio-option1-helper');

    // Überprüfe den Hilfetext
    const helperText = screen.getByText('Wählen Sie diese Option für mehr Funktionen');
    expect(helperText.id).toBe('radio-option1-helper');
  });

  it('should handle disabled state correctly', () => {
    render(
      <RadioA11y name="test" value="option1" label="Option 1" disabled ariaLabel="Erste Option" />
    );

    const radio = screen.getByRole('radio');
    expect(radio).toBeDisabled();
    expect(radio).toHaveClass('cursor-not-allowed');
    expect(radio).toHaveClass('opacity-50');
  });

  it('should handle required state correctly', () => {
    render(
      <RadioA11y name="test" value="option1" label="Option 1" required ariaLabel="Erste Option" />
    );

    const radio = screen.getByRole('radio');
    expect(radio).toBeRequired();

    // Überprüfe das Sternchen im Label
    const label = screen.getByText('Option 1');
    expect(label.nextSibling).toHaveTextContent('*');
    expect(label.nextSibling).toHaveAttribute('aria-hidden', 'true');
  });

  it('should handle different label positions correctly', () => {
    const { rerender } = render(
      <RadioA11y
        name="test"
        value="option1"
        label="Option 1"
        labelPosition="right"
        ariaLabel="Erste Option"
      />
    );

    // Bei labelPosition="right" sollte das Label nach dem Radio kommen
    const radio = screen.getByRole('radio');
    const label = screen.getByText('Option 1');
    expect(radio.compareDocumentPosition(label)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);

    rerender(
      <RadioA11y
        name="test"
        value="option1"
        label="Option 1"
        labelPosition="left"
        ariaLabel="Erste Option"
      />
    );

    // Bei labelPosition="left" sollte das Label vor dem Radio kommen
    expect(radio.compareDocumentPosition(label)).toBe(Node.DOCUMENT_POSITION_PRECEDING);
  });

  it('should handle keyboard navigation correctly', () => {
    const handleChange = jest.fn();

    render(
      <RadioA11y
        name="test"
        value="option1"
        label="Option 1"
        onChange={handleChange}
        ariaLabel="Erste Option"
      />
    );

    const radio = screen.getByRole('radio');

    // Fokussiere das Radio
    radio.focus();
    expect(document.activeElement).toBe(radio);

    // Drücke die Leertaste
    fireEvent.keyDown(radio, { key: ' ' });
    fireEvent.keyUp(radio, { key: ' ' });

    // Der onChange-Handler sollte aufgerufen worden sein
    expect(handleChange).toHaveBeenCalled();
  });

  it('should handle different sizes correctly', () => {
    const { rerender } = render(
      <RadioA11y name="test" value="option1" label="Option 1" size="xs" ariaLabel="Erste Option" />
    );

    let radio = screen.getByRole('radio');
    expect(radio).toHaveClass('h-3');
    expect(radio).toHaveClass('w-3');

    rerender(
      <RadioA11y name="test" value="option1" label="Option 1" size="xl" ariaLabel="Erste Option" />
    );

    radio = screen.getByRole('radio');
    expect(radio).toHaveClass('h-7');
    expect(radio).toHaveClass('w-7');
  });

  it('should handle different color schemes correctly', () => {
    render(
      <RadioA11y
        name="test"
        value="option1"
        label="Option 1"
        colorScheme="success"
        ariaLabel="Erste Option"
      />
    );

    const radio = screen.getByRole('radio');
    expect(radio).toHaveClass('text-green-600');
    expect(radio).toHaveClass('focus:ring-green-500');
  });

  it('should handle auto focus correctly', () => {
    render(
      <RadioA11y name="test" value="option1" label="Option 1" autoFocus ariaLabel="Erste Option" />
    );

    const radio = screen.getByRole('radio');
    expect(document.activeElement).toBe(radio);
  });
});
