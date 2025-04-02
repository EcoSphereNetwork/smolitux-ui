# Checkbox

Die Checkbox-Komponente ermöglicht Benutzern, eine oder mehrere Optionen aus einer Liste auszuwählen. Sie unterstützt verschiedene Größen, Varianten und Zustände und kann als Schalter, Radio-Button oder Toggle-Button dargestellt werden.

## Import

```jsx
import { Checkbox } from '@smolitux/core';
```

## Verwendung

### Einfache Checkbox

```jsx
<Checkbox label="Ich stimme den AGB zu" />
```

### Checkbox mit Standardwert

```jsx
const [checked, setChecked] = useState(true);

<Checkbox 
  label="Newsletter abonnieren" 
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>
```

### Checkbox mit Hilfetext

```jsx
<Checkbox 
  label="Marketing-E-Mails erhalten" 
  helperText="Sie können sich jederzeit abmelden."
/>
```

### Deaktivierte Checkbox

```jsx
<Checkbox 
  label="Premium-Funktionen (nicht verfügbar)" 
  disabled 
/>
```

### Checkbox mit Fehlermeldung

```jsx
<Checkbox 
  label="Ich stimme den AGB zu" 
  error="Sie müssen den AGB zustimmen, um fortzufahren."
  isInvalid
/>
```

### Indeterminierter Zustand

```jsx
function IndeterminateExample() {
  const [checkedItems, setCheckedItems] = useState([true, false]);
  
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
  
  return (
    <>
      <Checkbox
        label="Alle auswählen"
        checked={allChecked}
        indeterminate={isIndeterminate}
        onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
      />
      <div style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
        <Checkbox
          label="Option 1"
          checked={checkedItems[0]}
          onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
        />
        <Checkbox
          label="Option 2"
          checked={checkedItems[1]}
          onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
        />
      </div>
    </>
  );
}
```

### Verschiedene Größen

```jsx
<Checkbox size="xs" label="Extra klein" />
<Checkbox size="sm" label="Klein" />
<Checkbox size="md" label="Mittel" />
<Checkbox size="lg" label="Groß" />
<Checkbox size="xl" label="Extra groß" />
```

### Verschiedene Varianten

```jsx
<Checkbox variant="solid" label="Solid" />
<Checkbox variant="outline" label="Outline" />
<Checkbox variant="filled" label="Filled" />
<Checkbox variant="minimal" label="Minimal" />
```

### Verschiedene Farbschemata

```jsx
<Checkbox colorScheme="primary" label="Primär" />
<Checkbox colorScheme="secondary" label="Sekundär" />
<Checkbox colorScheme="success" label="Erfolg" />
<Checkbox colorScheme="danger" label="Gefahr" />
<Checkbox colorScheme="warning" label="Warnung" />
<Checkbox colorScheme="info" label="Info" />
```

### Label-Positionen

```jsx
<Checkbox labelPosition="right" label="Label rechts" />
<Checkbox labelPosition="left" label="Label links" />
```

### Verschiedene Anzeigetypen

```jsx
<Checkbox displayType="checkbox" label="Standard-Checkbox" />
<Checkbox displayType="switch" label="Schalter" />
<Checkbox displayType="radio" label="Radio-Button" />
<Checkbox displayType="toggle" label="Toggle-Button" />
<Checkbox displayType="button" label="Button-Checkbox" />
```

### Checkbox-Gruppe

```jsx
function CheckboxGroupExample() {
  const [checkedValues, setCheckedValues] = useState(['apple']);
  
  const handleChange = (value) => {
    if (checkedValues.includes(value)) {
      setCheckedValues(checkedValues.filter(v => v !== value));
    } else {
      setCheckedValues([...checkedValues, value]);
    }
  };
  
  return (
    <div>
      <div className="mb-2 font-medium">Wählen Sie Ihre Lieblingsobstsorten:</div>
      <div className="space-y-2">
        <Checkbox
          label="Äpfel"
          checked={checkedValues.includes('apple')}
          onChange={() => handleChange('apple')}
        />
        <Checkbox
          label="Bananen"
          checked={checkedValues.includes('banana')}
          onChange={() => handleChange('banana')}
        />
        <Checkbox
          label="Erdbeeren"
          checked={checkedValues.includes('strawberry')}
          onChange={() => handleChange('strawberry')}
        />
        <Checkbox
          label="Orangen"
          checked={checkedValues.includes('orange')}
          onChange={() => handleChange('orange')}
        />
      </div>
      <div className="mt-4">
        Ausgewählt: {checkedValues.join(', ')}
      </div>
    </div>
  );
}
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `label` | `ReactNode` | - | Text-Label für die Checkbox |
| `helperText` | `ReactNode` | - | Hilfetext unter der Checkbox |
| `error` | `ReactNode` | - | Fehlermeldung unter der Checkbox |
| `successMessage` | `ReactNode` | - | Erfolgsmeldung unter der Checkbox |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Größe der Checkbox |
| `variant` | `'solid' \| 'outline' \| 'filled' \| 'minimal'` | `'solid'` | Visuelle Variante der Checkbox |
| `indeterminate` | `boolean` | `false` | Ob die Checkbox im indeterminierten Zustand ist |
| `colorScheme` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info'` | `'primary'` | Farbschema der Checkbox |
| `bordered` | `boolean` | `false` | Ob die Checkbox einen Rahmen haben soll |
| `rounded` | `boolean` | `true` | Ob die Checkbox abgerundete Ecken haben soll |
| `shadow` | `boolean` | `false` | Ob die Checkbox einen Schatten haben soll |
| `hoverable` | `boolean` | `true` | Ob die Checkbox einen Hover-Effekt haben soll |
| `focusable` | `boolean` | `true` | Ob die Checkbox einen Fokus-Effekt haben soll |
| `transition` | `boolean` | `true` | Ob die Checkbox einen Übergangseffekt haben soll |
| `transparent` | `boolean` | `false` | Ob die Checkbox einen transparenten Hintergrund haben soll |
| `tooltip` | `string` | - | Tooltip-Text für die Checkbox |
| `isLoading` | `boolean` | `false` | Ob die Checkbox im Ladezustand ist |
| `isValid` | `boolean` | `false` | Ob die Checkbox gültig ist |
| `isInvalid` | `boolean` | `false` | Ob die Checkbox ungültig ist |
| `isSuccess` | `boolean` | `false` | Ob die Checkbox erfolgreich validiert ist |
| `isReadOnly` | `boolean` | `false` | Ob die Checkbox schreibgeschützt ist |
| `isDisabled` | `boolean` | `false` | Ob die Checkbox deaktiviert ist |
| `isRequired` | `boolean` | `false` | Ob die Checkbox erforderlich ist |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Position des Labels relativ zur Checkbox |
| `displayType` | `'checkbox' \| 'switch' \| 'radio' \| 'toggle' \| 'button'` | `'checkbox'` | Anzeigetyp der Checkbox |
| `checked` | `boolean` | - | Ob die Checkbox ausgewählt ist (kontrollierter Modus) |
| `defaultChecked` | `boolean` | - | Ob die Checkbox standardmäßig ausgewählt ist (unkontrollierter Modus) |
| `onChange` | `(event: React.ChangeEvent<HTMLInputElement>) => void` | - | Callback-Funktion, die aufgerufen wird, wenn sich der Wert ändert |
| `name` | `string` | - | Name der Checkbox für Formulare |
| `id` | `string` | - | ID der Checkbox |
| `value` | `string` | - | Wert der Checkbox für Formulare |
| `className` | `string` | - | Zusätzliche CSS-Klassen für die Checkbox |
| `labelClassName` | `string` | - | Zusätzliche CSS-Klassen für das Label |
| `helperTextClassName` | `string` | - | Zusätzliche CSS-Klassen für den Hilfetext |
| `errorClassName` | `string` | - | Zusätzliche CSS-Klassen für die Fehlermeldung |

## Barrierefreiheit

Die Checkbox-Komponente ist für Barrierefreiheit optimiert:

- Korrekte Verknüpfung von Label und Checkbox über IDs
- Unterstützung für `aria-invalid` bei Fehlern
- Unterstützung für `aria-describedby` für Hilfetexte und Fehlermeldungen
- Unterstützung für `aria-checked="mixed"` für indeterminierte Zustände
- Tastaturnavigation mit Leertaste und Enter

## Beispiele

### Checkbox mit benutzerdefiniertem Label

```jsx
<Checkbox
  label={
    <div className="flex items-center">
      <span>Ich akzeptiere die</span>
      <a href="/terms" className="ml-1 text-primary-600 hover:underline">
        Nutzungsbedingungen
      </a>
    </div>
  }
/>
```

### Checkbox mit Icon

```jsx
import { CheckIcon, XIcon } from '@heroicons/react/solid';

<Checkbox
  label="Benutzerdefinierte Icons"
  checkedIcon={<CheckIcon className="w-4 h-4" />}
  uncheckedIcon={<XIcon className="w-4 h-4" />}
/>
```

### Checkbox als Karte

```jsx
function CardCheckbox() {
  const [selected, setSelected] = useState(false);
  
  return (
    <div 
      className={`p-4 border rounded-lg cursor-pointer transition-all ${
        selected 
          ? 'border-primary-500 bg-primary-50' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => setSelected(!selected)}
    >
      <div className="flex items-start">
        <Checkbox
          checked={selected}
          onChange={(e) => setSelected(e.target.checked)}
          className="mt-1"
        />
        <div className="ml-3">
          <h3 className="font-medium">Premium-Plan</h3>
          <p className="text-sm text-gray-500">
            Alle Funktionen, unbegrenzter Speicherplatz, Premium-Support
          </p>
          <div className="mt-2 font-bold">
            €9,99/Monat
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Checkbox-Gruppe mit Validierung

```jsx
function ValidatedCheckboxGroup() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');
  
  const options = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
    { id: 'option4', label: 'Option 4' },
  ];
  
  const handleChange = (id) => {
    let newSelected;
    
    if (selectedOptions.includes(id)) {
      newSelected = selectedOptions.filter(item => item !== id);
    } else {
      newSelected = [...selectedOptions, id];
    }
    
    setSelectedOptions(newSelected);
    
    if (newSelected.length === 0) {
      setError('Bitte wählen Sie mindestens eine Option aus.');
    } else {
      setError('');
    }
  };
  
  return (
    <div>
      <div className="mb-2 font-medium">Wählen Sie mindestens eine Option:</div>
      
      <div className="space-y-2">
        {options.map(option => (
          <Checkbox
            key={option.id}
            label={option.label}
            checked={selectedOptions.includes(option.id)}
            onChange={() => handleChange(option.id)}
            isInvalid={!!error}
          />
        ))}
      </div>
      
      {error && (
        <div className="mt-2 text-sm text-red-600">{error}</div>
      )}
      
      <button
        className="mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
        onClick={() => {
          if (selectedOptions.length === 0) {
            setError('Bitte wählen Sie mindestens eine Option aus.');
          } else {
            alert(`Ausgewählte Optionen: ${selectedOptions.join(', ')}`);
          }
        }}
      >
        Absenden
      </button>
    </div>
  );
}
```