# Input Barrierefreiheit

## Implementierte Verbesserungen

Die Input-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `aria-labelledby` - Verknüpft das Label mit dem Input-Element
- `aria-describedby` - Verknüpft Hilfetexte, Fehlermeldungen und andere Beschreibungen
- `aria-invalid` - Zeigt an, ob der Input ungültig ist
- `aria-required` - Zeigt an, ob der Input erforderlich ist
- `aria-disabled` - Zeigt an, ob der Input deaktiviert ist
- `aria-readonly` - Zeigt an, ob der Input schreibgeschützt ist
- `aria-errormessage` - Verknüpft Fehlermeldungen mit dem Input
- `role="alert"` - Markiert Fehlermeldungen für Screenreader
- `role="status"` - Markiert Statusmeldungen für Screenreader
- `role="progressbar"` - Definiert den Fortschrittsbalken mit entsprechenden Attributen
- `role="button"` - Definiert klickbare Elemente wie Icons

### Tastaturunterstützung

- Vollständige Tastaturnavigation für alle interaktiven Elemente
- Unterstützung für Enter/Space zum Aktivieren von Buttons
- Escape-Taste zum Löschen des Inputs (wenn isClearable aktiviert ist)
- Fokus-Management für alle interaktiven Elemente

### Screenreader-Unterstützung

- Versteckte Labels mit `sr-only`-Klassen für visuelle Layouts ohne sichtbare Labels
- Versteckte Hilfetexte für zusätzliche Informationen
- Ankündigungen für Statusänderungen
- Beschreibende Texte für Icons und Aktionen
- Zähler mit zusätzlichen Informationen für Screenreader

### Formular-Validierung

- Barrierefreie Fehlermeldungen mit korrekten ARIA-Attributen
- Visuelle und textuelle Darstellung von Validierungszuständen
- Sofortige Rückmeldung bei Validierungsfehlern

### Zusätzliche Funktionen

- Barrierefreier Passwort-Toggle mit korrekten ARIA-Attributen
- Barrierefreier Clear-Button mit korrekten ARIA-Attributen
- Barrierefreier Fortschrittsbalken mit korrekten ARIA-Attributen
- Barrierefreier Zähler mit zusätzlichen Informationen für Screenreader

## Beispiel-Implementierung

```tsx
<InputA11y
  label="Email"
  placeholder="name@example.com"
  type="email"
  helperText="Wir werden Ihre Email niemals teilen."
  isRequired
/>

<InputA11y
  label="Passwort"
  type="password"
  showPasswordToggle
  showCounter
  maxLength={20}
/>

<InputA11y
  label="Suche"
  type="search"
  isClearable
  leftIcon={<SearchIcon />}
/>
```

## Barrierefreiheitstests

Die Input-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastaturnavigation** zur Sicherstellung der vollständigen Bedienbarkeit ohne Maus
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Fokus-Management-Tests** zur Sicherstellung der korrekten Fokusreihenfolge

## Bekannte Einschränkungen

- Bei komplexen Inputs mit vielen Zusatzfunktionen kann die Tastaturnavigation umständlich werden
- Die Formatierungsfunktionen müssen vom Entwickler implementiert werden, um barrierefrei zu sein
- Datalist-Unterstützung variiert je nach Browser und Screenreader