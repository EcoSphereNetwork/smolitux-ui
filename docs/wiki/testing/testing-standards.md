# Teststandards und Best Practices für Smolitux UI

Diese Dokumentation beschreibt die Teststandards und Best Practices für die Entwicklung und das Testen von Komponenten in der Smolitux UI Bibliothek. Sie dient als Leitfaden für alle Mitwirkenden, um eine konsistente und hochwertige Testabdeckung sicherzustellen.

## Inhaltsverzeichnis

1. [Allgemeine Testprinzipien](#allgemeine-testprinzipien)
2. [Testarten](#testarten)
3. [Teststruktur](#teststruktur)
4. [Namenskonventionen](#namenskonventionen)
5. [Accessibility (A11y) Tests](#accessibility-a11y-tests)
6. [Unit Tests](#unit-tests)
7. [Integration Tests](#integration-tests)
8. [Snapshot Tests](#snapshot-tests)
9. [Visual Regression Tests](#visual-regression-tests)
10. [Performance Tests](#performance-tests)
11. [Test-Driven Development (TDD)](#test-driven-development-tdd)
12. [Continuous Integration](#continuous-integration)
13. [Testabdeckung](#testabdeckung)
14. [Mocking und Stubbing](#mocking-und-stubbing)
15. [Fehlerbehebung](#fehlerbehebung)

## Allgemeine Testprinzipien

- **Testbarkeit**: Komponenten sollten von Anfang an mit Testbarkeit im Sinn entwickelt werden.
- **Isolation**: Tests sollten isoliert sein und keine Abhängigkeiten zu anderen Tests haben.
- **Wiederholbarkeit**: Tests sollten deterministisch sein und bei jeder Ausführung das gleiche Ergebnis liefern.
- **Lesbarkeit**: Tests sollten leicht zu lesen und zu verstehen sein.
- **Wartbarkeit**: Tests sollten leicht zu warten sein und sich an Änderungen in der Komponente anpassen lassen.

## Testarten

Für jede Komponente sollten folgende Testarten implementiert werden:

1. **Unit Tests**: Testen einzelner Komponenten in Isolation
2. **Integration Tests**: Testen der Interaktion zwischen Komponenten
3. **Accessibility (A11y) Tests**: Testen der Barrierefreiheit
4. **Snapshot Tests**: Testen der visuellen Konsistenz
5. **Visual Regression Tests**: Testen der visuellen Änderungen (optional)
6. **Performance Tests**: Testen der Leistung (für komplexe Komponenten)

## Teststruktur

Die Testdateien sollten in einem `__tests__`-Verzeichnis neben der Komponente platziert werden:

```
/packages/@smolitux/[package]/src/components/[ComponentName]/
  ├── __tests__/
  │   ├── [ComponentName].test.tsx       # Unit Tests
  │   ├── [ComponentName].a11y.test.tsx  # Accessibility Tests
  │   ├── [ComponentName].spec.tsx       # Integration Tests
  │   └── [ComponentName].stories.tsx    # Storybook Stories (für visuelle Tests)
  ├── [ComponentName].tsx                # Komponente
  └── index.ts                           # Export
```

## Namenskonventionen

- **Unit Tests**: `[ComponentName].test.tsx`
- **Accessibility Tests**: `[ComponentName].a11y.test.tsx`
- **Integration Tests**: `[ComponentName].spec.tsx`
- **Storybook Stories**: `[ComponentName].stories.tsx`

## Accessibility (A11y) Tests

Accessibility Tests sollten mit jest-axe durchgeführt werden:

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ComponentName } from '../ComponentName';

expect.extend(toHaveNoViolations);

describe('ComponentName - Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<ComponentName />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Weitere spezifische Tests für die Komponente
});
```

### Best Practices für A11y Tests

1. **Teste verschiedene Zustände**: Teste die Komponente in verschiedenen Zuständen (z.B. disabled, loading, error).
2. **Teste Keyboard-Navigation**: Stelle sicher, dass die Komponente mit der Tastatur bedient werden kann.
3. **Teste mit verschiedenen Themes**: Teste die Komponente mit verschiedenen Themes (z.B. light, dark).
4. **Teste mit verschiedenen Größen**: Teste die Komponente mit verschiedenen Größen (z.B. small, medium, large).

## Unit Tests

Unit Tests sollten mit Jest und React Testing Library durchgeführt werden:

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from '../ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<ComponentName onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Weitere Tests für die Komponente
});
```

### Best Practices für Unit Tests

1. **Teste die Funktionalität**: Teste, ob die Komponente wie erwartet funktioniert.
2. **Teste die Props**: Teste, ob die Komponente die Props korrekt verarbeitet.
3. **Teste die Ereignisse**: Teste, ob die Komponente Ereignisse korrekt verarbeitet.
4. **Teste die Zustände**: Teste, ob die Komponente verschiedene Zustände korrekt darstellt.
5. **Teste die Fehlerbehandlung**: Teste, ob die Komponente Fehler korrekt behandelt.

## Integration Tests

Integration Tests sollten mit Jest und React Testing Library durchgeführt werden:

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from '../../Form/Form';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';

describe('Form Integration', () => {
  it('should submit form data correctly', () => {
    const handleSubmit = jest.fn();
    render(
      <Form onSubmit={handleSubmit}>
        <Input name="username" />
        <Button type="submit">Submit</Button>
      </Form>
    );
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'testuser' } });
    fireEvent.click(screen.getByRole('button'));
    
    expect(handleSubmit).toHaveBeenCalledWith({ username: 'testuser' });
  });

  // Weitere Tests für die Integration
});
```

### Best Practices für Integration Tests

1. **Teste die Interaktion**: Teste, ob die Komponenten korrekt miteinander interagieren.
2. **Teste den Datenfluss**: Teste, ob Daten korrekt zwischen Komponenten fließen.
3. **Teste komplexe Szenarien**: Teste komplexe Szenarien, die mehrere Komponenten umfassen.
4. **Teste die Fehlerbehandlung**: Teste, ob Fehler korrekt zwischen Komponenten propagiert werden.

## Snapshot Tests

Snapshot Tests sollten mit Jest durchgeführt werden:

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { ComponentName } from '../ComponentName';

describe('ComponentName - Snapshots', () => {
  it('should match snapshot', () => {
    const { container } = render(<ComponentName />);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with props', () => {
    const { container } = render(<ComponentName variant="primary" />);
    expect(container).toMatchSnapshot();
  });

  // Weitere Snapshot-Tests für verschiedene Zustände
});
```

### Best Practices für Snapshot Tests

1. **Halte Snapshots klein**: Teste spezifische Teile der Komponente statt der gesamten Komponente.
2. **Aktualisiere Snapshots bewusst**: Überprüfe Änderungen an Snapshots sorgfältig.
3. **Teste verschiedene Zustände**: Erstelle Snapshots für verschiedene Zustände der Komponente.
4. **Vermeide zu viele Snapshots**: Zu viele Snapshots können die Wartung erschweren.

## Visual Regression Tests

Visual Regression Tests sollten mit Storybook und Chromatic durchgeführt werden:

1. Erstelle Storybook Stories für die Komponente:

```typescript
import React from 'react';
import { ComponentName } from '../ComponentName';

export default {
  title: 'Components/ComponentName',
  component: ComponentName,
};

export const Default = () => <ComponentName />;
export const Primary = () => <ComponentName variant="primary" />;
export const Secondary = () => <ComponentName variant="secondary" />;
export const Disabled = () => <ComponentName disabled />;
```

2. Konfiguriere Chromatic für visuelle Regressionstests.

### Best Practices für Visual Regression Tests

1. **Teste verschiedene Viewports**: Teste die Komponente in verschiedenen Bildschirmgrößen.
2. **Teste verschiedene Themes**: Teste die Komponente mit verschiedenen Themes.
3. **Teste verschiedene Zustände**: Teste die Komponente in verschiedenen Zuständen.
4. **Teste Animationen**: Teste Animationen mit verschiedenen Verzögerungen.

## Performance Tests

Performance Tests sollten für komplexe Komponenten durchgeführt werden:

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { ComponentName } from '../ComponentName';

describe('ComponentName - Performance', () => {
  it('should render efficiently with many items', () => {
    const items = Array.from({ length: 1000 }, (_, i) => ({ id: i, name: `Item ${i}` }));
    
    const start = performance.now();
    render(<ComponentName items={items} />);
    const end = performance.now();
    
    expect(end - start).toBeLessThan(100); // Sollte in weniger als 100ms rendern
  });

  // Weitere Performance-Tests
});
```

### Best Practices für Performance Tests

1. **Teste mit realistischen Datenmengen**: Teste die Komponente mit realistischen Datenmengen.
2. **Setze Schwellenwerte**: Definiere klare Schwellenwerte für akzeptable Leistung.
3. **Teste auf verschiedenen Geräten**: Teste die Leistung auf verschiedenen Geräten (wenn möglich).
4. **Teste Speicherverbrauch**: Teste den Speicherverbrauch der Komponente.

## Test-Driven Development (TDD)

Wir empfehlen die Verwendung von Test-Driven Development (TDD) für die Entwicklung neuer Komponenten:

1. **Schreibe zuerst Tests**: Schreibe Tests, die das erwartete Verhalten der Komponente beschreiben.
2. **Implementiere die Komponente**: Implementiere die Komponente, um die Tests zu bestehen.
3. **Refaktoriere**: Verbessere den Code, während die Tests weiterhin bestehen.

## Continuous Integration

Alle Tests werden automatisch in der CI/CD-Pipeline ausgeführt:

1. **Pull Requests**: Tests werden automatisch für Pull Requests ausgeführt.
2. **Main Branch**: Tests werden automatisch für den Main Branch ausgeführt.
3. **Release**: Tests werden automatisch vor einem Release ausgeführt.

## Testabdeckung

Wir streben eine hohe Testabdeckung an:

1. **Statements**: Mindestens 80% Abdeckung
2. **Branches**: Mindestens 80% Abdeckung
3. **Functions**: Mindestens 90% Abdeckung
4. **Lines**: Mindestens 80% Abdeckung

Die Testabdeckung wird automatisch in der CI/CD-Pipeline gemessen und berichtet.

## Mocking und Stubbing

Für Tests, die externe Abhängigkeiten haben, sollten Mocks und Stubs verwendet werden:

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ComponentName } from '../ComponentName';
import { useData } from '../../hooks/useData';

// Mock des Hooks
jest.mock('../../hooks/useData', () => ({
  useData: jest.fn(),
}));

describe('ComponentName', () => {
  beforeEach(() => {
    // Mock zurücksetzen
    jest.clearAllMocks();
  });

  it('should render data correctly', () => {
    // Mock konfigurieren
    (useData as jest.Mock).mockReturnValue({
      data: [{ id: 1, name: 'Test' }],
      loading: false,
      error: null,
    });

    render(<ComponentName />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render loading state', () => {
    // Mock konfigurieren
    (useData as jest.Mock).mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });

    render(<ComponentName />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // Weitere Tests mit Mocks
});
```

### Best Practices für Mocking und Stubbing

1. **Mocke nur das Nötigste**: Mocke nur die Teile, die für den Test relevant sind.
2. **Setze Mocks zurück**: Setze Mocks zwischen Tests zurück, um Seiteneffekte zu vermeiden.
3. **Verwende realistische Daten**: Verwende realistische Daten für Mocks.
4. **Dokumentiere Mocks**: Dokumentiere, welche Teile gemockt wurden und warum.

## Fehlerbehebung

Wenn Tests fehlschlagen, folge diesen Schritten zur Fehlerbehebung:

1. **Überprüfe die Fehlermeldung**: Verstehe, was genau fehlgeschlagen ist.
2. **Isoliere das Problem**: Führe einzelne Tests aus, um das Problem zu isolieren.
3. **Überprüfe Änderungen**: Überprüfe, welche Änderungen das Problem verursacht haben könnten.
4. **Überprüfe Abhängigkeiten**: Überprüfe, ob Abhängigkeiten aktualisiert wurden.
5. **Überprüfe Mocks**: Überprüfe, ob Mocks korrekt konfiguriert sind.
6. **Überprüfe die Testumgebung**: Überprüfe, ob die Testumgebung korrekt konfiguriert ist.

## Ressourcen

- [Jest Dokumentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Dokumentation](https://testing-library.com/docs/react-testing-library/intro/)
- [jest-axe Dokumentation](https://github.com/nickcolley/jest-axe)
- [Storybook Dokumentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Chromatic Dokumentation](https://www.chromatic.com/docs/)
- [WCAG 2.1 Richtlinien](https://www.w3.org/TR/WCAG21/)