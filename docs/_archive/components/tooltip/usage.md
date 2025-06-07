# Tooltip

Die `Tooltip`-Komponente zeigt zusätzliche Informationen an, wenn der Benutzer mit einem Element interagiert (Hover, Fokus oder Klick).

## Verwendung

```tsx
import { Tooltip, Button } from '@smolitux/core';

function Example() {
  return (
    <Tooltip content="Dies ist ein Tooltip">
      <Button>Hover über mich</Button>
    </Tooltip>
  );
}
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `children` | `React.ReactNode` | - | Das Element, das den Tooltip auslöst |
| `content` | `React.ReactNode` | - | Der Inhalt des Tooltips |
| `placement` | `'top' \| 'right' \| 'bottom' \| 'left' \| 'top-start' \| 'top-end' \| 'right-start' \| 'right-end' \| 'bottom-start' \| 'bottom-end' \| 'left-start' \| 'left-end'` | `'top'` | Die Platzierung des Tooltips |
| `trigger` | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` | Das Auslöseereignis für den Tooltip |
| `isOpen` | `boolean` | - | Kontrolliert, ob der Tooltip angezeigt wird (nur im `'manual'`-Modus) |
| `defaultIsOpen` | `boolean` | `false` | Ob der Tooltip standardmäßig geöffnet ist |
| `onOpen` | `() => void` | - | Callback, wenn der Tooltip geöffnet wird |
| `onClose` | `() => void` | - | Callback, wenn der Tooltip geschlossen wird |
| `delay` | `number \| { open: number, close: number }` | `0` | Verzögerung beim Öffnen/Schließen in Millisekunden |
| `offset` | `[number, number]` | `[0, 8]` | Offset des Tooltips [skidding, distance] |
| `arrow` | `boolean` | `true` | Ob ein Pfeil angezeigt werden soll |
| `arrowSize` | `number` | `8` | Größe des Pfeils in Pixeln |
| `gutter` | `number` | `8` | Abstand zwischen dem Tooltip und dem Auslöseelement |
| `closeOnEsc` | `boolean` | `true` | Ob der Tooltip mit der Escape-Taste geschlossen werden kann |
| `closeOnClickOutside` | `boolean` | `true` | Ob der Tooltip geschlossen wird, wenn außerhalb geklickt wird |
| `hasAriaLabel` | `boolean` | `true` | Ob ARIA-Label für Barrierefreiheit hinzugefügt werden sollen |
| `portalProps` | `object` | - | Props für das Portal-Element |
| `className` | `string` | - | CSS-Klasse für den Tooltip |
| `style` | `React.CSSProperties` | - | Inline-Styles für den Tooltip |
| `wrapperClassName` | `string` | - | CSS-Klasse für das Wrapper-Element |
| `wrapperStyle` | `React.CSSProperties` | - | Inline-Styles für das Wrapper-Element |
| `arrowClassName` | `string` | - | CSS-Klasse für den Pfeil |
| `arrowStyle` | `React.CSSProperties` | - | Inline-Styles für den Pfeil |
| `zIndex` | `number` | `1000` | Z-Index des Tooltips |
| `maxWidth` | `string \| number` | `320` | Maximale Breite des Tooltips |
| `interactive` | `boolean` | `false` | Ob der Tooltip interaktiv ist (kann Hover behalten) |
| `appendTo` | `'parent' \| HTMLElement \| null` | `null` | Element, an das der Tooltip angehängt wird |
| `strategy` | `'absolute' \| 'fixed'` | `'absolute'` | Positionierungsstrategie |
| `flip` | `boolean` | `true` | Ob der Tooltip die Seite wechseln soll, wenn nicht genug Platz ist |
| `shift` | `boolean` | `true` | Ob der Tooltip verschoben werden soll, wenn nicht genug Platz ist |
| `preventOverflow` | `boolean` | `true` | Ob der Tooltip verhindern soll, dass er aus dem Viewport fließt |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Farbschema des Tooltips |

## Beispiele

### Verschiedene Platzierungen

```tsx
<Tooltip content="Oben" placement="top">
  <Button>Oben</Button>
</Tooltip>

<Tooltip content="Rechts" placement="right">
  <Button>Rechts</Button>
</Tooltip>

<Tooltip content="Unten" placement="bottom">
  <Button>Unten</Button>
</Tooltip>

<Tooltip content="Links" placement="left">
  <Button>Links</Button>
</Tooltip>
```

### Verschiedene Auslöser

```tsx
<Tooltip content="Hover-Tooltip" trigger="hover">
  <Button>Hover</Button>
</Tooltip>

<Tooltip content="Klick-Tooltip" trigger="click">
  <Button>Klick</Button>
</Tooltip>

<Tooltip content="Fokus-Tooltip" trigger="focus">
  <Button>Fokus</Button>
</Tooltip>
```

### Kontrollierter Modus

```tsx
function ControlledTooltip() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>
        Tooltip {isOpen ? 'schließen' : 'öffnen'}
      </Button>
      
      <Tooltip 
        content="Kontrollierter Tooltip" 
        trigger="manual" 
        isOpen={isOpen}
      >
        <Button>Ziel-Element</Button>
      </Tooltip>
    </>
  );
}
```

### Mit Verzögerung

```tsx
<Tooltip 
  content="Erscheint nach 500ms, verschwindet nach 200ms" 
  delay={{ open: 500, close: 200 }}
>
  <Button>Mit Verzögerung</Button>
</Tooltip>
```

### Interaktiver Tooltip

```tsx
<Tooltip 
  content={
    <div>
      <h4>Interaktiver Tooltip</h4>
      <p>Du kannst auf Elemente im Tooltip klicken.</p>
      <Button size="sm">Klick mich!</Button>
    </div>
  } 
  interactive={true}
  maxWidth={300}
>
  <Button>Interaktiver Tooltip</Button>
</Tooltip>
```

### Benutzerdefiniertes Styling

```tsx
<Tooltip 
  content="Benutzerdefinierter Tooltip" 
  className="custom-tooltip"
  arrowClassName="custom-tooltip-arrow"
  style={{ backgroundColor: '#6366f1', color: 'white' }}
  arrowStyle={{ backgroundColor: '#6366f1' }}
>
  <Button>Benutzerdefiniertes Styling</Button>
</Tooltip>
```

### Ohne Pfeil

```tsx
<Tooltip content="Tooltip ohne Pfeil" arrow={false}>
  <Button>Ohne Pfeil</Button>
</Tooltip>
```

### Mit HTML-Inhalt

```tsx
<Tooltip 
  content={
    <div>
      <strong>Formatierter Inhalt</strong>
      <p>Mit <em>HTML</em> und <u>Formatierung</u>.</p>
    </div>
  }
>
  <Button>HTML-Inhalt</Button>
</Tooltip>
```

## Barrierefreiheit

Die Tooltip-Komponente ist barrierefrei gestaltet:

- Verwendet `role="tooltip"` für Screenreader
- Verknüpft den Tooltip mit dem Auslöseelement über `aria-describedby`
- Unterstützt Tastaturnavigation (Escape zum Schließen)
- Kann mit Fokus ausgelöst werden für Tastaturbenutzer
- Bietet ausreichenden Kontrast zwischen Text und Hintergrund

## Hinweise

- Tooltips sollten für zusätzliche, nicht-kritische Informationen verwendet werden
- Kritische Informationen sollten direkt in der Benutzeroberfläche angezeigt werden
- Tooltips sollten kurz und prägnant sein
- Für komplexere Inhalte sollten Popovers oder Dialoge verwendet werden
- Tooltips können auf mobilen Geräten schwieriger zu bedienen sein, daher sollte die Benutzererfahrung auf allen Geräten getestet werden