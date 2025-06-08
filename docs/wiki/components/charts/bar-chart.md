# BarChart

Die **BarChart**-Komponente visualisiert kategoriale Daten als Balkendiagramm. Sie unterstützt vertikale und horizontale Darstellung, gruppierte und gestapelte Balken sowie optionale Animationen.

## Import
```jsx
import { BarChart } from '@smolitux/charts';
```

## Verwendung
```jsx
<BarChart
  data={{
    id: 'sales',
    name: 'Sales 2025',
    data: [
      { label: 'Q1', value: 150 },
      { label: 'Q2', value: 230 },
      { label: 'Q3', value: 180 },
      { label: 'Q4', value: 275 },
    ],
  }}
  height={300}
  width={600}
  showGrid
  showLegend
/>
```

## Props
| Prop | Typ | Beschreibung |
|------|-----|--------------|
| `data` | `BarChartSeries | BarChartSeries[]` | Daten für das Diagramm |
| `height` | `number` | Höhe des Charts |
| `width` | `number \| string` | Breite des Charts |
| `showLegend` | `boolean` | Legende anzeigen |
| `legendPosition` | `'top' \| 'right' \| 'bottom' \| 'left'` | Position der Legende |
| `showValues` | `boolean` | Werte an den Balken anzeigen |
| `horizontal` | `boolean` | Horizontale Balken statt vertikal |
| `stacked` | `boolean` | Balken gestapelt darstellen |
| `valueTextColor` | `string` | Farbe der Wertebeschriftungen |
| `legendTextColor` | `string` | Farbe des Legendentextes |

Weitere Eigenschaften wie `colors`, `formatYLabel` oder `animated` ermöglichen umfangreiche Anpassungen.

## Barrierefreiheit
Die Komponente rendert ein `svg`-Element mit `role="img"` und unterstützt `aria-label`, um Screenreader-Text bereitzustellen.
