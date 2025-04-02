# Alert

Die Alert-Komponente wird verwendet, um wichtige Nachrichten oder Feedback an den Benutzer zu kommunizieren. Sie kann für Erfolgs-, Fehler-, Warn- und Informationsmeldungen verwendet werden.

## Import

```jsx
import { Alert } from '@smolitux/core';
```

## Verwendung

### Einfacher Alert

```jsx
<Alert type="info" message="Dies ist eine Informationsmeldung." />
```

### Alert mit Titel

```jsx
<Alert 
  type="success" 
  title="Erfolg" 
  message="Die Aktion wurde erfolgreich ausgeführt." 
/>
```

### Verschiedene Alert-Typen

```jsx
<Alert type="success" message="Erfolg: Die Aktion wurde erfolgreich ausgeführt." />
<Alert type="error" message="Fehler: Es ist ein Fehler aufgetreten." />
<Alert type="warning" message="Warnung: Diese Aktion kann nicht rückgängig gemacht werden." />
<Alert type="info" message="Info: Die Wartungsarbeiten beginnen in 5 Minuten." />
```

### Schließbarer Alert

```jsx
<Alert 
  type="info" 
  message="Diese Meldung kann geschlossen werden." 
  closable 
  onClose={() => console.log('Alert geschlossen')} 
/>
```

### Automatisch schließender Alert

```jsx
<Alert 
  type="success" 
  message="Diese Meldung schließt sich nach 5 Sekunden automatisch." 
  autoClose={5000} 
/>
```

### Alert mit zusätzlichen Aktionen

```jsx
<Alert 
  type="warning" 
  title="Achtung" 
  message="Möchten Sie diese Aktion wirklich durchführen?"
>
  <div className="mt-3 flex space-x-2">
    <Button variant="danger" size="sm">Löschen</Button>
    <Button variant="outline" size="sm">Abbrechen</Button>
  </div>
</Alert>
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | - | Der Typ des Alerts, bestimmt die Farbe und das Icon |
| `title` | `string` | - | Der Titel des Alerts (optional) |
| `message` | `string \| ReactNode` | - | Die Nachricht, die im Alert angezeigt wird |
| `onClose` | `() => void` | - | Callback-Funktion, die aufgerufen wird, wenn der Alert geschlossen wird |
| `className` | `string` | `''` | Zusätzliche CSS-Klassen |
| `showIcon` | `boolean` | `true` | Ob ein Icon angezeigt werden soll |
| `closable` | `boolean` | `false` | Ob der Alert schließbar sein soll |
| `autoClose` | `number` | `0` | Zeit in Millisekunden, nach der der Alert automatisch geschlossen wird (0 = nicht automatisch schließen) |
| `children` | `ReactNode` | - | Zusätzlicher Inhalt, der unter der Nachricht angezeigt wird |
| `id` | `string` | - | ID für Barrierefreiheit |
| `autoFocus` | `boolean` | `false` | Ob der Alert beim Laden fokussiert werden soll (für Screenreader) |

## Barrierefreiheit

Die Alert-Komponente ist für Barrierefreiheit optimiert:

- Verwendet die richtige semantische Rolle (`role="alert"`)
- Automatische Fokussierung für Screenreader (optional)
- Schließen-Button ist mit einem Label für Screenreader versehen
- Farbkombinationen erfüllen die WCAG-Kontrastvorgaben

## Beispiele

### Alert mit benutzerdefiniertem Icon

```jsx
import { InfoCircleIcon } from '@heroicons/react/solid';

<Alert 
  type="info" 
  message="Dies ist eine Informationsmeldung mit benutzerdefiniertem Icon." 
  icon={<InfoCircleIcon className="h-5 w-5" />} 
/>
```

### Alert mit HTML-Inhalt in der Nachricht

```jsx
<Alert 
  type="info" 
  message={
    <span>
      Weitere Informationen finden Sie in der <a href="/docs" className="underline">Dokumentation</a>.
    </span>
  } 
/>
```

### Alert mit Fortschrittsanzeige für automatisches Schließen

```jsx
<Alert 
  type="success" 
  message="Diese Meldung schließt sich automatisch." 
  autoClose={5000}
  showProgress
/>
```