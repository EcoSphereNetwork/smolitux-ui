# Formularvalidierung

Die Smolitux UI Bibliothek bietet ein umfassendes System zur Formularvalidierung, das einfach zu verwenden und flexibel ist.

## Überblick

Das Validierungssystem besteht aus mehreren Komponenten:

- **Hooks**: `useForm`, `useField`, `useValidation` für die Verwaltung von Formulardaten und Validierung
- **Validatoren**: Vorgefertigte Funktionen zur Validierung von Eingaben
- **Komponenten**: `Form` und `FormField` für die einfache Integration in React-Anwendungen

## Grundlegende Verwendung

### Einfaches Formular mit Validierung

```tsx
import { useForm, useField, required, email } from '@smolitux/core';

function ContactForm() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      // Hier können Sie die Daten an einen Server senden
    }
  });

  const nameField = useField('name', form, {
    validators: [required('Name ist erforderlich')]
  });

  const emailField = useField('email', form, {
    validators: [
      required('E-Mail ist erforderlich'),
      email('Bitte geben Sie eine gültige E-Mail-Adresse ein')
    ]
  });

  const messageField = useField('message', form, {
    validators: [required('Nachricht ist erforderlich')]
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          {...nameField.inputProps}
        />
        {nameField.error && <div className="error">{nameField.error}</div>}
      </div>

      <div>
        <label htmlFor="email">E-Mail</label>
        <input
          id="email"
          type="email"
          {...emailField.inputProps}
        />
        {emailField.error && <div className="error">{emailField.error}</div>}
      </div>

      <div>
        <label htmlFor="message">Nachricht</label>
        <textarea
          id="message"
          {...messageField.inputProps}
        />
        {messageField.error && <div className="error">{messageField.error}</div>}
      </div>

      <button type="submit" disabled={form.isSubmitting || !form.isValid}>
        Absenden
      </button>
    </form>
  );
}
```

### Verwendung mit Smolitux UI Komponenten

```tsx
import { 
  Form, 
  FormField, 
  Input, 
  TextArea, 
  Button, 
  required, 
  email 
} from '@smolitux/core';

function ContactForm() {
  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
    // Hier können Sie die Daten an einen Server senden
  };

  return (
    <Form
      initialValues={{
        name: '',
        email: '',
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

          <FormField
            name="message"
            label="Nachricht"
            validators={[required('Nachricht ist erforderlich')]}
          >
            {({ field, error }) => (
              <TextArea {...field} error={error} />
            )}
          </FormField>

          <Button type="submit" disabled={isSubmitting || !isValid}>
            Absenden
          </Button>
        </>
      )}
    </Form>
  );
}
```

## Validierungsstrategien

Das Validierungssystem unterstützt verschiedene Strategien:

- **onChange**: Validierung bei jeder Änderung des Feldwerts
- **onBlur**: Validierung, wenn das Feld den Fokus verliert
- **onSubmit**: Validierung nur beim Absenden des Formulars

```tsx
const form = useForm({
  // ...
  validationStrategy: 'onBlur' // 'onChange', 'onBlur', oder 'onSubmit'
});
```

## Vorgefertigte Validatoren

Die Bibliothek enthält viele vorgefertigte Validatoren:

- `required`: Prüft, ob ein Wert vorhanden ist
- `email`: Prüft, ob ein Wert eine gültige E-Mail-Adresse ist
- `minLength`: Prüft, ob ein Wert eine Mindestlänge hat
- `maxLength`: Prüft, ob ein Wert eine maximale Länge nicht überschreitet
- `pattern`: Prüft, ob ein Wert einem regulären Ausdruck entspricht
- `number`: Prüft, ob ein Wert eine Zahl ist
- `min`: Prüft, ob ein Zahlenwert größer oder gleich einem Mindestwert ist
- `max`: Prüft, ob ein Zahlenwert kleiner oder gleich einem Maximalwert ist
- `url`: Prüft, ob ein Wert eine gültige URL ist
- `date`: Prüft, ob ein Wert ein gültiges Datum ist

## Eigene Validatoren

Sie können auch eigene Validatoren erstellen:

```tsx
import { createValidator } from '@smolitux/core';

const passwordStrength = createValidator((value) => {
  if (!value) return true; // Leere Werte werden vom required-Validator abgefangen
  
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumbers = /\d/.test(value);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  
  const isStrong = hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
  
  return isStrong ? true : 'Das Passwort muss Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen enthalten';
});

// Verwendung
const passwordField = useField('password', form, {
  validators: [
    required('Passwort ist erforderlich'),
    minLength(8, 'Das Passwort muss mindestens 8 Zeichen lang sein'),
    passwordStrength
  ]
});
```

## Asynchrone Validierung

Das System unterstützt auch asynchrone Validierung:

```tsx
import { createAsyncValidator } from '@smolitux/core';

const usernameAvailable = createAsyncValidator(async (value) => {
  if (!value) return true;
  
  try {
    const response = await fetch(`/api/check-username?username=${value}`);
    const data = await response.json();
    
    return data.available ? true : 'Dieser Benutzername ist bereits vergeben';
  } catch (error) {
    console.error('Fehler bei der Überprüfung des Benutzernamens:', error);
    return 'Fehler bei der Überprüfung des Benutzernamens';
  }
});

// Verwendung
const usernameField = useField('username', form, {
  validators: [
    required('Benutzername ist erforderlich'),
    minLength(3, 'Der Benutzername muss mindestens 3 Zeichen lang sein'),
    usernameAvailable
  ]
});
```

## Abhängige Validierung

Sie können auch Validierungen erstellen, die von anderen Feldern abhängen:

```tsx
import { createDependentValidator } from '@smolitux/core';

const passwordsMatch = createDependentValidator((value, values) => {
  if (!value) return true;
  
  return value === values.password ? true : 'Die Passwörter stimmen nicht überein';
});

// Verwendung
const confirmPasswordField = useField('confirmPassword', form, {
  validators: [
    required('Passwortbestätigung ist erforderlich'),
    passwordsMatch
  ]
});
```

## Formularkontext

Mit dem `useFormContext` Hook können Sie auf Formulardaten und -methoden in verschachtelten Komponenten zugreifen:

```tsx
import { Form, useFormContext, Button } from '@smolitux/core';

function SubmitButton() {
  const { isSubmitting, isValid } = useFormContext();
  
  return (
    <Button type="submit" disabled={isSubmitting || !isValid}>
      Absenden
    </Button>
  );
}

function ContactForm() {
  return (
    <Form
      initialValues={{ /* ... */ }}
      onSubmit={/* ... */}
    >
      {/* Formularfelder */}
      <SubmitButton />
    </Form>
  );
}
```

## Zusammenfassung

Das Formularvalidierungssystem der Smolitux UI Bibliothek bietet:

- Einfache und flexible API für die Formularvalidierung
- Vorgefertigte Validatoren für häufige Anwendungsfälle
- Unterstützung für benutzerdefinierte und asynchrone Validierung
- Integration mit Smolitux UI Komponenten
- Verschiedene Validierungsstrategien
- Kontextbasierter Zugriff auf Formulardaten und -methoden