# Dialog

Die Dialog-Komponente zeigt Inhalte in einem modalen Fenster an, das über der Hauptanwendung schwebt. Sie eignet sich für Bestätigungen, Warnungen und Interaktionen, die die Aufmerksamkeit des Benutzers erfordern.

## Import

```jsx
import { Dialog } from '@smolitux/core';
```

## Verwendung

### Einfacher Dialog

```jsx
function SimpleDialogExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Dialog öffnen</Button>
      
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Beispiel-Dialog"
      >
        <p>Dies ist ein einfacher Dialog mit Standardbuttons.</p>
      </Dialog>
    </>
  );
}
```

### Dialog mit Bestätigung

```jsx
function ConfirmDialogExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleConfirm = () => {
    console.log('Bestätigt!');
    setIsOpen(false);
  };
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Bestätigungsdialog öffnen</Button>
      
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Bestätigen Sie die Aktion"
        confirmLabel="Bestätigen"
        cancelLabel="Abbrechen"
        onConfirm={handleConfirm}
        onCancel={() => setIsOpen(false)}
        variant="confirm"
      >
        <p>Sind Sie sicher, dass Sie diese Aktion durchführen möchten?</p>
      </Dialog>
    </>
  );
}
```

### Dialog mit verschiedenen Varianten

```jsx
function VariantDialogExample() {
  const [variant, setVariant] = useState(null);
  
  const openDialog = (selectedVariant) => {
    setVariant(selectedVariant);
  };
  
  const closeDialog = () => {
    setVariant(null);
  };
  
  return (
    <>
      <div className="flex space-x-2">
        <Button onClick={() => openDialog('info')}>Info</Button>
        <Button onClick={() => openDialog('success')}>Erfolg</Button>
        <Button onClick={() => openDialog('warning')}>Warnung</Button>
        <Button onClick={() => openDialog('error')}>Fehler</Button>
      </div>
      
      <Dialog
        isOpen={variant !== null}
        onClose={closeDialog}
        title={variant ? `${variant.charAt(0).toUpperCase() + variant.slice(1)}-Dialog` : ''}
        variant={variant}
      >
        <p>Dies ist ein Dialog mit der Variante "{variant}".</p>
      </Dialog>
    </>
  );
}
```

### Dialog mit benutzerdefiniertem Footer

```jsx
function CustomFooterDialogExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Dialog mit benutzerdefiniertem Footer</Button>
      
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Benutzerdefinierter Footer"
        footerButtons={
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Zurück
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => console.log('Speichern')}>
                Speichern
              </Button>
              <Button onClick={() => console.log('Veröffentlichen')}>
                Veröffentlichen
              </Button>
            </div>
          </div>
        }
      >
        <p>Dieser Dialog hat einen benutzerdefinierten Footer mit mehreren Buttons.</p>
      </Dialog>
    </>
  );
}
```

### Dialog mit Icon

```jsx
function IconDialogExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Dialog mit Icon</Button>
      
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Information"
        variant="info"
        icon={
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      >
        <p>Dies ist ein Dialog mit einem benutzerdefinierten Icon.</p>
      </Dialog>
    </>
  );
}
```

### Dialog mit verschiedenen Größen

```jsx
function SizeDialogExample() {
  const [size, setSize] = useState(null);
  
  const openDialog = (selectedSize) => {
    setSize(selectedSize);
  };
  
  const closeDialog = () => {
    setSize(null);
  };
  
  return (
    <>
      <div className="flex space-x-2">
        <Button onClick={() => openDialog('sm')}>Klein</Button>
        <Button onClick={() => openDialog('md')}>Mittel</Button>
        <Button onClick={() => openDialog('lg')}>Groß</Button>
        <Button onClick={() => openDialog('xl')}>Extra Groß</Button>
        <Button onClick={() => openDialog('full')}>Vollbild</Button>
      </div>
      
      <Dialog
        isOpen={size !== null}
        onClose={closeDialog}
        title={`Dialog (${size})`}
        size={size}
      >
        <p>Dies ist ein Dialog mit der Größe "{size}".</p>
      </Dialog>
    </>
  );
}
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `isOpen` | `boolean` | - | Ist der Dialog geöffnet? |
| `onClose` | `() => void` | - | Callback zum Schließen des Dialogs |
| `title` | `ReactNode` | - | Titel des Dialogs |
| `children` | `ReactNode` | - | Inhalt des Dialogs |
| `confirmLabel` | `string` | `'OK'` | Text für den Bestätigen-Button |
| `cancelLabel` | `string` | `'Abbrechen'` | Text für den Abbrechen-Button |
| `onConfirm` | `() => void` | - | Callback beim Klick auf Bestätigen |
| `onCancel` | `() => void` | - | Callback beim Klick auf Abbrechen |
| `variant` | `'info' \| 'success' \| 'warning' \| 'error' \| 'confirm'` | - | Variante des Dialogs |
| `footerButtons` | `ReactNode` | - | Benutzerdefinierte Buttons im Footer |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Größe des Dialogs |
| `icon` | `ReactNode` | - | Icon des Dialogs |
| `closeOnOverlayClick` | `boolean` | `true` | Schließen bei Klick auf Overlay |
| `closeOnEsc` | `boolean` | `true` | Schließen bei ESC-Taste |
| `initialFocus` | `boolean` | `true` | Fokus auf den Dialog setzen |
| `animated` | `boolean` | `true` | Animation beim Öffnen/Schließen |
| `className` | `string` | - | Zusätzliche CSS-Klassen |
| `zIndex` | `number` | `1000` | Z-Index-Wert |

## Barrierefreiheit

Die Dialog-Komponente ist für Barrierefreiheit optimiert:

- Verwendet die korrekten ARIA-Attribute (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`)
- Fokus-Management: Fokus wird beim Öffnen auf den Dialog gesetzt und beim Schließen zurückgegeben
- Tastaturnavigation: Schließen mit ESC, Fokus-Trap innerhalb des Dialogs
- Screenreader-Unterstützung durch semantische Struktur

## Beispiele

### Formular-Dialog

```jsx
function FormDialogExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = () => {
    console.log('Formular abgesendet:', formData);
    setIsOpen(false);
  };
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Kontaktformular öffnen</Button>
      
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Kontaktformular"
        footerButtons={
          <div className="flex justify-end space-x-2 w-full">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={handleSubmit}>
              Absenden
            </Button>
          </div>
        }
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-Mail
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nachricht
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}
```

### Mehrstufiger Dialog

```jsx
function MultiStepDialogExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: '',
    email: '',
    plan: ''
  });
  
  const openDialog = () => {
    setIsOpen(true);
    setStep(1);
    setData({
      name: '',
      email: '',
      plan: ''
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const nextStep = () => {
    setStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setStep(prev => prev - 1);
  };
  
  const handleSubmit = () => {
    console.log('Registrierung abgeschlossen:', data);
    setIsOpen(false);
  };
  
  return (
    <>
      <Button onClick={openDialog}>Registrierung starten</Button>
      
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`Schritt ${step} von 3: ${
          step === 1 ? 'Persönliche Daten' : 
          step === 2 ? 'Kontaktdaten' : 
          'Plan auswählen'
        }`}
        footerButtons={
          <div className="flex justify-between w-full">
            {step > 1 ? (
              <Button variant="outline" onClick={prevStep}>
                Zurück
              </Button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <Button onClick={nextStep}>
                Weiter
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Abschließen
              </Button>
            )}
          </div>
        }
        size="md"
      >
        {step === 1 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        )}
        
        {step === 2 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-Mail
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        )}
        
        {step === 3 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plan auswählen
            </label>
            <select
              name="plan"
              value={data.plan}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Bitte auswählen</option>
              <option value="basic">Basic (€9,99/Monat)</option>
              <option value="pro">Pro (€19,99/Monat)</option>
              <option value="enterprise">Enterprise (€49,99/Monat)</option>
            </select>
          </div>
        )}
      </Dialog>
    </>
  );
}
```

### Löschbestätigung

```jsx
function DeleteConfirmationExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = () => {
    setIsDeleting(true);
    
    // Simuliere API-Aufruf
    setTimeout(() => {
      console.log('Element gelöscht');
      setIsDeleting(false);
      setIsOpen(false);
    }, 1500);
  };
  
  return (
    <>
      <Button variant="danger" onClick={() => setIsOpen(true)}>
        Element löschen
      </Button>
      
      <Dialog
        isOpen={isOpen}
        onClose={() => !isDeleting && setIsOpen(false)}
        title="Element löschen"
        variant="error"
        icon={
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        }
        footerButtons={
          <div className="flex justify-end space-x-2 w-full">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              disabled={isDeleting}
            >
              Abbrechen
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDelete}
              loading={isDeleting}
            >
              {isDeleting ? 'Wird gelöscht...' : 'Löschen'}
            </Button>
          </div>
        }
      >
        <p>Sind Sie sicher, dass Sie dieses Element löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.</p>
      </Dialog>
    </>
  );
}
```