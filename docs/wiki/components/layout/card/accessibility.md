# Card-Komponente: Barrierefreiheit

Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Card-Komponente und gibt Hinweise zur korrekten Verwendung für eine optimale Zugänglichkeit.

## ARIA-Attribute und Rollen

Die Card-Komponente verwendet folgende ARIA-Attribute und Rollen, um die Barrierefreiheit zu verbessern:

### Card-Container
- `role="region"`: Kennzeichnet die Karte als eigenständigen Inhaltsbereich (Standardeinstellung)
- `role="button"`: Wenn die Karte klickbar ist (onClick-Handler vorhanden)
- `aria-labelledby="HEADER_ID"`: Verweist auf die ID des Titels (wenn vorhanden)
- `id="card-[unique-id]"`: Eindeutige ID für ARIA-Referenzen
- `tabIndex="0"`: Macht die Karte fokussierbar, wenn sie klickbar ist

### Daten-Attribute
- `data-variant="flat|elevated|outlined"`: Gibt die Variante der Karte an
- `data-hoverable="true"`: Kennzeichnet die Karte als mit Hover-Effekt

### Abschnitte
- `id="card-[unique-id]-header"`: Eindeutige ID für den Header
- `id="card-[unique-id]-content"`: Eindeutige ID für den Inhalt
- `id="card-[unique-id]-footer"`: Eindeutige ID für den Footer

## Tastaturnavigation

Die Card-Komponente unterstützt folgende Tastaturinteraktionen, wenn sie klickbar ist:

- **Tab**: Fokussiert die Karte
- **Enter/Space**: Aktiviert die Karte (löst onClick-Handler aus)

## Fokus-Management

Die Card-Komponente implementiert folgende Fokus-Management-Strategien:

- **Bedingte Fokussierbarkeit**: Die Karte ist nur fokussierbar, wenn sie klickbar ist
- **Fokus-Indikatoren**: Deutliche visuelle Anzeige des Fokus für klickbare Karten

## Beispiele für barrierefreie Verwendung

### Standard-Karte

```tsx
<Card>
  Karteninhalt
</Card>
```

### Karte mit Titel

```tsx
<Card title="Kartentitel">
  Karteninhalt
</Card>
```

### Klickbare Karte

```tsx
<Card 
  onClick={handleCardClick}
  hoverable
>
  Klickbare Karte
</Card>
```

### Karte mit Footer

```tsx
<Card 
  title="Kartentitel"
  footer={<Button>Aktion</Button>}
>
  Karteninhalt
</Card>
```

### Karte mit Header-Aktion

```tsx
<Card 
  title="Kartentitel"
  headerAction={<Button size="sm">Bearbeiten</Button>}
>
  Karteninhalt
</Card>
```

## Best Practices

1. **Beschreibende Titel**: Verwenden Sie beschreibende Titel für Karten
   - Dies verbessert die Navigation und Orientierung für Screenreader-Benutzer

2. **Klickbare Karten**: Wenn eine Karte klickbar ist, sollte sie:
   - Einen `onClick`-Handler haben
   - Das `hoverable`-Attribut verwenden, um visuelles Feedback zu geben
   - Einen beschreibenden Titel haben, der die Aktion erklärt

3. **Semantische Struktur**: Verwenden Sie die richtigen Abschnitte
   - `title` für den Kartentitel
   - `children` für den Hauptinhalt
   - `footer` für Aktionen oder zusätzliche Informationen

4. **Ausreichender Kontrast**: Stellen Sie sicher, dass die Karte ausreichenden Kontrast zum Hintergrund hat
   - Die Komponente verwendet automatisch kontrastreiche Farbkombinationen

5. **Konsistente Verwendung**: Verwenden Sie Karten konsistent in Ihrer Anwendung
   - Gleiche Varianten für ähnliche Inhalte
   - Gleiche Interaktionsmuster für ähnliche Aktionen

## Bekannte Einschränkungen

1. **Verschachtelte interaktive Elemente**: Wenn eine Karte klickbar ist und interaktive Elemente enthält, kann es zu Problemen mit der Tastaturnavigation kommen
2. **Komplexe Inhalte**: Bei komplexen Inhalten sollten zusätzliche ARIA-Attribute hinzugefügt werden

## Weitere Ressourcen

- [WAI-ARIA Authoring Practices: Region Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/landmark-region/)
- [MDN Web Docs: ARIA: region role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role)
- [WebAIM: Creating Accessible Cards](https://webaim.org/techniques/aria/)