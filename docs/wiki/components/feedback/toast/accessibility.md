# Toast-Komponente: Barrierefreiheit

Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Toast-Komponente und gibt Hinweise zur korrekten Verwendung für eine optimale Zugänglichkeit.

## ARIA-Attribute und Rollen

Die Toast-Komponente verwendet folgende ARIA-Attribute und Rollen, um die Barrierefreiheit zu verbessern:

### Toast-Container
- `role="alert"`: Identifiziert den Toast als wichtige Benachrichtigung
- `aria-live="polite|assertive"`: Bestimmt, wie dringend der Toast von Screenreadern angekündigt wird
  - `polite`: Für Info- und Success-Toasts (wartet, bis der Screenreader fertig ist)
  - `assertive`: Für Error- und Warning-Toasts (unterbricht den Screenreader)
- `aria-atomic="true"`: Gibt an, dass der gesamte Inhalt als eine Einheit gelesen werden soll
- `aria-labelledby="ID"`: Verweist auf die ID des Toast-Titels (falls vorhanden)
- `aria-describedby="ID"`: Verweist auf die ID der Toast-Nachricht
- `data-type="info|success|warning|error"`: Gibt den Typ des Toasts an
- `data-testid="toast"`: Für Testbarkeit

### Titel und Nachricht
- Eindeutige IDs für Titel und Nachricht durch Verwendung von `useId()`
- `id="toast-title-[uniqueId]"`: Eindeutige ID für den Titel
- `id="toast-message-[uniqueId]"`: Eindeutige ID für die Nachricht
- `data-testid="toast-title"`: Für Testbarkeit des Titels
- `data-testid="toast-message"`: Für Testbarkeit der Nachricht

### Fortschrittsbalken
- `role="progressbar"`: Identifiziert den Fortschrittsbalken
- `aria-valuemin="0"`: Minimaler Wert
- `aria-valuemax="100"`: Maximaler Wert
- `aria-valuenow="[value]"`: Aktueller Wert (dynamisch aktualisiert)
- `aria-label="Automatisches Schließen"`: Beschreibt den Zweck des Fortschrittsbalkens
- `data-testid="toast-progress"`: Für Testbarkeit

### Schließen-Button
- `aria-label="Schließen"`: Beschreibt den Zweck des Buttons
- `type="button"`: Definiert den Button-Typ
- `data-testid="toast-close-button"`: Für Testbarkeit

### Icons
- `aria-hidden="true"`: Versteckt die Icons vor Screenreadern
- `data-testid="toast-icon-container"`: Für Testbarkeit des Icon-Containers
- `data-testid="toast-[type]-icon"`: Für Testbarkeit des spezifischen Icons

## Tastaturnavigation

Die Toast-Komponente unterstützt folgende Tastaturinteraktionen:

- **Tab**: Fokussiert den Schließen-Button und Aktions-Buttons
- **Enter/Space**: Aktiviert den fokussierten Button
- **Escape**: Schließt den Toast (wenn implementiert)

## Fokus-Management

Die Toast-Komponente implementiert folgende Fokus-Management-Strategien:

- **Fokus-Indikatoren**: Deutliche visuelle Anzeige des Fokus durch einen Ring um Buttons
- **Fokus-Reihenfolge**: Logische Tab-Reihenfolge durch die native Button-Funktionalität
- **Kein Fokus-Stealing**: Toasts stehlen nicht automatisch den Fokus vom aktuellen Element
- **Fokus-Trap**: Bei modalen Toasts (falls implementiert) wird der Fokus innerhalb des Toasts gehalten

## Beispiele für barrierefreie Verwendung

### Standard-Toast

```tsx
<Toast 
  type="info" 
  message="Dies ist eine Informationsmeldung." 
/>
```

### Toast mit Titel

```tsx
<Toast 
  type="warning" 
  title="Achtung" 
  message="Diese Aktion kann nicht rückgängig gemacht werden." 
/>
```

### Toast mit Aktionen

```tsx
<Toast 
  type="error" 
  title="Fehler" 
  message="Die Datei konnte nicht hochgeladen werden." 
  actions={
    <Button size="sm" onClick={handleRetry}>Erneut versuchen</Button>
  }
/>
```

### Toast mit automatischem Schließen

```tsx
<Toast 
  type="success" 
  message="Die Aktion wurde erfolgreich durchgeführt." 
  duration={5000} 
/>
```

## Best Practices

1. **Passenden Toast-Typ wählen**: Verwenden Sie den richtigen Typ für die Wichtigkeit der Nachricht
   - `error`: Für kritische Fehler, die sofortige Aufmerksamkeit erfordern
   - `warning`: Für potenzielle Probleme oder wichtige Warnungen
   - `success`: Für erfolgreiche Aktionen
   - `info`: Für allgemeine Informationen

2. **Klare und präzise Nachrichten**: Formulieren Sie Nachrichten klar und präzise
   - Vermeiden Sie technischen Jargon
   - Erklären Sie, was passiert ist und was der Benutzer tun kann

3. **Angemessene Anzeigedauer**: Wählen Sie eine angemessene Anzeigedauer
   - Längere Nachrichten benötigen mehr Zeit zum Lesen
   - Wichtige Nachrichten sollten länger angezeigt werden
   - Kritische Fehler sollten möglicherweise nicht automatisch geschlossen werden

4. **Aktionen anbieten**: Bieten Sie bei Bedarf Aktionen an
   - Ermöglichen Sie dem Benutzer, auf Fehler zu reagieren
   - Bieten Sie eine "Rückgängig"-Option für bestimmte Aktionen

5. **Position beachten**: Wählen Sie eine Position, die nicht mit wichtigen Inhalten kollidiert
   - Vermeiden Sie das Überdecken von Formularelementen oder Buttons
   - Berücksichtigen Sie die Leserichtung (links nach rechts, oben nach unten)

## Bekannte Einschränkungen

1. **Mehrere Toasts**: Wenn mehrere Toasts gleichzeitig angezeigt werden, kann dies für Screenreader-Benutzer verwirrend sein
2. **Automatisches Schließen**: Automatisches Schließen kann problematisch sein, wenn der Benutzer nicht genug Zeit zum Lesen hat
3. **Animation**: Animationen können für manche Benutzer ablenkend sein

## Weitere Ressourcen

- [WAI-ARIA Authoring Practices: Alert Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)
- [MDN Web Docs: ARIA: alert role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role)
- [MDN Web Docs: ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)