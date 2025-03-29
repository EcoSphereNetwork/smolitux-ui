# Spinner Barrierefreiheit

## Implementierte Verbesserungen

Die Spinner-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `role="status"` - Definiert das Element als Statusanzeige
- `aria-label` - Bietet eine Beschreibung des Spinners
- `aria-busy` - Zeigt an, ob der Spinner aktiv ist
- `aria-live` - Definiert, wie der Spinner von Screenreadern angekündigt wird
- `aria-atomic` - Sorgt dafür, dass der gesamte Inhalt des Elements angekündigt wird
- `aria-relevant` - Definiert, welche Änderungen angekündigt werden sollen
- `aria-describedby` - Verknüpft eine ausführliche Beschreibung mit dem Spinner

### Screenreader-Unterstützung

- Versteckte Beschreibungen für zusätzliche Informationen
- Live-Regionen für Statusänderungen
- Korrekte Ankündigung von Ladezuständen
- Unterstützung für verschiedene Dringlichkeitsstufen (polite/assertive)
- Unterstützung für verschiedene Relevanztypen (additions/removals/text/all)

### Zusätzliche Funktionen

- Benutzerdefinierte Labels für den Spinner
- Benutzerdefinierte Beschreibungen für Screenreader
- Unterstützung für verschiedene Größen und Farben
- Unterstützung für verschiedene Varianten (border, grow, dots, ring)
- Unterstützung für benutzerdefinierte Animationsgeschwindigkeiten

## Beispiel-Implementierung

```tsx
<SpinnerA11y 
  ariaLabel="Daten werden geladen" 
  description="Bitte warten Sie, während die Daten geladen werden"
  size="md"
  color="primary"
  variant="border"
/>

<SpinnerA11y 
  ariaLabel="Hochladen" 
  text="Datei wird hochgeladen..."
  liveRegionPoliteness="assertive"
  color="success"
  variant="dots"
/>

<SpinnerA11y 
  ariaLabel="Verarbeitung läuft" 
  busy={isProcessing}
  centered
  size="lg"
  color="warning"
  variant="ring"
/>
```

## Barrierefreiheitstests

Die Spinner-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
3. **Visuelle Tests** zur Überprüfung der Farbkontraste und Größen

## Bekannte Einschränkungen

- Animierte Elemente können bei einigen Nutzern mit vestibulären Störungen Probleme verursachen
- Bei sehr schnellen Statusänderungen können Screenreader möglicherweise nicht alle Änderungen ankündigen
- Die Komponente unterstützt derzeit keine Anpassung der Animation für Nutzer, die reduzierte Bewegung bevorzugen
- Die Komponente unterstützt derzeit keine Fortschrittsanzeige (nur unbestimmte Ladezustände)