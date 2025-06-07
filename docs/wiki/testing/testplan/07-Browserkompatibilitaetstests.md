# Browserkompatibilitaetstests

Dieses Dokument beschreibt die Strategie und Implementierung von Browserkompatibilitätstests für die Komponenten der smolitux UI-Bibliothek.

## 1. Zweck von Browserkompatibilitätstests

Browserkompatibilitätstests stellen sicher, dass die Komponenten in verschiedenen Browsern konsistent funktionieren. Diese Tests sind wichtig für:

1. Sicherstellung der Funktionalität in allen unterstützten Browsern
2. Erkennung von renderbedingten Unterschieden zwischen Browsern
3. Validierung der Interaktivität auf verschiedenen Plattformen
4. Überprüfung der Barrierefreiheit in verschiedenen Browsern

## 2. Einrichtung von Playwright für Browserkompatibilitätstests

[Playwright](https://playwright.dev/) ist ein modernes Framework für End-to-End-Tests, das mehrere Browser unterstützt.

### 2.1 Installation und Einrichtung

```bash
# Installation von Playwright
npm install --save-dev @playwright/test

# Installation der Browser
npx playwright install
```

### 2.2 Playwright-Konfiguration

Erstellen Sie eine `playwright.config.ts` im Wurzelverzeichnis:

```typescript
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './e2e-tests',
  timeout: 30000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: ['html', 'list'],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
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
    // Mobile Browser-Emulation
    {
      name: 'Mobile Chrome',
      use: { 
        browserName: 'chromium',
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 12'],
      },
    },
  ],
};

export default config;
```

Vergessen Sie nicht, die Devices zu importieren:

```typescript
import { PlaywrightTestConfig, devices } from '@playwright/test';
```

### 2.3 Storybook Integration für Playwright-Tests

Die Tests werden auf einem laufenden Storybook-Server ausgeführt. Dafür können wir die Storybook-URL direkt in den Tests verwenden:

```bash
# Storybook starten
npm run storybook

# In einem anderen Terminal die Tests ausführen
npx playwright test
```

## 3. Struktur der Browserkompatibilitätstests

### 3.1 Testordnerstruktur

```
e2e-tests/
├── components/
│   ├── button.spec.ts
│   ├── form-elements.spec.ts
│   ├── modal.spec.ts
│   └── ...
├── utils/
│   ├── test-utils.ts
│   └── ...
└── fixtures/
    ├── test-data.json
    └── ...
```

### 3.2 Beispiel: Grundlegende Komponenten testen

```typescript
// e2e-tests/components/button.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigiere zur Button-Geschichte im Storybook
    await page.goto('http://localhost:6006/iframe.html?id=components-button--primary');
  });

  test('renders primary button correctly', async ({ page }) => {
    const button = page.locator('button.bg-primary-600');
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Primary Button');
  });

  test('handles click events', async ({ page }) => {
    // Zur interaktiven Geschichte navigieren
    await page.goto('http://localhost:6006/iframe.html?id=components-button--with-click-handler');
    
    const button = page.locator('button');
    const clickCounter = page.locator('[data-testid="click-counter"]');
    
    // Initial sollte der Zähler 0 sein
    await expect(clickCounter).toHaveText('Clicks: 0');
    
    // Nach einem Klick sollte der Zähler 1 sein
    await button.click();
    await expect(clickCounter).toHaveText('Clicks: 1');
    
    // Nach einem weiteren Klick sollte der Zähler 2 sein
    await button.click();
    await expect(clickCounter).toHaveText('Clicks: 2');
  });

  test('applies hover styles correctly', async ({ page }) => {
    const button = page.locator('button');
    
    // Prüfen des Standard-Stils
    await expect(button).toHaveCSS('background-color', 'rgb(37, 99, 235)'); // bg-primary-600
    
    // Prüfen des Hover-Stils
    await button.hover();
    await expect(button).toHaveCSS('background-color', 'rgb(29, 78, 216)'); // bg-primary-700
  });

  test('respects disabled state', async ({ page }) => {
    // Zur disabled-Geschichte navigieren
    await page.goto('http://localhost:6006/iframe.html?id=components-button--disabled');
    
    const button = page.locator('button');
    
    // Button sollte disabled sein
    await expect(button).toBeDisabled();
    
    // Button sollte die disabled-Stile haben
    await expect(button).toHaveCSS('opacity', '0.5');
    
    // Button sollte nicht klickbar sein
    const clickCounter = page.locator('[data-testid="click-counter"]');
    await button.click({ force: true }); // Versuchen, trotz disabled zu klicken
    await expect(clickCounter).toHaveText('Clicks: 0'); // Sollte sich nicht ändern
  });
});
```

### 3.3 Beispiel: Komplexe Komponenten testen

```typescript
// e2e-tests/components/modal.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Modal Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigiere zur Modal-Geschichte im Storybook
    await page.goto('http://localhost:6006/iframe.html?id=components-modal--default');
  });

  test('opens and closes modal correctly', async ({ page }) => {
    const openButton = page.locator('button', { hasText: 'Open Modal' });
    
    // Modal sollte zunächst nicht sichtbar sein
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
    
    // Modal öffnen
    await openButton.click();
    
    // Modal sollte sichtbar sein
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    
    // Prüfen des Modal-Titels
    await expect(modal.locator('h2')).toHaveText('Modal Title');
    
    // Modal schließen
    const closeButton = modal.locator('button', { hasText: 'Close' });
    await closeButton.click();
    
    // Modal sollte nicht mehr sichtbar sein
    await expect(modal).not.toBeVisible();
  });

  test('closes modal when clicking on overlay', async ({ page }) => {
    const openButton = page.locator('button', { hasText: 'Open Modal' });
    
    await openButton.click();
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    
    // Auf den Overlay klicken (außerhalb des Modal-Inhalts)
    await page.mouse.click(10, 10);
    
    // Modal sollte nicht mehr sichtbar sein
    await expect(modal).not.toBeVisible();
  });

  test('prevents closing modal when closeOnOverlayClick is false', async ({ page }) => {
    // Zur entsprechenden Geschichte navigieren
    await page.goto('http://localhost:6006/iframe.html?id=components-modal--prevent-outside-click');
    
    const openButton = page.locator('button', { hasText: 'Open Modal' });
    await openButton.click();
    
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    
    // Auf den Overlay klicken
    await page.mouse.click(10, 10);
    
    // Modal sollte immer noch sichtbar sein
    await expect(modal).toBeVisible();
  });

  test('handles keyboard navigation correctly', async ({ page }) => {
    const openButton = page.locator('button', { hasText: 'Open Modal' });
    await openButton.click();
    
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    
    // Tab-Navigation innerhalb des Modals testen
    await page.keyboard.press('Tab');
    
    // Der erste fokussierbare Elementtyp kann je nach Modal-Implementierung variieren
    // Hier nehmen wir an, dass es ein Button ist
    await expect(page.locator('button:focus')).toBeVisible();
    
    // ESC-Taste zum Schließen
    await page.keyboard.press('Escape');
    
    // Modal sollte nicht mehr sichtbar sein
    await expect(modal).not.toBeVisible();
  });
});
```

## 4. Tests für verschiedene Geräte und Browser

### 4.1 Responsive-Tests

```typescript
// e2e-tests/responsive/responsive.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Responsive Design Tests', () => {
  test('table component adapts to screen size', async ({ page }) => {
    // Zur Tabellen-Geschichte navigieren
    await page.goto('http://localhost:6006/iframe.html?id=components-table--responsive');
    
    // Desktop-Layout
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // Alle Spalten sollten sichtbar sein
    await expect(page.locator('th')).toHaveCount(5);
    
    // Mobile-Layout
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Weniger Spalten sollten sichtbar sein oder eine andere mobile Ansicht
    // z.B. eine umgestufte Tabelle oder horizontales Scrollen
    await expect(page.locator('.mobile-indicator')).toBeVisible();
  });

  test('sidebar collapses on mobile', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-layout--dashboard-layout');
    
    // Desktop-Layout
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // Sidebar sollte geöffnet sein
    await expect(page.locator('.sidebar')).toBeVisible();
    await expect(page.locator('.sidebar')).toHaveCSS('width', '240px');
    
    // Mobile-Layout
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Sidebar sollte eingeklappt oder versteckt sein
    await expect(page.locator('.sidebar')).toHaveCSS('width', '0px');
    
    // Hamburger-Menü sollte sichtbar sein
    await expect(page.locator('.hamburger-menu')).toBeVisible();
    
    // Klick auf Hamburger-Menü sollte Sidebar öffnen
    await page.locator('.hamburger-menu').click();
    await expect(page.locator('.sidebar')).toHaveCSS('width', '240px');
  });
});
```

### 4.2 Browser-spezifische Tests

```typescript
// e2e-tests/browser/browser-compatibility.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Browser Compatibility Tests', () => {
  test('date picker renders correctly across browsers', async ({ page, browserName }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-datepicker--default');
    
    // Datepicker öffnen
    await page.locator('input').click();
    
    // Datepicker sollte sichtbar sein
    await expect(page.locator('.datepicker')).toBeVisible();
    
    // Browserabhängige Prüfungen
    if (browserName === 'webkit') {
      // Safari-spezifische Prüfungen
      test.info().annotations.push({ type: 'Browser-specific', description: 'Safari tests' });
    } else if (browserName === 'firefox') {
      // Firefox-spezifische Prüfungen
      test.info().annotations.push({ type: 'Browser-specific', description: 'Firefox tests' });
    }
    
    // Datum auswählen
    await page.locator('.datepicker .day', { hasText: '15' }).click();
    
    // Datepicker sollte geschlossen sein
    await expect(page.locator('.datepicker')).not.toBeVisible();
    
    // Eingabefeld sollte das ausgewählte Datum enthalten
    await expect(page.locator('input')).toHaveValue(/15/);
  });

  test('form validation works consistently across browsers', async ({ page, browserName }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-form--validation');
    
    // Formular absenden ohne Eingaben
    await page.locator('button[type="submit"]').click();
    
    // Validierungsfehlermeldungen sollten angezeigt werden
    await expect(page.locator('.error-message')).toBeVisible();
    
    // Browser-spezifische Validierungsprüfungen
    if (browserName === 'webkit') {
      // Prüfen auf native Safari-Validierungsmeldungen
    } else if (browserName === 'firefox') {
      // Prüfen auf native Firefox-Validierungsmeldungen
    }
  });
});
```

## 5. Accessibility-Tests mit Playwright

```typescript
// e2e-tests/accessibility/a11y.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('button component meets accessibility standards', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-button--primary');
    
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('form components are keyboard navigable', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-form--login-form');
    
    // Tab-Navigation testen
    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="username"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="password"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('button[type="submit"]')).toBeFocused();
    
    // Enter-Taste zum Absenden des Formulars
    await page.keyboard.press('Enter');
    await expect(page.locator('.submit-indicator')).toBeVisible();
  });

  test('modal traps focus correctly', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-modal--default');
    
    // Modal öffnen
    await page.locator('button', { hasText: 'Open Modal' }).click();
    
    // Erste Tab-Navigation sollte den ersten Element im Modal fokussieren
    await page.keyboard.press('Tab');
    await expect(page.locator('.modal button:focus')).toBeVisible();
    
    // Tab durch alle fokussierbaren Elemente im Modal
    let focusStaysInModal = true;
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const focusedElementInModal = await page.evaluate(() => {
        return document.activeElement && document.querySelector('.modal')?.contains(document.activeElement);
      });
      
      if (!focusedElementInModal) {
        focusStaysInModal = false;
        break;
      }
    }
    
    // Fokus sollte im Modal bleiben
    expect(focusStaysInModal).toBe(true);
  });
});
```

## 6. Visual Comparison Tests

```typescript
// e2e-tests/visual/visual.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Comparison Tests', () => {
  test('alert component appears consistently across browsers', async ({ page, browserName }) => {
    // Skip Aufzeichnung von Screenshots während der Tests
    test.skip(process.env.CI === 'true', 'Visual comparison tests are flaky in CI');
    
    await page.goto('http://localhost:6006/iframe.html?id=components-alert--info');
    
    // Screenshot machen
    const screenshot = await page.screenshot();
    
    // Screenshot mit Referenz vergleichen (browserabhängig)
    expect(screenshot).toMatchSnapshot(`alert-info-${browserName}.png`);
  });

  test('theme switch changes appearance correctly', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=theme-theming--theme-switch');
    
    // Light Mode Screenshot
    const lightModeScreenshot = await page.screenshot();
    
    // Wechseln zum Dark Mode
    await page.locator('button', { hasText: 'Switch to Dark' }).click();
    
    // Warten auf Farbänderungen
    await expect(page.locator('body')).toHaveClass(/dark/);
    
    // Dark Mode Screenshot
    const darkModeScreenshot = await page.screenshot();
    
    // Sicherstellen, dass die Screenshots unterschiedlich sind
    expect(Buffer.compare(lightModeScreenshot, darkModeScreenshot)).not.toBe(0);
  });
});
```

## 7. Integration in CI/CD-Pipeline

```yaml
# .github/workflows/browser-tests.yml
name: Browser Compatibility Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  browser-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Build Storybook
        run: npm run build-storybook
      - name: Start Storybook server
        run: npx http-server storybook-static -p 6006 &
      - name: Wait for Storybook to start
        run: npx wait-on http://localhost:6006
      - name: Run Playwright tests
        run: npx playwright test
      - name: Upload test report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

## 8. Best Practices für Browserkompatibilitätstests

1. **Alle unterstützten Browser testen**: Chrome, Firefox, Safari und Edge
2. **Mobile Browser berücksichtigen**: iOS Safari und Android Chrome
3. **Responsive-Tests**: Verschiedene Viewport-Größen testen
4. **Visuelles Rendering überprüfen**: Screenshots für visuelle Konsistenz
5. **Interaktivität testen**: Maus- und Tastaturinteraktionen
6. **Accessibility validieren**: Standardkonforme A11y-Implementierung in allen Browsern
7. **Geräteabhängige Features testen**: Touch-Events, Hover-States, etc.
8. **Performance-Metriken erheben**: Ladezeiten, Interaktivität, etc.

## 9. Herausforderungen und Lösungen

| Herausforderung | Lösung |
|----------------|--------|
| **Flakiness in Tests** | Stabile Selektoren verwenden, ausreichende Timeouts und Retry-Strategien implementieren |
| **Unterschiede im Rendering** | Flexible visuelle Vergleiche mit Toleranzwerten |
| **Inkonsistente Verhaltensweisen** | Browser-spezifische Tests und Fallbacks |
| **Performance-Unterschiede** | Angemessene Timeouts für verschiedene Browser |
| **Mobile Emulatoren vs. reale Geräte** | Kritische Szenarien auf realen Geräten testen |
