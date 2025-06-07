# Popover Barrierefreiheit

## Implementierte Verbesserungen

Die Popover-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `role="tooltip"` oder benutzerdefinierte Rolle - Definiert die semantische Rolle des Popovers
- `aria-label` - Bietet eine Beschreibung des Popovers
- `aria-labelledby` - Verknüpft ein Label mit dem Popover
- `aria-describedby` - Verknüpft eine ausführliche Beschreibung mit dem Popover
- `aria-modal` - Zeigt an, ob der Popover modal ist
- `aria-live` - Definiert eine Live-Region für Ankündigungen
- `aria-atomic` - Definiert, ob die Live-Region als Ganzes aktualisiert wird
- `aria-relevant` - Definiert, welche Änderungen in der Live-Region relevant sind
- `aria-hidden` - Versteckt den Popover vor Screenreadern
- `aria-busy` - Zeigt an, ob der Popover im Ladezustand ist
- `aria-disabled` - Zeigt an, ob der Popover deaktiviert ist
- `aria-keyshortcuts` - Definiert Tastaturkürzel für den Popover
- `aria-roledescription` - Bietet eine benutzerdefinierte Rollenbeschreibung

Für den Trigger:
- `aria-expanded` - Zeigt an, ob der Popover geöffnet ist
- `aria-haspopup` - Zeigt an, dass der Trigger ein Popup hat
- `aria-controls` - Verknüpft den Trigger mit dem Popover
- `aria-owns` - Definiert Elemente, die zum Trigger gehören
- `aria-pressed` - Zeigt an, ob der Trigger gedrückt ist

### Fokus-Management

- Automatischer Fokus auf den Popover oder das erste fokussierbare Element
- Rücksetzen des Fokus auf den Trigger beim Schließen
- Fokus-Trap innerhalb des Popovers
- Tastaturnavigation innerhalb des Popovers
- Schließen des Popovers mit Escape-Taste
- Schließen des Popovers bei Klick außerhalb

### Screenreader-Unterstützung

- Versteckte Beschreibungen für zusätzliche Informationen
- Live-Regionen für Statusänderungen
- Ankündigung von Öffnen und Schließen des Popovers
- Korrekte Verknüpfung von Trigger und Popover
- Semantisch korrekte Struktur mit Titel und Inhalt

## Beispiel-Implementierung

```tsx
// Einfacher Popover
<PopoverA11y 
  content="Details zu diesem Element"
  ariaLabel="Mehr Informationen"
>
  <Button>Mehr Info</Button>
</PopoverA11y>

// Popover mit Titel
<PopoverA11y 
  content="Hier finden Sie detaillierte Informationen zu diesem Thema."
  title="Weitere Informationen"
>
  <Button>Hilfe</Button>
</PopoverA11y>

// Popover mit verschiedenen Triggern
<PopoverA11y 
  content="Dieser Inhalt wird beim Hover angezeigt."
  trigger="hover"
  ariaLabel="Hover-Informationen"
>
  <Button>Hover mich</Button>
</PopoverA11y>

<PopoverA11y 
  content="Dieser Inhalt wird beim Fokus angezeigt."
  trigger="focus"
  ariaLabel="Fokus-Informationen"
>
  <Button>Fokussiere mich</Button>
</PopoverA11y>

// Popover mit Fokus-Management
<PopoverA11y 
  content={
    <div>
      <p>Dieser Popover enthält fokussierbare Elemente.</p>
      <Button>Aktion 1</Button>
      <Button>Aktion 2</Button>
    </div>
  }
  autoFocus
  trapFocus
  returnFocus
  ariaLabel="Interaktiver Popover"
>
  <Button>Öffnen</Button>
</PopoverA11y>

// Popover als Dialog
<PopoverA11y 
  content={
    <div>
      <p>Dieser Popover verhält sich wie ein Dialog.</p>
      <Button>Bestätigen</Button>
      <Button>Abbrechen</Button>
    </div>
  }
  role="dialog"
  ariaModal={true}
  autoFocus
  trapFocus
  returnFocus
  ariaLabel="Dialog"
>
  <Button>Dialog öffnen</Button>
</PopoverA11y>

// Popover mit Live-Region
<PopoverA11y 
  content="Dieser Inhalt wird für Screenreader angekündigt."
  liveRegion
  announce
  ariaLive="polite"
  ariaAtomic={true}
  ariaLabel="Ankündigung"
>
  <Button>Ankündigen</Button>
</PopoverA11y>
```

## Barrierefreiheitstests

Die Popover-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastatur-Tests** zur Überprüfung der Tastaturnavigation und -bedienung
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Fokus-Tests** zur Überprüfung des Fokus-Managements
5. **Visuelle Tests** zur Überprüfung der Farbkontraste und Fokus-Indikatoren

## Bekannte Einschränkungen

- Die Komponente unterstützt derzeit keine verschachtelten Popovers
- Die Komponente unterstützt derzeit keine automatische Positionierung basierend auf dem verfügbaren Platz
- Die Komponente unterstützt derzeit keine Animation beim Öffnen und Schließen
- Die Komponente unterstützt derzeit keine Portale für das Rendering außerhalb des DOM-Baums