# LineChart

Die LineChart-Komponente ist für die Darstellung von Zeitreihen und kontinuierlichen Daten konzipiert.

## Import

```jsx
import { LineChart } from '@smolitux/charts';
```

## Verwendung

```jsx
<LineChart
  data={{
    id: 'views',
    name: 'Page Views',
    data: [
      { x: 'Jan', y: 100 },
      { x: 'Feb', y: 150 },
      { x: 'Mar', y: 200 },
      { x: 'Apr', y: 120 },
      { x: 'May', y: 180 },
    ]
  }}
  height={300}
  showGrid
  showPoints
/>
```

## Props

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| data | LineChartSeries \| LineChartSeries[] | - | Einzelne Datenserie oder Array von Serien |
| height | number | 300 | Höhe des Charts |
| width | number \| string | '100%' | Breite des Charts |
| padding | { top?: number; right?: number; bottom?: number; left?: number } | { top: 30, right: 30, bottom: 40, left: 50 } | Padding innerhalb des Charts |
| axisLabels | { x?: string; y?: string } | - | Achsentitel |
| units | { x?: string; y?: string } | - | Einheiten für Achsenbeschriftungen |
| showGrid | boolean | true | Grid-Linien anzeigen |
| showPoints | boolean | true | Datenpunkte anzeigen |
| showTooltips | boolean | true | Tooltips anzeigen |
| showLegend | boolean | true | Legende anzeigen |
| legendPosition | 'top' \| 'right' \| 'bottom' \| 'left' | 'top' | Position der Legende |
| animated | boolean | true | Animation aktivieren |
| startYAxisAtZero | boolean | false | Y-Achse bei Null beginnen |
| colors | string[] | - | Angepasste Farben für mehrere Serien |
| formatYLabel | (value: number) => string | (value) => `${value}` | Angepasste Formatierung für Y-Achsenbeschriftungen |
| formatXLabel | (value: string \| number) => string | (value) => `${value}` | Angepasste Formatierung für X-Achsenbeschriftungen |
| aspectRatio | number | 16 / 9 | Für responsive SVG (viewBox) |

## Datentypen

### LineChartDataPoint

```typescript
interface LineChartDataPoint {
  /** X-Wert (Label) */
  x: string | number;
  /** Y-Wert (Datenpunkt) */
  y: number;
  /** Optional: Kategorie für Multi-Serien Charts */
  category?: string;
  /** Optional: Metadata für Tooltips etc. */
  metadata?: Record<string, any>;
}
```

### LineChartSeries

```typescript
interface LineChartSeries {
  /** ID der Serie */
  id: string;
  /** Name der Serie (für Legende) */
  name: string;
  /** Farbe der Serie */
  color?: string;
  /** Linientyp */
  lineType?: 'solid' | 'dashed' | 'dotted';
  /** Linienstärke */
  lineWidth?: number;
  /** Daten der Serie */
  data: LineChartDataPoint[];
}
```

## Beispiele

### Einfaches Liniendiagramm

```jsx
<LineChart
  data={{
    id: 'temperature',
    name: 'Temperatur',
    data: [
      { x: 'Mo', y: 22 },
      { x: 'Di', y: 24 },
      { x: 'Mi', y: 26 },
      { x: 'Do', y: 25 },
      { x: 'Fr', y: 23 },
      { x: 'Sa', y: 21 },
      { x: 'So', y: 20 },
    ]
  }}
  height={300}
  axisLabels={{ x: 'Tag', y: 'Temperatur' }}
  units={{ y: '°C' }}
/>
```

### Mehrere Datenreihen

```jsx
<LineChart
  data={[
    {
      id: 'berlin',
      name: 'Berlin',
      color: '#3B82F6',
      data: [
        { x: 'Jan', y: 0 },
        { x: 'Feb', y: 1 },
        { x: 'Mar', y: 5 },
        { x: 'Apr', y: 10 },
        { x: 'May', y: 15 },
      ]
    },
    {
      id: 'munich',
      name: 'München',
      color: '#10B981',
      data: [
        { x: 'Jan', y: -2 },
        { x: 'Feb', y: 0 },
        { x: 'Mar', y: 4 },
        { x: 'Apr', y: 9 },
        { x: 'May', y: 14 },
      ]
    }
  ]}
  height={300}
  axisLabels={{ x: 'Monat', y: 'Temperatur' }}
  units={{ y: '°C' }}
/>
```

### Angepasste Formatierung

```jsx
<LineChart
  data={{
    id: 'sales',
    name: 'Verkäufe',
    data: [
      { x: '2023-01', y: 12500 },
      { x: '2023-02', y: 18200 },
      { x: '2023-03', y: 22800 },
      { x: '2023-04', y: 19500 },
      { x: '2023-05', y: 24100 },
    ]
  }}
  height={300}
  formatYLabel={(value) => `${(value / 1000).toFixed(1)}k €`}
  formatXLabel={(value) => {
    const [year, month] = value.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('de-DE', { month: 'short', year: 'numeric' });
  }}
  axisLabels={{ x: 'Zeitraum', y: 'Umsatz' }}
/>
```

### Verschiedene Linientypen

```jsx
<LineChart
  data={[
    {
      id: 'actual',
      name: 'Ist-Werte',
      lineType: 'solid',
      data: [
        { x: 'Q1', y: 100 },
        { x: 'Q2', y: 120 },
        { x: 'Q3', y: 130 },
        { x: 'Q4', y: 150 },
      ]
    },
    {
      id: 'forecast',
      name: 'Prognose',
      lineType: 'dashed',
      data: [
        { x: 'Q1', y: 100 },
        { x: 'Q2', y: 110 },
        { x: 'Q3', y: 140 },
        { x: 'Q4', y: 160 },
      ]
    }
  ]}
  height={300}
/>
```
