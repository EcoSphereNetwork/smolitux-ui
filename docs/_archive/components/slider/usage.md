# Slider

Die `Slider`-Komponente ermöglicht Benutzern, einen Wert innerhalb eines bestimmten Bereichs auszuwählen.

## Verwendung

```tsx
import { Slider } from '@smolitux/core';

function Example() {
  const [value, setValue] = React.useState(50);
  
  return (
    <Slider
      value={value}
      onChange={setValue}
      min={0}
      max={100}
      step={1}
      aria-label="Beispiel-Slider"
    />
  );
}
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `value` | `number \| [number, number]` | - | Der aktuelle Wert des Sliders (kontrollierter Modus) |
| `defaultValue` | `number \| [number, number]` | `0` oder `[0, 0]` | Der Standardwert des Sliders (unkontrollierter Modus) |
| `min` | `number` | `0` | Der Minimalwert des Sliders |
| `max` | `number` | `100` | Der Maximalwert des Sliders |
| `step` | `number` | `1` | Die Schrittweite des Sliders |
| `onChange` | `(value: number \| [number, number]) => void` | - | Callback, wenn sich der Wert ändert |
| `onChangeEnd` | `(value: number \| [number, number]) => void` | - | Callback, wenn die Wertänderung abgeschlossen ist |
| `isDisabled` | `boolean` | `false` | Ob der Slider deaktiviert ist |
| `isReadOnly` | `boolean` | `false` | Ob der Slider schreibgeschützt ist |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Die Ausrichtung des Sliders |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Die Größe des Sliders |
| `colorScheme` | `'primary' \| 'secondary' \| 'accent' \| 'neutral'` | `'primary'` | Das Farbschema des Sliders |
| `showMarks` | `boolean \| { value: number, label?: string }[]` | `false` | Ob Markierungen angezeigt werden sollen |
| `showValue` | `boolean \| 'auto'` | `'auto'` | Ob der aktuelle Wert angezeigt werden soll |
| `showTooltip` | `boolean \| 'auto' \| 'always'` | `'auto'` | Ob ein Tooltip mit dem aktuellen Wert angezeigt werden soll |
| `tooltipPlacement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Die Platzierung des Tooltips |
| `formatValue` | `(value: number) => string` | `value => value.toString()` | Funktion zur Formatierung des angezeigten Werts |
| `isRange` | `boolean` | `false` | Ob der Slider einen Bereich (zwei Werte) auswählen soll |
| `allowCross` | `boolean` | `false` | Ob sich die Handles in einem Range-Slider kreuzen dürfen |
| `pushable` | `boolean \| number` | `false` | Ob und wie weit Handles in einem Range-Slider verschoben werden können |
| `reverse` | `boolean` | `false` | Ob die Richtung des Sliders umgekehrt werden soll |
| `trackStyle` | `React.CSSProperties` | - | Styles für die Track-Komponente |
| `railStyle` | `React.CSSProperties` | - | Styles für die Rail-Komponente |
| `handleStyle` | `React.CSSProperties \| React.CSSProperties[]` | - | Styles für die Handle-Komponente(n) |
| `markStyle` | `React.CSSProperties` | - | Styles für die Mark-Komponenten |
| `className` | `string` | - | CSS-Klasse für den Slider |
| `style` | `React.CSSProperties` | - | Inline-Styles für den Slider |
| `aria-label` | `string` | - | ARIA-Label für den Slider |
| `aria-labelledby` | `string` | - | ID des Elements, das den Slider beschreibt |
| `aria-valuetext` | `string` | - | Textbeschreibung des aktuellen Werts für Screenreader |
| `name` | `string` | - | Name des Sliders (für Formulare) |
| `id` | `string` | - | ID des Sliders |

## Beispiele

### Einfacher Slider

```tsx
<Slider
  defaultValue={50}
  min={0}
  max={100}
  step={1}
  aria-label="Einfacher Slider"
/>
```

### Slider mit Markierungen

```tsx
<Slider
  defaultValue={50}
  min={0}
  max={100}
  step={25}
  showMarks={true}
  aria-label="Slider mit Markierungen"
/>
```

### Slider mit benutzerdefinierten Markierungen

```tsx
<Slider
  defaultValue={50}
  min={0}
  max={100}
  showMarks={[
    { value: 0, label: 'Min' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: 'Max' }
  ]}
  aria-label="Slider mit benutzerdefinierten Markierungen"
/>
```

### Slider mit Tooltip

```tsx
<Slider
  defaultValue={50}
  min={0}
  max={100}
  showTooltip="always"
  aria-label="Slider mit Tooltip"
/>
```

### Slider mit Wertformatierung

```tsx
<Slider
  defaultValue={50}
  min={0}
  max={100}
  formatValue={(value) => `${value}%`}
  showTooltip="always"
  aria-label="Slider mit Wertformatierung"
/>
```

### Vertikaler Slider

```tsx
<Slider
  defaultValue={50}
  min={0}
  max={100}
  orientation="vertical"
  height="200px"
  aria-label="Vertikaler Slider"
/>
```

### Range Slider

```tsx
<Slider
  defaultValue={[25, 75]}
  min={0}
  max={100}
  isRange={true}
  aria-label="Range Slider"
/>
```

### Range Slider mit Mindestabstand

```tsx
<Slider
  defaultValue={[25, 75]}
  min={0}
  max={100}
  isRange={true}
  pushable={10}
  aria-label="Range Slider mit Mindestabstand"
/>
```

### Deaktivierter Slider

```tsx
<Slider
  defaultValue={50}
  min={0}
  max={100}
  isDisabled={true}
  aria-label="Deaktivierter Slider"
/>
```

### Slider mit verschiedenen Größen

```tsx
<>
  <Slider
    defaultValue={50}
    min={0}
    max={100}
    size="sm"
    aria-label="Kleiner Slider"
  />
  
  <Slider
    defaultValue={50}
    min={0}
    max={100}
    size="md"
    aria-label="Mittlerer Slider"
  />
  
  <Slider
    defaultValue={50}
    min={0}
    max={100}
    size="lg"
    aria-label="Großer Slider"
  />
</>
```

### Slider mit verschiedenen Farbschemata

```tsx
<>
  <Slider
    defaultValue={50}
    min={0}
    max={100}
    colorScheme="primary"
    aria-label="Primärer Slider"
  />
  
  <Slider
    defaultValue={50}
    min={0}
    max={100}
    colorScheme="secondary"
    aria-label="Sekundärer Slider"
  />
  
  <Slider
    defaultValue={50}
    min={0}
    max={100}
    colorScheme="accent"
    aria-label="Akzent-Slider"
  />
  
  <Slider
    defaultValue={50}
    min={0}
    max={100}
    colorScheme="neutral"
    aria-label="Neutraler Slider"
  />
</>
```

### Slider mit benutzerdefiniertem Styling

```tsx
<Slider
  defaultValue={50}
  min={0}
  max={100}
  trackStyle={{ backgroundColor: '#6366f1', height: '8px' }}
  railStyle={{ backgroundColor: '#e5e7eb', height: '8px' }}
  handleStyle={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5', width: '20px', height: '20px' }}
  aria-label="Benutzerdefinierter Slider"
/>
```

## Barrierefreiheit

Die Slider-Komponente ist barrierefrei gestaltet:

- Verwendet die richtigen ARIA-Attribute (`role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`)
- Unterstützt Tastaturnavigation (Pfeiltasten, Home, End)
- Bietet ausreichenden Kontrast zwischen Track und Handle
- Unterstützt Screenreader durch aussagekräftige Wertbeschreibungen

## Tastaturunterstützung

| Taste | Funktion |
|-------|----------|
| `ArrowRight` / `ArrowUp` | Erhöht den Wert um einen Schritt |
| `ArrowLeft` / `ArrowDown` | Verringert den Wert um einen Schritt |
| `PageUp` | Erhöht den Wert um 10 Schritte |
| `PageDown` | Verringert den Wert um 10 Schritte |
| `Home` | Setzt den Wert auf das Minimum |
| `End` | Setzt den Wert auf das Maximum |
| `Tab` | Navigiert zum nächsten Element |
| `Shift + Tab` | Navigiert zum vorherigen Element |

## Hinweise

- Verwenden Sie immer ein `aria-label` oder `aria-labelledby`, um den Slider für Screenreader zu beschreiben
- Verwenden Sie `formatValue`, um den Wert in einem benutzerfreundlichen Format anzuzeigen
- Verwenden Sie `step` entsprechend der Genauigkeit, die für die Anwendung erforderlich ist
- Verwenden Sie `showMarks`, um wichtige Werte im Bereich zu kennzeichnen
- Verwenden Sie `isRange`, wenn ein Bereich ausgewählt werden soll