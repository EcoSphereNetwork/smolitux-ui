# Slide Barrierefreiheit

## Implementierte Verbesserungen

Die Slide-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `aria-label` - Bietet eine Beschreibung der Animation
- `aria-labelledby` - Verknüpft ein Label mit der Animation
- `aria-describedby` - Verknüpft eine ausführliche Beschreibung mit der Animation
- `aria-hidden` - Versteckt die Animation vor Screenreadern, wenn nötig
- `aria-live` - Definiert eine Live-Region für Ankündigungen der Animation
- `aria-atomic` - Definiert, ob die Live-Region als Ganzes aktualisiert wird
- `aria-relevant` - Definiert, welche Änderungen in der Live-Region relevant sind
- `aria-busy` - Zeigt an, ob die Animation im Ladezustand ist
- `aria-roledescription` - Bietet eine benutzerdefinierte Rollenbeschreibung

### Reduzierte Bewegung

- Respektiert die Einstellung `prefers-reduced-motion` des Benutzers
- Deaktiviert Animationen automatisch, wenn der Benutzer reduzierte Bewegung bevorzugt
- Bietet eine sofortige Darstellung ohne Übergangseffekte für Benutzer mit Bewegungsempfindlichkeit

### Screenreader-Unterstützung

- Ankündigung von Animationen für Screenreader
- Benutzerdefinierte Ankündigungen für Ein- und Ausblendungen
- Versteckte Beschreibungen für zusätzliche Informationen
- Semantisch korrekte Struktur mit anpassbarem HTML-Element

## Beispiel-Implementierung

```tsx
// Einfache Slide-Animation
<SlideA11y 
  in={isVisible} 
  direction="up"
>
  <div>Animierter Inhalt</div>
</SlideA11y>

// Mit Screenreader-Ankündigungen
<SlideA11y 
  in={isVisible} 
  direction="left"
  announceAnimation
  enterAnnouncement="Inhalt wird eingeblendet"
  exitAnnouncement="Inhalt wird ausgeblendet"
  ariaLive="polite"
>
  <div>Animierter Inhalt mit Ankündigung</div>
</SlideA11y>

// Mit reduzierter Bewegung
<SlideA11y 
  in={isVisible} 
  direction="right"
  respectReducedMotion
>
  <div>Animierter Inhalt mit reduzierter Bewegung</div>
</SlideA11y>

// Mit semantischem HTML-Element
<SlideA11y 
  in={isVisible} 
  direction="down"
  as="section"
  ariaLabel="Animierter Abschnitt"
>
  <div>Animierter Inhalt in einem semantischen Element</div>
</SlideA11y>

// Mit ARIA-Attributen
<SlideA11y 
  in={isVisible} 
  direction="up"
  ariaLabel="Animierter Inhalt"
  ariaLive="assertive"
  ariaAtomic={true}
  ariaRoledescription="Slide-Animation"
>
  <div>Animierter Inhalt mit ARIA-Attributen</div>
</SlideA11y>

// Mit Callbacks
<SlideA11y 
  in={isVisible} 
  direction="left"
  onEnter={() => console.log('Animation startet')}
  onEntered={() => console.log('Animation abgeschlossen')}
  onExit={() => console.log('Ausblenden startet')}
  onExited={() => console.log('Ausblenden abgeschlossen')}
>
  <div>Animierter Inhalt mit Callbacks</div>
</SlideA11y>
```

## Barrierefreiheitstests

Die Slide-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Reduzierte-Bewegung-Tests** zur Überprüfung der Respektierung von `prefers-reduced-motion`
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Visuelle Tests** zur Überprüfung der Animation und des Verhaltens

## Bekannte Einschränkungen

- Die Komponente unterstützt derzeit keine automatische Anpassung der Animation basierend auf der Bildschirmgröße
- Die Komponente unterstützt derzeit keine automatische Anpassung der Animation basierend auf der Verbindungsgeschwindigkeit
- Die Komponente unterstützt derzeit keine automatische Anpassung der Animation basierend auf der Batteriekapazität
- Die Komponente unterstützt derzeit keine automatische Anpassung der Animation basierend auf der Prozessorleistung