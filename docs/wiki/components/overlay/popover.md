# Popover

Die Popover-Komponente zeigt zusätzliche Informationen oder Aktionen an, wenn ein Benutzer mit einem Element interagiert. Im Gegensatz zu Tooltips können Popovers komplexere Inhalte enthalten.

## Import

```jsx
import { Popover } from '@smolitux/core';
```

## Verwendung

### Einfacher Popover

```jsx
<Popover content="Dies ist ein einfacher Popover mit Text.">
  <Button>Klick mich</Button>
</Popover>
```

### Popover mit verschiedenen Triggern

```jsx
<Popover 
  content="Erscheint beim Hover" 
  trigger="hover"
>
  <Button>Hover über mich</Button>
</Popover>

<Popover 
  content="Erscheint beim Fokus" 
  trigger="focus"
>
  <Button>Fokussiere mich</Button>
</Popover>

<Popover 
  content="Erscheint beim Klick" 
  trigger="click"
>
  <Button>Klick mich</Button>
</Popover>
```

### Popover mit verschiedenen Positionen

```jsx
<div className="flex space-x-2">
  <Popover content="Oben" placement="top">
    <Button>Oben</Button>
  </Popover>
  
  <Popover content="Rechts" placement="right">
    <Button>Rechts</Button>
  </Popover>
  
  <Popover content="Unten" placement="bottom">
    <Button>Unten</Button>
  </Popover>
  
  <Popover content="Links" placement="left">
    <Button>Links</Button>
  </Popover>
</div>
```

### Popover mit Titel

```jsx
<Popover 
  title="Wichtige Information"
  content="Dies ist ein Popover mit einem Titel und Inhalt."
>
  <Button>Mehr Info</Button>
</Popover>
```

### Popover mit komplexem Inhalt

```jsx
<Popover
  content={
    <div className="p-2">
      <h3 className="font-bold mb-2">Benutzerprofil</h3>
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
        <div>
          <p className="font-medium">Max Mustermann</p>
          <p className="text-sm text-gray-500">max@example.com</p>
        </div>
      </div>
      <div className="border-t pt-2 mt-2">
        <button className="text-blue-500 hover:underline text-sm">Profil anzeigen</button>
      </div>
    </div>
  }
  placement="bottom-start"
  maxWidth={300}
>
  <button className="flex items-center">
    <span className="w-8 h-8 rounded-full bg-gray-300 mr-2"></span>
    <span>Profil</span>
  </button>
</Popover>
```

### Kontrollierter Popover

```jsx
function ControlledPopoverExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <Popover 
        content="Dieser Popover wird programmatisch gesteuert."
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        trigger="manual"
      >
        <Button>Referenzelement</Button>
      </Popover>
      
      <div className="mt-4">
        <Button onClick={() => setIsOpen(!isOpen)}>
          Popover {isOpen ? 'schließen' : 'öffnen'}
        </Button>
      </div>
    </div>
  );
}
```

### Popover ohne Pfeil

```jsx
<Popover 
  content="Dieser Popover hat keinen Pfeil."
  showArrow={false}
>
  <Button>Ohne Pfeil</Button>
</Popover>
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `content` | `ReactNode` | - | Inhalt des Popovers |
| `children` | `ReactElement` | - | Trigger-Element |
| `placement` | `PopoverPlacement` | `'bottom'` | Position des Popovers |
| `isOpen` | `boolean` | - | Ist der Popover offen? (kontrollierter Modus) |
| `defaultOpen` | `boolean` | `false` | Standard-Offenstatus (unkontrollierter Modus) |
| `onOpenChange` | `(isOpen: boolean) => void` | - | Callback beim Öffnen/Schließen |
| `trigger` | `'click' \| 'hover' \| 'focus' \| 'manual'` | `'click'` | Trigger-Ereignis |
| `openDelay` | `number` | `0` | Verzögerung vor dem Anzeigen (in ms) |
| `closeDelay` | `number` | `0` | Verzögerung vor dem Verstecken (in ms) |
| `closeOnClickOutside` | `boolean` | `true` | Automatisch schließen, wenn außerhalb geklickt wird |
| `closeOnEsc` | `boolean` | `true` | Automatisch schließen, wenn ESC gedrückt wird |
| `showArrow` | `boolean` | `true` | Pfeil anzeigen |
| `showCloseButton` | `boolean` | `false` | Schließen-Button im Popover anzeigen |
| `closeButtonLabel` | `string` | `'Close'` | Beschriftung des Schließen-Buttons |
| `offset` | `number` | `8` | Offset vom Trigger-Element (in px) |
| `maxWidth` | `number \| string` | `'none'` | Maximale Breite des Popovers |
| `title` | `ReactNode` | - | Titel des Popovers |
| `className` | `string` | - | Zusätzliche CSS-Klassen |
| `zIndex` | `number` | `1000` | z-Index für den Popover |

### PopoverPlacement Typen

`'top' | 'right' | 'bottom' | 'left' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end'`

## Barrierefreiheit

Die Popover-Komponente ist für Barrierefreiheit optimiert:

- Verwendet die korrekten ARIA-Attribute (`aria-expanded`, `aria-haspopup`, `role="dialog"`)
- Unterstützt Tastaturnavigation (ESC zum Schließen)
- Fokus-Management für Tastaturbenutzer
- Screenreader-Unterstützung durch semantische Struktur

## Beispiele

### Menü-Popover

```jsx
function MenuPopoverExample() {
  const menuItems = [
    { label: 'Profil anzeigen', icon: '👤' },
    { label: 'Einstellungen', icon: '⚙️' },
    { label: 'Nachrichten', icon: '✉️', badge: 3 },
    { label: 'Abmelden', icon: '🚪' }
  ];
  
  return (
    <Popover
      content={
        <div className="py-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => console.log(`Klick auf ${item.label}`)}
            >
              <span className="mr-2">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-primary-500 text-white text-xs rounded-full px-2 py-0.5">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      }
      placement="bottom-end"
      maxWidth={250}
    >
      <Button>
        Menü
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>
    </Popover>
  );
}
```

### Formular-Popover

```jsx
function FormPopoverExample() {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Anmeldung für Newsletter:', email);
    setEmail('');
  };
  
  return (
    <Popover
      title="Newsletter abonnieren"
      content={
        <form onSubmit={handleSubmit} className="p-2">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-Mail-Adresse
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="ihre@email.de"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600"
          >
            Abonnieren
          </button>
        </form>
      }
      maxWidth={300}
      placement="bottom"
    >
      <Button>Newsletter</Button>
    </Popover>
  );
}
```

### Farbauswahl-Popover

```jsx
function ColorPickerPopoverExample() {
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  
  const colors = [
    '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899',
    '#f43f5e', '#d97706', '#059669', '#2563eb', '#7c3aed', '#be185d'
  ];
  
  return (
    <Popover
      content={
        <div className="p-2">
          <div className="grid grid-cols-6 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                aria-label={`Farbe ${color}`}
              />
            ))}
          </div>
        </div>
      }
      placement="bottom"
    >
      <button
        className="w-10 h-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{ backgroundColor: selectedColor }}
      />
    </Popover>
  );
}
```

### Hilfe-Popover

```jsx
function HelpPopoverExample() {
  return (
    <div className="flex items-center">
      <label className="block text-sm font-medium text-gray-700 mr-2">
        API-Schlüssel
      </label>
      <Popover
        content={
          <div className="p-2 max-w-xs">
            <p className="text-sm">
              Der API-Schlüssel wird für die Authentifizierung bei der API verwendet. 
              Sie finden Ihren Schlüssel im Dashboard unter "Einstellungen".
            </p>
            <a 
              href="#" 
              className="text-sm text-primary-600 hover:text-primary-800 mt-2 inline-block"
            >
              Mehr erfahren
            </a>
          </div>
        }
        trigger="hover"
        placement="top"
      >
        <button className="text-gray-400 hover:text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </Popover>
      <input
        type="text"
        className="ml-2 px-3 py-2 border border-gray-300 rounded-md"
        placeholder="Ihr API-Schlüssel"
      />
    </div>
  );
}
```