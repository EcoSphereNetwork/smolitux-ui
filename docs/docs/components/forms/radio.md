# Radio

Die Radio-Komponente ermöglicht Benutzern, eine Option aus einer Gruppe auszuwählen. Sie unterstützt verschiedene Größen, Varianten und Zustände und kann als Button oder Karte dargestellt werden.

## Import

```jsx
import { Radio, RadioGroup } from '@smolitux/core';
```

## Verwendung

### Einfache Radio-Buttons

```jsx
<RadioGroup name="fruit" label="Wählen Sie eine Frucht:">
  <Radio value="apple" label="Apfel" />
  <Radio value="banana" label="Banane" />
  <Radio value="orange" label="Orange" />
</RadioGroup>
```

### Radio-Gruppe mit Standardwert

```jsx
const [value, setValue] = useState('female');

<RadioGroup 
  name="gender" 
  label="Geschlecht" 
  value={value}
  onChange={(e) => setValue(e.target.value)}
>
  <Radio value="male" label="Männlich" />
  <Radio value="female" label="Weiblich" />
  <Radio value="other" label="Divers" />
</RadioGroup>
```

### Radio-Gruppe mit Hilfetext

```jsx
<RadioGroup 
  name="payment" 
  label="Zahlungsmethode" 
  helperText="Wählen Sie Ihre bevorzugte Zahlungsmethode."
>
  <Radio value="credit" label="Kreditkarte" />
  <Radio value="paypal" label="PayPal" />
  <Radio value="bank" label="Banküberweisung" />
</RadioGroup>
```

### Deaktivierte Radio-Buttons

```jsx
<RadioGroup name="subscription" label="Abonnement">
  <Radio value="free" label="Kostenlos" />
  <Radio value="basic" label="Basic" />
  <Radio value="premium" label="Premium" disabled />
</RadioGroup>
```

### Radio-Gruppe mit Fehlermeldung

```jsx
<RadioGroup 
  name="terms" 
  label="Nutzungsbedingungen" 
  error="Bitte wählen Sie eine Option aus"
  isInvalid
>
  <Radio value="accept" label="Ich akzeptiere die Nutzungsbedingungen" />
  <Radio value="decline" label="Ich lehne die Nutzungsbedingungen ab" />
</RadioGroup>
```

### Verschiedene Größen

```jsx
<RadioGroup name="size-xs" label="Extra klein" size="xs">
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
</RadioGroup>

<RadioGroup name="size-sm" label="Klein" size="sm">
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
</RadioGroup>

<RadioGroup name="size-md" label="Mittel" size="md">
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
</RadioGroup>

<RadioGroup name="size-lg" label="Groß" size="lg">
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
</RadioGroup>

<RadioGroup name="size-xl" label="Extra groß" size="xl">
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
</RadioGroup>
```

### Verschiedene Varianten

```jsx
<RadioGroup name="variant-solid" label="Solid">
  <Radio value="option1" label="Option 1" variant="solid" />
  <Radio value="option2" label="Option 2" variant="solid" />
</RadioGroup>

<RadioGroup name="variant-outline" label="Outline">
  <Radio value="option1" label="Option 1" variant="outline" />
  <Radio value="option2" label="Option 2" variant="outline" />
</RadioGroup>

<RadioGroup name="variant-filled" label="Filled">
  <Radio value="option1" label="Option 1" variant="filled" />
  <Radio value="option2" label="Option 2" variant="filled" />
</RadioGroup>

<RadioGroup name="variant-minimal" label="Minimal">
  <Radio value="option1" label="Option 1" variant="minimal" />
  <Radio value="option2" label="Option 2" variant="minimal" />
</RadioGroup>
```

### Verschiedene Farbschemata

```jsx
<RadioGroup name="color-primary" label="Primär">
  <Radio value="option1" label="Option 1" colorScheme="primary" />
  <Radio value="option2" label="Option 2" colorScheme="primary" />
</RadioGroup>

<RadioGroup name="color-secondary" label="Sekundär">
  <Radio value="option1" label="Option 1" colorScheme="secondary" />
  <Radio value="option2" label="Option 2" colorScheme="secondary" />
</RadioGroup>

<RadioGroup name="color-success" label="Erfolg">
  <Radio value="option1" label="Option 1" colorScheme="success" />
  <Radio value="option2" label="Option 2" colorScheme="success" />
</RadioGroup>

<RadioGroup name="color-danger" label="Gefahr">
  <Radio value="option1" label="Option 1" colorScheme="danger" />
  <Radio value="option2" label="Option 2" colorScheme="danger" />
</RadioGroup>
```

### Label-Positionen

```jsx
<RadioGroup name="label-right" label="Label rechts">
  <Radio value="option1" label="Option 1" labelPosition="right" />
  <Radio value="option2" label="Option 2" labelPosition="right" />
</RadioGroup>

<RadioGroup name="label-left" label="Label links">
  <Radio value="option1" label="Option 1" labelPosition="left" />
  <Radio value="option2" label="Option 2" labelPosition="left" />
</RadioGroup>
```

### Verschiedene Anzeigetypen

```jsx
<RadioGroup name="display-radio" label="Standard-Radio">
  <Radio value="option1" label="Option 1" displayType="radio" />
  <Radio value="option2" label="Option 2" displayType="radio" />
</RadioGroup>

<RadioGroup name="display-button" label="Button-Radio">
  <Radio value="option1" label="Option 1" displayType="button" />
  <Radio value="option2" label="Option 2" displayType="button" />
</RadioGroup>

<RadioGroup name="display-card" label="Karten-Radio">
  <Radio value="option1" label="Option 1" displayType="card" />
  <Radio value="option2" label="Option 2" displayType="card" />
</RadioGroup>
```

### Horizontales Layout

```jsx
<RadioGroup name="layout-horizontal" label="Horizontales Layout" layout="horizontal">
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
  <Radio value="option3" label="Option 3" />
</RadioGroup>
```

## Props

### Radio Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `label` | `ReactNode` | - | Text-Label für den Radio-Button |
| `helperText` | `ReactNode` | - | Hilfetext unter dem Radio-Button |
| `error` | `ReactNode` | - | Fehlermeldung unter dem Radio-Button |
| `successMessage` | `ReactNode` | - | Erfolgsmeldung unter dem Radio-Button |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Größe des Radio-Buttons |
| `variant` | `'solid' \| 'outline' \| 'filled' \| 'minimal'` | `'solid'` | Visuelle Variante des Radio-Buttons |
| `colorScheme` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Farbschema des Radio-Buttons |
| `bordered` | `boolean` | `false` | Ob der Radio-Button einen Rahmen haben soll |
| `rounded` | `boolean` | `true` | Ob der Radio-Button abgerundete Ecken haben soll |
| `shadow` | `boolean` | `false` | Ob der Radio-Button einen Schatten haben soll |
| `hoverable` | `boolean` | `true` | Ob der Radio-Button einen Hover-Effekt haben soll |
| `focusable` | `boolean` | `true` | Ob der Radio-Button einen Fokus-Effekt haben soll |
| `transition` | `boolean` | `true` | Ob der Radio-Button einen Übergangseffekt haben soll |
| `transparent` | `boolean` | `false` | Ob der Radio-Button einen transparenten Hintergrund haben soll |
| `tooltip` | `string` | - | Tooltip-Text für den Radio-Button |
| `isLoading` | `boolean` | `false` | Ob der Radio-Button im Ladezustand ist |
| `isValid` | `boolean` | `false` | Ob der Radio-Button gültig ist |
| `isInvalid` | `boolean` | `false` | Ob der Radio-Button ungültig ist |
| `isSuccess` | `boolean` | `false` | Ob der Radio-Button erfolgreich validiert ist |
| `isDisabled` | `boolean` | `false` | Ob der Radio-Button deaktiviert ist |
| `isRequired` | `boolean` | `false` | Ob der Radio-Button erforderlich ist |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Position des Labels relativ zum Radio-Button |
| `displayType` | `'radio' \| 'button' \| 'card'` | `'radio'` | Anzeigetyp des Radio-Buttons |
| `value` | `string` | - | Wert des Radio-Buttons |
| `checked` | `boolean` | - | Ob der Radio-Button ausgewählt ist (kontrollierter Modus) |
| `defaultChecked` | `boolean` | - | Ob der Radio-Button standardmäßig ausgewählt ist (unkontrollierter Modus) |
| `onChange` | `(event: React.ChangeEvent<HTMLInputElement>) => void` | - | Callback-Funktion, die aufgerufen wird, wenn sich der Wert ändert |
| `name` | `string` | - | Name des Radio-Buttons für Formulare |
| `id` | `string` | - | ID des Radio-Buttons |
| `className` | `string` | - | Zusätzliche CSS-Klassen für den Radio-Button |
| `labelClassName` | `string` | - | Zusätzliche CSS-Klassen für das Label |
| `helperTextClassName` | `string` | - | Zusätzliche CSS-Klassen für den Hilfetext |
| `errorClassName` | `string` | - | Zusätzliche CSS-Klassen für die Fehlermeldung |

### RadioGroup Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `name` | `string` | - | Name für alle Radio-Buttons in der Gruppe |
| `value` | `string` | - | Aktuell ausgewählter Wert (kontrollierter Modus) |
| `onChange` | `(event: React.ChangeEvent<HTMLInputElement>) => void` | - | Callback bei Änderung der Auswahl |
| `disabled` | `boolean` | `false` | Ob die Gruppe deaktiviert ist |
| `required` | `boolean` | `false` | Ob die Gruppe erforderlich ist |
| `error` | `ReactNode` | - | Fehlermeldung für die Gruppe |
| `helperText` | `ReactNode` | - | Hilfetext für die Gruppe |
| `successMessage` | `ReactNode` | - | Erfolgsmeldung für die Gruppe |
| `label` | `ReactNode` | - | Label für die Gruppe |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Größe der Radio-Buttons in der Gruppe |
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout der Gruppe |
| `className` | `string` | - | Zusätzliche CSS-Klassen für die Gruppe |
| `isValid` | `boolean` | `false` | Ob die Gruppe gültig ist |
| `isInvalid` | `boolean` | `false` | Ob die Gruppe ungültig ist |
| `isSuccess` | `boolean` | `false` | Ob die Gruppe erfolgreich validiert ist |
| `isLoading` | `boolean` | `false` | Ob die Gruppe im Ladezustand ist |
| `children` | `ReactNode` | - | Die Radio-Buttons in der Gruppe |

## Barrierefreiheit

Die Radio-Komponente ist für Barrierefreiheit optimiert:

- Korrekte Verknüpfung von Label und Radio-Button über IDs
- Unterstützung für `aria-invalid` bei Fehlern
- Unterstützung für `aria-describedby` für Hilfetexte und Fehlermeldungen
- Tastaturnavigation mit Leertaste und Pfeiltasten

## Beispiele

### Radio-Buttons mit Icons

```jsx
import { HomeIcon, BriefcaseIcon, CogIcon } from '@heroicons/react/outline';

<RadioGroup name="navigation" label="Navigation">
  <Radio 
    value="home" 
    label={
      <div className="flex items-center">
        <HomeIcon className="w-5 h-5 mr-2" />
        <span>Home</span>
      </div>
    } 
  />
  <Radio 
    value="work" 
    label={
      <div className="flex items-center">
        <BriefcaseIcon className="w-5 h-5 mr-2" />
        <span>Arbeit</span>
      </div>
    } 
  />
  <Radio 
    value="settings" 
    label={
      <div className="flex items-center">
        <CogIcon className="w-5 h-5 mr-2" />
        <span>Einstellungen</span>
      </div>
    } 
  />
</RadioGroup>
```

### Radio-Karten

```jsx
function RadioCards() {
  const [plan, setPlan] = useState('basic');
  
  const plans = [
    {
      value: 'basic',
      name: 'Basic',
      price: '€9.99',
      features: ['10 GB Speicher', '1 Benutzer', 'E-Mail-Support']
    },
    {
      value: 'pro',
      name: 'Professional',
      price: '€19.99',
      features: ['100 GB Speicher', '5 Benutzer', 'Prioritäts-Support']
    },
    {
      value: 'enterprise',
      name: 'Enterprise',
      price: '€49.99',
      features: ['Unbegrenzter Speicher', 'Unbegrenzte Benutzer', '24/7 Support']
    }
  ];
  
  return (
    <RadioGroup 
      name="plan" 
      label="Wählen Sie einen Plan" 
      value={plan}
      onChange={(e) => setPlan(e.target.value)}
      layout="horizontal"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map(planOption => (
          <Radio
            key={planOption.value}
            value={planOption.value}
            displayType="card"
            className="h-full"
            label={
              <div className="p-4">
                <h3 className="text-lg font-bold">{planOption.name}</h3>
                <div className="text-2xl font-bold my-2">{planOption.price}</div>
                <ul className="mt-4 space-y-2">
                  {planOption.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            }
          />
        ))}
      </div>
    </RadioGroup>
  );
}
```

### Radio-Buttons als Segmented Control

```jsx
function SegmentedControl() {
  const [view, setView] = useState('day');
  
  return (
    <RadioGroup 
      name="view" 
      value={view}
      onChange={(e) => setView(e.target.value)}
      layout="horizontal"
      className="inline-flex bg-gray-100 p-1 rounded-lg"
    >
      <Radio 
        value="day" 
        label="Tag" 
        displayType="button"
        className={`px-4 py-2 rounded-md ${view === 'day' ? 'bg-white shadow' : ''}`}
      />
      <Radio 
        value="week" 
        label="Woche" 
        displayType="button"
        className={`px-4 py-2 rounded-md ${view === 'week' ? 'bg-white shadow' : ''}`}
      />
      <Radio 
        value="month" 
        label="Monat" 
        displayType="button"
        className={`px-4 py-2 rounded-md ${view === 'month' ? 'bg-white shadow' : ''}`}
      />
    </RadioGroup>
  );
}
```

### Radio-Gruppe mit Validierung

```jsx
function ValidatedRadioGroup() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setValue(e.target.value);
    setError('');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!value) {
      setError('Bitte wählen Sie eine Option aus.');
      return;
    }
    
    alert(`Sie haben "${value}" ausgewählt.`);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <RadioGroup 
        name="options" 
        label="Wählen Sie eine Option" 
        value={value}
        onChange={handleChange}
        error={error}
        isInvalid={!!error}
        required
      >
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
      
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
      >
        Absenden
      </button>
    </form>
  );
}
```