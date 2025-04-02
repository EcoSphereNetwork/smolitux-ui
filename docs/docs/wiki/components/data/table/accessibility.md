# Table-Komponente: Barrierefreiheit

Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Table-Komponente und gibt Hinweise zur korrekten Verwendung für eine optimale Zugänglichkeit.

## ARIA-Attribute und Rollen

Die Table-Komponente verwendet folgende ARIA-Attribute und Rollen, um die Barrierefreiheit zu verbessern:

### Tabelle
- `role="grid"`: Identifiziert die Tabelle als interaktives Raster
- `aria-label="Datentabelle"`: Beschreibt den Zweck der Tabelle (anpassbar)
- `summary="..."`: Bietet eine Zusammenfassung der Tabelle (optional)

### Spaltenüberschriften
- `role="columnheader"`: Identifiziert die Spaltenüberschriften
- `scope="col"`: Gibt an, dass die Überschrift für eine Spalte gilt
- `aria-sort="ascending|descending"`: Zeigt die aktuelle Sortierrichtung an
- `aria-label="Spaltenname, klicken zum Sortieren"`: Beschreibt die Funktion der Spaltenüberschrift
- `tabIndex="0"`: Macht sortierbare Spaltenüberschriften fokussierbar

### Zeilen
- `role="row"`: Identifiziert die Zeilen
- `aria-selected="true|false"`: Zeigt an, ob die Zeile ausgewählt ist
- `tabIndex="0"`: Macht klickbare Zeilen fokussierbar

### Zellen
- `role="gridcell"`: Identifiziert die Zellen

### Paginierung
- `aria-label="Vorherige Seite|Nächste Seite"`: Beschreibt die Funktion der Paginierungsbuttons
- `aria-disabled="true|false"`: Zeigt an, ob ein Button deaktiviert ist
- `aria-live="polite"`: Kündigt Änderungen an der Paginierung an

### Ladezustand und leere Tabelle
- `role="status"`: Identifiziert Statusmeldungen
- `aria-live="polite"`: Kündigt Statusänderungen an

## Tastaturnavigation

Die Table-Komponente unterstützt folgende Tastaturinteraktionen:

### Sortierbare Spaltenüberschriften
- **Tab**: Fokussiert die nächste sortierbare Spaltenüberschrift
- **Enter/Space**: Ändert die Sortierrichtung

### Klickbare Zeilen
- **Tab**: Fokussiert die nächste klickbare Zeile
- **Enter/Space**: Aktiviert die Zeilenklick-Funktion

### Paginierung
- **Tab**: Fokussiert die Paginierungsbuttons
- **Enter/Space**: Aktiviert den Button

## Beispiele für barrierefreie Verwendung

### Standard-Tabelle

```tsx
<Table
  columns={columns}
  data={data}
  ariaLabel="Benutzerliste"
  summary="Tabelle mit Benutzerdaten, sortierbar nach Name und Alter"
/>
```

### Tabelle mit klickbaren Zeilen

```tsx
<Table
  columns={columns}
  data={data}
  onRowClick={handleRowClick}
  ariaLabel="Benutzerliste mit klickbaren Zeilen"
/>
```

### Tabelle mit Paginierung

```tsx
<Table
  columns={columns}
  data={data}
  paginated={true}
  itemsPerPage={10}
  currentPage={currentPage}
  onPageChange={handlePageChange}
  ariaLabel="Paginierte Benutzerliste"
/>
```

### Tabelle mit Beschriftung

```tsx
<Table
  columns={columns}
  data={data}
  caption={<h2>Benutzerliste</h2>}
  captionPosition="top"
  ariaLabel="Benutzerliste"
/>
```

## Best Practices

1. **Immer ein `ariaLabel` verwenden**: Das Label hilft Screenreader-Benutzern, den Zweck der Tabelle zu verstehen
2. **Beschreibende Spaltenüberschriften verwenden**: Klare Überschriften helfen beim Verständnis der Daten
3. **Sortierbare Spalten kennzeichnen**: Machen Sie deutlich, welche Spalten sortierbar sind
4. **Tastaturzugänglichkeit testen**: Stellen Sie sicher, dass die Tabelle mit der Tastatur bedient werden kann
5. **Screenreader-Unterstützung testen**: Stellen Sie sicher, dass die Tabelle mit Screenreadern zugänglich ist

## Bekannte Einschränkungen

1. **Komplexe Tabellen**: Sehr komplexe Tabellen mit verschachtelten Spalten können für Screenreader-Benutzer schwer zu verstehen sein
2. **Mobile Geräte**: Auf kleinen Bildschirmen kann die Tabelle schwer zu bedienen sein
3. **Große Datenmengen**: Sehr große Tabellen können die Performance beeinträchtigen

## Weitere Ressourcen

- [WAI-ARIA Authoring Practices: Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
- [MDN Web Docs: ARIA: grid role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/grid_role)
- [WebAIM: Creating Accessible Tables](https://webaim.org/techniques/tables/)