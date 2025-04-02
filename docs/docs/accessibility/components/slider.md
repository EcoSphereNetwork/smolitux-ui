# Slider Barrierefreiheit

## Implementierte Verbesserungen

Die Slider-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `role="slider"` - Definiert das Element als Slider
- `aria-valuemin` - Gibt den minimalen Wert des Sliders an
- `aria-valuemax` - Gibt den maximalen Wert des Sliders an
- `aria-valuenow` - Gibt den aktuellen Wert des Sliders an
- `aria-valuetext` - Bietet eine textuelle Beschreibung des aktuellen Werts
- `aria-orientation` - Gibt die Ausrichtung des Sliders an (horizontal/vertikal)
- `aria-label` - Bietet eine Beschreibung des Sliders
- `aria-labelledby` - Verknüpft ein Label mit dem Slider
- `aria-describedby` - Verknüpft eine ausführliche Beschreibung mit dem Slider
- `aria-errormessage` - Verknüpft eine Fehlermeldung mit dem Slider
- `aria-invalid` - Zeigt an, ob der Slider ungültig ist
- `aria-required` - Zeigt an, ob der Slider erforderlich ist
- `aria-disabled` - Zeigt an, ob der Slider deaktiviert ist
- `aria-busy` - Zeigt an, ob der Slider im Ladezustand ist

### Tastaturunterstützung

- Vollständige Tastaturnavigation mit Tab-Taste
- Erhöhen des Werts mit Pfeiltaste rechts/oben
- Verringern des Werts mit Pfeiltaste links/unten
- Große Schritte mit Page Up/Down
- Minimaler Wert mit Home-Taste
- Maximaler Wert mit End-Taste
- Anpassbare Schrittgrößen für Tastaturnavigation
- Visuelle Fokus-Indikatoren

### Screenreader-Unterstützung

- Versteckte Beschreibungen für zusätzliche Informationen
- Benutzerdefinierte Texte für Wertankündigungen
- Live-Regionen für Wertänderungen
- Korrekte Ankündigung von Fehlermeldungen
- Unterstützung für Range-Slider mit zwei Werten

### Zusätzliche Funktionen

- Benutzerdefinierte Labels für den Slider
- Benutzerdefinierte Beschreibungen für Screenreader
- Unterstützung für verschiedene Größen und Farben
- Unterstützung für vertikale und horizontale Ausrichtung
- Unterstützung für Markierungen mit Labels
- Unterstützung für Wertanzeige in verschiedenen Positionen
- Unterstützung für benutzerdefinierte Wertformatierung
- Unterstützung für Range-Slider mit zwei Thumbs
- Unterstützung für invertierte Slider

## Beispiel-Implementierung

```tsx
// Einfacher Slider
<SliderA11y 
  label="Lautstärke" 
  min={0} 
  max={100} 
  defaultValue={50}
  ariaLabel="Lautstärkeregler"
  ariaValuetext={(value) => `${value}% Lautstärke`}
/>

// Slider mit Markierungen
<SliderA11y 
  label="Temperatur" 
  min={0} 
  max={40} 
  defaultValue={22}
  showMarks
  marks={[
    { value: 0, label: 'Kalt' },
    { value: 20, label: 'Normal' },
    { value: 40, label: 'Heiß' }
  ]}
  ariaLabel="Temperaturregler"
/>

// Range-Slider
<SliderA11y 
  label="Preisbereich" 
  min={0} 
  max={1000} 
  defaultValue={200}
  defaultValue2={800}
  isRange
  showValue
  valueFormat={(value) => `${value} €`}
  ariaLabel="Preisfilter"
/>

// Vertikaler Slider
<SliderA11y 
  label="Helligkeit" 
  min={0} 
  max={100} 
  defaultValue={75}
  orientation="vertical"
  ariaLabel="Helligkeitsregler"
/>
```

## Barrierefreiheitstests

Die Slider-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastatur-Tests** zur Überprüfung der Tastaturnavigation und -bedienung
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Visuelle Tests** zur Überprüfung der Farbkontraste und Fokus-Indikatoren

## Bekannte Einschränkungen

- Die Komponente verwendet versteckte Input-Elemente für die Barrierefreiheit, was zu Unterschieden zwischen visueller Darstellung und tatsächlichem Fokus führen kann
- Bei Range-Slidern kann es zu Überlappungen der Thumbs kommen, wenn die Werte zu nah beieinander liegen
- Die Komponente unterstützt derzeit keine Gruppierung mit Fieldset und Legend
- Die Komponente unterstützt derzeit keine Snap-to-Grid-Funktionalität für Markierungen
- Die Komponente unterstützt derzeit keine Touch-Gesten wie Pinch-to-Zoom für feinere Einstellungen