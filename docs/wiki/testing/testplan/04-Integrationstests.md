# Integrationstests für komplexe Komponenten

Dieses Dokument beschreibt die Strategie und Implementierung von Integrationstests für komplexere Komponenten der smolitux UI-Bibliothek.

## 1. Ziel von Integrationstests

Integrationstests dienen dazu, das Zusammenspiel mehrerer Komponenten zu überprüfen. Im Gegensatz zu Unit-Tests, die einzelne Komponenten isoliert testen, prüfen Integrationstests, ob die Komponenten korrekt interagieren. Diese Tests sind besonders wichtig für:

- Komponenten, die andere Komponenten enthalten
- Komponenten mit komplexem Zustandsmanagement
- Interaktive Komponenten mit mehreren Zuständen
- Komponenten, die mit externen Services oder APIs interagieren

## 2. Integrationstests-Strategie

1. **Komponentenhierarchien testen**: Überprüfen, ob verschachtelte Komponenten korrekt funktionieren
2. **Interaktionsflüsse testen**: Vollständige Benutzerinteraktionsabläufe validieren
3. **Zustandsübergänge testen**: Korrekte Zustandsänderungen überprüfen
4. **Rand- und Fehlerfälle testen**: Verhalten bei ungewöhnlichen Inputs oder Fehlern prüfen

## 3. Zu testende komplexe Komponenten

Folgende Komponententypen sollten mit Integrationstests abgedeckt werden:

- Dialog-Komponenten (Modal, Dialog, Drawer)
- Formular-Komponenten (FormControl mit verschachtelten Elementen)
- Datum- und Zeit-Komponenten (DatePicker, TimePicker)
- Tabellen (mit Sortierung, Filterung, Paginierung)
- Toast/Notification-System
- Menu-/Navigation-Komponenten
- Medienwiedergabe-Komponenten

## 4. Beispiel: Modal mit Formular

```tsx
// Modal.int.test.tsx
import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../Modal';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { FormControl } from '../../FormControl/FormControl';

// Testkomponente, die das vollständige Szenario darstellt
const ModalWithForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formValue, setFormValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Test Form"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="test-form">
              Submit
            </Button>
          </>
        }
      >
        <form id="test-form" onSubmit={handleSubmit}>
          <FormControl label="Test Input">
            <Input 
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Enter value"
            />
          </FormControl>
        </form>
      </Modal>
      
    {submitted && <div data-testid="success-message">Form submitted!</div>}
  </div>
);

```

Dieser Test stellt sicher, dass ein Formular innerhalb eines Modals korrekt
geöffnet, ausgefüllt und abgeschickt werden kann.
