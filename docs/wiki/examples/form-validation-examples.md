# Formularvalidierung Beispiele

Diese Seite enthält praktische Beispiele für die Verwendung des Formularvalidierungssystems der Smolitux UI Bibliothek.

## Einfaches Anmeldeformular

```tsx
import { 
  Form, 
  FormField, 
  Input, 
  Button, 
  required, 
  email, 
  minLength 
} from '@smolitux/core';

function LoginForm() {
  const handleSubmit = (values) => {
    console.log('Login submitted:', values);
    // Hier würde die Anmeldung verarbeitet werden
  };

  return (
    <Form
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={handleSubmit}
      validationStrategy="onBlur"
    >
      {({ isSubmitting, isValid }) => (
        <>
          <FormField
            name="email"
            label="E-Mail"
            validators={[
              required('E-Mail ist erforderlich'),
              email('Bitte geben Sie eine gültige E-Mail-Adresse ein')
            ]}
          >
            {({ field, error }) => (
              <Input 
                type="email" 
                placeholder="name@example.com" 
                {...field} 
                error={error} 
              />
            )}
          </FormField>

          <FormField
            name="password"
            label="Passwort"
            validators={[
              required('Passwort ist erforderlich'),
              minLength(8, 'Das Passwort muss mindestens 8 Zeichen lang sein')
            ]}
          >
            {({ field, error }) => (
              <Input 
                type="password" 
                placeholder="Ihr Passwort" 
                {...field} 
                error={error} 
              />
            )}
          </FormField>

          <Button 
            type="submit" 
            variant="primary" 
            disabled={isSubmitting || !isValid}
            isLoading={isSubmitting}
          >
            Anmelden
          </Button>
        </>
      )}
    </Form>
  );
}
```

## Registrierungsformular mit Passwortbestätigung

```tsx
import { 
  Form, 
  FormField, 
  Input, 
  Button, 
  required, 
  email, 
  minLength, 
  createDependentValidator 
} from '@smolitux/core';

// Validator für die Passwortbestätigung
const passwordsMatch = createDependentValidator((value, values) => {
  if (!value) return true;
  
  return value === values.password 
    ? true 
    : 'Die Passwörter stimmen nicht überein';
});

function RegistrationForm() {
  const handleSubmit = (values) => {
    console.log('Registration submitted:', values);
    // Hier würde die Registrierung verarbeitet werden
  };

  return (
    <Form
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid }) => (
        <>
          <FormField
            name="name"
            label="Name"
            validators={[required('Name ist erforderlich')]}
          >
            {({ field, error }) => (
              <Input 
                placeholder="Ihr Name" 
                {...field} 
                error={error} 
              />
            )}
          </FormField>

          <FormField
            name="email"
            label="E-Mail"
            validators={[
              required('E-Mail ist erforderlich'),
              email('Bitte geben Sie eine gültige E-Mail-Adresse ein')
            ]}
          >
            {({ field, error }) => (
              <Input 
                type="email" 
                placeholder="name@example.com" 
                {...field} 
                error={error} 
              />
            )}
          </FormField>

          <FormField
            name="password"
            label="Passwort"
            validators={[
              required('Passwort ist erforderlich'),
              minLength(8, 'Das Passwort muss mindestens 8 Zeichen lang sein')
            ]}
          >
            {({ field, error }) => (
              <Input 
                type="password" 
                placeholder="Ihr Passwort" 
                {...field} 
                error={error} 
              />
            )}
          </FormField>

          <FormField
            name="confirmPassword"
            label="Passwort bestätigen"
            validators={[
              required('Passwortbestätigung ist erforderlich'),
              passwordsMatch
            ]}
          >
            {({ field, error }) => (
              <Input 
                type="password" 
                placeholder="Passwort wiederholen" 
                {...field} 
                error={error} 
              />
            )}
          </FormField>

          <Button 
            type="submit" 
            variant="primary" 
            disabled={isSubmitting || !isValid}
            isLoading={isSubmitting}
          >
            Registrieren
          </Button>
        </>
      )}
    </Form>
  );
}
```

## Kontaktformular mit asynchroner Validierung

```tsx
import { 
  Form, 
  FormField, 
  Input, 
  TextArea, 
  Select, 
  Button, 
  required, 
  email, 
  createAsyncValidator 
} from '@smolitux/core';

// Asynchroner Validator für die Überprüfung der E-Mail-Adresse
const emailExists = createAsyncValidator(async (value) => {
  if (!value) return true;
  
  // Simulierte API-Anfrage
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In einer echten Anwendung würde hier eine API-Anfrage stehen
  const existingEmails = ['test@example.com', 'info@example.com'];
  const exists = existingEmails.includes(value);
  
  return !exists ? true : 'Diese E-Mail-Adresse ist bereits registriert';
});

function ContactForm() {
  const handleSubmit = (values) => {
    console.log('Contact form submitted:', values);
    // Hier würde das Formular verarbeitet werden
  };

  const subjectOptions = [
    { value: 'support', label: 'Support' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'other', label: 'Sonstiges' }
  ];

  return (
    <Form
      initialValues={{
        name: '',
        email: '',
        subject: '',
        message: ''
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid }) => (
        <>
          <FormField
            name="name"
            label="Name"
            validators={[required('Name ist erforderlich')]}
          >
            {({ field, error }) => (
              <Input 
                placeholder="Ihr Name" 
                {...field} 
                error={error} 
              />
            )}
          </FormField>

          <FormField
            name="email"
            label="E-Mail"
            validators={[
              required('E-Mail ist erforderlich'),
              email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
              emailExists
            ]}
          >
            {({ field, error, isValidating }) => (
              <Input 
                type="email" 
                placeholder="name@example.com" 
                {...field} 
                error={error}
                isLoading={isValidating}
              />
            )}
          </FormField>

          <FormField
            name="subject"
            label="Betreff"
            validators={[required('Betreff ist erforderlich')]}
          >
            {({ field, error }) => (
              <Select 
                options={subjectOptions} 
                placeholder="Betreff auswählen" 
                {...field} 
                error={error} 
              />
            )}
          </FormField>

          <FormField
            name="message"
            label="Nachricht"
            validators={[required('Nachricht ist erforderlich')]}
          >
            {({ field, error }) => (
              <TextArea 
                placeholder="Ihre Nachricht" 
                rows={5} 
                {...field} 
                error={error} 
              />
            )}
          </FormField>

          <Button 
            type="submit" 
            variant="primary" 
            disabled={isSubmitting || !isValid}
            isLoading={isSubmitting}
          >
            Nachricht senden
          </Button>
        </>
      )}
    </Form>
  );
}
```

## Mehrstufiges Formular

```tsx
import { 
  useState, 
  useEffect 
} from 'react';
import { 
  Form, 
  FormField, 
  Input, 
  Select, 
  Button, 
  Card, 
  required, 
  email, 
  number, 
  min, 
  max 
} from '@smolitux/core';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Persönliche Daten
    firstName: '',
    lastName: '',
    email: '',
    // Adressdaten
    street: '',
    city: '',
    zipCode: '',
    country: '',
    // Zahlungsdaten
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const handleSubmitStep = (values, { setSubmitting }) => {
    setFormData(prev => ({ ...prev, ...values }));
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Finaler Submit
      console.log('Final form data:', { ...formData, ...values });
      // Hier würde das Formular verarbeitet werden
    }
    
    setSubmitting(false);
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const countryOptions = [
    { value: 'de', label: 'Deutschland' },
    { value: 'at', label: 'Österreich' },
    { value: 'ch', label: 'Schweiz' }
  ];
  
  return (
    <div>
      <div className="steps-indicator">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>Persönliche Daten</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>Adresse</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>Zahlung</div>
      </div>
      
      <Card>
        {step === 1 && (
          <Form
            initialValues={{
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email
            }}
            onSubmit={handleSubmitStep}
          >
            {({ isSubmitting, isValid }) => (
              <>
                <FormField
                  name="firstName"
                  label="Vorname"
                  validators={[required('Vorname ist erforderlich')]}
                >
                  {({ field, error }) => (
                    <Input {...field} error={error} />
                  )}
                </FormField>
                
                <FormField
                  name="lastName"
                  label="Nachname"
                  validators={[required('Nachname ist erforderlich')]}
                >
                  {({ field, error }) => (
                    <Input {...field} error={error} />
                  )}
                </FormField>
                
                <FormField
                  name="email"
                  label="E-Mail"
                  validators={[
                    required('E-Mail ist erforderlich'),
                    email('Bitte geben Sie eine gültige E-Mail-Adresse ein')
                  ]}
                >
                  {({ field, error }) => (
                    <Input type="email" {...field} error={error} />
                  )}
                </FormField>
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={isSubmitting || !isValid}
                >
                  Weiter
                </Button>
              </>
            )}
          </Form>
        )}
        
        {step === 2 && (
          <Form
            initialValues={{
              street: formData.street,
              city: formData.city,
              zipCode: formData.zipCode,
              country: formData.country
            }}
            onSubmit={handleSubmitStep}
          >
            {({ isSubmitting, isValid }) => (
              <>
                <FormField
                  name="street"
                  label="Straße und Hausnummer"
                  validators={[required('Straße ist erforderlich')]}
                >
                  {({ field, error }) => (
                    <Input {...field} error={error} />
                  )}
                </FormField>
                
                <FormField
                  name="city"
                  label="Stadt"
                  validators={[required('Stadt ist erforderlich')]}
                >
                  {({ field, error }) => (
                    <Input {...field} error={error} />
                  )}
                </FormField>
                
                <FormField
                  name="zipCode"
                  label="PLZ"
                  validators={[
                    required('PLZ ist erforderlich'),
                    number('PLZ muss eine Zahl sein')
                  ]}
                >
                  {({ field, error }) => (
                    <Input {...field} error={error} />
                  )}
                </FormField>
                
                <FormField
                  name="country"
                  label="Land"
                  validators={[required('Land ist erforderlich')]}
                >
                  {({ field, error }) => (
                    <Select 
                      options={countryOptions} 
                      {...field} 
                      error={error} 
                    />
                  )}
                </FormField>
                
                <div className="button-group">
                  <Button 
                    type="button" 
                    variant="secondary" 
                    onClick={handleBack}
                  >
                    Zurück
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={isSubmitting || !isValid}
                  >
                    Weiter
                  </Button>
                </div>
              </>
            )}
          </Form>
        )}
        
        {step === 3 && (
          <Form
            initialValues={{
              cardNumber: formData.cardNumber,
              cardName: formData.cardName,
              expiryDate: formData.expiryDate,
              cvv: formData.cvv
            }}
            onSubmit={handleSubmitStep}
          >
            {({ isSubmitting, isValid }) => (
              <>
                <FormField
                  name="cardNumber"
                  label="Kartennummer"
                  validators={[
                    required('Kartennummer ist erforderlich'),
                    number('Kartennummer muss eine Zahl sein')
                  ]}
                >
                  {({ field, error }) => (
                    <Input 
                      placeholder="1234 5678 9012 3456" 
                      {...field} 
                      error={error} 
                    />
                  )}
                </FormField>
                
                <FormField
                  name="cardName"
                  label="Name auf der Karte"
                  validators={[required('Name ist erforderlich')]}
                >
                  {({ field, error }) => (
                    <Input {...field} error={error} />
                  )}
                </FormField>
                
                <div className="row">
                  <FormField
                    name="expiryDate"
                    label="Ablaufdatum"
                    validators={[required('Ablaufdatum ist erforderlich')]}
                  >
                    {({ field, error }) => (
                      <Input 
                        placeholder="MM/JJ" 
                        {...field} 
                        error={error} 
                      />
                    )}
                  </FormField>
                  
                  <FormField
                    name="cvv"
                    label="CVV"
                    validators={[
                      required('CVV ist erforderlich'),
                      number('CVV muss eine Zahl sein'),
                      min(100, 'CVV muss mindestens 3 Ziffern haben'),
                      max(9999, 'CVV darf maximal 4 Ziffern haben')
                    ]}
                  >
                    {({ field, error }) => (
                      <Input 
                        placeholder="123" 
                        {...field} 
                        error={error} 
                      />
                    )}
                  </FormField>
                </div>
                
                <div className="button-group">
                  <Button 
                    type="button" 
                    variant="secondary" 
                    onClick={handleBack}
                  >
                    Zurück
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={isSubmitting || !isValid}
                    isLoading={isSubmitting}
                  >
                    Bestellung abschließen
                  </Button>
                </div>
              </>
            )}
          </Form>
        )}
      </Card>
    </div>
  );
}
```

## Dynamisches Formular mit Arrays

```tsx
import { 
  Form, 
  FormField, 
  Input, 
  Button, 
  required 
} from '@smolitux/core';

function DynamicForm() {
  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
  };

  return (
    <Form
      initialValues={{
        title: '',
        items: [{ name: '', quantity: '' }]
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting, isValid }) => (
        <>
          <FormField
            name="title"
            label="Titel"
            validators={[required('Titel ist erforderlich')]}
          >
            {({ field, error }) => (
              <Input {...field} error={error} />
            )}
          </FormField>

          <div className="items-container">
            <h3>Artikel</h3>
            
            {values.items.map((item, index) => (
              <div key={index} className="item-row">
                <FormField
                  name={`items[${index}].name`}
                  label={`Artikel ${index + 1}`}
                  validators={[required('Artikelname ist erforderlich')]}
                >
                  {({ field, error }) => (
                    <Input {...field} error={error} />
                  )}
                </FormField>
                
                <FormField
                  name={`items[${index}].quantity`}
                  label="Menge"
                  validators={[required('Menge ist erforderlich')]}
                >
                  {({ field, error }) => (
                    <Input 
                      type="number" 
                      min="1" 
                      {...field} 
                      error={error} 
                    />
                  )}
                </FormField>
                
                {values.items.length > 1 && (
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => {
                      const newItems = [...values.items];
                      newItems.splice(index, 1);
                      setFieldValue('items', newItems);
                    }}
                  >
                    Entfernen
                  </Button>
                )}
              </div>
            ))}
            
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setFieldValue('items', [
                  ...values.items, 
                  { name: '', quantity: '' }
                ]);
              }}
            >
              Artikel hinzufügen
            </Button>
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            disabled={isSubmitting || !isValid}
          >
            Speichern
          </Button>
        </>
      )}
    </Form>
  );
}
```

Diese Beispiele zeigen die Vielseitigkeit und Flexibilität des Formularvalidierungssystems der Smolitux UI Bibliothek. Sie können diese Beispiele als Ausgangspunkt für Ihre eigenen Formulare verwenden.