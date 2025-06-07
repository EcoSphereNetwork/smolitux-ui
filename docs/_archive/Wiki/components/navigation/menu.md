# Menu

Die Menu-Komponente bietet eine flexible Möglichkeit, Navigationsmenüs und Dropdown-Menüs zu erstellen. Sie kann sowohl für horizontale als auch vertikale Menüs verwendet werden und unterstützt verschiedene Varianten und Größen.

## Import

```jsx
import { Menu, MenuItem, MenuDropdown } from '@smolitux/core';
```

## Verwendung

### Einfaches Menü

```jsx
<Menu>
  <MenuItem id="home">Home</MenuItem>
  <MenuItem id="products">Produkte</MenuItem>
  <MenuItem id="about">Über uns</MenuItem>
  <MenuItem id="contact">Kontakt</MenuItem>
</Menu>
```

### Menü mit Icons

```jsx
import { HomeIcon, ShoppingCartIcon, InformationCircleIcon, MailIcon } from '@heroicons/react/outline';

<Menu>
  <MenuItem id="home" icon={<HomeIcon className="w-5 h-5" />}>Home</MenuItem>
  <MenuItem id="products" icon={<ShoppingCartIcon className="w-5 h-5" />}>Produkte</MenuItem>
  <MenuItem id="about" icon={<InformationCircleIcon className="w-5 h-5" />}>Über uns</MenuItem>
  <MenuItem id="contact" icon={<MailIcon className="w-5 h-5" />}>Kontakt</MenuItem>
</Menu>
```

### Horizontales Menü

```jsx
<Menu direction="horizontal">
  <MenuItem id="home">Home</MenuItem>
  <MenuItem id="products">Produkte</MenuItem>
  <MenuItem id="about">Über uns</MenuItem>
  <MenuItem id="contact">Kontakt</MenuItem>
</Menu>
```

### Menü mit aktiven Items

```jsx
import { useState } from 'react';

function ControlledMenu() {
  const [activeItem, setActiveItem] = useState('home');
  
  const handleItemSelect = (itemId) => {
    setActiveItem(itemId);
  };
  
  return (
    <Menu activeItem={activeItem} onItemSelect={handleItemSelect}>
      <MenuItem id="home">Home</MenuItem>
      <MenuItem id="products">Produkte</MenuItem>
      <MenuItem id="about">Über uns</MenuItem>
      <MenuItem id="contact">Kontakt</MenuItem>
    </Menu>
  );
}
```

### Dropdown-Menü

```jsx
<MenuDropdown 
  trigger={<Button>Optionen</Button>}
  placement="bottom-start"
>
  <MenuItem id="edit">Bearbeiten</MenuItem>
  <MenuItem id="duplicate">Duplizieren</MenuItem>
  <MenuItem id="delete">Löschen</MenuItem>
</MenuDropdown>
```

### Dropdown-Menü mit Trennlinien und deaktivierten Items

```jsx
<MenuDropdown trigger={<Button>Aktionen</Button>}>
  <MenuItem id="view">Ansehen</MenuItem>
  <MenuItem id="edit">Bearbeiten</MenuItem>
  <MenuDivider />
  <MenuItem id="share">Teilen</MenuItem>
  <MenuDivider />
  <MenuItem id="archive">Archivieren</MenuItem>
  <MenuItem id="delete" disabled>Löschen</MenuItem>
</MenuDropdown>
```

### Verschachteltes Menü

```jsx
<Menu>
  <MenuItem id="file">Datei</MenuItem>
  <MenuItem id="edit">Bearbeiten</MenuItem>
  <MenuItem id="view">Ansicht</MenuItem>
  <MenuSubmenu label="Einfügen">
    <MenuItem id="image">Bild</MenuItem>
    <MenuItem id="table">Tabelle</MenuItem>
    <MenuItem id="chart">Diagramm</MenuItem>
  </MenuSubmenu>
  <MenuItem id="help">Hilfe</MenuItem>
</Menu>
```

## Menu Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `children` | `ReactNode` | - | Die Menüelemente (MenuItem-Komponenten) |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'minimal'` | `'default'` | Die visuelle Variante des Menüs |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Die Ausrichtung des Menüs |
| `fullWidth` | `boolean` | `false` | Ob das Menü die volle Breite einnehmen soll |
| `indented` | `boolean` | `false` | Ob die Menüelemente eingerückt sein sollen (für verschachtelte Menüs) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Die Größe des Menüs |
| `activeItem` | `string \| null` | - | Die ID des aktiven Menüelements (kontrollierter Modus) |
| `closeOnSelect` | `boolean` | `false` | Ob das Menü nach Auswahl eines Elements geschlossen werden soll |
| `onItemSelect` | `(itemId: string) => void` | - | Callback-Funktion, die aufgerufen wird, wenn ein Menüelement ausgewählt wird |

## MenuItem Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `id` | `string` | - | Eindeutige ID des Menüelements |
| `children` | `ReactNode` | - | Der Inhalt des Menüelements |
| `icon` | `ReactNode` | - | Icon für das Menüelement (optional) |
| `disabled` | `boolean` | `false` | Ob das Menüelement deaktiviert ist |
| `active` | `boolean` | `false` | Ob das Menüelement aktiv ist (unkontrollierter Modus) |
| `onClick` | `(event: React.MouseEvent) => void` | - | Callback-Funktion, die aufgerufen wird, wenn das Menüelement angeklickt wird |
| `shortcut` | `string` | - | Tastenkombination für das Menüelement (z.B. "Ctrl+C") |
| `description` | `string` | - | Beschreibung für das Menüelement |
| `rightElement` | `ReactNode` | - | Element, das rechts im Menüelement angezeigt wird |

## MenuDropdown Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `trigger` | `ReactElement` | - | Das Element, das das Dropdown-Menü auslöst |
| `children` | `ReactNode` | - | Der Inhalt des Dropdown-Menüs (MenuItem-Komponenten) |
| `isOpen` | `boolean` | - | Ob das Dropdown-Menü geöffnet ist (kontrollierter Modus) |
| `onOpenChange` | `(isOpen: boolean) => void` | - | Callback-Funktion, die aufgerufen wird, wenn sich der Öffnungszustand ändert |
| `placement` | `'bottom-start' \| 'bottom-end' \| 'bottom' \| 'top-start' \| 'top-end' \| 'top' \| 'right' \| 'left'` | `'bottom-start'` | Die Position des Dropdown-Menüs relativ zum Trigger |
| `offset` | `number` | `8` | Der Abstand zwischen Trigger und Dropdown-Menü in Pixeln |
| `closeOnSelect` | `boolean` | `true` | Ob das Dropdown-Menü nach Auswahl eines Elements geschlossen werden soll |
| `closeOnClickOutside` | `boolean` | `true` | Ob das Dropdown-Menü geschlossen werden soll, wenn außerhalb geklickt wird |
| `closeOnEscape` | `boolean` | `true` | Ob das Dropdown-Menü geschlossen werden soll, wenn die Escape-Taste gedrückt wird |
| `portalTo` | `HTMLElement \| null` | - | Das Element, in das das Dropdown-Menü gerendert werden soll (für Portal-Rendering) |
| `zIndex` | `number` | `1000` | Der z-Index des Dropdown-Menüs |
| `openDelay` | `number` | `0` | Die Verzögerung in Millisekunden, bevor das Dropdown-Menü geöffnet wird |
| `closeDelay` | `number` | `0` | Die Verzögerung in Millisekunden, bevor das Dropdown-Menü geschlossen wird |
| `maxWidth` | `number \| string` | - | Die maximale Breite des Dropdown-Menüs |
| `minWidth` | `number \| string` | - | Die minimale Breite des Dropdown-Menüs (Standard: gleiche Breite wie Trigger) |

## Barrierefreiheit

Die Menu-Komponente ist für Barrierefreiheit optimiert:

- Verwendet die richtigen ARIA-Rollen (`role="menu"`, `role="menuitem"`)
- Tastaturnavigation: Menüelemente können mit den Pfeiltasten durchlaufen werden
- Fokus-Management: Fokus wird korrekt zwischen Menüelementen bewegt
- Screenreader-Unterstützung: Korrekte ARIA-Attribute für Menüelemente

## Beispiele

### Kontextmenü

```jsx
import { useState, useCallback } from 'react';
import { Menu, MenuItem, MenuDivider } from '@smolitux/core';

function ContextMenuExample() {
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  
  const handleContextMenu = useCallback((event) => {
    event.preventDefault();
    setContextMenu({ 
      visible: true, 
      x: event.clientX, 
      y: event.clientY 
    });
  }, []);
  
  const handleItemSelect = useCallback((itemId) => {
    console.log(`Selected: ${itemId}`);
    setContextMenu({ ...contextMenu, visible: false });
  }, [contextMenu]);
  
  const handleClose = useCallback(() => {
    setContextMenu({ ...contextMenu, visible: false });
  }, [contextMenu]);
  
  return (
    <div onContextMenu={handleContextMenu} style={{ height: '200px', border: '1px solid #ccc', padding: '16px' }}>
      Rechtsklick für Kontextmenü
      
      {contextMenu.visible && (
        <div 
          style={{ 
            position: 'fixed', 
            top: contextMenu.y, 
            left: contextMenu.x,
            zIndex: 1000,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            backgroundColor: 'white',
            borderRadius: '4px'
          }}
        >
          <Menu onItemSelect={handleItemSelect}>
            <MenuItem id="cut">Ausschneiden</MenuItem>
            <MenuItem id="copy">Kopieren</MenuItem>
            <MenuItem id="paste">Einfügen</MenuItem>
            <MenuDivider />
            <MenuItem id="delete">Löschen</MenuItem>
          </Menu>
        </div>
      )}
      
      {contextMenu.visible && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }}
          onClick={handleClose}
        />
      )}
    </div>
  );
}
```

### Menü mit Badges

```jsx
<Menu>
  <MenuItem id="inbox" rightElement={<Badge variant="primary">5</Badge>}>Posteingang</MenuItem>
  <MenuItem id="sent">Gesendet</MenuItem>
  <MenuItem id="drafts" rightElement={<Badge variant="secondary">2</Badge>}>Entwürfe</MenuItem>
  <MenuItem id="spam" rightElement={<Badge variant="danger">12</Badge>}>Spam</MenuItem>
</Menu>
```

### Menü mit Beschreibungen

```jsx
<Menu>
  <MenuItem 
    id="profile" 
    icon={<UserIcon className="w-5 h-5" />}
    description="Persönliche Informationen bearbeiten"
  >
    Profil
  </MenuItem>
  <MenuItem 
    id="settings" 
    icon={<CogIcon className="w-5 h-5" />}
    description="Anwendungseinstellungen anpassen"
  >
    Einstellungen
  </MenuItem>
  <MenuItem 
    id="help" 
    icon={<QuestionMarkCircleIcon className="w-5 h-5" />}
    description="Hilfe und Support"
  >
    Hilfe
  </MenuItem>
</Menu>
```