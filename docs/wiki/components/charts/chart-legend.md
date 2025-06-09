# ChartLegend

Die **ChartLegend**-Komponente zeigt eine einfache Legende für Diagramme an. Die Einträge können horizontal oder vertikal angeordnet werden.

## Import
```jsx
import { ChartLegend } from '@smolitux/charts';
```

## Verwendung
```jsx
<svg width={200} height={80}>
  <ChartLegend
    items={[{ label: 'A', color: '#ff0000' }, { label: 'B', color: '#00ff00' }]}
    direction="horizontal"
  />
</svg>
```

## Props
| Prop | Typ | Beschreibung |
|------|-----|--------------|
| `items` | `LegendItem[]` | Einträge der Legende |
| `direction` | `'horizontal' \| 'vertical'` | Ausrichtung der Einträge |
| `itemSpacing` | `number` | Abstand zwischen den Einträgen |
| `markerSize` | `number` | Größe der Farbmarkierung |
| `className` | `string` | Zusätzliche CSS-Klasse |

## Barrierefreiheit
Alle Texte der Legende sind innerhalb des SVG lesbar und können von Screenreadern erfasst werden.
