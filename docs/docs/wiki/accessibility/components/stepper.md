# Stepper Barrierefreiheit

## Implementierte Verbesserungen

Die Stepper-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `role="group"` - Definiert den Stepper als Gruppe von zusammengehörigen Elementen
- `role="button"` - Definiert jeden Schritt als interaktives Element
- `aria-label` - Bietet eine Beschreibung des Steppers
- `aria-current="step"` - Zeigt an, welcher Schritt aktuell aktiv ist
- `aria-disabled` - Zeigt an, ob ein Schritt deaktiviert ist
- `aria-describedby` - Verknüpft eine ausführliche Beschreibung mit dem Stepper oder einzelnen Schritten
- `aria-errormessage` - Verknüpft eine Fehlermeldung mit dem Stepper
- `aria-invalid` - Zeigt an, ob der Stepper ungültig ist
- `aria-busy` - Zeigt an, ob der Stepper im Ladezustand ist

### Tastaturunterstützung

- Vollständige Tastaturnavigation mit Tab-Taste
- Navigation zwischen Schritten mit Pfeiltasten
- Aktivierung von Schritten mit Enter oder Leertaste
- Sprung zum ersten Schritt mit Home-Taste
- Sprung zum letzten Schritt mit End-Taste
- Tastaturkürzel für direkten Zugriff auf Schritte (1-9)
- Überspringen von deaktivierten Schritten
- Visuelle Fokus-Indikatoren

### Screenreader-Unterstützung

- Versteckte Beschreibungen für zusätzliche Informationen
- Live-Regionen für Statusänderungen
- Ankündigung von Schrittwechseln
- Korrekte Ankündigung von Fehlermeldungen
- Unterstützung für benutzerdefinierte ARIA-Labels
- Spezifische Beschreibungen für einzelne Schritte

### Zusätzliche Funktionen

- Unterstützung für vertikale und horizontale Ausrichtung
- Unterstützung für verschiedene Varianten (default, outlined, contained)
- Unterstützung für verschiedene Größen
- Unterstützung für optionale Schritte
- Unterstützung für deaktivierte Schritte
- Unterstützung für Fehler-, Erfolgs- und Ladezustände
- Unterstützung für Hilfetext und Beschreibungen
- Unterstützung für benutzerdefinierte Icons und Connectors

## Beispiel-Implementierung

```tsx
// Einfacher Stepper
<StepperA11y
  steps={[
    { id: 'step1', title: 'Schritt 1', description: 'Beschreibung 1' },
    { id: 'step2', title: 'Schritt 2', description: 'Beschreibung 2' },
    { id: 'step3', title: 'Schritt 3', description: 'Beschreibung 3' }
  ]}
  activeStep={1}
  ariaLabel="Prozess-Schritte"
/>

// Stepper mit optionalen und deaktivierten Schritten
<StepperA11y
  steps={[
    { id: 'step1', title: 'Schritt 1', description: 'Beschreibung 1' },
    { id: 'step2', title: 'Schritt 2', description: 'Beschreibung 2', optional: true },
    { id: 'step3', title: 'Schritt 3', description: 'Beschreibung 3', disabled: true },
    { id: 'step4', title: 'Schritt 4', description: 'Beschreibung 4' }
  ]}
  activeStep={0}
  ariaLabel="Prozess mit optionalen Schritten"
  showOptionalLabel
/>

// Vertikaler Stepper
<StepperA11y
  steps={[
    { id: 'step1', title: 'Schritt 1', description: 'Beschreibung 1' },
    { id: 'step2', title: 'Schritt 2', description: 'Beschreibung 2' },
    { id: 'step3', title: 'Schritt 3', description: 'Beschreibung 3' }
  ]}
  activeStep={0}
  orientation="vertical"
  ariaLabel="Vertikaler Prozess"
/>

// Stepper mit benutzerdefinierten Icons
<StepperA11y
  steps={[
    { 
      id: 'step1', 
      title: 'Persönliche Daten', 
      description: 'Geben Sie Ihre persönlichen Daten ein',
      icon: <UserIcon />
    },
    { 
      id: 'step2', 
      title: 'Zahlungsinformationen', 
      description: 'Geben Sie Ihre Zahlungsinformationen ein',
      icon: <CreditCardIcon />
    },
    { 
      id: 'step3', 
      title: 'Bestätigung', 
      description: 'Bestätigen Sie Ihre Bestellung',
      icon: <CheckIcon />
    }
  ]}
  activeStep={0}
  ariaLabel="Bestellprozess"
  completedIcon={<CheckCircleIcon />}
/>
```

## Barrierefreiheitstests

Die Stepper-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastatur-Tests** zur Überprüfung der Tastaturnavigation und -bedienung
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Visuelle Tests** zur Überprüfung der Farbkontraste und Fokus-Indikatoren

## Bekannte Einschränkungen

- Die Komponente unterstützt derzeit keine verschachtelten Stepper
- Die Komponente unterstützt derzeit keine dynamische Änderung der Schritt-Anzahl
- Die Komponente unterstützt derzeit keine Drag-and-Drop-Umordnung von Schritten
- Die Komponente unterstützt derzeit keine Schritte mit Formularelementen
- Die Komponente unterstützt derzeit keine automatische Fortschrittsanzeige