# A11y Test Template

Diese Datei dient als Vorlage für die Erstellung von Accessibility (A11y) Tests für Komponenten in der Smolitux UI Bibliothek.

## Grundlegende A11y-Testdatei

Hier ist eine grundlegende Vorlage für eine A11y-Testdatei:

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ComponentName } from '../ComponentName';

// Erweitere Jest mit den axe-Matchers
expect.extend(toHaveNoViolations);

describe('ComponentName - Accessibility', () => {
  // Grundlegender Test für Accessibility-Verstöße
  it('should not have any accessibility violations', async () => {
    const { container } = render(<ComponentName />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test für Accessibility-Verstöße mit verschiedenen Props
  it('should not have any accessibility violations with different props', async () => {
    const { container } = render(<ComponentName variant="primary" disabled />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test für Keyboard-Navigation
  it('should be navigable with keyboard', () => {
    const { getByRole } = render(<ComponentName />);
    const element = getByRole('button'); // Anpassen an die entsprechende Rolle
    
    // Überprüfe, ob das Element fokussierbar ist
    element.focus();
    expect(document.activeElement).toBe(element);
  });

  // Test für ARIA-Attribute
  it('should have correct ARIA attributes', () => {
    const { getByRole } = render(<ComponentName aria-label="Test Label" />);
    const element = getByRole('button'); // Anpassen an die entsprechende Rolle
    
    expect(element).toHaveAttribute('aria-label', 'Test Label');
  });

  // Test für Farbkontrast (falls relevant)
  it('should have sufficient color contrast', async () => {
    const { container } = render(<ComponentName />);
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true }
      }
    });
    expect(results).toHaveNoViolations();
  });
});
```

## Erweiterte A11y-Tests für spezifische Komponententypen

### Formular-Komponenten

```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { FormComponent } from '../FormComponent';

expect.extend(toHaveNoViolations);

describe('FormComponent - Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<FormComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have correct form labeling', () => {
    const { getByLabelText } = render(<FormComponent label="Test Label" />);
    expect(getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should show validation errors accessibly', () => {
    const { getByText, getByRole } = render(<FormComponent required />);
    
    // Löse Validierungsfehler aus
    const input = getByRole('textbox');
    fireEvent.blur(input);
    
    // Überprüfe, ob der Fehler zugänglich ist
    const error = getByText('This field is required');
    expect(error).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-errormessage');
  });
});
```

### Interaktive Komponenten

```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { InteractiveComponent } from '../InteractiveComponent';

expect.extend(toHaveNoViolations);

describe('InteractiveComponent - Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<InteractiveComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should be operable with keyboard', () => {
    const handleAction = jest.fn();
    const { getByRole } = render(<InteractiveComponent onAction={handleAction} />);
    
    const element = getByRole('button');
    element.focus();
    fireEvent.keyDown(element, { key: 'Enter' });
    
    expect(handleAction).toHaveBeenCalled();
  });

  it('should have correct focus management', () => {
    const { getByRole, getByText } = render(<InteractiveComponent />);
    
    // Öffne ein Dropdown oder Modal
    const trigger = getByRole('button');
    fireEvent.click(trigger);
    
    // Überprüfe, ob der Fokus korrekt gesetzt wird
    const firstFocusableElement = getByText('Option 1');
    expect(document.activeElement).toBe(firstFocusableElement);
  });

  it('should trap focus in modal/dialog', () => {
    const { getByRole } = render(<InteractiveComponent isOpen />);
    
    const dialog = getByRole('dialog');
    const focusableElements = dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    // Überprüfe, ob der Fokus im Dialog gefangen ist
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    lastElement.focus();
    fireEvent.keyDown(lastElement, { key: 'Tab' });
    expect(document.activeElement).toBe(firstElement);
    
    firstElement.focus();
    fireEvent.keyDown(firstElement, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(lastElement);
  });
});
```

### Komplexe Komponenten (z.B. Tabellen, Diagramme)

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ComplexComponent } from '../ComplexComponent';

expect.extend(toHaveNoViolations);

describe('ComplexComponent - Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<ComplexComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have correct semantic structure', () => {
    const { getByRole } = render(<ComplexComponent />);
    
    // Für Tabellen
    const table = getByRole('table');
    expect(table).toBeInTheDocument();
    expect(getByRole('rowgroup')).toBeInTheDocument();
    expect(getByRole('row')).toBeInTheDocument();
    expect(getByRole('columnheader')).toBeInTheDocument();
    expect(getByRole('cell')).toBeInTheDocument();
    
    // Für Diagramme
    expect(table).toHaveAttribute('aria-label');
    expect(table).toHaveAttribute('role', 'table');
  });

  it('should provide alternative text for visual elements', () => {
    const { getByRole } = render(<ComplexComponent />);
    
    // Für Diagramme
    const chart = getByRole('img');
    expect(chart).toHaveAttribute('aria-label');
    
    // Oder für Canvas-basierte Diagramme
    const canvas = document.querySelector('canvas');
    expect(canvas).toHaveAttribute('aria-label');
    expect(canvas.parentElement).toHaveAttribute('role', 'img');
  });

  it('should be navigable with keyboard', () => {
    const { getAllByRole } = render(<ComplexComponent />);
    
    // Für Tabellen
    const cells = getAllByRole('cell');
    cells.forEach(cell => {
      cell.focus();
      expect(document.activeElement).toBe(cell);
    });
    
    // Für Diagramme (falls interaktiv)
    const dataPoints = getAllByRole('button');
    dataPoints.forEach(point => {
      point.focus();
      expect(document.activeElement).toBe(point);
    });
  });
});
```

## Tipps für effektive A11y-Tests

1. **Teste verschiedene Zustände**: Teste die Komponente in verschiedenen Zuständen (z.B. disabled, loading, error).
2. **Teste mit verschiedenen Eingabemethoden**: Teste die Komponente mit Maus, Tastatur und Screenreader.
3. **Teste mit verschiedenen Themes**: Teste die Komponente mit verschiedenen Themes (z.B. light, dark).
4. **Teste mit verschiedenen Größen**: Teste die Komponente mit verschiedenen Größen (z.B. small, medium, large).
5. **Teste mit realistischen Daten**: Verwende realistische Daten für die Tests.
6. **Teste Edge Cases**: Teste Grenzfälle wie leere Daten, sehr lange Texte, etc.
7. **Teste mit verschiedenen Browsern**: Teste die Komponente in verschiedenen Browsern (falls möglich).

## Ressourcen

- [jest-axe Dokumentation](https://github.com/nickcolley/jest-axe)
- [React Testing Library Dokumentation](https://testing-library.com/docs/react-testing-library/intro/)
- [WCAG 2.1 Richtlinien](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [Deque University](https://dequeuniversity.com/)