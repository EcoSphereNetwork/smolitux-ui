# Testinfrastruktur für smolitux UI

Dieses Dokument beschreibt die technische Infrastruktur, die für die Durchführung der Tests der smolitux UI-Komponenten erforderlich ist.

## 1. Testframework und Tools

| Tool | Verwendungszweck | Installation |
|------|-----------------|-------------|
| **Jest** | Haupttestrunner für Unit- und Integrationstests | `npm install --save-dev jest @types/jest ts-jest` |
| **React Testing Library** | DOM-basierte Tests für React-Komponenten | `npm install --save-dev @testing-library/react @testing-library/user-event @testing-library/jest-dom` |
| **Storybook** | Isolierte Komponententests und visuelle Testing-Grundlage | `npx storybook init` (falls noch nicht eingerichtet) |
| **Chromatic** | Visuelle Regressionstests | `npm install --save-dev chromatic` |
| **Playwright** | End-to-End-Tests und Browserkompatibilitätstests | `npm install --save-dev @playwright/test` |
| **MSW** | API-Mocking für Tests | `npm install --save-dev msw` |

## 2. Jest-Konfiguration

Erstellen Sie eine `jest.config.js` im Wurzelverzeichnis mit folgender Konfiguration:

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

## 3. Jest Setup-Datei

Erstellen Sie eine `jest.setup.js` im Wurzelverzeichnis:

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

// Zusätzliche globale Testing-Utilities können hier hinzugefügt werden
```

## 4. Mock-Dateien einrichten

Erstellen Sie folgende Mock-Dateien:

```javascript
// src/__mocks__/fileMock.js
module.exports = 'test-file-stub';

// src/__mocks__/styleMock.js
module.exports = {};
```

## 5. Testordnerstruktur

Für jede Komponente sollte die folgende konsistente Teststruktur verwendet werden:

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

## 6. Test-Skripte

Fügen Sie folgende Skripte in Ihre `package.json` ein:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage",
    "test:e2e": "playwright test",
    "test:visual": "chromatic --project-token=<your-token>",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook"
  }
}
```

## 7. Playwright-Konfiguration für E2E-Tests

Erstellen Sie eine `playwright.config.ts` im Wurzelverzeichnis:

```typescript
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './e2e-tests',
  timeout: 30000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
};

export default config;
```

## 8. Storybook-Konfiguration für visuelle Tests

Aktualisieren Sie Ihre `.storybook/main.js`:

```javascript
module.exports = {
  stories: [
    '../packages/@smolitux/**/*.stories.@(tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
  },
  core: {
    builder: '@storybook/builder-webpack5',
  },
};
```

## 9. Testdaten und -utilities

Erstellen Sie einen gemeinsamen Ordner für Testdaten und Hilfsfunktionen:

```
├── test-utils/
│   ├── index.ts          # Export aller Utilities
│   ├── test-data.ts      # Gemeinsame Testdaten
│   ├── test-helpers.ts   # Hilfsfunktionen für Tests
│   └── test-mocks.ts     # Gemeinsame Mocks
```

## 10. Empfohlene VS Code-Erweiterungen für Tests

- Jest Runner
- Testing Library
- Playwright Test for VSCode

## 11. Kontinuierliche Integration

Einrichtung einer CI-Pipeline (GitHub Actions, GitLab CI o.ä.) für automatisierte Tests bei jedem Commit und Pull Request. Die detaillierte Konfiguration wird im Dokument "08-CI-CD-Integration.md" beschrieben.
