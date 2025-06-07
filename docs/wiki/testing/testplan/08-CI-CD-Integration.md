# CI/CD-Integration

Dieses Dokument beschreibt die Integration der Teststrategie in eine Continuous Integration/Continuous Deployment (CI/CD) Pipeline für die smolitux UI-Bibliothek.

## 1. Überblick CI/CD für Komponentenbibliotheken

Eine effektive CI/CD-Pipeline für eine Komponentenbibliothek sollte folgende Phasen enthalten:

1. **Build**: Kompilierung und Bundling der Komponenten
2. **Test**: Automatisierte Tests (Unit, Integration, E2E)
3. **Dokumentation**: Generierung der Storybook-Dokumentation
4. **Veröffentlichung**: Paketierung und Veröffentlichung auf npm
5. **Deployment**: Bereitstellung der Dokumentation

## 2. GitHub Actions für CI/CD

GitHub Actions bietet eine einfache und flexible Möglichkeit, CI/CD-Pipelines zu implementieren.

### 2.1 CI-Workflow für Pull Requests

Erstellen Sie eine `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

jobs:
  build_and_test:
    name: Build and Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Build
        run: npm run build
      
      - name: Test
        run: npm run test
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
      
  visual_testing:
    name: Visual Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Required for Chromatic to work correctly
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Publish to Chromatic
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          token: ${{ secrets.GITHUB_TOKEN }}
      
  e2e_testing:
    name: E2E Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Build Storybook
        run: npm run build-storybook
      
      - name: Run Playwright tests
        run: |
          npx concurrently -k -s first -n "SB,TEST" \
            "npx http-server storybook-static --port 6006 --silent" \
            "npx wait-on tcp:6006 && npx playwright test"
      
      - name: Upload Playwright report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### 2.2 CD-Workflow für Releases

Erstellen Sie eine `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Test
        run: npm run test
      
      - name: Publish to NPM
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
      
      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          generate_release_notes: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      
  deploy_docs:
    name: Deploy Documentation
    needs: release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build Storybook
        run: npm run build-storybook
      
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: storybook-static
          branch: gh-pages
```

## 3. Automatisierte Tests in der Pipeline

### 3.1 Unit- und Integrationstests

```yaml
# Ausschnitt aus CI-Workflow
- name: Test
  run: npm run test

- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    token: ${{ secrets.CODECOV_TOKEN }}
```

### 3.2 Visuelle Regressionstests

```yaml
# Ausschnitt aus CI-Workflow
- name: Publish to Chromatic
  uses: chromaui/action@v1
  with:
    projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
    token: ${{ secrets.GITHUB_TOKEN }}
```

### 3.3 E2E-Tests

```yaml
# Ausschnitt aus CI-Workflow
- name: Run Playwright tests
  run: |
    npx concurrently -k -s first -n "SB,TEST" \
      "npx http-server storybook-static --port 6006 --silent" \
      "npx wait-on tcp:6006 && npx playwright test"
```

## 4. Testberichte und Artefakte

### 4.1 Jest-Testberichte

Konfigurieren Sie Jest, um JUnit-Berichte zu generieren:

```javascript
// jest.config.js
module.exports = {
  // ... andere Konfigurationen
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './reports/jest',
      outputName: 'jest-junit.xml',
    }],
  ],
};
```

Berichte in der CI-Pipeline hochladen:

```yaml
- name: Upload Jest Test Report
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: jest-report
    path: reports/jest/
    retention-days: 30
```

### 4.2 Playwright-Testberichte

Automatisch generierte Playwright-Berichte:

```yaml
- name: Upload Playwright report
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 30
```

### 4.3 Chromatic-Berichte

Berichte zu visuellen Tests werden direkt in der Chromatic-Oberfläche angezeigt und mit Pull Requests verknüpft.

## 5. Pull Request Status Checks

Status-Checks für Pull Requests konfigurieren, um sicherzustellen, dass alle Tests bestanden werden, bevor ein Merge möglich ist.

### 5.1 Branch-Schutzregeln in GitHub

1. Navigieren Sie zu den Repository-Einstellungen
2. Wählen Sie "Branches" > "Branch protection rules" > "Add rule"
3. Konfigurieren Sie die Regel für den `main`-Branch:
   - Require status checks to pass before merging ✓
   - Require branches to be up to date before merging ✓
   - Status checks that are required:
     - build_and_test
     - visual_testing
     - e2e_testing

## 6. Testumgebungen

Für verschiedene Testphasen können unterschiedliche Umgebungen definiert werden:

### 6.1 Test-Umgebungsvariablen

```yaml
env:
  NODE_ENV: test
  TEST_REPORT_PATH: './reports'
  STORYBOOK_PORT: 6006
```

### 6.2 Browser-Matrix für Tests

```yaml
strategy:
  matrix:
    browser: [chromium, firefox, webkit]

steps:
  # ...
  - name: Run browser tests
    run: npx playwright test --project=${{ matrix.browser }}
```

## 7. Automatisierte Release-Erstellung

### 7.1 Semantic Release

Integration von Semantic Release für automatisierte Versionierung und Release-Generierung:

```
# package.json
{
  "scripts": {
    "semantic-release": "semantic-release"
  },
  "devDependencies": {
    "semantic-release": "^18.0.0"
  }
}
```

```yaml
# .github/workflows/release.yml
- name: Semantic Release
  run: npx semantic-release
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 7.2 Automatisierte Changelog-Generierung

Mit Semantic Release wird der Changelog automatisch aus den Commit-Nachrichten generiert.

## 8. Notifikationen und Feedback

### 8.1 Pull Request-Kommentare

```yaml
- name: Comment PR with Test Results
  uses: actions/github-script@v6
  if: github.event_name == 'pull_request'
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    script: |
      const fs = require('fs');
      const testSummary = fs.readFileSync('./reports/summary.md', 'utf8');
      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: testSummary
      });
```

### 8.2 Slack-Benachrichtigungen

```yaml
- name: Slack Notification
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    fields: repo,message,commit,author,action,eventName,workflow
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
  if: always()
```

### 8.3 Status-Badges

Fügen Sie Status-Badges in Ihre README.md ein:

```markdown
# smolitux UI

![CI](https://github.com/user/repo/workflows/CI/badge.svg)
![E2E Tests](https://github.com/user/repo/workflows/E2E%20Tests/badge.svg)
![Coverage](https://img.shields.io/codecov/c/github/user/repo)
```

## 9. Kontinuierliche Überwachung

### 9.1 Test-Trends

Verwenden Sie die Test-Insights von GitHub Actions oder ein externes Dashboarding-Tool wie Datadog oder Grafana, um Trends bei Testausführungen zu erkennen.

### 9.2 Testabdeckungsüberwachung

Codecov oder ähnliche Dienste können die Testabdeckung überwachen und Alarme auslösen, wenn sie unter einen bestimmten Schwellenwert fällt.

## 10. Fehlerbehandlung in der Pipeline

### 10.1 Wiederholungsversuche für instabile Tests

```yaml
- name: Run E2E Tests with Retry
  uses: nick-invision/retry@v2
  with:
    timeout_minutes: 10
    max_attempts: 3
    command: npm run test:e2e
```

### 10.2 Fehlerisolation

Teilen Sie die Pipeline in unabhängige Jobs auf, sodass einzelne Fehler nicht die gesamte Pipeline stoppen.

## 11. Best Practices für CI/CD

1. **Schnelle Feedback-Loops**: Priorisieren Sie schnell laufende Tests am Anfang der Pipeline
2. **Fehlerhafte Tests isolieren**: Identifizieren und isolieren Sie instabile Tests
3. **Ressourcenoptimierung**: Verwenden Sie Caching und parallele Jobs
4. **Umgebungskonsistenz**: Verwenden Sie Container, um konsistente Testumgebungen zu gewährleisten
5. **Versionsverwaltung**: Versionieren Sie Testdaten und Abhängigkeiten
6. **Sicherheit**: Schützen Sie sensible Daten mit Secrets
7. **Dokumentation**: Dokumentieren Sie die CI/CD-Pipeline und Fehlerbehebungsprozesse
8. **Wartungsplan**: Regelmäßig die Pipeline überprüfen und aktualisieren

## 12. Beispiel für eine vollständige GitHub Actions-Workflow-Datei

```yaml
name: smolitux UI Test Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  unit_tests:
    name: Unit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      - run: npm ci
      - run: npm run test:unit
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [lint]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
          retention-days: 7

  visual_tests:
    name: Visual Tests
    runs-on: ubuntu-latest
    needs: [build]
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      - run: npm ci
      - name: Publish to Chromatic
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          token: ${{ secrets.GITHUB_TOKEN }}

  browser_tests:
    name: Browser Tests
    runs-on: ubuntu-latest
    needs: [build]
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      - run: npm ci
      - name: Install Playwright
        run: npx playwright install --with-deps
      - name: Build Storybook
        run: npm run build-storybook
      - name: Run Playwright tests
        run: |
          npx concurrently -k -s first -n "SB,TEST" \
            "npx http-server storybook-static --port 6006 --silent" \
            "npx wait-on tcp:6006 && npx playwright test --project=${{ matrix.browser }}"
      - name: Upload Playwright report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report-${{ matrix.browser }}
          path: playwright-report/
          retention-days: 30

  notify:
    name: Notification
    runs-on: ubuntu-latest
    needs: [unit_tests, visual_tests, browser_tests]
    if: always()
    steps:
      - name: Slack Notification
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          fields: repo,message,commit,author,action,eventName,workflow
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```
