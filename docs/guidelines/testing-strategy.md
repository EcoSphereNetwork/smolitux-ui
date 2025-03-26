# Testing-Strategie

Diese Dokumentation beschreibt die Testing-Strategie für die Smolitux-UI-Bibliothek.

## Übersicht

Die Testing-Strategie für Smolitux-UI umfasst verschiedene Arten von Tests, um sicherzustellen, dass die Komponenten korrekt funktionieren, gut aussehen und benutzerfreundlich sind.

## Testarten

### 1. Unit-Tests

Unit-Tests testen einzelne Komponenten oder Funktionen isoliert.

#### Ziele

- Sicherstellen, dass Komponenten korrekt rendern
- Überprüfen, dass Komponenten auf Benutzerinteraktionen reagieren
- Testen von Props und Callbacks
- Überprüfen von Zustandsänderungen

#### Werkzeuge

- Jest: Test-Runner und Assertion-Bibliothek
- React Testing Library: Für komponentenbasierte Tests
- jest-dom: Für DOM-spezifische Assertions

#### Beispiel

```tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with the correct label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button label="Click me" onClick={onClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Click me" onClick={() => {}} disabled />);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

### 2. Integration-Tests

Integration-Tests testen das Zusammenspiel mehrerer Komponenten.

#### Ziele

- Überprüfen, dass Komponenten korrekt zusammenarbeiten
- Testen von Datenfluss zwischen Komponenten
- Überprüfen von komplexen Interaktionen

#### Werkzeuge

- Jest: Test-Runner und Assertion-Bibliothek
- React Testing Library: Für komponentenbasierte Tests
- jest-dom: Für DOM-spezifische Assertions

#### Beispiel

```tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from './Form';

describe('Form', () => {
  it('submits the form with the correct data', () => {
    const onSubmit = jest.fn();
    render(<Form onSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' },
    });
    
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });
    
    fireEvent.click(screen.getByText('Submit'));
    
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
    });
  });
});
```

### 3. Snapshot-Tests

Snapshot-Tests überprüfen, ob sich das Erscheinungsbild einer Komponente unbeabsichtigt ändert.

#### Ziele

- Erkennen von unbeabsichtigten Änderungen am Erscheinungsbild
- Dokumentieren des aktuellen Zustands einer Komponente
- Schnelles Testen von UI-Komponenten

#### Werkzeuge

- Jest: Test-Runner und Snapshot-Funktionalität

#### Beispiel

```tsx
import React from 'react';
import { render } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('matches snapshot', () => {
    const { container } = render(<Button label="Click me" onClick={() => {}} />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot when disabled', () => {
    const { container } = render(<Button label="Click me" onClick={() => {}} disabled />);
    expect(container).toMatchSnapshot();
  });
});
```

### 4. Visuelle Regressionstests

Visuelle Regressionstests überprüfen, ob sich das Erscheinungsbild einer Komponente visuell ändert.

#### Ziele

- Erkennen von visuellen Regressionen
- Überprüfen von Komponenten in verschiedenen Browsern und Geräten
- Testen von Responsive Design

#### Werkzeuge

- Storybook: Für die Darstellung von Komponenten
- Chromatic: Für visuelle Regressionstests
- Percy: Alternative zu Chromatic

#### Beispiel

```tsx
// Button.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: 'Click me',
    onClick: () => {},
  },
};

export const Disabled: Story = {
  args: {
    label: 'Click me',
    onClick: () => {},
    disabled: true,
  },
};
```

### 5. End-to-End-Tests

End-to-End-Tests testen die Anwendung aus der Perspektive des Benutzers.

#### Ziele

- Überprüfen, dass die Anwendung als Ganzes funktioniert
- Testen von Benutzerflüssen
- Überprüfen von Integrationen mit externen Diensten

#### Werkzeuge

- Playwright: Für End-to-End-Tests
- Cypress: Alternative zu Playwright

#### Beispiel

```tsx
// login.spec.ts
import { test, expect } from '@playwright/test';

test('user can log in', async ({ page }) => {
  await page.goto('https://example.com/login');
  
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'password');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('https://example.com/dashboard');
  await expect(page.locator('h1')).toHaveText('Welcome, User');
});
```

### 6. Barrierefreiheitstests

Barrierefreiheitstests überprüfen, ob die Komponenten für alle Benutzer zugänglich sind.

#### Ziele

- Sicherstellen, dass Komponenten barrierefrei sind
- Überprüfen von ARIA-Attributen
- Testen von Keyboard-Navigation

#### Werkzeuge

- jest-axe: Für automatisierte Barrierefreiheitstests
- Storybook a11y addon: Für Barrierefreiheitstests in Storybook

#### Beispiel

```tsx
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button label="Click me" onClick={() => {}} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### 7. Performance-Tests

Performance-Tests überprüfen, ob die Komponenten performant sind.

#### Ziele

- Messen von Renderzeiten
- Identifizieren von Performance-Bottlenecks
- Überprüfen von Speicherverbrauch

#### Werkzeuge

- React Profiler: Für Profiling von React-Komponenten
- Lighthouse: Für Performance-Messungen
- Chrome DevTools: Für Performance-Profiling

#### Beispiel

```tsx
import React from 'react';
import { Profiler } from 'react';
import { render } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders efficiently', () => {
    const onRender = jest.fn();
    
    render(
      <Profiler id="Button" onRender={onRender}>
        <Button label="Click me" onClick={() => {}} />
      </Profiler>
    );
    
    expect(onRender).toHaveBeenCalled();
    const [, , actualDuration] = onRender.mock.calls[0];
    expect(actualDuration).toBeLessThan(5); // ms
  });
});
```

## Testabdeckung

Die Testabdeckung sollte mindestens 80% betragen. Die Testabdeckung wird mit Jest gemessen.

```bash
npm test -- --coverage
```

## Testorganisation

Tests sollten neben den Komponenten platziert werden, die sie testen.

```
ComponentName/
├── ComponentName.tsx
├── ComponentName.test.tsx
├── ComponentName.stories.tsx
└── index.ts
```

## Continuous Integration

Tests sollten in der CI-Pipeline ausgeführt werden, um sicherzustellen, dass keine Regressionen eingeführt werden.

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm ci
      - run: npm test
      - run: npm run test:e2e
      - run: npm run test:a11y
```

## Mocking

Externe Abhängigkeiten sollten gemockt werden, um Tests deterministisch zu machen.

```tsx
// __mocks__/axios.js
export default {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
};
```

## Best Practices

1. **Isolation**: Testen Sie Komponenten isoliert.
2. **Determinismus**: Stellen Sie sicher, dass Tests deterministisch sind.
3. **Lesbarkeit**: Schreiben Sie lesbare Tests.
4. **Wartbarkeit**: Schreiben Sie wartbare Tests.
5. **Geschwindigkeit**: Stellen Sie sicher, dass Tests schnell ausgeführt werden.

## Testprozess

1. **Schreiben**: Schreiben Sie Tests für neue Komponenten.
2. **Ausführen**: Führen Sie Tests lokal aus.
3. **Überprüfen**: Überprüfen Sie die Testabdeckung.
4. **Verbessern**: Verbessern Sie Tests, wenn nötig.
5. **Automatisieren**: Automatisieren Sie Tests in der CI-Pipeline.

## Fazit

Eine umfassende Testing-Strategie ist entscheidend für die Qualität der Smolitux-UI-Bibliothek. Durch die Kombination verschiedener Testarten können wir sicherstellen, dass die Komponenten korrekt funktionieren, gut aussehen und benutzerfreundlich sind.