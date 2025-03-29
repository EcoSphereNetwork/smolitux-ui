# Switch Barrierefreiheit

## Implementierte Verbesserungen

Die Switch-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `role="switch"` - Definiert das Element als Switch
- `aria-checked` - Gibt an, ob der Switch eingeschaltet ist
- `aria-label` - Bietet eine Beschreibung des Switches
- `aria-describedby` - Verknüpft eine ausführliche Beschreibung mit dem Switch
- `aria-errormessage` - Verknüpft eine Fehlermeldung mit dem Switch
- `aria-invalid` - Zeigt an, ob der Switch ungültig ist
- `aria-required` - Zeigt an, ob der Switch erforderlich ist
- `aria-disabled` - Zeigt an, ob der Switch deaktiviert ist
- `aria-busy` - Zeigt an, ob der Switch im Ladezustand ist
- `aria-pressed` - Zeigt an, ob der Switch gedrückt ist (optional)

### Tastaturunterstützung

- Vollständige Tastaturnavigation mit Tab-Taste
- Umschalten mit Leertaste oder Enter-Taste
- Visuelle Fokus-Indikatoren
- Unterstützung für Tastatur-Events (keydown, keyup)
- Unterstützung für Fokus-Management

### Screenreader-Unterstützung

- Versteckte Beschreibungen für zusätzliche Informationen
- Ankündigung des Schaltzustands (eingeschaltet/ausgeschaltet)
- Benutzerdefinierte Texte für Schaltzustände
- Live-Regionen für Statusänderungen
- Korrekte Ankündigung von Fehlermeldungen

### Zusätzliche Funktionen

- Benutzerdefinierte Labels für den Switch
- Benutzerdefinierte Beschreibungen für Screenreader
- Unterstützung für verschiedene Größen und Farben
- Unterstützung für verschiedene Label-Positionen
- Unterstützung für vertikale und horizontale Layouts
- Unterstützung für Icons und Labels im Switch
- Unterstützung für verschiedene visuelle Stile

## Beispiel-Implementierung

```tsx
// Einfacher Switch
<SwitchA11y 
  label="Benachrichtigungen aktivieren" 
  ariaLabel="Benachrichtigungen"
  checkedStateText="aktiviert"
  uncheckedStateText="deaktiviert"
/>

// Switch mit Icons
<SwitchA11y 
  label="Dunkelmodus" 
  icons
  checkedIcon={<MoonIcon />}
  uncheckedIcon={<SunIcon />}
  ariaLabel="Dunkelmodus"
/>

// Switch mit Labels
<SwitchA11y 
  label="WLAN" 
  labels={{ on: "AN", off: "AUS" }}
  ariaLabel="WLAN-Verbindung"
/>

// Switch mit linkem Label
<SwitchA11y 
  label="Automatische Updates" 
  labelPosition="left"
  labelAlign="end"
  ariaLabel="Automatische Updates"
/>

// Switch mit Beschreibung
<SwitchA11y 
  label="Standort teilen" 
  description="Wenn aktiviert, wird Ihr Standort mit der App geteilt"
  ariaLabel="Standort teilen"
/>
```

## Barrierefreiheitstests

Die Switch-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastatur-Tests** zur Überprüfung der Tastaturnavigation und -bedienung
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Visuelle Tests** zur Überprüfung der Farbkontraste und Fokus-Indikatoren

## Bekannte Einschränkungen

- Die Komponente unterstützt derzeit keine Gruppierung mit Fieldset und Legend
- Die Komponente unterstützt derzeit keine automatische Fokussierung auf den ersten Switch in einer Gruppe
- Die Komponente unterstützt derzeit keine Pfeiltasten-Navigation innerhalb einer Gruppe
- Die Komponente unterstützt derzeit keine automatische Umschaltung beim Fokussieren