# Container

Der Container ist eine Layout-Komponente, die den Inhalt horizontal zentriert und eine maximale Breite für verschiedene Bildschirmgrößen festlegt.

## Import

```jsx
import { Container } from '@smolitux/layout';
```

## Verwendung

```jsx
<Container maxWidth="lg">
  <h1>Meine Anwendung</h1>
  <p>Inhalt, der auf verschiedenen Bildschirmgrößen konsistent angezeigt wird</p>
</Container>
```

## Props

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| maxWidth | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full' \| 'none' | 'lg' | Maximale Breite des Containers |
| disableGutters | boolean | false | Horizontales Padding deaktivieren |
| fullHeight | boolean | false | Container auf Bildschirmhöhe setzen |
| centerContent | boolean | false | Content innerhalb des Containers zentrieren |
| className | string | '' | Zusätzliche CSS-Klassen |

## Maximale Breiten

Die verschiedenen `maxWidth`-Optionen entsprechen folgenden Breiten:

- **xs**: 640px (max-w-sm)
- **sm**: 768px (max-w-md)
- **md**: 1024px (max-w-lg)
- **lg**: 1280px (max-w-3xl)
- **xl**: 1536px (max-w-5xl)
- **2xl**: 1920px (max-w-7xl)
- **full**: 100% (max-w-full)
- **none**: Keine maximale Breite

## Beispiele

### Standard-Container

```jsx
<Container>
  <p>Inhalt mit Standard-Einstellungen (maxWidth="lg")</p>
</Container>
```

### Container ohne Gutters

```jsx
<Container disableGutters>
  <p>Inhalt ohne horizontales Padding</p>
</Container>
```

### Container mit zentriertem Inhalt

```jsx
<Container centerContent>
  <div>
    <h2>Zentrierter Inhalt</h2>
    <p>Dieser Text ist horizontal und vertikal zentriert</p>
  </div>
</Container>
```

### Container mit voller Höhe

```jsx
<Container fullHeight>
  <p>Dieser Container nimmt die volle Höhe des Elternelements ein</p>
</Container>
```

### Container mit verschiedenen maximalen Breiten

```jsx
<Container maxWidth="xs">
  <p>Extra klein (640px)</p>
</Container>

<Container maxWidth="sm">
  <p>Klein (768px)</p>
</Container>

<Container maxWidth="md">
  <p>Mittel (1024px)</p>
</Container>

<Container maxWidth="lg">
  <p>Groß (1280px)</p>
</Container>

<Container maxWidth="xl">
  <p>Extra groß (1536px)</p>
</Container>

<Container maxWidth="2xl">
  <p>2x Extra groß (1920px)</p>
</Container>

<Container maxWidth="full">
  <p>Volle Breite (100%)</p>
</Container>
```
