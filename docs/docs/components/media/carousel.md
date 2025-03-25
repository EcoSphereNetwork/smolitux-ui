# Carousel

Die Carousel-Komponente ermöglicht das Anzeigen von Inhalten in einer interaktiven Slideshow. Sie unterstützt verschiedene Animationen, automatisches Abspielen und Swipe-Gesten.

## Import

```jsx
import { Carousel } from '@smolitux/core';
```

## Verwendung

### Einfaches Carousel

```jsx
const items = [
  {
    id: '1',
    content: <img src="/images/slide1.jpg" alt="Slide 1" className="w-full h-full object-cover" />
  },
  {
    id: '2',
    content: <img src="/images/slide2.jpg" alt="Slide 2" className="w-full h-full object-cover" />
  },
  {
    id: '3',
    content: <img src="/images/slide3.jpg" alt="Slide 3" className="w-full h-full object-cover" />
  }
];

<Carousel items={items} />
```

### Carousel mit Seitenverhältnis

```jsx
<Carousel 
  items={items} 
  aspectRatio="16:9" 
/>
```

### Carousel mit automatischem Wechsel

```jsx
<Carousel 
  items={items} 
  autoPlay={5000} // Wechsel alle 5 Sekunden
  pauseOnHover
/>
```

### Carousel mit benutzerdefinierten Pfeilen

```jsx
<Carousel 
  items={items} 
  customArrows={{
    prev: <button className="bg-white p-2 rounded-full shadow">←</button>,
    next: <button className="bg-white p-2 rounded-full shadow">→</button>
  }}
/>
```

### Carousel ohne Indikatoren

```jsx
<Carousel 
  items={items} 
  showIndicators={false}
/>
```

### Carousel mit Thumbnail-Indikatoren

```jsx
<Carousel 
  items={items} 
  thumbnails
/>
```

### Carousel mit Fade-Animation

```jsx
<Carousel 
  items={items} 
  animation="fade"
/>
```

### Kontrolliertes Carousel

```jsx
function ControlledCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const items = [
    {
      id: '1',
      content: <img src="/images/slide1.jpg" alt="Slide 1" className="w-full h-full object-cover" />
    },
    {
      id: '2',
      content: <img src="/images/slide2.jpg" alt="Slide 2" className="w-full h-full object-cover" />
    },
    {
      id: '3',
      content: <img src="/images/slide3.jpg" alt="Slide 3" className="w-full h-full object-cover" />
    }
  ];
  
  return (
    <div>
      <Carousel 
        items={items} 
        activeIndex={activeIndex}
        onChange={setActiveIndex}
      />
      
      <div className="mt-4 flex justify-center space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${
              activeIndex === index ? 'bg-primary-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `items` | `CarouselItem[]` | - | Items im Carousel |
| `activeIndex` | `number` | - | Gewählter Item-Index (kontrollierter Modus) |
| `defaultActiveIndex` | `number` | `0` | Standard-Item-Index |
| `onChange` | `(index: number) => void` | - | Callback bei Änderung des aktiven Items |
| `aspectRatio` | `'1:1' \| '4:3' \| '16:9' \| '21:9' \| string` | - | Verhältnis der Höhe zur Breite |
| `autoPlay` | `number` | `0` | Automatischer Wechsel in ms (0 für deaktiviert) |
| `pauseOnHover` | `boolean` | `true` | Pausieren bei Hover |
| `infinite` | `boolean` | `true` | Infinite Scrolling |
| `showArrows` | `boolean` | `true` | Navigationspfeile anzeigen |
| `showIndicators` | `boolean` | `true` | Indikatoren anzeigen |
| `thumbnails` | `boolean` | `false` | Indikatoren als Thumbnails anzeigen |
| `animation` | `'slide' \| 'fade' \| 'none'` | `'slide'` | Slide-Animation |
| `enableSwipe` | `boolean` | `true` | Swipe-Gesten aktivieren |
| `customArrows` | `{ prev?: ReactNode; next?: ReactNode }` | - | Benutzerdefinierte Pfeil-Komponenten |
| `onAutoplayStart` | `() => void` | - | Callback beim Start des Autoplay |
| `onAutoplayStop` | `() => void` | - | Callback beim Stopp des Autoplay |
| `disabled` | `boolean` | `false` | Ist das Carousel deaktiviert? |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### CarouselItem Interface

| Eigenschaft | Typ | Beschreibung |
|-------------|-----|-------------|
| `id` | `string` | Eindeutige ID des Items |
| `content` | `ReactNode` | Der anzuzeigende Inhalt |
| `ariaLabel` | `string` | Beschreibungstext für Barrierefreiheit |

## Barrierefreiheit

Die Carousel-Komponente ist für Barrierefreiheit optimiert:

- Korrekte ARIA-Attribute für Slides und Steuerelemente
- Tastaturnavigation mit Pfeiltasten
- Unterstützung für Screenreader durch beschreibende Labels
- Autoplay kann mit der Tastatur pausiert werden

## Beispiele

### Produktkarussell

```jsx
const products = [
  {
    id: 'p1',
    name: 'Produkt 1',
    price: '€29,99',
    image: '/images/product1.jpg'
  },
  {
    id: 'p2',
    name: 'Produkt 2',
    price: '€39,99',
    image: '/images/product2.jpg'
  },
  {
    id: 'p3',
    name: 'Produkt 3',
    price: '€49,99',
    image: '/images/product3.jpg'
  },
  {
    id: 'p4',
    name: 'Produkt 4',
    price: '€59,99',
    image: '/images/product4.jpg'
  }
];

function ProductCarousel() {
  const items = products.map(product => ({
    id: product.id,
    content: (
      <div className="p-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover rounded-lg"
        />
        <h3 className="mt-2 text-lg font-medium">{product.name}</h3>
        <p className="text-primary-600 font-bold">{product.price}</p>
        <button className="mt-2 w-full py-2 bg-primary-500 text-white rounded">
          In den Warenkorb
        </button>
      </div>
    ),
    ariaLabel: `Produkt: ${product.name}, Preis: ${product.price}`
  }));
  
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Empfohlene Produkte</h2>
      <Carousel 
        items={items} 
        autoPlay={5000}
        pauseOnHover
      />
    </div>
  );
}
```

### Testimonial-Karussell

```jsx
const testimonials = [
  {
    id: 't1',
    name: 'Max Mustermann',
    role: 'CEO, Beispiel GmbH',
    quote: 'Diese Komponente hat unsere Entwicklungszeit halbiert. Absolut empfehlenswert!',
    avatar: '/images/avatar1.jpg'
  },
  {
    id: 't2',
    name: 'Erika Musterfrau',
    role: 'CTO, Tech AG',
    quote: 'Die beste UI-Bibliothek, die ich je verwendet habe. Einfach zu integrieren und sehr flexibel.',
    avatar: '/images/avatar2.jpg'
  },
  {
    id: 't3',
    name: 'John Doe',
    role: 'Designer, Creative Studio',
    quote: 'Als Designer schätze ich die Konsistenz und Anpassungsfähigkeit dieser Komponenten.',
    avatar: '/images/avatar3.jpg'
  }
];

function TestimonialCarousel() {
  const items = testimonials.map(testimonial => ({
    id: testimonial.id,
    content: (
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name} 
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
        <blockquote className="text-lg italic mb-4">"{testimonial.quote}"</blockquote>
        <div className="font-medium">{testimonial.name}</div>
        <div className="text-gray-500 text-sm">{testimonial.role}</div>
      </div>
    ),
    ariaLabel: `Testimonial von ${testimonial.name}, ${testimonial.role}`
  }));
  
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Was unsere Kunden sagen</h2>
      <Carousel 
        items={items} 
        animation="fade"
        autoPlay={8000}
        showArrows={false}
      />
    </div>
  );
}
```

### Bildergalerie mit Thumbnails

```jsx
const images = [
  {
    id: 'img1',
    src: '/images/gallery1.jpg',
    alt: 'Galeriebild 1',
    thumbnail: '/images/gallery1-thumb.jpg'
  },
  {
    id: 'img2',
    src: '/images/gallery2.jpg',
    alt: 'Galeriebild 2',
    thumbnail: '/images/gallery2-thumb.jpg'
  },
  {
    id: 'img3',
    src: '/images/gallery3.jpg',
    alt: 'Galeriebild 3',
    thumbnail: '/images/gallery3-thumb.jpg'
  },
  {
    id: 'img4',
    src: '/images/gallery4.jpg',
    alt: 'Galeriebild 4',
    thumbnail: '/images/gallery4-thumb.jpg'
  }
];

function GalleryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const items = images.map(image => ({
    id: image.id,
    content: (
      <div className="flex items-center justify-center bg-black">
        <img 
          src={image.src} 
          alt={image.alt} 
          className="max-h-[500px] max-w-full object-contain"
        />
      </div>
    ),
    ariaLabel: image.alt
  }));
  
  return (
    <div className="max-w-3xl mx-auto">
      <Carousel 
        items={items} 
        activeIndex={activeIndex}
        onChange={setActiveIndex}
        aspectRatio="16:9"
        showIndicators={false}
      />
      
      <div className="mt-4 grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            className={`p-1 ${activeIndex === index ? 'ring-2 ring-primary-500' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <img 
              src={image.thumbnail} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-full h-16 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
```

### Fullscreen-Carousel

```jsx
function FullscreenCarousel() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const items = [
    {
      id: '1',
      content: <img src="/images/landscape1.jpg" alt="Landschaft 1" className="w-full h-full object-cover" />
    },
    {
      id: '2',
      content: <img src="/images/landscape2.jpg" alt="Landschaft 2" className="w-full h-full object-cover" />
    },
    {
      id: '3',
      content: <img src="/images/landscape3.jpg" alt="Landschaft 3" className="w-full h-full object-cover" />
    }
  ];
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      <Carousel 
        items={items} 
        aspectRatio={isFullscreen ? undefined : '16:9'}
        className={isFullscreen ? 'h-full' : ''}
      />
      
      <button
        className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded"
        onClick={toggleFullscreen}
      >
        {isFullscreen ? 'Vollbild beenden' : 'Vollbild'}
      </button>
    </div>
  );
}
```