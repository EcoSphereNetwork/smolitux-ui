# FileUpload Barrierefreiheit

## Implementierte Verbesserungen

Die FileUpload-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `aria-labelledby` - Verknüpft das Label mit dem Upload-Element
- `aria-describedby` - Verknüpft Beschreibungen, Hilfetexte und Fehlermeldungen
- `role="button"` - Definiert die Dropzone als Button
- `role="progressbar"` - Definiert den Fortschrittsbalken
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax` - Gibt den aktuellen Fortschritt an
- `role="alert"` - Markiert Fehlermeldungen als Alerts
- `role="status"` - Markiert Status-Ankündigungen

### Tastaturunterstützung

- Enter/Space zum Öffnen des Dateiauswahldialogs
- Tab-Navigation durch alle interaktiven Elemente
- Tastaturzugriff auf alle Funktionen (Hochladen, Entfernen, etc.)

### Screenreader-Unterstützung

- Beschreibende Texte für Upload-Elemente
- Ankündigungen von Status-Änderungen (Datei hinzugefügt, Upload gestartet, etc.)
- Versteckte Hilfstexte mit `sr-only`-Klassen
- Live-Regionen für dynamische Ankündigungen

### Fortschrittsanzeige

- Barrierefreie Fortschrittsbalken mit korrekten ARIA-Attributen
- Ankündigungen des Fortschritts für Screenreader
- Visuelle und textuelle Darstellung des Status

## Beispiel-Implementierung

```tsx
<FileUploadA11y
  label="Dokumente hochladen"
  accept="image/*,application/pdf"
  multiple
  maxSize={5 * 1024 * 1024} // 5MB
  helperText="Unterstützt werden Bilder und PDF-Dateien bis 5MB"
  onChange={files => console.log(files)}
/>
```

## Barrierefreiheitstests

Die FileUpload-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastaturnavigation** zur Sicherstellung der vollständigen Bedienbarkeit ohne Maus
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Fokus-Management-Tests** zur Sicherstellung der korrekten Fokusreihenfolge

## Bekannte Einschränkungen

- Der native Dateiauswahldialog kann je nach Browser unterschiedlich zugänglich sein
- Drag-and-Drop ist für Tastaturbenutzer nicht verfügbar, aber es gibt alternative Methoden
- Vorschauen von Bildern benötigen aussagekräftige Alt-Texte, die vom Benutzer bereitgestellt werden müssen