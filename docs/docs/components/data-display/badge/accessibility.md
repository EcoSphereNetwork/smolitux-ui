# Badge-Komponente: Barrierefreiheit

Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Badge-Komponente und gibt Hinweise zur korrekten Verwendung für eine optimale Zugänglichkeit.

## ARIA-Attribute und Rollen

Die Badge-Komponente verwendet folgende ARIA-Attribute und Rollen, um die Barrierefreiheit zu verbessern:

### Badge-Container
- `role="status"`: Identifiziert die Badge als Statusanzeige
- `aria-label="..."`: Beschreibt die Badge für Screenreader
- `id="badge-[unique-id]"`: Eindeutige ID für ARIA-Referenzen

### Daten-Attribute
- `data-variant="default|primary|success|warning|error|info"`: Gibt die Variante der Badge an
- `data-size="xs|sm|md|lg"`: Gibt die Größe der Badge an
- `data-counter="true"`: Kennzeichnet die Badge als Zähler
- `data-dot="true"`: Kennzeichnet die Badge als Punkt

### Icon
- `aria-hidden="true"`: Versteckt das Icon vor Screenreadern

## Screenreader-Unterstützung

Die Badge-Komponente bietet folgende Screenreader-Unterstützungen:

- **Beschreibende Labels**: Die Badge wird mit einem beschreibenden Label versehen, das den Inhalt oder den Status beschreibt
- **Zähler-Ankündigungen**: Zähler-Badges werden mit Kontext angekündigt (z.B. "5 Benachrichtigungen")
- **Status-Ankündigungen**: Punkt-Badges werden mit ihrem Status angekündigt (z.B. "Fehlerstatus")

## Beispiele für barrierefreie Verwendung

### Standard-Badge

```tsx
<Badge>Neu</Badge>
```

Der Screenreader wird "Neu" ankündigen.

### Badge mit Icon

```tsx
<Badge icon={<Icon />}>Mit Icon</Badge>
```

Der Screenreader wird "Mit Icon" ankündigen, das Icon wird ignoriert.

### Zähler-Badge

```tsx
<Badge isCounter>5</Badge>
```

Der Screenreader wird "5 Benachrichtigungen" ankündigen.

### Punkt-Badge

```tsx
<Badge isDot variant="error" />
```

Der Screenreader wird "Fehlerstatus" ankündigen.

### Badge mit benutzerdefinierter ID

```tsx
<Badge id="notification-badge" isCounter>3</Badge>
```

## Best Practices

1. **Beschreibende Inhalte**: Verwenden Sie beschreibende Inhalte für Badges
   - Gut: `<Badge>Neu</Badge>` oder `<Badge>Beta</Badge>`
   - Schlecht: `<Badge>X</Badge>` oder `<Badge>!</Badge>`

2. **Zähler mit Kontext**: Verwenden Sie `isCounter` für Badges, die Zahlen anzeigen
   - Dies fügt automatisch den Kontext "Benachrichtigungen" hinzu

3. **Status-Punkte mit Variante**: Verwenden Sie die passende Variante für Punkt-Badges
   - `variant="success"` für positive Status
   - `variant="error"` für negative Status
   - `variant="warning"` für Warnungen
   - `variant="info"` für Informationen

4. **Konsistente Größen**: Verwenden Sie konsistente Größen für Badges in ähnlichen Kontexten
   - Dies verbessert die visuelle Konsistenz und Benutzererfahrung

5. **Ausreichender Kontrast**: Stellen Sie sicher, dass die Badge ausreichenden Kontrast zum Hintergrund hat
   - Die Komponente verwendet automatisch kontrastreiche Farbkombinationen

## Bekannte Einschränkungen

1. **Komplexe Inhalte**: Wenn die Badge komplexe Inhalte enthält (z.B. mehrere Elemente), sollte ein benutzerdefiniertes `aria-label` über `htmlProps` bereitgestellt werden
2. **Dynamische Badges**: Bei dynamisch aktualisierten Badges sollte ein `aria-live="polite"` über `htmlProps` hinzugefügt werden

## Weitere Ressourcen

- [WAI-ARIA Authoring Practices: Status Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/status/)
- [MDN Web Docs: ARIA: status role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role)
- [WebAIM: Accessible Status Messages](https://webaim.org/techniques/aria/#status)