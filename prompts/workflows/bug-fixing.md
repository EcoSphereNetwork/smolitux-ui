# Bug-Fixing Workflow

## Übersicht

Dieser Workflow beschreibt den Prozess zur Behebung von Bugs in der Smolitux UI-Bibliothek.

## Schritte

### 1. Bug-Analyse

Analysiere den Bug:

- Was ist das erwartete Verhalten?
- Was ist das tatsächliche Verhalten?
- Unter welchen Bedingungen tritt der Bug auf?
- Welche Komponenten sind betroffen?
- Welche Versionen sind betroffen?
- Wie kann der Bug reproduziert werden?

### 2. Reproduktion

Reproduziere den Bug:

- Erstelle einen minimalen Reproduktionsfall
- Verifiziere, dass der Bug reproduzierbar ist
- Identifiziere die genauen Bedingungen, unter denen der Bug auftritt
- Dokumentiere die Schritte zur Reproduktion

### 3. Ursachenanalyse

Analysiere die Ursache des Bugs:

- Identifiziere den betroffenen Code
- Verstehe, warum der Code nicht wie erwartet funktioniert
- Identifiziere mögliche Lösungsansätze
- Bewerte die Auswirkungen der Lösungsansätze

### 4. Implementierung der Lösung

Implementiere die Lösung:

- Schreibe einen Test, der den Bug reproduziert
- Implementiere die Lösung
- Stelle sicher, dass der Test nun erfolgreich ist
- Stelle sicher, dass keine neuen Bugs eingeführt wurden
- Stelle sicher, dass die Lösung die Ursache des Bugs behebt

### 5. Tests

Teste die Lösung:

- Führe alle Tests aus
- Stelle sicher, dass alle Tests erfolgreich sind
- Führe manuelle Tests durch
- Stelle sicher, dass der Bug behoben ist
- Stelle sicher, dass keine neuen Bugs eingeführt wurden

### 6. Dokumentation

Dokumentiere die Lösung:

- Beschreibe den Bug
- Beschreibe die Ursache des Bugs
- Beschreibe die Lösung
- Aktualisiere die Dokumentation, falls nötig
- Aktualisiere die Tests, falls nötig

### 7. Veröffentlichung

Veröffentliche die Lösung:

- Erstelle einen Pull Request
- Führe einen Code-Review durch
- Merge den Pull Request
- Veröffentliche eine neue Version, falls nötig
- Aktualisiere den Bug-Tracker

## Checkliste

### Bug-Analyse

- [ ] Erwartetes Verhalten dokumentiert
- [ ] Tatsächliches Verhalten dokumentiert
- [ ] Bedingungen dokumentiert
- [ ] Betroffene Komponenten identifiziert
- [ ] Betroffene Versionen identifiziert
- [ ] Reproduktionsschritte dokumentiert

### Reproduktion

- [ ] Minimaler Reproduktionsfall erstellt
- [ ] Bug reproduziert
- [ ] Genaue Bedingungen identifiziert
- [ ] Reproduktionsschritte dokumentiert

### Ursachenanalyse

- [ ] Betroffener Code identifiziert
- [ ] Ursache verstanden
- [ ] Lösungsansätze identifiziert
- [ ] Auswirkungen bewertet

### Implementierung der Lösung

- [ ] Test geschrieben, der den Bug reproduziert
- [ ] Lösung implementiert
- [ ] Test erfolgreich
- [ ] Keine neuen Bugs eingeführt
- [ ] Ursache des Bugs behoben

### Tests

- [ ] Alle Tests ausgeführt
- [ ] Alle Tests erfolgreich
- [ ] Manuelle Tests durchgeführt
- [ ] Bug behoben
- [ ] Keine neuen Bugs eingeführt

### Dokumentation

- [ ] Bug beschrieben
- [ ] Ursache beschrieben
- [ ] Lösung beschrieben
- [ ] Dokumentation aktualisiert
- [ ] Tests aktualisiert

### Veröffentlichung

- [ ] Pull Request erstellt
- [ ] Code-Review durchgeführt
- [ ] Pull Request gemerged
- [ ] Neue Version veröffentlicht
- [ ] Bug-Tracker aktualisiert

## Beispiel

### Bug: Button-Komponente reagiert nicht auf Klicks im Safari-Browser

#### Bug-Analyse

- Erwartetes Verhalten: Der Button sollte auf Klicks reagieren und die onClick-Funktion ausführen
- Tatsächliches Verhalten: Der Button reagiert nicht auf Klicks im Safari-Browser
- Bedingungen: Tritt nur im Safari-Browser auf, nicht in Chrome oder Firefox
- Betroffene Komponenten: Button
- Betroffene Versionen: 1.0.0 - 1.2.0
- Reproduktionsschritte:
  1. Öffne die Demo-Seite im Safari-Browser
  2. Klicke auf einen Button
  3. Der Button reagiert nicht auf den Klick

#### Reproduktion

- Minimaler Reproduktionsfall:

```jsx
import React from 'react';
import { Button } from '@smolitux/core';

export default function ButtonDemo() {
  const handleClick = () => {
    console.log('Button clicked');
  };

  return (
    <div>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
}
```

- Bug reproduziert: Ja, der Button reagiert nicht auf Klicks im Safari-Browser
- Genaue Bedingungen: Tritt nur im Safari-Browser auf, nicht in Chrome oder Firefox
- Reproduktionsschritte dokumentiert: Ja

#### Ursachenanalyse

- Betroffener Code:

```jsx
<button
  ref={ref}
  className={buttonClasses}
  disabled={disabled || loading}
  type={type}
  data-testid="Button"
  {...props}
>
  {/* Button content */}
</button>
```

- Ursache: Im Safari-Browser wird das `onClick`-Event nicht ausgelöst, wenn der Button ein `type`-Attribut hat, das nicht `button`, `submit` oder `reset` ist
- Lösungsansätze:
  1. Stelle sicher, dass das `type`-Attribut immer einen gültigen Wert hat
  2. Füge einen Event-Listener direkt hinzu, anstatt das `onClick`-Prop zu verwenden
- Auswirkungen:
  - Lösung 1: Einfach zu implementieren, behebt den Bug
  - Lösung 2: Komplexer zu implementieren, behebt den Bug, aber ändert die API

#### Implementierung der Lösung

- Test, der den Bug reproduziert:

```jsx
it('handles click events in Safari', () => {
  // Mock Safari user agent
  const originalNavigator = global.navigator;
  global.navigator = {
    ...originalNavigator,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15',
  };

  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByTestId('Button'));
  expect(handleClick).toHaveBeenCalledTimes(1);

  // Restore original navigator
  global.navigator = originalNavigator;
});
```

- Lösung:

```jsx
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      type = 'button', // Ensure type has a valid default value
      ...props
    },
    ref
  ) => {
    const buttonClasses = clsx(
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      {
        'btn--full-width': fullWidth,
        'btn--loading': loading,
        'btn--disabled': disabled || loading,
      },
      className
    );

    // Ensure type is always a valid button type
    const buttonType = ['button', 'submit', 'reset'].includes(type) ? type : 'button';

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        type={buttonType} // Use validated button type
        data-testid="Button"
        {...props}
      >
        {loading && (
          <span className="btn__spinner" aria-hidden="true">
            {/* Spinner implementation */}
          </span>
        )}
        
        {leftIcon && <span className="btn__icon btn__icon--left">{leftIcon}</span>}
        
        <span className="btn__text">{children}</span>
        
        {rightIcon && <span className="btn__icon btn__icon--right">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
```

#### Tests

- Alle Tests ausgeführt: Ja
- Alle Tests erfolgreich: Ja
- Manuelle Tests durchgeführt: Ja, im Safari-Browser
- Bug behoben: Ja, der Button reagiert nun auf Klicks im Safari-Browser
- Keine neuen Bugs eingeführt: Ja

#### Dokumentation

- Bug: Button-Komponente reagiert nicht auf Klicks im Safari-Browser
- Ursache: Im Safari-Browser wird das `onClick`-Event nicht ausgelöst, wenn der Button ein `type`-Attribut hat, das nicht `button`, `submit` oder `reset` ist
- Lösung: Stelle sicher, dass das `type`-Attribut immer einen gültigen Wert hat
- Dokumentation aktualisiert: Ja, in der Button-Komponenten-Dokumentation wurde ein Hinweis hinzugefügt
- Tests aktualisiert: Ja, ein Test für Safari wurde hinzugefügt

#### Veröffentlichung

- Pull Request erstellt: Ja, PR #123
- Code-Review durchgeführt: Ja
- Pull Request gemerged: Ja
- Neue Version veröffentlicht: Ja, Version 1.2.1
- Bug-Tracker aktualisiert: Ja, Issue #456 geschlossen