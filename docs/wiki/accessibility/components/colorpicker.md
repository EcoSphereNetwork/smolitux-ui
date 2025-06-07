# ColorPicker Barrierefreiheit

## Implementierte Verbesserungen

Die ColorPicker-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `aria-haspopup="dialog"` - Zeigt an, dass der Button ein Dialog-Popup öffnet
- `aria-expanded` - Zeigt an, ob der Farbwähler geöffnet ist
- `aria-labelledby` - Verknüpft das Label mit dem ColorPicker
- `aria-describedby` - Verknüpft Beschreibungen, Hilfetexte und Fehlermeldungen
- `aria-invalid` - Zeigt an, ob der Wert ungültig ist
- `aria-required` - Zeigt an, ob das Feld erforderlich ist

Für den Dialog:
- `role="dialog"` - Definiert das Popup als Dialog
- `aria-modal="true"` - Zeigt an, dass der Dialog modal ist
- `aria-label` - Bietet eine beschreibende Bezeichnung für den Dialog

Für die Eingabefelder:
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` - Für den Alpha-Slider
- `aria-valuetext` - Beschreibender Text für den aktuellen Wert des Sliders

### Tastaturnavigation

- Enter/Space zum Öffnen des Farbwählers
- Tab-Navigation durch alle interaktiven Elemente
- Escape zum Schließen des Farbwählers
- Pfeiltasten für die Farbauswahl
- Enter/Space für die Auswahl voreingestellter Farben

### Fokus-Management

- Automatischer Fokus auf das Farbeingabefeld beim Öffnen
- Rückgabe des Fokus zum Trigger-Button beim Schließen
- Sichtbare Fokus-Indikatoren für alle interaktiven Elemente

### Screenreader-Unterstützung

- Beschreibende Texte für den aktuellen Farbwert
- Hilfetexte für die Bedienung der Farbauswahl
- Versteckte Hilfstexte mit `sr-only`-Klassen
- Ankündigungen von Fehlermeldungen

## Beispiel-Implementierung

```tsx
<button
  ref={triggerRef}
  id={uniqueId}
  type="button"
  onClick={togglePicker}
  aria-haspopup="dialog"
  aria-expanded={isOpen}
  aria-labelledby={label ? labelId : undefined}
  aria-describedby={
    [
      ariaDescription ? descriptionId : null,
      error ? errorId : null,
      helperText && !error ? helperId : null
    ].filter(Boolean).join(' ') || undefined
  }
  aria-invalid={error ? 'true' : undefined}
  aria-required={required ? 'true' : undefined}
>
  <div className="flex items-center">
    <div 
      className="color-preview"
      style={{ backgroundColor: colorValueText }}
      aria-hidden="true"
    />
    <span className="sr-only">
      Aktuelle Farbe: {colorValueText}. Drücken Sie Enter, um den Farbwähler zu öffnen.
    </span>
  </div>
</button>

{isOpen && (
  <div
    ref={popoverRef}
    role="dialog"
    aria-modal="true"
    aria-label="Farbwähler"
  >
    <div>
      <label htmlFor={colorInputId}>Farbe</label>
      <input
        ref={colorInputRef}
        id={colorInputId}
        type="color"
        value={color}
        onChange={(e) => updateColor(e.target.value)}
        aria-describedby={`${uniqueId}-color-description`}
      />
      <p id={`${uniqueId}-color-description`} className="sr-only">
        Verwenden Sie die Pfeiltasten, um die Farbe anzupassen.
      </p>
    </div>
    
    {allowAlpha && (
      <div>
        <label htmlFor={alphaInputId}>
          Transparenz: {Math.round(alpha * 100)}%
        </label>
        <input
          id={alphaInputId}
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={alpha}
          onChange={(e) => updateAlpha(parseFloat(e.target.value))}
          aria-valuemin={0}
          aria-valuemax={1}
          aria-valuenow={alpha}
          aria-valuetext={`${Math.round(alpha * 100)}% Transparenz`}
        />
      </div>
    )}
    
    <button
      type="button"
      onClick={closeDialog}
      aria-label="Farbwähler schließen"
    >
      Schließen
    </button>
  </div>
)}
```

## Barrierefreiheitstests

Die ColorPicker-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastaturnavigation** zur Sicherstellung der vollständigen Bedienbarkeit ohne Maus
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Fokus-Management-Tests** zur Sicherstellung der korrekten Fokusreihenfolge

## Bekannte Einschränkungen

- Die native Farbauswahl (`<input type="color">`) hat je nach Browser unterschiedliche Barrierefreiheitsfunktionen
- Die Auswahl von Farben kann für Benutzer mit Sehbehinderungen schwierig sein, daher sollten voreingestellte Farben mit beschreibenden Namen angeboten werden