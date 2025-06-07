# MediaPlayer Barrierefreiheit

## Implementierte Verbesserungen

Die MediaPlayer-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `aria-label` - Bietet eine Beschreibung des Players
- `aria-labelledby` - Verknüpft ein Label mit dem Player
- `aria-describedby` - Verknüpft eine ausführliche Beschreibung mit dem Player
- `aria-live` - Definiert eine Live-Region für Ankündigungen
- `aria-atomic` - Definiert, ob die Live-Region als Ganzes aktualisiert wird
- `aria-relevant` - Definiert, welche Änderungen in der Live-Region relevant sind
- `aria-busy` - Zeigt an, ob der Player im Ladezustand ist
- `aria-roledescription` - Bietet eine benutzerdefinierte Rollenbeschreibung

Für die Steuerelemente:
- `aria-label` - Beschreibt die Funktion jedes Steuerelements
- `aria-pressed` - Zeigt an, ob ein Schalter gedrückt ist
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` - Beschreibt den Fortschrittsbalken
- `role="slider"` - Definiert den Fortschrittsbalken als Schieberegler
- `role="toolbar"` - Definiert die Steuerelemente als Werkzeugleiste
- `role="dialog"` - Definiert die Tastaturhilfe als Dialog

### Tastaturunterstützung

- Vollständige Tastatursteuerung für alle Funktionen
- Tastaturkürzel für häufig verwendete Funktionen:
  - Leertaste oder K: Wiedergabe starten/pausieren
  - Pfeiltaste links: 5 Sekunden zurück
  - Pfeiltaste rechts: 5 Sekunden vor
  - Pfeiltaste hoch: Lautstärke erhöhen
  - Pfeiltaste runter: Lautstärke verringern
  - M: Stummschalten ein/aus
  - F: Vollbildmodus ein/aus
  - C: Untertitel ein/aus
  - 0 oder Pos1: Zum Anfang springen
  - Ende: Zum Ende springen
  - ?: Tastaturhilfe ein/aus
- Fokus-Management für alle interaktiven Elemente
- Visuelle Fokus-Indikatoren

### Untertitel und Audiobeschreibungen

- Unterstützung für Untertitel (subtitles)
- Unterstützung für Bildunterschriften (captions)
- Unterstützung für Audiobeschreibungen (descriptions)
- Unterstützung für Kapitelmarken (chapters)
- Steuerelemente zum Ein- und Ausschalten von Untertiteln
- Standardmäßige Aktivierung von Untertiteln möglich

### Screenreader-Unterstützung

- Ankündigungen für wichtige Statusänderungen:
  - Laden des Mediums
  - Start und Pause der Wiedergabe
  - Änderung der Lautstärke
  - Aktivierung und Deaktivierung von Untertiteln
  - Änderung der Wiedergabegeschwindigkeit
  - Sprünge in der Zeitleiste
  - Ende der Wiedergabe
- Transkript für textuelle Alternative
- Beschreibung des Medieninhalts
- Tastaturhilfe für Screenreader-Benutzer

### Zusätzliche Funktionen

- Anpassbare Wiedergabegeschwindigkeit
- Fortschrittsanzeige mit Zeit
- Lautstärkeregler
- Vollbildmodus für Videos
- Transkript für textuelle Alternative

## Beispiel-Implementierung

```tsx
// Einfacher Video-Player
<MediaPlayerA11y
  src="https://example.com/video.mp4"
  type="video"
  controls
  ariaLabel="Beispielvideo"
/>

// Audio-Player mit Beschreibung
<MediaPlayerA11y
  src="https://example.com/audio.mp3"
  type="audio"
  controls
  ariaLabel="Beispielaudio"
  description="Dies ist eine Audioaufnahme einer Konferenz."
/>

// Video-Player mit Untertiteln
<MediaPlayerA11y
  src="https://example.com/video.mp4"
  type="video"
  controls
  ariaLabel="Video mit Untertiteln"
  tracks={[
    { src: "/subtitles/de.vtt", srclang: "de", label: "Deutsch", kind: "subtitles", default: true },
    { src: "/subtitles/en.vtt", srclang: "en", label: "English", kind: "subtitles" }
  ]}
  defaultCaptionsOn
/>

// Video-Player mit Transkript
<MediaPlayerA11y
  src="https://example.com/video.mp4"
  type="video"
  controls
  ariaLabel="Video mit Transkript"
  transcript={
    <div>
      <p><strong>00:00</strong> - Einleitung</p>
      <p><strong>00:15</strong> - Hauptteil</p>
      <p><strong>01:30</strong> - Zusammenfassung</p>
    </div>
  }
/>

// Video-Player mit allen Barrierefreiheitsfunktionen
<MediaPlayerA11y
  src="https://example.com/video.mp4"
  type="video"
  controls
  ariaLabel="Vollständig barrierefreies Video"
  description="Dies ist ein Beispielvideo mit allen Barrierefreiheitsfunktionen."
  tracks={[
    { src: "/subtitles/de.vtt", srclang: "de", label: "Deutsch", kind: "subtitles", default: true },
    { src: "/descriptions/de.vtt", srclang: "de", label: "Audiobeschreibung", kind: "descriptions" }
  ]}
  defaultCaptionsOn
  defaultDescriptionsOn
  keyboardShortcuts
  screenReaderAnnouncements
  transcript={<p>Vollständiges Transkript des Videos...</p>}
  keyboardHelp
  progressIndicator
  volumeIndicator
  speedIndicator
  captionsIndicator
  fullscreenIndicator
/>
```

## Barrierefreiheitstests

Die MediaPlayer-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastatur-Tests** zur Überprüfung der Tastaturnavigation und -bedienung
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Untertitel-Tests** zur Überprüfung der korrekten Anzeige und Steuerung von Untertiteln
5. **Fokus-Tests** zur Überprüfung des Fokus-Managements

## Bekannte Einschränkungen

- Die Komponente unterstützt derzeit keine automatische Generierung von Untertiteln
- Die Komponente unterstützt derzeit keine automatische Generierung von Transkripten
- Die Komponente unterstützt derzeit keine automatische Anpassung der Wiedergabequalität basierend auf der Verbindungsgeschwindigkeit
- Die Komponente unterstützt derzeit keine automatische Anpassung der Untertitelgröße und -farbe