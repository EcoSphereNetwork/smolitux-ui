# Grid

Das Grid-System ist eine flexible Layout-Komponente, die auf CSS Grid basiert und die einfache Erstellung von responsiven Layouts ermöglicht. Es verwendet ein 12-Spalten-System, das sich automatisch an verschiedene Bildschirmgrößen anpasst.

## Import

```jsx
import { Grid } from '@smolitux/layout';
```

## Verwendung

### Einfaches Grid

```jsx
<Grid>
  <Grid.Item xs={12} md={6}>
    <div>Spalte 1</div>
  </Grid.Item>
  <Grid.Item xs={12} md={6}>
    <div>Spalte 2</div>
  </Grid.Item>
</Grid>
```

### Grid mit Abständen

```jsx
<Grid spacing="md">
  <Grid.Item xs={12} md={4}>
    <div>Spalte 1</div>
  </Grid.Item>
  <Grid.Item xs={12} md={4}>
    <div>Spalte 2</div>
  </Grid.Item>
  <Grid.Item xs={12} md={4}>
    <div>Spalte 3</div>
  </Grid.Item>
</Grid>
```

### Ausrichtung von Grid-Elementen

```jsx
<Grid alignItems="center" justifyContent="space-between">
  <Grid.Item xs={6}>
    <div>Links ausgerichtet</div>
  </Grid.Item>
  <Grid.Item xs={6}>
    <div>Rechts ausgerichtet</div>
  </Grid.Item>
</Grid>
```

## Props

### Grid Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `children` | `ReactNode` | - | Die Grid-Elemente |
| `spacing` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'sm'` | Der Abstand zwischen den Grid-Elementen |
| `alignItems` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Die vertikale Ausrichtung der Grid-Elemente |
| `justifyContent` | `'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'start'` | Die horizontale Ausrichtung der Grid-Elemente |
| `container` | `boolean` | `true` | Wenn `true`, wird das Element als Grid-Container behandelt |
| `className` | `string` | - | Zusätzliche CSS-Klasse |
| `style` | `CSSProperties` | - | Inline-Styles für das Grid |

### Grid.Item Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `children` | `ReactNode` | - | Der Inhalt des Grid-Elements |
| `xs` | `number \| 'auto'` | `12` | Die Anzahl der Spalten, die das Element auf extra kleinen Bildschirmen einnimmt (0-12) |
| `sm` | `number \| 'auto'` | - | Die Anzahl der Spalten, die das Element auf kleinen Bildschirmen einnimmt (0-12) |
| `md` | `number \| 'auto'` | - | Die Anzahl der Spalten, die das Element auf mittleren Bildschirmen einnimmt (0-12) |
| `lg` | `number \| 'auto'` | - | Die Anzahl der Spalten, die das Element auf großen Bildschirmen einnimmt (0-12) |
| `xl` | `number \| 'auto'` | - | Die Anzahl der Spalten, die das Element auf extra großen Bildschirmen einnimmt (0-12) |
| `order` | `number` | - | Die Reihenfolge des Elements im Grid |
| `className` | `string` | - | Zusätzliche CSS-Klasse |
| `style` | `CSSProperties` | - | Inline-Styles für das Grid-Element |

## Breakpoints

Die Breakpoints für die verschiedenen Bildschirmgrößen sind:

| Name | Breite |
|------|--------|
| `xs` | < 576px |
| `sm` | ≥ 576px |
| `md` | ≥ 768px |
| `lg` | ≥ 992px |
| `xl` | ≥ 1200px |

## Beispiele

### Responsive Layout mit unterschiedlichen Spaltenbreiten

```jsx
<Grid spacing="md">
  <Grid.Item xs={12} sm={6} md={4} lg={3}>
    <div>Element 1</div>
  </Grid.Item>
  <Grid.Item xs={12} sm={6} md={4} lg={3}>
    <div>Element 2</div>
  </Grid.Item>
  <Grid.Item xs={12} sm={6} md={4} lg={3}>
    <div>Element 3</div>
  </Grid.Item>
  <Grid.Item xs={12} sm={6} md={12} lg={3}>
    <div>Element 4</div>
  </Grid.Item>
</Grid>
```

### Verschachteltes Grid

```jsx
<Grid spacing="md">
  <Grid.Item xs={12} md={6}>
    <div>Hauptspalte 1</div>
    <Grid spacing="sm">
      <Grid.Item xs={6}>
        <div>Unterspalte 1</div>
      </Grid.Item>
      <Grid.Item xs={6}>
        <div>Unterspalte 2</div>
      </Grid.Item>
    </Grid>
  </Grid.Item>
  <Grid.Item xs={12} md={6}>
    <div>Hauptspalte 2</div>
  </Grid.Item>
</Grid>
```

### Auto-Layout

```jsx
<Grid spacing="md">
  <Grid.Item xs="auto">
    <div>Automatische Breite</div>
  </Grid.Item>
  <Grid.Item xs={6}>
    <div>Feste Breite (6 Spalten)</div>
  </Grid.Item>
  <Grid.Item xs="auto">
    <div>Automatische Breite</div>
  </Grid.Item>
</Grid>
```

## Barrierefreiheit

Das Grid-System selbst hat keine spezifischen Anforderungen an die Barrierefreiheit, da es lediglich als Layout-Komponente dient. Stellen Sie jedoch sicher, dass:

1. Die Reihenfolge der Elemente im DOM der visuellen Reihenfolge entspricht, um eine korrekte Navigation mit der Tastatur zu gewährleisten.
2. Bei Verwendung der `order`-Eigenschaft die logische Reihenfolge des Inhalts nicht beeinträchtigt wird.
3. Das Layout auf allen Bildschirmgrößen gut lesbar und navigierbar ist.