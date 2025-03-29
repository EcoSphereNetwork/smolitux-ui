// packages/@smolitux/core/src/components/TextArea/__tests__/TextArea.a11y.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { TextAreaA11y } from '../TextArea.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('TextArea Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TextAreaA11y
        label="Beschreibung"
        placeholder="Geben Sie eine Beschreibung ein..."
        rows={4}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <TextAreaA11y
        label="Beschreibung"
        placeholder="Geben Sie eine Beschreibung ein..."
        helperText="Maximal 200 Zeichen"
        required
        id="test-textarea"
      />
    );
    
    const textarea = screen.getByLabelText('Beschreibung', { exact: false });
    expect(textarea).toHaveAttribute('aria-required', 'true');
    expect(textarea).toHaveAttribute('aria-describedby');
    
    const helperText = screen.getByText('Maximal 200 Zeichen');
    expect(helperText.id).toBe(textarea.getAttribute('aria-describedby'));
  });

  it('should handle error states correctly', () => {
    render(
      <TextAreaA11y
        label="Beschreibung"
        error="Beschreibung ist zu kurz"
      />
    );
    
    const textarea = screen.getByLabelText('Beschreibung', { exact: false });
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby');
    
    const errorMessage = screen.getByText('Beschreibung ist zu kurz');
    expect(errorMessage).toHaveAttribute('role', 'alert');
    expect(errorMessage.id).toBe(textarea.getAttribute('aria-describedby'));
  });

  it('should handle disabled state correctly', () => {
    render(
      <TextAreaA11y
        label="Beschreibung"
        disabled
      />
    );
    
    const textarea = screen.getByLabelText('Beschreibung', { exact: false });
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute('aria-disabled', 'true');
  });

  it('should handle readonly state correctly', () => {
    render(
      <TextAreaA11y
        label="Beschreibung"
        readOnly
        defaultValue="Dies ist ein Beispieltext"
      />
    );
    
    const textarea = screen.getByLabelText('Beschreibung', { exact: false });
    expect(textarea).toHaveAttribute('readonly');
    expect(textarea).toHaveAttribute('aria-readonly', 'true');
  });

  it('should handle counter correctly', () => {
    render(
      <TextAreaA11y
        label="Beschreibung"
        showCount
        maxLength={200}
        defaultValue="Dies ist ein Beispieltext"
      />
    );
    
    const counter = screen.getByText('24/200');
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveAttribute('aria-live', 'polite');
    
    // Überprüfe, ob die Screenreader-Information vorhanden ist
    expect(screen.getByText('176 Zeichen verbleibend', { selector: '.sr-only' })).toBeInTheDocument();
  });

  it('should update counter when text changes', () => {
    render(
      <TextAreaA11y
        label="Beschreibung"
        showCount
        maxLength={200}
      />
    );
    
    const textarea = screen.getByLabelText('Beschreibung', { exact: false });
    fireEvent.change(textarea, { target: { value: 'Neuer Text' } });
    
    expect(screen.getByText('10/200')).toBeInTheDocument();
    expect(screen.getByText('190 Zeichen verbleibend', { selector: '.sr-only' })).toBeInTheDocument();
  });

  it('should handle auto-resize correctly', () => {
    render(
      <TextAreaA11y
        label="Beschreibung"
        autoResize
      />
    );
    
    const textarea = screen.getByLabelText('Beschreibung', { exact: false });
    
    // Simuliere eine Texteingabe mit mehreren Zeilen
    fireEvent.change(textarea, { target: { value: 'Zeile 1\nZeile 2\nZeile 3\nZeile 4' } });
    
    // Die Höhe sollte angepasst werden, aber wir können das in JSDOM nicht direkt testen
    // Stattdessen prüfen wir, ob die Änderung ohne Fehler durchgeführt wurde
    expect(textarea).toHaveValue('Zeile 1\nZeile 2\nZeile 3\nZeile 4');
  });

  it('should handle required state correctly', () => {
    render(
      <TextAreaA11y
        label="Beschreibung"
        required
      />
    );
    
    const textarea = screen.getByLabelText('Beschreibung', { exact: false });
    expect(textarea).toBeRequired();
    expect(textarea).toHaveAttribute('aria-required', 'true');
    
    // Überprüfe, ob das Sternchen angezeigt wird
    expect(screen.getByText('*', { selector: 'span[aria-hidden="true"]' })).toBeInTheDocument();
    
    // Überprüfe, ob die Screenreader-Information vorhanden ist
    expect(screen.getByText('(Erforderlich)', { selector: '.sr-only' })).toBeInTheDocument();
  });

  it('should handle keyboard interactions correctly', () => {
    const handleChange = jest.fn();
    render(
      <TextAreaA11y
        label="Beschreibung"
        onChange={handleChange}
      />
    );
    
    const textarea = screen.getByLabelText('Beschreibung', { exact: false });
    fireEvent.keyDown(textarea, { key: 'Enter' });
    fireEvent.change(textarea, { target: { value: 'Neuer Text' } });
    
    expect(handleChange).toHaveBeenCalled();
    expect(textarea).toHaveValue('Neuer Text');
  });
});