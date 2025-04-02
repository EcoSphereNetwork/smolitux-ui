# Button Komponente

Die Button-Komponente ist ein grundlegendes Interaktionselement, das für verschiedene Aktionen in der Benutzeroberfläche verwendet wird. Sie wurde für optimale Barrierefreiheit und Benutzerfreundlichkeit entwickelt.

## Eigenschaften

| Eigenschaft | Typ | Standard | Beschreibung |
|-------------|-----|----------|--------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'link' \| 'solid' \| 'outline' \| 'danger' \| 'warning' \| 'success' \| 'info' \| 'unstyled'` | `'primary'` | Bestimmt das visuelle Erscheinungsbild des Buttons |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Legt die Größe des Buttons fest |
| `isLoading` | `boolean` | `false` | Zeigt einen Ladezustand an |
| `isDisabled` | `boolean` | `false` | Deaktiviert den Button |
| `isSuccess` | `boolean` | `false` | Zeigt einen Erfolgszustand an |
| `isError` | `boolean` | `false` | Zeigt einen Fehlerzustand an |
| `leftIcon` | `ReactNode` | - | Icon, das links vom Text angezeigt wird |
| `rightIcon` | `ReactNode` | - | Icon, das rechts vom Text angezeigt wird |
| `loadingText` | `string` | `'Loading...'` | Text, der im Ladezustand angezeigt wird |
| `loadingPlaceholder` | `ReactNode` | - | Benutzerdefinierter Inhalt für den Ladezustand |
| `loadingSpinner` | `ReactNode` | - | Benutzerdefinierter Spinner für den Ladezustand |
| `successIcon` | `ReactNode` | - | Benutzerdefiniertes Icon für den Erfolgszustand |
| `errorIcon` | `ReactNode` | - | Benutzerdefiniertes Icon für den Fehlerzustand |
| `isIconButton` | `boolean` | `false` | Formatiert den Button als Icon-Button ohne Text |
| `isDropdownTrigger` | `boolean` | `false` | Formatiert den Button als Dropdown-Trigger mit Pfeil-Icon |
| `isToggle` | `boolean` | `false` | Formatiert den Button als umschaltbaren Button |
| `isToggleOn` | `boolean` | `false` | Gibt an, ob ein Toggle-Button eingeschaltet ist |
| `fullWidth` | `boolean` | `false` | Button nimmt die volle verfügbare Breite ein |
| `shape` | `'rounded' \| 'square' \| 'pill'` | `'rounded'` | Bestimmt die Form des Buttons |
| `onClick` | `(event: React.MouseEvent) => void` | - | Funktion, die beim Klicken ausgeführt wird |
| `onPress` | `() => void` | - | Alternative Funktion für Touch/Klick-Ereignisse |
| `as` | `React.ElementType` | `'button'` | Rendert den Button als anderes Element (z.B. 'a' für Links) |

## Beispiele

### Grundlegende Verwendung

```jsx
<Button variant="primary">Primärer Button</Button>
<Button variant="secondary">Sekundärer Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link">Link Button</Button>
<Button variant="solid">Solid Button (Alias für primary)</Button>
<Button variant="outline">Outline Button (Alias für ghost)</Button>
```

### Status-Varianten

```jsx
<Button variant="success">Erfolg</Button>
<Button variant="danger">Gefahr</Button>
<Button variant="warning">Warnung</Button>
<Button variant="info">Information</Button>
```

### Mit Icons

```jsx
<Button leftIcon={<SearchIcon />}>Suchen</Button>
<Button rightIcon={<ArrowRightIcon />}>Weiter</Button>
<Button leftIcon={<SearchIcon />} rightIcon={<ArrowRightIcon />}>Suchen und Weiter</Button>
<Button isIconButton leftIcon={<SearchIcon />} aria-label="Suchen" />
```

### Zustandsvarianten

```jsx
<Button isLoading>Wird geladen...</Button>
<Button isSuccess>Erfolgreich gespeichert</Button>
<Button isError>Fehler aufgetreten</Button>
<Button isDisabled>Deaktiviert</Button>
<Button isDropdownTrigger>Dropdown öffnen</Button>
<Button isToggle isToggleOn>Aktiv</Button>
```

### Größen

```jsx
<Button size="xs">Extra Klein</Button>
<Button size="sm">Klein</Button>
<Button size="md">Mittel</Button>
<Button size="lg">Groß</Button>
<Button size="xl">Extra Groß</Button>
```

### Formen

```jsx
<Button shape="rounded">Abgerundet</Button>
<Button shape="square">Quadratisch</Button>
<Button shape="pill">Pill-Form</Button>
```

### Als Link

```jsx
<Button as="a" href="https://example.com">Link Button</Button>
```

## Barrierefreiheit

Die Button-Komponente wurde mit besonderem Fokus auf Barrierefreiheit entwickelt:

- Buttons haben standardmäßig den richtigen Fokus-Stil mit sichtbarem Fokusring
- Bei Verwendung als Link (`as="a"`) wird die richtige Semantik beibehalten
- Im Ladezustand wird `aria-busy="true"` gesetzt und ein Screenreader-Text "Bitte warten" hinzugefügt
- Deaktivierte Buttons haben `aria-disabled="true"`
- Erfolgszustände haben zusätzlichen Screenreader-Text "Erfolgreich"
- Fehlerzustände haben zusätzlichen Screenreader-Text "Fehler aufgetreten"
- Dropdown-Trigger haben `aria-haspopup="true"` und `aria-expanded` Attribute
- Icon-Buttons haben `aria-label` für Screenreader-Unterstützung
- Volle Tastaturunterstützung mit Enter und Space für Aktivierung

## Design-Überlegungen

- Primäre Buttons sollten für die Hauptaktion auf einer Seite verwendet werden
- Sekundäre Buttons für alternative Aktionen
- Ghost/Outline-Buttons für weniger wichtige Aktionen
- Link-Buttons für navigationsähnliche Aktionen
- Status-Varianten (success, danger, etc.) sollten konsistent für entsprechende Aktionen verwendet werden
- Icon-Buttons sollten immer ein `aria-label` haben

## Implementierungsdetails

Die Button-Komponente verwendet intern:
- Flexbox für die Ausrichtung von Text und Icons
- CSS-Transitions für Hover- und Fokus-Effekte
- SVG-Icons für Ladezustände, Erfolg und Fehler
- React.forwardRef für Ref-Weiterleitung
- Tailwind CSS für Styling
- Screenreader-only Texte für verbesserte Barrierefreiheit
- Keyboard-Event-Handler für bessere Tastaturunterstützung

## Aktuelle Verbesserungen

- Verbesserte ARIA-Attribute für bessere Barrierefreiheit
- Erweiterte Zustände (Erfolg, Fehler) mit visuellen Indikatoren
- Bessere Screenreader-Unterstützung für verschiedene Zustände
- Verbesserte Tastaturnavigation für Dropdown-Trigger
- Konsistente CSS-Klassen für einfachere Styling-Anpassungen

## Zukünftige Verbesserungen

- Ripple-Effekt für besseres Feedback bei Klicks
- Theming-Unterstützung für benutzerdefinierte Farbpaletten
- Animation für Zustandsübergänge
- Gruppierte Button-Unterstützung (ButtonGroup-Komponente)
- Erweiterte Tooltip-Integration