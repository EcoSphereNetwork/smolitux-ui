# ProgressBar Barrierefreiheit

## Implementierte Verbesserungen

Die ProgressBar-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `role="progressbar"` - Definiert das Element als Fortschrittsanzeige
- `aria-valuenow` - Gibt den aktuellen Wert der Fortschrittsanzeige an
- `aria-valuemin` - Gibt den minimalen Wert der Fortschrittsanzeige an
- `aria-valuemax` - Gibt den maximalen Wert der Fortschrittsanzeige an
- `aria-valuetext` - Bietet eine textuelle Beschreibung des aktuellen Werts
- `aria-label` - Bietet eine Beschreibung der Fortschrittsanzeige
- `aria-labelledby` - Verknüpft ein Label mit der Fortschrittsanzeige
- `aria-describedby` - Verknüpft eine ausführliche Beschreibung mit der Fortschrittsanzeige

### Screenreader-Unterstützung

- Versteckte Beschreibungen für zusätzliche Informationen
- Live-Regionen für Aktualisierungen des Fortschritts
- Benutzerdefinierte Textformate für Screenreader
- Korrekte Ankündigung von Fortschrittsänderungen
- Unterstützung für unbestimmte Fortschrittsanzeigen

### Zusätzliche Funktionen

- Benutzerdefinierte Labels für die Fortschrittsanzeige
- Benutzerdefinierte Textformate für Screenreader
- Unterstützung für verschiedene Größen und Farben
- Unterstützung für invertierte Fortschrittsanzeigen
- Unterstützung für animierte und gestreifte Fortschrittsanzeigen

## Beispiel-Implementierung

```tsx
<ProgressBarA11y 
  value={75} 
  ariaLabel="Ladefortschritt" 
  description="Datei wird hochgeladen"
  showLabel
  liveUpdate
  textValueFormat="Fortschritt: {value} von {max} ({value}%)"
/>

<ProgressBarA11y 
  value={50} 
  color="success"
  variant="striped"
  ariaLabel="Installation"
  description="Software wird installiert"
/>

<ProgressBarA11y 
  indeterminate
  ariaLabel="Laden"
  description="Daten werden geladen"
/>
```

## Barrierefreiheitstests

Die ProgressBar-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
3. **Visuelle Tests** zur Überprüfung der Farbkontraste und Größen

## Bekannte Einschränkungen

- Die Komponente unterstützt derzeit keine Interaktion mit der Tastatur (z.B. für Fortschrittsbalken, die auch als Slider fungieren können)
- Bei sehr schnellen Aktualisierungen können Screenreader möglicherweise nicht alle Änderungen ankündigen
- Die Komponente unterstützt derzeit keine Segmentierung des Fortschrittsbalkens (z.B. für Schritte)
- Die Komponente unterstützt derzeit keine Farbänderungen basierend auf dem Fortschrittswert