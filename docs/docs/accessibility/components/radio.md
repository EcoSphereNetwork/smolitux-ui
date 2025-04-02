# Radio und RadioGroup Barrierefreiheit

## Implementierte Verbesserungen

Die Radio- und RadioGroup-Komponenten wurden mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute für Radio

- `aria-checked` - Gibt an, ob die Radio-Option ausgewählt ist
- `aria-label` - Bietet eine Beschreibung der Radio-Option
- `aria-describedby` - Verknüpft eine ausführliche Beschreibung mit der Radio-Option
- `aria-errormessage` - Verknüpft eine Fehlermeldung mit der Radio-Option
- `aria-invalid` - Zeigt an, ob die Radio-Option ungültig ist
- `aria-required` - Zeigt an, ob die Radio-Option erforderlich ist

### ARIA-Attribute für RadioGroup

- `role="radiogroup"` - Definiert die Gruppe als Radiogruppe
- `aria-label` - Bietet eine Beschreibung der Radiogruppe
- `aria-labelledby` - Verknüpft ein Label mit der Radiogruppe
- `aria-describedby` - Verknüpft eine ausführliche Beschreibung mit der Radiogruppe
- `aria-errormessage` - Verknüpft eine Fehlermeldung mit der Radiogruppe
- `aria-invalid` - Zeigt an, ob die Radiogruppe ungültig ist
- `aria-required` - Zeigt an, ob die Radiogruppe erforderlich ist
- `aria-busy` - Zeigt an, ob die Radiogruppe im Ladezustand ist
- `aria-live` - Definiert, wie Änderungen in der Radiogruppe von Screenreadern angekündigt werden

### Tastaturunterstützung

- Vollständige Tastaturnavigation mit Tab-Taste
- Auswahl mit Leertaste oder Enter-Taste
- Visuelle Fokus-Indikatoren
- Unterstützung für Tastatur-Events (keydown, keyup)
- Unterstützung für Fokus-Management

### Screenreader-Unterstützung

- Versteckte Beschreibungen für zusätzliche Informationen
- Ankündigung des Auswahlzustands (ausgewählt/nicht ausgewählt)
- Benutzerdefinierte Texte für Auswahlzustände
- Live-Regionen für Statusänderungen
- Korrekte Ankündigung von Fehlermeldungen

### Zusätzliche Funktionen

- Benutzerdefinierte Labels für Radio-Optionen
- Benutzerdefinierte Beschreibungen für Screenreader
- Unterstützung für verschiedene Größen und Farben
- Unterstützung für verschiedene Label-Positionen
- Unterstützung für vertikale und horizontale Layouts

## Beispiel-Implementierung

```tsx
// Einzelne Radio-Option
<RadioA11y 
  name="option" 
  value="option1" 
  label="Option 1" 
  ariaLabel="Erste Option"
  description="Dies ist die erste Option"
/>

// RadioGroup mit mehreren Optionen
<RadioGroupA11y 
  name="options" 
  label="Wählen Sie eine Option"
  value={selectedOption}
  onChange={(e) => setSelectedOption(e.target.value)}
  ariaLabel="Optionsauswahl"
  description="Bitte wählen Sie eine der folgenden Optionen"
>
  <RadioA11y value="option1" label="Option 1" />
  <RadioA11y value="option2" label="Option 2" />
  <RadioA11y value="option3" label="Option 3" />
</RadioGroupA11y>

// RadioGroup mit horizontalem Layout
<RadioGroupA11y 
  name="layout" 
  label="Layout-Optionen"
  layout="horizontal"
  required
  ariaLabel="Layout-Auswahl"
>
  <RadioA11y value="grid" label="Grid" />
  <RadioA11y value="list" label="Liste" />
  <RadioA11y value="table" label="Tabelle" />
</RadioGroupA11y>
```

## Barrierefreiheitstests

Die Radio- und RadioGroup-Komponenten wurden mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastatur-Tests** zur Überprüfung der Tastaturnavigation und -bedienung
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Visuelle Tests** zur Überprüfung der Farbkontraste und Fokus-Indikatoren

## Bekannte Einschränkungen

- Die Komponenten unterstützen derzeit keine Gruppierung mit Fieldset und Legend
- Die Komponenten unterstützen derzeit keine automatische Fokussierung auf die erste Option
- Die Komponenten unterstützen derzeit keine Pfeiltasten-Navigation innerhalb der Gruppe
- Die Komponenten unterstützen derzeit keine automatische Auswahl beim Fokussieren