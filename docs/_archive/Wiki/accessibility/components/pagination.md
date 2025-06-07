# Pagination Barrierefreiheit

## Implementierte Verbesserungen

Die Pagination-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:

### ARIA-Attribute

- `role="navigation"` - Definiert das Element als Navigationselement
- `aria-label` - Bietet eine Beschreibung der Pagination
- `aria-controls` - Verknüpft die Navigation mit der Seitenliste
- `role="list"` - Definiert die Seitenliste als Liste
- `aria-current="page"` - Markiert die aktuelle Seite
- `aria-label` für Seitennummern - Bietet eine beschreibende Bezeichnung für jede Seite
- `aria-disabled` - Zeigt an, ob ein Button deaktiviert ist
- `aria-live="polite"` - Sorgt dafür, dass Änderungen an der Seitenzahl angekündigt werden
- `aria-atomic="true"` - Sorgt dafür, dass der gesamte Inhalt des Elements angekündigt wird
- `aria-describedby` - Verknüpft eine ausführliche Beschreibung mit der Pagination

### Tastaturunterstützung

- Vollständige Tastaturnavigation mit Tab-Taste
- Enter/Space zum Aktivieren von Buttons
- Korrekte Fokus-Reihenfolge zwischen Buttons
- Korrekte Deaktivierung von Buttons am Anfang/Ende

### Screenreader-Unterstützung

- Versteckte Beschreibungen für zusätzliche Informationen
- Korrekte Ankündigung von Seitenwechseln
- Beschreibende Texte für Icons und Aktionen
- Korrekte Ankündigung von Ellipsen
- Korrekte Ankündigung der aktuellen Seite

### Zusätzliche Funktionen

- Benutzerdefinierte Labels für alle Elemente
- Barrierefreie Icons mit versteckten Texten
- Barrierefreie Ellipsen mit beschreibenden Texten
- Barrierefreie Seitenzähler mit Live-Regionen

## Beispiel-Implementierung

```tsx
<PaginationA11y
  pageCount={10}
  currentPage={5}
  onChange={(page) => setCurrentPage(page)}
  labels={{
    pagination: "Seitennavigation",
    previous: "Zurück",
    next: "Weiter",
    first: "Erste Seite",
    last: "Letzte Seite",
    pageTemplate: "Seite {page} von {total}"
  }}
  description="Navigieren Sie durch die Suchergebnisse"
  showPageCount
/>
```

## Barrierefreiheitstests

Die Pagination-Komponente wurde mit folgenden Tests auf Barrierefreiheit geprüft:

1. **Automatisierte Tests** mit jest-axe zur Überprüfung der ARIA-Attribute
2. **Tastaturnavigation** zur Sicherstellung der vollständigen Bedienbarkeit ohne Maus
3. **Screenreader-Tests** zur Überprüfung der korrekten Ankündigungen
4. **Fokus-Management-Tests** zur Sicherstellung der korrekten Fokusreihenfolge

## Bekannte Einschränkungen

- Bei sehr vielen Seiten kann die Tastaturnavigation zeitaufwändig sein
- Die Komponente unterstützt derzeit keine Eingabe einer bestimmten Seitenzahl
- Die Komponente unterstützt derzeit keine Anpassung der Anzahl der Elemente pro Seite
- Die Ellipsen sind nicht anklickbar, um zu einer Seite zwischen den angezeigten Seiten zu springen