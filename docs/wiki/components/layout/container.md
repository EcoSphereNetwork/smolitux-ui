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


## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `children` | `ReactNode` | - | Der Inhalt des Containers |
| `maxWidth` | `ResponsiveProp<'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full' \| 'none'>` | `'lg'` | Maximale Breite, optional responsive |
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


### Responsive Container

```jsx
<Container maxWidth={{ sm: 'sm', lg: 'xl' }}>
  <p>Dieser Container passt seine Breite an verschiedene Breakpoints an.</p>
</Container>
```

## Barrierefreiheit

Der Container selbst hat keine spezifischen Anforderungen an die Barrierefreiheit, da er lediglich als Layout-Komponente dient. Stellen Sie jedoch sicher, dass der Inhalt innerhalb des Containers den Richtlinien für Barrierefreiheit entspricht.