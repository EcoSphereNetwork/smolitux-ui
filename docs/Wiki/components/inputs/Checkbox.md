# Checkbox Komponente

Die Checkbox-Komponente ist ein Formular-Element für Ja/Nein-Auswahlen mit umfangreichen Anpassungsmöglichkeiten und Barrierefreiheitsfunktionen. Sie kann auch als Switch, Toggle, Radio oder Button dargestellt werden.

## Eigenschaften

| Eigenschaft | Typ | Standard | Beschreibung |
|-------------|-----|----------|--------------|
| `label` | `ReactNode` | - | Text-Label für die Checkbox |
| `helperText` | `ReactNode` | - | Hilfetext unter der Checkbox |
| `error` | `ReactNode` | - | Fehlermeldung |
| `successMessage` | `ReactNode` | - | Erfolgsmeldung |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Größe der Checkbox |
| `variant` | `'solid' \| 'outline' \| 'filled' \| 'minimal'` | `'solid'` | Visuelle Variante |
| `indeterminate` | `boolean` | `false` | Indeterminierter Zustand |
| `colorScheme` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info'` | `'primary'` | Farbschema |
| `isDisabled` | `boolean` | `false` | Deaktiviert die Checkbox |
| `isRequired` | `boolean` | `false` | Markiert die Checkbox als erforderlich |
| `isLoading` | `boolean` | `false` | Zeigt einen Ladezustand an |
| `isValid` | `boolean` | `false` | Zeigt einen gültigen Zustand an |
| `isInvalid` | `boolean` | `false` | Zeigt einen ungültigen Zustand an |
| `isSuccess` | `boolean` | `false` | Zeigt einen erfolgreichen Zustand an |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Position des Labels |
| `isVertical` | `boolean` | `false` | Vertikale Ausrichtung |
| `isSwitch` | `boolean` | `false` | Als Switch darstellen |
| `isRadio` | `boolean` | `false` | Als Radio-Button darstellen |
| `isToggle` | `boolean` | `false` | Als Toggle darstellen |
| `isButton` | `boolean` | `false` | Als Button darstellen |
| `onChange` | `(e: React.ChangeEvent<HTMLInputElement>) => void` | - | Callback bei Wertänderung |

## Beispiele

### Grundlegende Verwendung

```jsx
<Checkbox label="Ich stimme den AGB zu" />
```

### Mit Hilfetext und Fehlermeldung

```jsx
<Checkbox 
  label="Newsletter abonnieren" 
  helperText="Sie erhalten maximal eine E-Mail pro Woche"
/>

<Checkbox 
  label="Ich stimme den AGB zu" 
  error="Sie müssen den AGB zustimmen, um fortzufahren"
  isInvalid
/>
```

### Verschiedene Größen

```jsx
<Checkbox size="xs" label="Extra Klein" />
<Checkbox size="sm" label="Klein" />
<Checkbox size="md" label="Mittel (Standard)" />
<Checkbox size="lg" label="Groß" />
<Checkbox size="xl" label="Extra Groß" />
```

### Verschiedene Varianten

```jsx
<Checkbox variant="solid" label="Solid (Standard)" />
<Checkbox variant="outline" label="Outline" />
<Checkbox variant="filled" label="Filled" />
<Checkbox variant="minimal" label="Minimal" />
```

### Verschiedene Darstellungen

```jsx
<Checkbox label="Standard Checkbox" />
<Checkbox isSwitch label="Als Switch" />
<Checkbox isToggle label="Als Toggle" />
<Checkbox isRadio label="Als Radio-Button" />
<Checkbox isButton label="Als Button" />
```

### Indeterminierter Zustand

```jsx
<Checkbox 
  label="Alle auswählen" 
  indeterminate={someChecked && !allChecked}
  checked={allChecked}
  onChange={handleSelectAll}
/>
```

### Verschiedene Zustände

```jsx
<Checkbox label="Normal" />
<Checkbox label="Ausgewählt" checked />
<Checkbox label="Deaktiviert" isDisabled />
<Checkbox label="Deaktiviert und ausgewählt" isDisabled checked />
<Checkbox label="Erforderlich" isRequired />
<Checkbox label="Lädt..." isLoading />
<Checkbox label="Gültig" isValid />
<Checkbox label="Ungültig" isInvalid />
<Checkbox label="Erfolgreich" isSuccess />
```

### Label-Position

```jsx
<Checkbox label="Label rechts (Standard)" labelPosition="right" />
<Checkbox label="Label links" labelPosition="left" />
```

### Vertikale Ausrichtung

```jsx
<Checkbox 
  label="Vertikale Ausrichtung" 
  helperText="Mit Hilfetext darunter"
  isVertical
/>
```

## Barrierefreiheit

Die Checkbox-Komponente wurde mit besonderem Fokus auf Barrierefreiheit entwickelt:

- Korrekte Verknüpfung von Labels mit Checkboxen über `id` und `htmlFor`
- Unterstützung für `aria-describedby` für Hilfetexte und Fehlermeldungen
- Korrekte `aria-invalid` Attribute für Validierungszustände
- `aria-required` für erforderliche Felder
- `aria-disabled` für deaktivierte Felder
- `aria-checked="mixed"` für indeterminierte Zustände
- `aria-busy` für Ladezustände
- `aria-roledescription="Schalter"` für Switch- und Toggle-Varianten
- Screenreader-freundliche Fehlermeldungen mit `aria-live="assertive"`
- Hilfetexte und Erfolgsmeldungen mit `aria-live="polite"`
- Versteckte Screenreader-Texte für erforderliche Felder

## Design-Überlegungen

- Labels sollten klar und präzise sein
- Checkboxen sollten für Ja/Nein-Fragen verwendet werden
- Radio-Buttons sollten für Auswahlen aus mehreren Optionen verwendet werden
- Switches sollten für Ein/Aus-Zustände verwendet werden, die sofort wirksam werden
- Toggles sollten für Ein/Aus-Zustände verwendet werden, die erst nach Bestätigung wirksam werden
- Button-Checkboxen sollten für hervorgehobene Auswahlmöglichkeiten verwendet werden

## Implementierungsdetails

Die Checkbox-Komponente verwendet intern:
- Native HTML `<input type="checkbox">` Elemente für optimale Barrierefreiheit
- CSS-Transitions für Hover- und Fokus-Effekte
- React.forwardRef für Ref-Weiterleitung
- Tailwind CSS für Styling
- Zustandsmanagement für Hover, Fokus und aktive Zustände
- Optionaler Ripple-Effekt für besseres visuelles Feedback

## Aktuelle Verbesserungen

- Verbesserte ARIA-Attribute für bessere Screenreader-Unterstützung
- Optimierte Beschreibungen und Hilfetexte mit aria-describedby
- Hinzufügung von aria-live für dynamische Inhalte
- Verbesserte Behandlung von Fehlermeldungen und Erfolgsmeldungen
- Screenreader-freundliche Kennzeichnung von erforderlichen Feldern

## Zukünftige Verbesserungen

- Verbesserte Tastaturnavigation für Gruppen von Checkboxen
- Unterstützung für benutzerdefinierte Icons
- Verbesserte Animation für Zustandsübergänge
- CheckboxGroup-Komponente für einfachere Verwaltung von Checkbox-Gruppen
- Theming-Unterstützung für benutzerdefinierte Farbpaletten