# Testinfrastruktur-Implementierung für Smolitux UI

Dieses Dokument beschreibt die Implementierung der Testinfrastruktur für die Smolitux UI-Bibliothek gemäß dem Testplan.

## Überblick

Die Testinfrastruktur wurde mit folgenden Tools und Technologien eingerichtet:

- **Jest**: Haupttestrunner für Unit- und Integrationstests
- **React Testing Library**: DOM-basierte Tests für React-Komponenten
- **Testing Library User Event**: Simulation von Benutzerinteraktionen
- **Jest DOM**: Zusätzliche DOM-spezifische Matcher für Jest

## Implementierte Dateien

### 1. Jest-Konfiguration

Die Datei `jest.config.js` im Wurzelverzeichnis enthält die Konfiguration für Jest:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // CSS-Module-Mocking
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // SVG und andere Assets
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    // Alias-Auflösung für '@smolitux/'
    '^@smolitux/(.*)$': '<rootDir>/packages/@smolitux/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: [
    'packages/@smolitux/**/*.{ts,tsx}',
    '!packages/@smolitux/**/*.stories.{ts,tsx}',
    '!packages/@smolitux/**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
};
```

### 2. Jest Setup-Datei

Die Datei `jest.setup.js` im Wurzelverzeichnis enthält globale Setup-Funktionen für Jest:

```javascript
import '@testing-library/jest-dom';

// Globale Mock-Funktionen
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

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

### 3. Mock-Dateien

Die folgenden Mock-Dateien wurden erstellt:

- `src/__mocks__/fileMock.js`: Mock für Datei-Importe
- `src/__mocks__/styleMock.js`: Mock für Style-Importe

### 4. Test-Utilities

Die folgenden Test-Utilities wurden erstellt:

- `test-utils/index.ts`: Hauptexport-Datei mit Custom-Render-Funktion
- `test-utils/test-data.ts`: Gemeinsame Testdaten
- `test-utils/test-helpers.ts`: Hilfsfunktionen für Tests
- `test-utils/test-mocks.ts`: Gemeinsame Mocks

### 5. Beispiel-Test

Ein Beispiel-Test für die Button-Komponente wurde erstellt:

- `packages/@smolitux/core/src/components/Button/__tests__/Button.test.tsx`

## Testordnerstruktur

Für jede Komponente wird die folgende konsistente Teststruktur verwendet:

```
components/
└── ComponentName/
    ├── ComponentName.tsx          # Komponenten-Code
    ├── ComponentName.stories.tsx  # Storybook-Stories
    ├── index.ts                   # Export-Datei
    └── __tests__/
        ├── ComponentName.test.tsx      # Unit-Tests
        └── ComponentName.int.test.tsx  # Integrationstests (falls nötig)
```

## Test-Skripte

Die folgenden Test-Skripte wurden in der `package.json` hinzugefügt:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage"
  }
}
```

## Custom Render-Funktion

Eine Custom-Render-Funktion wurde erstellt, um den ThemeProvider in Tests zu verwenden:

```typescript
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@smolitux/theme';

// Custom render mit ThemeProvider
export const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { theme?: 'light' | 'dark' }
) => {
  const { theme = 'light', ...rest } = options || {};
  return render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
    ),
    ...rest,
  });
};

// Re-export everything from testing-library
export * from '@testing-library/react';
export { customRender as render };
```

## Testdaten und Hilfsfunktionen

Gemeinsame Testdaten und Hilfsfunktionen wurden erstellt, um die Tests konsistenter und wartbarer zu machen:

- **Testdaten**: Vordefinierte Testdaten für verschiedene Komponenten
- **Hilfsfunktionen**: Funktionen für häufig verwendete Test-Patterns
- **Mocks**: Gemeinsame Mocks für externe Abhängigkeiten

## Nächste Schritte

Die folgenden Schritte sind als Nächstes geplant:

1. **Implementierung von Unit-Tests für weitere Komponenten**: Beginnend mit Input, Select und Card
2. **Implementierung von Integrationstests**: Tests für Komponenten, die miteinander interagieren
3. **Einrichtung von Playwright für E2E-Tests**: Für Browser-Kompatibilitätstests
4. **Einrichtung von Chromatic für visuelle Tests**: Für visuelle Regressionstests
5. **Integration in CI/CD-Pipeline**: Automatisierte Tests bei jedem Commit und Pull Request

## Fazit

Die Testinfrastruktur für die Smolitux UI-Bibliothek wurde erfolgreich eingerichtet. Die Infrastruktur ermöglicht es, Unit-Tests für alle Komponenten zu schreiben und auszuführen. Die Tests sind konsistent, wartbar und folgen den Best Practices für React-Komponententests.