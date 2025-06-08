# @smolitux/testing

Testing-Utilities für Smolitux UI Komponenten, mit besonderem Fokus auf Barrierefreiheitstests.

## Installation

```bash
npm install --save-dev @smolitux/testing
```

## Verwendung

### Barrierefreiheitstests

```tsx
import { render } from '@testing-library/react';
import { a11y } from '@smolitux/testing';
import { Button } from '@smolitux/core';

describe('Button Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { violations } = await a11y.testA11y(<Button>Klick mich</Button>);
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes when disabled', () => {
    const { getByRole } = render(<Button isDisabled>Klick mich</Button>);
    const button = getByRole('button');

    expect(
      a11y.hasCorrectAriaAttributes(button, {
        'aria-disabled': 'true',
      })
    ).toBe(true);
  });
});
```

### Verfügbare Funktionen

#### `testA11y(component, options)`

Führt einen Barrierefreiheitstest für eine Komponente durch.

```tsx
const { violations, passes, incomplete, renderResult } = await a11y.testA11y(
  <Button>Klick mich</Button>,
  {
    failOnViolation: true, // Test schlägt fehl, wenn Verstöße gefunden werden
    disabledRules: ['color-contrast'], // Regeln, die ignoriert werden sollen
    axeOptions: {}, // Zusätzliche axe-Konfiguration
  }
);
```

#### `hasCorrectAriaAttributes(element, attributes)`

Prüft, ob ein Element die korrekten ARIA-Attribute hat.

```tsx
const button = getByRole('button');
const hasCorrectAttributes = a11y.hasCorrectAriaAttributes(button, {
  'aria-disabled': 'true',
  'aria-pressed': 'false',
});
```

#### `hasCorrectRole(element, role)`

Prüft, ob ein Element die korrekte Rolle hat.

```tsx
const button = getByText('Klick mich');
const hasCorrectRole = a11y.hasCorrectRole(button, 'button');
```

#### `isFocusable(element)`

Prüft, ob ein Element fokussierbar ist.

```tsx
const button = getByRole('button');
const focusable = a11y.isFocusable(button);
```

#### `hasVisibleFocusIndicator(element)`

Prüft, ob ein Element einen sichtbaren Fokusindikator hat.

```tsx
const button = getByRole('button');
button.focus();
const hasFocusIndicator = a11y.hasVisibleFocusIndicator(button);
```

#### `hasAdequateColorContrast(foregroundColor, backgroundColor, isLargeText)`

Prüft, ob ein Element einen ausreichenden Farbkontrast hat.

```tsx
const hasContrast = a11y.hasAdequateColorContrast('#ffffff', '#2563eb', false);
```

### Custom Matchers

Richte optionale Jest-Matcher ein, um die Utilities komfortabler zu nutzen:

```tsx
import { registerA11yMatchers } from '@smolitux/testing';

// vor deinen Tests ausführen
registerA11yMatchers();

expect(element).toHaveAriaAttributes({ 'aria-label': 'save' });
expect(element).toBeFocusable();
```

## Lizenz

MIT
