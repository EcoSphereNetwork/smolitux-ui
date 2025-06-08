# Modal

Die Modal-Komponente wird verwendet, um Inhalte in einem Overlay-Fenster anzuzeigen, das über der Hauptseite schwebt. Sie ist ideal für Dialoge, Formulare, Bestätigungen und andere Interaktionen, die die Aufmerksamkeit des Benutzers erfordern.

## Import

```jsx
import { Modal } from '@smolitux/core';
```

## Verwendung

### Einfaches Modal

```jsx
import { useState } from 'react';
import { Modal, Button } from '@smolitux/core';

function Example() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Modal öffnen</Button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Beispiel-Modal"
      >
        <p>Dies ist der Inhalt des Modals.</p>
      </Modal>
    </>
  );
}
```

### Modal mit Footer-Aktionen

```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Bestätigung"
  footer={
    <div className="flex justify-end space-x-2">
      <Button variant="outline" onClick={() => setIsOpen(false)}>Abbrechen</Button>
      <Button variant="primary" onClick={handleConfirm}>Bestätigen</Button>
    </div>
  }
>
  <p>Möchten Sie diese Aktion wirklich durchführen?</p>
</Modal>
```

### Verschiedene Modal-Größen

```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Kleines Modal"
  size="sm"
>
  <p>Dies ist ein kleines Modal.</p>
</Modal>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Großes Modal"
  size="lg"
>
  <p>Dies ist ein großes Modal.</p>
</Modal>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Vollbild-Modal"
  size="full"
>
  <p>Dies ist ein Vollbild-Modal.</p>
</Modal>
```

### Modal-Positionen

```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal oben"
  position="top"
>
  <p>Dieses Modal erscheint am oberen Rand des Bildschirms.</p>
</Modal>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal rechts"
  position="right"
>
  <p>Dieses Modal erscheint am rechten Rand des Bildschirms.</p>
</Modal>
```

### Modal mit Formular

```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Neuen Benutzer erstellen"
  footer={
    <div className="flex justify-end space-x-2">
      <Button variant="outline" onClick={() => setIsOpen(false)}>Abbrechen</Button>
      <Button variant="primary" type="submit" form="user-form">Speichern</Button>
    </div>
  }
>
  <form id="user-form" onSubmit={handleSubmit}>
    <div className="space-y-4">
      <Input label="Name" name="name" required />
      <Input label="E-Mail" name="email" type="email" required />
      <Select 
        label="Rolle" 
        name="role"
        options={[
          { value: 'user', label: 'Benutzer' },
          { value: 'admin', label: 'Administrator' }
        ]}
      />
    </div>
  </form>
</Modal>
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `isOpen` | `boolean` | - | Steuert die Sichtbarkeit des Modals |
| `onClose` | `() => void` | - | Callback-Funktion, die aufgerufen wird, wenn das Modal geschlossen wird |
| `title` | `ReactNode` | - | Der Titel des Modals (optional) |
| `children` | `ReactNode` | - | Der Inhalt des Modals |
| `footer` | `ReactNode` | - | Der Footer-Inhalt des Modals (optional) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Die Größe des Modals |
| `position` | `'center' \| 'top' \| 'right' \| 'bottom' \| 'left'` | `'center'` | Die Position des Modals |
| `closeOnOverlayClick` | `boolean` | `true` | Ob das Modal geschlossen werden soll, wenn auf den Overlay-Hintergrund geklickt wird |
| `closeOnEsc` | `boolean` | `true` | Ob das Modal geschlossen werden soll, wenn die Escape-Taste gedrückt wird |
| `className` | `string` | `''` | Zusätzliche CSS-Klassen für das Modal |
| `headerClassName` | `string` | `''` | Zusätzliche CSS-Klassen für den Header |
| `bodyClassName` | `string` | `''` | Zusätzliche CSS-Klassen für den Body |
| `footerClassName` | `string` | `''` | Zusätzliche CSS-Klassen für den Footer |
| `overlayClassName` | `string` | `''` | Zusätzliche CSS-Klassen für das Overlay |
| `contentClassName` | `string` | `''` | Zusätzliche CSS-Klassen für das Modal-Element |
| `id` | `string` | - | ID für Barrierefreiheit |
| `animated` | `boolean` | `true` | Ob das Modal beim Öffnen animiert werden soll |
| `showCloseButton` | `boolean` | `true` | Ob das Modal einen Schließen-Button haben soll |
| `shadow` | `boolean` | `true` | Ob das Modal einen Schatten haben soll |
| `rounded` | `boolean` | `true` | Ob das Modal abgerundete Ecken haben soll |
| `bordered` | `boolean` | `true` | Ob das Modal einen Rahmen haben soll |
| `initialFocus` | `boolean` | `true` | Ob das Modal beim Öffnen fokussiert werden soll |
| `restoreFocus` | `boolean` | `true` | Ob das Modal beim Schließen den vorherigen Fokus wiederherstellen soll |

## Barrierefreiheit

Die Modal-Komponente ist für Barrierefreiheit optimiert:

- Verwendet die richtige ARIA-Rolle (`role="dialog"`)
- Fokus-Management: Fokus wird beim Öffnen auf das Modal gesetzt und beim Schließen wiederhergestellt
- Fokus-Falle: Der Fokus bleibt innerhalb des Modals, wenn es geöffnet ist
- Tastaturnavigation: Schließen mit Escape-Taste
- Screenreader-Unterstützung: Korrekte ARIA-Attribute

## Beispiele

### Modal mit benutzerdefiniertem Header

```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  headerClassName="bg-primary-500 text-white"
>
  <div className="flex items-center">
    <Icon name="star" className="mr-2" />
    <h2 className="text-xl font-bold">Premium-Funktion</h2>
  </div>
  <div className="mt-4">
    <p>Diese Funktion ist nur für Premium-Benutzer verfügbar.</p>
  </div>
</Modal>
```

### Modal mit Bestätigungsdialog

```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Eintrag löschen"
  size="sm"
  footer={
    <div className="flex justify-end space-x-2">
      <Button variant="outline" onClick={() => setIsOpen(false)}>Abbrechen</Button>
      <Button variant="danger" onClick={handleDelete}>Löschen</Button>
    </div>
  }
>
  <p>Sind Sie sicher, dass Sie diesen Eintrag löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.</p>
</Modal>
```

### Verschachteltes Modal

```jsx
function NestedModalExample() {
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsFirstOpen(true)}>Erstes Modal öffnen</Button>
      
      <Modal 
        isOpen={isFirstOpen} 
        onClose={() => setIsFirstOpen(false)}
        title="Erstes Modal"
      >
        <p>Dies ist das erste Modal.</p>
        <Button onClick={() => setIsSecondOpen(true)}>Zweites Modal öffnen</Button>
        
        <Modal
          isOpen={isSecondOpen}
          onClose={() => setIsSecondOpen(false)}
          title="Zweites Modal"
        >
          <p>Dies ist das zweite Modal, das über dem ersten schwebt.</p>
        </Modal>
      </Modal>
    </>
  );
}
```