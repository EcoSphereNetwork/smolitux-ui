# Modal-Komponente: Barrierefreiheit

Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Modal-Komponente und gibt Hinweise zur korrekten Verwendung für eine optimale Zugänglichkeit.

## ARIA-Attribute und Rollen

Die Modal-Komponente verwendet folgende ARIA-Attribute und Rollen, um die Barrierefreiheit zu verbessern:

- `role="dialog"` oder `role="alertdialog"`: Gibt die Rolle des Modals an
- `aria-modal="true"`: Zeigt an, dass der Modal-Dialog modal ist (blockiert Interaktionen mit dem Rest der Seite)
- `aria-labelledby`: Verweist auf die ID des Modal-Titels
- `aria-describedby`: Verweist auf die ID der Modal-Beschreibung oder des Modal-Inhalts
- `aria-hidden="true"`: Für das Overlay, um es vor Screenreadern zu verstecken
- `aria-label="Close"`: Für den Schließen-Button

## Tastaturnavigation

Die Modal-Komponente unterstützt folgende Tastaturinteraktionen:

- **Tab**: Navigiert durch fokussierbare Elemente innerhalb des Modals
- **Shift+Tab**: Navigiert rückwärts durch fokussierbare Elemente
- **Escape**: Schließt den Modal (wenn `closeOnEsc={true}`)
- **Enter/Space**: Aktiviert Buttons innerhalb des Modals

## Fokus-Management

Die Modal-Komponente implementiert folgende Fokus-Management-Strategien:

1. **Fokus-Falle**: Der Fokus bleibt innerhalb des Modals, wenn er geöffnet ist
2. **Initialer Fokus**: Der Fokus wird automatisch auf das erste fokussierbare Element gesetzt
3. **Fokus-Wiederherstellung**: Der Fokus kehrt zum auslösenden Element zurück, wenn der Modal geschlossen wird

## Beispiele für barrierefreie Verwendung

### Einfacher Dialog

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Einstellungen speichern"
  description="Wählen Sie, ob Sie Ihre Änderungen speichern möchten."
  footerButtons={true}
  onCancel={handleCancel}
  onConfirm={handleSave}
  cancelButtonText="Abbrechen"
  confirmButtonText="Speichern"
>
  <p>Möchten Sie Ihre Änderungen speichern?</p>
</Modal>
```

### Alert-Dialog

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Warnung"
  description="Warnung vor dem Löschen eines Elements."
  isAlertDialog={true}
  footerButtons={true}
  onCancel={handleCancel}
  onConfirm={handleDelete}
  cancelButtonText="Abbrechen"
  confirmButtonText="Löschen"
>
  <p>Diese Aktion kann nicht rückgängig gemacht werden. Sind Sie sicher?</p>
</Modal>
```

### Formular-Dialog

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Neuen Benutzer erstellen"
  description="Formular zum Erstellen eines neuen Benutzers."
  footerButtons={true}
  onCancel={handleCancel}
  onConfirm={handleSubmit}
  cancelButtonText="Abbrechen"
  confirmButtonText="Erstellen"
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
</Modal>
```

## Best Practices

1. **Immer einen Titel verwenden**: Der Titel hilft Screenreader-Benutzern, den Zweck des Modals zu verstehen
2. **Beschreibung hinzufügen**: Eine Beschreibung gibt zusätzlichen Kontext
3. **Korrekte Rolle verwenden**: `alertdialog` für wichtige Warnungen, `dialog` für normale Dialoge
4. **Escape-Taste unterstützen**: Ermöglicht das schnelle Schließen des Modals
5. **Fokus-Management implementieren**: Stellt sicher, dass Tastaturbenutzer nicht "gefangen" werden
6. **Deutliche Aktionsbuttons**: Klare Beschriftungen für Aktionen wie "Speichern", "Abbrechen", "Löschen"
7. **Visuelles Feedback**: Deutliche visuelle Unterscheidung zwischen primären und sekundären Aktionen

## Bekannte Einschränkungen

1. **Verschachtelte Modals**: Können Probleme mit dem Fokus-Management verursachen
2. **Sehr lange Inhalte**: Können bei einigen Screenreadern zu Problemen führen
3. **Dynamische Inhalte**: Änderungen im Modal-Inhalt werden möglicherweise nicht von allen Screenreadern angekündigt

## Weitere Ressourcen

- [WAI-ARIA Authoring Practices: Dialog Modal](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [MDN Web Docs: ARIA: dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role)
- [Deque University: Modal Dialog](https://dequeuniversity.com/library/aria/modal-dialog)