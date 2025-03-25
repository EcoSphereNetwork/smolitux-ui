# LineChart

Die LineChart-Komponente ermöglicht die Visualisierung von Datenreihen als Liniendiagramm. Sie ist ideal für die Darstellung von Trends über einen Zeitraum oder für den Vergleich mehrerer Datenreihen.

## Import

```jsx
import { LineChart } from '@smolitux/charts';
```

## Verwendung

### Einfaches Liniendiagramm

```jsx
const data = [
  { x: 'Jan', y: 10 },
  { x: 'Feb', y: 20 },
  { x: 'Mar', y: 15 },
  { x: 'Apr', y: 25 },
  { x: 'May', y: 30 },
];

<LineChart
  data={data}
  xKey="x"
  yKey="y"
  height={300}
  width={600}
/>
```

### Mehrere Datenreihen

```jsx
const multiSeriesData = [
  {
    id: 'series1',
    name: 'Produkt A',
    data: [
      { x: 'Jan', y: 10 },
      { x: 'Feb', y: 20 },
      { x: 'Mar', y: 15 },
      { x: 'Apr', y: 25 },
      { x: 'May', y: 30 },
    ],
    color: '#3498db',
  },
  {
    id: 'series2',
    name: 'Produkt B',
    data: [
      { x: 'Jan', y: 15 },
      { x: 'Feb', y: 10 },
      { x: 'Mar', y: 20 },
      { x: 'Apr', y: 30 },
      { x: 'May', y: 25 },
    ],
    color: '#2ecc71',
  },
];

<LineChart
  series={multiSeriesData}
  height={300}
  width={600}
  showLegend={true}
/>
```

### Mit Achsenbeschriftungen und Titel

```jsx
<LineChart
  data={data}
  xKey="x"
  yKey="y"
  height={300}
  width={600}
  title="Monatliche Verkäufe"
  xAxisLabel="Monat"
  yAxisLabel="Verkäufe (in Tsd. €)"
/>
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `data` | `Array<{ [key: string]: any }>` | - | Die Daten für eine einzelne Datenreihe |
| `series` | `Array<LineChartSeries>` | - | Die Daten für mehrere Datenreihen |
| `xKey` | `string` | `'x'` | Der Schlüssel für die X-Achsenwerte in den Datenpunkten |
| `yKey` | `string` | `'y'` | Der Schlüssel für die Y-Achsenwerte in den Datenpunkten |
| `height` | `number` | `300` | Die Höhe des Diagramms in Pixeln |
| `width` | `number \| string` | `'100%'` | Die Breite des Diagramms in Pixeln oder als Prozentsatz |
| `title` | `string` | - | Der Titel des Diagramms |
| `xAxisLabel` | `string` | - | Die Beschriftung der X-Achse |
| `yAxisLabel` | `string` | - | Die Beschriftung der Y-Achse |
| `showLegend` | `boolean` | `false` | Ob die Legende angezeigt werden soll |
| `legendPosition` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Die Position der Legende |
| `colors` | `string[]` | - | Ein Array von Farben für die Datenreihen |
| `curve` | `'linear' \| 'monotone' \| 'step' \| 'natural'` | `'linear'` | Die Art der Kurve zwischen den Datenpunkten |
| `grid` | `boolean` | `true` | Ob Gitterlinien angezeigt werden sollen |
| `tooltip` | `boolean` | `true` | Ob Tooltips angezeigt werden sollen |
| `animation` | `boolean` | `true` | Ob Animationen aktiviert sein sollen |
| `responsive` | `boolean` | `true` | Ob das Diagramm responsiv sein soll |
| `className` | `string` | - | Zusätzliche CSS-Klasse |
| `style` | `CSSProperties` | - | Inline-Styles für das Diagramm |

### LineChartSeries Typ

```typescript
interface LineChartSeries {
  id: string;
  name: string;
  data: Array<LineChartDataPoint>;
  color?: string;
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  lineWidth?: number;
  showPoints?: boolean;
  pointSize?: number;
  pointShape?: 'circle' | 'square' | 'triangle' | 'diamond';
}

interface LineChartDataPoint {
  x: string | number | Date;
  y: number;
  [key: string]: any;
}
```

## Beispiele

### Anpassung der Linienstile

```jsx
const data = [
  { x: 'Jan', y: 10 },
  { x: 'Feb', y: 20 },
  { x: 'Mar', y: 15 },
  { x: 'Apr', y: 25 },
  { x: 'May', y: 30 },
];

<LineChart
  data={data}
  xKey="x"
  yKey="y"
  height={300}
  width={600}
  curve="monotone"
  lineStyle="dashed"
  lineWidth={2}
  showPoints={true}
  pointSize={6}
  pointShape="diamond"
  color="#e74c3c"
/>
```

### Interaktives Diagramm mit Ereignishandlern

```jsx
const handlePointClick = (point, event) => {
  console.log('Punkt geklickt:', point);
  // Weitere Aktionen...
};

<LineChart
  data={data}
  xKey="x"
  yKey="y"
  height={300}
  width={600}
  onPointClick={handlePointClick}
  tooltip={true}
  animation={true}
/>
```

### Zeitreihen-Diagramm

```jsx
const timeSeriesData = [
  { x: new Date('2023-01-01'), y: 10 },
  { x: new Date('2023-02-01'), y: 20 },
  { x: new Date('2023-03-01'), y: 15 },
  { x: new Date('2023-04-01'), y: 25 },
  { x: new Date('2023-05-01'), y: 30 },
];

<LineChart
  data={timeSeriesData}
  xKey="x"
  yKey="y"
  height={300}
  width={600}
  xAxisType="time"
  xAxisFormat="%b %Y"
  title="Monatliche Verkäufe 2023"
/>
```

## Barrierefreiheit

Die LineChart-Komponente unterstützt Barrierefreiheit durch:

1. **ARIA-Attribute**: Das Diagramm enthält entsprechende ARIA-Rollen und -Beschreibungen.
2. **Tastaturnavigation**: Benutzer können mit der Tastatur durch die Datenpunkte navigieren.
3. **Farbkontrast**: Die Standardfarben erfüllen die WCAG-Anforderungen für Kontrast.
4. **Textuelle Alternative**: Eine tabellarische Darstellung der Daten kann über die `accessibleTable`-Prop aktiviert werden.

Beispiel für verbesserte Barrierefreiheit:

```jsx
<LineChart
  data={data}
  xKey="x"
  yKey="y"
  height={300}
  width={600}
  accessibleTable={true}
  accessibleDescription="Diagramm zeigt die monatlichen Verkaufszahlen von Januar bis Mai."
/>
```