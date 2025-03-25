# Smolitux UI Dokumentation

Smolitux UI ist eine moderne React-Komponentenbibliothek für die einheitliche Gestaltung von Anwendungen im Smolitux Ökosystem. Die Bibliothek bietet eine Vielzahl von Komponenten, die einfach zu verwenden und anzupassen sind.

## Installation

```bash
npm install @smolitux/core @smolitux/theme
# oder
yarn add @smolitux/core @smolitux/theme
```

Für Layout-Komponenten:

```bash
npm install @smolitux/layout
# oder
yarn add @smolitux/layout
```

## Verwendung

```jsx
import React from 'react';
import { Button, Alert, Input } from '@smolitux/core';
import { ThemeProvider } from '@smolitux/theme';

function App() {
  return (
    <ThemeProvider>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Smolitux UI Demo</h1>
        
        <Alert variant="info" title="Information">
          Dies ist eine Beispielanwendung mit Smolitux UI.
        </Alert>
        
        <div className="my-4">
          <Input 
            label="Name" 
            placeholder="Geben Sie Ihren Namen ein" 
            helperText="Wir verwenden Ihren Namen nur für die Anrede."
          />
        </div>
        
        <Button variant="primary">Absenden</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
```

## Komponenten

### Core-Komponenten

#### Alert

Die Alert-Komponente wird verwendet, um wichtige Nachrichten anzuzeigen.

```jsx
import { Alert } from '@smolitux/core';

<Alert variant="success" title="Erfolg">
  Die Aktion wurde erfolgreich abgeschlossen.
</Alert>
```

**Props:**

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| variant | 'info' \| 'success' \| 'warning' \| 'error' | 'info' | Variante des Alerts |
| title | string | - | Titel des Alerts |
| children | ReactNode | - | Inhalt des Alerts |
| onClose | () => void | - | Callback beim Schließen |
| closable | boolean | false | Ob der Alert schließbar ist |
| icon | ReactNode | - | Benutzerdefiniertes Icon |
| className | string | - | Zusätzliche CSS-Klassen |

#### Badge

Die Badge-Komponente wird verwendet, um Labels, Zähler oder Status anzuzeigen.

```jsx
import { Badge } from '@smolitux/core';

<Badge variant="primary">Neu</Badge>
```

**Props:**

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| variant | 'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info' | 'default' | Variante der Badge |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Größe der Badge |
| rounded | boolean | false | Ob die Badge abgerundet sein soll |
| className | string | - | Zusätzliche CSS-Klassen |
| icon | ReactNode | - | Optional Icon |
| isCounter | boolean | false | Ob die Badge als Zähler angezeigt werden soll |
| maxCount | number | 99 | Maximaler Wert für Zähler |
| isDot | boolean | false | Ob die Badge als Punkt angezeigt werden soll |

#### Button

Die Button-Komponente wird für Aktionen verwendet.

```jsx
import { Button } from '@smolitux/core';

<Button variant="primary" size="md">Klick mich</Button>
```

**Props:**

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| variant | 'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'light' \| 'dark' \| 'link' | 'primary' | Variante des Buttons |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Größe des Buttons |
| disabled | boolean | false | Ob der Button deaktiviert ist |
| loading | boolean | false | Ob der Button im Ladezustand ist |
| fullWidth | boolean | false | Ob der Button die volle Breite einnehmen soll |
| leftIcon | ReactNode | - | Icon links vom Text |
| rightIcon | ReactNode | - | Icon rechts vom Text |
| onClick | (event: React.MouseEvent) => void | - | Callback beim Klicken |
| type | 'button' \| 'submit' \| 'reset' | 'button' | Typ des Buttons |
| className | string | - | Zusätzliche CSS-Klassen |

#### Checkbox

Die Checkbox-Komponente wird für Auswahloptionen verwendet.

```jsx
import { Checkbox } from '@smolitux/core';

<Checkbox label="Ich stimme den AGB zu" onChange={(e) => console.log(e.target.checked)} />
```

**Props:**

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| label | ReactNode | - | Label der Checkbox |
| checked | boolean | - | Ob die Checkbox ausgewählt ist |
| defaultChecked | boolean | false | Standard-Auswahlzustand |
| disabled | boolean | false | Ob die Checkbox deaktiviert ist |
| indeterminate | boolean | false | Ob die Checkbox im unbestimmten Zustand ist |
| onChange | (event: React.ChangeEvent<HTMLInputElement>) => void | - | Callback bei Änderung |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Größe der Checkbox |
| className | string | - | Zusätzliche CSS-Klassen |
| helperText | ReactNode | - | Hilfetext |
| error | ReactNode | - | Fehlermeldung |

#### ColorPicker

Die ColorPicker-Komponente ermöglicht die Auswahl von Farben.

```jsx
import { ColorPicker } from '@smolitux/core';

<ColorPicker 
  value="#ff0000" 
  onChange={(color) => console.log(color)} 
  allowAlpha={true} 
/>
```

**Props:**

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| value | string | '#000000' | Aktueller Farbwert |
| onChange | (color: string) => void | - | Callback bei Farbänderung |
| allowAlpha | boolean | false | Ob Alpha-Kanal erlaubt ist |
| disabled | boolean | false | Ob der Picker deaktiviert ist |
| className | string | - | Zusätzliche CSS-Klassen |
| popupPosition | 'top' \| 'bottom' \| 'left' \| 'right' | 'bottom' | Platzierung des Popups |
| showAsButton | boolean | false | Ob als Button angezeigt werden soll |
| presetColors | string[] | ['#ff0000', ...] | Voreingestellte Farben |
| label | string | - | Label für den Picker |
| helperText | string | - | Hilfetext |
| error | string | - | Fehlermeldung |

#### FormControl

Die FormControl-Komponente dient als Container für Formularelemente.

```jsx
import { FormControl, Input } from '@smolitux/core';

<FormControl label="E-Mail" helperText="Wir werden Ihre E-Mail nicht weitergeben" required>
  <Input type="email" placeholder="name@beispiel.de" />
</FormControl>
```

**Props:**

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| label | ReactNode | - | Label des Formularelements |
| helperText | ReactNode | - | Hilfetext |
| error | ReactNode | - | Fehlermeldung |
| successMessage | ReactNode | - | Erfolgsmeldung |
| required | boolean | false | Ob das Feld erforderlich ist |
| disabled | boolean | false | Ob das Feld deaktiviert ist |
| isInvalid | boolean | false | Ob das Feld ungültig ist |
| isValid | boolean | false | Ob das Feld gültig ist |
| className | string | - | Zusätzliche CSS-Klassen |
| children | ReactNode | - | Formularelemente |

#### Input

Die Input-Komponente wird für Texteingaben verwendet.

```jsx
import { Input } from '@smolitux/core';

<Input 
  type="text" 
  label="Benutzername" 
  placeholder="Geben Sie Ihren Benutzernamen ein" 
  helperText="Der Benutzername muss mindestens 3 Zeichen lang sein"
/>
```

**Props:**

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| type | 'text' \| 'password' \| 'email' \| ... | 'text' | Typ des Inputs |
| label | ReactNode | - | Label des Inputs |
| placeholder | string | - | Platzhaltertext |
| value | string | - | Wert des Inputs |
| defaultValue | string | - | Standardwert |
| onChange | (event: React.ChangeEvent<HTMLInputElement>) => void | - | Callback bei Änderung |
| disabled | boolean | false | Ob der Input deaktiviert ist |
| readOnly | boolean | false | Ob der Input schreibgeschützt ist |
| required | boolean | false | Ob der Input erforderlich ist |
| helperText | ReactNode | - | Hilfetext |
| error | ReactNode | - | Fehlermeldung |
| successMessage | ReactNode | - | Erfolgsmeldung |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Größe des Inputs |
| variant | 'outline' \| 'filled' \| 'flushed' \| 'unstyled' | 'outline' | Variante des Inputs |
| leftIcon | ReactNode | - | Icon links |
| rightIcon | ReactNode | - | Icon rechts |
| className | string | - | Zusätzliche CSS-Klassen |

#### Modal

Die Modal-Komponente zeigt Inhalte in einem modalen Dialog an.

```jsx
import { Modal, Button } from '@smolitux/core';
import { useState } from 'react';

function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Modal öffnen</Button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Beispiel-Modal"
        footer={
          <Button onClick={() => setIsOpen(false)}>Schließen</Button>
        }
      >
        <p>Dies ist der Inhalt des Modals.</p>
      </Modal>
    </>
  );
}
```

**Props:**

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| isOpen | boolean | false | Ob das Modal geöffnet ist |
| onClose | () => void | - | Callback beim Schließen |
| title | ReactNode | - | Titel des Modals |
| children | ReactNode | - | Inhalt des Modals |
| footer | ReactNode | - | Fußzeile des Modals |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' | 'md' | Größe des Modals |
| closeOnOverlayClick | boolean | true | Ob das Modal beim Klick auf den Overlay geschlossen werden soll |
| closeOnEsc | boolean | true | Ob das Modal mit der Escape-Taste geschlossen werden soll |
| isCentered | boolean | true | Ob das Modal zentriert sein soll |
| scrollBehavior | 'inside' \| 'outside' | 'outside' | Scrollverhalten |
| className | string | - | Zusätzliche CSS-Klassen |

#### Radio

Die Radio-Komponente wird für Auswahloptionen verwendet.

```jsx
import { Radio } from '@smolitux/core';

<Radio name="option" value="1" label="Option 1" />
<Radio name="option" value="2" label="Option 2" />
```

**Props:**

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| name | string | - | Name der Radio-Gruppe |
| value | string | - | Wert der Option |
| label | ReactNode | - | Label der Option |
| checked | boolean | - | Ob die Option ausgewählt ist |
| defaultChecked | boolean | false | Standard-Auswahlzustand |
| disabled | boolean | false | Ob die Option deaktiviert ist |
| onChange | (event: React.ChangeEvent<HTMLInputElement>) => void | - | Callback bei Änderung |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Größe der Option |
| className | string | - | Zusätzliche CSS-Klassen |
| helperText | ReactNode | - | Hilfetext |
| error | ReactNode | - | Fehlermeldung |

#### Select

Die Select-Komponente wird für Auswahlmenüs verwendet.

```jsx
import { Select } from '@smolitux/core';

<Select 
  label="Land" 
  options={[
    { value: 'de', label: 'Deutschland' },
    { value: 'at', label: 'Österreich' },
    { value: 'ch', label: 'Schweiz' }
  ]} 
  onChange={(e) => console.log(e.target.value)}
/>
```

**Props:**

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| options | { value: string; label: string; disabled?: boolean; }[] | [] | Optionen |
| label | ReactNode | - | Label des Selects |
| value | string | - | Wert des Selects |
| defaultValue | string | - | Standardwert |
| onChange | (event: React.ChangeEvent<HTMLSelectElement>) => void | - | Callback bei Änderung |
| disabled | boolean | false | Ob der Select deaktiviert ist |
| required | boolean | false | Ob der Select erforderlich ist |
| placeholder | string | - | Platzhaltertext |
| helperText | ReactNode | - | Hilfetext |
| error | ReactNode | - | Fehlermeldung |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Größe des Selects |
| variant | 'outline' \| 'filled' \| 'flushed' \| 'unstyled' | 'outline' | Variante des Selects |
| className | string | - | Zusätzliche CSS-Klassen |

#### Switch

Die Switch-Komponente wird für Ein/Aus-Schalter verwendet.

```jsx
import { Switch } from '@smolitux/core';

<Switch label="Benachrichtigungen aktivieren" onChange={(e) => console.log(e.target.checked)} />
```

**Props:**

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| label | ReactNode | - | Label des Switches |
| checked | boolean | - | Ob der Switch eingeschaltet ist |
| defaultChecked | boolean | false | Standard-Schaltzustand |
| disabled | boolean | false | Ob der Switch deaktiviert ist |
| onChange | (event: React.ChangeEvent<HTMLInputElement>) => void | - | Callback bei Änderung |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Größe des Switches |
| colorScheme | 'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' | 'primary' | Farbschema |
| className | string | - | Zusätzliche CSS-Klassen |
| helperText | ReactNode | - | Hilfetext |
| error | ReactNode | - | Fehlermeldung |

#### Table

Die Table-Komponente wird für tabellarische Daten verwendet.

```jsx
import { Table } from '@smolitux/core';

<Table 
  data={[
    { id: 1, name: 'Max Mustermann', email: 'max@beispiel.de' },
    { id: 2, name: 'Erika Musterfrau', email: 'erika@beispiel.de' }
  ]}
  columns={[
    { id: 'id', header: 'ID', cell: (row) => row.id },
    { id: 'name', header: 'Name', cell: (row) => row.name },
    { id: 'email', header: 'E-Mail', cell: (row) => row.email }
  ]}
  striped
  hover
/>
```

**Props:**

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| data | any[] | [] | Daten für die Tabelle |
| columns | { id: string; header: ReactNode; cell: (row: any, rowIndex: number) => ReactNode; sortable?: boolean; width?: string \| number; align?: 'left' \| 'center' \| 'right'; }[] | [] | Spaltendefinitionen |
| striped | boolean | false | Ob die Tabelle gestreift sein soll |
| hover | boolean | true | Ob die Tabelle einen Hover-Effekt haben soll |
| bordered | boolean | false | Ob die Tabelle einen Rahmen haben soll |
| compact | boolean | false | Ob die Tabelle kompakt sein soll |
| sortable | boolean | true | Ob die Tabelle sortierbar sein soll |
| paginated | boolean | false | Ob die Tabelle paginiert sein soll |
| itemsPerPage | number | 10 | Anzahl der Einträge pro Seite |
| onRowClick | (row: any, index: number) => void | - | Callback bei Klick auf eine Zeile |
| className | string | - | Zusätzliche CSS-Klassen |

### Layout-Komponenten

#### Container

Die Container-Komponente wird verwendet, um den Inhalt zu zentrieren und eine maximale Breite festzulegen.

```jsx
import { Container } from '@smolitux/layout';

<Container maxWidth="lg" padding="md">
  <h1>Inhalt</h1>
  <p>Dieser Inhalt ist zentriert und hat eine maximale Breite.</p>
</Container>
```

**Props:**

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| maxWidth | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| string | 'lg' | Maximale Breite |
| padding | 'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Innenabstand |
| centered | boolean | true | Ob der Container zentriert sein soll |
| className | string | - | Zusätzliche CSS-Klassen |
| children | ReactNode | - | Inhalt |

#### Grid

Die Grid-Komponente wird für Raster-Layouts verwendet.

```jsx
import { Grid, GridItem } from '@smolitux/layout';

<Grid columns={12} gap="md">
  <GridItem colSpan={6}>Linke Spalte</GridItem>
  <GridItem colSpan={6}>Rechte Spalte</GridItem>
</Grid>
```

**Props (Grid):**

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| columns | number | 12 | Anzahl der Spalten |
| gap | 'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Abstand zwischen den Elementen |
| rowGap | 'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | - | Abstand zwischen den Zeilen |
| columnGap | 'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | - | Abstand zwischen den Spalten |
| className | string | - | Zusätzliche CSS-Klassen |
| children | ReactNode | - | Inhalt |

**Props (GridItem):**

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| colSpan | number | 1 | Anzahl der Spalten, die das Element einnimmt |
| rowSpan | number | 1 | Anzahl der Zeilen, die das Element einnimmt |
| colStart | number | - | Startposition der Spalte |
| rowStart | number | - | Startposition der Zeile |
| className | string | - | Zusätzliche CSS-Klassen |
| children | ReactNode | - | Inhalt |

#### Flex

Die Flex-Komponente wird für flexible Layouts verwendet.

```jsx
import { Flex, FlexItem } from '@smolitux/layout';

<Flex direction="row" justify="space-between" align="center" gap="md">
  <FlexItem flex={1}>Element 1</FlexItem>
  <FlexItem flex={2}>Element 2</FlexItem>
</Flex>
```

**Props (Flex):**

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| direction | 'row' \| 'column' \| 'row-reverse' \| 'column-reverse' | 'row' | Richtung |
| wrap | 'nowrap' \| 'wrap' \| 'wrap-reverse' | 'nowrap' | Umbruchverhalten |
| justify | 'flex-start' \| 'flex-end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly' | 'flex-start' | Horizontale Ausrichtung |
| align | 'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch' | 'stretch' | Vertikale Ausrichtung |
| gap | 'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'none' | Abstand zwischen den Elementen |
| className | string | - | Zusätzliche CSS-Klassen |
| children | ReactNode | - | Inhalt |

**Props (FlexItem):**

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| flex | number \| string | - | Flex-Wert |
| grow | number | - | Flex-Grow-Wert |
| shrink | number | - | Flex-Shrink-Wert |
| basis | string | - | Flex-Basis-Wert |
| align | 'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch' | - | Vertikale Ausrichtung |
| className | string | - | Zusätzliche CSS-Klassen |
| children | ReactNode | - | Inhalt |

## Theme-Anpassung

Die Smolitux UI-Komponenten können über das Theme angepasst werden.

```jsx
import { ThemeProvider, createTheme } from '@smolitux/theme';

const customTheme = createTheme({
  colors: {
    primary: {
      50: '#e6f7ff',
      100: '#bae7ff',
      200: '#91d5ff',
      300: '#69c0ff',
      400: '#40a9ff',
      500: '#1890ff',
      600: '#096dd9',
      700: '#0050b3',
      800: '#003a8c',
      900: '#002766',
    },
    // Weitere Farben...
  },
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Roboto, sans-serif',
    mono: 'Roboto Mono, monospace',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  // Weitere Theme-Einstellungen...
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Ihre Anwendung */}
    </ThemeProvider>
  );
}
```

## Barrierefreiheit

Smolitux UI-Komponenten sind für Barrierefreiheit optimiert:

- Alle interaktiven Elemente sind mit der Tastatur bedienbar
- ARIA-Attribute werden korrekt verwendet
- Kontraste entsprechen den WCAG-Richtlinien
- Screenreader-Unterstützung ist implementiert

## Browser-Unterstützung

Smolitux UI unterstützt alle modernen Browser:

- Chrome (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- Edge (letzte 2 Versionen)

## Lizenz

MIT