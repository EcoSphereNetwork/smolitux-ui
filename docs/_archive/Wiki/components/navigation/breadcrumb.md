# Breadcrumb

Die Breadcrumb-Komponente zeigt den Navigationspfad an und ermöglicht es Benutzern, zu übergeordneten Seiten zurückzukehren.

## Import

```jsx
import { Breadcrumb } from '@smolitux/core';
```

## Verwendung

### Einfache Breadcrumb

```jsx
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Produkte', href: '/products' },
    { label: 'Kategorie', href: '/products/category' },
    { label: 'Produkt', active: true }
  ]}
/>
```

### Breadcrumb mit benutzerdefiniertem Trennzeichen

```jsx
<Breadcrumb
  separator={<span className="mx-2">/</span>}
  items={[
    { label: 'Home', href: '/' },
    { label: 'Produkte', href: '/products' },
    { label: 'Kategorie', href: '/products/category' },
    { label: 'Produkt', active: true }
  ]}
/>
```

### Breadcrumb mit Icons

```jsx
import { HomeIcon, TagIcon, ShoppingCartIcon } from '@heroicons/react/outline';

<Breadcrumb
  items={[
    { label: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4 mr-1" /> },
    { label: 'Produkte', href: '/products', icon: <TagIcon className="w-4 h-4 mr-1" /> },
    { label: 'Warenkorb', active: true, icon: <ShoppingCartIcon className="w-4 h-4 mr-1" /> }
  ]}
/>
```

### Breadcrumb mit Home-Icon

```jsx
<Breadcrumb
  showHomeIcon
  items={[
    { label: 'Home', href: '/' },
    { label: 'Produkte', href: '/products' },
    { label: 'Kategorie', active: true }
  ]}
/>
```

### Breadcrumb mit Kollabierung

```jsx
<Breadcrumb
  maxItems={4}
  itemsBeforeCollapse={1}
  itemsAfterCollapse={2}
  items={[
    { label: 'Home', href: '/' },
    { label: 'Produkte', href: '/products' },
    { label: 'Kategorie', href: '/products/category' },
    { label: 'Unterkategorie', href: '/products/category/subcategory' },
    { label: 'Produkt', href: '/products/category/subcategory/product' },
    { label: 'Details', active: true }
  ]}
/>
```

### Breadcrumb mit benutzerdefiniertem Expand-Icon

```jsx
<Breadcrumb
  maxItems={3}
  expandIcon={<span className="mx-2">•••</span>}
  items={[
    { label: 'Home', href: '/' },
    { label: 'Produkte', href: '/products' },
    { label: 'Kategorie', href: '/products/category' },
    { label: 'Unterkategorie', href: '/products/category/subcategory' },
    { label: 'Produkt', active: true }
  ]}
/>
```

### Breadcrumb mit React Router

```jsx
import { Link } from 'react-router-dom';

<Breadcrumb
  LinkComponent={Link}
  items={[
    { label: 'Home', href: '/' },
    { label: 'Produkte', href: '/products' },
    { label: 'Kategorie', active: true }
  ]}
/>
```

## Props

### Breadcrumb Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `items` | `BreadcrumbItem[]` | - | Array von Breadcrumb-Items |
| `separator` | `ReactNode` | `>` | Benutzerdefiniertes Trennzeichen |
| `maxItems` | `number` | - | Maximal anzuzeigende Items (bei Überschreitung wird ein "..." angezeigt) |
| `itemsAfterCollapse` | `number` | `1` | Anzahl der letzten Items, die immer angezeigt werden |
| `itemsBeforeCollapse` | `number` | `1` | Anzahl der ersten Items, die immer angezeigt werden |
| `expandIcon` | `ReactNode` | `...` | Benutzerdefiniertes "..." Element |
| `showHomeIcon` | `boolean` | `false` | Home-Element hinzufügen |
| `homeIcon` | `ReactNode` | `<HomeIcon />` | Home-Icon |
| `homeHref` | `string` | `/` | Home-Link |
| `itemClassName` | `string` | - | Benutzerdefinierte Klasse für ein Element |
| `activeItemClassName` | `string` | - | Benutzerdefinierte Klasse für aktives Element |
| `LinkComponent` | `ElementType` | `'a'` | Benutzerdefinierte Link-Komponente (z.B. von React Router) |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### BreadcrumbItem Interface

| Eigenschaft | Typ | Beschreibung |
|-------------|-----|-------------|
| `label` | `ReactNode` | Link-Text |
| `href` | `string` | Link-Ziel (wenn nicht angegeben, wird kein Link dargestellt) |
| `icon` | `ReactNode` | Icon vor dem Label |
| `linkProps` | `AnchorHTMLAttributes<HTMLAnchorElement>` | Zusätzliche Eigenschaften für das Link-Element |
| `active` | `boolean` | Ist das Element aktiv/aktuell? |

## Barrierefreiheit

Die Breadcrumb-Komponente ist für Barrierefreiheit optimiert:

- Verwendet die korrekte `nav` und `ol` Semantik
- Enthält `aria-current="page"` für das aktive Element
- Trennzeichen werden mit `aria-hidden="true"` versehen
- Unterstützt Tastaturnavigation

## Beispiele

### Dynamische Breadcrumb basierend auf dem Pfad

```jsx
function DynamicBreadcrumb({ path }) {
  // Pfad in Segmente aufteilen
  const segments = path.split('/').filter(Boolean);
  
  // Breadcrumb-Items erstellen
  const items = [
    { label: 'Home', href: '/' }
  ];
  
  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Titel formatieren (erste Buchstabe groß, Bindestriche durch Leerzeichen ersetzen)
    const formattedTitle = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
    
    items.push({
      label: formattedTitle,
      href: currentPath,
      active: index === segments.length - 1
    });
  });
  
  return <Breadcrumb items={items} />;
}

// Verwendung
<DynamicBreadcrumb path="/products/electronics/smartphones" />
```

### Breadcrumb mit Dropdown für lange Pfade

```jsx
function BreadcrumbWithDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleExpandClick = () => {
    setIsOpen(!isOpen);
  };
  
  const fullItems = [
    { label: 'Home', href: '/' },
    { label: 'Produkte', href: '/products' },
    { label: 'Elektronik', href: '/products/electronics' },
    { label: 'Computer', href: '/products/electronics/computers' },
    { label: 'Laptops', href: '/products/electronics/computers/laptops' },
    { label: 'Gaming', href: '/products/electronics/computers/laptops/gaming' },
    { label: 'Produkt XYZ', active: true }
  ];
  
  const collapsedItems = [
    fullItems[0],
    {
      label: (
        <button 
          onClick={handleExpandClick}
          className="flex items-center text-blue-600 hover:underline"
        >
          <span>...</span>
          <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      ),
      href: undefined
    },
    fullItems[fullItems.length - 2],
    fullItems[fullItems.length - 1]
  ];
  
  return (
    <div className="relative">
      <Breadcrumb items={isOpen ? fullItems : collapsedItems} />
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md p-2 z-10">
          <ul className="space-y-1">
            {fullItems.slice(1, -2).map((item, index) => (
              <li key={index}>
                <a 
                  href={item.href} 
                  className="block px-4 py-2 hover:bg-gray-100 rounded text-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

### Breadcrumb mit Schema.org Markup

```jsx
function SEOBreadcrumb({ items }) {
  // JSON-LD für Suchmaschinen
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href
    }))
  };
  
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      
      <Breadcrumb items={items} />
    </>
  );
}

// Verwendung
<SEOBreadcrumb 
  items={[
    { label: 'Home', href: 'https://example.com/' },
    { label: 'Produkte', href: 'https://example.com/products' },
    { label: 'Kategorie', href: 'https://example.com/products/category' },
    { label: 'Produkt', active: true }
  ]}
/>
```