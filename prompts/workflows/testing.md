# Testing Workflow

## Übersicht

Dieser Workflow beschreibt den Prozess zum Testen von Komponenten in der Smolitux UI-Bibliothek.

## Schritte

### 1. Test-Planung

Plane die Tests für die Komponente:

- Welche Funktionalitäten sollen getestet werden?
- Welche Zustände sollen getestet werden?
- Welche Interaktionen sollen getestet werden?
- Welche Edge Cases sollen getestet werden?
- Welche Barrierefreiheitsaspekte sollen getestet werden?

### 2. Test-Implementierung

Implementiere die Tests:

- Erstelle die Test-Dateien
- Implementiere Unit-Tests
- Implementiere Barrierefreiheitstests
- Implementiere Snapshot-Tests
- Implementiere Interaktionstests
- Implementiere Edge-Case-Tests
- Implementiere Theming-Tests
- Implementiere Performance-Tests

### 3. Test-Ausführung

Führe die Tests aus:

- Führe alle Tests aus
- Stelle sicher, dass alle Tests erfolgreich sind
- Analysiere die Testabdeckung
- Identifiziere fehlende Tests
- Implementiere fehlende Tests

### 4. Test-Dokumentation

Dokumentiere die Tests:

- Dokumentiere die getesteten Funktionalitäten
- Dokumentiere die getesteten Zustände
- Dokumentiere die getesteten Interaktionen
- Dokumentiere die getesteten Edge Cases
- Dokumentiere die getesteten Barrierefreiheitsaspekte

### 5. Test-Review

Überprüfe die Tests:

- Überprüfe die Testabdeckung
- Überprüfe die Testqualität
- Überprüfe die Testdokumentation
- Identifiziere Verbesserungsmöglichkeiten
- Implementiere Verbesserungen

## Checkliste

### Test-Planung

- [ ] Funktionalitäten identifiziert
- [ ] Zustände identifiziert
- [ ] Interaktionen identifiziert
- [ ] Edge Cases identifiziert
- [ ] Barrierefreiheitsaspekte identifiziert

### Test-Implementierung

- [ ] Test-Dateien erstellt
- [ ] Unit-Tests implementiert
- [ ] Barrierefreiheitstests implementiert
- [ ] Snapshot-Tests implementiert
- [ ] Interaktionstests implementiert
- [ ] Edge-Case-Tests implementiert
- [ ] Theming-Tests implementiert
- [ ] Performance-Tests implementiert

### Test-Ausführung

- [ ] Alle Tests ausgeführt
- [ ] Alle Tests erfolgreich
- [ ] Testabdeckung analysiert
- [ ] Fehlende Tests identifiziert
- [ ] Fehlende Tests implementiert

### Test-Dokumentation

- [ ] Getestete Funktionalitäten dokumentiert
- [ ] Getestete Zustände dokumentiert
- [ ] Getestete Interaktionen dokumentiert
- [ ] Getestete Edge Cases dokumentiert
- [ ] Getestete Barrierefreiheitsaspekte dokumentiert

### Test-Review

- [ ] Testabdeckung überprüft
- [ ] Testqualität überprüft
- [ ] Testdokumentation überprüft
- [ ] Verbesserungsmöglichkeiten identifiziert
- [ ] Verbesserungen implementiert

## Beispiel

### Button-Komponente

#### Test-Planung

- Funktionalitäten: Klick-Event, Deaktiviert, Loading
- Zustände: Default, Hover, Active, Focus, Disabled, Loading
- Interaktionen: Klick, Tastatur-Klick
- Edge Cases: Lange Texte, Leere Texte, Null-Texte
- Barrierefreiheitsaspekte: Tastaturnavigation, Screenreader, Farbkontrast

#### Test-Implementierung

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ThemeProvider } from '@smolitux/theme';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  // Unit-Tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(
        <ThemeProvider>
          <Button>Click me</Button>
        </ThemeProvider>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(
        <ThemeProvider>
          <Button>Click me</Button>
        </ThemeProvider>
      );
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <ThemeProvider>
          <Button className="custom-class">Click me</Button>
        </ThemeProvider>
      );
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });

  // Interaktionstests
  describe('Interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(
        <ThemeProvider>
          <Button onClick={handleClick}>Click me</Button>
        </ThemeProvider>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(
        <ThemeProvider>
          <Button onClick={handleClick}>Click me</Button>
        </ThemeProvider>
      );

      screen.getByRole('button').focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not trigger click events when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(
        <ThemeProvider>
          <Button onClick={handleClick} disabled>Click me</Button>
        </ThemeProvider>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Barrierefreiheitstests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <ThemeProvider>
          <Button>Click me</Button>
        </ThemeProvider>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(
        <ThemeProvider>
          <Button disabled>Click me</Button>
        </ThemeProvider>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when loading', async () => {
      const { container } = render(
        <ThemeProvider>
          <Button loading>Click me</Button>
        </ThemeProvider>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // Edge-Case-Tests
  describe('Edge Cases', () => {
    it('handles long text', () => {
      render(
        <ThemeProvider>
          <Button>This is a very long text that should wrap properly and not overflow the button</Button>
        </ThemeProvider>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('handles empty text', () => {
      render(
        <ThemeProvider>
          <Button></Button>
        </ThemeProvider>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('handles null text', () => {
      render(
        <ThemeProvider>
          <Button>{null}</Button>
        </ThemeProvider>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  // Theming-Tests
  describe('Theming', () => {
    it('applies theme correctly', () => {
      render(
        <ThemeProvider>
          <Button>Click me</Button>
        </ThemeProvider>
      );
      // Hier können spezifische Theme-Tests durchgeführt werden
    });

    it('applies dark theme correctly', () => {
      render(
        <ThemeProvider themeMode="dark">
          <Button>Click me</Button>
        </ThemeProvider>
      );
      // Hier können spezifische Dark-Theme-Tests durchgeführt werden
    });
  });
});
```

#### Test-Ausführung

```bash
# Führe alle Tests aus
npm test

# Führe Tests für eine bestimmte Komponente aus
npm test -- Button

# Führe Tests mit Abdeckungsanalyse aus
npm test -- --coverage
```

#### Test-Dokumentation

```markdown
# Button Tests

## Getestete Funktionalitäten

- Klick-Event
- Deaktiviert
- Loading

## Getestete Zustände

- Default
- Hover
- Active
- Focus
- Disabled
- Loading

## Getestete Interaktionen

- Klick
- Tastatur-Klick

## Getestete Edge Cases

- Lange Texte
- Leere Texte
- Null-Texte

## Getestete Barrierefreiheitsaspekte

- Tastaturnavigation
- Screenreader
- Farbkontrast
```

#### Test-Review

- Testabdeckung: 98%
- Testqualität: Gut
- Testdokumentation: Vollständig
- Verbesserungsmöglichkeiten: Mehr Theming-Tests
- Verbesserungen: Theming-Tests hinzugefügt