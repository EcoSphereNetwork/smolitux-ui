# Flex

Die Flex-Komponente ermöglicht flexibles Layout mit CSS Flexbox und bietet eine einfache API für die Erstellung von responsiven Layouts.

## Import

```jsx
import { Flex, FlexItem } from '@smolitux/core';
```

## Verwendung

### Einfaches Flex-Layout

```jsx
<Flex>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>
```

### Flex-Richtung

```jsx
<>
  <Flex direction="row" className="mb-4">
    <div className="p-4 bg-gray-200">Item 1</div>
    <div className="p-4 bg-gray-300">Item 2</div>
    <div className="p-4 bg-gray-400">Item 3</div>
  </Flex>
  
  <Flex direction="column">
    <div className="p-4 bg-gray-200">Item 1</div>
    <div className="p-4 bg-gray-300">Item 2</div>
    <div className="p-4 bg-gray-400">Item 3</div>
  </Flex>
</>
```

### Ausrichtung (Justify Content)

```jsx
<>
  <div className="mb-2">flex-start (Standard):</div>
  <Flex justify="flex-start" className="mb-4 bg-gray-100 p-2">
    <div className="p-4 bg-gray-200">Item 1</div>
    <div className="p-4 bg-gray-300">Item 2</div>
    <div className="p-4 bg-gray-400">Item 3</div>
  </Flex>
  
  <div className="mb-2">flex-end:</div>
  <Flex justify="flex-end" className="mb-4 bg-gray-100 p-2">
    <div className="p-4 bg-gray-200">Item 1</div>
    <div className="p-4 bg-gray-300">Item 2</div>
    <div className="p-4 bg-gray-400">Item 3</div>
  </Flex>
  
  <div className="mb-2">center:</div>
  <Flex justify="center" className="mb-4 bg-gray-100 p-2">
    <div className="p-4 bg-gray-200">Item 1</div>
    <div className="p-4 bg-gray-300">Item 2</div>
    <div className="p-4 bg-gray-400">Item 3</div>
  </Flex>
  
  <div className="mb-2">space-between:</div>
  <Flex justify="space-between" className="mb-4 bg-gray-100 p-2">
    <div className="p-4 bg-gray-200">Item 1</div>
    <div className="p-4 bg-gray-300">Item 2</div>
    <div className="p-4 bg-gray-400">Item 3</div>
  </Flex>
  
  <div className="mb-2">space-around:</div>
  <Flex justify="space-around" className="mb-4 bg-gray-100 p-2">
    <div className="p-4 bg-gray-200">Item 1</div>
    <div className="p-4 bg-gray-300">Item 2</div>
    <div className="p-4 bg-gray-400">Item 3</div>
  </Flex>
  
  <div className="mb-2">space-evenly:</div>
  <Flex justify="space-evenly" className="bg-gray-100 p-2">
    <div className="p-4 bg-gray-200">Item 1</div>
    <div className="p-4 bg-gray-300">Item 2</div>
    <div className="p-4 bg-gray-400">Item 3</div>
  </Flex>
</>
```

### Ausrichtung (Align Items)

```jsx
<>
  <div className="mb-2">stretch (Standard):</div>
  <Flex align="stretch" className="mb-4 bg-gray-100 p-2" style={{ height: '100px' }}>
    <div className="p-4 bg-gray-200">Item 1</div>
    <div className="p-4 bg-gray-300">Item 2</div>
    <div className="p-4 bg-gray-400">Item 3</div>
  </Flex>
  
  <div className="mb-2">flex-start:</div>
  <Flex align="flex-start" className="mb-4 bg-gray-100 p-2" style={{ height: '100px' }}>
    <div className="p-4 bg-gray-200">Item 1</div>
    <div className="p-4 bg-gray-300">Item 2</div>
    <div className="p-4 bg-gray-400">Item 3</div>
  </Flex>
  
  <div className="mb-2">flex-end:</div>
  <Flex align="flex-end" className="mb-4 bg-gray-100 p-2" style={{ height: '100px' }}>
    <div className="p-4 bg-gray-200">Item 1</div>
    <div className="p-4 bg-gray-300">Item 2</div>
    <div className="p-4 bg-gray-400">Item 3</div>
  </Flex>
  
  <div className="mb-2">center:</div>
  <Flex align="center" className="mb-4 bg-gray-100 p-2" style={{ height: '100px' }}>
    <div className="p-4 bg-gray-200">Item 1</div>
    <div className="p-4 bg-gray-300">Item 2</div>
    <div className="p-4 bg-gray-400">Item 3</div>
  </Flex>
  
  <div className="mb-2">baseline:</div>
  <Flex align="baseline" className="bg-gray-100 p-2" style={{ height: '100px' }}>
    <div className="p-4 bg-gray-200" style={{ fontSize: '14px' }}>Small</div>
    <div className="p-4 bg-gray-300" style={{ fontSize: '20px' }}>Medium</div>
    <div className="p-4 bg-gray-400" style={{ fontSize: '28px' }}>Large</div>
  </Flex>
</>
```

### Flex-Umbruch

```jsx
<>
  <div className="mb-2">nowrap (Standard):</div>
  <Flex wrap="nowrap" className="mb-4 bg-gray-100 p-2" style={{ width: '300px' }}>
    <div className="p-4 bg-gray-200" style={{ width: '120px' }}>Item 1</div>
    <div className="p-4 bg-gray-300" style={{ width: '120px' }}>Item 2</div>
    <div className="p-4 bg-gray-400" style={{ width: '120px' }}>Item 3</div>
  </Flex>
  
  <div className="mb-2">wrap:</div>
  <Flex wrap="wrap" className="bg-gray-100 p-2" style={{ width: '300px' }}>
    <div className="p-4 bg-gray-200" style={{ width: '120px' }}>Item 1</div>
    <div className="p-4 bg-gray-300" style={{ width: '120px' }}>Item 2</div>
    <div className="p-4 bg-gray-400" style={{ width: '120px' }}>Item 3</div>
  </Flex>
</>
```

### Abstand zwischen Elementen (Gap)

```jsx
<>
  <div className="mb-2">xs:</div>
  <Flex gap="xs" className="mb-4 bg-gray-100 p-2">
    <div className="p-4 bg-gray-200">Item 1</div>
    <div className="p-4 bg-gray-300">Item 2</div>
    <div className="p-4 bg-gray-400">Item 3</div>
  </Flex>
  
  <div className="mb-2">sm:</div>
  <Flex gap="sm" className="mb-4 bg-gray-100 p-2">
    <div className="p-4 bg-gray-200">Item 1</div>
    <div className="p-4 bg-gray-300">Item 2</div>
    <div className="p-4 bg-gray-400">Item 3</div>
  </Flex>
  
  <div className="mb-2">md:</div>
  <Flex gap="md" className="mb-4 bg-gray-100 p-2">
    <div className="p-4 bg-gray-200">Item 1</div>
    <div className="p-4 bg-gray-300">Item 2</div>
    <div className="p-4 bg-gray-400">Item 3</div>
  </Flex>
  
  <div className="mb-2">lg:</div>
  <Flex gap="lg" className="mb-4 bg-gray-100 p-2">
    <div className="p-4 bg-gray-200">Item 1</div>
    <div className="p-4 bg-gray-300">Item 2</div>
    <div className="p-4 bg-gray-400">Item 3</div>
  </Flex>
  
  <div className="mb-2">xl:</div>
  <Flex gap="xl" className="bg-gray-100 p-2">
    <div className="p-4 bg-gray-200">Item 1</div>
    <div className="p-4 bg-gray-300">Item 2</div>
    <div className="p-4 bg-gray-400">Item 3</div>
  </Flex>
</>
```

### Unterschiedliche Abstände (Row Gap und Column Gap)

```jsx
<Flex 
  direction="column" 
  rowGap="lg" 
  columnGap="sm" 
  wrap="wrap" 
  className="bg-gray-100 p-2"
>
  <div className="p-4 bg-gray-200">Item 1</div>
  <div className="p-4 bg-gray-300">Item 2</div>
  <div className="p-4 bg-gray-400">Item 3</div>
  <div className="p-4 bg-gray-200">Item 4</div>
  <div className="p-4 bg-gray-300">Item 5</div>
  <div className="p-4 bg-gray-400">Item 6</div>
</Flex>
```

### Inline Flex

```jsx
<div>
  Text vor dem Flex-Container
  <Flex inline className="mx-2 bg-gray-100 p-2">
    <div className="p-2 bg-gray-200">Item 1</div>
    <div className="p-2 bg-gray-300">Item 2</div>
  </Flex>
  Text nach dem Flex-Container
</div>
```

### Volle Breite und Höhe

```jsx
<div style={{ height: '200px', border: '1px dashed #ccc' }}>
  <Flex fullWidth fullHeight className="bg-gray-100 p-2">
    <div className="p-4 bg-gray-200">Item 1</div>
    <div className="p-4 bg-gray-300">Item 2</div>
    <div className="p-4 bg-gray-400">Item 3</div>
  </Flex>
</div>
```

### Verwendung von FlexItem

```jsx
<Flex className="bg-gray-100 p-2">
  <FlexItem grow className="p-4 bg-gray-200">
    Wachsendes Item
  </FlexItem>
  <FlexItem shrink={0} basis="200px" className="p-4 bg-gray-300">
    Feste Breite
  </FlexItem>
  <FlexItem grow={2} className="p-4 bg-gray-400">
    Doppelt wachsendes Item
  </FlexItem>
</Flex>
```

### Ausrichtung einzelner Elemente

```jsx
<Flex align="center" className="bg-gray-100 p-2" style={{ height: '150px' }}>
  <FlexItem align="flex-start" className="p-4 bg-gray-200">
    Oben ausgerichtet
  </FlexItem>
  <FlexItem className="p-4 bg-gray-300">
    Mittig ausgerichtet (vom Container)
  </FlexItem>
  <FlexItem align="flex-end" className="p-4 bg-gray-400">
    Unten ausgerichtet
  </FlexItem>
</Flex>
```

### Reihenfolge der Elemente

```jsx
<Flex className="bg-gray-100 p-2">
  <FlexItem order={3} className="p-4 bg-gray-200">
    Drittes Element (order: 3)
  </FlexItem>
  <FlexItem order={1} className="p-4 bg-gray-300">
    Erstes Element (order: 1)
  </FlexItem>
  <FlexItem order={2} className="p-4 bg-gray-400">
    Zweites Element (order: 2)
  </FlexItem>
</Flex>
```

## Props

### Flex Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `direction` | `'row' \| 'row-reverse' \| 'column' \| 'column-reverse'` | `'row'` | Flex-Richtung |
| `wrap` | `'nowrap' \| 'wrap' \| 'wrap-reverse'` | `'nowrap'` | Flex-Umbruch |
| `justify` | `'flex-start' \| 'flex-end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'flex-start'` | Ausrichtung entlang der Hauptachse |
| `align` | `'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch'` | `'stretch'` | Ausrichtung entlang der Querachse |
| `alignContent` | `'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch'` | - | Ausrichtung von mehreren Zeilen/Spalten |
| `gap` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string \| number` | `'none'` | Abstand zwischen Elementen |
| `rowGap` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string \| number` | - | Horizontaler Abstand zwischen Elementen |
| `columnGap` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string \| number` | - | Vertikaler Abstand zwischen Elementen |
| `inline` | `boolean` | `false` | Flex-Container als Inline-Element |
| `fullWidth` | `boolean` | `false` | Volle Breite des Containers |
| `fullHeight` | `boolean` | `false` | Volle Höhe des Containers |
| `flex` | `boolean \| string` | - | Flex-Container füllt den verfügbaren Platz |
| `grow` | `boolean \| number` | - | Flex-Container wächst |
| `shrink` | `boolean \| number` | - | Flex-Container schrumpft |
| `basis` | `'auto' \| string \| number` | - | Basis-Größe des Flex-Containers |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### FlexItem Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `align` | `'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch'` | - | Ausrichtung des Elements |
| `grow` | `boolean \| number` | - | Element wächst |
| `shrink` | `boolean \| number` | - | Element schrumpft |
| `basis` | `'auto' \| string \| number` | - | Basis-Größe des Elements |
| `order` | `number` | - | Reihenfolge des Elements |
| `flex` | `boolean \| string` | - | Element füllt den verfügbaren Platz |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

## Beispiele

### Responsive Layout

```jsx
function ResponsiveLayout() {
  return (
    <Flex 
      direction={{ base: 'column', md: 'row' }} 
      gap="md" 
      className="bg-white p-4 rounded-lg shadow-md"
    >
      <FlexItem basis={{ base: 'auto', md: '250px' }} shrink={0} className="bg-gray-100 p-4 rounded">
        <h2 className="text-lg font-bold mb-4">Sidebar</h2>
        <nav>
          <ul className="space-y-2">
            <li><a href="#" className="text-blue-600 hover:underline">Home</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Produkte</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Über uns</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Kontakt</a></li>
          </ul>
        </nav>
      </FlexItem>
      
      <FlexItem grow className="bg-gray-50 p-4 rounded">
        <h1 className="text-2xl font-bold mb-4">Hauptinhalt</h1>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, 
          nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl 
          nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl 
          aliquet nunc, quis aliquam nisl nunc quis nisl.
        </p>
        <p>
          Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, 
          quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam 
          ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
        </p>
      </FlexItem>
    </Flex>
  );
}
```

### Kartenraster

```jsx
function CardGrid() {
  const cards = [
    { id: 1, title: 'Karte 1', content: 'Inhalt der Karte 1' },
    { id: 2, title: 'Karte 2', content: 'Inhalt der Karte 2' },
    { id: 3, title: 'Karte 3', content: 'Inhalt der Karte 3' },
    { id: 4, title: 'Karte 4', content: 'Inhalt der Karte 4' },
    { id: 5, title: 'Karte 5', content: 'Inhalt der Karte 5' },
    { id: 6, title: 'Karte 6', content: 'Inhalt der Karte 6' }
  ];
  
  return (
    <Flex wrap="wrap" gap="md">
      {cards.map(card => (
        <FlexItem 
          key={card.id} 
          basis="calc(33.333% - 1rem)" 
          shrink={1} 
          grow={0}
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <h3 className="text-lg font-bold mb-2">{card.title}</h3>
          <p>{card.content}</p>
        </FlexItem>
      ))}
    </Flex>
  );
}
```

### Formular-Layout

```jsx
function FormLayout() {
  return (
    <form className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Kontaktformular</h2>
      
      <Flex direction="column" gap="md">
        <Flex gap="md" wrap="wrap">
          <FlexItem basis="calc(50% - 0.5rem)" grow={1}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vorname
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </FlexItem>
          
          <FlexItem basis="calc(50% - 0.5rem)" grow={1}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nachname
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </FlexItem>
        </Flex>
        
        <FlexItem>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-Mail
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </FlexItem>
        
        <FlexItem>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nachricht
          </label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </FlexItem>
        
        <Flex justify="flex-end">
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Absenden
          </button>
        </Flex>
      </Flex>
    </form>
  );
}
```

### Header-Layout

```jsx
function HeaderLayout() {
  return (
    <header className="bg-white shadow-md">
      <Flex 
        justify="space-between" 
        align="center" 
        className="container mx-auto px-4 py-3"
      >
        <div className="text-xl font-bold">Logo</div>
        
        <Flex as="nav" gap="md">
          <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Produkte</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Über uns</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Kontakt</a>
        </Flex>
        
        <Flex gap="sm">
          <button className="px-3 py-1 border border-gray-300 rounded-md">
            Login
          </button>
          <button className="px-3 py-1 bg-primary-600 text-white rounded-md">
            Registrieren
          </button>
        </Flex>
      </Flex>
    </header>
  );
}
```

### Zentrierter Inhalt

```jsx
function CenteredContent() {
  return (
    <Flex 
      justify="center" 
      align="center" 
      className="bg-gray-100" 
      style={{ height: '100vh' }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">Willkommen!</h1>
        <p className="mb-6">
          Vielen Dank für Ihren Besuch. Wir freuen uns, Sie auf unserer Website begrüßen zu dürfen.
        </p>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
          Mehr erfahren
        </button>
      </div>
    </Flex>
  );
}
```