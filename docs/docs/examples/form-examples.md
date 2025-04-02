---
sidebar_position: 1
---

# Formular-Beispiele

Diese Seite enthält Beispiele für die Verwendung von Smolitux-UI-Formularkomponenten.

## Einfaches Anmeldeformular

Ein einfaches Anmeldeformular mit E-Mail und Passwort.

```jsx
import React from 'react';
import { Form, FormField, Input, Button, Stack } from '@smolitux/ui';

function LoginForm() {
  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
    // Hier würde die Anmeldelogik implementiert werden
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack spacing="md">
        <FormField
          label="E-Mail"
          name="email"
          required
          validations={{
            required: 'E-Mail ist erforderlich',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Ungültige E-Mail-Adresse'
            }
          }}
        >
          <Input type="email" placeholder="name@example.com" />
        </FormField>

        <FormField
          label="Passwort"
          name="password"
          required
          validations={{
            required: 'Passwort ist erforderlich',
            minLength: {
              value: 8,
              message: 'Passwort muss mindestens 8 Zeichen lang sein'
            }
          }}
        >
          <Input type="password" placeholder="Ihr Passwort" />
        </FormField>

        <Button type="submit" variant="primary" fullWidth>
          Anmelden
        </Button>
      </Stack>
    </Form>
  );
}

export default LoginForm;
```

## Registrierungsformular

Ein umfassenderes Registrierungsformular mit mehreren Feldern und Validierungen.

```jsx
import React from 'react';
import { 
  Form, 
  FormField, 
  Input, 
  Checkbox, 
  Select, 
  Button, 
  Stack, 
  Grid 
} from '@smolitux/ui';

function RegistrationForm() {
  const handleSubmit = (values) => {
    console.log('Registration submitted:', values);
    // Hier würde die Registrierungslogik implementiert werden
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack spacing="lg">
        <Grid columns={2} gap="md">
          <FormField
            label="Vorname"
            name="firstName"
            required
            validations={{ required: 'Vorname ist erforderlich' }}
          >
            <Input placeholder="Vorname" />
          </FormField>

          <FormField
            label="Nachname"
            name="lastName"
            required
            validations={{ required: 'Nachname ist erforderlich' }}
          >
            <Input placeholder="Nachname" />
          </FormField>
        </Grid>

        <FormField
          label="E-Mail"
          name="email"
          required
          validations={{
            required: 'E-Mail ist erforderlich',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Ungültige E-Mail-Adresse'
            }
          }}
        >
          <Input type="email" placeholder="name@example.com" />
        </FormField>

        <FormField
          label="Passwort"
          name="password"
          required
          validations={{
            required: 'Passwort ist erforderlich',
            minLength: {
              value: 8,
              message: 'Passwort muss mindestens 8 Zeichen lang sein'
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: 'Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten'
            }
          }}
        >
          <Input type="password" placeholder="Passwort erstellen" />
        </FormField>

        <FormField
          label="Passwort bestätigen"
          name="confirmPassword"
          required
          validations={{
            required: 'Passwortbestätigung ist erforderlich',
            validate: (value, values) => 
              value === values.password || 'Passwörter stimmen nicht überein'
          }}
        >
          <Input type="password" placeholder="Passwort bestätigen" />
        </FormField>

        <FormField
          label="Land"
          name="country"
          required
          validations={{ required: 'Land ist erforderlich' }}
        >
          <Select
            options={[
              { value: 'de', label: 'Deutschland' },
              { value: 'at', label: 'Österreich' },
              { value: 'ch', label: 'Schweiz' },
              { value: 'other', label: 'Anderes Land' }
            ]}
            placeholder="Land auswählen"
          />
        </FormField>

        <FormField
          name="terms"
          validations={{ required: 'Sie müssen den Nutzungsbedingungen zustimmen' }}
        >
          <Checkbox label="Ich stimme den Nutzungsbedingungen zu" required />
        </FormField>

        <Button type="submit" variant="primary" fullWidth>
          Registrieren
        </Button>
      </Stack>
    </Form>
  );
}

export default RegistrationForm;
```

## Mehrstufiges Formular

Ein mehrstufiges Formular mit Fortschrittsanzeige.

```jsx
import React, { useState } from 'react';
import { 
  Form, 
  FormField, 
  Input, 
  Button, 
  Stack, 
  Stepper, 
  Card,
  Flex
} from '@smolitux/ui';

function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const steps = [
    { title: 'Persönliche Daten', fields: ['firstName', 'lastName', 'email'] },
    { title: 'Adresse', fields: ['street', 'city', 'zipCode', 'country'] },
    { title: 'Abschluss', fields: [] }
  ];

  const handleNext = (values) => {
    setFormData({ ...formData, ...values });
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = (values) => {
    const finalData = { ...formData, ...values };
    console.log('Form submitted:', finalData);
    // Hier würde die finale Übermittlung stattfinden
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Form onSubmit={handleNext} defaultValues={formData}>
            <Stack spacing="md">
              <FormField
                label="Vorname"
                name="firstName"
                required
                validations={{ required: 'Vorname ist erforderlich' }}
              >
                <Input placeholder="Vorname" />
              </FormField>

              <FormField
                label="Nachname"
                name="lastName"
                required
                validations={{ required: 'Nachname ist erforderlich' }}
              >
                <Input placeholder="Nachname" />
              </FormField>

              <FormField
                label="E-Mail"
                name="email"
                required
                validations={{
                  required: 'E-Mail ist erforderlich',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Ungültige E-Mail-Adresse'
                  }
                }}
              >
                <Input type="email" placeholder="name@example.com" />
              </FormField>

              <Flex justifyContent="flex-end">
                <Button type="submit" variant="primary">
                  Weiter
                </Button>
              </Flex>
            </Stack>
          </Form>
        );
      case 1:
        return (
          <Form onSubmit={handleNext} defaultValues={formData}>
            <Stack spacing="md">
              <FormField
                label="Straße und Hausnummer"
                name="street"
                required
                validations={{ required: 'Straße ist erforderlich' }}
              >
                <Input placeholder="Straße und Hausnummer" />
              </FormField>

              <FormField
                label="Stadt"
                name="city"
                required
                validations={{ required: 'Stadt ist erforderlich' }}
              >
                <Input placeholder="Stadt" />
              </FormField>

              <FormField
                label="Postleitzahl"
                name="zipCode"
                required
                validations={{ required: 'Postleitzahl ist erforderlich' }}
              >
                <Input placeholder="Postleitzahl" />
              </FormField>

              <FormField
                label="Land"
                name="country"
                required
                validations={{ required: 'Land ist erforderlich' }}
              >
                <Input placeholder="Land" />
              </FormField>

              <Flex justifyContent="space-between">
                <Button variant="secondary" onClick={handlePrevious}>
                  Zurück
                </Button>
                <Button type="submit" variant="primary">
                  Weiter
                </Button>
              </Flex>
            </Stack>
          </Form>
        );
      case 2:
        return (
          <Stack spacing="lg">
            <Card>
              <Stack spacing="md">
                <h3>Zusammenfassung</h3>
                <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>E-Mail:</strong> {formData.email}</p>
                <p><strong>Adresse:</strong> {formData.street}, {formData.zipCode} {formData.city}, {formData.country}</p>
              </Stack>
            </Card>

            <Flex justifyContent="space-between">
              <Button variant="secondary" onClick={handlePrevious}>
                Zurück
              </Button>
              <Button variant="primary" onClick={() => handleSubmit({})}>
                Absenden
              </Button>
            </Flex>
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <Stack spacing="xl">
      <Stepper activeStep={step} steps={steps.map(s => s.title)} />
      {renderStep()}
    </Stack>
  );
}

export default MultiStepForm;
```