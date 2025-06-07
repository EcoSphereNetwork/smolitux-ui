# Select Komponente

Die Select-Komponente ist ein Dropdown-Menü für die Auswahl aus einer Liste von Optionen mit umfangreichen Anpassungsmöglichkeiten und Barrierefreiheitsfunktionen.

## Eigenschaften

| Eigenschaft | Typ | Standard | Beschreibung |
|-------------|-----|----------|--------------|
| `options` | `SelectOption[]` | - | Array von Optionen für das Dropdown |
| `label` | `string` | - | Text-Label für das Select-Feld |
| `helperText` | `string` | - | Hilfetext unter dem Select-Feld |
| `error` | `string` | - | Fehlermeldung |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Größe des Select-Felds |
| `variant` | `'default' \| 'filled' \| 'outlined' \| 'unstyled'` | `'default'` | Visuelle Variante |
| `fullWidth` | `boolean` | `false` | Select nimmt die volle verfügbare Breite ein |
| `leftIcon` | `ReactNode` | - | Icon links im Select-Feld |
| `rightIcon` | `ReactNode` | - | Icon rechts im Select-Feld (ersetzt den Standard-Pfeil) |
| `placeholder` | `string` | - | Platzhaltertext |
| `required` | `boolean` | `false` | Markiert das Select-Feld als erforderlich |
| `disabled` | `boolean` | `false` | Deaktiviert das Select-Feld |
| `readOnly` | `boolean` | `false` | Macht das Select-Feld schreibgeschützt |
| `rounded` | `boolean` | `true` | Gibt dem Select-Feld abgerundete Ecken |
| `shadow` | `boolean` | `false` | Fügt einen Schatten hinzu |
| `animated` | `boolean` | `true` | Aktiviert Animationen |
| `groupOptions` | `boolean` | `false` | Aktiviert die Gruppierung von Optionen |
| `showOptionDescription` | `boolean` | `false` | Zeigt Beschreibungen für Optionen an |
| `showOptionIcons` | `boolean` | `false` | Zeigt Icons für Optionen an |
| `onChange` | `(e: React.ChangeEvent<HTMLSelectElement>) => void` | - | Callback bei Wertänderung |
| `onFocusChange` | `(isFocused: boolean) => void` | - | Callback bei Fokusänderung |
| `onValueChange` | `(value: string) => void` | - | Callback bei Wertänderung (vereinfacht) |

## SelectOption Interface

| Eigenschaft | Typ | Standard | Beschreibung |
|-------------|-----|----------|--------------|
| `value` | `string` | - | Wert der Option |
| `label` | `string` | - | Anzeigetext der Option |
| `disabled` | `boolean` | `false` | Deaktiviert die Option |
| `description` | `string` | - | Beschreibung der Option |
| `icon` | `ReactNode` | - | Icon für die Option |
| `group` | `string` | - | Gruppenname für die Option |

## Beispiele

### Grundlegende Verwendung

```jsx
<Select 
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]} 
  label="Auswahl" 
/>
```

### Mit Platzhalter

```jsx
<Select 
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]} 
  label="Auswahl" 
  placeholder="Bitte wählen Sie eine Option"
/>
```

### Mit Icons und Beschreibungen

```jsx
<Select 
  options={[
    { 
      value: 'option1', 
      label: 'Option 1', 
      icon: <Icon1 />, 
      description: 'Beschreibung für Option 1' 
    },
    { 
      value: 'option2', 
      label: 'Option 2', 
      icon: <Icon2 />, 
      description: 'Beschreibung für Option 2' 
    }
  ]} 
  label="Auswahl mit Icons und Beschreibungen" 
  showOptionIcons
  showOptionDescription
/>
```

### Gruppierte Optionen

```jsx
<Select 
  options={[
    { value: 'option1', label: 'Option 1', group: 'Gruppe 1' },
    { value: 'option2', label: 'Option 2', group: 'Gruppe 1' },
    { value: 'option3', label: 'Option 3', group: 'Gruppe 2' }
  ]} 
  label="Gruppierte Auswahl" 
  groupOptions
/>
```

### Verschiedene Größen

```jsx
<Select 
  options={options} 
  size="xs" 
  label="Extra Klein" 
/>

<Select 
  options={options} 
  size="sm" 
  label="Klein" 
/>

<Select 
  options={options} 
  size="md" 
  label="Mittel (Standard)" 
/>

<Select 
  options={options} 
  size="lg" 
  label="Groß" 
/>
```

### Verschiedene Varianten

```jsx
<Select 
  options={options} 
  variant="default" 
  label="Standard" 
/>

<Select 
  options={options} 
  variant="filled" 
  label="Gefüllt" 
/>

<Select 
  options={options} 
  variant="outlined" 
  label="Umrandet" 
/>

<Select 
  options={options} 
  variant="unstyled" 
  label="Ohne Styling" 
/>
```

### Mit Validierungszuständen

```jsx
<Select 
  options={options} 
  label="Erforderliche Auswahl" 
  required 
/>

<Select 
  options={options} 
  label="Fehlerhafte Auswahl" 
  error="Bitte wählen Sie eine gültige Option" 
/>

<Select 
  options={options} 
  label="Mit Hilfetext" 
  helperText="Wählen Sie eine der verfügbaren Optionen" 
/>
```

## Barrierefreiheit

Die Select-Komponente wurde mit besonderem Fokus auf Barrierefreiheit entwickelt:

- Korrekte Verknüpfung von Labels mit Select-Feldern über `id` und `htmlFor`
- Unterstützung für `aria-describedby` für Hilfetexte und Fehlermeldungen
- Korrekte `aria-invalid` Attribute für Validierungszustände
- `aria-required` für erforderliche Felder
- `aria-disabled` für deaktivierte Felder
- `aria-readonly` für schreibgeschützte Felder
- `aria-expanded` für den Zustand des Dropdowns
- `aria-haspopup="listbox"` für die korrekte Semantik
- `aria-labelledby` für die Verknüpfung mit dem Label
- Screenreader-Anweisungen für die Tastaturnavigation
- Screenreader-freundliche Fehlermeldungen mit `aria-live="assertive"`
- Hilfetexte mit `aria-live="polite"`
- Versteckte Screenreader-Texte für deaktivierte Optionen

## Design-Überlegungen

- Labels sollten klar und präzise sein
- Platzhalter sollten als Anweisung formuliert sein
- Optionen sollten kurz und eindeutig sein
- Gruppierte Optionen verbessern die Übersichtlichkeit bei vielen Optionen
- Icons können die Erkennbarkeit verbessern, sollten aber nicht die einzige Unterscheidung sein
- Fehlermeldungen sollten spezifisch und lösungsorientiert sein

## Implementierungsdetails

Die Select-Komponente verwendet intern:
- Native HTML `<select>` und `<option>` Elemente für optimale Barrierefreiheit
- Optionale Gruppierung mit `<optgroup>`
- CSS-Transitions für Hover- und Fokus-Effekte
- React.forwardRef für Ref-Weiterleitung
- Tailwind CSS für Styling
- Zustandsmanagement für Fokus

## Aktuelle Verbesserungen

- Verbesserte ARIA-Attribute für bessere Screenreader-Unterstützung
- Hinzufügung von aria-expanded, aria-haspopup, aria-labelledby
- Screenreader-Anweisungen für Tastaturnavigation
- Verbesserte Behandlung von Fehlermeldungen und Hilfetexten
- Bessere Unterstützung für gruppierte Optionen

## Zukünftige Verbesserungen

- Benutzerdefinierte Dropdown-Darstellung mit besserer visueller Kontrolle
- Unterstützung für Mehrfachauswahl mit verbesserter Barrierefreiheit
- Suchfunktion für lange Optionslisten
- Virtualisierung für sehr große Optionslisten
- Verbesserte Tastaturnavigation in Optionsgruppen
- Theming-Unterstützung für benutzerdefinierte Farbpaletten