# CI/CD-Integration für Smolitux UI

Dieses Dokument beschreibt die Implementierung der CI/CD-Integration für die Smolitux UI-Bibliothek.

## Überblick

Die CI/CD-Integration für Smolitux UI besteht aus zwei Hauptworkflows:

1. **CI-Workflow**: Wird bei Pull Requests und Pushes auf main/develop ausgeführt
2. **Release-Workflow**: Wird beim Pushen von Tags ausgeführt

## CI-Workflow

Der CI-Workflow ist in der Datei `.github/workflows/ci.yml` definiert und führt folgende Jobs aus:

### Lint

```yaml
lint:
  name: Lint
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Lint
      run: npm run lint
```

Dieser Job prüft den Code auf Einhaltung der Coding-Standards mit ESLint und TypeScript.

### Unit Tests

```yaml
unit_tests:
  name: Unit Tests
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        token: ${{ secrets.CODECOV_TOKEN }}
        fail_ci_if_error: false
```

Dieser Job führt die Unit- und Integrationstests mit Jest aus und lädt die Testabdeckungsberichte zu Codecov hoch.

### Build

```yaml
build:
  name: Build
  runs-on: ubuntu-latest
  needs: [lint]
  steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: dist
        path: packages/@smolitux/*/dist/
        retention-days: 7
```

Dieser Job kompiliert die Komponenten mit TypeScript und speichert die Build-Artefakte für andere Jobs.

### Storybook

```yaml
storybook:
  name: Build Storybook
  runs-on: ubuntu-latest
  needs: [build]
  steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build Storybook
      run: npm run build-storybook
    
    - name: Upload Storybook build
      uses: actions/upload-artifact@v3
      with:
        name: storybook-static
        path: storybook-static
        retention-days: 7
```

Dieser Job baut die Storybook-Dokumentation und speichert die Storybook-Artefakte für E2E-Tests.

### Visual Tests (optional)

```yaml
visual_tests:
  name: Visual Tests
  runs-on: ubuntu-latest
  needs: [build]
  # Nur ausführen, wenn CHROMATIC_PROJECT_TOKEN gesetzt ist
  if: ${{ env.CHROMATIC_PROJECT_TOKEN != '' }}
  steps:
    - uses: actions/checkout@v3
      with:
        fetch-depth: 0  # Required for Chromatic to work correctly
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Publish to Chromatic
      uses: chromaui/action@v1
      with:
        projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
        token: ${{ secrets.GITHUB_TOKEN }}
  env:
    CHROMATIC_PROJECT_TOKEN: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

Dieser Job führt visuelle Regressionstests mit Chromatic durch, wenn ein Chromatic-Projekt-Token konfiguriert ist.

### Browser Tests

```yaml
browser_tests:
  name: Browser Tests
  runs-on: ubuntu-latest
  needs: [storybook]
  strategy:
    matrix:
      browser: [chromium, firefox]
  steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright
      run: npx playwright install --with-deps ${{ matrix.browser }}
    
    - name: Download Storybook build
      uses: actions/download-artifact@v3
      with:
        name: storybook-static
        path: storybook-static
    
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
```

Dieser Job führt E2E-Tests mit Playwright auf verschiedenen Browsern aus und verwendet die gebaute Storybook-Dokumentation.

### Notification

```yaml
notify:
  name: Notification
  runs-on: ubuntu-latest
  needs: [unit_tests, build, storybook, browser_tests]
  if: always() && github.event_name == 'push' && (github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop')
  steps:
    - name: Check status
      id: check
      run: |
        if [[ "${{ needs.unit_tests.result }}" == "success" && \
              "${{ needs.build.result }}" == "success" && \
              "${{ needs.storybook.result }}" == "success" && \
              "${{ needs.browser_tests.result }}" == "success" ]]; then
          echo "status=success" >> $GITHUB_OUTPUT
        else
          echo "status=failure" >> $GITHUB_OUTPUT
        fi
    
    - name: Send notification
      if: ${{ env.SLACK_WEBHOOK_URL != '' }}
      uses: 8398a7/action-slack@v3
      with:
        status: ${{ steps.check.outputs.status }}
        fields: repo,message,commit,author,action,eventName,workflow
      env:
        SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

Dieser Job sendet Benachrichtigungen über den Pipeline-Status, wenn ein Slack-Webhook konfiguriert ist.

## Release-Workflow

Der Release-Workflow ist in der Datei `.github/workflows/release.yml` definiert und wird ausgeführt, wenn ein neues Tag gepusht wird:

### Release

```yaml
release:
  name: Release
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        registry-url: 'https://registry.npmjs.org'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Test
      run: npm run test
    
    - name: Publish to NPM
      run: |
        cd packages/@smolitux/core
        npm publish --access public
        cd ../../@smolitux/theme
        npm publish --access public
        cd ../../@smolitux/layout
        npm publish --access public
        cd ../../@smolitux/charts
        npm publish --access public
      env:
        NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
    
    - name: Create GitHub Release
      uses: softprops/action-gh-release@v1
      with:
        generate_release_notes: true
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Dieser Job baut die Pakete, führt Tests aus, veröffentlicht die Pakete auf npm und erstellt einen GitHub Release mit Release Notes.

### Deploy Docs

```yaml
deploy_docs:
  name: Deploy Documentation
  needs: release
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
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

Dieser Job baut die Storybook-Dokumentation und veröffentlicht sie auf GitHub Pages.

## Konfigurationsdateien

### Codecov-Konfiguration

Die Codecov-Konfiguration ist in der Datei `codecov.yml` definiert:

```yaml
codecov:
  require_ci_to_pass: yes

coverage:
  precision: 2
  round: down
  range: "70...100"
  status:
    project:
      default:
        target: 80%
        threshold: 5%
    patch:
      default:
        target: 80%
        threshold: 10%

parsers:
  gcov:
    branch_detection:
      conditional: yes
      loop: yes
      method: no
      macro: no

comment:
  layout: "reach,diff,flags,files,footer"
  behavior: default
  require_changes: no
```

Diese Konfiguration definiert die Anforderungen an die Testabdeckung und die Darstellung der Berichte.

### Jest-Konfiguration

Die Jest-Konfiguration ist in der Datei `jest.config.js` definiert:

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
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './reports/jest',
      outputName: 'jest-junit.xml',
    }],
  ],
};
```

Diese Konfiguration definiert die Testumgebung, die Testabdeckung und die Berichterstellung.

### Playwright-Konfiguration

Die Playwright-Konfiguration ist in der Datei `playwright.config.ts` definiert:

```typescript
import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './e2e-tests',
  timeout: 30000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list'],
    ['junit', { outputFile: 'reports/playwright/results.xml' }]
  ],
  use: {
    actionTimeout: 15000,
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
};

export default config;
```

Diese Konfiguration definiert die E2E-Testumgebung, die Browser und die Berichterstellung.

## Erforderliche Secrets

Folgende Secrets müssen in den GitHub Repository-Einstellungen konfiguriert werden:

- `NPM_TOKEN`: Token für die Veröffentlichung auf npm
- `CODECOV_TOKEN`: Token für die Hochladung von Testabdeckungsberichten
- `CHROMATIC_PROJECT_TOKEN` (optional): Token für visuelle Regressionstests
- `SLACK_WEBHOOK_URL` (optional): URL für Slack-Benachrichtigungen

## Branch-Schutzregeln

Für den `main`-Branch sollten folgende Schutzregeln konfiguriert werden:

1. Require status checks to pass before merging
2. Require branches to be up to date before merging
3. Status checks that are required:
   - lint
   - unit_tests
   - build
   - browser_tests

## Fazit

Die CI/CD-Integration für die Smolitux UI-Bibliothek bietet eine umfassende Pipeline für die kontinuierliche Integration und Bereitstellung. Sie stellt sicher, dass der Code qualitativ hochwertig ist, alle Tests bestanden werden und die Dokumentation aktuell ist. Die Pipeline ist flexibel und kann leicht an zukünftige Anforderungen angepasst werden.