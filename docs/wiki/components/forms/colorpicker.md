# ColorPicker

Die ColorPicker-Komponente ermöglicht es Benutzern, eine Farbe aus einem visuellen Farbspektrum auszuwählen oder direkt als Hex-, RGB- oder HSL-Wert einzugeben.

## Import

```jsx
import { ColorPicker } from '@smolitux/core';
```

## Verwendung

### Einfacher ColorPicker

```jsx
<ColorPicker />
```

### ColorPicker mit Standardwert

```jsx
<ColorPicker defaultValue="#3B82F6" />
```

### ColorPicker mit Label

```jsx
<ColorPicker 
  label="Hintergrundfarbe" 
  defaultValue="#3B82F6" 
/>
```

### ColorPicker mit Hilfetext

```jsx
<ColorPicker 
  label="Textfarbe" 
  helperText="Wählen Sie eine gut lesbare Farbe" 
  defaultValue="#1F2937" 
/>
```

### ColorPicker mit Fehlermeldung

```jsx
<ColorPicker 
  label="Akzentfarbe" 
  error="Diese Farbe entspricht nicht den Markenrichtlinien" 
  defaultValue="#EF4444" 
/>
```

### ColorPicker mit verschiedenen Formaten

```jsx
<ColorPicker 
  label="HEX-Format" 
  format="hex" 
  defaultValue="#3B82F6" 
  className="mb-4" 
/>

<ColorPicker 
  label="RGB-Format" 
  format="rgb" 
  defaultValue="#3B82F6" 
  className="mb-4" 
/>

<ColorPicker 
  label="HSL-Format" 
  format="hsl" 
  defaultValue="#3B82F6" 
/>
```

### ColorPicker mit vorausgewählten Farben

```jsx
<ColorPicker 
  label="Farbauswahl" 
  presetColors={[
    '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899',
    '#F43F5E', '#D97706', '#059669', '#2563EB', '#7C3AED', '#BE185D'
  ]} 
  defaultValue="#3B82F6" 
/>
```

### ColorPicker mit Alpha-Kanal (Transparenz)

```jsx
<ColorPicker 
  label="Transparente Farbe" 
  allowAlpha 
  defaultValue="#3B82F680" 
/>
```

### ColorPicker mit verschiedenen Größen

```jsx
<ColorPicker 
  label="Klein" 
  size="sm" 
  defaultValue="#3B82F6" 
  className="mb-4" 
/>

<ColorPicker 
  label="Mittel" 
  size="md" 
  defaultValue="#3B82F6" 
  className="mb-4" 
/>

<ColorPicker 
  label="Groß" 
  size="lg" 
  defaultValue="#3B82F6" 
/>
```

### ColorPicker mit voller Breite

```jsx
<ColorPicker 
  label="Volle Breite" 
  fullWidth 
  defaultValue="#3B82F6" 
/>
```

### ColorPicker mit verschiedenen Popup-Positionen

```jsx
<ColorPicker 
  label="Popup oben" 
  position="top" 
  defaultValue="#3B82F6" 
  className="mb-4" 
/>

<ColorPicker 
  label="Popup unten" 
  position="bottom" 
  defaultValue="#3B82F6" 
  className="mb-4" 
/>

<ColorPicker 
  label="Popup links" 
  position="left" 
  defaultValue="#3B82F6" 
  className="mb-4" 
/>

<ColorPicker 
  label="Popup rechts" 
  position="right" 
  defaultValue="#3B82F6" 
/>
```

### ColorPicker mit anpassbaren Anzeigeelementen

```jsx
<ColorPicker 
  label="Nur Farbfeld" 
  showColorField 
  showRgbSliders={false}
  showHexInput={false}
  defaultValue="#3B82F6" 
  className="mb-4" 
/>

<ColorPicker 
  label="Nur RGB-Slider" 
  showColorField={false}
  showRgbSliders
  showHexInput={false}
  defaultValue="#3B82F6" 
  className="mb-4" 
/>

<ColorPicker 
  label="Nur Hex-Input" 
  showColorField={false}
  showRgbSliders={false}
  showHexInput
  defaultValue="#3B82F6" 
/>
```

### Kontrollierter ColorPicker

```jsx
function ControlledColorPickerExample() {
  const [color, setColor] = useState('#3B82F6');
  
  const handleColorChange = (newColor) => {
    setColor(newColor);
  };
  
  return (
    <div>
      <ColorPicker 
        label="Kontrollierter ColorPicker" 
        value={color} 
        onChange={handleColorChange} 
      />
      <div className="mt-4 flex items-center">
        <div 
          className="w-8 h-8 rounded-md mr-2" 
          style={{ backgroundColor: color }}
        ></div>
        <span>Ausgewählte Farbe: {color}</span>
      </div>
    </div>
  );
}
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `value` | `string` | - | Aktueller Farbwert im HEX-Format (#RRGGBB) |
| `defaultValue` | `string` | `#000000` | Standard-Farbwert, wenn kein Wert gesetzt ist |
| `onChange` | `(color: string, format: ColorFormat) => void` | - | Callback bei Farbänderungen |
| `label` | `string` | - | Text-Label |
| `helperText` | `string` | - | Hilfetext |
| `error` | `string` | - | Fehlermeldung |
| `format` | `'hex' \| 'rgb' \| 'hsl'` | `'hex'` | Format des Farbwerts in der Ausgabe |
| `presetColors` | `string[]` | - | Vorausgewählte Farben anzeigen |
| `allowAlpha` | `boolean` | `false` | Alpha-Kanal (Transparenz) erlauben |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Größe des ColorPickers |
| `fullWidth` | `boolean` | `false` | Volle Breite |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Popup-Position |
| `showColorField` | `boolean` | `true` | Farbfeld anzeigen |
| `showRgbSliders` | `boolean` | `true` | RGB-Slider anzeigen |
| `showHexInput` | `boolean` | `true` | Hex-Input anzeigen |
| `showPreview` | `boolean` | `true` | Vorschau anzeigen |

## Barrierefreiheit

Die ColorPicker-Komponente ist für Barrierefreiheit optimiert:

- Verwendet ARIA-Attribute für bessere Screenreader-Unterstützung
- Unterstützt Tastaturnavigation
- Labels sind korrekt mit den Eingabefeldern verknüpft
- Ausreichender Kontrast für Texte und Bedienelemente
- Farbwerte können auch direkt als Text eingegeben werden

## Beispiele

### Farbpalette-Editor

```jsx
function ColorPaletteEditor() {
  const [colors, setColors] = useState({
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F59E0B',
    info: '#60A5FA',
    light: '#F3F4F6',
    dark: '#1F2937'
  });
  
  const handleColorChange = (key) => (color) => {
    setColors(prev => ({
      ...prev,
      [key]: color
    }));
  };
  
  const exportPalette = () => {
    const cssVariables = Object.entries(colors)
      .map(([key, value]) => `  --color-${key}: ${value};`)
      .join('\n');
    
    const css = `:root {\n${cssVariables}\n}`;
    console.log(css);
    
    // In die Zwischenablage kopieren
    navigator.clipboard.writeText(css)
      .then(() => alert('CSS-Variablen in die Zwischenablage kopiert!'))
      .catch(err => console.error('Fehler beim Kopieren:', err));
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Farbpalette-Editor</h2>
        <Button onClick={exportPalette}>Als CSS exportieren</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(colors).map(([key, value]) => (
          <div key={key} className="border rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div 
                className="w-8 h-8 rounded-md mr-2" 
                style={{ backgroundColor: value }}
              ></div>
              <h3 className="font-medium capitalize">{key}</h3>
            </div>
            
            <ColorPicker 
              value={value} 
              onChange={handleColorChange(key)} 
              format="hex"
              presetColors={[
                '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899',
                '#F43F5E', '#D97706', '#059669', '#2563EB', '#7C3AED', '#BE185D'
              ]}
              fullWidth
            />
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="font-medium mb-2">Vorschau</h3>
        <div className="border rounded-lg p-4 space-y-2">
          <div className="flex flex-wrap gap-2">
            {Object.entries(colors).map(([key, value]) => (
              <div 
                key={key}
                className="px-4 py-2 rounded text-white"
                style={{ 
                  backgroundColor: value,
                  color: ['light'].includes(key) ? '#1F2937' : 'white'
                }}
              >
                {key}
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: colors.light }}>
            <h4 className="font-medium" style={{ color: colors.dark }}>Beispielinhalt</h4>
            <p style={{ color: colors.dark }}>Dies ist ein Beispieltext mit der ausgewählten Farbpalette.</p>
            <div className="mt-2">
              <button 
                className="px-4 py-2 rounded mr-2 text-white"
                style={{ backgroundColor: colors.primary }}
              >
                Primär
              </button>
              <button 
                className="px-4 py-2 rounded mr-2 text-white"
                style={{ backgroundColor: colors.secondary }}
              >
                Sekundär
              </button>
              <button 
                className="px-4 py-2 rounded text-white"
                style={{ backgroundColor: colors.success }}
              >
                Erfolg
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Produktkonfigurator mit Farbauswahl

```jsx
function ProductConfigurator() {
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const availableColors = [
    { name: 'Blau', value: '#3B82F6' },
    { name: 'Rot', value: '#EF4444' },
    { name: 'Grün', value: '#10B981' },
    { name: 'Gelb', value: '#F59E0B' },
    { name: 'Lila', value: '#8B5CF6' },
    { name: 'Pink', value: '#EC4899' }
  ];
  
  const handleAddToCart = () => {
    console.log('Zum Warenkorb hinzugefügt:', {
      color: selectedColor,
      size: selectedSize,
      quantity
    });
    // Hier würde normalerweise ein API-Aufruf erfolgen
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div 
            className="aspect-square rounded-lg flex items-center justify-center text-white text-2xl font-bold"
            style={{ backgroundColor: selectedColor }}
          >
            Produktvorschau
          </div>
          
          <div className="mt-4 grid grid-cols-4 gap-2">
            {availableColors.map(color => (
              <div 
                key={color.value}
                className={`
                  w-full aspect-square rounded-md cursor-pointer
                  ${selectedColor === color.value ? 'ring-2 ring-offset-2 ring-gray-800' : ''}
                `}
                style={{ backgroundColor: color.value }}
                onClick={() => setSelectedColor(color.value)}
                title={color.name}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-2">Premium T-Shirt</h2>
          <p className="text-gray-500 mb-4">Artikelnummer: TS-12345</p>
          
          <div className="text-2xl font-bold mb-6">€29,99</div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Farbe</h3>
            <ColorPicker 
              value={selectedColor} 
              onChange={setSelectedColor} 
              presetColors={availableColors.map(c => c.value)}
              showColorField={false}
              showRgbSliders={false}
            />
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Größe</h3>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map(size => (
                <button
                  key={size}
                  className={`
                    px-4 py-2 border rounded-md
                    ${selectedSize === size 
                      ? 'bg-gray-900 text-white border-gray-900' 
                      : 'border-gray-300 hover:border-gray-400'}
                  `}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Menge</h3>
            <div className="flex items-center">
              <button 
                className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >
                -
              </button>
              <input
                type="number"
                className="w-16 h-10 border-t border-b border-gray-300 text-center"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
              <button 
                className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          <button 
            className="w-full py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800"
            onClick={handleAddToCart}
          >
            In den Warenkorb
          </button>
          
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Kostenloser Versand ab €50</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>30 Tage Rückgaberecht</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Gradient-Editor

```jsx
function GradientEditor() {
  const [gradientColors, setGradientColors] = useState([
    { color: '#3B82F6', position: 0 },
    { color: '#8B5CF6', position: 100 }
  ]);
  const [gradientType, setGradientType] = useState('linear');
  const [gradientAngle, setGradientAngle] = useState(90);
  
  const addColor = () => {
    // Füge eine neue Farbe in der Mitte hinzu
    const newPosition = 50;
    const newColor = '#10B981';
    
    const newColors = [...gradientColors, { color: newColor, position: newPosition }]
      .sort((a, b) => a.position - b.position);
    
    setGradientColors(newColors);
  };
  
  const removeColor = (index) => {
    if (gradientColors.length <= 2) return; // Mindestens 2 Farben behalten
    
    const newColors = gradientColors.filter((_, i) => i !== index);
    setGradientColors(newColors);
  };
  
  const updateColor = (index, color) => {
    const newColors = [...gradientColors];
    newColors[index].color = color;
    setGradientColors(newColors);
  };
  
  const updatePosition = (index, position) => {
    const newPosition = Math.max(0, Math.min(100, position));
    const newColors = [...gradientColors];
    newColors[index].position = newPosition;
    setGradientColors(newColors.sort((a, b) => a.position - b.position));
  };
  
  const getGradientCSS = () => {
    const colorStops = gradientColors
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');
    
    if (gradientType === 'linear') {
      return `linear-gradient(${gradientAngle}deg, ${colorStops})`;
    } else {
      return `radial-gradient(circle, ${colorStops})`;
    }
  };
  
  const copyCSS = () => {
    const css = getGradientCSS();
    navigator.clipboard.writeText(`background: ${css};`)
      .then(() => alert('CSS in die Zwischenablage kopiert!'))
      .catch(err => console.error('Fehler beim Kopieren:', err));
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Gradient-Editor</h2>
      
      <div 
        className="h-40 rounded-lg mb-6"
        style={{ background: getGradientCSS() }}
      ></div>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-medium">Gradient-Typ</h3>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 rounded-md ${gradientType === 'linear' ? 'bg-gray-200' : ''}`}
              onClick={() => setGradientType('linear')}
            >
              Linear
            </button>
            <button 
              className={`px-3 py-1 rounded-md ${gradientType === 'radial' ? 'bg-gray-200' : ''}`}
              onClick={() => setGradientType('radial')}
            >
              Radial
            </button>
          </div>
        </div>
        
        {gradientType === 'linear' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Winkel: {gradientAngle}°
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={gradientAngle}
              onChange={(e) => setGradientAngle(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-medium">Farbstopps</h3>
          <button 
            className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200"
            onClick={addColor}
          >
            Farbe hinzufügen
          </button>
        </div>
        
        <div className="space-y-4">
          {gradientColors.map((stop, index) => (
            <div key={index} className="flex items-center space-x-4">
              <ColorPicker 
                value={stop.color} 
                onChange={(color) => updateColor(index, color)} 
                size="sm"
              />
              
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position: {stop.position}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stop.position}
                  onChange={(e) => updatePosition(index, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              {gradientColors.length > 2 && (
                <button 
                  className="p-1 text-gray-500 hover:text-gray-700"
                  onClick={() => removeColor(index)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-gray-100 rounded-lg">
        <div className="flex justify-between mb-2">
          <h3 className="font-medium">CSS-Code</h3>
          <button 
            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={copyCSS}
          >
            Kopieren
          </button>
        </div>
        <pre className="bg-white p-3 rounded-md overflow-x-auto">
          {`background: ${getGradientCSS()};`}
        </pre>
      </div>
    </div>
  );
}
```