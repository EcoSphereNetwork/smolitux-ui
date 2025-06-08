# Modal-Komponente

Die Modal-Komponente zeigt Inhalte in einem Overlay an und bietet verschiedene Anpassungsmöglichkeiten.

## Funktionen

- Verschiedene Größen und Positionen
- Verschiedene Animationstypen
- Verbesserte Fokus-Verwaltung für Barrierefreiheit
- Unterstützung für verschiedene Dialog-Typen (Alert, Form, Confirmation, etc.)
- Anpassbare Header, Body und Footer
- Unterstützung für Standard-Footer-Buttons
- Screenreader-Unterstützung
- Tastaturnavigation

## Verwendung

```jsx
import { Modal } from '@smolitux/core';

// Einfaches Modal
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Beispiel Modal"
>
  <p>Modal-Inhalt</p>
</Modal>

// Modal mit Footer-Buttons
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Bestätigung"
  onCancel={handleCancel}
  onConfirm={handleConfirm}
  footerButtons
>
  <p>Möchten Sie diese Aktion wirklich durchführen?</p>
</Modal>

// Modal mit Animation
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Animation"
  animation="slide-up"
>
  <p>Dieses Modal verwendet eine Slide-Up-Animation.</p>
</Modal>

// Modal mit benutzerdefiniertem Footer
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Benutzerdefinierter Footer"
  footer={
    <div className="flex justify-end space-x-2">
      <Button onClick={handleClose}>Abbrechen</Button>
      <Button variant="primary" onClick={handleSave}>Speichern</Button>
    </div>
  }
>
  <p>Modal mit benutzerdefiniertem Footer.</p>
</Modal>
```

## Props

| Prop                | Typ                                                                                        | Standard | Beschreibung                                                      |
| ------------------- | ------------------------------------------------------------------------------------------ | -------- | ----------------------------------------------------------------- |
| isOpen              | boolean                                                                                    | -        | Ob der Modal sichtbar ist                                         |
| onClose             | () => void                                                                                 | -        | Callback zum Schließen des Modals                                 |
| title               | ReactNode                                                                                  | -        | Modal-Titel                                                       |
| children            | ReactNode                                                                                  | -        | Modal-Inhalt                                                      |
| footer              | ReactNode                                                                                  | -        | Footer-Inhalt                                                     |
| size                | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'                                             | 'md'     | Größe des Modals                                                  |
| position            | 'center' \| 'top' \| 'right' \| 'bottom' \| 'left'                                         | 'center' | Position des Modals                                               |
| animation           | 'fade' \| 'scale' \| 'slide-up' \| 'slide-down' \| 'slide-left' \| 'slide-right' \| 'none' | 'scale'  | Animation-Typ für den Modal                                       |
| animated            | boolean                                                                                    | true     | Ob der Modal animiert werden soll                                 |
| closeOnOverlayClick | boolean                                                                                    | true     | Ob der Modal bei Klick auf das Overlay geschlossen werden soll    |
| closeOnEsc          | boolean                                                                                    | true     | Ob der Modal bei Drücken der Escape-Taste geschlossen werden soll |
| showCloseButton     | boolean                                                                                    | true     | Ob der Modal einen Schließen-Button haben soll                    |
| footerButtons       | boolean                                                                                    | false    | Ob Standard-Footer-Buttons angezeigt werden sollen                |
| onCancel            | () => void                                                                                 | -        | Callback für den Abbrechen-Button                                 |
| onConfirm           | () => void                                                                                 | -        | Callback für den Bestätigen-Button                                |
| trapFocus           | boolean                                                                                    | true     | Ob der Fokus innerhalb des Modals gehalten werden soll            |
| returnFocus         | boolean                                                                                    | true     | Ob der Fokus nach dem Schließen zurückgesetzt werden soll         |

## Barrierefreiheit

Die Modal-Komponente unterstützt folgende Barrierefreiheits-Features:

- ARIA-Attribute für Screenreader
- Fokus-Verwaltung für Tastaturnavigation
- Screenreader-Ankündigungen beim Öffnen und Schließen
- Unterstützung für verschiedene Dialog-Rollen
- Tastaturnavigation innerhalb des Modals

## Beispiele

### Alert-Dialog

```jsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Fehler"
  isAlertDialog
  onConfirm={handleConfirm}
  footerButtons
>
  <p>Es ist ein Fehler aufgetreten.</p>
</Modal>
```

### Form-Dialog

```jsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Formular"
  isFormDialog
  onCancel={handleCancel}
  onConfirm={handleSubmit}
  footerButtons
>
  <form>
    <div className="mb-4">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Name
      </label>
      <input type="text" id="name" className="mt-1 block w-full" />
    </div>
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        E-Mail
      </label>
      <input type="email" id="email" className="mt-1 block w-full" />
    </div>
  </form>
</Modal>
```
