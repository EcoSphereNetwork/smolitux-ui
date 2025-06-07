# Spinner

Die Spinner-Komponente wird verwendet, um Ladezustände anzuzeigen und dem Benutzer zu signalisieren, dass ein Prozess im Hintergrund ausgeführt wird.

## Import

```jsx
import { Spinner } from '@smolitux/core';
```

## Verwendung

### Einfacher Spinner

```jsx
<Spinner />
```

### Spinner mit verschiedenen Größen

```jsx
<Spinner size="xs" className="mr-4" />
<Spinner size="sm" className="mr-4" />
<Spinner size="md" className="mr-4" />
<Spinner size="lg" className="mr-4" />
<Spinner size="xl" />
```

### Spinner mit verschiedenen Varianten

```jsx
<Spinner variant="border" className="mr-4" />
<Spinner variant="grow" className="mr-4" />
<Spinner variant="dots" className="mr-4" />
<Spinner variant="ring" />
```

### Spinner mit verschiedenen Farben

```jsx
<Spinner color="primary" className="mr-4" />
<Spinner color="secondary" className="mr-4" />
<Spinner color="success" className="mr-4" />
<Spinner color="danger" className="mr-4" />
<Spinner color="warning" className="mr-4" />
<Spinner color="info" />
```

### Spinner mit Text

```jsx
<Spinner text="Wird geladen..." />
```

### Zentrierter Spinner

```jsx
<div style={{ position: 'relative', height: '200px', border: '1px dashed #ccc' }}>
  <Spinner centered />
</div>
```

### Spinner mit benutzerdefinierter Animation-Geschwindigkeit

```jsx
<Spinner speed={2} className="mr-4" />
<Spinner speed={0.5} />
```

### Spinner mit voller Breite

```jsx
<Spinner fullWidth text="Daten werden geladen..." />
```

### Spinner mit benutzerdefiniertem Label für Screenreader

```jsx
<Spinner label="Daten werden vom Server abgerufen..." />
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Größe des Spinners |
| `variant` | `'border' \| 'grow' \| 'dots' \| 'ring'` | `'border'` | Variante des Spinners |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'light' \| 'dark'` | `'primary'` | Farbe des Spinners |
| `speed` | `number` | - | Geschwindigkeit der Animation (in Sekunden) |
| `label` | `string` | `'Wird geladen...'` | Label für Screenreader |
| `centered` | `boolean` | `false` | Zentriert den Spinner im Container |
| `text` | `string` | - | Zeigt einen Text unter dem Spinner an |
| `fullWidth` | `boolean` | `false` | Volle Breite des Containers |
| `className` | `string` | - | Zusätzliche CSS-Klassen |
| `style` | `React.CSSProperties` | - | Inline-Styles |

## Barrierefreiheit

Die Spinner-Komponente ist für Barrierefreiheit optimiert:

- Verwendet das `role="status"`-Attribut, um Screenreader zu informieren, dass es sich um einen Statusindikator handelt
- Enthält standardmäßig einen versteckten Text für Screenreader
- Der Text kann über die `label`-Prop angepasst werden

## Beispiele

### Ladezustand in einem Formular

```jsx
function LoadingFormExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simuliere API-Aufruf
    setTimeout(() => {
      setIsLoading(false);
      alert('Formular erfolgreich abgesendet!');
    }, 2000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Kontaktformular</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          E-Mail
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
          disabled={isLoading}
        />
      </div>
      
      <button
        type="submit"
        className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-gray-400"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner size="sm" color="light" className="mr-2" />
            <span>Wird gesendet...</span>
          </div>
        ) : (
          'Absenden'
        )}
      </button>
    </form>
  );
}
```

### Ladezustand beim Datenabruf

```jsx
function DataFetchingExample() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simuliere API-Aufruf
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simuliere Daten
        const mockData = [
          { id: 1, name: 'Produkt 1', price: 29.99 },
          { id: 2, name: 'Produkt 2', price: 39.99 },
          { id: 3, name: 'Produkt 3', price: 49.99 }
        ];
        
        setData(mockData);
        setIsLoading(false);
      } catch (err) {
        setError('Fehler beim Laden der Daten');
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Spinner size="lg" variant="dots" className="mb-4" />
        <p className="text-gray-600">Daten werden geladen...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">
        {error}
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Produkte</h2>
      <ul className="divide-y divide-gray-200">
        {data.map(product => (
          <li key={product.id} className="py-4">
            <div className="flex justify-between">
              <span className="font-medium">{product.name}</span>
              <span className="text-gray-600">{product.price} €</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Vollbild-Ladezustand

```jsx
function FullscreenLoadingExample() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simuliere Ladezeit
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <Spinner size="xl" variant="ring" color="primary" className="mb-4" />
          <h2 className="text-xl font-bold mb-2">Anwendung wird geladen</h2>
          <p className="text-gray-600">Bitte haben Sie einen Moment Geduld...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Willkommen in der Anwendung</h1>
      <p className="text-gray-600">
        Die Anwendung wurde erfolgreich geladen und ist bereit zur Verwendung.
      </p>
    </div>
  );
}
```

### Spinner in verschiedenen Kontexten

```jsx
function SpinnerContextsExample() {
  return (
    <div className="space-y-8">
      {/* Button mit Spinner */}
      <div>
        <h3 className="text-lg font-medium mb-2">Button mit Spinner</h3>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-md flex items-center">
          <Spinner size="sm" color="light" className="mr-2" />
          Wird verarbeitet...
        </button>
      </div>
      
      {/* Karte mit Spinner */}
      <div>
        <h3 className="text-lg font-medium mb-2">Karte mit Spinner</h3>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-center" style={{ height: '150px' }}>
            <Spinner variant="dots" text="Inhalt wird geladen..." />
          </div>
        </div>
      </div>
      
      {/* Inline-Spinner */}
      <div>
        <h3 className="text-lg font-medium mb-2">Inline-Spinner</h3>
        <p className="flex items-center">
          Daten werden synchronisiert 
          <Spinner size="xs" className="ml-2" />
        </p>
      </div>
      
      {/* Spinner mit Hintergrund */}
      <div>
        <h3 className="text-lg font-medium mb-2">Spinner mit Hintergrund</h3>
        <div className="relative p-6 bg-gray-100 rounded-lg" style={{ height: '150px' }}>
          <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
            <Spinner size="lg" variant="ring" color="primary" />
          </div>
          <p>Dieser Inhalt wird gerade aktualisiert...</p>
        </div>
      </div>
    </div>
  );
}
```