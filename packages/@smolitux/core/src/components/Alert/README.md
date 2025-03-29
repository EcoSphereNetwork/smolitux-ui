# Alert-Komponente

Die Alert-Komponente wird verwendet, um wichtige Nachrichten anzuzeigen.

## Funktionen

- Verschiedene Typen (success, error, warning, info)
- Verschiedene Varianten (default, outline, filled, subtle)
- Animationen für das Erscheinen und Verschwinden
- Unterstützung für Aktions-Buttons
- Automatisches Schließen
- Barrierefreiheit mit ARIA-Attributen
- Tastaturnavigation

## Verwendung

```jsx
import { Alert } from '@smolitux/core';

// Einfacher Alert
<Alert type="success" message="Die Aktion wurde erfolgreich ausgeführt." />

// Alert mit Titel
<Alert 
  type="error" 
  title="Fehler" 
  message="Es ist ein Fehler aufgetreten." 
/>

// Schließbarer Alert
<Alert 
  type="warning" 
  message="Diese Aktion kann nicht rückgängig gemacht werden." 
  closable 
  onClose={handleClose} 
/>

// Auto-Close Alert
<Alert 
  type="info" 
  message="Diese Nachricht verschwindet nach 5 Sekunden." 
  autoClose={5000} 
/>

// Alert mit Varianten
<Alert type="success" variant="outline" message="Outline-Variante" />
<Alert type="error" variant="filled" message="Filled-Variante" />
<Alert type="warning" variant="subtle" message="Subtle-Variante" />

// Alert mit Animationen
<Alert type="info" animation="slide-right" message="Slide-Right Animation" />
<Alert type="success" animation="slide-down" message="Slide-Down Animation" />

// Alert mit Aktions-Buttons
<Alert 
  type="info" 
  title="Information" 
  message="Möchten Sie fortfahren?" 
  actions={[
    { label: "Abbrechen", onClick: handleCancel },
    { label: "Fortfahren", onClick: handleContinue, variant: "primary" }
  ]}
/>

// Kompakter Alert
<Alert type="info" message="Kompakter Alert" compact />

// Alert mit Schatten
<Alert type="info" message="Alert mit Schatten" shadow />

// Alert ohne Rahmen
<Alert type="info" message="Alert ohne Rahmen" bordered={false} />

// Alert ohne abgerundete Ecken
<Alert type="info" message="Alert ohne abgerundete Ecken" rounded={false} />
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| type | 'success' \| 'error' \| 'warning' \| 'info' | - | Typ des Alerts |
| message | string \| ReactNode | - | Nachrichtentext |
| title | string | - | Titel des Alerts |
| onClose | () => void | - | Callback zum Schließen des Alerts |
| className | string | '' | Zusätzliche CSS-Klassen |
| showIcon | boolean | true | Icon anzeigen |
| closable | boolean | false | Schließbar machen |
| autoClose | number | 0 | Automatisch schließen nach X Millisekunden (0 = nicht automatisch schließen) |
| children | ReactNode | - | Zusätzlicher Inhalt |
| id | string | - | ID für Barrierefreiheit |
| autoFocus | boolean | false | Ob der Alert beim Laden fokussiert werden soll |
| variant | 'default' \| 'outline' \| 'filled' \| 'subtle' | 'default' | Variante des Alerts |
| animation | 'fade' \| 'slide-right' \| 'slide-down' \| 'none' | 'fade' | Animation des Alerts |
| animated | boolean | true | Ob der Alert animiert werden soll |
| actions | Array<{ label: string, onClick: () => void, variant?: string }> | [] | Aktions-Buttons |
| description | string | - | Beschreibung für Screenreader |
| compact | boolean | false | Ob der Alert kompakt sein soll |
| bordered | boolean | true | Ob der Alert einen Rahmen haben soll |
| rounded | boolean | true | Ob der Alert abgerundete Ecken haben soll |
| shadow | boolean | false | Ob der Alert einen Schatten haben soll |

## Barrierefreiheit

Die Alert-Komponente unterstützt folgende Barrierefreiheits-Features:

- ARIA-Attribute für Screenreader
- Verschiedene `aria-live`-Werte je nach Alert-Typ
- Tastaturnavigation (Escape zum Schließen)
- Fokussierbarkeit für Screenreader
- Versteckte Beschreibungen für Screenreader