# Dialog-Komponente: Barrierefreiheit

Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Dialog-Komponente und gibt Hinweise zur korrekten Verwendung für eine optimale Zugänglichkeit.

## ARIA-Attribute und Rollen

Die Dialog-Komponente verwendet folgende ARIA-Attribute und Rollen, um die Barrierefreiheit zu verbessern:

- `role="dialog"` oder `role="alertdialog"`: Gibt die Rolle des Dialogs an
- `aria-modal="true"`: Zeigt an, dass der Dialog modal ist (blockiert Interaktionen mit dem Rest der Seite)
- `aria-labelledby`: Verweist auf die ID des Dialog-Titels
- `aria-describedby`: Verweist auf die ID der Dialog-Beschreibung oder des Dialog-Inhalts
- `aria-hidden="true"`: Für das Overlay, um es vor Screenreadern zu verstecken
- `aria-label="Schließen"`: Für den Schließen-Button

## Tastaturnavigation

Die Dialog-Komponente unterstützt folgende Tastaturinteraktionen:

- **Tab**: Navigiert durch fokussierbare Elemente innerhalb des Dialogs
- **Shift+Tab**: Navigiert rückwärts durch fokussierbare Elemente
- **Escape**: Schließt den Dialog (wenn `closeOnEsc={true}` und nicht `blocking` oder `requiresAction`)
- **Enter/Space**: Aktiviert Buttons innerhalb des Dialogs

## Fokus-Management

Die Dialog-Komponente implementiert folgende Fokus-Management-Strategien:

1. **Fokus-Falle**: Der Fokus bleibt innerhalb des Dialogs, wenn er geöffnet ist
2. **Initialer Fokus**: Der Fokus wird automatisch auf den Bestätigen-Button oder den Dialog selbst gesetzt
3. **Fokus-Wiederherstellung**: Der Fokus kehrt zum auslösenden Element zurück, wenn der Dialog geschlossen wird

## Beispiele für barrierefreie Verwendung

### Standard-Dialog

```tsx
<Dialog
  isOpen={isOpen}
  onClose={handleClose}
  title="Einstellungen speichern"
  description="Wählen Sie, ob Sie Ihre Änderungen speichern möchten."
  onCancel={handleCancel}
  onConfirm={handleSave}
  cancelLabel="Abbrechen"
  confirmLabel="Speichern"
>
  <p>Möchten Sie Ihre Änderungen speichern?</p>
</Dialog>
```

### Alert-Dialog

```tsx
<Dialog
  isOpen={isOpen}
  onClose={handleClose}
  title="Warnung"
  description="Warnung vor dem Löschen eines Elements."
  isAlertDialog={true}
  variant="warning"
  onCancel={handleCancel}
  onConfirm={handleDelete}
  cancelLabel="Abbrechen"
  confirmLabel="Löschen"
>
  <p>Diese Aktion kann nicht rückgängig gemacht werden. Sind Sie sicher?</p>
</Dialog>
```

### Dialog mit erforderlicher Aktion

```tsx
<Dialog
  isOpen={isOpen}
  onClose={handleClose}
  title="Nutzungsbedingungen"
  description="Sie müssen die Nutzungsbedingungen akzeptieren, um fortzufahren."
  requiresAction={true}
  onConfirm={handleAccept}
  confirmLabel="Akzeptieren"
>
  <div className="max-h-60 overflow-y-auto">
    <p>Hier stehen die Nutzungsbedingungen...</p>
  </div>
</Dialog>
```

### Dialog mit Formular

```tsx
<Dialog
  isOpen={isOpen}
  onClose={handleClose}
  title="Neuen Benutzer erstellen"
  description="Formular zum Erstellen eines neuen Benutzers."
  onCancel={handleCancel}
  onConfirm={handleSubmit}
  cancelLabel="Abbrechen"
  confirmLabel="Erstellen"
  confirmDisabled={!isFormValid}
>
  <form>
    <div className="mb-4">
      <label htmlFor="name" className="block mb-2">Name</label>
      <input 
        id="name" 
        type="text" 
        className="w-full p-2 border rounded" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        aria-required="true"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="email" className="block mb-2">E-Mail</label>
      <input 
        id="email" 
        type="email" 
        className="w-full p-2 border rounded" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        aria-required="true"
      />
    </div>
  </form>
</Dialog>
```

## Best Practices

1. **Immer einen Titel verwenden**: Der Titel hilft Screenreader-Benutzern, den Zweck des Dialogs zu verstehen
2. **Beschreibung hinzufügen**: Eine Beschreibung gibt zusätzlichen Kontext
3. **Korrekte Rolle verwenden**: `alertdialog` für wichtige Warnungen, `dialog` für normale Dialoge
4. **Escape-Taste unterstützen**: Ermöglicht das schnelle Schließen des Dialogs (außer bei `requiresAction` oder `blocking`)
5. **Fokus-Management implementieren**: Stellt sicher, dass Tastaturbenutzer nicht "gefangen" werden
6. **Deutliche Aktionsbuttons**: Klare Beschriftungen für Aktionen wie "Speichern", "Abbrechen", "Löschen"
7. **Visuelles Feedback**: Deutliche visuelle Unterscheidung zwischen primären und sekundären Aktionen

## Varianten und Zustände

### Varianten

Die Dialog-Komponente unterstützt verschiedene Varianten, die durch das `variant`-Prop gesteuert werden:

- `info`: Standard-Informationsdialog (blaues Icon)
- `success`: Erfolgsdialog (grünes Icon)
- `warning`: Warnungsdialog (gelbes Icon)
- `error`: Fehlerdialog (rotes Icon)
- `confirm`: Bestätigungsdialog (blaues Fragezeichen-Icon)

### Zustände

Die Dialog-Komponente unterstützt verschiedene Zustände:

- **Normal**: Standard-Dialog mit Abbrechen- und Bestätigen-Button
- **Blockierend**: Dialog kann nicht durch Klick außerhalb oder Escape-Taste geschlossen werden (`blocking={true}`)
- **Erforderliche Aktion**: Dialog erfordert eine bestimmte Aktion, bevor er geschlossen werden kann (`requiresAction={true}`)
- **Bestätigen deaktiviert**: Bestätigen-Button ist deaktiviert (`confirmDisabled={true}`)
- **Bestätigen lädt**: Bestätigen-Button zeigt Ladezustand an (`confirmLoading={true}`)

## Bekannte Einschränkungen

1. **Verschachtelte Dialoge**: Können Probleme mit dem Fokus-Management verursachen
2. **Sehr lange Inhalte**: Können bei einigen Screenreadern zu Problemen führen
3. **Dynamische Inhalte**: Änderungen im Dialog-Inhalt werden möglicherweise nicht von allen Screenreadern angekündigt

## Weitere Ressourcen

- [WAI-ARIA Authoring Practices: Dialog Modal](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [MDN Web Docs: ARIA: dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role)
- [MDN Web Docs: ARIA: alertdialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alertdialog_role)