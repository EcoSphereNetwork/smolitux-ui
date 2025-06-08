# Input Komponente

Die Input-Komponente ist ein grundlegendes Formular-Element für die Texteingabe mit umfangreichen Anpassungsmöglichkeiten und Barrierefreiheitsfunktionen.

## Eigenschaften

| Eigenschaft          | Typ                                                | Standard    | Beschreibung                                                |
| -------------------- | -------------------------------------------------- | ----------- | ----------------------------------------------------------- |
| `label`              | `ReactNode`                                        | -           | Text-Label für das Input-Feld                               |
| `helperText`         | `ReactNode`                                        | -           | Hilfetext unter dem Input-Feld                              |
| `error`              | `ReactNode`                                        | -           | Fehlermeldung                                               |
| `successMessage`     | `ReactNode`                                        | -           | Erfolgsmeldung                                              |
| `leftIcon`           | `ReactNode`                                        | -           | Icon links im Input-Feld                                    |
| `rightIcon`          | `ReactNode`                                        | -           | Icon rechts im Input-Feld                                   |
| `size`               | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`             | `'md'`      | Größe des Input-Felds                                       |
| `variant`            | `'outline' \| 'filled' \| 'flushed' \| 'unstyled'` | `'outline'` | Visuelle Variante                                           |
| `type`               | `InputType`                                        | `'text'`    | HTML-Input-Typ (text, password, email, etc.)                |
| `fullWidth`          | `boolean`                                          | `false`     | Input nimmt die volle verfügbare Breite ein                 |
| `isLoading`          | `boolean`                                          | `false`     | Zeigt einen Ladezustand an                                  |
| `isValid`            | `boolean`                                          | `false`     | Zeigt einen gültigen Zustand an                             |
| `isInvalid`          | `boolean`                                          | `false`     | Zeigt einen ungültigen Zustand an                           |
| `isSuccess`          | `boolean`                                          | `false`     | Zeigt einen erfolgreichen Zustand an                        |
| `isDisabled`         | `boolean`                                          | `false`     | Deaktiviert das Input-Feld                                  |
| `isRequired`         | `boolean`                                          | `false`     | Markiert das Input-Feld als erforderlich                    |
| `isReadOnly`         | `boolean`                                          | `false`     | Macht das Input-Feld schreibgeschützt                       |
| `showPasswordToggle` | `boolean`                                          | `false`     | Zeigt einen Button zum Umschalten der Passwort-Sichtbarkeit |
| `isClearable`        | `boolean`                                          | `false`     | Zeigt einen Button zum Löschen des Inhalts                  |
| `prefix`             | `ReactNode`                                        | -           | Präfix vor dem Text (z.B. Währungssymbol)                   |
| `suffix`             | `ReactNode`                                        | -           | Suffix nach dem Text (z.B. Einheit)                         |
| `leftAddon`          | `ReactNode`                                        | -           | Element links neben dem Eingabefeld                         |
| `rightAddon`         | `ReactNode`                                        | -           | Element rechts neben dem Eingabefeld                        |
| `showCounter`        | `boolean`                                          | `false`     | Zeigt einen Zeichenzähler an                                |
| `maxLength`          | `number`                                           | -           | Maximale Anzahl von Zeichen                                 |
| `showProgressBar`    | `boolean`                                          | `false`     | Zeigt einen Fortschrittsbalken an                           |
| `onChange`           | `(e: React.ChangeEvent<HTMLInputElement>) => void` | -           | Callback bei Wertänderung                                   |
| `onFocus`            | `(e: React.FocusEvent<HTMLInputElement>) => void`  | -           | Callback bei Fokussierung                                   |
| `onBlur`             | `(e: React.FocusEvent<HTMLInputElement>) => void`  | -           | Callback bei Fokusverlust                                   |

## Beispiele

### Grundlegende Verwendung

```jsx
<Input
  label="Email"
  placeholder="name@example.com"
  type="email"
  helperText="Wir werden Ihre Email niemals teilen."
/>
```

### Mit Icons

```jsx
<Input
  label="Suche"
  placeholder="Suchbegriff eingeben"
  leftIcon={<SearchIcon />}
  rightIcon={<ClearIcon />}
  isRightIconClickable
  onRightIconClick={() => setValue('')}
/>
```

### Passwort-Feld mit Toggle

```jsx
<Input label="Passwort" type="password" showPasswordToggle showCounter maxLength={20} />
```

### Validierungszustände

```jsx
<Input
  label="Benutzername"
  isValid
  successMessage="Benutzername ist verfügbar"
/>

<Input
  label="Email"
  type="email"
  isInvalid
  error="Bitte geben Sie eine gültige Email-Adresse ein"
/>
```

### Mit Präfix und Suffix

```jsx
<Input
  label="Preis"
  type="number"
  prefix="€"
  placeholder="0.00"
/>

<Input
  label="Gewicht"
  type="number"
  suffix="kg"
  placeholder="0"
/>
```

### Mit Addons

```jsx
<Input placeholder="Website" leftAddon="https://" />
<Input placeholder="Benutzername" rightAddon="@example.com" />
<Input placeholder="Preis" leftAddon="€" rightAddon=".00" />
```

### Größenvarianten

```jsx
<Input size="xs" placeholder="Extra klein" />
<Input size="sm" placeholder="Klein" />
<Input size="md" placeholder="Mittel (Standard)" />
<Input size="lg" placeholder="Groß" />
<Input size="xl" placeholder="Extra groß" />
```

### Stilistische Varianten

```jsx
<Input variant="outline" placeholder="Outline (Standard)" />
<Input variant="filled" placeholder="Filled" />
<Input variant="flushed" placeholder="Flushed" />
<Input variant="unstyled" placeholder="Unstyled" />
```

## Barrierefreiheit

Die Input-Komponente wurde mit besonderem Fokus auf Barrierefreiheit entwickelt:

- Korrekte Verknüpfung von Labels mit Input-Feldern über `id` und `htmlFor`
- Unterstützung für `aria-describedby` für Hilfetexte und Fehlermeldungen
- Korrekte `aria-invalid` und `aria-valid` Attribute für Validierungszustände
- `aria-required` für erforderliche Felder
- `aria-disabled` für deaktivierte Felder
- `aria-readonly` für schreibgeschützte Felder
- `aria-busy` für Ladezustände
- Screenreader-freundliche Fehlermeldungen mit `aria-errormessage`
- Tastaturnavigation und -bedienung

## Design-Überlegungen

- Labels sollten klar und präzise sein
- Hilfetexte sollten zusätzliche Informationen bieten, ohne zu überwältigen
- Fehlermeldungen sollten spezifisch und lösungsorientiert sein
- Icons sollten die Funktion des Inputs unterstützen, nicht ablenken
- Validierungszustände sollten klar erkennbar sein
- Konsistente Größen und Abstände für bessere Benutzererfahrung

## Implementierungsdetails

Die Input-Komponente verwendet intern:

- Flexbox für die Ausrichtung von Text und Icons
- CSS-Transitions für Hover- und Fokus-Effekte
- React.forwardRef für Ref-Weiterleitung
- Tailwind CSS für Styling
- FormControl-Kontext für Formularintegration
- Zustandsmanagement für Passwort-Toggle und Fokus

## Aktuelle Verbesserungen

- Verbesserte ARIA-Attribute für bessere Screenreader-Unterstützung
- Hinzufügung von aria-valid, aria-disabled, aria-required, aria-readonly und aria-busy
- Korrektur der FormControl-Kontextnutzung mit optionalem Chaining
- Verbesserte Typensicherheit

## Zukünftige Verbesserungen

- Unterstützung für Masken und Formatierung
- Erweiterte Validierungsmöglichkeiten
- Autogrow-Funktionalität für Textarea-ähnliches Verhalten
- Verbesserte Mobilgeräte-Unterstützung
- Theming-Unterstützung für benutzerdefinierte Farbpaletten
