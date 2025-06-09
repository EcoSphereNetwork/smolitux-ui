# ChartAxis

Die **ChartAxis**-Komponente stellt eine wiederverwendbare SVG-Achse für Diagramme bereit. Sie kann horizontal oder vertikal ausgerichtet werden und unterstützt Ticks sowie ein optionales Achsenlabel.

## Import
```jsx
import { ChartAxis } from '@smolitux/charts';
```

## Verwendung
```jsx
<svg width={200} height={60}>
  <ChartAxis
    length={180}
    ticks={[{ value: 0, position: 0 }, { value: 100, position: 1 }]}
    orientation="horizontal"
    axisLabel="X-Axis"
  />
</svg>
```

## Props
| Prop | Typ | Beschreibung |
|------|-----|--------------|
| `length` | `number` | Länge der Achse |
| `orientation` | `'horizontal' \| 'vertical'` | Ausrichtung der Achse |
| `ticks` | `ChartAxisTick[]` | Tick-Werte und Positionen |
| `axisLabel` | `string` | Beschriftung der Achse |
| `className` | `string` | Zusätzliche CSS-Klasse |

## Barrierefreiheit
Die Achse verwendet ein `svg`-Element mit semantischen `<line>`- und `<text>`-Elementen. Alle Texte sind per Screenreader erfassbar.
