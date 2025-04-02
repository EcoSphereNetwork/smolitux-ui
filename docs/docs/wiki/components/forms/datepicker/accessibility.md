# DatePicker-Komponente: Barrierefreiheit

Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der DatePicker-Komponente und gibt Hinweise zur korrekten Verwendung für eine optimale Zugänglichkeit.

## ARIA-Attribute und Rollen

Die DatePicker-Komponente verwendet folgende ARIA-Attribute und Rollen, um die Barrierefreiheit zu verbessern:

### Input-Feld
- `aria-haspopup="dialog"`: Zeigt an, dass das Feld ein Popup öffnet
- `aria-invalid="true|false"`: Zeigt an, ob das Feld einen ungültigen Wert enthält
- `aria-describedby="ID"`: Verweist auf die ID eines Hilfetexts oder einer Fehlermeldung

### Kalender-Popup
- `role="dialog"`: Identifiziert das Popup als Dialog
- `aria-modal="true"`: Zeigt an, dass der Dialog modal ist
- `aria-label="Datumsauswahl"`: Beschreibt den Zweck des Dialogs

### Kalender-Header
- `role="heading"`: Identifiziert die Monats-/Jahresanzeige als Überschrift
- `aria-level="2"`: Gibt die Hierarchieebene der Überschrift an

### Wochentage
- `role="columnheader"`: Identifiziert die Wochentagsbezeichnungen als Spaltenüberschriften
- `aria-label="Mo|Di|..."`: Beschreibt den Wochentag

### Kalendertage
- `role="gridcell"`: Identifiziert die Tage als Zellen in einem Raster
- `aria-selected="true|false"`: Zeigt an, ob der Tag ausgewählt ist
- `aria-disabled="true|false"`: Zeigt an, ob der Tag deaktiviert ist
- `aria-label="DATUM, [Heute], [Ausgewählt], [Nicht verfügbar]"`: Beschreibt den Tag mit zusätzlichen Informationen

## Tastaturnavigation

Die DatePicker-Komponente unterstützt folgende Tastaturinteraktionen:

### Input-Feld
- **Tab**: Fokussiert das Input-Feld
- **Enter/Space**: Öffnet den Kalender
- **Escape**: Schließt den Kalender

### Kalender
- **Pfeiltasten**: Navigieren zwischen den Tagen
- **Home**: Zum ersten Tag des Monats
- **End**: Zum letzten Tag des Monats
- **Page Up**: Zum vorherigen Monat
- **Page Down**: Zum nächsten Monat
- **Enter/Space**: Wählt den fokussierten Tag aus
- **Escape**: Schließt den Kalender

## Fokus-Management

Die DatePicker-Komponente implementiert folgende Fokus-Management-Strategien:

1. **Fokus-Falle**: Der Fokus bleibt innerhalb des Kalenders, wenn er geöffnet ist
2. **Fokus-Wiederherstellung**: Der Fokus kehrt zum Input-Feld zurück, wenn der Kalender geschlossen wird
3. **Visueller Fokus-Indikator**: Deutliche visuelle Anzeige des Fokus

## Beispiele für barrierefreie Verwendung

### Standard-DatePicker

```tsx
<DatePicker
  label="Geburtsdatum"
  placeholder="TT.MM.JJJJ"
  format="dd.MM.yyyy"
  onChange={handleDateChange}
/>
```

### DatePicker mit Hilfetexten

```tsx
<DatePicker
  label="Anreisedatum"
  helperText="Bitte wählen Sie ein Datum in der Zukunft"
  minDate={new Date()}
  format="dd.MM.yyyy"
  onChange={handleDateChange}
/>
```

### DatePicker mit Heute- und Löschen-Buttons

```tsx
<DatePicker
  label="Termin"
  showTodayButton
  showClearButton
  format="dd.MM.yyyy"
  onChange={handleDateChange}
/>
```

### DatePicker mit angepassten Texten

```tsx
<DatePicker
  label="Datum"
  i18n={{
    prevMonth: "Vorheriger Monat",
    nextMonth: "Nächster Monat",
    today: "Heute",
    clear: "Zurücksetzen",
    dateSelected: "Datum ausgewählt",
    dateDisabled: "Datum nicht verfügbar",
    calendarOpened: "Kalender geöffnet",
    calendarClosed: "Kalender geschlossen"
  }}
  onChange={handleDateChange}
/>
```

## Internationalisierung

Die DatePicker-Komponente unterstützt Internationalisierung durch das `i18n`-Prop und anpassbare Wochentags- und Monatsbezeichnungen:

```tsx
<DatePicker
  label="Datum"
  weekDayLabels={["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]}
  monthLabels={[
    "Januar", "Februar", "März", "April", 
    "Mai", "Juni", "Juli", "August", 
    "September", "Oktober", "November", "Dezember"
  ]}
  i18n={{
    prevMonth: "Vorheriger Monat",
    nextMonth: "Nächster Monat",
    today: "Heute",
    clear: "Löschen",
    dateSelected: "Datum ausgewählt",
    dateDisabled: "Datum nicht verfügbar",
    calendarOpened: "Kalender geöffnet",
    calendarClosed: "Kalender geschlossen"
  }}
  format="dd.MM.yyyy"
  onChange={handleDateChange}
/>
```

## Best Practices

1. **Immer ein Label verwenden**: Das Label hilft Screenreader-Benutzern, den Zweck des Feldes zu verstehen
2. **Format angeben**: Geben Sie das erwartete Datumsformat an, um Verwirrung zu vermeiden
3. **Hilfetexte verwenden**: Geben Sie zusätzliche Informationen, wenn nötig
4. **Tastaturzugänglichkeit testen**: Stellen Sie sicher, dass die Komponente mit der Tastatur bedient werden kann
5. **Screenreader-Unterstützung testen**: Stellen Sie sicher, dass die Komponente mit Screenreadern zugänglich ist
6. **Farbkontrast beachten**: Stellen Sie sicher, dass der Kontrast ausreichend ist

## Bekannte Einschränkungen

1. **Komplexe Datumsauswahl**: Zeiträume oder mehrere Daten können schwieriger zu bedienen sein
2. **Kleine Bildschirme**: Auf sehr kleinen Bildschirmen kann der Kalender schwer zu bedienen sein
3. **Tastatureingabe**: Die direkte Eingabe von Daten kann für einige Benutzer schwierig sein

## Weitere Ressourcen

- [WAI-ARIA Authoring Practices: Date Picker Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/)
- [MDN Web Docs: ARIA: dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role)
- [MDN Web Docs: ARIA: grid role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/grid_role)