# List

Die List-Komponente ermöglicht die Darstellung von Daten in Form von Listen mit verschiedenen Stilen und Funktionen.

## Import

```jsx
import { List, ListItem, ListItemText, ListItemIcon, ListItemAction } from '@smolitux/core';
```

## Verwendung

### Einfache Liste

```jsx
<List>
  <ListItem primary="Item 1" />
  <ListItem primary="Item 2" />
  <ListItem primary="Item 3" />
</List>
```

### Liste mit primärem und sekundärem Text

```jsx
<List>
  <ListItem 
    primary="Inbox" 
    secondary="Alle eingehenden Nachrichten" 
  />
  <ListItem 
    primary="Gesendet" 
    secondary="Alle gesendeten Nachrichten" 
  />
  <ListItem 
    primary="Entwürfe" 
    secondary="Gespeicherte Entwürfe" 
  />
</List>
```

### Liste mit Icons

```jsx
<List>
  <ListItem 
    icon={<InboxIcon className="w-5 h-5" />}
    primary="Inbox" 
  />
  <ListItem 
    icon={<SendIcon className="w-5 h-5" />}
    primary="Gesendet" 
  />
  <ListItem 
    icon={<DraftIcon className="w-5 h-5" />}
    primary="Entwürfe" 
  />
</List>
```

### Liste mit Aktionen

```jsx
<List>
  <ListItem 
    primary="Dokument 1" 
    action={
      <Button size="sm" variant="text">Öffnen</Button>
    }
  />
  <ListItem 
    primary="Dokument 2" 
    action={
      <Button size="sm" variant="text">Öffnen</Button>
    }
  />
</List>
```

### Liste mit Trennlinien

```jsx
<List dividers>
  <ListItem primary="Item 1" />
  <ListItem primary="Item 2" />
  <ListItem primary="Item 3" />
</List>
```

### Horizontale Liste

```jsx
<List horizontal>
  <ListItem primary="Home" />
  <ListItem primary="Produkte" />
  <ListItem primary="Über uns" />
  <ListItem primary="Kontakt" />
</List>
```

### Geordnete Liste

```jsx
<List variant="ordered">
  <ListItem primary="Erster Schritt" />
  <ListItem primary="Zweiter Schritt" />
  <ListItem primary="Dritter Schritt" />
</List>
```

### Ungeordnete Liste

```jsx
<List variant="unordered">
  <ListItem primary="Äpfel" />
  <ListItem primary="Bananen" />
  <ListItem primary="Orangen" />
</List>
```

### Beschreibungsliste

```jsx
<List variant="description">
  <ListItem primary="Name" secondary="Max Mustermann" />
  <ListItem primary="E-Mail" secondary="max@example.com" />
  <ListItem primary="Telefon" secondary="+49 123 456789" />
</List>
```

### Liste mit benutzerdefiniertem Marker

```jsx
<List variant="unordered" marker="→">
  <ListItem primary="Erster Punkt" />
  <ListItem primary="Zweiter Punkt" />
  <ListItem primary="Dritter Punkt" />
</List>
```

### Liste mit verschiedenen Größen

```jsx
<>
  <List size="sm" className="mb-4">
    <ListItem primary="Kleine Liste" />
    <ListItem primary="Mit kleiner Schrift" />
  </List>
  
  <List size="md" className="mb-4">
    <ListItem primary="Mittlere Liste" />
    <ListItem primary="Mit mittlerer Schrift" />
  </List>
  
  <List size="lg">
    <ListItem primary="Große Liste" />
    <ListItem primary="Mit großer Schrift" />
  </List>
</>
```

### Liste mit verschiedenen Dichten

```jsx
<>
  <List density="compact" className="mb-4">
    <ListItem primary="Kompakte Liste" />
    <ListItem primary="Mit weniger Abstand" />
  </List>
  
  <List density="default" className="mb-4">
    <ListItem primary="Standard-Liste" />
    <ListItem primary="Mit normalem Abstand" />
  </List>
  
  <List density="comfortable">
    <ListItem primary="Komfortable Liste" />
    <ListItem primary="Mit mehr Abstand" />
  </List>
</>
```

### Auswählbare Liste

```jsx
function SelectableListExample() {
  const [selectedItem, setSelectedItem] = useState('item1');
  
  const handleSelectItem = (id) => {
    setSelectedItem(id);
  };
  
  return (
    <List 
      selectable 
      selectedItem={selectedItem} 
      onSelectItem={handleSelectItem}
    >
      <ListItem id="item1" primary="Auswählbares Item 1" />
      <ListItem id="item2" primary="Auswählbares Item 2" />
      <ListItem id="item3" primary="Auswählbares Item 3" />
    </List>
  );
}
```

### Liste mit deaktivierten Items

```jsx
<List>
  <ListItem primary="Aktives Item" />
  <ListItem primary="Deaktiviertes Item" disabled />
  <ListItem primary="Aktives Item" />
</List>
```

### Liste mit benutzerdefinierten Komponenten

```jsx
<List>
  <ListItem>
    <ListItemIcon>
      <UserIcon className="w-5 h-5" />
    </ListItemIcon>
    <ListItemText 
      primary="Benutzerprofil" 
      secondary="Persönliche Informationen verwalten" 
    />
    <ListItemAction>
      <Button size="sm" variant="outlined">Bearbeiten</Button>
    </ListItemAction>
  </ListItem>
  <ListItem>
    <ListItemIcon>
      <SettingsIcon className="w-5 h-5" />
    </ListItemIcon>
    <ListItemText 
      primary="Einstellungen" 
      secondary="Konto- und App-Einstellungen" 
    />
    <ListItemAction>
      <Button size="sm" variant="outlined">Öffnen</Button>
    </ListItemAction>
  </ListItem>
</List>
```

## Props

### List Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `variant` | `'default' \| 'ordered' \| 'unordered' \| 'description' \| 'custom'` | `'default'` | Variante der Liste |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Größe der Liste |
| `density` | `'compact' \| 'default' \| 'comfortable'` | `'default'` | Dichte der Liste |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Ausrichtung der Listenelemente |
| `dividers` | `boolean` | `false` | Trennlinien zwischen Listenelementen anzeigen |
| `horizontal` | `boolean` | `false` | Horizontale Liste |
| `icon` | `ReactNode` | - | Benutzerdefiniertes Icon für Listenelemente |
| `marker` | `'disc' \| 'circle' \| 'square' \| 'none' \| string` | - | Benutzerdefiniertes Marker-Symbol für ungeordnete Listen |
| `indent` | `boolean` | `true` | Einrückung der Liste |
| `selectable` | `boolean` | `false` | Listenelemente können ausgewählt werden |
| `selectedItem` | `string \| number \| null` | `null` | Ausgewähltes Listenelement (kontrollierter Modus) |
| `onSelectItem` | `(id: string \| number) => void` | - | Callback bei Auswahl eines Listenelements |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### ListItem Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `id` | `string \| number` | - | Eindeutige ID des Listenelements |
| `primary` | `ReactNode` | - | Primärer Text |
| `secondary` | `ReactNode` | - | Sekundärer Text |
| `icon` | `ReactNode` | - | Icon links vom Text |
| `action` | `ReactNode` | - | Element rechts vom Text |
| `selected` | `boolean` | - | Ist das Element ausgewählt? |
| `disabled` | `boolean` | `false` | Ist das Element deaktiviert? |
| `onClick` | `(event: React.MouseEvent<HTMLLIElement>) => void` | - | Callback bei Klick auf das Listenelement |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### ListItemText Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `primary` | `ReactNode` | - | Primärer Text |
| `secondary` | `ReactNode` | - | Sekundärer Text |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### ListItemIcon Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `children` | `ReactNode` | - | Icon-Element |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### ListItemAction Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `children` | `ReactNode` | - | Aktions-Element |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

## Barrierefreiheit

Die List-Komponente ist für Barrierefreiheit optimiert:

- Verwendet semantisch korrekte HTML-Elemente (`ul`, `ol`, `li`)
- Unterstützt Tastaturnavigation für auswählbare Listen
- Verwendet ARIA-Attribute für bessere Screenreader-Unterstützung
- Deaktivierte Elemente werden mit `aria-disabled` gekennzeichnet
- Ausgewählte Elemente werden mit `aria-selected` gekennzeichnet

## Beispiele

### Navigationsmenü

```jsx
function NavigationMenu() {
  const [selectedItem, setSelectedItem] = useState('dashboard');
  
  const handleSelectItem = (id) => {
    setSelectedItem(id);
  };
  
  return (
    <div className="w-64 bg-white border-r h-screen p-4">
      <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
      
      <List 
        selectable 
        selectedItem={selectedItem} 
        onSelectItem={handleSelectItem}
      >
        <ListItem 
          id="dashboard" 
          icon={<DashboardIcon className="w-5 h-5" />}
          primary="Dashboard" 
        />
        <ListItem 
          id="users" 
          icon={<UsersIcon className="w-5 h-5" />}
          primary="Benutzer" 
        />
        <ListItem 
          id="products" 
          icon={<BoxIcon className="w-5 h-5" />}
          primary="Produkte" 
        />
        <ListItem 
          id="orders" 
          icon={<ShoppingCartIcon className="w-5 h-5" />}
          primary="Bestellungen" 
          secondary="12 neue Bestellungen"
        />
        <ListItem 
          id="settings" 
          icon={<SettingsIcon className="w-5 h-5" />}
          primary="Einstellungen" 
        />
      </List>
    </div>
  );
}
```

### Kontaktliste

```jsx
function ContactList() {
  const contacts = [
    { id: 1, name: 'Max Mustermann', email: 'max@example.com', avatar: '/avatars/max.jpg', status: 'online' },
    { id: 2, name: 'Anna Schmidt', email: 'anna@example.com', avatar: '/avatars/anna.jpg', status: 'offline' },
    { id: 3, name: 'Tom Müller', email: 'tom@example.com', avatar: '/avatars/tom.jpg', status: 'busy' },
    { id: 4, name: 'Lisa Weber', email: 'lisa@example.com', avatar: '/avatars/lisa.jpg', status: 'away' }
  ];
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-primary-600 text-white">
        <h2 className="text-lg font-bold">Kontakte</h2>
      </div>
      
      <List dividers>
        {contacts.map(contact => (
          <ListItem 
            key={contact.id}
            id={contact.id}
            icon={
              <div className="relative">
                <Avatar 
                  src={contact.avatar} 
                  alt={contact.name} 
                  size="md" 
                />
                <span 
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(contact.status)}`}
                />
              </div>
            }
            primary={contact.name}
            secondary={contact.email}
            action={
              <Button 
                size="sm" 
                variant="text" 
                icon={<MessageIcon className="w-4 h-4" />}
              />
            }
          />
        ))}
      </List>
    </div>
  );
}
```

### Todo-Liste

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Design-Meeting vorbereiten', completed: false },
    { id: 2, text: 'Präsentation erstellen', completed: false },
    { id: 3, text: 'E-Mails beantworten', completed: true },
    { id: 4, text: 'Projekt-Dokumentation aktualisieren', completed: false }
  ]);
  
  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-primary-600 text-white">
        <h2 className="text-lg font-bold">Aufgaben</h2>
      </div>
      
      <List dividers>
        {todos.map(todo => (
          <ListItem 
            key={todo.id}
            icon={
              <Checkbox 
                checked={todo.completed} 
                onChange={() => handleToggleTodo(todo.id)}
              />
            }
            primary={
              <span className={todo.completed ? 'line-through text-gray-400' : ''}>
                {todo.text}
              </span>
            }
            action={
              <Button 
                size="sm" 
                variant="text" 
                color="danger"
                icon={<TrashIcon className="w-4 h-4" />}
                onClick={() => handleDeleteTodo(todo.id)}
              />
            }
          />
        ))}
      </List>
      
      <div className="p-4 border-t">
        <input 
          type="text" 
          placeholder="Neue Aufgabe hinzufügen..." 
          className="w-full px-3 py-2 border rounded-md"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              setTodos([
                ...todos, 
                { 
                  id: Date.now(), 
                  text: e.target.value.trim(), 
                  completed: false 
                }
              ]);
              e.target.value = '';
            }
          }}
        />
      </div>
    </div>
  );
}
```

### FAQ-Liste

```jsx
function FAQList() {
  const faqs = [
    {
      question: 'Was ist Smolitux UI?',
      answer: 'Smolitux UI ist eine moderne React-Komponentenbibliothek für die einheitliche Gestaltung von Anwendungen im Smolitux Ökosystem.'
    },
    {
      question: 'Wie installiere ich Smolitux UI?',
      answer: 'Sie können Smolitux UI mit npm oder yarn installieren: npm install @smolitux/core oder yarn add @smolitux/core'
    },
    {
      question: 'Ist Smolitux UI für Produktionsanwendungen geeignet?',
      answer: 'Ja, Smolitux UI ist für den Einsatz in Produktionsanwendungen konzipiert und wird regelmäßig aktualisiert und getestet.'
    },
    {
      question: 'Unterstützt Smolitux UI Barrierefreiheit?',
      answer: 'Ja, Smolitux UI legt großen Wert auf Barrierefreiheit und folgt den WCAG-Richtlinien, um eine inklusive Benutzererfahrung zu gewährleisten.'
    }
  ];
  
  const [expandedItem, setExpandedItem] = useState(null);
  
  const toggleItem = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Häufig gestellte Fragen</h2>
      
      <List variant="custom" dividers>
        {faqs.map((faq, index) => (
          <ListItem 
            key={index}
            onClick={() => toggleItem(index)}
            className="cursor-pointer"
          >
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <div className="ml-4">
                  {expandedItem === index ? (
                    <MinusIcon className="w-5 h-5" />
                  ) : (
                    <PlusIcon className="w-5 h-5" />
                  )}
                </div>
              </div>
              
              {expandedItem === index && (
                <div className="mt-2 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
```