---
sidebar_position: 1
---

# API-Referenz

Diese Seite enthält die API-Referenz für die wichtigsten Komponenten von Smolitux-UI.

## Button

Die Button-Komponente wird für Aktionen verwendet.

### Import

```jsx
import { Button } from '@smolitux/ui';
```

### Props

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'danger' \| 'success' \| 'warning' \| 'info' \| 'ghost'` | `'primary'` | Die Variante des Buttons |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Die Größe des Buttons |
| `isLoading` | `boolean` | `false` | Ob der Button einen Ladezustand anzeigen soll |
| `isDisabled` | `boolean` | `false` | Ob der Button deaktiviert sein soll |
| `leftIcon` | `ReactNode` | - | Ein Icon, das links vom Text angezeigt wird |
| `rightIcon` | `ReactNode` | - | Ein Icon, das rechts vom Text angezeigt wird |
| `fullWidth` | `boolean` | `false` | Ob der Button die volle Breite einnehmen soll |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Der Typ des Buttons |
| `onClick` | `(event: MouseEvent) => void` | - | Callback, der beim Klicken aufgerufen wird |

### Beispiele

```jsx
// Einfacher Button
<Button>Klick mich</Button>

// Button mit Variante und Größe
<Button variant="danger" size="lg">Löschen</Button>

// Button mit Icon
<Button leftIcon={<TrashIcon />}>Löschen</Button>

// Deaktivierter Button
<Button isDisabled>Deaktiviert</Button>

// Ladender Button
<Button isLoading>Speichern</Button>

// Button mit voller Breite
<Button fullWidth>Volle Breite</Button>
```

## Input

Die Input-Komponente wird für Texteingaben verwendet.

### Import

```jsx
import { Input } from '@smolitux/ui';
```

### Props

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `type` | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url' \| 'search' \| 'date' \| 'time' \| 'datetime-local'` | `'text'` | Der Typ des Inputs |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Die Größe des Inputs |
| `value` | `string` | - | Der Wert des Inputs |
| `defaultValue` | `string` | - | Der Standardwert des Inputs |
| `placeholder` | `string` | - | Der Platzhaltertext |
| `isDisabled` | `boolean` | `false` | Ob der Input deaktiviert sein soll |
| `isReadOnly` | `boolean` | `false` | Ob der Input schreibgeschützt sein soll |
| `isRequired` | `boolean` | `false` | Ob der Input erforderlich ist |
| `isInvalid` | `boolean` | `false` | Ob der Input ungültig ist |
| `onChange` | `(event: ChangeEvent) => void` | - | Callback, der bei Änderungen aufgerufen wird |
| `onFocus` | `(event: FocusEvent) => void` | - | Callback, der beim Fokussieren aufgerufen wird |
| `onBlur` | `(event: FocusEvent) => void` | - | Callback, der beim Verlieren des Fokus aufgerufen wird |
| `leftElement` | `ReactNode` | - | Element, das links im Input angezeigt wird |
| `rightElement` | `ReactNode` | - | Element, das rechts im Input angezeigt wird |

### Beispiele

```jsx
// Einfacher Input
<Input placeholder="Name eingeben" />

// Input mit Typ
<Input type="email" placeholder="E-Mail eingeben" />

// Input mit Größe
<Input size="lg" placeholder="Große Eingabe" />

// Input mit Wert
<Input value="John Doe" onChange={handleChange} />

// Deaktivierter Input
<Input isDisabled placeholder="Deaktiviert" />

// Ungültiger Input
<Input isInvalid placeholder="Ungültig" />

// Input mit linkem Element
<Input leftElement={<UserIcon />} placeholder="Benutzername" />

// Input mit rechtem Element
<Input rightElement={<SearchIcon />} placeholder="Suchen..." />
```

## Form

Die Form-Komponente wird für Formulare verwendet.

### Import

```jsx
import { Form } from '@smolitux/ui';
```

### Props

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `onSubmit` | `(values: any) => void` | - | Callback, der beim Absenden aufgerufen wird |
| `defaultValues` | `object` | `{}` | Die Standardwerte des Formulars |
| `validationMode` | `'onBlur' \| 'onChange' \| 'onSubmit'` | `'onSubmit'` | Wann die Validierung ausgeführt werden soll |
| `reValidateMode` | `'onBlur' \| 'onChange' \| 'onSubmit'` | `'onChange'` | Wann die erneute Validierung ausgeführt werden soll |
| `children` | `ReactNode \| ((methods: FormMethods) => ReactNode)` | - | Die Kinder der Komponente |

### Beispiele

```jsx
// Einfaches Formular
<Form onSubmit={handleSubmit}>
  <FormField name="name" label="Name">
    <Input />
  </FormField>
  <Button type="submit">Absenden</Button>
</Form>

// Formular mit Standardwerten
<Form onSubmit={handleSubmit} defaultValues={{ name: 'John Doe' }}>
  <FormField name="name" label="Name">
    <Input />
  </FormField>
  <Button type="submit">Absenden</Button>
</Form>

// Formular mit Render-Prop
<Form onSubmit={handleSubmit}>
  {({ register, formState }) => (
    <>
      <FormField name="name" label="Name">
        <Input {...register('name')} />
      </FormField>
      {formState.errors.name && (
        <Text color="danger">{formState.errors.name.message}</Text>
      )}
      <Button type="submit">Absenden</Button>
    </>
  )}
</Form>
```

## FormField

Die FormField-Komponente wird für Formularfelder verwendet.

### Import

```jsx
import { FormField } from '@smolitux/ui';
```

### Props

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `name` | `string` | - | Der Name des Feldes |
| `label` | `string` | - | Das Label des Feldes |
| `helperText` | `string` | - | Der Hilfetext des Feldes |
| `errorText` | `string` | - | Der Fehlertext des Feldes |
| `isRequired` | `boolean` | `false` | Ob das Feld erforderlich ist |
| `isDisabled` | `boolean` | `false` | Ob das Feld deaktiviert ist |
| `isReadOnly` | `boolean` | `false` | Ob das Feld schreibgeschützt ist |
| `validations` | `object` | - | Die Validierungsregeln des Feldes |
| `children` | `ReactNode` | - | Die Kinder der Komponente |

### Beispiele

```jsx
// Einfaches Formularfeld
<FormField name="name" label="Name">
  <Input />
</FormField>

// Formularfeld mit Hilfetext
<FormField name="email" label="E-Mail" helperText="Wir werden Ihre E-Mail niemals weitergeben">
  <Input type="email" />
</FormField>

// Erforderliches Formularfeld
<FormField name="password" label="Passwort" isRequired>
  <Input type="password" />
</FormField>

// Formularfeld mit Validierung
<FormField
  name="username"
  label="Benutzername"
  validations={{
    required: 'Benutzername ist erforderlich',
    minLength: {
      value: 3,
      message: 'Benutzername muss mindestens 3 Zeichen lang sein'
    }
  }}
>
  <Input />
</FormField>
```

## Select

Die Select-Komponente wird für Auswahlfelder verwendet.

### Import

```jsx
import { Select } from '@smolitux/ui';
```

### Props

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `options` | `Array<{ value: string, label: string }>` | `[]` | Die Optionen des Selects |
| `value` | `string` | - | Der Wert des Selects |
| `defaultValue` | `string` | - | Der Standardwert des Selects |
| `placeholder` | `string` | - | Der Platzhaltertext |
| `isDisabled` | `boolean` | `false` | Ob der Select deaktiviert sein soll |
| `isRequired` | `boolean` | `false` | Ob der Select erforderlich ist |
| `isInvalid` | `boolean` | `false` | Ob der Select ungültig ist |
| `isMulti` | `boolean` | `false` | Ob mehrere Werte ausgewählt werden können |
| `onChange` | `(value: string \| string[]) => void` | - | Callback, der bei Änderungen aufgerufen wird |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Die Größe des Selects |

### Beispiele

```jsx
// Einfacher Select
<Select
  options={[
    { value: 'apple', label: 'Apfel' },
    { value: 'banana', label: 'Banane' },
    { value: 'orange', label: 'Orange' }
  ]}
  placeholder="Frucht auswählen"
/>

// Select mit Standardwert
<Select
  options={[
    { value: 'apple', label: 'Apfel' },
    { value: 'banana', label: 'Banane' },
    { value: 'orange', label: 'Orange' }
  ]}
  defaultValue="banana"
/>

// Multi-Select
<Select
  options={[
    { value: 'apple', label: 'Apfel' },
    { value: 'banana', label: 'Banane' },
    { value: 'orange', label: 'Orange' }
  ]}
  isMulti
  placeholder="Früchte auswählen"
/>

// Deaktivierter Select
<Select
  options={[
    { value: 'apple', label: 'Apfel' },
    { value: 'banana', label: 'Banane' },
    { value: 'orange', label: 'Orange' }
  ]}
  isDisabled
  placeholder="Deaktiviert"
/>
```

## Checkbox

Die Checkbox-Komponente wird für Checkboxen verwendet.

### Import

```jsx
import { Checkbox } from '@smolitux/ui';
```

### Props

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `isChecked` | `boolean` | - | Ob die Checkbox ausgewählt ist |
| `defaultChecked` | `boolean` | `false` | Ob die Checkbox standardmäßig ausgewählt ist |
| `label` | `string` | - | Das Label der Checkbox |
| `value` | `string` | - | Der Wert der Checkbox |
| `isDisabled` | `boolean` | `false` | Ob die Checkbox deaktiviert ist |
| `isRequired` | `boolean` | `false` | Ob die Checkbox erforderlich ist |
| `isInvalid` | `boolean` | `false` | Ob die Checkbox ungültig ist |
| `onChange` | `(event: ChangeEvent) => void` | - | Callback, der bei Änderungen aufgerufen wird |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Die Größe der Checkbox |

### Beispiele

```jsx
// Einfache Checkbox
<Checkbox label="Ich stimme zu" />

// Checkbox mit Standardwert
<Checkbox label="Newsletter abonnieren" defaultChecked />

// Deaktivierte Checkbox
<Checkbox label="Deaktiviert" isDisabled />

// Erforderliche Checkbox
<Checkbox label="Ich akzeptiere die AGB" isRequired />

// Checkbox mit Änderungshandler
<Checkbox label="Benachrichtigungen aktivieren" onChange={handleChange} />
```

## Modal

Die Modal-Komponente wird für Dialoge verwendet.

### Import

```jsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@smolitux/ui';
```

### Props

#### Modal

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `isOpen` | `boolean` | `false` | Ob das Modal geöffnet ist |
| `onClose` | `() => void` | - | Callback, der beim Schließen aufgerufen wird |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Die Größe des Modals |
| `closeOnEsc` | `boolean` | `true` | Ob das Modal mit der Escape-Taste geschlossen werden kann |
| `closeOnOverlayClick` | `boolean` | `true` | Ob das Modal durch Klicken auf den Overlay geschlossen werden kann |
| `isCentered` | `boolean` | `false` | Ob das Modal zentriert angezeigt werden soll |
| `children` | `ReactNode` | - | Die Kinder der Komponente |

#### ModalHeader

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `children` | `ReactNode` | - | Die Kinder der Komponente |

#### ModalBody

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `children` | `ReactNode` | - | Die Kinder der Komponente |

#### ModalFooter

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `children` | `ReactNode` | - | Die Kinder der Komponente |

### Beispiele

```jsx
// Einfaches Modal
function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Modal öffnen</Button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>Modal-Titel</ModalHeader>
        <ModalBody>
          <p>Modal-Inhalt hier...</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>Abbrechen</Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>Bestätigen</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

## Tabs

Die Tabs-Komponente wird für Tabs verwendet.

### Import

```jsx
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@smolitux/ui';
```

### Props

#### Tabs

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `defaultIndex` | `number` | `0` | Der standardmäßig ausgewählte Tab-Index |
| `index` | `number` | - | Der ausgewählte Tab-Index |
| `onChange` | `(index: number) => void` | - | Callback, der bei Änderungen aufgerufen wird |
| `variant` | `'line' \| 'enclosed' \| 'soft-rounded' \| 'solid-rounded'` | `'line'` | Die Variante der Tabs |
| `colorScheme` | `string` | `'primary'` | Das Farbschema der Tabs |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Die Ausrichtung der Tabs |
| `isFitted` | `boolean` | `false` | Ob die Tabs die volle Breite einnehmen sollen |
| `children` | `ReactNode` | - | Die Kinder der Komponente |

#### TabList

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `children` | `ReactNode` | - | Die Kinder der Komponente |

#### Tab

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `isDisabled` | `boolean` | `false` | Ob der Tab deaktiviert ist |
| `children` | `ReactNode` | - | Die Kinder der Komponente |

#### TabPanels

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `children` | `ReactNode` | - | Die Kinder der Komponente |

#### TabPanel

| Name | Typ | Standard | Beschreibung |
|------|-----|---------|--------------|
| `children` | `ReactNode` | - | Die Kinder der Komponente |

### Beispiele

```jsx
// Einfache Tabs
<Tabs>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3</Tab>
  </TabList>
  
  <TabPanels>
    <TabPanel>
      <p>Inhalt von Tab 1</p>
    </TabPanel>
    <TabPanel>
      <p>Inhalt von Tab 2</p>
    </TabPanel>
    <TabPanel>
      <p>Inhalt von Tab 3</p>
    </TabPanel>
  </TabPanels>
</Tabs>

// Tabs mit Variante
<Tabs variant="enclosed">
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </TabList>
  
  <TabPanels>
    <TabPanel>
      <p>Inhalt von Tab 1</p>
    </TabPanel>
    <TabPanel>
      <p>Inhalt von Tab 2</p>
    </TabPanel>
  </TabPanels>
</Tabs>

// Vertikale Tabs
<Tabs orientation="vertical">
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </TabList>
  
  <TabPanels>
    <TabPanel>
      <p>Inhalt von Tab 1</p>
    </TabPanel>
    <TabPanel>
      <p>Inhalt von Tab 2</p>
    </TabPanel>
  </TabPanels>
</Tabs>
```