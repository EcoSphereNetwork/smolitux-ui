# CI/CD-Integration für Smolitux UI

Dieses Dokument beschreibt die Integration der Teststrategie in eine Continuous Integration/Continuous Deployment (CI/CD) Pipeline für die Smolitux UI-Bibliothek.

## Überblick

Die CI/CD-Pipeline für die Smolitux UI-Bibliothek besteht aus zwei Hauptworkflows:

1. **CI-Workflow**: Wird bei Pull Requests und Pushes auf main/develop ausgeführt
2. **Release-Workflow**: Wird beim Pushen von Tags ausgeführt

## CI-Workflow

Der CI-Workflow besteht aus den folgenden Jobs:

### 1. Build and Test

Dieser Job führt die folgenden Schritte aus:

- Checkout des Codes
- Setup von Node.js
- Installation der Abhängigkeiten
- Linting
- Build
- Tests
- Upload der Testabdeckung zu Codecov

### 2. Visual Testing

Dieser Job führt die folgenden Schritte aus:

- Checkout des Codes
- Setup von Node.js
- Installation der Abhängigkeiten
- Veröffentlichung zu Chromatic für visuelle Regressionstests

### 3. E2E Testing

Dieser Job führt die folgenden Schritte aus:

- Checkout des Codes
- Setup von Node.js
- Installation der Abhängigkeiten
- Installation von Playwright
- Build von Storybook
- Ausführung der Playwright-Tests
- Upload des Playwright-Reports

## Release-Workflow

Der Release-Workflow besteht aus den folgenden Jobs:

### 1. Release

Dieser Job führt die folgenden Schritte aus:

- Checkout des Codes
- Setup von Node.js
- Installation der Abhängigkeiten
- Build
- Tests
- Veröffentlichung auf npm
- Erstellung eines GitHub Releases

### 2. Deploy Documentation

Dieser Job führt die folgenden Schritte aus:

- Checkout des Codes
- Setup von Node.js
- Installation der Abhängigkeiten
- Build von Storybook
- Deployment zu GitHub Pages

## Konfiguration

### GitHub Actions

Die GitHub Actions-Workflows sind in den folgenden Dateien definiert:

- `.github/workflows/ci.yml`: CI-Workflow
- `.github/workflows/release.yml`: Release-Workflow

### Jest-Konfiguration

Die Jest-Konfiguration wurde aktualisiert, um JUnit-Berichte zu generieren:

```javascript
reporters: [
  'default',
  ['jest-junit', {
    outputDirectory: './reports/jest',
    outputName: 'jest-junit.xml',
  }],
],
```

### Playwright-Konfiguration

Die Playwright-Konfiguration wurde in der Datei `playwright.config.ts` definiert:

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

### Package.json-Skripte

Die folgenden Skripte wurden in der `package.json` hinzugefügt:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage",
    "test:e2e": "playwright test",
    "test:visual": "chromatic --project-token=${CHROMATIC_PROJECT_TOKEN}",
    "build-storybook": "cd packages/docs && npm run build-storybook"
  }
}
```

## Secrets

Die folgenden Secrets werden für die CI/CD-Pipeline benötigt:

- `CODECOV_TOKEN`: Token für Codecov
- `CHROMATIC_PROJECT_TOKEN`: Token für Chromatic
- `NPM_TOKEN`: Token für npm
- `GITHUB_TOKEN`: Token für GitHub (automatisch verfügbar)

## Testberichte

Die folgenden Testberichte werden generiert:

- **Jest-Berichte**: JUnit-Berichte in `reports/jest/jest-junit.xml`
- **Playwright-Berichte**: HTML-Berichte in `playwright-report/`
- **Chromatic-Berichte**: Verfügbar in der Chromatic-Oberfläche

## Status-Badges

Die folgenden Status-Badges können in die README.md eingefügt werden:

```markdown
![CI](https://github.com/EcoSphereNetwork/smolitux-ui/workflows/CI/badge.svg)
![Coverage](https://img.shields.io/codecov/c/github/EcoSphereNetwork/smolitux-ui)
```

## Nächste Schritte

Die folgenden Schritte sind als Nächstes geplant:

1. **Einrichtung von Codecov**: Für die Überwachung der Testabdeckung
2. **Einrichtung von Chromatic**: Für visuelle Regressionstests
3. **Konfiguration von Branch-Schutzregeln**: Um sicherzustellen, dass alle Tests bestanden werden, bevor ein Merge möglich ist
4. **Automatisierte Release-Erstellung**: Mit Semantic Release
5. **Benachrichtigungen**: Slack-Benachrichtigungen für Pipeline-Status

## Fazit

Die CI/CD-Pipeline für die Smolitux UI-Bibliothek ist jetzt eingerichtet und bereit für die Integration in den Entwicklungsprozess. Die Pipeline stellt sicher, dass alle Tests bestanden werden, bevor ein Merge möglich ist, und automatisiert den Release-Prozess.