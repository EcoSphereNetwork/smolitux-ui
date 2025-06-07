# Carousel Barrierefreiheit

## Implementierte Verbesserungen

Die Carousel-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `role="region"` - Definiert den Carousel als eigenständigen Bereich
- `aria-roledescription="carousel"` - Beschreibt die Rolle des Elements als Carousel
- `aria-label` - Bietet eine beschreibende Bezeichnung für das Carousel
- `aria-describedby` - Verknüpft eine detaillierte Beschreibung mit dem Carousel
- `aria-live` - Informiert Screenreader über Änderungen im Carousel

Für die einzelnen Slides:
- `role="tabpanel"` - Definiert jeden Slide als Panel
- `aria-hidden` - Versteckt inaktive Slides vor Screenreadern
- `aria-roledescription="slide"` - Beschreibt die Rolle des Elements als Slide
- `tabindex` - Steuert die Fokussierbarkeit der Slides

### Tastaturnavigation

- Pfeiltasten (links/rechts) zum Navigieren zwischen Slides
- Home/End-Tasten zum Springen zum ersten/letzten Slide
- Leertaste zum Pausieren/Fortsetzen der automatischen Wiedergabe
- Fokus-Management für aktive Slides

### Pause-Funktion

- Pause-Button zum Anhalten der automatischen Wiedergabe
- Visuelles Feedback zum aktuellen Wiedergabestatus
- ARIA-Attribute für den Pause-Button (`aria-pressed`, `aria-label`)

### Screenreader-Unterstützung

- Status-Ankündigungen für aktuelle Slide-Position
- Beschreibende Texte für Screenreader-Benutzer
- Versteckte Hilfstexte mit `sr-only`-Klassen

## Beispiel-Implementierung

```tsx
<div
  role="region"
  aria-label={ariaLabel}
  aria-roledescription="carousel"
  aria-describedby={ariaDescription ? ariaDescriptionId : undefined}
  tabIndex={0}
  onKeyDown={handleKeyDown}
>
  {/* Slides */}
  <div 
    aria-live={isPaused ? "polite" : "off"}
  >
    {items.map((item, index) => (
      <div 
        key={item.id}
        id={`${carouselId}-slide-${index}`}
        role="tabpanel"
        aria-hidden={activeIndex !== index}
        aria-label={item.ariaLabel || `Bild ${index + 1}`}
        aria-roledescription="slide"
        tabIndex={activeIndex === index ? 0 : -1}
        data-slide-index={index}
      >
        {item.content}
      </div>
    ))}
  </div>
  
  {/* Pause-Button */}
  <button
    type="button"
    aria-label={isPaused ? "Wiedergabe starten" : "Wiedergabe pausieren"}
    aria-pressed={isPaused}
    onClick={togglePause}
  >
    {/* Icon */}
  </button>
  
  {/* Status für Screenreader */}
  <div className="sr-only" aria-live="polite">
    {`Bild ${activeIndex + 1} von ${totalItems}${isPaused ? ', Wiedergabe pausiert' : ''}`}
  </div>
</div>
```

## Barrierefreiheitstests

Die Carousel-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastaturnavigation** zur Sicherstellung der vollständigen Bedienbarkeit ohne Maus
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Fokus-Management-Tests** zur Sicherstellung der korrekten Fokusreihenfolge

## Bekannte Einschränkungen

- Bei sehr komplexen Inhalten in den Slides kann die Tastaturnavigation innerhalb eines Slides schwierig sein
- Autoplay sollte standardmäßig deaktiviert sein, um die Barrierefreiheit zu verbessern