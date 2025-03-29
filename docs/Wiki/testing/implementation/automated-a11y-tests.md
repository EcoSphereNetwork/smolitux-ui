# Automatisierte Barrierefreiheitstests

Diese Dokumentation beschreibt die Implementierung und Verwendung der automatisierten Barrierefreiheitstests für die Smolitux UI Komponenten.

## Überblick

Die Smolitux UI Bibliothek verwendet automatisierte Barrierefreiheitstests, um sicherzustellen, dass alle Komponenten den WCAG 2.1 AA-Standards entsprechen. Diese Tests werden mit Hilfe der `@smolitux/testing` Bibliothek durchgeführt, die auf `jest-axe` basiert.

## Einrichtung

### Installation

```bash
npm install --save-dev @smolitux/testing jest-axe @types/jest-axe
```

### Jest-Konfiguration

In der `jest.config.js` Datei:

```js
module.exports = {
  // ... andere Konfigurationen
  setupFilesAfterEnv: [
    // ... andere Setup-Dateien
    './jest.setup.js'
  ]
};
```

In der `jest.setup.js` Datei:

```js
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);
```

## Verwendung

### Grundlegende Tests

```tsx
import { a11y } from '@smolitux/testing';
import { Button } from '@smolitux/core';

describe('Button Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { violations } = await a11y.testA11y(<Button>Klick mich</Button>);
    expect(violations).toHaveLength(0);
  });
});
```

### Tests mit Optionen

```tsx
import { a11y } from '@smolitux/testing';
import { Button } from '@smolitux/core';

describe('Button Accessibility', () => {
  it('should not have accessibility violations with custom options', async () => {
    const { violations } = await a11y.testA11y(
      <Button>Klick mich</Button>,
      {
        failOnViolation: true, // Test schlägt fehl, wenn Verstöße gefunden werden
        disabledRules: ['color-contrast'], // Regeln, die ignoriert werden sollen
        axeOptions: {
          rules: {
            'button-name': { enabled: false }
          }
        }
      }
    );
    expect(violations).toHaveLength(0);
  });
});
```

### ARIA-Attribute testen

```tsx
import { render } from '@testing-library/react';
import { a11y } from '@smolitux/testing';
import { Button } from '@smolitux/core';

describe('Button ARIA Attributes', () => {
  it('should have correct ARIA attributes when disabled', () => {
    const { getByRole } = render(<Button isDisabled>Klick mich</Button>);
    const button = getByRole('button');
    
    expect(
      a11y.hasCorrectAriaAttributes(button, {
        'aria-disabled': 'true'
      })
    ).toBe(true);
  });
});
```

### Fokusierbarkeit testen

```tsx
import { render } from '@testing-library/react';
import { a11y } from '@smolitux/testing';
import { Button } from '@smolitux/core';

describe('Button Focus', () => {
  it('should be focusable', () => {
    const { getByRole } = render(<Button>Klick mich</Button>);
    const button = getByRole('button');
    
    expect(a11y.isFocusable(button)).toBe(true);
  });
  
  it('should have visible focus indicator', () => {
    const { getByRole } = render(<Button>Klick mich</Button>);
    const button = getByRole('button');
    
    button.focus();
    expect(a11y.hasVisibleFocusIndicator(button)).toBe(true);
  });
});
```

### Farbkontrast testen

```tsx
import { a11y } from '@smolitux/testing';

describe('Color Contrast', () => {
  it('should have adequate color contrast', () => {
    // Für normalen Text (WCAG AA: 4.5:1)
    expect(a11y.hasAdequateColorContrast('#ffffff', '#2563eb', false)).toBe(true);
    
    // Für großen Text (WCAG AA: 3:1)
    expect(a11y.hasAdequateColorContrast('#ffffff', '#4b5563', true)).toBe(true);
  });
});
```

## Verfügbare Funktionen

### `testA11y(component, options)`

Führt einen Barrierefreiheitstest für eine Komponente durch.

**Parameter:**
- `component`: Die zu testende React-Komponente
- `options`: Optionen für den Test
  - `failOnViolation`: Ob der Test fehlschlagen soll, wenn Verstöße gefunden werden (Standard: `true`)
  - `disabledRules`: Regeln, die ignoriert werden sollen
  - `axeOptions`: Zusätzliche axe-Konfiguration

**Rückgabewert:**
- `violations`: Array von gefundenen Verstößen
- `passes`: Array von bestandenen Tests
- `incomplete`: Array von unvollständigen Tests
- `renderResult`: Das Ergebnis des Renderns der Komponente

### `hasCorrectAriaAttributes(element, attributes)`

Prüft, ob ein Element die korrekten ARIA-Attribute hat.

**Parameter:**
- `element`: Das zu prüfende Element
- `attributes`: Die erwarteten ARIA-Attribute

**Rückgabewert:**
- `boolean`: `true`, wenn alle Attribute korrekt sind

### `hasCorrectRole(element, role)`

Prüft, ob ein Element die korrekte Rolle hat.

**Parameter:**
- `element`: Das zu prüfende Element
- `role`: Die erwartete Rolle

**Rückgabewert:**
- `boolean`: `true`, wenn die Rolle korrekt ist

### `isFocusable(element)`

Prüft, ob ein Element fokussierbar ist.

**Parameter:**
- `element`: Das zu prüfende Element

**Rückgabewert:**
- `boolean`: `true`, wenn das Element fokussierbar ist

### `hasVisibleFocusIndicator(element)`

Prüft, ob ein Element einen sichtbaren Fokusindikator hat.

**Parameter:**
- `element`: Das zu prüfende Element

**Rückgabewert:**
- `boolean`: `true`, wenn das Element einen sichtbaren Fokusindikator hat

### `hasAdequateColorContrast(foregroundColor, backgroundColor, isLargeText)`

Prüft, ob ein Element einen ausreichenden Farbkontrast hat.

**Parameter:**
- `foregroundColor`: Die Vordergrundfarbe (Text)
- `backgroundColor`: Die Hintergrundfarbe
- `isLargeText`: Ob es sich um großen Text handelt (>= 18pt oder >= 14pt und fett)

**Rückgabewert:**
- `boolean`: `true`, wenn der Kontrast ausreichend ist (WCAG AA)

## Best Practices

### 1. Tests für alle Komponenten

Jede Komponente sollte mindestens einen grundlegenden Barrierefreiheitstest haben:

```tsx
describe('ComponentName Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { violations } = await a11y.testA11y(<ComponentName />);
    expect(violations).toHaveLength(0);
  });
});
```

### 2. Tests für verschiedene Zustände

Teste Komponenten in verschiedenen Zuständen:

```tsx
describe('Button Accessibility', () => {
  it('should not have accessibility violations in default state', async () => {
    const { violations } = await a11y.testA11y(<Button>Klick mich</Button>);
    expect(violations).toHaveLength(0);
  });
  
  it('should not have accessibility violations when disabled', async () => {
    const { violations } = await a11y.testA11y(<Button isDisabled>Klick mich</Button>);
    expect(violations).toHaveLength(0);
  });
  
  it('should not have accessibility violations when loading', async () => {
    const { violations } = await a11y.testA11y(<Button isLoading>Klick mich</Button>);
    expect(violations).toHaveLength(0);
  });
});
```

### 3. Spezifische ARIA-Tests

Teste spezifische ARIA-Attribute für verschiedene Zustände:

```tsx
describe('Button ARIA Attributes', () => {
  it('should have correct ARIA attributes when disabled', () => {
    const { getByRole } = render(<Button isDisabled>Klick mich</Button>);
    const button = getByRole('button');
    
    expect(
      a11y.hasCorrectAriaAttributes(button, {
        'aria-disabled': 'true'
      })
    ).toBe(true);
  });
  
  it('should have correct ARIA attributes when loading', () => {
    const { getByRole } = render(<Button isLoading>Klick mich</Button>);
    const button = getByRole('button');
    
    expect(
      a11y.hasCorrectAriaAttributes(button, {
        'aria-busy': 'true'
      })
    ).toBe(true);
  });
});
```

### 4. Tastaturnavigation testen

Teste die Tastaturnavigation für interaktive Komponenten:

```tsx
describe('Button Keyboard Navigation', () => {
  it('should be activatable with Enter key', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Klick mich</Button>);
    const button = getByRole('button');
    
    button.focus();
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('should be activatable with Space key', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Klick mich</Button>);
    const button = getByRole('button');
    
    button.focus();
    fireEvent.keyDown(button, { key: ' ', code: 'Space' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Integration in CI/CD

Die Barrierefreiheitstests sollten in die CI/CD-Pipeline integriert werden, um sicherzustellen, dass keine Änderungen die Barrierefreiheit beeinträchtigen.

### GitHub Actions Beispiel

```yaml
name: Accessibility Tests

on:
  push:
    branches: [ main, development ]
  pull_request:
    branches: [ main, development ]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Run accessibility tests
        run: npm run test:a11y
```

## Fazit

Die automatisierten Barrierefreiheitstests sind ein wichtiger Bestandteil der Qualitätssicherung für die Smolitux UI Komponenten. Sie helfen dabei, sicherzustellen, dass alle Komponenten den WCAG 2.1 AA-Standards entsprechen und für alle Benutzer zugänglich sind.

Durch die Integration in die CI/CD-Pipeline wird sichergestellt, dass keine Änderungen die Barrierefreiheit beeinträchtigen und dass alle neuen Komponenten von Anfang an barrierefrei sind.