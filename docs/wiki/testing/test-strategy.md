# Teststrategie für Smolitux UI

## Einführung

Diese Teststrategie definiert den Ansatz für das Testen der Smolitux UI Komponentenbibliothek. Unser Ziel ist es, eine hohe Qualität und Zuverlässigkeit der Komponenten sicherzustellen, indem wir verschiedene Testebenen und -methoden kombinieren.

## Testebenen

### 1. Unit-Tests

Unit-Tests prüfen die Funktionalität einzelner Komponenten in Isolation.

**Werkzeuge:**
- Jest als Test-Runner
- React Testing Library für komponentenbasierte Tests
- jest-axe für Barrierefreiheitstests

**Testumfang:**
- Rendering mit verschiedenen Props
- Interaktionen (Klicks, Eingaben, etc.)
- Zustandsänderungen
- Callback-Aufrufe
- Styling und Klassennamen
- Barrierefreiheit

**Beispiel:**

```tsx
// Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  test('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 2. Barrierefreiheitstests

Spezielle Tests zur Überprüfung der Barrierefreiheit von Komponenten.

**Werkzeuge:**
- jest-axe für automatisierte Barrierefreiheitstests
- cypress-axe für E2E-Barrierefreiheitstests

**Testumfang:**
- ARIA-Attribute
- Semantische HTML-Struktur
- Tastaturnavigation
- Farbkontrast
- Screenreader-Kompatibilität

**Beispiel:**

```tsx
// Button.a11y.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '../Button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  test('should not have accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should not have accessibility violations when disabled', async () => {
    const { container } = render(<Button disabled>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### 3. Integrationstests

Integrationstests prüfen das Zusammenspiel mehrerer Komponenten.

**Werkzeuge:**
- Jest und React Testing Library
- Storybook für visuelle Tests

**Testumfang:**
- Komponentenkomposition
- Datenaustausch zwischen Komponenten
- Komplexe Interaktionen
- Zustandsmanagement

**Beispiel:**

```tsx
// Form.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Form, Input, Button } from '../index';

describe('Form Integration', () => {
  test('submits form data when button is clicked', () => {
    const handleSubmit = jest.fn();
    render(
      <Form onSubmit={handleSubmit}>
        <Input name="username" defaultValue="testuser" />
        <Button type="submit">Submit</Button>
      </Form>
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleSubmit).toHaveBeenCalledWith({ username: 'testuser' });
  });
});
```

### 4. Visuelle Regressionstests

Visuelle Tests prüfen das Erscheinungsbild der Komponenten.

**Werkzeuge:**
- Storybook
- Playwright oder Cypress für Screenshots
- Reg-suit oder Percy für visuelle Vergleiche

**Testumfang:**
- Layout und Styling
- Responsives Design
- Themes und Farbschemata
- Animationen und Übergänge

**Beispiel:**

```js
// visual.test.js
const { test, expect } = require('@playwright/test');

test('Button visual regression', async ({ page }) => {
  await page.goto('http://localhost:6006/iframe.html?id=core-inputs-button--primary');
  
  // Vergleiche Screenshot mit Referenz
  await expect(page).toHaveScreenshot('button-primary.png');
});
```

### 5. End-to-End-Tests

E2E-Tests prüfen die Komponenten in einer realistischen Umgebung.

**Werkzeuge:**
- Cypress oder Playwright
- Storybook als Testumgebung

**Testumfang:**
- Benutzerflüsse
- Browserkompatibilität
- Leistung und Ladezeiten
- Netzwerkinteraktionen

**Beispiel:**

```js
// button.cy.js
describe('Button Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:6006/iframe.html?id=core-inputs-button--primary');
  });

  it('should handle click events', () => {
    cy.get('button').click();
    // Prüfe Ergebnis des Klicks
  });

  it('should be accessible', () => {
    cy.injectAxe();
    cy.checkA11y();
  });
});
```

## Testabdeckung

Wir streben folgende Testabdeckung an:

- **Unit-Tests**: >90% Codeabdeckung
- **Barrierefreiheitstests**: 100% der Komponenten
- **Integrationstests**: Alle wichtigen Komponentenkombinationen
- **Visuelle Tests**: Alle Komponenten in allen Varianten
- **E2E-Tests**: Kritische Benutzerflüsse

## Testautomatisierung

### Continuous Integration

Tests werden automatisch bei jedem Pull Request ausgeführt:

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Run accessibility tests
        run: npm run test:a11y
```

### Pre-commit Hooks

Lokale Tests vor dem Commit:

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "jest --findRelatedTests"
    ]
  }
}
```

## Testdaten

### Mock-Daten

Für konsistente Tests verwenden wir Mock-Daten:

```tsx
// mocks/data.ts
export const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com'
};

export const mockProducts = [
  { id: '1', name: 'Product 1', price: 10 },
  { id: '2', name: 'Product 2', price: 20 }
];
```

### Test-Utilities

Wiederverwendbare Test-Utilities:

```tsx
// test-utils.tsx
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

## Testumgebung

### Setup

```js
// jest.setup.js
import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';

// Mock für window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

### Konfiguration

```js
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}'
  ],
};
```

## Testdokumentation

### Testplan

Für jede Komponente wird ein Testplan erstellt:

```md
# Testplan für Button-Komponente

## Unit-Tests
- [ ] Rendering mit verschiedenen Varianten (primary, secondary, etc.)
- [ ] Rendering mit verschiedenen Größen
- [ ] Klick-Event-Handling
- [ ] Disabled-Zustand

## Barrierefreiheitstests
- [ ] ARIA-Attribute
- [ ] Tastaturnavigation
- [ ] Farbkontrast

## Visuelle Tests
- [ ] Alle Varianten und Größen
- [ ] Hover- und Fokus-Zustände
- [ ] Dark Mode

## E2E-Tests
- [ ] Klick-Interaktionen
- [ ] Formular-Submission
```

### Testberichte

Nach jedem Testlauf werden Berichte generiert:

- Jest Coverage Report
- Axe Accessibility Report
- Visual Regression Report
- E2E Test Report
- Test Coverage Dashboard (docs/wiki/testing/test-coverage-dashboard.md)

## Best Practices

1. **Testpyramide**: Mehr Unit-Tests als Integrationstests, mehr Integrationstests als E2E-Tests.
2. **Testbare Komponenten**: Komponenten so gestalten, dass sie leicht zu testen sind.
3. **Deterministische Tests**: Tests sollten immer die gleichen Ergebnisse liefern.
4. **Isolierte Tests**: Tests sollten unabhängig voneinander sein.
5. **Aussagekräftige Tests**: Tests sollten klar dokumentieren, was getestet wird.
6. **Schnelle Tests**: Tests sollten schnell ausgeführt werden können.
7. **Wartbare Tests**: Tests sollten einfach zu warten sein.

## Fehlerbehebung

### Häufige Probleme

1. **Flaky Tests**: Tests, die manchmal fehlschlagen
   - Lösung: Deterministische Mocks, stabile Selektoren, Wartezeiten

2. **Langsame Tests**: Tests, die zu lange dauern
   - Lösung: Parallelisierung, Mocking, Fokus auf Unit-Tests

3. **Schwer zu wartende Tests**: Tests, die bei kleinen Änderungen brechen
   - Lösung: Testen von Verhalten statt Implementierung, stabile Selektoren

## Ressourcen

- [Jest Dokumentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress Dokumentation](https://docs.cypress.io/)
- [Storybook Testing](https://storybook.js.org/docs/react/writing-tests/introduction)
- [Axe-core Regeln](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)