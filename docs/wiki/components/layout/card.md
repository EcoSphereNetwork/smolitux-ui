# Card

Die Card-Komponente wird verwendet, um Inhalte in einem abgegrenzten Container zu präsentieren. Sie eignet sich ideal für Dashboards, Listen und Übersichten.

## Import

```jsx
import { Card } from '@smolitux/core';
```

## Verwendung

### Einfache Card

```jsx
<Card>
  <p>Dies ist eine einfache Card mit Inhalt.</p>
</Card>
```

### Card mit Titel

```jsx
<Card title="Meine Card">
  <p>Dies ist eine Card mit einem Titel.</p>
</Card>
```

### Card mit Footer

```jsx
<Card
  title="Meine Card"
  footer={
    <div className="flex justify-end">
      <button className="px-4 py-2 bg-primary-500 text-white rounded">Speichern</button>
    </div>
  }
>
  <p>Dies ist eine Card mit einem Footer.</p>
</Card>
```

### Card mit Header-Aktion

```jsx
<Card
  title="Meine Card"
  headerAction={
    <button className="text-gray-500 hover:text-gray-700">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
        />
      </svg>
    </button>
  }
>
  <p>Dies ist eine Card mit einer Header-Aktion.</p>
</Card>
```

### Card ohne Padding

```jsx
<Card title="Ohne Padding" noPadding>
  <img src="https://via.placeholder.com/400x200" alt="Platzhalterbild" className="w-full" />
  <div className="p-4">
    <p>Der Inhalt hat kein Padding, aber wir können es manuell hinzufügen.</p>
  </div>
</Card>
```

### Hover-Effekt

```jsx
<Card hoverable>
  <p>Bewegen Sie den Mauszeiger über diese Card, um den Hover-Effekt zu sehen.</p>
</Card>
```

### Card ohne Rand

```jsx
<Card bordered={false}>
  <p>Diese Card hat keinen Rand, nur einen Schatten.</p>
</Card>
```

## Props

| Prop           | Typ                                                                        | Standard | Beschreibung                             |
| -------------- | -------------------------------------------------------------------------- | -------- | ---------------------------------------- |
| `children`     | `ReactNode`                                                                | -        | Der Inhalt der Card                      |
| `title`        | `string`                                                                   | -        | Der Titel der Card                       |
| `className`    | `string`                                                                   | `''`     | Zusätzliche CSS-Klassen                  |
| `footer`       | `ReactNode`                                                                | -        | Der Inhalt des Footers                   |
| `noPadding`    | `boolean`                                                                  | `false`  | Entfernt das Padding im Inhaltsbereich   |
| `hoverable`    | `boolean`                                                                  | `false`  | Aktiviert einen Hover-Effekt             |
| `bordered`     | `boolean`                                                                  | `true`   | Zeigt einen Rand um die Card an          |
| `headerAction` | `ReactNode`                                                                | -        | Aktion im Header (z.B. Button oder Icon) |
| `type`         | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info'` | -        | Farbvariante der Card                    |

## Beispiele

### Produkt-Card

```jsx
<Card noPadding hoverable className="max-w-xs">
  <img src="/product-image.jpg" alt="Produkt" className="w-full h-48 object-cover" />
  <div className="p-4">
    <h3 className="text-lg font-semibold">Produktname</h3>
    <p className="text-gray-600 mt-1">Kurze Produktbeschreibung hier.</p>
    <div className="mt-4 flex items-center justify-between">
      <span className="text-xl font-bold">€49,99</span>
      <button className="px-3 py-1 bg-primary-500 text-white rounded">In den Warenkorb</button>
    </div>
  </div>
</Card>
```

### Profil-Card

```jsx
<Card className="max-w-md">
  <div className="flex items-center">
    <img src="/avatar.jpg" alt="Profilbild" className="w-16 h-16 rounded-full object-cover" />
    <div className="ml-4">
      <h3 className="text-lg font-semibold">Max Mustermann</h3>
      <p className="text-gray-600">Software-Entwickler</p>
    </div>
  </div>

  <div className="mt-4">
    <h4 className="font-medium text-gray-700">Über mich</h4>
    <p className="mt-2 text-gray-600">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies
      tincidunt, nisl nisl aliquam nisl.
    </p>
  </div>

  <div className="mt-4 flex space-x-2">
    <button className="px-3 py-1 bg-primary-500 text-white rounded">Folgen</button>
    <button className="px-3 py-1 border border-gray-300 rounded">Nachricht</button>
  </div>
</Card>
```

### Dashboard-Card

```jsx
<Card
  title="Verkaufsübersicht"
  headerAction={
    <div className="flex space-x-2">
      <select className="text-sm border rounded px-2 py-1">
        <option>Diese Woche</option>
        <option>Dieser Monat</option>
        <option>Dieses Jahr</option>
      </select>
      <button className="text-gray-500 hover:text-gray-700">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>
    </div>
  }
  footer={<div className="text-sm text-gray-500">Letzte Aktualisierung: vor 5 Minuten</div>}
>
  <div className="flex justify-between items-center">
    <div>
      <p className="text-gray-500">Gesamtumsatz</p>
      <p className="text-2xl font-bold">€24.532</p>
      <p className="text-green-500 text-sm">+12% gegenüber Vorwoche</p>
    </div>

    <div className="h-16 w-32 bg-gray-100 rounded">
      {/* Hier könnte ein Chart sein */}
      <div className="h-full w-full flex items-center justify-center text-gray-400">Chart</div>
    </div>
  </div>
</Card>
```

### Interaktive Card mit Zustand

```jsx
function ExpandableCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      title="Erweiterbarer Inhalt"
      headerAction={
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </button>
      }
    >
      <p>Dies ist der immer sichtbare Inhalt.</p>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t">
          <p>
            Dies ist der erweiterte Inhalt, der nur angezeigt wird, wenn die Card erweitert ist.
          </p>
          <p className="mt-2">Hier können weitere Details oder Informationen angezeigt werden.</p>
        </div>
      )}
    </Card>
  );
}
```

### Card-Grid

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card title="Card 1">
    <p>Inhalt für Card 1</p>
  </Card>

  <Card title="Card 2">
    <p>Inhalt für Card 2</p>
  </Card>

  <Card title="Card 3">
    <p>Inhalt für Card 3</p>
  </Card>

  <Card title="Card 4">
    <p>Inhalt für Card 4</p>
  </Card>

  <Card title="Card 5">
    <p>Inhalt für Card 5</p>
  </Card>

  <Card title="Card 6">
    <p>Inhalt für Card 6</p>
  </Card>
</div>
```
