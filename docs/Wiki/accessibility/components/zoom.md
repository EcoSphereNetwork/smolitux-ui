# Zoom Barrierefreiheit

## Implementierte Verbesserungen

Die Zoom-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

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

### Epilepsie-Sicherheit

- Option zur Begrenzung der Animationsgeschwindigkeit für Benutzer mit Epilepsie
- Mindestdauer für Animationen, um schnelle Blitzeffekte zu vermeiden
- Sanftere Übergänge für mehr Sicherheit

### Screenreader-Unterstützung

- Ankündigung von Animationen für Screenreader
- Benutzerdefinierte Ankündigungen für Ein- und Ausblendungen
- Versteckte Beschreibungen für zusätzliche Informationen
- Semantisch korrekte Struktur mit anpassbarem HTML-Element

## Beispiel-Implementierung

```tsx
// Einfache Zoom-Animation
<ZoomA11y 
  in={isVisible} 
  scale={0.5}
>
  <div>Animierter Inhalt</div>
</ZoomA11y>

// Mit Screenreader-Ankündigungen
<ZoomA11y 
  in={isVisible} 
  scale={0.75}
  announceAnimation
  enterAnnouncement="Inhalt wird eingeblendet"
  exitAnnouncement="Inhalt wird ausgeblendet"
  ariaLive="polite"
>
  <div>Animierter Inhalt mit Ankündigung</div>
</ZoomA11y>

// Mit reduzierter Bewegung
<ZoomA11y 
  in={isVisible} 
  scale={0.5}
  respectReducedMotion
>
  <div>Animierter Inhalt mit reduzierter Bewegung</div>
</ZoomA11y>

// Mit Epilepsie-Sicherheit
<ZoomA11y 
  in={isVisible} 
  scale={0.5}
  epilepsySafe
>
  <div>Animierter Inhalt mit Epilepsie-Sicherheit</div>
</ZoomA11y>

// Mit semantischem HTML-Element
<ZoomA11y 
  in={isVisible} 
  scale={0.5}
  as="section"
  ariaLabel="Animierter Abschnitt"
>
  <div>Animierter Inhalt in einem semantischen Element</div>
</ZoomA11y>

// Mit ARIA-Attributen
<ZoomA11y 
  in={isVisible} 
  scale={0.5}
  ariaLabel="Animierter Inhalt"
  ariaLive="assertive"
  ariaAtomic={true}
  ariaRoledescription="Zoom-Animation"
>
  <div>Animierter Inhalt mit ARIA-Attributen</div>
</ZoomA11y>

// Mit Callbacks
<ZoomA11y 
  in={isVisible} 
  scale={0.5}
  onEnter={() => console.log('Animation startet')}
  onEntered={() => console.log('Animation abgeschlossen')}
  onExit={() => console.log('Ausblenden startet')}
  onExited={() => console.log('Ausblenden abgeschlossen')}
>
  <div>Animierter Inhalt mit Callbacks</div>
</ZoomA11y>

// Mit direkter Anwendung auf ein Element
<ZoomA11y 
  in={isVisible} 
  scale={0.5}
  ariaLabel="Animierter Button"
>
  <button onClick={handleClick}>Klick mich</button>
</ZoomA11y>
```

## Barrierefreiheitstests

Die Zoom-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Reduzierte-Bewegung-Tests** zur Überprüfung der Respektierung von `prefers-reduced-motion`
3. **Epilepsie-Sicherheits-Tests** zur Überprüfung der Animationsgeschwindigkeit
4. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
5. **Visuelle Tests** zur Überprüfung der Animation und des Verhaltens

## Bekannte Einschränkungen

- Die Komponente unterstützt derzeit keine automatische Anpassung der Animation basierend auf der Bildschirmgröße
- Die Komponente unterstützt derzeit keine automatische Anpassung der Animation basierend auf der Verbindungsgeschwindigkeit
- Die Komponente unterstützt derzeit keine automatische Anpassung der Animation basierend auf der Batteriekapazität
- Die Komponente unterstützt derzeit keine automatische Anpassung der Animation basierend auf der Prozessorleistung