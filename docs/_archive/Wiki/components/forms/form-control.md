# FormControl

Die FormControl-Komponente dient als Container für Formularelemente und bietet eine konsistente Struktur für Labels, Hilfetexte und Fehlermeldungen. Sie stellt einen Context bereit, der von untergeordneten Komponenten wie Input, Select und Checkbox genutzt werden kann.

## Import

```jsx
import { FormControl, FormLabel, FormHelperText, FormErrorMessage } from '@smolitux/core';
```

## Verwendung

### Einfaches Formularfeld

```jsx
<FormControl>
  <FormLabel>Name</FormLabel>
  <Input placeholder="Geben Sie Ihren Namen ein" />
  <FormHelperText>Bitte geben Sie Ihren vollständigen Namen ein.</FormHelperText>
</FormControl>
```

### Formularfeld mit Fehlermeldung

```jsx
<FormControl isInvalid={!!errors.email}>
  <FormLabel>E-Mail</FormLabel>
  <Input 
    type="email" 
    placeholder="name@beispiel.de" 
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  {errors.email ? (
    <FormErrorMessage>{errors.email}</FormErrorMessage>
  ) : (
    <FormHelperText>Wir werden Ihre E-Mail niemals weitergeben.</FormHelperText>
  )}
</FormControl>
```

### Deaktiviertes Formularfeld

```jsx
<FormControl isDisabled>
  <FormLabel>Benutzername</FormLabel>
  <Input defaultValue="max.mustermann" />
  <FormHelperText>Der Benutzername kann nicht geändert werden.</FormHelperText>
</FormControl>
```

### Erforderliches Formularfeld

```jsx
<FormControl isRequired>
  <FormLabel>Passwort</FormLabel>
  <Input type="password" />
  <FormHelperText>Das Passwort muss mindestens 8 Zeichen lang sein.</FormHelperText>
</FormControl>
```

### Formularfeld mit verschiedenen Größen

```jsx
<FormControl size="sm">
  <FormLabel>Klein</FormLabel>
  <Input placeholder="Kleines Eingabefeld" />
</FormControl>

<FormControl size="md">
  <FormLabel>Mittel</FormLabel>
  <Input placeholder="Mittleres Eingabefeld" />
</FormControl>

<FormControl size="lg">
  <FormLabel>Groß</FormLabel>
  <Input placeholder="Großes Eingabefeld" />
</FormControl>
```

### Formularfeld mit verschiedenen Varianten

```jsx
<FormControl variant="default">
  <FormLabel>Standard</FormLabel>
  <Input placeholder="Standard-Eingabefeld" />
</FormControl>

<FormControl variant="filled">
  <FormLabel>Gefüllt</FormLabel>
  <Input placeholder="Gefülltes Eingabefeld" />
</FormControl>

<FormControl variant="outlined">
  <FormLabel>Umrandet</FormLabel>
  <Input placeholder="Umrandetes Eingabefeld" />
</FormControl>
```

### Formularfeld mit verschiedenen Label-Positionen

```jsx
<FormControl labelPosition="top">
  <FormLabel>Label oben</FormLabel>
  <Input placeholder="Label oben" />
</FormControl>

<FormControl labelPosition="left">
  <FormLabel>Label links</FormLabel>
  <Input placeholder="Label links" />
</FormControl>

<FormControl labelPosition="floating">
  <Input placeholder="Schwebendes Label" />
  <FormLabel>Schwebendes Label</FormLabel>
</FormControl>
```

### Formularfeld mit erfolgreichem Zustand

```jsx
<FormControl isSuccess>
  <FormLabel>Benutzername</FormLabel>
  <Input value="max.mustermann" />
  <FormHelperText>Benutzername ist verfügbar!</FormHelperText>
</FormControl>
```

## Props

### FormControl

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `id` | `string` | - | ID für das Formularfeld |
| `isDisabled` | `boolean` | `false` | Deaktiviert das Formularfeld |
| `isRequired` | `boolean` | `false` | Markiert das Formularfeld als erforderlich |
| `isInvalid` | `boolean` | `false` | Zeigt den Fehlerzustand an |
| `isValid` | `boolean` | `false` | Zeigt den gültigen Zustand an |
| `isSuccess` | `boolean` | `false` | Zeigt den erfolgreichen Zustand an |
| `isReadOnly` | `boolean` | `false` | Macht das Formularfeld schreibgeschützt |
| `isLoading` | `boolean` | `false` | Zeigt einen Ladezustand an |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Größe des Formularfelds |
| `variant` | `'default' \| 'filled' \| 'outlined' \| 'unstyled'` | `'default'` | Visuelle Variante des Formularfelds |
| `labelPosition` | `'top' \| 'left' \| 'right' \| 'bottom' \| 'floating'` | `'top'` | Position des Labels |
| `label` | `string` | - | Text für das Label (Alternative zu FormLabel) |
| `helperText` | `ReactNode` | - | Hilfetext (Alternative zu FormHelperText) |
| `errorMessage` | `ReactNode` | - | Fehlermeldung (Alternative zu FormErrorMessage) |
| `successMessage` | `ReactNode` | - | Erfolgsmeldung |
| `name` | `string` | - | Name des Formularfelds |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### FormLabel

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `htmlFor` | `string` | - | ID des zugehörigen Formularelements |
| `requiredIndicator` | `ReactNode` | `*` | Symbol für erforderliche Felder |
| `optionalIndicator` | `ReactNode` | `(optional)` | Text für optionale Felder |
| `showOptionalIndicator` | `boolean` | `false` | Zeigt den optionalen Indikator an |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### FormHelperText

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### FormErrorMessage

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `icon` | `ReactNode` | - | Icon für die Fehlermeldung |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

## useFormControl Hook

Der `useFormControl` Hook ermöglicht den Zugriff auf den FormControl-Context in benutzerdefinierten Komponenten.

```jsx
import { useFormControl } from '@smolitux/core';

function CustomInput(props) {
  const { isDisabled, isRequired, isInvalid, id } = useFormControl();
  
  return (
    <input
      id={id}
      disabled={isDisabled}
      required={isRequired}
      aria-invalid={isInvalid}
      {...props}
      className={`custom-input ${isInvalid ? 'custom-input-error' : ''}`}
    />
  );
}
```

## Barrierefreiheit

Die FormControl-Komponente ist für Barrierefreiheit optimiert:

- Korrekte Verknüpfung von Labels und Formularfeldern über IDs
- Verwendung von `aria-invalid` für Fehlerzustände
- Unterstützung für `aria-describedby` für Hilfetexte und Fehlermeldungen
- Visuelles Feedback für verschiedene Zustände (Fehler, Erfolg, deaktiviert)

## Beispiele

### Formular mit Validierung

```jsx
import { useState } from 'react';
import { 
  FormControl, 
  FormLabel, 
  FormHelperText, 
  FormErrorMessage,
  Input,
  Button
} from '@smolitux/core';

function ValidationForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!values.name) {
      newErrors.name = 'Name ist erforderlich';
    }
    
    if (!values.email) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'E-Mail ist ungültig';
    }
    
    if (!values.password) {
      newErrors.password = 'Passwort ist erforderlich';
    } else if (values.password.length < 8) {
      newErrors.password = 'Passwort muss mindestens 8 Zeichen lang sein';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simuliere API-Aufruf
      setTimeout(() => {
        alert('Formular erfolgreich abgesendet!');
        setIsSubmitting(false);
      }, 1500);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={!!errors.name} isRequired mb={4}>
        <FormLabel>Name</FormLabel>
        <Input
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name ? (
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        ) : (
          <FormHelperText>Geben Sie Ihren vollständigen Namen ein.</FormHelperText>
        )}
      </FormControl>
      
      <FormControl isInvalid={!!errors.email} isRequired mb={4}>
        <FormLabel>E-Mail</FormLabel>
        <Input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email ? (
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        ) : (
          <FormHelperText>Wir werden Ihre E-Mail niemals weitergeben.</FormHelperText>
        )}
      </FormControl>
      
      <FormControl isInvalid={!!errors.password} isRequired mb={6}>
        <FormLabel>Passwort</FormLabel>
        <Input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password ? (
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        ) : (
          <FormHelperText>Das Passwort muss mindestens 8 Zeichen lang sein.</FormHelperText>
        )}
      </FormControl>
      
      <Button type="submit" isLoading={isSubmitting}>
        Registrieren
      </Button>
    </form>
  );
}
```

### Formularfeld mit benutzerdefiniertem Label

```jsx
<FormControl>
  <FormLabel>
    <div className="flex items-center">
      <Icon name="user" className="mr-2" />
      <span>Benutzerprofil</span>
      <Tooltip content="Informationen zu Ihrem Benutzerprofil">
        <Icon name="info" className="ml-2 text-gray-400" />
      </Tooltip>
    </div>
  </FormLabel>
  <Input placeholder="Benutzername" />
</FormControl>
```

### Formularfeld mit Charakterzähler

```jsx
function CharacterCounter() {
  const [value, setValue] = useState('');
  const maxLength = 100;
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  return (
    <FormControl>
      <FormLabel>Beschreibung</FormLabel>
      <Textarea
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        placeholder="Beschreiben Sie sich kurz..."
      />
      <div className="flex justify-end mt-1 text-sm text-gray-500">
        {value.length}/{maxLength} Zeichen
      </div>
    </FormControl>
  );
}
```