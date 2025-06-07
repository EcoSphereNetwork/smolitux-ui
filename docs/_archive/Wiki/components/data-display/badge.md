# Badge

Die Badge-Komponente wird verwendet, um Status, Kennzeichnungen oder Zähler anzuzeigen. Sie ist ideal für Benachrichtigungen, Tags oder Labels.

## Import

```jsx
import { Badge } from '@smolitux/core';
```

## Verwendung

### Einfache Badge

```jsx
<Badge>Default</Badge>
```

### Verschiedene Varianten

```jsx
<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
```

### Verschiedene Größen

```jsx
<Badge size="xs">Extra Small</Badge>
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

### Abgerundete Badge

```jsx
<Badge rounded>Rounded</Badge>
```

### Badge mit Icon

```jsx
import { CheckIcon } from '@heroicons/react/solid';

<Badge icon={<CheckIcon className="w-3 h-3 mr-1" />}>Mit Icon</Badge>
```

### Badge als Zähler

```jsx
<Badge isCounter>5</Badge>
<Badge isCounter maxCount={99}>100</Badge> {/* Zeigt "99+" an */}
```

### Badge als Punkt

```jsx
<Badge isDot variant="error" />
```

### Outline Badge

```jsx
<Badge outline variant="primary">Outline</Badge>
```

### Badge in Kombination mit anderen Elementen

```jsx
<div className="flex items-center">
  <span className="mr-2">Nachrichten</span>
  <Badge variant="primary" isCounter>3</Badge>
</div>

<button className="relative px-4 py-2 bg-gray-100 rounded">
  Benachrichtigungen
  <Badge 
    isDot 
    variant="error" 
    className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2" 
  />
</button>
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `children` | `ReactNode` | - | Der Inhalt der Badge |
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Die visuelle Variante der Badge |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Die Größe der Badge |
| `rounded` | `boolean` | `false` | Ob die Badge abgerundet sein soll |
| `className` | `string` | - | Zusätzliche CSS-Klassen |
| `icon` | `ReactNode` | - | Ein optionales Icon für die Badge |
| `isCounter` | `boolean` | `false` | Ob die Badge als Zähler angezeigt werden soll |
| `maxCount` | `number` | - | Maximaler Wert für Zähler (z.B. 99+) |
| `isDot` | `boolean` | `false` | Ob die Badge als Punkt ohne Text angezeigt werden soll |
| `outline` | `boolean` | `false` | Ob die Badge als Outline angezeigt werden soll |
| `htmlProps` | `HTMLAttributes<HTMLSpanElement>` | - | Zusätzliche HTML-Attribute |
| `id` | `string` | - | ID für Barrierefreiheit |

## Barrierefreiheit

Die Badge-Komponente ist für Barrierefreiheit optimiert:

- Ausreichender Kontrast zwischen Text und Hintergrund
- Unterstützung für Screenreader durch semantische Struktur
- Möglichkeit, eine ID für ARIA-Attribute zu setzen

## Beispiele

### Badge für Statusanzeige

```jsx
function StatusBadge({ status }) {
  const statusConfig = {
    active: { variant: 'success', label: 'Aktiv' },
    pending: { variant: 'warning', label: 'Ausstehend' },
    inactive: { variant: 'error', label: 'Inaktiv' },
    draft: { variant: 'default', label: 'Entwurf' },
  };
  
  const config = statusConfig[status] || statusConfig.draft;
  
  return (
    <Badge variant={config.variant} rounded>
      {config.label}
    </Badge>
  );
}

// Verwendung
<StatusBadge status="active" />
<StatusBadge status="pending" />
<StatusBadge status="inactive" />
<StatusBadge status="draft" />
```

### Badge für Prioritäten

```jsx
function PriorityBadge({ priority }) {
  const priorityConfig = {
    high: { variant: 'error', label: 'Hoch' },
    medium: { variant: 'warning', label: 'Mittel' },
    low: { variant: 'info', label: 'Niedrig' },
  };
  
  const config = priorityConfig[priority] || priorityConfig.low;
  
  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}

// Verwendung
<PriorityBadge priority="high" />
<PriorityBadge priority="medium" />
<PriorityBadge priority="low" />
```

### Badge für Benachrichtigungen

```jsx
function NotificationIcon({ count = 0 }) {
  return (
    <div className="relative inline-block">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 text-gray-600" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
        />
      </svg>
      
      {count > 0 && (
        <Badge 
          isCounter 
          maxCount={99} 
          variant="error" 
          size="xs" 
          className="absolute -top-1 -right-1"
        >
          {count}
        </Badge>
      )}
    </div>
  );
}

// Verwendung
<NotificationIcon count={5} />
<NotificationIcon count={0} />
<NotificationIcon count={100} />
```

### Badge für Tags

```jsx
function TagList({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Badge 
          key={index} 
          variant="primary" 
          outline 
          rounded 
          className="px-3 py-1"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}

// Verwendung
<TagList tags={['React', 'JavaScript', 'UI', 'Component']} />
```

### Badge mit benutzerdefinierten Styles

```jsx
<Badge 
  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
  rounded
>
  Premium
</Badge>
```

### Interaktive Badge

```jsx
function RemovableTag({ label, onRemove }) {
  return (
    <Badge 
      variant="primary" 
      outline 
      rounded 
      className="px-3 py-1 flex items-center"
    >
      <span>{label}</span>
      <button 
        onClick={onRemove} 
        className="ml-2 text-primary-600 hover:text-primary-800 focus:outline-none"
        aria-label={`Remove ${label} tag`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-3 w-3" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </svg>
      </button>
    </Badge>
  );
}

// Verwendung
<RemovableTag 
  label="React" 
  onRemove={() => console.log('Tag removed')} 
/>
```