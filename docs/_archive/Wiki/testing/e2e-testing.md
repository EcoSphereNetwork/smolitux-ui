# End-to-End-Tests in Smolitux UI

Diese Dokumentation beschreibt die End-to-End-Testinfrastruktur der Smolitux UI Bibliothek und gibt Anleitungen zur Durchführung und Erweiterung der Tests.

## Überblick

Die End-to-End-Tests (E2E-Tests) in Smolitux UI verwenden [Playwright](https://playwright.dev/), ein modernes Framework für Browser-Automatisierung. Diese Tests simulieren reale Benutzerinteraktionen mit den Komponenten in verschiedenen Browsern und stellen sicher, dass die Komponenten wie erwartet funktionieren.

## Teststruktur

Die E2E-Tests befinden sich im Verzeichnis `e2e-tests/` und sind nach Komponentengruppen organisiert:

- `modal-dialog.e2e.test.ts`: Tests für Modal- und Dialog-Komponenten
- `tooltip-drawer.e2e.test.ts`: Tests für Tooltip- und Drawer-Komponenten
- `form-components.e2e.test.ts`: Tests für Formular-Komponenten
- `accessibility.e2e.test.ts`: Barrierefreiheitstests mit Axe

## Konfiguration

Die Playwright-Konfiguration befindet sich in der Datei `playwright.config.ts` im Stammverzeichnis des Projekts. Die Konfiguration umfasst:

- Unterstützte Browser (Chromium, Firefox, WebKit)
- Mobile Geräte (Pixel 5, iPhone 12)
- Webserver-Konfiguration für Storybook
- Reporter-Konfiguration für Testergebnisse

## Ausführung der Tests

### Lokal

Um die E2E-Tests lokal auszuführen, verwenden Sie den folgenden Befehl:

```bash
npm run test:e2e
```

Dies startet Storybook und führt die Tests in allen konfigurierten Browsern aus.

### Spezifische Tests

Um nur bestimmte Tests auszuführen, können Sie den Testpfad angeben:

```bash
npx playwright test e2e-tests/modal-dialog.e2e.test.ts
```

### Spezifische Browser

Um Tests nur in bestimmten Browsern auszuführen:

```bash
npx playwright test --project=chromium
```

### UI-Modus

Für die interaktive Entwicklung und Debugging von Tests:

```bash
npx playwright test --ui
```

## Barrierefreiheitstests

Die Barrierefreiheitstests verwenden [Axe](https://www.deque.com/axe/) über das [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright) Paket. Diese Tests überprüfen die Komponenten auf Einhaltung der WCAG-Richtlinien.

### Ausführung der Barrierefreiheitstests

```bash
npx playwright test e2e-tests/accessibility.e2e.test.ts
```

## Testberichte

Nach der Ausführung der Tests werden Berichte im Verzeichnis `playwright-report/` generiert. Diese Berichte enthalten detaillierte Informationen über die Testergebnisse, einschließlich Screenshots und Videos von fehlgeschlagenen Tests.

Um den HTML-Bericht anzuzeigen:

```bash
npx playwright show-report
```

## CI/CD-Integration

Die E2E-Tests sind in die CI/CD-Pipeline integriert und werden automatisch bei Pull Requests und Pushes zu den Branches `main` und `development` ausgeführt. Die Konfiguration befindet sich in der Datei `.github/workflows/e2e-tests.yml`.

## Erweiterung der Tests

### Neue Komponententests hinzufügen

1. Erstellen Sie eine neue Testdatei im Verzeichnis `e2e-tests/`
2. Importieren Sie die erforderlichen Playwright-Funktionen
3. Schreiben Sie Tests, die reale Benutzerinteraktionen simulieren
4. Führen Sie die Tests aus, um sicherzustellen, dass sie wie erwartet funktionieren

### Beispiel für einen neuen Komponentenest

```typescript
import { test, expect } from '@playwright/test';

test.describe('Meine Komponente', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('sollte korrekt funktionieren', async ({ page }) => {
    // Navigiere zur Story
    await page.getByRole('link', { name: /meine-komponente/i }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const iframe = page.frameLocator('[data-testid="storybook-preview-iframe"]');
    
    // Interagiere mit der Komponente
    await iframe.getByRole('button').click();
    
    // Überprüfe das Ergebnis
    await expect(iframe.locator('.result')).toBeVisible();
  });
});
```

## Best Practices

1. **Realistische Benutzerinteraktionen**: Simulieren Sie, wie echte Benutzer mit den Komponenten interagieren würden
2. **Barrierefreiheit testen**: Stellen Sie sicher, dass Komponenten mit Tastatur und Screenreadern zugänglich sind
3. **Verschiedene Geräte testen**: Testen Sie auf Desktop- und Mobilgeräten
4. **Stabile Selektoren verwenden**: Verwenden Sie Rollen und Labels anstelle von CSS-Selektoren
5. **Asynchrone Operationen berücksichtigen**: Verwenden Sie `await` für alle asynchronen Operationen
6. **Aussagekräftige Testbeschreibungen**: Schreiben Sie klare Beschreibungen, die den Zweck des Tests erklären

## Fehlerbehebung

### Häufige Probleme

1. **Tests können Storybook nicht finden**: Stellen Sie sicher, dass Storybook läuft und unter der konfigurierten URL erreichbar ist
2. **Selektoren finden keine Elemente**: Überprüfen Sie die Selektoren und verwenden Sie den Playwright Inspector
3. **Tests sind instabil**: Fügen Sie Wartezeiten hinzu oder verwenden Sie robustere Selektoren

### Debugging

Für detailliertes Debugging:

```bash
npx playwright test --debug
```

Dies öffnet einen Browser mit dem Playwright Inspector, der Schritt für Schritt durch den Test navigiert.

## Weitere Ressourcen

- [Playwright-Dokumentation](https://playwright.dev/docs/intro)
- [Axe-Dokumentation](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright)
- [Storybook-Dokumentation](https://storybook.js.org/docs/react/get-started/introduction)