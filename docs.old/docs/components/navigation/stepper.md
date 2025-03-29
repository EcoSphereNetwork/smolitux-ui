# Stepper

Die Stepper-Komponente zeigt den Fortschritt in einem mehrstufigen Prozess an und ermöglicht die Navigation zwischen den einzelnen Schritten.

## Import

```jsx
import { Stepper, StepperContent, StepperActions } from '@smolitux/core';
```

## Verwendung

### Einfacher Stepper

```jsx
const steps = [
  { id: 'step1', title: 'Schritt 1' },
  { id: 'step2', title: 'Schritt 2' },
  { id: 'step3', title: 'Schritt 3' }
];

function SimpleStepperExample() {
  const [activeStep, setActiveStep] = useState(0);
  
  return (
    <Stepper
      steps={steps}
      activeStep={activeStep}
      onStepChange={setActiveStep}
    />
  );
}
```

### Stepper mit Inhalt

```jsx
function StepperWithContentExample() {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    { id: 'step1', title: 'Persönliche Daten' },
    { id: 'step2', title: 'Adresse' },
    { id: 'step3', title: 'Bestätigung' }
  ];
  
  return (
    <Stepper
      steps={steps}
      activeStep={activeStep}
      onStepChange={setActiveStep}
    >
      <StepperContent>
        <div>
          <h3>Persönliche Daten</h3>
          <p>Inhalt für Schritt 1</p>
        </div>
        
        <div>
          <h3>Adresse</h3>
          <p>Inhalt für Schritt 2</p>
        </div>
        
        <div>
          <h3>Bestätigung</h3>
          <p>Inhalt für Schritt 3</p>
        </div>
      </StepperContent>
      
      <StepperActions />
    </Stepper>
  );
}
```

### Vertikaler Stepper

```jsx
<Stepper
  steps={steps}
  activeStep={activeStep}
  onStepChange={setActiveStep}
  orientation="vertical"
>
  <StepperContent>
    {/* Inhalte für die Schritte */}
  </StepperContent>
  
  <StepperActions />
</Stepper>
```

### Stepper mit Beschreibungen

```jsx
const stepsWithDescription = [
  { 
    id: 'step1', 
    title: 'Persönliche Daten', 
    description: 'Geben Sie Ihre persönlichen Informationen ein' 
  },
  { 
    id: 'step2', 
    title: 'Adresse', 
    description: 'Geben Sie Ihre Adresse ein' 
  },
  { 
    id: 'step3', 
    title: 'Bestätigung', 
    description: 'Überprüfen und bestätigen Sie Ihre Angaben' 
  }
];

<Stepper
  steps={stepsWithDescription}
  activeStep={activeStep}
  onStepChange={setActiveStep}
/>
```

### Stepper mit Icons

```jsx
const stepsWithIcons = [
  { 
    id: 'step1', 
    title: 'Persönliche Daten', 
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  },
  { 
    id: 'step2', 
    title: 'Adresse', 
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  },
  { 
    id: 'step3', 
    title: 'Bestätigung', 
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  }
];

<Stepper
  steps={stepsWithIcons}
  activeStep={activeStep}
  onStepChange={setActiveStep}
/>
```

### Stepper mit optionalen Schritten

```jsx
const stepsWithOptional = [
  { id: 'step1', title: 'Persönliche Daten' },
  { id: 'step2', title: 'Adresse', optional: true },
  { id: 'step3', title: 'Bestätigung' }
];

<Stepper
  steps={stepsWithOptional}
  activeStep={activeStep}
  onStepChange={setActiveStep}
/>
```

### Stepper mit deaktivierten Schritten

```jsx
const stepsWithDisabled = [
  { id: 'step1', title: 'Persönliche Daten' },
  { id: 'step2', title: 'Adresse' },
  { id: 'step3', title: 'Bestätigung', disabled: true }
];

<Stepper
  steps={stepsWithDisabled}
  activeStep={activeStep}
  onStepChange={setActiveStep}
/>
```

### Stepper mit benutzerdefinierten Aktionen

```jsx
function CustomActionsStepperExample() {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    { id: 'step1', title: 'Schritt 1' },
    { id: 'step2', title: 'Schritt 2' },
    { id: 'step3', title: 'Schritt 3' }
  ];
  
  const handleComplete = () => {
    console.log('Prozess abgeschlossen!');
    // Hier könnte z.B. ein API-Aufruf erfolgen
  };
  
  return (
    <Stepper
      steps={steps}
      activeStep={activeStep}
      onStepChange={setActiveStep}
    >
      <StepperContent>
        {/* Inhalte für die Schritte */}
      </StepperContent>
      
      <StepperActions
        backLabel="Zurück"
        nextLabel="Fortfahren"
        completeLabel="Senden"
        onBack={() => console.log('Zurück geklickt')}
        onNext={() => console.log('Weiter geklickt')}
        onComplete={handleComplete}
      />
    </Stepper>
  );
}
```

### Stepper ohne Verbindungslinien

```jsx
<Stepper
  steps={steps}
  activeStep={activeStep}
  onStepChange={setActiveStep}
  showConnector={false}
/>
```

### Stepper mit verschiedenen Varianten

```jsx
<Stepper
  steps={steps}
  activeStep={activeStep}
  onStepChange={setActiveStep}
  variant="outlined"
/>

<Stepper
  steps={steps}
  activeStep={activeStep}
  onStepChange={setActiveStep}
  variant="contained"
/>
```

### Stepper mit verschiedenen Größen

```jsx
<Stepper
  steps={steps}
  activeStep={activeStep}
  onStepChange={setActiveStep}
  size="sm"
/>

<Stepper
  steps={steps}
  activeStep={activeStep}
  onStepChange={setActiveStep}
  size="lg"
/>
```

## Props

### Stepper Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `steps` | `Step[]` | - | Schritte im Stepper |
| `activeStep` | `number` | - | Aktiver Schritt-Index |
| `onStepChange` | `(index: number) => void` | - | Callback beim Ändern des aktiven Schritts |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientierung des Steppers |
| `variant` | `'default' \| 'outlined' \| 'contained'` | `'default'` | Variante des Steppers |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Größe des Steppers |
| `children` | `ReactNode` | - | Kinder-Elemente (StepperContent) |
| `className` | `string` | - | Zusätzliche CSS-Klassen |
| `showConnector` | `boolean` | `true` | Verbindungslinie zwischen Schritten anzeigen |
| `clickable` | `boolean` | `true` | Klickbare Schritte |
| `ariaLabel` | `string` | `'Stepper'` | Alternativtext für Barrierefreiheit |

### Step Interface

| Eigenschaft | Typ | Beschreibung |
|-------------|-----|-------------|
| `id` | `string` | Eindeutige ID des Schritts |
| `title` | `ReactNode` | Titel des Schritts |
| `description` | `ReactNode` | Beschreibung des Schritts (optional) |
| `icon` | `ReactNode` | Icon des Schritts (optional) |
| `optional` | `boolean` | Ist der Schritt optional? |
| `disabled` | `boolean` | Ist der Schritt deaktiviert? |
| `data` | `any` | Benutzerdefinierte Daten für den Schritt |

### StepperContent Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `children` | `ReactNode` | - | Inhalt für den aktuellen Schritt |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### StepperActions Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `children` | `ReactNode` | - | Kinder-Elemente (Buttons) |
| `className` | `string` | - | Zusätzliche CSS-Klassen |
| `backLabel` | `string` | `'Zurück'` | Text für den Zurück-Button |
| `nextLabel` | `string` | `'Weiter'` | Text für den Weiter-Button |
| `completeLabel` | `string` | `'Abschließen'` | Text für den Abschließen-Button |
| `onBack` | `() => void` | - | Callback beim Klick auf Zurück |
| `onNext` | `() => void` | - | Callback beim Klick auf Weiter |
| `onComplete` | `() => void` | - | Callback beim Klick auf Abschließen |
| `showDefaultButtons` | `boolean` | `true` | Standardbuttons anzeigen |

## Barrierefreiheit

Die Stepper-Komponente ist für Barrierefreiheit optimiert:

- Verwendet die korrekten ARIA-Attribute (`role="navigation"`, `aria-current="step"`, `aria-disabled`)
- Unterstützt Tastaturnavigation (Tab, Enter)
- Screenreader-Unterstützung durch semantische Struktur

## Beispiele

### Registrierungsformular mit Stepper

```jsx
function RegistrationStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = () => {
    console.log('Registrierung abgeschlossen:', formData);
    // Hier könnte ein API-Aufruf erfolgen
    alert('Registrierung erfolgreich!');
  };
  
  const steps = [
    { id: 'account', title: 'Konto erstellen', description: 'Persönliche Informationen' },
    { id: 'address', title: 'Adresse', description: 'Lieferadresse' },
    { id: 'confirm', title: 'Bestätigung', description: 'Überprüfen Sie Ihre Angaben' }
  ];
  
  return (
    <div className="max-w-2xl mx-auto">
      <Stepper
        steps={steps}
        activeStep={activeStep}
        onStepChange={setActiveStep}
      >
        <StepperContent>
          {/* Schritt 1: Konto erstellen */}
          <div className="space-y-4 py-4">
            <h3 className="text-lg font-medium">Konto erstellen</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vorname
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nachname
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passwort
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          
          {/* Schritt 2: Adresse */}
          <div className="space-y-4 py-4">
            <h3 className="text-lg font-medium">Adresse</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Straße und Hausnummer
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stadt
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PLZ
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Land
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Land auswählen</option>
                <option value="DE">Deutschland</option>
                <option value="AT">Österreich</option>
                <option value="CH">Schweiz</option>
              </select>
            </div>
          </div>
          
          {/* Schritt 3: Bestätigung */}
          <div className="space-y-4 py-4">
            <h3 className="text-lg font-medium">Bestätigung</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Persönliche Informationen</h4>
              <p>Name: {formData.firstName} {formData.lastName}</p>
              <p>E-Mail: {formData.email}</p>
              
              <h4 className="font-medium mt-4 mb-2">Adresse</h4>
              <p>{formData.address}</p>
              <p>{formData.zipCode} {formData.city}</p>
              <p>{formData.country}</p>
            </div>
            <div className="mt-4">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-primary-600" />
                <span className="ml-2 text-sm text-gray-700">
                  Ich akzeptiere die AGB und Datenschutzbestimmungen
                </span>
              </label>
            </div>
          </div>
        </StepperContent>
        
        <StepperActions
          onComplete={handleSubmit}
        />
      </Stepper>
    </div>
  );
}
```

### Checkout-Prozess mit Stepper

```jsx
function CheckoutStepper() {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    { id: 'cart', title: 'Warenkorb', icon: '🛒' },
    { id: 'shipping', title: 'Versand', icon: '🚚' },
    { id: 'payment', title: 'Zahlung', icon: '💳' },
    { id: 'confirmation', title: 'Bestätigung', icon: '✅' }
  ];
  
  const handleComplete = () => {
    console.log('Bestellung abgeschlossen!');
    // Hier könnte ein API-Aufruf erfolgen
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <Stepper
        steps={steps}
        activeStep={activeStep}
        onStepChange={setActiveStep}
        variant="contained"
      >
        <StepperContent>
          {/* Warenkorb */}
          <div className="py-4">
            <h3 className="text-lg font-medium mb-4">Warenkorb</h3>
            <div className="border rounded-md divide-y">
              <div className="p-4 flex items-center">
                <div className="w-16 h-16 bg-gray-100 rounded"></div>
                <div className="ml-4 flex-1">
                  <h4 className="font-medium">Produkt 1</h4>
                  <p className="text-gray-500">€29,99</p>
                </div>
                <div className="flex items-center">
                  <button className="w-8 h-8 border rounded-l-md">-</button>
                  <span className="w-10 h-8 border-t border-b flex items-center justify-center">1</span>
                  <button className="w-8 h-8 border rounded-r-md">+</button>
                </div>
              </div>
              <div className="p-4 flex items-center">
                <div className="w-16 h-16 bg-gray-100 rounded"></div>
                <div className="ml-4 flex-1">
                  <h4 className="font-medium">Produkt 2</h4>
                  <p className="text-gray-500">€49,99</p>
                </div>
                <div className="flex items-center">
                  <button className="w-8 h-8 border rounded-l-md">-</button>
                  <span className="w-10 h-8 border-t border-b flex items-center justify-center">2</span>
                  <button className="w-8 h-8 border rounded-r-md">+</button>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between font-medium">
              <span>Gesamtsumme:</span>
              <span>€129,97</span>
            </div>
          </div>
          
          {/* Versand */}
          <div className="py-4">
            <h3 className="text-lg font-medium mb-4">Versandoptionen</h3>
            <div className="space-y-3">
              <label className="flex items-center p-3 border rounded-md">
                <input type="radio" name="shipping" className="h-4 w-4 text-primary-600" defaultChecked />
                <div className="ml-3">
                  <span className="font-medium">Standardversand</span>
                  <p className="text-sm text-gray-500">3-5 Werktage, €4,99</p>
                </div>
              </label>
              <label className="flex items-center p-3 border rounded-md">
                <input type="radio" name="shipping" className="h-4 w-4 text-primary-600" />
                <div className="ml-3">
                  <span className="font-medium">Expressversand</span>
                  <p className="text-sm text-gray-500">1-2 Werktage, €9,99</p>
                </div>
              </label>
            </div>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Lieferadresse</h4>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Vorname"
                  className="px-3 py-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Nachname"
                  className="px-3 py-2 border rounded-md"
                />
              </div>
              <input
                type="text"
                placeholder="Straße und Hausnummer"
                className="w-full mt-3 px-3 py-2 border rounded-md"
              />
              <div className="grid grid-cols-3 gap-4 mt-3">
                <input
                  type="text"
                  placeholder="PLZ"
                  className="px-3 py-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Stadt"
                  className="col-span-2 px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>
          
          {/* Zahlung */}
          <div className="py-4">
            <h3 className="text-lg font-medium mb-4">Zahlungsmethode</h3>
            <div className="space-y-3">
              <label className="flex items-center p-3 border rounded-md">
                <input type="radio" name="payment" className="h-4 w-4 text-primary-600" defaultChecked />
                <div className="ml-3">
                  <span className="font-medium">Kreditkarte</span>
                </div>
              </label>
              <label className="flex items-center p-3 border rounded-md">
                <input type="radio" name="payment" className="h-4 w-4 text-primary-600" />
                <div className="ml-3">
                  <span className="font-medium">PayPal</span>
                </div>
              </label>
              <label className="flex items-center p-3 border rounded-md">
                <input type="radio" name="payment" className="h-4 w-4 text-primary-600" />
                <div className="ml-3">
                  <span className="font-medium">Rechnung</span>
                </div>
              </label>
            </div>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Kreditkartendaten</h4>
              <input
                type="text"
                placeholder="Karteninhaber"
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Kartennummer"
                className="w-full mt-3 px-3 py-2 border rounded-md"
              />
              <div className="grid grid-cols-2 gap-4 mt-3">
                <input
                  type="text"
                  placeholder="Gültig bis (MM/JJ)"
                  className="px-3 py-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>
          
          {/* Bestätigung */}
          <div className="py-4">
            <h3 className="text-lg font-medium mb-4">Bestellübersicht</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Artikel</h4>
              <div className="flex justify-between">
                <span>Produkt 1 (1x)</span>
                <span>€29,99</span>
              </div>
              <div className="flex justify-between">
                <span>Produkt 2 (2x)</span>
                <span>€99,98</span>
              </div>
              
              <h4 className="font-medium mt-4 mb-2">Versand</h4>
              <div className="flex justify-between">
                <span>Standardversand</span>
                <span>€4,99</span>
              </div>
              
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between font-bold">
                  <span>Gesamtsumme</span>
                  <span>€134,96</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-primary-600" />
                <span className="ml-2 text-sm text-gray-700">
                  Ich akzeptiere die AGB und Datenschutzbestimmungen
                </span>
              </label>
            </div>
          </div>
        </StepperContent>
        
        <StepperActions
          completeLabel="Jetzt kaufen"
          onComplete={handleComplete}
        />
      </Stepper>
    </div>
  );
}
```