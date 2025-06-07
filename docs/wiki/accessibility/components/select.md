# Select Barrierefreiheit

## Implementierte Verbesserungen

Die Select-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `role="combobox"` - Definiert das Element als Combobox
- `aria-haspopup="listbox"` - Zeigt an, dass das Element ein Listbox-Popup hat
- `aria-expanded` - Zeigt an, ob das Dropdown geöffnet ist
- `aria-activedescendant` - Verknüpft das aktive Element mit dem Select
- `aria-label` - Bietet eine Beschreibung des Selects
- `aria-labelledby` - Verknüpft ein Label mit dem Select
- `aria-describedby` - Verknüpft eine ausführliche Beschreibung mit dem Select
- `aria-errormessage` - Verknüpft eine Fehlermeldung mit dem Select
- `aria-invalid` - Zeigt an, ob das Select ungültig ist
- `aria-required` - Zeigt an, ob das Select erforderlich ist
- `aria-disabled` - Zeigt an, ob das Select deaktiviert ist
- `aria-readonly` - Zeigt an, ob das Select schreibgeschützt ist
- `aria-busy` - Zeigt an, ob das Select im Ladezustand ist

### Tastaturunterstützung

- Vollständige Tastaturnavigation mit Tab-Taste
- Öffnen/Schließen des Dropdowns mit Enter oder Leertaste
- Navigation durch die Optionen mit Pfeiltasten
- Schließen des Dropdowns mit Escape-Taste
- Visuelle Fokus-Indikatoren
- Unterstützung für Tastatur-Events (keydown, keyup)

### Screenreader-Unterstützung

- Versteckte Beschreibungen für zusätzliche Informationen
- Live-Regionen für Statusänderungen
- Ankündigung von Dropdown-Öffnung und -Schließung
- Ankündigung von ausgewählten Optionen
- Ankündigung von Fehlermeldungen
- Screenreader-Anweisungen für die Bedienung

### Zusätzliche Funktionen

- Benutzerdefinierte Labels für das Select
- Benutzerdefinierte Beschreibungen für Screenreader
- Unterstützung für Mehrfachauswahl
- Unterstützung für gruppierte Optionen
- Unterstützung für Optionsbeschreibungen
- Unterstützung für maximale Anzahl an Auswahlmöglichkeiten

## Beispiel-Implementierung

```tsx
// Einfaches Select
<SelectA11y 
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]}
  label="Wählen Sie eine Option"
  ariaLabel="Optionsauswahl"
  description="Bitte wählen Sie eine der folgenden Optionen"
/>

// Select mit Mehrfachauswahl
<SelectA11y 
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]}
  label="Wählen Sie Optionen"
  isMulti
  maxSelections={2}
  ariaLabel="Mehrfachauswahl"
/>

// Select mit gruppierten Optionen
<SelectA11y 
  options={[
    { value: 'option1', label: 'Option 1', group: 'Gruppe 1' },
    { value: 'option2', label: 'Option 2', group: 'Gruppe 1' },
    { value: 'option3', label: 'Option 3', group: 'Gruppe 2' },
    { value: 'option4', label: 'Option 4', group: 'Gruppe 2' }
  ]}
  label="Wählen Sie eine Option"
  groupOptions
  ariaLabel="Gruppierte Optionen"
/>

// Select mit Optionsbeschreibungen
<SelectA11y 
  options={[
    { value: 'option1', label: 'Option 1', description: 'Dies ist Option 1' },
    { value: 'option2', label: 'Option 2', description: 'Dies ist Option 2' },
    { value: 'option3', label: 'Option 3', description: 'Dies ist Option 3' }
  ]}
  label="Wählen Sie eine Option"
  ariaLabel="Optionen mit Beschreibungen"
/>
```

## Barrierefreiheitstests

Die Select-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastatur-Tests** zur Überprüfung der Tastaturnavigation und -bedienung
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Visuelle Tests** zur Überprüfung der Farbkontraste und Fokus-Indikatoren

## Bekannte Einschränkungen

- Die Komponente verwendet das native Select-Element, was die Anpassungsmöglichkeiten einschränkt
- Die Komponente unterstützt derzeit keine benutzerdefinierte Filterung oder Suche
- Die Komponente unterstützt derzeit keine asynchrone Datenladung
- Die Komponente unterstützt derzeit keine Drag-and-Drop-Sortierung von Optionen
- Die Komponente unterstützt derzeit keine Erstellung neuer Optionen