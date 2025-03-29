# RadioGroup

Die RadioGroup-Komponente ermöglicht es Benutzern, eine Option aus einer Liste von Optionen auszuwählen.

## Import

```jsx
import { RadioGroup, Radio } from '@smolitux/core';
```

## Verwendung

### Einfache RadioGroup

```jsx
<RadioGroup
  name="fruit"
  label="Wählen Sie eine Frucht"
  options={[
    { value: 'apple', label: 'Apfel' },
    { value: 'banana', label: 'Banane' },
    { value: 'orange', label: 'Orange' }
  ]}
/>
```

### RadioGroup mit ausgewähltem Wert

```jsx
<RadioGroup
  name="fruit"
  label="Wählen Sie eine Frucht"
  options={[
    { value: 'apple', label: 'Apfel' },
    { value: 'banana', label: 'Banane' },
    { value: 'orange', label: 'Orange' }
  ]}
  value="banana"
/>
```

### RadioGroup mit Hilfetext

```jsx
<RadioGroup
  name="fruit"
  label="Wählen Sie eine Frucht"
  helperText="Wählen Sie Ihre Lieblingsfrucht"
  options={[
    { value: 'apple', label: 'Apfel' },
    { value: 'banana', label: 'Banane' },
    { value: 'orange', label: 'Orange' }
  ]}
/>
```

### RadioGroup mit Fehlermeldung

```jsx
<RadioGroup
  name="fruit"
  label="Wählen Sie eine Frucht"
  error="Bitte wählen Sie eine Frucht aus"
  options={[
    { value: 'apple', label: 'Apfel' },
    { value: 'banana', label: 'Banane' },
    { value: 'orange', label: 'Orange' }
  ]}
/>
```

### RadioGroup mit horizontaler Ausrichtung

```jsx
<RadioGroup
  name="fruit"
  label="Wählen Sie eine Frucht"
  direction="horizontal"
  options={[
    { value: 'apple', label: 'Apfel' },
    { value: 'banana', label: 'Banane' },
    { value: 'orange', label: 'Orange' }
  ]}
/>
```

### RadioGroup mit verschiedenen Größen

```jsx
<RadioGroup
  name="size-sm"
  label="Klein (sm)"
  size="sm"
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]}
  className="mb-4"
/>

<RadioGroup
  name="size-md"
  label="Mittel (md)"
  size="md"
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]}
  className="mb-4"
/>

<RadioGroup
  name="size-lg"
  label="Groß (lg)"
  size="lg"
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]}
/>
```

### RadioGroup mit deaktivierten Optionen

```jsx
<RadioGroup
  name="fruit"
  label="Wählen Sie eine Frucht"
  options={[
    { value: 'apple', label: 'Apfel' },
    { value: 'banana', label: 'Banane', disabled: true },
    { value: 'orange', label: 'Orange' }
  ]}
/>
```

### Vollständig deaktivierte RadioGroup

```jsx
<RadioGroup
  name="fruit"
  label="Wählen Sie eine Frucht"
  disabled
  options={[
    { value: 'apple', label: 'Apfel' },
    { value: 'banana', label: 'Banane' },
    { value: 'orange', label: 'Orange' }
  ]}
/>
```

### Kontrollierte RadioGroup

```jsx
function ControlledRadioGroupExample() {
  const [selectedValue, setSelectedValue] = useState('apple');
  
  const handleChange = (value) => {
    setSelectedValue(value);
  };
  
  return (
    <div>
      <RadioGroup
        name="fruit"
        label="Wählen Sie eine Frucht"
        options={[
          { value: 'apple', label: 'Apfel' },
          { value: 'banana', label: 'Banane' },
          { value: 'orange', label: 'Orange' }
        ]}
        value={selectedValue}
        onChange={handleChange}
      />
      
      <p className="mt-2">
        Ausgewählte Frucht: <strong>{selectedValue}</strong>
      </p>
    </div>
  );
}
```

### Einzelne Radio-Komponenten

```jsx
function IndividualRadioExample() {
  const [selectedValue, setSelectedValue] = useState('option1');
  
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  
  return (
    <div className="space-y-2">
      <Radio
        name="options"
        value="option1"
        label="Option 1"
        checked={selectedValue === 'option1'}
        onChange={handleChange}
      />
      
      <Radio
        name="options"
        value="option2"
        label="Option 2"
        checked={selectedValue === 'option2'}
        onChange={handleChange}
      />
      
      <Radio
        name="options"
        value="option3"
        label="Option 3"
        checked={selectedValue === 'option3'}
        onChange={handleChange}
      />
    </div>
  );
}
```

### RadioGroup mit Validierung

```jsx
function ValidatedRadioGroupExample() {
  const [selectedValue, setSelectedValue] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (value) => {
    setSelectedValue(value);
    
    if (value) {
      setError('');
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedValue) {
      setError('Bitte wählen Sie eine Option aus');
    } else {
      alert(`Ausgewählte Option: ${selectedValue}`);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <RadioGroup
        name="options"
        label="Wählen Sie eine Option"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ]}
        value={selectedValue}
        onChange={handleChange}
        error={error}
      />
      
      <button 
        type="submit"
        className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md"
      >
        Absenden
      </button>
    </form>
  );
}
```

## Props

### RadioGroup Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `name` | `string` | - | Name für die Radio-Gruppe (wichtig für Formular-Handling) |
| `options` | `RadioOption[]` | - | Array von Radio-Optionen |
| `value` | `string` | - | Aktuell ausgewählter Wert |
| `onChange` | `(value: string) => void` | - | Callback bei Änderungen |
| `label` | `string` | - | Label für die gesamte Gruppe |
| `helperText` | `string` | - | Hilfetext |
| `error` | `string` | - | Fehlermeldung |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Größe der Radios |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Ausrichtung der Optionen |
| `disabled` | `boolean` | `false` | Deaktiviert alle Optionen |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### RadioOption Interface

| Eigenschaft | Typ | Beschreibung |
|-------------|-----|-------------|
| `value` | `string` | Wert der Option |
| `label` | `string` | Anzeigetext der Option |
| `disabled` | `boolean` | Ist die Option deaktiviert? |

### Radio Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `label` | `string` | - | Label für das Radio |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Größe des Radios |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

Zusätzlich werden alle nativen Props von `<input type="radio">` unterstützt.

## Barrierefreiheit

Die RadioGroup-Komponente ist für Barrierefreiheit optimiert:

- Verwendet native `<input type="radio">` Elemente für korrekte Semantik
- Labels sind korrekt mit den Eingabefeldern verknüpft
- Unterstützt Tastaturnavigation
- Fehlermeldungen werden mit ARIA-Attributen verknüpft
- Ausreichender Kontrast zwischen Vorder- und Hintergrund

## Beispiele

### Umfrage-Formular

```jsx
function SurveyForm() {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    education: '',
    satisfaction: ''
  });
  
  const [errors, setErrors] = useState({
    gender: '',
    age: '',
    education: '',
    satisfaction: ''
  });
  
  const handleChange = (field) => (value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Fehler zurücksetzen, wenn ein Wert ausgewählt wurde
    if (value) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validierung
    const newErrors = {};
    let hasError = false;
    
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        newErrors[key] = 'Dieses Feld ist erforderlich';
        hasError = true;
      }
    });
    
    if (hasError) {
      setErrors(newErrors);
      return;
    }
    
    // Formular absenden
    console.log('Formular abgesendet:', formData);
    alert('Vielen Dank für Ihre Teilnahme an der Umfrage!');
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Umfrage zur Kundenzufriedenheit</h2>
      
      <div className="space-y-6">
        <RadioGroup
          name="gender"
          label="Geschlecht"
          options={[
            { value: 'male', label: 'Männlich' },
            { value: 'female', label: 'Weiblich' },
            { value: 'diverse', label: 'Divers' },
            { value: 'not_specified', label: 'Keine Angabe' }
          ]}
          value={formData.gender}
          onChange={handleChange('gender')}
          error={errors.gender}
        />
        
        <RadioGroup
          name="age"
          label="Altersgruppe"
          options={[
            { value: 'under_18', label: 'Unter 18' },
            { value: '18_24', label: '18-24' },
            { value: '25_34', label: '25-34' },
            { value: '35_44', label: '35-44' },
            { value: '45_54', label: '45-54' },
            { value: '55_plus', label: '55+' }
          ]}
          value={formData.age}
          onChange={handleChange('age')}
          error={errors.age}
        />
        
        <RadioGroup
          name="education"
          label="Höchster Bildungsabschluss"
          options={[
            { value: 'school', label: 'Schulabschluss' },
            { value: 'apprenticeship', label: 'Ausbildung' },
            { value: 'bachelor', label: 'Bachelor' },
            { value: 'master', label: 'Master' },
            { value: 'phd', label: 'Promotion' },
            { value: 'other', label: 'Sonstiges' }
          ]}
          value={formData.education}
          onChange={handleChange('education')}
          error={errors.education}
        />
        
        <RadioGroup
          name="satisfaction"
          label="Wie zufrieden sind Sie mit unserem Produkt?"
          options={[
            { value: 'very_satisfied', label: 'Sehr zufrieden' },
            { value: 'satisfied', label: 'Zufrieden' },
            { value: 'neutral', label: 'Neutral' },
            { value: 'dissatisfied', label: 'Unzufrieden' },
            { value: 'very_dissatisfied', label: 'Sehr unzufrieden' }
          ]}
          value={formData.satisfaction}
          onChange={handleChange('satisfaction')}
          error={errors.satisfaction}
        />
      </div>
      
      <div className="mt-8">
        <button 
          type="submit"
          className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Umfrage absenden
        </button>
      </div>
    </form>
  );
}
```

### Zahlungsmethoden-Auswahl

```jsx
function PaymentMethodSelection() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardType, setCardType] = useState('');
  const [error, setError] = useState('');
  
  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
    setError('');
    
    // Zurücksetzen der Kartenauswahl, wenn nicht Kreditkarte gewählt wurde
    if (value !== 'credit_card') {
      setCardType('');
    }
  };
  
  const handleCardTypeChange = (value) => {
    setCardType(value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!paymentMethod) {
      setError('Bitte wählen Sie eine Zahlungsmethode');
      return;
    }
    
    if (paymentMethod === 'credit_card' && !cardType) {
      setError('Bitte wählen Sie einen Kartentyp');
      return;
    }
    
    // Formular absenden
    console.log('Zahlungsmethode:', paymentMethod, cardType ? `(${cardType})` : '');
    alert(`Zahlungsmethode ausgewählt: ${paymentMethod}${cardType ? ` (${cardType})` : ''}`);
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Zahlungsmethode auswählen</h2>
      
      <RadioGroup
        name="payment_method"
        options={[
          { 
            value: 'credit_card', 
            label: 'Kreditkarte',
          },
          { 
            value: 'paypal', 
            label: 'PayPal',
          },
          { 
            value: 'bank_transfer', 
            label: 'Überweisung',
          },
          { 
            value: 'invoice', 
            label: 'Rechnung',
          }
        ]}
        value={paymentMethod}
        onChange={handlePaymentMethodChange}
        error={error}
      />
      
      {paymentMethod === 'credit_card' && (
        <div className="mt-4 ml-6 border-l-2 border-gray-200 pl-4">
          <RadioGroup
            name="card_type"
            label="Kartentyp"
            options={[
              { value: 'visa', label: 'Visa' },
              { value: 'mastercard', label: 'MasterCard' },
              { value: 'amex', label: 'American Express' }
            ]}
            value={cardType}
            onChange={handleCardTypeChange}
          />
        </div>
      )}
      
      <div className="mt-6">
        <button 
          type="submit"
          className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Weiter zur Zahlung
        </button>
      </div>
    </form>
  );
}
```

### Produktvarianten-Auswahl

```jsx
function ProductVariantSelection() {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [errors, setErrors] = useState({ size: '', color: '' });
  
  const handleSizeChange = (value) => {
    setSelectedSize(value);
    setErrors(prev => ({ ...prev, size: '' }));
  };
  
  const handleColorChange = (value) => {
    setSelectedColor(value);
    setErrors(prev => ({ ...prev, color: '' }));
  };
  
  const handleAddToCart = () => {
    const newErrors = {};
    
    if (!selectedSize) {
      newErrors.size = 'Bitte wählen Sie eine Größe';
    }
    
    if (!selectedColor) {
      newErrors.color = 'Bitte wählen Sie eine Farbe';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Zum Warenkorb hinzufügen
    console.log('Zum Warenkorb hinzugefügt:', { size: selectedSize, color: selectedColor });
    alert(`Produkt in Größe ${selectedSize} und Farbe ${selectedColor} zum Warenkorb hinzugefügt`);
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex mb-6">
        <div className="w-1/3">
          <img 
            src="https://example.com/product-image.jpg" 
            alt="T-Shirt" 
            className="w-full h-auto rounded"
          />
        </div>
        <div className="w-2/3 pl-4">
          <h2 className="text-xl font-bold">Premium T-Shirt</h2>
          <p className="text-gray-500 mb-2">Artikelnr.: TS-12345</p>
          <p className="text-xl font-bold text-primary-600">€29,99</p>
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span className="text-gray-300">★</span>
            </div>
            <span className="ml-1 text-sm text-gray-500">(42 Bewertungen)</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <RadioGroup
          name="size"
          label="Größe"
          direction="horizontal"
          options={[
            { value: 'XS', label: 'XS' },
            { value: 'S', label: 'S' },
            { value: 'M', label: 'M' },
            { value: 'L', label: 'L' },
            { value: 'XL', label: 'XL' },
            { value: 'XXL', label: 'XXL' }
          ]}
          value={selectedSize}
          onChange={handleSizeChange}
          error={errors.size}
        />
        
        <RadioGroup
          name="color"
          label="Farbe"
          direction="horizontal"
          options={[
            { value: 'white', label: 'Weiß' },
            { value: 'black', label: 'Schwarz' },
            { value: 'blue', label: 'Blau' },
            { value: 'red', label: 'Rot' },
            { value: 'green', label: 'Grün' }
          ]}
          value={selectedColor}
          onChange={handleColorChange}
          error={errors.color}
        />
      </div>
      
      <div className="mt-6">
        <button 
          className="w-full py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          onClick={handleAddToCart}
        >
          In den Warenkorb
        </button>
      </div>
    </div>
  );
}
```