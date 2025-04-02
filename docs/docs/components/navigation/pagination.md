# Pagination

Die Pagination-Komponente ermöglicht die Navigation zwischen Seiten von Inhalten, wie z.B. in Tabellen, Listen oder Suchergebnissen.

## Import

```jsx
import { Pagination } from '@smolitux/core';
```

## Verwendung

### Einfache Pagination

```jsx
<Pagination 
  pageCount={10} 
  currentPage={1} 
  onChange={(page) => console.log(`Navigiere zu Seite ${page}`)} 
/>
```

### Pagination mit verschiedenen Größen

```jsx
<Pagination 
  pageCount={10} 
  currentPage={1} 
  onChange={(page) => console.log(`Seite ${page}`)} 
  size="sm"
  className="mb-4"
/>

<Pagination 
  pageCount={10} 
  currentPage={1} 
  onChange={(page) => console.log(`Seite ${page}`)} 
  size="md"
  className="mb-4"
/>

<Pagination 
  pageCount={10} 
  currentPage={1} 
  onChange={(page) => console.log(`Seite ${page}`)} 
  size="lg"
/>
```

### Pagination mit verschiedenen Varianten

```jsx
<Pagination 
  pageCount={10} 
  currentPage={1} 
  onChange={(page) => console.log(`Seite ${page}`)} 
  variant="outlined"
  className="mb-4"
/>

<Pagination 
  pageCount={10} 
  currentPage={1} 
  onChange={(page) => console.log(`Seite ${page}`)} 
  variant="filled"
  className="mb-4"
/>

<Pagination 
  pageCount={10} 
  currentPage={1} 
  onChange={(page) => console.log(`Seite ${page}`)} 
  variant="simple"
/>
```

### Pagination mit angepasster Anzahl von Geschwister-Seiten

```jsx
<Pagination 
  pageCount={20} 
  currentPage={10} 
  onChange={(page) => console.log(`Seite ${page}`)} 
  siblingCount={1} // Zeigt 1 Seite links und rechts von der aktuellen Seite
  className="mb-4"
/>

<Pagination 
  pageCount={20} 
  currentPage={10} 
  onChange={(page) => console.log(`Seite ${page}`)} 
  siblingCount={2} // Zeigt 2 Seiten links und rechts von der aktuellen Seite
/>
```

### Pagination ohne Erste/Letzte-Buttons

```jsx
<Pagination 
  pageCount={10} 
  currentPage={5} 
  onChange={(page) => console.log(`Seite ${page}`)} 
  showFirstLast={false}
/>
```

### Pagination ohne Vorherige/Nächste-Buttons

```jsx
<Pagination 
  pageCount={10} 
  currentPage={5} 
  onChange={(page) => console.log(`Seite ${page}`)} 
  showPrevNext={false}
/>
```

### Pagination mit Seitenanzahl-Anzeige

```jsx
<Pagination 
  pageCount={10} 
  currentPage={5} 
  onChange={(page) => console.log(`Seite ${page}`)} 
  showPageCount
/>
```

### Deaktivierte Pagination

```jsx
<Pagination 
  pageCount={10} 
  currentPage={5} 
  onChange={(page) => console.log(`Seite ${page}`)} 
  disabled
/>
```

### Pagination mit benutzerdefinierten Labels

```jsx
<Pagination 
  pageCount={10} 
  currentPage={5} 
  onChange={(page) => console.log(`Seite ${page}`)} 
  labels={{
    previous: 'Zurück',
    next: 'Weiter',
    first: 'Erste',
    last: 'Letzte',
    page: 'Seite'
  }}
/>
```

### Pagination mit benutzerdefinierten Icons

```jsx
<Pagination 
  pageCount={10} 
  currentPage={5} 
  onChange={(page) => console.log(`Seite ${page}`)} 
  icons={{
    previous: <ArrowLeftIcon className="w-4 h-4" />,
    next: <ArrowRightIcon className="w-4 h-4" />,
    first: <ChevronsLeftIcon className="w-4 h-4" />,
    last: <ChevronsRightIcon className="w-4 h-4" />
  }}
/>
```

### Kontrollierte Pagination

```jsx
function ControlledPaginationExample() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  return (
    <div>
      <p className="mb-2">Aktuelle Seite: {currentPage}</p>
      
      <Pagination 
        pageCount={10} 
        currentPage={currentPage} 
        onChange={handlePageChange} 
      />
      
      <div className="mt-4">
        <button 
          className="px-4 py-2 bg-gray-200 rounded mr-2"
          onClick={() => setCurrentPage(1)}
        >
          Zur ersten Seite
        </button>
        
        <button 
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => setCurrentPage(10)}
        >
          Zur letzten Seite
        </button>
      </div>
    </div>
  );
}
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `pageCount` | `number` | - | Anzahl der Seiten insgesamt |
| `currentPage` | `number` | - | Aktuelle Seite (1-basiert) |
| `onChange` | `(page: number) => void` | - | Callback bei Seitenwechsel |
| `siblingCount` | `number` | `1` | Anzahl der angezeigten Seiten links und rechts von der aktuellen Seite |
| `showFirstLast` | `boolean` | `true` | Zeigt erste/letzte Seite |
| `showPrevNext` | `boolean` | `true` | Zeigt Buttons für vorherige/nächste Seite |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Größe der Pagination |
| `variant` | `'outlined' \| 'filled' \| 'simple'` | `'outlined'` | Variante der Pagination |
| `disabled` | `boolean` | `false` | Deaktiviert die Pagination |
| `showPageCount` | `boolean` | `false` | Zeigt die Gesamtzahl der Seiten an |
| `labels` | `object` | - | Benutzerdefinierte Texte |
| `icons` | `object` | - | Benutzerdefinierte Icons |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### Labels Object

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `previous` | `string` | `'Previous'` | Text für den "Vorherige"-Button |
| `next` | `string` | `'Next'` | Text für den "Nächste"-Button |
| `first` | `string` | `'First'` | Text für den "Erste"-Button |
| `last` | `string` | `'Last'` | Text für den "Letzte"-Button |
| `page` | `string` | `'Page'` | Text für die Seitenbezeichnung |

### Icons Object

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `previous` | `ReactNode` | - | Icon für den "Vorherige"-Button |
| `next` | `ReactNode` | - | Icon für den "Nächste"-Button |
| `first` | `ReactNode` | - | Icon für den "Erste"-Button |
| `last` | `ReactNode` | - | Icon für den "Letzte"-Button |

## Barrierefreiheit

Die Pagination-Komponente ist für Barrierefreiheit optimiert:

- Verwendet semantisch korrekte Elemente
- Unterstützt Tastaturnavigation
- Enthält ARIA-Attribute für bessere Screenreader-Unterstützung
- Bietet visuelle Hinweise für den aktuellen Zustand

## Beispiele

### Produktliste mit Pagination

```jsx
function ProductListWithPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const productsPerPage = 5;
  const totalProducts = 50;
  const pageCount = Math.ceil(totalProducts / productsPerPage);
  
  // Simuliere das Laden von Produkten
  useEffect(() => {
    setLoading(true);
    
    // Simuliere API-Aufruf
    setTimeout(() => {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      
      const newProducts = Array.from({ length: productsPerPage }, (_, i) => ({
        id: startIndex + i + 1,
        name: `Produkt ${startIndex + i + 1}`,
        price: Math.floor(Math.random() * 100) + 10,
        stock: Math.floor(Math.random() * 50)
      }));
      
      setProducts(newProducts);
      setLoading(false);
    }, 500);
  }, [currentPage]);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // In einer echten Anwendung würde hier ein API-Aufruf erfolgen
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Produkte</h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary-500 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lagerbestand</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map(product => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.price} €</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.stock > 20 ? 'bg-green-100 text-green-800' : 
                      product.stock > 5 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Zeige {(currentPage - 1) * productsPerPage + 1} bis {Math.min(currentPage * productsPerPage, totalProducts)} von {totalProducts} Produkten
        </div>
        
        <Pagination 
          pageCount={pageCount} 
          currentPage={currentPage} 
          onChange={handlePageChange} 
        />
      </div>
    </div>
  );
}
```

### Blog-Beiträge mit Pagination

```jsx
function BlogWithPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const posts = [
    { id: 1, title: 'Einführung in React', excerpt: 'Eine Einführung in die Grundlagen von React...', date: '2023-05-15' },
    { id: 2, title: 'Fortgeschrittene React-Konzepte', excerpt: 'Tauchen Sie tiefer in React ein mit Hooks und Context...', date: '2023-05-20' },
    { id: 3, title: 'React Performance-Optimierung', excerpt: 'Tipps und Tricks zur Optimierung Ihrer React-Anwendung...', date: '2023-05-25' },
    { id: 4, title: 'React und TypeScript', excerpt: 'Die Vorteile der Verwendung von TypeScript mit React...', date: '2023-06-01' },
    { id: 5, title: 'State Management in React', excerpt: 'Verschiedene Ansätze für das State Management in React...', date: '2023-06-05' },
    { id: 6, title: 'React Router', excerpt: 'Navigation in React-Anwendungen mit React Router...', date: '2023-06-10' },
    { id: 7, title: 'React Testing', excerpt: 'Strategien und Tools zum Testen von React-Komponenten...', date: '2023-06-15' },
    { id: 8, title: 'React und APIs', excerpt: 'Wie man externe APIs in React-Anwendungen integriert...', date: '2023-06-20' },
    { id: 9, title: 'React Styling', excerpt: 'Verschiedene Ansätze zum Styling von React-Komponenten...', date: '2023-06-25' },
    { id: 10, title: 'React Best Practices', excerpt: 'Bewährte Praktiken für die Entwicklung mit React...', date: '2023-07-01' }
  ];
  
  const postsPerPage = 3;
  const pageCount = Math.ceil(posts.length / postsPerPage);
  
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      
      <div className="space-y-8">
        {currentPosts.map(post => (
          <article key={post.id} className="border-b pb-6">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-500 text-sm mb-2">{post.date}</p>
            <p className="text-gray-700 mb-4">{post.excerpt}</p>
            <a href="#" className="text-primary-600 hover:text-primary-800">
              Weiterlesen →
            </a>
          </article>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <Pagination 
          pageCount={pageCount} 
          currentPage={currentPage} 
          onChange={handlePageChange} 
          variant="filled"
        />
      </div>
    </div>
  );
}
```

### Suchergebnisse mit Pagination

```jsx
function SearchResultsWithPagination() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const resultsPerPage = 5;
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setCurrentPage(1);
      performSearch(query, 1);
    }
  };
  
  const performSearch = (searchQuery, page) => {
    setLoading(true);
    
    // Simuliere API-Aufruf
    setTimeout(() => {
      // Generiere zufällige Ergebnisse basierend auf der Suchanfrage
      const total = Math.floor(Math.random() * 50) + 10;
      const searchResults = Array.from({ length: Math.min(resultsPerPage, total - (page - 1) * resultsPerPage) }, (_, i) => ({
        id: (page - 1) * resultsPerPage + i + 1,
        title: `Ergebnis für "${searchQuery}" #${(page - 1) * resultsPerPage + i + 1}`,
        description: `Dies ist ein Beispielergebnis für die Suchanfrage "${searchQuery}". Es enthält einige relevante Informationen.`,
        url: `https://example.com/result-${(page - 1) * resultsPerPage + i + 1}`
      }));
      
      setResults(searchResults);
      setTotalResults(total);
      setLoading(false);
    }, 800);
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    performSearch(query, page);
  };
  
  const pageCount = Math.ceil(totalResults / resultsPerPage);
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Suche</h1>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suchbegriff eingeben..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700"
          >
            Suchen
          </button>
        </div>
      </form>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary-500 rounded-full border-t-transparent"></div>
        </div>
      ) : results.length > 0 ? (
        <div>
          <p className="text-sm text-gray-500 mb-4">
            {totalResults} Ergebnisse für "{query}"
          </p>
          
          <div className="space-y-6">
            {results.map(result => (
              <div key={result.id} className="border-b pb-4">
                <h2 className="text-lg font-medium text-primary-600 mb-1">
                  <a href={result.url} className="hover:underline">
                    {result.title}
                  </a>
                </h2>
                <p className="text-sm text-green-700 mb-1">{result.url}</p>
                <p className="text-gray-700">{result.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <Pagination 
              pageCount={pageCount} 
              currentPage={currentPage} 
              onChange={handlePageChange} 
              showPageCount
            />
          </div>
        </div>
      ) : query && !loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Keine Ergebnisse für "{query}" gefunden.</p>
        </div>
      ) : null}
    </div>
  );
}
```