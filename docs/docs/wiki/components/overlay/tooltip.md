# Tooltip

Die Tooltip-Komponente zeigt zusätzliche Informationen an, wenn Benutzer mit einem Element interagieren. Sie ist ideal für kurze Hilfetexte, Erklärungen oder Hinweise.

## Import

```jsx
import { Tooltip } from '@smolitux/core';
```

## Verwendung

### Einfacher Tooltip

```jsx
<Tooltip content="Dies ist ein Tooltip">
  <Button>Hover über mich</Button>
</Tooltip>
```

### Verschiedene Positionen

```jsx
<Tooltip content="Tooltip oben" position="top">
  <Button>Oben</Button>
</Tooltip>

<Tooltip content="Tooltip rechts" position="right">
  <Button>Rechts</Button>
</Tooltip>

<Tooltip content="Tooltip unten" position="bottom">
  <Button>Unten</Button>
</Tooltip>

<Tooltip content="Tooltip links" position="left">
  <Button>Links</Button>
</Tooltip>
```

### Tooltip mit Verzögerung

```jsx
<Tooltip content="Erscheint nach 500ms" delay={500}>
  <Button>Verzögerter Tooltip</Button>
</Tooltip>
```

### Tooltip ohne Pfeil

```jsx
<Tooltip content="Tooltip ohne Pfeil" arrow={false}>
  <Button>Ohne Pfeil</Button>
</Tooltip>
```

### Tooltip mit benutzerdefinierter Breite

```jsx
<Tooltip content="Dieser Tooltip hat eine maximale Breite von 150px" maxWidth={150}>
  <Button>Schmaler Tooltip</Button>
</Tooltip>
```

### Tooltip mit HTML-Inhalt

```jsx
<Tooltip
  content={
    <div>
      <strong>Formatierter Tooltip</strong>
      <p>Mit mehreren Zeilen Text</p>
      <ul>
        <li>Punkt 1</li>
        <li>Punkt 2</li>
      </ul>
    </div>
  }
>
  <Button>Komplexer Tooltip</Button>
</Tooltip>
```

### Deaktivierter Tooltip

```jsx
<Tooltip content="Dieser Tooltip wird nicht angezeigt" disabled>
  <Button>Deaktivierter Tooltip</Button>
</Tooltip>
```

### Tooltip für Icon

```jsx
import { InfoIcon } from '@heroicons/react/outline';

<div className="flex items-center">
  <span className="mr-2">Hilfe</span>
  <Tooltip content="Hier finden Sie Hilfe zu diesem Thema">
    <InfoIcon className="w-5 h-5 text-gray-500 cursor-help" />
  </Tooltip>
</div>
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `content` | `ReactNode` | - | Der Inhalt des Tooltips |
| `children` | `ReactElement` | - | Das Element, das mit dem Tooltip versehen werden soll |
| `position` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Die Position des Tooltips relativ zum Element |
| `delay` | `number` | `200` | Verzögerung vor dem Anzeigen in Millisekunden |
| `hideDelay` | `number` | `100` | Verzögerung vor dem Ausblenden in Millisekunden |
| `maxWidth` | `number \| string` | `250` | Maximale Breite des Tooltips |
| `className` | `string` | `''` | Zusätzliche CSS-Klassen für den Tooltip |
| `disabled` | `boolean` | `false` | Deaktiviert den Tooltip |
| `arrow` | `boolean` | `true` | Zeigt einen Pfeil an, der auf das Element zeigt |

## Barrierefreiheit

Die Tooltip-Komponente ist für Barrierefreiheit optimiert:

- Verwendet `aria-describedby` zur Verknüpfung des Tooltips mit dem Element
- Unterstützt Tastaturnavigation (Tooltip wird bei Fokus angezeigt)
- Tooltips sind für Screenreader zugänglich
- Ausreichender Kontrast zwischen Text und Hintergrund

## Beispiele

### Tooltip für Formularfelder

```jsx
<div className="space-y-4">
  <div>
    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
      Benutzername
    </label>
    <div className="mt-1 relative">
      <input
        type="text"
        id="username"
        className="block w-full border-gray-300 rounded-md shadow-sm"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <Tooltip content="Der Benutzername muss mindestens 3 Zeichen lang sein">
          <InfoIcon className="w-5 h-5 text-gray-400" />
        </Tooltip>
      </div>
    </div>
  </div>
  
  <div>
    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
      Passwort
    </label>
    <div className="mt-1 relative">
      <input
        type="password"
        id="password"
        className="block w-full border-gray-300 rounded-md shadow-sm"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <Tooltip
          content={
            <div>
              <p className="font-medium">Passwort-Anforderungen:</p>
              <ul className="list-disc pl-4 mt-1">
                <li>Mindestens 8 Zeichen</li>
                <li>Mindestens ein Großbuchstabe</li>
                <li>Mindestens eine Zahl</li>
                <li>Mindestens ein Sonderzeichen</li>
              </ul>
            </div>
          }
          position="right"
          maxWidth={300}
        >
          <InfoIcon className="w-5 h-5 text-gray-400" />
        </Tooltip>
      </div>
    </div>
  </div>
</div>
```

### Tooltip für abgeschnittenen Text

```jsx
function TruncatedTextWithTooltip({ text, maxLength = 50 }) {
  const isTruncated = text.length > maxLength;
  const displayText = isTruncated ? `${text.slice(0, maxLength)}...` : text;
  
  return isTruncated ? (
    <Tooltip content={text}>
      <span>{displayText}</span>
    </Tooltip>
  ) : (
    <span>{displayText}</span>
  );
}

// Verwendung
<TruncatedTextWithTooltip 
  text="Dies ist ein sehr langer Text, der abgeschnitten wird, wenn er zu lang ist. Beim Hover wird der vollständige Text in einem Tooltip angezeigt."
  maxLength={60}
/>
```

### Tooltip für Tabellenzellen

```jsx
function DataTable() {
  const data = [
    { id: 1, name: 'Produkt A', sales: 1234, growth: '+12.5%' },
    { id: 2, name: 'Produkt B', sales: 5678, growth: '-3.2%' },
    { id: 3, name: 'Produkt C', sales: 9012, growth: '+7.8%' },
  ];
  
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="flex items-center">
              <span>Verkäufe</span>
              <Tooltip content="Gesamtverkäufe im letzten Quartal">
                <InfoIcon className="ml-1 w-4 h-4 text-gray-400" />
              </Tooltip>
            </div>
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="flex items-center">
              <span>Wachstum</span>
              <Tooltip content="Prozentuales Wachstum im Vergleich zum Vorquartal">
                <InfoIcon className="ml-1 w-4 h-4 text-gray-400" />
              </Tooltip>
            </div>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item) => (
          <tr key={item.id}>
            <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.sales}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <Tooltip content={`Wachstum im Vergleich zum Vorquartal: ${item.growth}`}>
                <span className={item.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {item.growth}
                </span>
              </Tooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Tooltip mit benutzerdefinierten Styles

```jsx
<Tooltip
  content="Benutzerdefinierter Tooltip"
  className="bg-purple-700 text-white border border-purple-800"
>
  <Button>Benutzerdefinierter Style</Button>
</Tooltip>
```