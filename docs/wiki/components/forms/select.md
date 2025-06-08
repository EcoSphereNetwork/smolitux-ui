# Select

Die Select-Komponente ermöglicht Benutzern, eine Option aus einer Liste auszuwählen. Sie unterstützt verschiedene Größen, Varianten und Zustände und kann mit Icons und Beschreibungen angepasst werden.

## Import

```jsx
import { Select } from '@smolitux/core';
```

## Verwendung

### Einfaches Select

```jsx
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

<Select label="Wählen Sie eine Option" options={options} placeholder="Bitte auswählen" />;
```

### Select mit Standardwert

```jsx
const [value, setValue] = useState('option2');

<Select
  label="Wählen Sie eine Option"
  options={options}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>;
```

### Deaktivierte Optionen

```jsx
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2', disabled: true },
  { value: 'option3', label: 'Option 3' },
];

<Select label="Wählen Sie eine Option" options={options} />;
```

### Select mit Icons

```jsx
import { HomeIcon, CogIcon, BellIcon } from '@heroicons/react/outline';

const options = [
  { value: 'home', label: 'Home', icon: <HomeIcon className="w-5 h-5" /> },
  { value: 'settings', label: 'Einstellungen', icon: <CogIcon className="w-5 h-5" /> },
  { value: 'notifications', label: 'Benachrichtigungen', icon: <BellIcon className="w-5 h-5" /> },
];

<Select label="Navigation" options={options} />;
```

### Gruppierte Optionen

```jsx
const options = [
  { value: 'apple', label: 'Apple', group: 'Früchte' },
  { value: 'banana', label: 'Banane', group: 'Früchte' },
  { value: 'carrot', label: 'Karotte', group: 'Gemüse' },
  { value: 'potato', label: 'Kartoffel', group: 'Gemüse' },
];

<Select label="Lebensmittel" options={options} groupOptions />;
```

### Select mit Mehrfachauswahl

```jsx
<Select
  label="Lieblingsfrüchte"
  options={options}
  isMulti
  maxSelections={2}
  placeholder="Bis zu zwei auswählen"
/>
```

### Select mit Beschreibungen

```jsx
const options = [
  {
    value: 'basic',
    label: 'Basic Plan',
    description: '10 GB Speicher, 1 Benutzer',
  },
  {
    value: 'pro',
    label: 'Pro Plan',
    description: '100 GB Speicher, 5 Benutzer',
  },
  {
    value: 'enterprise',
    label: 'Enterprise Plan',
    description: 'Unbegrenzter Speicher, unbegrenzte Benutzer',
  },
];

<Select label="Abonnement" options={options} />;
```

### Verschiedene Größen

```jsx
<Select
  label="Klein"
  options={options}
  size="sm"
/>

<Select
  label="Standard"
  options={options}
  size="md"
/>

<Select
  label="Groß"
  options={options}
  size="lg"
/>
```

### Verschiedene Varianten

```jsx
<Select
  label="Standard"
  options={options}
  variant="default"
/>

<Select
  label="Gefüllt"
  options={options}
  variant="filled"
/>

<Select
  label="Umrandet"
  options={options}
  variant="outlined"
/>
```

### Select mit Validierung

```jsx
const [value, setValue] = useState('');
const [error, setError] = useState('');

const handleChange = (e) => {
  setValue(e.target.value);

  if (!e.target.value) {
    setError('Bitte wählen Sie eine Option aus');
  } else {
    setError('');
  }
};

<Select
  label="Wählen Sie eine Option"
  options={options}
  value={value}
  onChange={handleChange}
  error={error}
  required
/>;
```

## Props

| Prop                     | Typ                                                     | Standard    | Beschreibung                                                      |
| ------------------------ | ------------------------------------------------------- | ----------- | ----------------------------------------------------------------- |
| `options`                | `SelectOption[]`                                        | -           | Array von Optionen für das Select                                 |
| `label`                  | `string`                                                | -           | Text-Label für das Select                                         |
| `helperText`             | `string`                                                | -           | Hilfetext unter dem Select                                        |
| `error`                  | `string`                                                | -           | Fehlermeldung unter dem Select                                    |
| `size`                   | `'xs' \| 'sm' \| 'md' \| 'lg'`                          | `'md'`      | Größe des Selects                                                 |
| `variant`                | `'default' \| 'filled' \| 'outlined' \| 'unstyled'`     | `'default'` | Visuelle Variante des Selects                                     |
| `fullWidth`              | `boolean`                                               | `false`     | Ob das Select die volle Breite einnehmen soll                     |
| `leftIcon`               | `ReactNode`                                             | -           | Icon links im Select                                              |
| `rightIcon`              | `ReactNode`                                             | -           | Icon rechts im Select (ersetzt den Standard-Pfeil)                |
| `placeholder`            | `string`                                                | -           | Platzhaltertext                                                   |
| `required`               | `boolean`                                               | `false`     | Ob das Select erforderlich ist                                    |
| `disabled`               | `boolean`                                               | `false`     | Ob das Select deaktiviert ist                                     |
| `readOnly`               | `boolean`                                               | `false`     | Ob das Select schreibgeschützt ist                                |
| `rounded`                | `boolean`                                               | `true`      | Ob das Select abgerundet sein soll                                |
| `shadow`                 | `boolean`                                               | `false`     | Ob das Select einen Schatten haben soll                           |
| `animated`               | `boolean`                                               | `true`      | Ob das Select animiert werden soll                                |
| `groupOptions`           | `boolean`                                               | `false`     | Ob das Select gruppierte Optionen unterstützen soll               |
| `isMulti`                | `boolean`                                               | `false`     | Aktiviert Mehrfachauswahl                                         |
| `maxSelections`          | `number`                                                | -           | Maximale Anzahl auswählbarer Optionen (nur bei `isMulti`)         |
| `onMaxSelectionsReached` | `() => void`                                            | -           | Callback, wenn die maximale Auswahl erreicht wird                 |
| `labelClassName`         | `string`                                                | -           | Zusätzliche CSS-Klassen für das Label                             |
| `helperTextClassName`    | `string`                                                | -           | Zusätzliche CSS-Klassen für den Hilfetext                         |
| `errorClassName`         | `string`                                                | -           | Zusätzliche CSS-Klassen für die Fehlermeldung                     |
| `className`              | `string`                                                | -           | Zusätzliche CSS-Klassen für das Select                            |
| `value`                  | `string`                                                | -           | Aktueller Wert des Selects                                        |
| `defaultValue`           | `string`                                                | -           | Standardwert des Selects                                          |
| `onChange`               | `(event: React.ChangeEvent<HTMLSelectElement>) => void` | -           | Callback-Funktion, die aufgerufen wird, wenn sich der Wert ändert |
| `name`                   | `string`                                                | -           | Name des Selects für Formulare                                    |
| `id`                     | `string`                                                | -           | ID des Selects                                                    |

### SelectOption Interface

| Eigenschaft   | Typ         | Beschreibung                            |
| ------------- | ----------- | --------------------------------------- |
| `value`       | `string`    | Der Wert der Option                     |
| `label`       | `string`    | Der angezeigte Text der Option          |
| `disabled`    | `boolean`   | Ob die Option deaktiviert ist           |
| `description` | `string`    | Zusätzliche Beschreibung für die Option |
| `icon`        | `ReactNode` | Icon für die Option                     |
| `group`       | `string`    | Gruppenname für gruppierte Optionen     |

## Barrierefreiheit

Die Select-Komponente ist für Barrierefreiheit optimiert:

- Korrekte Verknüpfung von Label und Select über IDs
- Unterstützung für `aria-invalid` bei Fehlern
- Unterstützung für `aria-describedby` für Hilfetexte und Fehlermeldungen
- Tastaturnavigation für Optionen

## Beispiele

### Select mit benutzerdefiniertem Styling

```jsx
<Select
  label="Benutzerdefiniertes Styling"
  options={options}
  className="border-purple-500 focus:border-purple-700 focus:ring-purple-200"
  labelClassName="text-purple-700"
/>
```

### Select mit Ladeindikator

```jsx
function LoadingSelect() {
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Simuliere API-Aufruf
    setTimeout(() => {
      setOptions([
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="relative">
      <Select
        label="Daten laden"
        options={options}
        disabled={isLoading}
        placeholder="Daten werden geladen..."
      />
      {isLoading && (
        <div className="absolute inset-y-0 right-8 flex items-center">
          <svg
            className="animate-spin h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
}
```

### Select mit Suchfunktion

```jsx
function SearchableSelect() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'durian', label: 'Durian' },
    { value: 'elderberry', label: 'Elderberry' },
  ];

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">Früchte</label>

      <div className="relative">
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          placeholder="Suchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />

        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${selectedValue === option.value ? 'bg-primary-50 text-primary-700' : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">Keine Ergebnisse gefunden</div>
          )}
        </div>
      )}

      {selectedValue && <input type="hidden" name="fruit" value={selectedValue} />}
    </div>
  );
}
```
