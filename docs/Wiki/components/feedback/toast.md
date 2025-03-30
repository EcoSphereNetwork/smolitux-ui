# Toast

Die Toast-Komponente zeigt kurze Benachrichtigungen an, die automatisch nach einer bestimmten Zeit verschwinden.

## Import

```jsx
import { Toast, ToastProvider, useToast } from '@smolitux/core';
```

## Verwendung

### Toast-Provider einrichten

Um Toasts in Ihrer Anwendung zu verwenden, müssen Sie zunächst den `ToastProvider` an einer hohen Stelle in Ihrer Komponentenhierarchie einbinden:

```jsx
import { ToastProvider } from '@smolitux/core';

function App() {
  return (
    <ToastProvider>
      {/* Ihre Anwendung hier */}
    </ToastProvider>
  );
}
```

### Toasts mit dem useToast-Hook anzeigen

```jsx
function ToastExample() {
  const toast = useToast();
  
  const showSuccessToast = () => {
    toast.success('Die Aktion wurde erfolgreich durchgeführt.');
  };
  
  const showErrorToast = () => {
    toast.error('Ein Fehler ist aufgetreten.');
  };
  
  const showWarningToast = () => {
    toast.warning('Bitte beachten Sie die Hinweise.');
  };
  
  const showInfoToast = () => {
    toast.info('Hier sind einige Informationen für Sie.');
  };
  
  return (
    <div className="space-x-2">
      <button 
        className="px-4 py-2 bg-green-600 text-white rounded"
        onClick={showSuccessToast}
      >
        Erfolg
      </button>
      
      <button 
        className="px-4 py-2 bg-red-600 text-white rounded"
        onClick={showErrorToast}
      >
        Fehler
      </button>
      
      <button 
        className="px-4 py-2 bg-yellow-600 text-white rounded"
        onClick={showWarningToast}
      >
        Warnung
      </button>
      
      <button 
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={showInfoToast}
      >
        Info
      </button>
    </div>
  );
}
```

### Toasts mit Titel

```jsx
function ToastWithTitleExample() {
  const toast = useToast();
  
  const showToastWithTitle = () => {
    toast.success({
      title: 'Erfolgreich gespeichert',
      message: 'Ihre Änderungen wurden erfolgreich gespeichert.'
    });
  };
  
  return (
    <button 
      className="px-4 py-2 bg-primary-600 text-white rounded"
      onClick={showToastWithTitle}
    >
      Toast mit Titel anzeigen
    </button>
  );
}
```

### Toasts mit benutzerdefinierter Dauer

```jsx
function ToastWithCustomDurationExample() {
  const toast = useToast();
  
  const showShortToast = () => {
    toast.info({
      message: 'Dieser Toast verschwindet nach 2 Sekunden.',
      duration: 2000
    });
  };
  
  const showLongToast = () => {
    toast.info({
      message: 'Dieser Toast bleibt 10 Sekunden sichtbar.',
      duration: 10000
    });
  };
  
  const showPersistentToast = () => {
    toast.warning({
      message: 'Dieser Toast bleibt sichtbar, bis er geschlossen wird.',
      duration: 0
    });
  };
  
  return (
    <div className="space-x-2">
      <button 
        className="px-4 py-2 bg-gray-600 text-white rounded"
        onClick={showShortToast}
      >
        Kurzer Toast (2s)
      </button>
      
      <button 
        className="px-4 py-2 bg-gray-600 text-white rounded"
        onClick={showLongToast}
      >
        Langer Toast (10s)
      </button>
      
      <button 
        className="px-4 py-2 bg-gray-600 text-white rounded"
        onClick={showPersistentToast}
      >
        Persistenter Toast
      </button>
    </div>
  );
}
```

### Toasts mit Aktionen

```jsx
function ToastWithActionsExample() {
  const toast = useToast();
  
  const showToastWithAction = () => {
    toast.info({
      title: 'Datei gelöscht',
      message: 'Die Datei wurde in den Papierkorb verschoben.',
      actions: (
        <button 
          className="text-primary-600 hover:text-primary-800 font-medium"
          onClick={() => console.log('Rückgängig gemacht')}
        >
          Rückgängig machen
        </button>
      )
    });
  };
  
  return (
    <button 
      className="px-4 py-2 bg-primary-600 text-white rounded"
      onClick={showToastWithAction}
    >
      Toast mit Aktion anzeigen
    </button>
  );
}
```

### Toasts mit benutzerdefinierten Icons

```jsx
function ToastWithCustomIconExample() {
  const toast = useToast();
  
  const showToastWithCustomIcon = () => {
    toast.info({
      title: 'Synchronisierung',
      message: 'Ihre Daten werden synchronisiert...',
      icon: <SyncIcon className="w-6 h-6 animate-spin" />
    });
  };
  
  return (
    <button 
      className="px-4 py-2 bg-primary-600 text-white rounded"
      onClick={showToastWithCustomIcon}
    >
      Toast mit benutzerdefiniertem Icon
    </button>
  );
}
```

### Toasts mit verschiedenen Positionen

```jsx
function ToastPositionsExample() {
  const toast = useToast();
  
  const positions = [
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left',
    'top-center',
    'bottom-center'
  ];
  
  const showToastAtPosition = (position) => {
    toast.info({
      message: `Toast an Position: ${position}`,
      position
    });
  };
  
  return (
    <div className="grid grid-cols-2 gap-2">
      {positions.map(position => (
        <button 
          key={position}
          className="px-4 py-2 bg-gray-600 text-white rounded"
          onClick={() => showToastAtPosition(position)}
        >
          {position}
        </button>
      ))}
    </div>
  );
}
```

### Toasts ohne Icon oder Schließen-Button

```jsx
function ToastCustomizationExample() {
  const toast = useToast();
  
  const showToastWithoutIcon = () => {
    toast.success({
      message: 'Toast ohne Icon',
      showIcon: false
    });
  };
  
  const showToastWithoutCloseButton = () => {
    toast.success({
      message: 'Toast ohne Schließen-Button',
      showCloseButton: false
    });
  };
  
  return (
    <div className="space-x-2">
      <button 
        className="px-4 py-2 bg-primary-600 text-white rounded"
        onClick={showToastWithoutIcon}
      >
        Ohne Icon
      </button>
      
      <button 
        className="px-4 py-2 bg-primary-600 text-white rounded"
        onClick={showToastWithoutCloseButton}
      >
        Ohne Schließen-Button
      </button>
    </div>
  );
}
```

### Toasts programmatisch schließen

```jsx
function ProgrammaticToastExample() {
  const toast = useToast();
  
  const showAndCloseToast = () => {
    const id = toast.info({
      title: 'Verarbeitung',
      message: 'Daten werden verarbeitet...',
      duration: 0
    });
    
    // Toast nach 3 Sekunden schließen
    setTimeout(() => {
      toast.remove(id);
      
      // Neuen Toast anzeigen
      toast.success('Verarbeitung abgeschlossen!');
    }, 3000);
  };
  
  return (
    <button 
      className="px-4 py-2 bg-primary-600 text-white rounded"
      onClick={showAndCloseToast}
    >
      Verarbeitung starten
    </button>
  );
}
```

### Standalone Toast-Komponente

Sie können die Toast-Komponente auch direkt verwenden, ohne den ToastProvider:

```jsx
function StandaloneToastExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  const showToast = () => {
    setIsOpen(true);
  };
  
  const closeToast = () => {
    setIsOpen(false);
  };
  
  return (
    <div>
      <button 
        className="px-4 py-2 bg-primary-600 text-white rounded"
        onClick={showToast}
      >
        Toast anzeigen
      </button>
      
      <Toast
        type="success"
        title="Erfolg!"
        message="Die Aktion wurde erfolgreich durchgeführt."
        isOpen={isOpen}
        onClose={closeToast}
        duration={3000}
      />
    </div>
  );
}
```

## Props

### Toast Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `title` | `string` | - | Titel des Toasts |
| `message` | `string` | - | Nachrichtentext |
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` | Typ des Toasts |
| `duration` | `number` | `5000` | Anzeigedauer in Millisekunden (0 für kein automatisches Schließen) |
| `onClose` | `() => void` | - | Callback zum Schließen des Toasts |
| `isOpen` | `boolean` | `true` | Ist der Toast gerade offen? |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'top-center' \| 'bottom-center'` | `'top-right'` | Position des Toasts |
| `showIcon` | `boolean` | `true` | Icon anzeigen |
| `showCloseButton` | `boolean` | `true` | Schließen-Button anzeigen |
| `animateOut` | `boolean` | `true` | Animation beim Schließen |
| `icon` | `ReactNode` | - | Benutzerdefiniertes Icon |
| `actions` | `ReactNode` | - | Aktionen am Toast (z.B. Buttons) |
| `className` | `string` | - | Zusätzliche CSS-Klassen |
| `data-testid` | `string` | `'toast'` | Test-ID für automatisierte Tests |

### ToastProvider Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `limit` | `number` | `5` | Limit für gleichzeitig angezeigte Toasts |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'top-center' \| 'bottom-center'` | `'top-right'` | Position aller Toasts |
| `children` | `ReactNode` | - | Kinder-Elemente |
| `data-testid` | `string` | `'toast-provider'` | Test-ID für automatisierte Tests |

### useToast Hook

Der `useToast` Hook gibt ein Objekt mit folgenden Methoden zurück:

| Methode | Beschreibung |
|---------|-------------|
| `success(message: string \| ToastOptions)` | Zeigt einen Erfolgs-Toast an |
| `error(message: string \| ToastOptions)` | Zeigt einen Fehler-Toast an |
| `warning(message: string \| ToastOptions)` | Zeigt einen Warnungs-Toast an |
| `info(message: string \| ToastOptions)` | Zeigt einen Info-Toast an |
| `show(options: ToastOptions)` | Zeigt einen benutzerdefinierten Toast an |
| `close(id: string)` | Entfernt einen Toast anhand seiner ID |
| `closeAll()` | Entfernt alle Toasts |
| `toasts` | Array mit allen aktuell angezeigten Toasts |

## Barrierefreiheit

Die Toast-Komponente ist für Barrierefreiheit optimiert:

- Verwendet ARIA-Attribute für bessere Screenreader-Unterstützung:
  - `role="alert"` für die Ankündigung neuer Toasts
  - `aria-live="polite"` oder `aria-live="assertive"` je nach Toast-Typ
  - `aria-atomic="true"` damit der gesamte Inhalt als eine Einheit gelesen wird
  - `aria-labelledby` und `aria-describedby` für die Verknüpfung von Titel und Nachricht
- Eindeutige IDs für alle Elemente durch Verwendung von `useId()`
- Fortschrittsbalken mit `role="progressbar"` und entsprechenden ARIA-Attributen
- Toasts können mit der Tastatur geschlossen werden (Enter oder Space auf dem Schließen-Button)
- Farbkontraste erfüllen die WCAG-Richtlinien (AA-Standard)
- Toasts werden automatisch nach einer bestimmten Zeit geschlossen, können aber auch manuell geschlossen werden
- Icons sind mit `aria-hidden="true"` für Screenreader ausgeblendet, wenn sie nur dekorativ sind

## Beispiele

### Formular mit Toast-Feedback

```jsx
function FormWithToastFeedback() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Einfache Validierung
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Bitte füllen Sie alle Felder aus.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simuliere API-Aufruf
    try {
      // Simuliere Netzwerkverzögerung
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simuliere zufälligen Erfolg/Fehler
      const isSuccess = Math.random() > 0.3;
      
      if (isSuccess) {
        toast.success({
          title: 'Nachricht gesendet',
          message: 'Vielen Dank für Ihre Nachricht. Wir werden uns in Kürze bei Ihnen melden.'
        });
        
        // Formular zurücksetzen
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        throw new Error('Netzwerkfehler');
      }
    } catch (error) {
      toast.error({
        title: 'Fehler beim Senden',
        message: 'Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Kontaktformular</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
        </button>
      </form>
    </div>
  );
}
```

### Datei-Upload mit Toast-Fortschritt

```jsx
function FileUploadWithToast() {
  const toast = useToast();
  const [file, setFile] = useState(null);
  
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleUpload = () => {
    if (!file) {
      toast.warning('Bitte wählen Sie zuerst eine Datei aus.');
      return;
    }
    
    // Toast für Upload-Start anzeigen
    const toastId = toast.info({
      title: 'Upload gestartet',
      message: `Datei "${file.name}" wird hochgeladen...`,
      duration: 0
    });
    
    // Simuliere Upload-Fortschritt
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      
      if (progress <= 100) {
        // Toast aktualisieren (in einer echten Anwendung würde man hier den Toast-Inhalt aktualisieren)
        toast.remove(toastId);
        toast.info({
          id: toastId,
          title: 'Upload läuft',
          message: `Datei "${file.name}" wird hochgeladen... ${progress}%`,
          duration: 0
        });
      } else {
        clearInterval(interval);
        
        // Upload abgeschlossen
        toast.remove(toastId);
        toast.success({
          title: 'Upload abgeschlossen',
          message: `Datei "${file.name}" wurde erfolgreich hochgeladen.`
        });
        
        // Datei zurücksetzen
        setFile(null);
      }
    }, 500);
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Datei hochladen</h2>
      
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-primary-50 file:text-primary-700
            hover:file:bg-primary-100"
        />
      </div>
      
      {file && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm">
            <span className="font-medium">Ausgewählte Datei:</span> {file.name}
          </p>
          <p className="text-xs text-gray-500">
            {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}
      
      <button
        onClick={handleUpload}
        disabled={!file}
        className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-gray-400"
      >
        Datei hochladen
      </button>
    </div>
  );
}
```

### Benachrichtigungssystem

```jsx
function NotificationSystem() {
  const toast = useToast();
  
  // Simuliere eingehende Benachrichtigungen
  useEffect(() => {
    const notifications = [
      {
        type: 'info',
        title: 'Neue Nachricht',
        message: 'Sie haben eine neue Nachricht von Max Mustermann erhalten.',
        delay: 2000
      },
      {
        type: 'success',
        title: 'Bestellung versandt',
        message: 'Ihre Bestellung #12345 wurde versandt und wird in Kürze geliefert.',
        delay: 5000
      },
      {
        type: 'warning',
        title: 'Speicherplatz fast voll',
        message: 'Ihr Speicherplatz ist zu 90% belegt. Bitte löschen Sie nicht benötigte Dateien.',
        delay: 8000
      }
    ];
    
    // Zeige Benachrichtigungen mit Verzögerung an
    notifications.forEach(notification => {
      const timer = setTimeout(() => {
        toast[notification.type]({
          title: notification.title,
          message: notification.message,
          actions: (
            <button 
              className="text-primary-600 hover:text-primary-800 font-medium"
              onClick={() => console.log(`Aktion für: ${notification.title}`)}
            >
              Anzeigen
            </button>
          )
        });
      }, notification.delay);
      
      return () => clearTimeout(timer);
    });
  }, [toast]);
  
  // Manuell Benachrichtigungen auslösen
  const triggerNotification = (type) => {
    const notifications = {
      message: {
        type: 'info',
        title: 'Neue Nachricht',
        message: 'Sie haben eine neue Nachricht erhalten.'
      },
      order: {
        type: 'success',
        title: 'Bestellung bestätigt',
        message: 'Ihre Bestellung wurde erfolgreich bestätigt.'
      },
      alert: {
        type: 'warning',
        title: 'Sicherheitswarnung',
        message: 'Ungewöhnliche Anmeldeaktivität festgestellt.'
      },
      error: {
        type: 'error',
        title: 'Fehler aufgetreten',
        message: 'Bei der Verarbeitung ist ein Fehler aufgetreten.'
      }
    };
    
    const notification = notifications[type];
    toast[notification.type]({
      title: notification.title,
      message: notification.message,
      actions: (
        <button 
          className="text-primary-600 hover:text-primary-800 font-medium"
          onClick={() => console.log(`Aktion für: ${notification.title}`)}
        >
          Anzeigen
        </button>
      )
    });
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Benachrichtigungssystem</h2>
      <p className="text-gray-600 mb-4">
        Klicken Sie auf die Buttons, um verschiedene Benachrichtigungen auszulösen.
      </p>
      
      <div className="grid grid-cols-2 gap-2">
        <button 
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => triggerNotification('message')}
        >
          Neue Nachricht
        </button>
        
        <button 
          className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={() => triggerNotification('order')}
        >
          Bestellung
        </button>
        
        <button 
          className="py-2 px-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
          onClick={() => triggerNotification('alert')}
        >
          Warnung
        </button>
        
        <button 
          className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
          onClick={() => triggerNotification('error')}
        >
          Fehler
        </button>
      </div>
      
      <div className="mt-4">
        <button 
          className="w-full py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          onClick={() => toast.removeAll()}
        >
          Alle Benachrichtigungen schließen
        </button>
      </div>
    </div>
  );
}
```