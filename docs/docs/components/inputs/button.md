# Button

Die Button-Komponente wird verwendet, um Aktionen auszulösen. Sie unterstützt verschiedene Varianten, Größen und Zustände.

## Import

```jsx
import { Button } from '@smolitux/core';
```

## Verwendung

### Einfacher Button

```jsx
<Button>Klick mich</Button>
```

### Verschiedene Varianten

```jsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>
<Button variant="warning">Warning</Button>
<Button variant="info">Info</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="unstyled">Unstyled</Button>
```

### Verschiedene Größen

```jsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

### Verschiedene Formen

```jsx
<Button shape="square">Square</Button>
<Button shape="rounded">Rounded</Button>
<Button shape="pill">Pill</Button>
```

### Button mit Icons

```jsx
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/solid';

<Button leftIcon={<ArrowLeftIcon className="w-4 h-4" />}>
  Zurück
</Button>

<Button rightIcon={<ArrowRightIcon className="w-4 h-4" />}>
  Weiter
</Button>

<Button 
  leftIcon={<ArrowLeftIcon className="w-4 h-4" />}
  rightIcon={<ArrowRightIcon className="w-4 h-4" />}
>
  Beide Seiten
</Button>
```

### Ladezustand

```jsx
<Button loading>Laden</Button>
<Button loading variant="primary">Laden</Button>
```

### Deaktivierter Button

```jsx
<Button disabled>Deaktiviert</Button>
```

### Button mit voller Breite

```jsx
<Button fullWidth>Volle Breite</Button>
```

### Button mit Schatten

```jsx
<Button shadow>Mit Schatten</Button>
```

### Aktiver Button

```jsx
<Button active>Aktiv</Button>
```

### Button mit Rahmen

```jsx
<Button bordered>Mit Rahmen</Button>
```

### Transparenter Button

```jsx
<Button transparent>Transparent</Button>
```

### Button als Link

```jsx
<Button as="a" href="https://example.com" target="_blank">
  Link Button
</Button>
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'outline' \| 'ghost' \| 'link' \| 'unstyled'` | `'primary'` | Visuelle Variante des Buttons |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Größe des Buttons |
| `shape` | `'square' \| 'rounded' \| 'pill'` | `'rounded'` | Form des Buttons |
| `fullWidth` | `boolean` | `false` | Button auf volle Breite |
| `leftIcon` | `ReactNode` | - | Icon vor dem Text |
| `rightIcon` | `ReactNode` | - | Icon nach dem Text |
| `loading` | `boolean` | `false` | Loading-Zustand |
| `className` | `string` | - | Zusätzliche CSS-Klassen |
| `shadow` | `boolean` | `false` | Ob der Button einen Schatten haben soll |
| `hoverable` | `boolean` | `true` | Ob der Button einen Hover-Effekt haben soll |
| `focusable` | `boolean` | `true` | Ob der Button einen Fokus-Effekt haben soll |
| `transition` | `boolean` | `true` | Ob der Button einen Übergangseffekt haben soll |
| `active` | `boolean` | `false` | Ob der Button aktiv ist |
| `bordered` | `boolean` | `false` | Ob der Button einen Rahmen haben soll |
| `transparent` | `boolean` | `false` | Ob der Button einen transparenten Hintergrund haben soll |
| `tooltip` | `string` | - | Tooltip-Text für den Button |
| `as` | `ElementType` | `'button'` | Rendert den Button als anderes Element |
| `disabled` | `boolean` | `false` | Deaktiviert den Button |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Typ des Buttons |
| `onClick` | `(event: React.MouseEvent<HTMLButtonElement>) => void` | - | Callback-Funktion, die aufgerufen wird, wenn der Button geklickt wird |

## Barrierefreiheit

Die Button-Komponente ist für Barrierefreiheit optimiert:

- Verwendet native `<button>`-Elemente für korrekte Semantik
- Unterstützt Tastaturnavigation und Fokus-Styles
- Korrekte ARIA-Attribute für Ladezustände und deaktivierte Zustände
- Ausreichender Kontrast zwischen Text und Hintergrund

## Beispiele

### Button-Gruppe

```jsx
function ButtonGroup({ options, value, onChange }) {
  return (
    <div className="flex">
      {options.map((option) => (
        <Button
          key={option.value}
          variant={value === option.value ? 'primary' : 'outline'}
          onClick={() => onChange(option.value)}
          className={`
            ${value === option.value ? 'z-10' : ''}
            ${option.value === options[0].value ? 'rounded-r-none' : ''}
            ${option.value === options[options.length - 1].value ? 'rounded-l-none' : ''}
            ${option.value !== options[0].value && option.value !== options[options.length - 1].value ? 'rounded-none' : ''}
            ${option.value !== options[0].value ? '-ml-px' : ''}
          `}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

// Verwendung
function Example() {
  const [view, setView] = useState('day');
  
  const options = [
    { value: 'day', label: 'Tag' },
    { value: 'week', label: 'Woche' },
    { value: 'month', label: 'Monat' },
  ];
  
  return (
    <ButtonGroup 
      options={options} 
      value={view} 
      onChange={setView} 
    />
  );
}
```

### Button mit Bestätigungsdialog

```jsx
function ConfirmButton({ children, onConfirm, confirmText = 'Sind Sie sicher?' }) {
  const [showConfirm, setShowConfirm] = useState(false);
  
  const handleClick = () => {
    if (showConfirm) {
      onConfirm();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  };
  
  const handleCancel = (e) => {
    e.stopPropagation();
    setShowConfirm(false);
  };
  
  return (
    <div className="relative inline-block">
      <Button 
        variant={showConfirm ? 'danger' : 'primary'} 
        onClick={handleClick}
      >
        {showConfirm ? confirmText : children}
      </Button>
      
      {showConfirm && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCancel}
          className="absolute -top-2 -right-2 rounded-full w-6 h-6 p-0 flex items-center justify-center"
        >
          ✕
        </Button>
      )}
    </div>
  );
}

// Verwendung
<ConfirmButton onConfirm={() => console.log('Bestätigt!')}>
  Löschen
</ConfirmButton>
```

### Button mit Dropdown

```jsx
function DropdownButton({ label, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        rightIcon={
          <svg 
            className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        }
      >
        {label}
      </Button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((option, index) => (
              <button
                key={index}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={() => {
                  option.onClick();
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Verwendung
<DropdownButton 
  label="Optionen" 
  options={[
    { label: 'Bearbeiten', onClick: () => console.log('Bearbeiten') },
    { label: 'Duplizieren', onClick: () => console.log('Duplizieren') },
    { label: 'Löschen', onClick: () => console.log('Löschen') },
  ]}
/>
```

### Button mit Ladeindikator und Timeout

```jsx
function LoadingButton({ children, onClick, timeout = 2000 }) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = async () => {
    setIsLoading(true);
    
    try {
      await onClick();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Mindestens 'timeout' ms anzeigen, damit der Benutzer den Ladeindikator sieht
      setTimeout(() => {
        setIsLoading(false);
      }, timeout);
    }
  };
  
  return (
    <Button 
      onClick={handleClick} 
      loading={isLoading} 
      disabled={isLoading}
    >
      {children}
    </Button>
  );
}

// Verwendung
<LoadingButton 
  onClick={async () => {
    // Simuliere API-Aufruf
    return new Promise(resolve => setTimeout(resolve, 1000));
  }}
>
  Speichern
</LoadingButton>
```