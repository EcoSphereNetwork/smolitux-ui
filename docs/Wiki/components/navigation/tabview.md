# TabView

Die TabView-Komponente ermöglicht die Organisation von Inhalten in Registerkarten, zwischen denen Benutzer wechseln können. Sie ist ideal für die Darstellung von verwandten Inhalten in einem begrenzten Raum.

## Import

```jsx
import { TabView } from '@smolitux/core';
```

## Verwendung

### Einfache Tabs

```jsx
const tabs = [
  {
    id: 'tab1',
    label: 'Profil',
    content: <div>Profilinformationen hier...</div>
  },
  {
    id: 'tab2',
    label: 'Einstellungen',
    content: <div>Einstellungen hier...</div>
  },
  {
    id: 'tab3',
    label: 'Benachrichtigungen',
    content: <div>Benachrichtigungen hier...</div>
  }
];

<TabView tabs={tabs} defaultTabId="tab1" />
```

### Tabs mit Icons

```jsx
import { UserIcon, CogIcon, BellIcon } from '@heroicons/react/outline';

const tabs = [
  {
    id: 'tab1',
    label: 'Profil',
    icon: <UserIcon className="w-5 h-5" />,
    content: <div>Profilinformationen hier...</div>
  },
  {
    id: 'tab2',
    label: 'Einstellungen',
    icon: <CogIcon className="w-5 h-5" />,
    content: <div>Einstellungen hier...</div>
  },
  {
    id: 'tab3',
    label: 'Benachrichtigungen',
    icon: <BellIcon className="w-5 h-5" />,
    content: <div>Benachrichtigungen hier...</div>
  }
];

<TabView tabs={tabs} defaultTabId="tab1" />
```

### Tabs mit Badges

```jsx
const tabs = [
  {
    id: 'tab1',
    label: 'Inbox',
    content: <div>Nachrichten hier...</div>,
    badge: '5',
    badgeColor: 'primary'
  },
  {
    id: 'tab2',
    label: 'Gesendet',
    content: <div>Gesendete Nachrichten hier...</div>
  },
  {
    id: 'tab3',
    label: 'Spam',
    content: <div>Spam-Nachrichten hier...</div>,
    badge: '12',
    badgeColor: 'danger'
  }
];

<TabView tabs={tabs} defaultTabId="tab1" />
```

### Verschiedene Tab-Varianten

```jsx
// Standard-Tabs
<TabView tabs={tabs} variant="default" />

// Pill-Tabs
<TabView tabs={tabs} variant="pills" />

// Button-Tabs
<TabView tabs={tabs} variant="buttons" />

// Unterstrichene Tabs
<TabView tabs={tabs} variant="underline" />

// Minimale Tabs
<TabView tabs={tabs} variant="minimal" />
```

### Tab-Positionen

```jsx
// Tabs oben (Standard)
<TabView tabs={tabs} position="top" />

// Tabs unten
<TabView tabs={tabs} position="bottom" />

// Tabs links
<TabView tabs={tabs} position="left" />

// Tabs rechts
<TabView tabs={tabs} position="right" />
```

### Kontrollierte Tabs

```jsx
import { useState } from 'react';

function ControlledTabs() {
  const [activeTab, setActiveTab] = useState('tab1');
  
  return (
    <TabView 
      tabs={tabs} 
      activeTabId={activeTab} 
      onTabChange={(tabId) => setActiveTab(tabId)} 
    />
  );
}
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `tabs` | `TabItem[]` | - | Array von Tab-Objekten |
| `defaultTabId` | `string` | - | ID des standardmäßig aktiven Tabs (unkontrollierter Modus) |
| `activeTabId` | `string` | - | ID des aktiven Tabs (kontrollierter Modus) |
| `onTabChange` | `(tabId: string) => void` | - | Callback-Funktion, die aufgerufen wird, wenn ein Tab gewechselt wird |
| `variant` | `'default' \| 'pills' \| 'buttons' \| 'underline' \| 'minimal'` | `'default'` | Visueller Stil der Tabs |
| `fullWidth` | `boolean` | `false` | Ob die Tabs die volle Breite einnehmen sollen |
| `className` | `string` | `''` | Zusätzliche CSS-Klassen für den Container |
| `tabsClassName` | `string` | `''` | Zusätzliche CSS-Klassen für die Tab-Leiste |
| `contentClassName` | `string` | `''` | Zusätzliche CSS-Klassen für den Inhaltsbereich |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position der Tab-Leiste relativ zum Inhalt |
| `showContent` | `boolean` | `true` | Ob der Inhalt angezeigt werden soll |
| `lazy` | `boolean` | `true` | Ob Inhalte nur bei Bedarf gerendert werden sollen |
| `tabSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Größe der Tabs |
| `centered` | `boolean` | `false` | Ob die Tabs zentriert werden sollen |

### TabItem Interface

| Eigenschaft | Typ | Beschreibung |
|-------------|-----|-------------|
| `id` | `string` | Eindeutige ID des Tabs |
| `label` | `ReactNode` | Label des Tabs |
| `content` | `ReactNode` | Inhalt des Tabs |
| `icon` | `ReactNode` | Icon des Tabs (optional) |
| `disabled` | `boolean` | Ob der Tab deaktiviert ist (optional) |
| `badge` | `string \| number` | Badge-Text oder -Zahl (optional) |
| `badgeColor` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | Farbe des Badges (optional) |

## Barrierefreiheit

Die TabView-Komponente ist für Barrierefreiheit optimiert:

- Verwendet die richtigen ARIA-Rollen (`role="tablist"`, `role="tab"`, `role="tabpanel"`)
- Tastaturnavigation: Tabs können mit den Pfeiltasten durchlaufen werden
- Fokus-Management: Fokus wird korrekt zwischen Tabs bewegt
- Screenreader-Unterstützung: Korrekte ARIA-Attribute für Beziehungen zwischen Tabs und Panels

## Beispiele

### Dynamische Tabs

```jsx
import { useState } from 'react';
import { TabView, Button } from '@smolitux/core';

function DynamicTabs() {
  const [tabs, setTabs] = useState([
    { id: 'tab1', label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Inhalt von Tab 2</div> }
  ]);
  
  const [activeTab, setActiveTab] = useState('tab1');
  
  const addTab = () => {
    const newTabId = `tab${tabs.length + 1}`;
    setTabs([
      ...tabs,
      {
        id: newTabId,
        label: `Tab ${tabs.length + 1}`,
        content: <div>Inhalt von Tab {tabs.length + 1}</div>
      }
    ]);
    setActiveTab(newTabId);
  };
  
  return (
    <div>
      <Button onClick={addTab} className="mb-4">Neuen Tab hinzufügen</Button>
      <TabView 
        tabs={tabs} 
        activeTabId={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
}
```

### Tabs mit benutzerdefinierten Inhalten

```jsx
const tabs = [
  {
    id: 'tab1',
    label: (
      <div className="flex items-center">
        <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
        Online
      </div>
    ),
    content: <div>Online-Status-Informationen</div>
  },
  {
    id: 'tab2',
    label: (
      <div className="flex items-center">
        <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
        Offline
      </div>
    ),
    content: <div>Offline-Status-Informationen</div>
  }
];

<TabView tabs={tabs} defaultTabId="tab1" />
```

### Tabs mit Formularen

```jsx
const tabs = [
  {
    id: 'personal',
    label: 'Persönliche Daten',
    content: (
      <form>
        <div className="space-y-4">
          <Input label="Name" name="name" />
          <Input label="E-Mail" name="email" type="email" />
          <Input label="Telefon" name="phone" type="tel" />
        </div>
      </form>
    )
  },
  {
    id: 'address',
    label: 'Adresse',
    content: (
      <form>
        <div className="space-y-4">
          <Input label="Straße" name="street" />
          <Input label="PLZ" name="zip" />
          <Input label="Stadt" name="city" />
        </div>
      </form>
    )
  },
  {
    id: 'payment',
    label: 'Zahlungsinformationen',
    content: (
      <form>
        <div className="space-y-4">
          <Input label="Karteninhaber" name="cardHolder" />
          <Input label="Kartennummer" name="cardNumber" />
          <div className="flex space-x-4">
            <Input label="Ablaufdatum" name="expiry" />
            <Input label="CVC" name="cvc" />
          </div>
        </div>
      </form>
    )
  }
];

<TabView tabs={tabs} defaultTabId="personal" />
```