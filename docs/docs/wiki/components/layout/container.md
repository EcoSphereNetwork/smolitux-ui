# Container

Der Container ist eine Layout-Komponente, die dazu dient, den Inhalt horizontal zu zentrieren und eine maximale Breite festzulegen. Er passt sich automatisch an verschiedene Bildschirmgrößen an und sorgt für konsistente Ränder.

## Import

```jsx
import { Container } from '@smolitux/layout';
```

## Verwendung

### Einfacher Container

```jsx
<Container>
  <p>Dieser Inhalt wird zentriert und hat eine maximale Breite.</p>
</Container>
```

### Container mit angepasster Breite

```jsx
<Container maxWidth="sm">
  <p>Dieser Container hat eine kleine maximale Breite.</p>
</Container>
```

### Container mit Padding

```jsx
<Container padding="lg">
  <p>Dieser Container hat ein großes Padding.</p>
</Container>
```

### Fluid Container (volle Breite)

```jsx
<Container fluid>
  <p>Dieser Container erstreckt sich über die volle Breite des Bildschirms.</p>
</Container>
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `children` | `ReactNode` | - | Der Inhalt des Containers |
| `maxWidth` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string` | `'lg'` | Die maximale Breite des Containers |
| `fluid` | `boolean` | `false` | Wenn `true`, erstreckt sich der Container über die volle Breite |
| `padding` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Das Padding innerhalb des Containers |
| `className` | `string` | - | Zusätzliche CSS-Klasse |
| `style` | `CSSProperties` | - | Inline-Styles für den Container |

## Maximale Breiten

Die vordefinierten maximalen Breiten sind:

| Wert | Breite |
|------|--------|
| `xs` | 576px |
| `sm` | 768px |
| `md` | 992px |
| `lg` | 1200px |
| `xl` | 1400px |

## Beispiele

### Verschachtelte Container

```jsx
<Container>
  <h1>Äußerer Container</h1>
  <Container maxWidth="sm">
    <h2>Innerer Container</h2>
    <p>Dieser Container ist in einem anderen Container verschachtelt.</p>
  </Container>
</Container>
```

### Container mit Hintergrundfarbe

```jsx
<Container style={{ backgroundColor: '#f5f5f5' }} padding="lg">
  <h1>Container mit Hintergrund</h1>
  <p>Dieser Container hat eine Hintergrundfarbe und größeres Padding.</p>
</Container>
```

### Responsive Container

```jsx
<Container maxWidth={{ xs: '100%', sm: '540px', md: '720px', lg: '960px', xl: '1140px' }}>
  <p>Dieser Container passt seine maximale Breite an verschiedene Breakpoints an.</p>
</Container>
```

## Barrierefreiheit

Der Container selbst hat keine spezifischen Anforderungen an die Barrierefreiheit, da er lediglich als Layout-Komponente dient. Stellen Sie jedoch sicher, dass der Inhalt innerhalb des Containers den Richtlinien für Barrierefreiheit entspricht.