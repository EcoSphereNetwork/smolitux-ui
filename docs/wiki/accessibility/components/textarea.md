# TextArea Barrierefreiheit

## Implementierte Verbesserungen

Die TextArea-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `aria-labelledby` - Verknüpft das Label mit dem TextArea-Element
- `aria-describedby` - Verknüpft Hilfetexte, Fehlermeldungen und Zähler
- `aria-invalid` - Zeigt an, ob der TextArea ungültig ist
- `aria-required` - Zeigt an, ob der TextArea erforderlich ist
- `aria-disabled` - Zeigt an, ob der TextArea deaktiviert ist
- `aria-readonly` - Zeigt an, ob der TextArea schreibgeschützt ist
- `role="alert"` - Markiert Fehlermeldungen für Screenreader
- `aria-live="polite"` - Sorgt dafür, dass Änderungen am Zähler angekündigt werden

### Tastaturunterstützung

- Vollständige Tastaturnavigation
- Standardmäßige Unterstützung für Mehrzeileneingaben
- Fokus-Management für alle interaktiven Elemente

### Screenreader-Unterstützung

- Versteckte Texte für Pflichtfelder mit `sr-only`-Klassen
- Zusätzliche Informationen für den Zeichenzähler
- Beschreibende Texte für Fehlermeldungen und Hilfetexte
- Korrekte Ankündigung von Statusänderungen

### Formular-Validierung

- Barrierefreie Fehlermeldungen mit korrekten ARIA-Attributen
- Visuelle und textuelle Darstellung von Validierungszuständen
- Sofortige Rückmeldung bei Validierungsfehlern

### Zusätzliche Funktionen

- Barrierefreier Zeichenzähler mit zusätzlichen Informationen für Screenreader
- Auto-Resize-Funktion, die die Barrierefreiheit nicht beeinträchtigt
- Korrekte Behandlung von Pflichtfeldern mit visuellen und textuellen Hinweisen

## Beispiel-Implementierung

```tsx
<TextAreaA11y
  label="Beschreibung"
  placeholder="Geben Sie eine Beschreibung ein..."
  rows={4}
  maxLength={200}
  showCount
  helperText="Maximal 200 Zeichen"
  required
/>

<TextAreaA11y
  label="Kommentar"
  autoResize
  showCount
  maxLength={500}
/>

<TextAreaA11y
  label="Nur-Lese-Inhalt"
  readOnly
  defaultValue="Dieser Text kann nicht bearbeitet werden."
/>
```

## Barrierefreiheitstests

Die TextArea-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastaturnavigation** zur Sicherstellung der vollständigen Bedienbarkeit ohne Maus
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Fokus-Management-Tests** zur Sicherstellung der korrekten Fokusreihenfolge

## Bekannte Einschränkungen

- Die Auto-Resize-Funktion kann bei sehr großen Textmengen zu Leistungsproblemen führen
- Bei Verwendung von benutzerdefinierten Schriftarten kann die Berechnung der Texthöhe ungenau sein
- Die maximale Anzahl von Zeichen wird clientseitig validiert und sollte serverseitig überprüft werden