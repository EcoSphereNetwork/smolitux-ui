# Drawer

Die Drawer-Komponente zeigt Inhalte in einem Panel an, das von einer Seite des Bildschirms eingeblendet wird. Sie eignet sich für Seitenmenüs, Filter und zusätzliche Informationen.

## Import

```jsx
import { Drawer } from '@smolitux/core';
```

## Verwendung

### Einfacher Drawer

```jsx
function SimpleDrawerExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Drawer öffnen</Button>
      
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Beispiel-Drawer"
      >
        <p>Dies ist ein einfacher Drawer mit Standardeinstellungen.</p>
      </Drawer>
    </>
  );
}
```

### Verschiedene Positionen

```jsx
function PlacementDrawerExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState<'left' | 'right' | 'top' | 'bottom'>('right');
  
  const openDrawer = (position) => {
    setPlacement(position);
    setIsOpen(true);
  };
  
  return (
    <>
      <div className="flex space-x-2">
        <Button onClick={() => openDrawer('left')}>Links</Button>
        <Button onClick={() => openDrawer('right')}>Rechts</Button>
        <Button onClick={() => openDrawer('top')}>Oben</Button>
        <Button onClick={() => openDrawer('bottom')}>Unten</Button>
      </div>
      
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`Drawer (${placement})`}
        placement={placement}
      >
        <p>Dies ist ein Drawer, der von {placement} eingeblendet wird.</p>
      </Drawer>
    </>
  );
}
```

### Benutzerdefinierte Größe

```jsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Breiter Drawer"
  width="500px" // Für left/right
>
  <p>Dies ist ein Drawer mit benutzerdefinierter Breite.</p>
</Drawer>

<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Hoher Drawer"
  placement="top"
  height="300px" // Für top/bottom
>
  <p>Dies ist ein Drawer mit benutzerdefinierter Höhe.</p>
</Drawer>
```

### Drawer mit Footer

```jsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Drawer mit Footer"
  footer={
    <div className="flex justify-end">
      <Button onClick={() => setIsOpen(false)}>Schließen</Button>
    </div>
  }
>
  <p>Dies ist ein Drawer mit einem benutzerdefinierten Footer.</p>
</Drawer>
```

### Drawer ohne Header

```jsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  showHeader={false}
>
  <div className="p-4">
    <h2 className="text-lg font-bold mb-4">Benutzerdefinierter Header</h2>
    <p>Dies ist ein Drawer ohne den Standard-Header.</p>
    <button 
      className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100"
      onClick={() => setIsOpen(false)}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</Drawer>
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `isOpen` | `boolean` | - | Ist der Drawer sichtbar? |
| `onClose` | `() => void` | - | Callback zum Schließen des Drawers |
| `placement` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Position des Drawers |
| `width` | `string \| number` | `'320px'` | Breite des Drawers (für left/right) |
| `height` | `string \| number` | `'320px'` | Höhe des Drawers (für top/bottom) |
| `title` | `ReactNode` | - | Titel des Drawers |
| `footer` | `ReactNode` | - | Footer-Inhalt |
| `children` | `ReactNode` | - | Inhalt des Drawers |
| `closeOnOverlayClick` | `boolean` | `true` | Beim Klick auf Overlay schließen |
| `showHeader` | `boolean` | `true` | Header-Anzeige |
| `className` | `string` | - | Zusätzliche CSS-Klassen |
| `zIndex` | `number` | `1000` | Z-Index-Wert |

## Barrierefreiheit

Die Drawer-Komponente ist für Barrierefreiheit optimiert:

- Verwendet die korrekten ARIA-Attribute (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`)
- Fokus-Management: Fokus wird beim Öffnen auf den Drawer gesetzt und beim Schließen zurückgegeben
- Tastaturnavigation: Schließen mit ESC, Fokus-Trap innerhalb des Drawers
- Screenreader-Unterstützung durch semantische Struktur

## Beispiele

### Navigations-Drawer

```jsx
function NavigationDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  
  const navigation = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'products', label: 'Produkte', icon: '🛒' },
    { id: 'about', label: 'Über uns', icon: '📄' },
    { id: 'contact', label: 'Kontakt', icon: '✉️' },
    { id: 'settings', label: 'Einstellungen', icon: '⚙️' },
  ];
  
  const handleNavigation = (pageId) => {
    setActivePage(pageId);
    setIsOpen(false);
    console.log(`Navigiere zu: ${pageId}`);
  };
  
  return (
    <>
      <div className="bg-white border-b p-4 flex items-center">
        <button 
          className="p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="ml-4 text-lg font-bold">Meine App</h1>
      </div>
      
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Navigation"
        placement="left"
      >
        <nav className="py-2">
          {navigation.map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center px-4 py-3 text-left ${
                activePage === item.id 
                  ? 'bg-primary-50 text-primary-700 font-medium' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleNavigation(item.id)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="mt-auto border-t pt-4 px-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-lg">👤</span>
            </div>
            <div className="ml-3">
              <p className="font-medium">Max Mustermann</p>
              <p className="text-sm text-gray-500">max@example.com</p>
            </div>
          </div>
          <button 
            className="mt-4 w-full py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => console.log('Abmelden')}
          >
            Abmelden
          </button>
        </div>
      </Drawer>
      
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">
          {navigation.find(item => item.id === activePage)?.label || 'Home'}
        </h2>
        <p>Hauptinhalt der Seite</p>
      </div>
    </>
  );
}
```

### Filter-Drawer

```jsx
function FilterDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    price: [0, 1000],
    inStock: false
  });
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const applyFilters = () => {
    console.log('Angewendete Filter:', filters);
    setIsOpen(false);
  };
  
  const resetFilters = () => {
    setFilters({
      category: '',
      price: [0, 1000],
      inStock: false
    });
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Produkte</h2>
        <Button onClick={() => setIsOpen(true)}>
          Filter
        </Button>
      </div>
      
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Filter"
        placement="right"
        footer={
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={resetFilters}>
              Zurücksetzen
            </Button>
            <Button onClick={applyFilters}>
              Filter anwenden
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategorie
            </label>
            <select
              className="w-full border-gray-300 rounded-md shadow-sm"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">Alle Kategorien</option>
              <option value="electronics">Elektronik</option>
              <option value="clothing">Kleidung</option>
              <option value="books">Bücher</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preis
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                className="w-full border-gray-300 rounded-md shadow-sm"
                value={filters.price[0]}
                onChange={(e) => handleFilterChange('price', [parseInt(e.target.value), filters.price[1]])}
                min="0"
              />
              <span>bis</span>
              <input
                type="number"
                className="w-full border-gray-300 rounded-md shadow-sm"
                value={filters.price[1]}
                onChange={(e) => handleFilterChange('price', [filters.price[0], parseInt(e.target.value)])}
                min={filters.price[0]}
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="inStock"
              checked={filters.inStock}
              onChange={(e) => handleFilterChange('inStock', e.target.checked)}
              className="h-4 w-4 text-primary-600 border-gray-300 rounded"
            />
            <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700">
              Nur verfügbare Artikel
            </label>
          </div>
        </div>
      </Drawer>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Produktliste hier */}
        <div className="border p-4 rounded-md">Produkt 1</div>
        <div className="border p-4 rounded-md">Produkt 2</div>
        <div className="border p-4 rounded-md">Produkt 3</div>
      </div>
    </>
  );
}
```

### Warenkorb-Drawer

```jsx
function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Produkt 1', price: 29.99, quantity: 1 },
    { id: 2, name: 'Produkt 2', price: 49.99, quantity: 2 }
  ]);
  
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };
  
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );
  
  return (
    <>
      <button 
        className="relative p-2"
        onClick={() => setIsOpen(true)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      </button>
      
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Warenkorb"
        placement="right"
        footer={
          <div className="w-full">
            <div className="flex justify-between font-bold mb-4">
              <span>Gesamtsumme:</span>
              <span>{totalPrice.toFixed(2)} €</span>
            </div>
            <Button 
              className="w-full"
              onClick={() => console.log('Zur Kasse')}
              disabled={cartItems.length === 0}
            >
              Zur Kasse
            </Button>
          </div>
        }
      >
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="text-gray-500">Ihr Warenkorb ist leer</p>
            <button 
              className="mt-4 text-primary-600 hover:text-primary-800"
              onClick={() => setIsOpen(false)}
            >
              Weiter einkaufen
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex border-b pb-4">
                <div className="w-16 h-16 bg-gray-100 rounded"></div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{item.name}</h3>
                    <button 
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => removeItem(item.id)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-500">{item.price.toFixed(2)} €</p>
                  <div className="flex items-center mt-2">
                    <button 
                      className="w-8 h-8 border rounded-l-md flex items-center justify-center"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="w-10 h-8 border-t border-b flex items-center justify-center">
                      {item.quantity}
                    </span>
                    <button 
                      className="w-8 h-8 border rounded-r-md flex items-center justify-center"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Drawer>
    </>
  );
}
```