# Slider

Die Slider-Komponente ermöglicht es Benutzern, einen Wert innerhalb eines bestimmten Bereichs auszuwählen, indem sie einen Schieberegler entlang einer Leiste bewegen.

## Import

```jsx
import { Slider } from '@smolitux/core';
```

## Verwendung

### Einfacher Slider

```jsx
<Slider defaultValue={50} />
```

### Slider mit Min/Max-Werten

```jsx
<Slider min={0} max={100} defaultValue={30} />
```

### Slider mit Schrittgröße

```jsx
<Slider min={0} max={100} step={10} defaultValue={30} />
```

### Slider mit Label

```jsx
<Slider label="Lautstärke" defaultValue={70} />
```

### Slider mit verschiedenen Größen

```jsx
<Slider size="xs" defaultValue={20} className="mb-4" />
<Slider size="sm" defaultValue={30} className="mb-4" />
<Slider size="md" defaultValue={40} className="mb-4" />
<Slider size="lg" defaultValue={50} className="mb-4" />
<Slider size="xl" defaultValue={60} />
```

### Slider mit verschiedenen Varianten

```jsx
<Slider variant="solid" defaultValue={20} className="mb-4" />
<Slider variant="outline" defaultValue={30} className="mb-4" />
<Slider variant="filled" defaultValue={40} className="mb-4" />
<Slider variant="minimal" defaultValue={50} />
```

### Slider mit verschiedenen Farbschemata

```jsx
<Slider colorScheme="primary" defaultValue={20} className="mb-4" />
<Slider colorScheme="secondary" defaultValue={30} className="mb-4" />
<Slider colorScheme="success" defaultValue={40} className="mb-4" />
<Slider colorScheme="danger" defaultValue={50} className="mb-4" />
<Slider colorScheme="warning" defaultValue={60} className="mb-4" />
<Slider colorScheme="info" defaultValue={70} className="mb-4" />
<Slider colorScheme="neutral" defaultValue={80} />
```

### Vertikaler Slider

```jsx
<div style={{ height: '200px' }}>
  <Slider orientation="vertical" defaultValue={50} />
</div>
```

### Slider mit Markierungen

```jsx
const marks = [
  { value: 0, label: '0°C' },
  { value: 25, label: '25°C' },
  { value: 50, label: '50°C' },
  { value: 75, label: '75°C' },
  { value: 100, label: '100°C' }
];

<Slider 
  defaultValue={50} 
  min={0} 
  max={100} 
  marks={marks} 
/>
```

### Slider mit benutzerdefinierten Markierungspositionen

```jsx
<Slider 
  defaultValue={50} 
  min={0} 
  max={100} 
  marks={marks} 
  markPosition="below" 
/>
```

### Slider mit Wertanzeige

```jsx
<Slider 
  defaultValue={50} 
  showValue 
  valuePosition="above" 
/>
```

### Slider mit Tooltip-Wertanzeige

```jsx
<Slider 
  defaultValue={50} 
  showValue 
  valuePosition="tooltip" 
/>
```

### Slider mit benutzerdefinierten Thumb-Formen

```jsx
<Slider 
  defaultValue={50} 
  thumbShape="square" 
  className="mb-4" 
/>

<Slider 
  defaultValue={50} 
  thumbShape="rectangle" 
  className="mb-4" 
/>

<Slider 
  defaultValue={50} 
  thumbShape="diamond" 
/>
```

### Slider mit benutzerdefinierten Track-Formen

```jsx
<Slider 
  defaultValue={50} 
  trackShape="square" 
/>
```

### Slider mit Hilfetext

```jsx
<Slider 
  label="Bildqualität" 
  defaultValue={70} 
  helperText="Höhere Werte bedeuten bessere Qualität, aber größere Dateien." 
/>
```

### Slider mit Fehlermeldung

```jsx
<Slider 
  label="Temperatur" 
  defaultValue={90} 
  error="Die Temperatur ist zu hoch!" 
/>
```

### Slider mit Erfolgsmeldung

```jsx
<Slider 
  label="Energieverbrauch" 
  defaultValue={30} 
  successMessage="Niedriger Energieverbrauch!" 
/>
```

### Kontrollierter Slider

```jsx
function ControlledSliderExample() {
  const [value, setValue] = useState(50);
  
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  
  return (
    <div>
      <Slider 
        label="Kontrollierter Slider" 
        value={value} 
        onChange={handleChange} 
      />
      <p className="mt-2">
        Aktueller Wert: {value}
      </p>
    </div>
  );
}
```

### Slider mit benutzerdefinierten Ereignissen

```jsx
function EventSliderExample() {
  const [status, setStatus] = useState('Bereit');
  
  const handleChangeStart = (value) => {
    setStatus(`Ziehen gestartet bei ${value}`);
  };
  
  const handleChange = (value) => {
    setStatus(`Aktueller Wert: ${value}`);
  };
  
  const handleChangeEnd = (value) => {
    setStatus(`Ziehen beendet bei ${value}`);
  };
  
  return (
    <div>
      <Slider 
        defaultValue={50} 
        onChangeStart={handleChangeStart}
        onChange={handleChange}
        onChangeEnd={handleChangeEnd}
      />
      <p className="mt-2">
        Status: {status}
      </p>
    </div>
  );
}
```

### Slider mit benutzerdefiniertem Wertformat

```jsx
<Slider 
  defaultValue={50} 
  showValue 
  valueFormat={(value) => `${value}%`} 
/>
```

### Slider mit benutzerdefiniertem Thumb

```jsx
<Slider 
  defaultValue={50} 
  thumbShape="custom" 
  customThumb={
    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs">
      ↔️
    </div>
  } 
/>
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `value` | `number` | - | Aktueller Wert des Sliders |
| `defaultValue` | `number` | `0` | Standardwert des Sliders |
| `min` | `number` | `0` | Minimaler Wert des Sliders |
| `max` | `number` | `100` | Maximaler Wert des Sliders |
| `step` | `number` | `1` | Schrittgröße des Sliders |
| `onChange` | `(value: number) => void` | - | Callback bei Änderung des Werts |
| `onChangeStart` | `(value: number) => void` | - | Callback bei Start des Ziehens |
| `onChangeEnd` | `(value: number) => void` | - | Callback bei Ende des Ziehens |
| `label` | `ReactNode` | - | Text-Label |
| `helperText` | `ReactNode` | - | Hilfetext |
| `error` | `ReactNode` | - | Fehlermeldung |
| `successMessage` | `ReactNode` | - | Erfolgsmeldung |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Größe des Sliders |
| `variant` | `'solid' \| 'outline' \| 'filled' \| 'minimal'` | `'solid'` | Visuelle Variante |
| `colorScheme` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Farbe des Sliders |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Ausrichtung des Sliders |
| `thumbShape` | `'circle' \| 'square' \| 'rectangle' \| 'diamond' \| 'custom'` | `'circle'` | Form des Schiebereglers |
| `trackShape` | `'rounded' \| 'square' \| 'custom'` | `'rounded'` | Form der Leiste |
| `marks` | `SliderMark[]` | - | Markierungen auf der Leiste |
| `markPosition` | `'above' \| 'below' \| 'left' \| 'right'` | `'above'` | Position der Markierungen |
| `showValue` | `boolean` | `false` | Wert anzeigen |
| `valuePosition` | `'above' \| 'below' \| 'left' \| 'right' \| 'tooltip'` | `'above'` | Position der Wertanzeige |
| `valueFormat` | `(value: number) => string` | - | Formatierung des angezeigten Werts |
| `customThumb` | `ReactNode` | - | Benutzerdefinierter Schieberegler |
| `customTrack` | `ReactNode` | - | Benutzerdefinierte Leiste |
| `isDisabled` | `boolean` | - | Ob der Slider deaktiviert ist |
| `isReadOnly` | `boolean` | - | Ob der Slider schreibgeschützt ist |
| `isRequired` | `boolean` | - | Ob der Slider erforderlich ist |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### SliderMark Interface

| Eigenschaft | Typ | Beschreibung |
|-------------|-----|-------------|
| `value` | `number` | Wert der Markierung |
| `label` | `ReactNode` | Label der Markierung |
| `style` | `CSSProperties` | Benutzerdefinierte Styles für die Markierung |
| `className` | `string` | Zusätzliche CSS-Klassen für die Markierung |

## Barrierefreiheit

Die Slider-Komponente ist für Barrierefreiheit optimiert:

- Verwendet native `<input type="range">` Elemente für korrekte Semantik
- Unterstützt Tastaturnavigation (Pfeiltasten, Home, End)
- Korrekte ARIA-Attribute (`aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-orientation`)
- Ausreichender Kontrast zwischen Vorder- und Hintergrund

## Beispiele

### Farbwähler mit RGB-Slidern

```jsx
function RGBColorPickerExample() {
  const [color, setColor] = useState({ r: 100, g: 100, b: 100 });
  
  const handleChange = (channel) => (value) => {
    setColor(prev => ({
      ...prev,
      [channel]: value
    }));
  };
  
  const rgbColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
  
  return (
    <div className="max-w-md">
      <h2 className="text-xl font-bold mb-4">RGB-Farbwähler</h2>
      
      <div className="mb-6 h-24 rounded-lg" style={{ backgroundColor: rgbColor }}></div>
      
      <div className="space-y-4">
        <Slider 
          label="R (Rot)" 
          min={0} 
          max={255} 
          value={color.r} 
          onChange={handleChange('r')} 
          colorScheme="danger"
          showValue
          valuePosition="tooltip"
        />
        
        <Slider 
          label="G (Grün)" 
          min={0} 
          max={255} 
          value={color.g} 
          onChange={handleChange('g')} 
          colorScheme="success"
          showValue
          valuePosition="tooltip"
        />
        
        <Slider 
          label="B (Blau)" 
          min={0} 
          max={255} 
          value={color.b} 
          onChange={handleChange('b')} 
          colorScheme="info"
          showValue
          valuePosition="tooltip"
        />
      </div>
      
      <div className="mt-4 p-2 bg-gray-100 rounded font-mono text-sm">
        {rgbColor}
      </div>
    </div>
  );
}
```

### Preis-Range-Slider

```jsx
function PriceRangeSliderExample() {
  const [priceRange, setPriceRange] = useState([200, 800]);
  
  const handleMinChange = (value) => {
    setPriceRange([Math.min(value, priceRange[1] - 50), priceRange[1]]);
  };
  
  const handleMaxChange = (value) => {
    setPriceRange([priceRange[0], Math.max(value, priceRange[0] + 50)]);
  };
  
  return (
    <div className="max-w-md">
      <h2 className="text-xl font-bold mb-4">Preisbereich</h2>
      
      <div className="flex justify-between mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mindestpreis
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              €
            </span>
            <input
              type="number"
              className="pl-8 pr-4 py-2 border border-gray-300 rounded-md w-32"
              value={priceRange[0]}
              onChange={(e) => handleMinChange(parseInt(e.target.value) || 0)}
              min={0}
              max={priceRange[1] - 50}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Höchstpreis
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              €
            </span>
            <input
              type="number"
              className="pl-8 pr-4 py-2 border border-gray-300 rounded-md w-32"
              value={priceRange[1]}
              onChange={(e) => handleMaxChange(parseInt(e.target.value) || 0)}
              min={priceRange[0] + 50}
              max={1000}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <Slider 
          min={0} 
          max={1000} 
          value={priceRange[0]} 
          onChange={handleMinChange}
          marks={[
            { value: 0, label: '0 €' },
            { value: 250, label: '250 €' },
            { value: 500, label: '500 €' },
            { value: 750, label: '750 €' },
            { value: 1000, label: '1000 €' }
          ]}
          markPosition="below"
          helperText="Mindestpreis"
        />
        
        <Slider 
          min={0} 
          max={1000} 
          value={priceRange[1]} 
          onChange={handleMaxChange}
          helperText="Höchstpreis"
        />
      </div>
      
      <div className="mt-6">
        <button className="px-4 py-2 bg-primary-500 text-white rounded-md">
          Filter anwenden
        </button>
      </div>
    </div>
  );
}
```

### Audio-Player mit Slider

```jsx
function AudioPlayerExample() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 Minuten in Sekunden
  const [volume, setVolume] = useState(80);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Simuliere Fortschritt, wenn abgespielt wird
  useEffect(() => {
    let interval;
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 1, duration));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);
  
  return (
    <div className="max-w-md p-4 border rounded-lg bg-gray-50">
      <h3 className="font-medium mb-2">Beispiel-Titel</h3>
      <p className="text-sm text-gray-500 mb-4">Künstler - Album</p>
      
      <div className="mb-4">
        <Slider 
          value={currentTime} 
          min={0} 
          max={duration} 
          onChange={setCurrentTime}
          variant="minimal"
          size="sm"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            className="p-3 bg-primary-500 text-white rounded-full hover:bg-primary-600"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
          
          <button className="p-2 rounded-full hover:bg-gray-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center w-32">
          <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-3.536 3.536m-10.607 0l3.536-3.536" />
          </svg>
          <Slider 
            value={volume} 
            onChange={setVolume}
            size="xs"
            variant="minimal"
          />
        </div>
      </div>
    </div>
  );
}
```