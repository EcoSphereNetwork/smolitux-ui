# Switch

Die Switch-Komponente ist eine Alternative zur Checkbox und wird verwendet, um zwischen zwei Zuständen umzuschalten.

## Import

```jsx
import { Switch } from '@smolitux/core';
```

## Verwendung

### Einfacher Switch

```jsx
<Switch />
```

### Switch mit Label

```jsx
<Switch label="Benachrichtigungen aktivieren" />
```

### Switch mit verschiedenen Größen

```jsx
<Switch size="xs" label="Extra Small" className="mb-2" />
<Switch size="sm" label="Small" className="mb-2" />
<Switch size="md" label="Medium" className="mb-2" />
<Switch size="lg" label="Large" className="mb-2" />
<Switch size="xl" label="Extra Large" />
```

### Switch mit verschiedenen Varianten

```jsx
<Switch variant="solid" label="Solid" className="mb-2" />
<Switch variant="outline" label="Outline" className="mb-2" />
<Switch variant="filled" label="Filled" className="mb-2" />
<Switch variant="minimal" label="Minimal" />
```

### Switch mit verschiedenen Farbschemata

```jsx
<Switch colorScheme="primary" label="Primary" className="mb-2" />
<Switch colorScheme="secondary" label="Secondary" className="mb-2" />
<Switch colorScheme="success" label="Success" className="mb-2" />
<Switch colorScheme="danger" label="Danger" className="mb-2" />
<Switch colorScheme="warning" label="Warning" className="mb-2" />
<Switch colorScheme="info" label="Info" className="mb-2" />
<Switch colorScheme="neutral" label="Neutral" />
```

### Switch mit Label-Position

```jsx
<Switch label="Label rechts" labelPosition="right" className="mb-2" />
<Switch label="Label links" labelPosition="left" />
```

### Switch mit Label-Ausrichtung

```jsx
<Switch 
  label="Label links (Anfang)" 
  labelPosition="left" 
  labelAlign="start" 
  className="mb-2" 
/>
<Switch 
  label="Label links (Mitte)" 
  labelPosition="left" 
  labelAlign="center" 
  className="mb-2" 
/>
<Switch 
  label="Label links (Ende)" 
  labelPosition="left" 
  labelAlign="end" 
/>
```

### Switch mit Icons

```jsx
<Switch icons label="Mit Icons" />
```

### Switch mit An/Aus-Beschriftung

```jsx
<Switch 
  labels={{ on: "AN", off: "AUS" }} 
  label="Mit Beschriftung" 
/>
```

### Switch mit Rahmen

```jsx
<Switch bordered label="Mit Rahmen" />
```

### Switch mit Schatten

```jsx
<Switch shadow label="Mit Schatten" />
```

### Switch mit Hover-Effekt

```jsx
<Switch hoverable label="Mit Hover-Effekt" />
```

### Switch mit Übergangseffekt

```jsx
<Switch transition label="Mit Übergangseffekt" />
```

### Switch im Ladezustand

```jsx
<Switch isLoading label="Wird geladen..." />
```

### Switch mit Hilfetext

```jsx
<Switch 
  label="Benachrichtigungen" 
  helperText="Aktivieren Sie diese Option, um E-Mail-Benachrichtigungen zu erhalten." 
/>
```

### Switch mit Fehlermeldung

```jsx
<Switch 
  label="Nutzungsbedingungen akzeptieren" 
  error="Sie müssen die Nutzungsbedingungen akzeptieren, um fortzufahren." 
/>
```

### Switch mit Erfolgsmeldung

```jsx
<Switch 
  label="Zwei-Faktor-Authentifizierung" 
  successMessage="Zwei-Faktor-Authentifizierung erfolgreich aktiviert." 
  defaultChecked 
/>
```

### Kontrollierter Switch

```jsx
function ControlledSwitchExample() {
  const [isChecked, setIsChecked] = useState(false);
  
  return (
    <div>
      <Switch 
        label="Kontrollierter Switch" 
        checked={isChecked} 
        onChange={(e) => setIsChecked(e.target.checked)} 
      />
      <p className="mt-2">
        Status: {isChecked ? 'Aktiviert' : 'Deaktiviert'}
      </p>
    </div>
  );
}
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `label` | `ReactNode` | - | Text-Label (alternativ zu label im FormControl) |
| `helperText` | `ReactNode` | - | Hilfetext (alternativ zu helperText im FormControl) |
| `error` | `ReactNode` | - | Fehlermeldung (alternativ zu error im FormControl) |
| `successMessage` | `ReactNode` | - | Erfolgsmeldung |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Größe des Switches |
| `variant` | `'solid' \| 'outline' \| 'filled' \| 'minimal'` | `'solid'` | Visuelle Variante |
| `colorScheme` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Farbe des Switches |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Position des Labels |
| `labelAlign` | `'start' \| 'center' \| 'end'` | `'start'` | Label-Ausrichtung wenn labelPosition="left" |
| `icons` | `boolean` | `false` | Checked/Unchecked-Icons anzeigen |
| `labels` | `{on?: string; off?: string}` | - | An/Aus-Beschriftung |
| `bordered` | `boolean` | `false` | Ob der Switch einen Rahmen haben soll |
| `rounded` | `boolean` | `true` | Ob der Switch abgerundete Ecken haben soll |
| `shadow` | `boolean` | `false` | Ob der Switch einen Schatten haben soll |
| `hoverable` | `boolean` | `true` | Ob der Switch einen Hover-Effekt haben soll |
| `focusable` | `boolean` | `true` | Ob der Switch einen Fokus-Effekt haben soll |
| `transition` | `boolean` | `true` | Ob der Switch einen Übergangseffekt haben soll |
| `transparent` | `boolean` | `false` | Ob der Switch einen transparenten Hintergrund haben soll |
| `tooltip` | `string` | - | Ob der Switch einen Tooltip haben soll |
| `isLoading` | `boolean` | `false` | Ob der Switch im Ladezustand ist |
| `isValid` | `boolean` | - | Ob der Switch gültig ist |
| `isInvalid` | `boolean` | - | Ob der Switch ungültig ist |
| `isRequired` | `boolean` | - | Ob der Switch erforderlich ist |
| `isReadOnly` | `boolean` | - | Ob der Switch schreibgeschützt ist |
| `isDisabled` | `boolean` | - | Ob der Switch deaktiviert ist |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

## Barrierefreiheit

Die Switch-Komponente ist für Barrierefreiheit optimiert:

- Verwendet native `<input type="checkbox">` Elemente für korrekte Semantik
- Unterstützt Tastaturnavigation (Tab, Space)
- Korrekte ARIA-Attribute (`aria-checked`, `aria-disabled`, `aria-readonly`, `aria-required`)
- Ausreichender Kontrast zwischen Vorder- und Hintergrund

## Beispiele

### Einstellungen mit Switches

```jsx
function SettingsExample() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    twoFactor: false,
    newsletter: true
  });
  
  const handleChange = (setting) => (e) => {
    setSettings(prev => ({
      ...prev,
      [setting]: e.target.checked
    }));
  };
  
  return (
    <div className="space-y-4 max-w-md">
      <h2 className="text-xl font-bold mb-4">Einstellungen</h2>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-3">Benachrichtigungen</h3>
        <div className="space-y-2">
          <Switch 
            label="Push-Benachrichtigungen" 
            checked={settings.notifications}
            onChange={handleChange('notifications')}
            helperText="Erhalten Sie Echtzeit-Updates direkt in Ihrem Browser."
          />
          <Switch 
            label="Newsletter" 
            checked={settings.newsletter}
            onChange={handleChange('newsletter')}
            helperText="Erhalten Sie wöchentliche Updates per E-Mail."
          />
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-3">Darstellung</h3>
        <Switch 
          label="Dark Mode" 
          checked={settings.darkMode}
          onChange={handleChange('darkMode')}
          helperText="Dunkles Farbschema für die Benutzeroberfläche."
        />
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-3">Sicherheit</h3>
        <div className="space-y-2">
          <Switch 
            label="Automatisches Speichern" 
            checked={settings.autoSave}
            onChange={handleChange('autoSave')}
            helperText="Speichern Sie Ihre Arbeit automatisch alle 5 Minuten."
          />
          <Switch 
            label="Zwei-Faktor-Authentifizierung" 
            checked={settings.twoFactor}
            onChange={handleChange('twoFactor')}
            helperText="Erhöhen Sie die Sicherheit Ihres Kontos mit 2FA."
            colorScheme="success"
          />
        </div>
      </div>
    </div>
  );
}
```

### Feature-Toggles

```jsx
function FeatureTogglesExample() {
  const [features, setFeatures] = useState({
    betaFeatures: false,
    experimentalUI: false,
    advancedAnalytics: false,
    aiSuggestions: true
  });
  
  const handleChange = (feature) => (e) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: e.target.checked
    }));
  };
  
  return (
    <div className="max-w-md">
      <h2 className="text-xl font-bold mb-4">Feature-Toggles</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div>
            <h3 className="font-medium">Beta-Features</h3>
            <p className="text-sm text-gray-500">Zugriff auf neue Funktionen vor der offiziellen Veröffentlichung.</p>
          </div>
          <Switch 
            checked={features.betaFeatures}
            onChange={handleChange('betaFeatures')}
            colorScheme="warning"
          />
        </div>
        
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div>
            <h3 className="font-medium">Experimentelle Benutzeroberfläche</h3>
            <p className="text-sm text-gray-500">Testen Sie das neue UI-Design.</p>
          </div>
          <Switch 
            checked={features.experimentalUI}
            onChange={handleChange('experimentalUI')}
            colorScheme="info"
          />
        </div>
        
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div>
            <h3 className="font-medium">Erweiterte Analytik</h3>
            <p className="text-sm text-gray-500">Detaillierte Nutzungsstatistiken und Berichte.</p>
          </div>
          <Switch 
            checked={features.advancedAnalytics}
            onChange={handleChange('advancedAnalytics')}
            colorScheme="secondary"
          />
        </div>
        
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div>
            <h3 className="font-medium">KI-Vorschläge</h3>
            <p className="text-sm text-gray-500">Intelligente Vorschläge basierend auf Ihrem Verhalten.</p>
          </div>
          <Switch 
            checked={features.aiSuggestions}
            onChange={handleChange('aiSuggestions')}
            colorScheme="success"
          />
        </div>
      </div>
    </div>
  );
}
```

### Berechtigungsverwaltung

```jsx
function PermissionsExample() {
  const [permissions, setPermissions] = useState({
    read: true,
    write: false,
    delete: false,
    admin: false
  });
  
  const handleChange = (permission) => (e) => {
    const newValue = e.target.checked;
    
    // Logik für abhängige Berechtigungen
    if (permission === 'admin' && newValue) {
      // Admin hat alle Rechte
      setPermissions({
        read: true,
        write: true,
        delete: true,
        admin: true
      });
    } else if (permission === 'read' && !newValue) {
      // Ohne Leserecht keine anderen Rechte
      setPermissions({
        read: false,
        write: false,
        delete: false,
        admin: false
      });
    } else {
      setPermissions(prev => ({
        ...prev,
        [permission]: newValue,
        // Admin-Recht entfernen, wenn nicht alle Rechte vorhanden sind
        admin: permission === 'admin' ? newValue : (prev.admin && newValue)
      }));
    }
  };
  
  return (
    <div className="max-w-md">
      <h2 className="text-xl font-bold mb-4">Berechtigungsverwaltung</h2>
      <div className="p-4 border rounded-lg space-y-3">
        <Switch 
          label="Lesen" 
          checked={permissions.read}
          onChange={handleChange('read')}
          helperText="Berechtigung zum Anzeigen von Inhalten."
        />
        
        <Switch 
          label="Schreiben" 
          checked={permissions.write}
          onChange={handleChange('write')}
          disabled={!permissions.read}
          helperText="Berechtigung zum Erstellen und Bearbeiten von Inhalten."
        />
        
        <Switch 
          label="Löschen" 
          checked={permissions.delete}
          onChange={handleChange('delete')}
          disabled={!permissions.read}
          helperText="Berechtigung zum Entfernen von Inhalten."
        />
        
        <Switch 
          label="Administrator" 
          checked={permissions.admin}
          onChange={handleChange('admin')}
          disabled={!(permissions.read && permissions.write && permissions.delete)}
          helperText="Voller Zugriff auf alle Funktionen."
          colorScheme="danger"
        />
      </div>
    </div>
  );
}
```