# Alert-Komponente: Barrierefreiheit

Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Alert-Komponente und gibt Hinweise zur korrekten Verwendung für eine optimale Zugänglichkeit.

## ARIA-Attribute und Rollen

Die Alert-Komponente verwendet folgende ARIA-Attribute und Rollen, um die Barrierefreiheit zu verbessern:

### Alert-Container
- `role="alert"`: Identifiziert den Alert als wichtige Benachrichtigung
- `aria-live="polite|assertive"`: Bestimmt, wie dringend der Alert von Screenreadern angekündigt wird
  - `polite`: Für Info-, Success- und Warning-Alerts (wartet, bis der Screenreader fertig ist)
  - `assertive`: Für Error-Alerts (unterbricht den Screenreader)
- `aria-labelledby="TITLE_ID"`: Verweist auf die ID des Titels (wenn vorhanden)
- `aria-describedby="MESSAGE_ID"`: Verweist auf die ID der Nachricht
- `data-type="info|success|warning|error"`: Gibt den Typ des Alerts an

### Titel und Nachricht
- `id="TITLE_ID"`: Eindeutige ID für den Titel
- `id="MESSAGE_ID"`: Eindeutige ID für die Nachricht

### Schließen-Button
- `aria-label="Schließen"`: Beschreibt den Zweck des Buttons
- `type="button"`: Definiert den Button-Typ

### Icons
- `aria-hidden="true"`: Versteckt die Icons vor Screenreadern

## Tastaturnavigation

Die Alert-Komponente unterstützt folgende Tastaturinteraktionen:

- **Tab**: Fokussiert den Schließen-Button (wenn vorhanden)
- **Enter/Space**: Aktiviert den Schließen-Button
- **Escape**: Schließt den Alert (wenn `onClose` definiert ist)

## Fokus-Management

Die Alert-Komponente implementiert folgende Fokus-Management-Strategien:

- **Auto-Fokus**: Der Alert kann automatisch fokussiert werden, wenn `autoFocus={true}` gesetzt ist
- **Fokus-Indikatoren**: Deutliche visuelle Anzeige des Fokus für den Schließen-Button

## Beispiele für barrierefreie Verwendung

### Standard-Alert

```tsx
<Alert 
  type="info" 
  message="Dies ist eine Informationsmeldung." 
/>
```

### Alert mit Titel

```tsx
<Alert 
  type="warning" 
  title="Achtung" 
  message="Diese Aktion kann nicht rückgängig gemacht werden." 
/>
```

### Schließbarer Alert

```tsx
<Alert 
  type="success" 
  message="Die Aktion wurde erfolgreich ausgeführt." 
  closable 
  onClose={handleClose} 
/>
```

### Error-Alert mit Auto-Fokus

```tsx
<Alert 
  type="error" 
  title="Fehler" 
  message="Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut." 
  autoFocus 
/>
```

### Alert mit benutzerdefinierten Aktionen

```tsx
<Alert 
  type="warning" 
  title="Bestätigung erforderlich" 
  message="Möchten Sie diese Aktion wirklich durchführen?" 
>
  <div className="flex space-x-2 mt-2">
    <Button variant="outline" onClick={handleCancel}>Abbrechen</Button>
    <Button variant="primary" onClick={handleConfirm}>Bestätigen</Button>
  </div>
</Alert>
```

## Best Practices

1. **Passenden Alert-Typ wählen**: Verwenden Sie den richtigen Typ für die Wichtigkeit der Nachricht
   - `error`: Für kritische Fehler, die sofortige Aufmerksamkeit erfordern
   - `warning`: Für potenzielle Probleme oder wichtige Warnungen
   - `success`: Für erfolgreiche Aktionen
   - `info`: Für allgemeine Informationen

2. **Klare und präzise Nachrichten**: Formulieren Sie Nachrichten klar und präzise
   - Vermeiden Sie technischen Jargon
   - Erklären Sie, was passiert ist und was der Benutzer tun kann

3. **Titel für komplexe Alerts**: Verwenden Sie einen Titel für komplexere Alerts
   - Der Titel sollte kurz und prägnant sein
   - Die Nachricht sollte Details enthalten

4. **Auto-Fokus für wichtige Alerts**: Verwenden Sie `autoFocus={true}` für wichtige Alerts
   - Besonders nützlich für Fehler-Alerts
   - Stellen Sie sicher, dass der Alert nicht zu oft den Fokus erhält

5. **Auto-Close mit Bedacht einsetzen**: Verwenden Sie `autoClose` nur für weniger wichtige Alerts
   - Geben Sie dem Benutzer genügend Zeit zum Lesen
   - Vermeiden Sie Auto-Close für Fehler-Alerts

## Bekannte Einschränkungen

1. **Mehrere Alerts**: Wenn mehrere Alerts gleichzeitig angezeigt werden, kann dies für Screenreader-Benutzer verwirrend sein
2. **Auto-Close**: Auto-Close kann problematisch sein, wenn der Benutzer nicht genug Zeit zum Lesen hat
3. **Lange Nachrichten**: Sehr lange Nachrichten können die Benutzerfreundlichkeit beeinträchtigen

## Weitere Ressourcen

- [WAI-ARIA Authoring Practices: Alert Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)
- [MDN Web Docs: ARIA: alert role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role)
- [WebAIM: Accessible JavaScript Alerts](https://webaim.org/techniques/javascript/alerts/)