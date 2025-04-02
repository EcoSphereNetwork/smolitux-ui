---
sidebar_position: 1
---

# Zugänglichkeitsrichtlinien

Diese Richtlinien beschreiben, wie Smolitux-UI-Komponenten entwickelt werden, um Zugänglichkeit (Accessibility) zu gewährleisten.

## Übersicht

Smolitux-UI strebt die Einhaltung der WCAG 2.1 AA-Richtlinien an. Alle Komponenten werden entwickelt, um für alle Benutzer zugänglich zu sein, unabhängig von ihren Fähigkeiten oder der Art, wie sie mit der Anwendung interagieren.

## Grundprinzipien

### 1. Wahrnehmbarkeit

- **Textuelle Alternativen**: Alle nicht-textlichen Inhalte haben textuelle Alternativen
- **Anpassbare Darstellung**: Inhalte können ohne Informationsverlust angepasst werden
- **Unterscheidbarkeit**: Inhalte sind leicht zu sehen und zu hören

### 2. Bedienbarkeit

- **Tastaturzugänglichkeit**: Alle Funktionen sind über die Tastatur verfügbar
- **Ausreichend Zeit**: Benutzer haben ausreichend Zeit, Inhalte zu lesen und zu verwenden
- **Navigationshilfen**: Benutzer können leicht navigieren und finden, was sie suchen

### 3. Verständlichkeit

- **Lesbarkeit**: Inhalte sind lesbar und verständlich
- **Vorhersehbarkeit**: Webseiten erscheinen und funktionieren auf vorhersehbare Weise
- **Eingabehilfe**: Benutzer werden bei der Vermeidung und Korrektur von Fehlern unterstützt

### 4. Robustheit

- **Kompatibilität**: Inhalte sind mit aktuellen und zukünftigen Benutzeragenten kompatibel

## Implementierungsrichtlinien

### Semantisches HTML

- Verwenden Sie semantische HTML-Elemente (`button`, `a`, `nav`, `header`, etc.)
- Vermeiden Sie div-Soup und verwenden Sie stattdessen bedeutungsvolle Elemente

```jsx
// Gut
<button onClick={handleClick}>Klick mich</button>

// Schlecht
<div onClick={handleClick}>Klick mich</div>
```

### ARIA-Attribute

- Verwenden Sie ARIA-Attribute, wenn semantisches HTML nicht ausreicht
- Folgen Sie dem ARIA-Authoring-Practices-Guide

```jsx
<div 
  role="button" 
  aria-pressed={isPressed} 
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={handleKeyDown}
>
  Klick mich
</div>
```

### Fokus-Management

- Stellen Sie sicher, dass der Fokus sichtbar ist
- Implementieren Sie eine logische Fokus-Reihenfolge
- Verwalten Sie den Fokus bei modalen Dialogen und anderen interaktiven Elementen

```jsx
// Fokus-Styles
const Button = styled.button`
  &:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
  }
`;
```

### Farbe und Kontrast

- Verwenden Sie nicht nur Farbe, um Informationen zu vermitteln
- Stellen Sie sicher, dass Text einen Kontrastverhältnis von mindestens 4,5:1 hat
- Stellen Sie sicher, dass UI-Komponenten einen Kontrastverhältnis von mindestens 3:1 haben

### Responsive Design

- Stellen Sie sicher, dass die Komponenten bei verschiedenen Viewport-Größen funktionieren
- Unterstützen Sie Zoom bis zu 200% ohne Verlust von Inhalt oder Funktionalität

### Screenreader-Unterstützung

- Testen Sie mit Screenreadern (NVDA, JAWS, VoiceOver)
- Verwenden Sie `aria-live` für dynamische Inhalte
- Stellen Sie sicher, dass Formulare korrekt beschriftet sind

## Komponenten-spezifische Richtlinien

### Buttons

- Verwenden Sie das `<button>`-Element für Aktionen
- Stellen Sie sicher, dass Buttons einen zugänglichen Namen haben
- Implementieren Sie Tastaturunterstützung (Enter, Space)

### Formulare

- Verbinden Sie Labels mit Eingabefeldern
- Stellen Sie Fehlermeldungen programmatisch bereit
- Gruppieren Sie verwandte Formularelemente

### Modals und Dialoge

- Fangen Sie den Fokus innerhalb des Dialogs
- Stellen Sie sicher, dass der Dialog mit ESC geschlossen werden kann
- Verwenden Sie `aria-modal="true"` und `role="dialog"`

### Tabs

- Verwenden Sie die richtige ARIA-Rollenstruktur
- Implementieren Sie Tastaturnavigation (Links/Rechts)
- Stellen Sie sicher, dass aktive Tabs visuell und programmatisch hervorgehoben werden

## Testen

- Automatisierte Tests mit Tools wie axe-core
- Manuelle Tests mit Screenreadern
- Tastatur-Navigation-Tests
- Kontrast- und Farbprüfungen

## Ressourcen

- [WCAG 2.1 Richtlinien](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [Inclusive Components](https://inclusive-components.design/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)