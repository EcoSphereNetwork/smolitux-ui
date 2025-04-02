# Barrierefreiheit-Richtlinien für Smolitux UI

## Einführung

Barrierefreiheit ist ein wesentlicher Bestandteil der Smolitux UI Bibliothek. Wir streben danach, alle Komponenten gemäß den WCAG 2.1 AA-Standards zu entwickeln, um sicherzustellen, dass unsere Benutzeroberflächen für alle Menschen zugänglich sind, unabhängig von ihren Fähigkeiten oder der Art, wie sie mit digitalen Inhalten interagieren.

Diese Richtlinien sollen Entwicklern helfen, barrierefreie Komponenten zu erstellen und zu verwenden.

## Grundprinzipien

Wir folgen den vier Grundprinzipien der WCAG:

1. **Wahrnehmbar**: Informationen und Benutzeroberflächen müssen für die Benutzer wahrnehmbar sein.
2. **Bedienbar**: Benutzeroberflächen und Navigation müssen bedienbar sein.
3. **Verständlich**: Informationen und die Bedienung der Benutzeroberfläche müssen verständlich sein.
4. **Robust**: Inhalte müssen robust genug sein, um von einer Vielzahl von Benutzeragenten, einschließlich assistiver Technologien, zuverlässig interpretiert werden zu können.

## Checkliste für Komponenten

Jede Komponente in der Smolitux UI Bibliothek sollte die folgenden Kriterien erfüllen:

### Semantische Struktur

- Verwende semantisch korrekte HTML-Elemente (z.B. `<button>` für Schaltflächen, `<a>` für Links).
- Stelle sicher, dass die Komponentenhierarchie logisch ist und der natürlichen Dokumentstruktur folgt.
- Verwende ARIA-Attribute nur dann, wenn native HTML-Semantik nicht ausreicht.

### Tastaturzugänglichkeit

- Alle interaktiven Elemente müssen mit der Tastatur bedienbar sein.
- Die Tabulatorreihenfolge muss logisch und vorhersehbar sein.
- Fokusindikatoren müssen deutlich sichtbar sein.
- Tastaturkurzbefehle sollten dokumentiert und anpassbar sein.

### Farbe und Kontrast

- Texte müssen einen Kontrastverhältnis von mindestens 4,5:1 haben (für normale Texte) und 3:1 (für große Texte).
- Informationen dürfen nicht ausschließlich durch Farbe vermittelt werden.
- Interaktive Elemente müssen einen Kontrastverhältnis von mindestens 3:1 zum Hintergrund haben.

### Textgrößen und Abstände

- Text sollte auf 200% vergrößert werden können, ohne dass Funktionalität verloren geht.
- Interaktive Elemente sollten ausreichend Abstand haben, um versehentliche Aktivierungen zu vermeiden.
- Zeilenabstände sollten mindestens 1,5-fach sein, Absatzabstände mindestens 2-fach.

### Formulare und Eingaben

- Alle Formularelemente müssen korrekt beschriftet sein.
- Fehlermeldungen müssen klar, präzise und leicht zu finden sein.
- Eingabefelder sollten Hinweise und Validierungsfeedback bieten.
- Autofill und Autocomplete sollten unterstützt werden, wo angemessen.

### Bilder und Medien

- Alle Bilder müssen alternative Texte haben.
- Dekorative Bilder sollten mit `alt=""` markiert werden.
- Videos sollten Untertitel und Audiobeschreibungen haben.
- Animationen sollten pausierbar sein und keine Anfälle auslösen.

### Dynamischer Inhalt

- Änderungen im Inhalt sollten für Screenreader angekündigt werden.
- Modals und Dialoge sollten den Fokus korrekt verwalten.
- Automatische Aktualisierungen sollten kontrollierbar sein.

## Testverfahren

Jede Komponente in der Smolitux UI Bibliothek wird mit den folgenden Methoden auf Barrierefreiheit getestet:

1. **Automatisierte Tests**: Wir verwenden jest-axe für Unit-Tests und cypress-axe für E2E-Tests.
   - Alle Komponenten haben dedizierte A11y-Testdateien (`*.a11y.test.tsx`)
   - Tests prüfen auf WCAG 2.1 AA-Konformität
   - Tests werden in der CI/CD-Pipeline automatisch ausgeführt

2. **Manuelle Tests**: Wir testen mit verschiedenen Screenreadern und ausschließlich mit der Tastatur.
   - NVDA mit Firefox unter Windows
   - VoiceOver mit Safari unter macOS
   - TalkBack mit Chrome unter Android
   - Tastaturnavigation mit Tab, Pfeiltasten, Enter und Escape

3. **Visuelle Tests**: Wir überprüfen Kontrastverhältnisse und Farbkombinationen.
   - Kontrastverhältnisse werden mit dem Storybook A11y-Addon geprüft
   - Farbkombinationen werden im Light und Dark Mode getestet
   - Wir testen mit verschiedenen Farbblindheits-Simulationen

4. **Dokumentation**: Jede Komponente hat eine dedizierte A11y-Dokumentation.
   - Beschreibung der ARIA-Attribute
   - Tastaturnavigation
   - Screenreader-Ankündigungen
   - Best Practices für die Verwendung

## Implementierung von Barrierefreiheit

### Beispiel: Barrierefreier Button

```tsx
// Schlechtes Beispiel
<div className="button" onClick={handleClick}>
  Klick mich
</div>

// Gutes Beispiel
<button 
  className="button" 
  onClick={handleClick} 
  aria-pressed={isPressed} 
  disabled={isDisabled}
>
  Klick mich
</button>
```

### Beispiel: Barrierefreies Modal

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  returnFocus={true}
>
  <h2 id="modal-title">Modal Titel</h2>
  <p id="modal-description">Modal Beschreibung</p>
  <button onClick={handleClose}>Schließen</button>
</Modal>
```

## Ressourcen

- [WCAG 2.1 Richtlinien](https://www.w3.org/TR/WCAG21/)
- [A11Y Project Checkliste](https://www.a11yproject.com/checklist/)
- [MDN Barrierefreiheit](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Axe-core Regeln](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)

## Kontinuierliche Verbesserung

Barrierefreiheit ist ein fortlaufender Prozess. Wir ermutigen alle Mitwirkenden, Probleme zu melden und Verbesserungsvorschläge einzureichen. Unser Ziel ist es, die Smolitux UI Bibliothek kontinuierlich zu verbessern und sie für alle Benutzer zugänglicher zu machen.

## Aktueller Status (Version 0.2.2)

In Version 0.2.2 haben wir folgende Fortschritte bei der Barrierefreiheit erzielt:

- 25% aller Komponenten haben umfassende A11y-Tests
- Alle Kernkomponenten (Button, Card, Input, Checkbox, Alert) sind WCAG 2.1 AA-konform
- Wir haben eine dedizierte A11y-Testinfrastruktur mit jest-axe implementiert
- Wir haben einen umfassenden A11y-Testplan für alle Komponenten erstellt
- Wir haben die Storybook-Integration mit dem A11y-Addon verbessert

## Nächste Schritte (Version 0.3.0)

Für Version 0.3.0 planen wir folgende Verbesserungen:

- Erhöhung der A11y-Testabdeckung auf mindestens 75% aller Komponenten
- Implementierung von A11y-Tests für alle komplexen Komponenten (Modal, Dialog, Drawer, etc.)
- Verbesserung der Tastaturnavigation für alle Komponenten
- Erweiterung der A11y-Dokumentation für alle Komponenten
- Integration von automatisierten A11y-Tests in die CI/CD-Pipeline

Siehe auch unseren [A11y-Testplan](../testing/a11y-test-plan.md) für weitere Details.