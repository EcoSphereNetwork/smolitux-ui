# API-Referenz

Die vollständige Referenz wird mit [TypeDoc](https://typedoc.org/) erzeugt. Führen Sie `npm run docs:generate` aus, um HTML-Dokumente im Ordner `docs/api` zu erstellen.

Diese Seite bietet eine detaillierte API-Referenz für alle Komponenten der Smolitux UI Bibliothek.

## Core-Komponenten

### Button

```tsx
import { Button } from '@smolitux/core';

<Button variant="primary" size="md" disabled={false} onClick={() => console.log('Button geklickt')}>
  Klick mich
</Button>;
```

#### Props

| Prop          | Typ                                                                      | Standard    | Beschreibung                      |
| ------------- | ------------------------------------------------------------------------ | ----------- | --------------------------------- |
| `variant`     | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'link' \| 'danger'` | `'primary'` | Die Variante des Buttons          |
| `size`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                   | `'md'`      | Die Größe des Buttons             |
| `disabled`    | `boolean`                                                                | `false`     | Deaktiviert den Button            |
| `fullWidth`   | `boolean`                                                                | `false`     | Button nimmt die volle Breite ein |
| `leftIcon`    | `ReactNode`                                                              | -           | Icon links vom Text               |
| `rightIcon`   | `ReactNode`                                                              | -           | Icon rechts vom Text              |
| `isLoading`   | `boolean`                                                                | `false`     | Zeigt einen Ladezustand an        |
| `loadingText` | `string`                                                                 | -           | Text während des Ladezustands     |
| `onClick`     | `(event: React.MouseEvent<HTMLButtonElement>) => void`                   | -           | Klick-Handler                     |

### Input

```tsx
import { Input } from '@smolitux/core';
import { useState } from 'react';

// In einer Komponente:
const [email, setEmail] = useState('');

<Input
  label="E-Mail"
  type="email"
  placeholder="name@beispiel.de"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error="Ungültige E-Mail-Adresse"
/>;
```

#### Props

| Prop           | Typ                                                                         | Standard | Beschreibung                  |
| -------------- | --------------------------------------------------------------------------- | -------- | ----------------------------- |
| `label`        | `string`                                                                    | -        | Label für das Eingabefeld     |
| `type`         | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` | Typ des Eingabefelds          |
| `placeholder`  | `string`                                                                    | -        | Platzhaltertext               |
| `value`        | `string`                                                                    | -        | Wert des Eingabefelds         |
| `defaultValue` | `string`                                                                    | -        | Standardwert des Eingabefelds |
| `onChange`     | `(event: React.ChangeEvent<HTMLInputElement>) => void`                      | -        | Änderungs-Handler             |
| `onBlur`       | `(event: React.FocusEvent<HTMLInputElement>) => void`                       | -        | Blur-Handler                  |
| `onFocus`      | `(event: React.FocusEvent<HTMLInputElement>) => void`                       | -        | Focus-Handler                 |
| `error`        | `string`                                                                    | -        | Fehlermeldung                 |
| `disabled`     | `boolean`                                                                   | `false`  | Deaktiviert das Eingabefeld   |
| `readOnly`     | `boolean`                                                                   | `false`  | Schreibgeschützt              |
| `required`     | `boolean`                                                                   | `false`  | Pflichtfeld                   |
| `size`         | `'sm' \| 'md' \| 'lg'`                                                      | `'md'`   | Größe des Eingabefelds        |
| `leftElement`  | `ReactNode`                                                                 | -        | Element links im Eingabefeld  |
| `rightElement` | `ReactNode`                                                                 | -        | Element rechts im Eingabefeld |

### Select

```tsx
import { Select } from '@smolitux/core';
import { useState } from 'react';

// In einer Komponente:
const [selectedCountry, setSelectedCountry] = useState('de');

<Select
  label="Land"
  options={[
    { value: 'de', label: 'Deutschland' },
    { value: 'at', label: 'Österreich' },
    { value: 'ch', label: 'Schweiz' },
  ]}
  value={selectedCountry}
  onChange={(value) => setSelectedCountry(value)}
/>;
```

#### Props

| Prop           | Typ                                                           | Standard | Beschreibung                 |
| -------------- | ------------------------------------------------------------- | -------- | ---------------------------- |
| `label`        | `string`                                                      | -        | Label für das Auswahlfeld    |
| `options`      | `Array<{ value: string; label: string; disabled?: boolean }>` | `[]`     | Optionen für das Auswahlfeld |
| `value`        | `string`                                                      | -        | Ausgewählter Wert            |
| `defaultValue` | `string`                                                      | -        | Standardwert                 |
| `onChange`     | `(value: string) => void`                                     | -        | Änderungs-Handler            |
| `placeholder`  | `string`                                                      | -        | Platzhaltertext              |
| `disabled`     | `boolean`                                                     | `false`  | Deaktiviert das Auswahlfeld  |
| `error`        | `string`                                                      | -        | Fehlermeldung                |
| `required`     | `boolean`                                                     | `false`  | Pflichtfeld                  |
| `size`         | `'sm' \| 'md' \| 'lg'`                                        | `'md'`   | Größe des Auswahlfelds       |
| `isSearchable` | `boolean`                                                     | `false`  | Ermöglicht die Suche         |
| `isMulti`      | `boolean`                                                     | `false`  | Ermöglicht Mehrfachauswahl   |

## Layout-Komponenten

### Container

```tsx
import { Container } from '@smolitux/layout';

<Container maxWidth="lg" disableGutters={false}>
  <h1>Meine Seite</h1>
  <p>Inhalt, der auf verschiedenen Bildschirmgrößen konsistent angezeigt wird</p>
</Container>;
```

#### Props

| Prop             | Typ                                                                 | Standard | Beschreibung                                |
| ---------------- | ------------------------------------------------------------------- | -------- | ------------------------------------------- |
| `maxWidth`       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full' \| 'none'` | `'lg'`   | Maximale Breite des Containers              |
| `disableGutters` | `boolean`                                                           | `false`  | Horizontales Padding deaktivieren           |
| `fullHeight`     | `boolean`                                                           | `false`  | Container auf Bildschirmhöhe setzen         |
| `centerContent`  | `boolean`                                                           | `false`  | Content innerhalb des Containers zentrieren |

### Grid

```tsx
import { Grid } from '@smolitux/layout';

<Grid container spacing={4}>
  <Grid item xs={12} md={6}>
    <Card>Inhalt 1</Card>
  </Grid>
  <Grid item xs={12} md={6}>
    <Card>Inhalt 2</Card>
  </Grid>
</Grid>;
```

#### Props

| Prop             | Typ                                                                                             | Standard | Beschreibung                                     |
| ---------------- | ----------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------ |
| `container`      | `boolean`                                                                                       | `false`  | Container-Modus aktivieren (für Grid-Container)  |
| `item`           | `boolean`                                                                                       | `false`  | Item-Modus aktivieren (für Grid-Items)           |
| `spacing`        | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12`                                              | `0`      | Abstand zwischen Grid-Items                      |
| `columnSpacing`  | `Grid['spacing']`                                                                               | -        | Horizontaler Abstand zwischen Grid-Items         |
| `rowSpacing`     | `Grid['spacing']`                                                                               | -        | Vertikaler Abstand zwischen Grid-Items           |
| `justifyContent` | `'flex-start' \| 'center' \| 'flex-end' \| 'space-between' \| 'space-around' \| 'space-evenly'` | -        | Ausrichtung der Items entlang der Hauptachse     |
| `alignItems`     | `'flex-start' \| 'center' \| 'flex-end' \| 'stretch' \| 'baseline'`                             | -        | Ausrichtung der Items entlang der Kreuzachse     |
| `direction`      | `'row' \| 'row-reverse' \| 'column' \| 'column-reverse'`                                        | -        | Flex-Direction der Items                         |
| `wrap`           | `'nowrap' \| 'wrap' \| 'wrap-reverse'`                                                          | `'wrap'` | Flex-Wrap-Verhalten                              |
| `xs`             | `number \| 'auto' \| boolean`                                                                   | -        | Anzahl der Spalten für xs-Bildschirme (0px+)     |
| `sm`             | `number \| 'auto' \| boolean`                                                                   | -        | Anzahl der Spalten für sm-Bildschirme (640px+)   |
| `md`             | `number \| 'auto' \| boolean`                                                                   | -        | Anzahl der Spalten für md-Bildschirme (768px+)   |
| `lg`             | `number \| 'auto' \| boolean`                                                                   | -        | Anzahl der Spalten für lg-Bildschirme (1024px+)  |
| `xl`             | `number \| 'auto' \| boolean`                                                                   | -        | Anzahl der Spalten für xl-Bildschirme (1280px+)  |
| `xxl`            | `number \| 'auto' \| boolean`                                                                   | -        | Anzahl der Spalten für 2xl-Bildschirme (1536px+) |

## Chart-Komponenten

### LineChart

```tsx
import { LineChart } from '@smolitux/charts';

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
    ],
  }}
  height={300}
  showGrid
  showPoints
/>;
```

#### Props

| Prop               | Typ                                                                | Standard                                       | Beschreibung                                       |
| ------------------ | ------------------------------------------------------------------ | ---------------------------------------------- | -------------------------------------------------- |
| `data`             | `LineChartSeries \| LineChartSeries[]`                             | -                                              | Einzelne Datenserie oder Array von Serien          |
| `height`           | `number`                                                           | `300`                                          | Höhe des Charts                                    |
| `width`            | `number \| string`                                                 | `'100%'`                                       | Breite des Charts                                  |
| `padding`          | `{ top?: number; right?: number; bottom?: number; left?: number }` | `{ top: 30, right: 30, bottom: 40, left: 50 }` | Padding innerhalb des Charts                       |
| `axisLabels`       | `{ x?: string; y?: string }`                                       | -                                              | Achsentitel                                        |
| `units`            | `{ x?: string; y?: string }`                                       | -                                              | Einheiten für Achsenbeschriftungen                 |
| `showGrid`         | `boolean`                                                          | `true`                                         | Grid-Linien anzeigen                               |
| `showPoints`       | `boolean`                                                          | `true`                                         | Datenpunkte anzeigen                               |
| `showTooltips`     | `boolean`                                                          | `true`                                         | Tooltips anzeigen                                  |
| `showLegend`       | `boolean`                                                          | `true`                                         | Legende anzeigen                                   |
| `legendPosition`   | `'top' \| 'right' \| 'bottom' \| 'left'`                           | `'top'`                                        | Position der Legende                               |
| `animated`         | `boolean`                                                          | `true`                                         | Animation aktivieren                               |
| `startYAxisAtZero` | `boolean`                                                          | `false`                                        | Y-Achse bei Null beginnen                          |
| `colors`           | `string[]`                                                         | -                                              | Angepasste Farben für mehrere Serien               |
| `formatYLabel`     | `(value: number) => string`                                        | `(value) => value.toString()`                  | Angepasste Formatierung für Y-Achsenbeschriftungen |
| `formatXLabel`     | `(value: string \| number) => string`                              | `(value) => value.toString()`                  | Angepasste Formatierung für X-Achsenbeschriftungen |
| `aspectRatio`      | `number`                                                           | `16 / 9`                                       | Für responsive SVG (viewBox)                       |

#### LineChartSeries Typ

```typescript
interface LineChartSeries {
  id: string;
  name: string;
  color?: string;
  lineType?: 'solid' | 'dashed' | 'dotted';
  lineWidth?: number;
  data: LineChartDataPoint[];
}

interface LineChartDataPoint {
  x: string | number;
  y: number;
  category?: string;
  metadata?: Record<string, any>;
}
```

## Theme-System

### ThemeProvider

```tsx
import { ThemeProvider, createTheme } from '@smolitux/theme';

// Benutzerdefiniertes Theme erstellen
const customTheme = createTheme({
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
  },
  fonts: {
    body: '"Open Sans", sans-serif',
  },
});

// Theme anwenden
<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>;
```

#### Props

| Prop       | Typ         | Standard       | Beschreibung                                              |
| ---------- | ----------- | -------------- | --------------------------------------------------------- |
| `theme`    | `Theme`     | `defaultTheme` | Das zu verwendende Theme                                  |
| `children` | `ReactNode` | -              | Die Komponenten, auf die das Theme angewendet werden soll |

### useTheme Hook

```tsx
import { useTheme } from '@smolitux/theme';

function MyComponent() {
  const { theme, themeMode, setThemeMode } = useTheme();

  return (
    <div>
      <p>Aktuelle Primärfarbe: {theme.colors.primary}</p>
      <p>Aktueller Modus: {themeMode}</p>
      <button onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}>
        Modus wechseln
      </button>
    </div>
  );
}
```

#### Rückgabewerte

| Wert              | Typ                                 | Beschreibung                            |
| ----------------- | ----------------------------------- | --------------------------------------- |
| `theme`           | `Theme`                             | Das aktuelle Theme-Objekt               |
| `themeMode`       | `'light' \| 'dark'`                 | Der aktuelle Theme-Modus                |
| `setThemeMode`    | `(mode: 'light' \| 'dark') => void` | Funktion zum Ändern des Theme-Modus     |
| `toggleThemeMode` | `() => void`                        | Funktion zum Umschalten des Theme-Modus |
