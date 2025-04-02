---
sidebar_position: 1
---

# Formular-Beispiele

Diese Seite enthält Beispiele für die Verwendung von Smolitux-UI-Formularkomponenten.

## Einfaches Anmeldeformular

Ein einfaches Anmeldeformular mit E-Mail und Passwort.

{% raw %}
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
{% endraw %}

## Registrierungsformular

Ein umfassenderes Registrierungsformular mit mehreren Feldern und Validierungen.

{% raw %}
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
{% endraw %}

## Mehrstufiges Formular

Ein mehrstufiges Formular mit Fortschrittsanzeige.

{% raw %}
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
{% endraw %}

## Dynamisches Formular

Ein Formular mit dynamisch hinzufügbaren Feldern.

```jsx
import React from 'react';
import { 
  Form, 
  FormField, 
  Input, 
  Button, 
  Stack, 
  Flex,
  IconButton
} from '@smolitux/ui';
import { PlusIcon, TrashIcon } from '@smolitux/icons';

function DynamicForm() {
  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
    // Hier würde die Verarbeitung stattfinden
  };

  return (
    <Form onSubmit={handleSubmit}>
      {({ control, register, getValues, setValue }) => (
        <Stack spacing="lg">
          <FormField
            label="Projektname"
            name="projectName"
            required
            validations={{ required: 'Projektname ist erforderlich' }}
          >
            <Input placeholder="Projektname eingeben" />
          </FormField>

          <Stack spacing="md">
            <Flex justifyContent="space-between" alignItems="center">
              <h3>Teammitglieder</h3>
              <IconButton
                icon={<PlusIcon />}
                aria-label="Teammitglied hinzufügen"
                onClick={() => {
                  const members = getValues('members') || [];
                  setValue('members', [
                    ...members,
                    { name: '', email: '', role: '' }
                  ]);
                }}
              />
            </Flex>

            {control.fields.members?.map((member, index) => (
              <Stack key={index} spacing="sm" padding="md" border="1px solid" borderColor="gray.200" borderRadius="md">
                <Flex justifyContent="space-between" alignItems="center">
                  <h4>Teammitglied {index + 1}</h4>
                  <IconButton
                    icon={<TrashIcon />}
                    aria-label="Teammitglied entfernen"
                    variant="danger"
                    onClick={() => {
                      const members = getValues('members');
                      setValue('members', members.filter((_, i) => i !== index));
                    }}
                  />
                </Flex>

                <FormField
                  label="Name"
                  name={`members[${index}].name`}
                  required
                  validations={{ required: 'Name ist erforderlich' }}
                >
                  <Input placeholder="Name" />
                </FormField>

                <FormField
                  label="E-Mail"
                  name={`members[${index}].email`}
                  required
                  validations={{ 
                    required: 'E-Mail ist erforderlich',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Ungültige E-Mail-Adresse'
                    }
                  }}
                >
                  <Input type="email" placeholder="E-Mail" />
                </FormField>

                <FormField
                  label="Rolle"
                  name={`members[${index}].role`}
                  required
                  validations={{ required: 'Rolle ist erforderlich' }}
                >
                  <Input placeholder="Rolle" />
                </FormField>
              </Stack>
            ))}
          </Stack>

          <Button type="submit" variant="primary">
            Projekt erstellen
          </Button>
        </Stack>
      )}
    </Form>
  );
}

export default DynamicForm;
```

## Formular mit Datei-Upload

Ein Formular mit Datei-Upload-Funktionalität.

```jsx
import React from 'react';
import { 
  Form, 
  FormField, 
  Input, 
  FileUpload, 
  Button, 
  Stack 
} from '@smolitux/ui';

function FileUploadForm() {
  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
    // Hier würde die Verarbeitung mit Datei-Upload stattfinden
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack spacing="lg">
        <FormField
          label="Dokumenttitel"
          name="title"
          required
          validations={{ required: 'Dokumenttitel ist erforderlich' }}
        >
          <Input placeholder="Titel eingeben" />
        </FormField>

        <FormField
          label="Beschreibung"
          name="description"
        >
          <Input as="textarea" rows={4} placeholder="Beschreibung eingeben" />
        </FormField>

        <FormField
          label="Dokument hochladen"
          name="document"
          required
          validations={{ required: 'Dokument ist erforderlich' }}
        >
          <FileUpload
            accept=".pdf,.doc,.docx"
            maxSize={5 * 1024 * 1024} // 5MB
            maxFiles={1}
            onDrop={(files) => console.log('Files dropped:', files)}
            onError={(error) => console.error('Upload error:', error)}
          />
        </FormField>

        <Button type="submit" variant="primary">
          Dokument hochladen
        </Button>
      </Stack>
    </Form>
  );
}

export default FileUploadForm;
```