# ProgressBar

Die ProgressBar-Komponente zeigt den Fortschritt eines Vorgangs an und gibt dem Benutzer visuelles Feedback über den Status.

## Import

```jsx
import { ProgressBar } from '@smolitux/core';
```

## Verwendung

### Einfacher ProgressBar

```jsx
<ProgressBar value={75} />
```

### ProgressBar mit Label

```jsx
<ProgressBar value={75} showLabel />
```

### Verschiedene Größen

```jsx
<ProgressBar value={75} size="xs" className="mb-2" />
<ProgressBar value={75} size="sm" className="mb-2" />
<ProgressBar value={75} size="md" className="mb-2" />
<ProgressBar value={75} size="lg" />
```

### Verschiedene Farben

```jsx
<ProgressBar value={75} color="primary" className="mb-2" />
<ProgressBar value={75} color="secondary" className="mb-2" />
<ProgressBar value={75} color="success" className="mb-2" />
<ProgressBar value={75} color="warning" className="mb-2" />
<ProgressBar value={75} color="error" className="mb-2" />
<ProgressBar value={75} color="info" />
```

### Verschiedene Varianten

```jsx
<ProgressBar value={75} variant="default" className="mb-2" />
<ProgressBar value={75} variant="striped" className="mb-2" />
<ProgressBar value={75} variant="animated" />
```

### Abgerundeter ProgressBar

```jsx
<ProgressBar value={75} rounded />
```

### Gradient-Stil

```jsx
<ProgressBar value={75} appearance="gradient" />
```

### Invertierter ProgressBar

```jsx
<ProgressBar value={75} inverted />
```

### Unbestimmter Fortschritt

```jsx
<ProgressBar indeterminate />
```

### Benutzerdefiniertes Label

```jsx
<ProgressBar 
  value={75} 
  label={<span className="font-bold">75% abgeschlossen</span>} 
/>
```

### Verschiedene Label-Formate

```jsx
<ProgressBar value={75} showLabel labelFormat="percentage" className="mb-2" />
<ProgressBar value={75} showLabel labelFormat="value" className="mb-2" />
<ProgressBar value={75} showLabel labelFormat="valueAndMax" />
```

### Benutzerdefinierter Min/Max-Bereich

```jsx
<ProgressBar value={7} min={0} max={10} showLabel />
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `value` | `number` | - | Aktueller Wert (0-100) |
| `max` | `number` | `100` | Maximaler Wert |
| `min` | `number` | `0` | Minimaler Wert |
| `showLabel` | `boolean` | `false` | Label anzeigen |
| `labelFormat` | `'percentage' \| 'value' \| 'valueAndMax'` | `'percentage'` | Label-Format |
| `label` | `ReactNode` | - | Benutzerdefiniertes Label |
| `variant` | `'default' \| 'striped' \| 'animated'` | `'default'` | Variante des ProgressBars |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Größe des ProgressBars |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | Farbe des ProgressBars |
| `rounded` | `boolean` | `false` | Radius des ProgressBars |
| `appearance` | `'solid' \| 'gradient'` | `'solid'` | ProgressBar-Stil |
| `inverted` | `boolean` | `false` | Invertierter Fortschritt (von rechts nach links) |
| `indeterminate` | `boolean` | `false` | Indeterminate-Status (für unbekannten Fortschritt) |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

## Barrierefreiheit

Die ProgressBar-Komponente ist für Barrierefreiheit optimiert:

- Verwendet die korrekten ARIA-Attribute (`role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`)
- Bietet visuelles Feedback durch verschiedene Farben und Größen
- Unterstützt Screenreader durch semantische Struktur

## Beispiele

### Fortschrittsanzeige für Datei-Upload

```jsx
function FileUploadProgress() {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const startUpload = () => {
    setIsUploading(true);
    setProgress(0);
    
    // Simuliere einen Upload-Fortschritt
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };
  
  return (
    <div className="max-w-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Datei auswählen
        </label>
        <input
          type="file"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
        />
      </div>
      
      {isUploading || progress === 100 ? (
        <div className="mb-4">
          <ProgressBar 
            value={progress} 
            variant={isUploading ? "animated" : "default"}
            color={progress === 100 ? "success" : "primary"}
            showLabel
          />
          <p className="text-sm text-gray-500 mt-1">
            {progress === 100 ? 'Upload abgeschlossen' : 'Wird hochgeladen...'}
          </p>
        </div>
      ) : null}
      
      <button
        className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50"
        onClick={startUpload}
        disabled={isUploading}
      >
        {isUploading ? 'Wird hochgeladen...' : 'Upload starten'}
      </button>
    </div>
  );
}
```

### Mehrstufiger Fortschritt

```jsx
function MultiStepProgress() {
  const steps = [
    { id: 1, name: 'Persönliche Daten', status: 'complete' },
    { id: 2, name: 'Adresse', status: 'current' },
    { id: 3, name: 'Zahlungsmethode', status: 'upcoming' },
    { id: 4, name: 'Bestätigung', status: 'upcoming' }
  ];
  
  const currentStep = steps.findIndex(step => step.status === 'current') + 1;
  const progress = (currentStep - 1) / (steps.length - 1) * 100;
  
  return (
    <div className="max-w-2xl mx-auto">
      <ProgressBar 
        value={progress} 
        appearance="gradient" 
        rounded 
        className="mb-6"
      />
      
      <div className="flex justify-between">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className={`flex flex-col items-center ${
              step.status === 'upcoming' ? 'text-gray-400' : 
              step.status === 'current' ? 'text-primary-600 font-medium' : 
              'text-success-600'
            }`}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center mb-2
              ${step.status === 'upcoming' ? 'border border-gray-300' : 
                step.status === 'current' ? 'bg-primary-100 border-2 border-primary-500' : 
                'bg-success-100 border-2 border-success-500'}
            `}>
              {step.status === 'complete' ? (
                <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.id
              )}
            </div>
            <span className="text-sm">{step.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Skill-Level-Anzeige

```jsx
function SkillLevelProgress() {
  const skills = [
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 85 },
    { name: 'JavaScript', level: 75 },
    { name: 'React', level: 80 },
    { name: 'Node.js', level: 65 }
  ];
  
  return (
    <div className="max-w-md">
      <h2 className="text-xl font-bold mb-4">Fähigkeiten</h2>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm text-gray-500">{skill.level}%</span>
            </div>
            <ProgressBar 
              value={skill.level} 
              size="sm" 
              color={
                skill.level >= 80 ? 'success' : 
                skill.level >= 60 ? 'primary' : 
                'warning'
              }
              rounded
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Countdown-Timer mit Fortschrittsanzeige

```jsx
function CountdownProgress() {
  const [timeLeft, setTimeLeft] = useState(60); // 60 Sekunden
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);
  
  const startTimer = () => {
    setTimeLeft(60);
    setIsActive(true);
  };
  
  const resetTimer = () => {
    setTimeLeft(60);
    setIsActive(false);
  };
  
  const progress = (timeLeft / 60) * 100;
  
  return (
    <div className="max-w-md">
      <div className="text-center mb-4">
        <span className="text-3xl font-bold">{timeLeft}</span>
        <span className="text-gray-500 ml-1">Sekunden</span>
      </div>
      
      <ProgressBar 
        value={progress} 
        color={
          progress > 66 ? 'success' : 
          progress > 33 ? 'warning' : 
          'error'
        }
        variant={isActive ? 'animated' : 'default'}
        rounded
        className="mb-4"
      />
      
      <div className="flex space-x-2">
        {!isActive ? (
          <button
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 flex-1"
            onClick={startTimer}
          >
            Start
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 flex-1"
            onClick={resetTimer}
          >
            Zurücksetzen
          </button>
        )}
      </div>
    </div>
  );
}
```