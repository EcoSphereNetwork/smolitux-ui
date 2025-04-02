# Barrierefreiheitstests in Smolitux UI

Diese Dokumentation beschreibt die Barrierefreiheitstestinfrastruktur der Smolitux UI Bibliothek und gibt Anleitungen zur Durchführung und Erweiterung der Tests.

## Überblick

Barrierefreiheit (Accessibility, oft als a11y abgekürzt) ist ein wesentlicher Bestandteil der Smolitux UI Bibliothek. Wir haben verschiedene Testebenen implementiert, um sicherzustellen, dass unsere Komponenten für alle Benutzer zugänglich sind, einschließlich Personen mit Behinderungen.

## Testebenen

Die Barrierefreiheitstests in Smolitux UI umfassen mehrere Ebenen:

1. **Unit-Tests**: Testen einzelne Komponenten auf Barrierefreiheitsanforderungen
2. **Integration-Tests**: Testen das Zusammenspiel mehrerer Komponenten
3. **End-to-End-Tests**: Testen die Barrierefreiheit in realistischen Szenarien
4. **Storybook-Integration**: Automatische Barrierefreiheitsprüfungen in Storybook

## Unit-Tests für Barrierefreiheit

Die Unit-Tests für Barrierefreiheit verwenden [jest-axe](https://github.com/nickcolley/jest-axe), eine Integration von [axe-core](https://github.com/dequelabs/axe-core) mit Jest.

### Beispiel für einen Barrierefreiheits-Unit-Test

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { a11y } from '@smolitux/testing';
import { Button } from '../Button';

describe('Button Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { violations } = await a11y.testA11y(
      <Button>Click me</Button>
    );
    expect(violations).toHaveLength(0);
  });
});
```

### Ausführung der Unit-Tests

```bash
npm run test:a11y
```

## End-to-End-Tests für Barrierefreiheit

Die E2E-Tests für Barrierefreiheit verwenden [Playwright](https://playwright.dev/) mit [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright).

### Beispiel für einen E2E-Barrierefreiheitstest

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Modal sollte barrierefrei sein', async ({ page }) => {
  await page.goto('/iframe.html?id=components-modal--default');
  
  // Öffne den Modal
  await page.click('button:has-text("Open Modal")');
  
  // Führe Axe-Tests durch
  const results = await new AxeBuilder({ page }).analyze();
  
  // Überprüfe, ob keine Verletzungen vorhanden sind
  expect(results.violations).toEqual([]);
});
```

### Ausführung der E2E-Tests

```bash
npx playwright test e2e-tests/accessibility.e2e.test.ts
```

## Storybook-Integration

Storybook ist mit dem [@storybook/addon-a11y](https://storybook.js.org/addons/@storybook/addon-a11y) Addon konfiguriert, das automatische Barrierefreiheitsprüfungen für jede Story durchführt.

### Verwendung des Storybook-Addons

1. Öffnen Sie Storybook: `npm run storybook`
2. Wählen Sie eine Komponente aus
3. Klicken Sie auf den "Accessibility"-Tab im Addon-Panel
4. Überprüfen Sie die Barrierefreiheitsergebnisse

## CI/CD-Integration

Die Barrierefreiheitstests sind in die CI/CD-Pipeline integriert und werden automatisch bei Pull Requests und Pushes ausgeführt. Die Konfiguration befindet sich in der Datei `.github/workflows/accessibility-tests.yml`.

## Getestete Barrierefreiheitsaspekte

Die Tests überprüfen verschiedene Aspekte der Barrierefreiheit, darunter:

1. **Semantische HTML-Struktur**: Korrekte Verwendung von HTML-Elementen
2. **ARIA-Attribute**: Korrekte Verwendung von ARIA-Rollen und -Attributen
3. **Tastaturzugänglichkeit**: Komponenten können mit der Tastatur bedient werden
4. **Farbkontrast**: Ausreichender Kontrast zwischen Text und Hintergrund
5. **Screenreader-Unterstützung**: Komponenten sind mit Screenreadern zugänglich
6. **Fokus-Management**: Korrektes Fokus-Verhalten bei interaktiven Elementen

## Barrierefreiheitsrichtlinien

Die Smolitux UI Bibliothek strebt die Einhaltung der [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) Richtlinien an. Die Tests überprüfen die Einhaltung dieser Richtlinien.

## Erweiterung der Tests

### Neue Barrierefreiheitstests hinzufügen

1. Identifizieren Sie Barrierefreiheitsanforderungen für die Komponente
2. Schreiben Sie Unit-Tests mit jest-axe
3. Schreiben Sie E2E-Tests mit Playwright und Axe
4. Führen Sie die Tests aus, um sicherzustellen, dass sie wie erwartet funktionieren

### Beispiel für einen neuen Barrierefreiheitstest

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { a11y } from '@smolitux/testing';
import { Dropdown } from '../Dropdown';

describe('Dropdown Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { violations } = await a11y.testA11y(
      <Dropdown options={['Option 1', 'Option 2']} />
    );
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes', () => {
    render(<Dropdown options={['Option 1', 'Option 2']} />);
    
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toHaveAttribute('aria-expanded', 'false');
    
    // Öffne das Dropdown
    dropdown.click();
    
    expect(dropdown).toHaveAttribute('aria-expanded', 'true');
    expect(dropdown).toHaveAttribute('aria-controls');
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
  });
});
```

## Best Practices

1. **Frühzeitig testen**: Integrieren Sie Barrierefreiheitstests von Anfang an in den Entwicklungsprozess
2. **Alle Komponenten testen**: Jede Komponente sollte Barrierefreiheitstests haben
3. **Verschiedene Zustände testen**: Testen Sie verschiedene Zustände der Komponenten (geöffnet, geschlossen, deaktiviert, etc.)
4. **Tastaturnavigation testen**: Stellen Sie sicher, dass Komponenten mit der Tastatur bedient werden können
5. **Screenreader-Unterstützung testen**: Überprüfen Sie die Komponenten mit einem Screenreader
6. **Farbkontrast testen**: Stellen Sie sicher, dass der Kontrast ausreichend ist

## Fehlerbehebung

### Häufige Probleme

1. **Fehlende ARIA-Attribute**: Stellen Sie sicher, dass alle erforderlichen ARIA-Attribute vorhanden sind
2. **Falsche ARIA-Rollen**: Überprüfen Sie, ob die richtigen ARIA-Rollen verwendet werden
3. **Unzureichender Farbkontrast**: Passen Sie die Farben an, um einen ausreichenden Kontrast zu gewährleisten
4. **Fehlende Beschriftungen**: Stellen Sie sicher, dass alle interaktiven Elemente beschriftet sind

### Debugging

Für detailliertes Debugging der Barrierefreiheitstests:

```bash
npm run test:a11y -- --debug
```

## Weitere Ressourcen

- [WCAG 2.1 Richtlinien](https://www.w3.org/TR/WCAG21/)
- [Axe-Core Dokumentation](https://github.com/dequelabs/axe-core)
- [Jest-Axe Dokumentation](https://github.com/nickcolley/jest-axe)
- [Storybook Accessibility Addon](https://storybook.js.org/addons/@storybook/addon-a11y)
- [Deque University](https://dequeuniversity.com/) (Barrierefreiheitsressourcen und -schulungen)