# Grid

Die Grid-Komponente bietet ein flexibles Grid-System für responsive Layouts, basierend auf CSS Grid und Flexbox.

## Import

```jsx
import { Grid } from '@smolitux/layout';
```

## Verwendung

```jsx
<Grid container spacing={4}>
  <Grid item xs={12} md={6}>
    <div>Inhalt 1</div>
  </Grid>
  <Grid item xs={12} md={6}>
    <div>Inhalt 2</div>
  </Grid>
</Grid>
```

## Props

### Gemeinsame Props

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| className | string | '' | Zusätzliche CSS-Klassen |

### Container Props

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| container | boolean | false | Container-Modus aktivieren |
| spacing | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 | 0 | Abstand zwischen Grid-Items |
| columnSpacing | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 | - | Horizontaler Abstand zwischen Grid-Items |
| rowSpacing | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 | - | Vertikaler Abstand zwischen Grid-Items |
| justifyContent | 'flex-start' \| 'center' \| 'flex-end' \| 'space-between' \| 'space-around' \| 'space-evenly' | - | Ausrichtung der Items entlang der Hauptachse |
| alignItems | 'flex-start' \| 'center' \| 'flex-end' \| 'stretch' \| 'baseline' | - | Ausrichtung der Items entlang der Kreuzachse |
| direction | 'row' \| 'row-reverse' \| 'column' \| 'column-reverse' | - | Flex-Direction der Items |
| wrap | 'nowrap' \| 'wrap' \| 'wrap-reverse' | 'wrap' | Flex-Wrap-Verhalten |

### Item Props

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| item | boolean | false | Item-Modus aktivieren |
| xs | number \| 'auto' \| boolean | - | Anzahl der Spalten für xs-Bildschirme (0px+) |
| sm | number \| 'auto' \| boolean | - | Anzahl der Spalten für sm-Bildschirme (640px+) |
| md | number \| 'auto' \| boolean | - | Anzahl der Spalten für md-Bildschirme (768px+) |
| lg | number \| 'auto' \| boolean | - | Anzahl der Spalten für lg-Bildschirme (1024px+) |
| xl | number \| 'auto' \| boolean | - | Anzahl der Spalten für xl-Bildschirme (1280px+) |
| xxl | number \| 'auto' \| boolean | - | Anzahl der Spalten für 2xl-Bildschirme (1536px+) |

## Beispiele

### Grundlegendes Grid-Layout

```jsx
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
    <div>Item 1</div>
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <div>Item 2</div>
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <div>Item 3</div>
  </Grid>
</Grid>
```

### Unterschiedliche Spaltenbreiten

```jsx
<Grid container spacing={2}>
  <Grid item xs={12} md={8}>
    <div>Hauptinhalt (8/12)</div>
  </Grid>
  <Grid item xs={12} md={4}>
    <div>Seitenleiste (4/12)</div>
  </Grid>
</Grid>
```

### Automatische Breite

```jsx
<Grid container spacing={2}>
  <Grid item xs>
    <div>Automatische Breite</div>
  </Grid>
  <Grid item xs>
    <div>Automatische Breite</div>
  </Grid>
  <Grid item xs>
    <div>Automatische Breite</div>
  </Grid>
</Grid>
```

### Ausrichtung von Items

```jsx
<Grid container spacing={2} justifyContent="center" alignItems="center">
  <Grid item xs={6}>
    <div>Zentriertes Item</div>
  </Grid>
</Grid>
```

### Verschachtelte Grids

```jsx
<Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <div>Verschachteltes Item 1</div>
      </Grid>
      <Grid item xs={6}>
        <div>Verschachteltes Item 2</div>
      </Grid>
    </Grid>
  </Grid>
  <Grid item xs={12} md={6}>
    <div>Hauptitem</div>
  </Grid>
</Grid>
```

### Unterschiedliche Abstände

```jsx
<Grid container rowSpacing={4} columnSpacing={2}>
  <Grid item xs={6}>
    <div>Item 1</div>
  </Grid>
  <Grid item xs={6}>
    <div>Item 2</div>
  </Grid>
  <Grid item xs={6}>
    <div>Item 3</div>
  </Grid>
  <Grid item xs={6}>
    <div>Item 4</div>
  </Grid>
</Grid>
```
