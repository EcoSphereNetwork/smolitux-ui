# Sprachsteuerungsarchitektur für Smolitux-UI

## Übersicht

Die Sprachsteuerungsarchitektur für Smolitux-UI ermöglicht eine vollständige Steuerung aller UI-Komponenten durch Sprachbefehle. Diese Dokumentation beschreibt die Architektur, Implementierungsdetails und Integrationsrichtlinien für die Sprachsteuerungsfunktionalität.

## Architekturübersicht

Die Sprachsteuerungsarchitektur besteht aus mehreren Schichten:

```
┌─────────────────────────────────────────────────────────────┐
│                  Smolitux-UI Komponenten                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Button    │  │    Input    │  │  Andere Komponenten │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                VoiceControlProvider (Context)               │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    VoiceControlManager                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Recognition │  │  Command    │  │     Feedback        │  │
│  │   Engine    │  │  Processor  │  │     Manager         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    Speech Recognition API                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Web Speech  │  │ TensorFlow  │  │ Externe Dienste     │  │
│  │     API     │  │     JS      │  │ (Google, Azure)     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Hauptkomponenten

1. **VoiceControlProvider**: Ein React Context Provider, der die Sprachsteuerungsfunktionalität für alle Komponenten bereitstellt.

2. **VoiceControlManager**: Verwaltet die Spracherkennung, Befehlsverarbeitung und Feedback.
   - **Recognition Engine**: Verarbeitet Audioeingaben und konvertiert sie in Text.
   - **Command Processor**: Interpretiert erkannte Texte und ordnet sie Komponentenaktionen zu.
   - **Feedback Manager**: Bietet akustisches und visuelles Feedback für Benutzerinteraktionen.

3. **Speech Recognition API**: Abstraktionsschicht für verschiedene Spracherkennungs-Backends.
   - **Web Speech API**: Browserbasierte Spracherkennung.
   - **TensorFlow.js**: Lokale Spracherkennungsmodelle.
   - **Externe Dienste**: Integration mit Cloud-basierten Spracherkennungsdiensten.

4. **Komponenten-Integration**: Jede Smolitux-UI-Komponente wird mit Sprachsteuerungsfunktionen erweitert.

## Technologieauswahl

Die Sprachsteuerungsarchitektur unterstützt mehrere Technologien für die Spracherkennung:

### 1. Web Speech API

- **Vorteile**: Nativ im Browser, keine zusätzlichen Abhängigkeiten, einfache Integration
- **Nachteile**: Browserunterstützung variiert, benötigt Internetverbindung für einige Implementierungen
- **Verwendung**: Standard-Fallback und für einfache Anwendungsfälle

### 2. TensorFlow.js

- **Vorteile**: Lokale Verarbeitung, funktioniert offline, anpassbare Modelle
- **Nachteile**: Größere Paketgröße, höhere CPU/GPU-Anforderungen
- **Verwendung**: Für Anwendungen, die bereits TensorFlow verwenden oder erweiterte Spracherkennung benötigen

### 3. Externe Dienste

- **Vorteile**: Hohe Genauigkeit, mehrsprachige Unterstützung, kontinuierliche Verbesserungen
- **Nachteile**: Kostenpflichtig, benötigt Internetverbindung, Datenschutzbedenken
- **Verwendung**: Für Produktionsanwendungen mit hohen Anforderungen an Genauigkeit

## Implementierungsdetails

### VoiceControlProvider

```tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { VoiceControlManager } from './VoiceControlManager';

interface VoiceControlContextType {
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  recognizedText: string;
  lastCommand: string;
  targetComponent: string | null;
  registerComponent: (id: string, commands: string[]) => void;
  unregisterComponent: (id: string) => void;
}

const VoiceControlContext = createContext<VoiceControlContextType | undefined>(undefined);

export const VoiceControlProvider: React.FC = ({ children }) => {
  const [manager] = useState(() => new VoiceControlManager());
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [lastCommand, setLastCommand] = useState('');
  const [targetComponent, setTargetComponent] = useState<string | null>(null);

  useEffect(() => {
    manager.onRecognitionResult = (text) => {
      setRecognizedText(text);
    };

    manager.onCommandRecognized = (command, target) => {
      setLastCommand(command);
      setTargetComponent(target);
    };

    manager.onListeningStateChanged = (listening) => {
      setIsListening(listening);
    };

    return () => {
      manager.cleanup();
    };
  }, [manager]);

  const startListening = () => {
    manager.startListening();
  };

  const stopListening = () => {
    manager.stopListening();
  };

  const registerComponent = (id: string, commands: string[]) => {
    manager.registerComponent(id, commands);
  };

  const unregisterComponent = (id: string) => {
    manager.unregisterComponent(id);
  };

  return (
    <VoiceControlContext.Provider
      value={{
        isListening,
        startListening,
        stopListening,
        recognizedText,
        lastCommand,
        targetComponent,
        registerComponent,
        unregisterComponent,
      }}
    >
      {children}
    </VoiceControlContext.Provider>
  );
};

export const useVoiceControl = () => {
  const context = useContext(VoiceControlContext);
  if (context === undefined) {
    throw new Error('useVoiceControl must be used within a VoiceControlProvider');
  }
  return context;
};
```

### VoiceControlManager

```tsx
import { RecognitionEngine } from './engines/RecognitionEngine';
import { WebSpeechRecognitionEngine } from './engines/WebSpeechRecognitionEngine';
import { TensorFlowRecognitionEngine } from './engines/TensorFlowRecognitionEngine';
import { CommandProcessor } from './CommandProcessor';
import { FeedbackManager } from './FeedbackManager';

export class VoiceControlManager {
  private recognitionEngine: RecognitionEngine;
  private commandProcessor: CommandProcessor;
  private feedbackManager: FeedbackManager;
  private registeredComponents: Map<string, string[]> = new Map();

  public onRecognitionResult: (text: string) => void = () => {};
  public onCommandRecognized: (command: string, target: string) => void = () => {};
  public onListeningStateChanged: (isListening: boolean) => void = () => {};

  constructor(engineType: 'webSpeech' | 'tensorFlow' | 'external' = 'webSpeech') {
    // Initialisiere die entsprechende Engine basierend auf dem Typ
    switch (engineType) {
      case 'tensorFlow':
        this.recognitionEngine = new TensorFlowRecognitionEngine();
        break;
      case 'external':
        // Implementierung für externe Dienste
        this.recognitionEngine = new WebSpeechRecognitionEngine(); // Fallback
        break;
      case 'webSpeech':
      default:
        this.recognitionEngine = new WebSpeechRecognitionEngine();
        break;
    }

    this.commandProcessor = new CommandProcessor();
    this.feedbackManager = new FeedbackManager();

    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.recognitionEngine.onResult = (text) => {
      this.onRecognitionResult(text);
      const { command, targetId } = this.commandProcessor.processCommand(
        text,
        this.registeredComponents
      );
      
      if (command && targetId) {
        this.onCommandRecognized(command, targetId);
        this.feedbackManager.provideFeedback('command', command);
      }
    };

    this.recognitionEngine.onStateChange = (isListening) => {
      this.onListeningStateChanged(isListening);
    };
  }

  public startListening() {
    this.recognitionEngine.start();
    this.feedbackManager.provideFeedback('start');
  }

  public stopListening() {
    this.recognitionEngine.stop();
    this.feedbackManager.provideFeedback('stop');
  }

  public registerComponent(id: string, commands: string[]) {
    this.registeredComponents.set(id, commands);
  }

  public unregisterComponent(id: string) {
    this.registeredComponents.delete(id);
  }

  public cleanup() {
    this.recognitionEngine.cleanup();
  }
}
```

### Komponenten-Integration (HOC-Beispiel)

```tsx
import React, { useEffect, useRef, useId } from 'react';
import { useVoiceControl } from './VoiceControlProvider';

export interface VoiceControlProps {
  voiceCommands?: string[];
  voiceEnabled?: boolean;
  onVoiceCommand?: (command: string) => void;
}

export function withVoiceControl<P extends object>(
  Component: React.ComponentType<P>,
  defaultCommands: string[] = []
) {
  return React.forwardRef<unknown, P & VoiceControlProps>((props, ref) => {
    const {
      voiceCommands = defaultCommands,
      voiceEnabled = true,
      onVoiceCommand,
      ...rest
    } = props;

    const id = useId();
    const { registerComponent, unregisterComponent, targetComponent, lastCommand } = useVoiceControl();
    const componentRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (voiceEnabled && voiceCommands.length > 0) {
        registerComponent(id, voiceCommands);
      }

      return () => {
        if (voiceEnabled) {
          unregisterComponent(id);
        }
      };
    }, [id, registerComponent, unregisterComponent, voiceEnabled, voiceCommands]);

    useEffect(() => {
      if (targetComponent === id && lastCommand && onVoiceCommand) {
        onVoiceCommand(lastCommand);
      }
    }, [id, lastCommand, onVoiceCommand, targetComponent]);

    return <Component ref={ref || componentRef} {...(rest as P)} />;
  });
}
```

### Beispiel: Sprachgesteuerte Button-Komponente

```tsx
import React from 'react';
import { Button as BaseButton, ButtonProps } from '@smolitux/core';
import { withVoiceControl, VoiceControlProps } from '../voice-control';

export type VoiceButtonProps = ButtonProps & VoiceControlProps;

const VoiceButtonBase: React.FC<VoiceButtonProps> = ({ 
  onVoiceCommand, 
  onClick,
  children,
  ...props 
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  const handleVoiceCommand = (command: string) => {
    if (command.toLowerCase() === 'klick' || command.toLowerCase() === 'click') {
      // Simuliere einen Klick-Event
      const buttonElement = document.getElementById(props.id || '');
      if (buttonElement) {
        buttonElement.click();
      }
    }

    if (onVoiceCommand) {
      onVoiceCommand(command);
    }
  };

  return (
    <BaseButton
      onClick={handleClick}
      onVoiceCommand={handleVoiceCommand}
      {...props}
    >
      {children}
    </BaseButton>
  );
};

export const VoiceButton = withVoiceControl(VoiceButtonBase, ['klick', 'click']);
```

## TensorFlow.js Integration

Für Anwendungen, die bereits TensorFlow verwenden, bietet die Sprachsteuerungsarchitektur eine nahtlose Integration mit TensorFlow.js-basierten Spracherkennungsmodellen.

### TensorFlow Recognition Engine

```tsx
import * as tf from '@tensorflow/tfjs';
import * as speech from '@tensorflow-models/speech-commands';
import { RecognitionEngine } from './RecognitionEngine';

export class TensorFlowRecognitionEngine implements RecognitionEngine {
  private model: speech.SpeechCommandRecognizer | null = null;
  private listening = false;
  private commandVocabulary: string[] = [];

  public onResult: (text: string) => void = () => {};
  public onStateChange: (isListening: boolean) => void = () => {};

  constructor() {
    this.initModel();
  }

  private async initModel() {
    // Lade das Modell
    this.model = speech.create('BROWSER_FFT');
    await this.model.ensureModelLoaded();
    
    // Hole verfügbare Befehle
    this.commandVocabulary = this.model.wordLabels();
    
    // Konfiguriere das Modell
    this.model.params().scoreThreshold = 0.75;
  }

  public async start() {
    if (!this.model) {
      await this.initModel();
    }
    
    if (this.model && !this.listening) {
      this.listening = true;
      this.onStateChange(true);
      
      this.model.listen(
        result => {
          const scores = Array.from(result.scores);
          const maxScore = Math.max(...scores);
          const maxScoreIndex = scores.indexOf(maxScore);
          
          if (maxScore > this.model!.params().scoreThreshold) {
            const recognizedCommand = this.commandVocabulary[maxScoreIndex];
            this.onResult(recognizedCommand);
          }
        },
        {
          includeSpectrogram: false,
          probabilityThreshold: 0.75,
          overlapFactor: 0.5
        }
      );
    }
  }

  public stop() {
    if (this.model && this.listening) {
      this.model.stopListening();
      this.listening = false;
      this.onStateChange(false);
    }
  }

  public cleanup() {
    this.stop();
    if (this.model) {
      this.model.stopListening();
    }
  }
}
```

## Anpassung und Erweiterung

### Benutzerdefinierte Sprachbefehle

Komponenten können benutzerdefinierte Sprachbefehle registrieren:

```tsx
// Beispiel: Registrierung benutzerdefinierter Befehle für eine Tabelle
<VoiceTable
  voiceCommands={[
    'sortiere nach name',
    'sortiere nach datum',
    'gehe zur seite 2',
    'zeige 50 einträge'
  ]}
  onVoiceCommand={(command) => {
    if (command === 'sortiere nach name') {
      // Implementiere Sortierung nach Name
    } else if (command === 'sortiere nach datum') {
      // Implementiere Sortierung nach Datum
    }
    // ...
  }}
/>
```

### Mehrsprachige Unterstützung

Die Sprachsteuerungsarchitektur unterstützt mehrere Sprachen:

```tsx
<VoiceControlProvider language="de-DE">
  <App />
</VoiceControlProvider>
```

### Barrierefreiheit

Die Sprachsteuerung verbessert die Barrierefreiheit durch:

- ARIA-Attribute für Sprachsteuerungsfunktionen
- Akustisches Feedback für Benutzerinteraktionen
- Visuelle Indikatoren für den Spracherkennungsstatus

## Leistungsoptimierung

### Lazy Loading

Für Anwendungen, die die Paketgröße minimieren müssen, unterstützt die Architektur Lazy Loading:

```tsx
import React, { lazy, Suspense } from 'react';

const VoiceControlProvider = lazy(() => import('./voice-control/VoiceControlProvider'));

function App() {
  return (
    <Suspense fallback={<div>Loading voice control...</div>}>
      <VoiceControlProvider>
        <YourApp />
      </VoiceControlProvider>
    </Suspense>
  );
}
```

### Modelloptimierung

Für TensorFlow.js-basierte Erkennung:

- Verwendung quantisierter Modelle für geringere Größe
- WebWorker für Hintergrundverarbeitung
- Selektives Laden von Sprachmodellen basierend auf der Benutzersprache

## Sicherheit und Datenschutz

### Lokale Verarbeitung

Die Architektur priorisiert lokale Verarbeitung, wenn möglich:

- TensorFlow.js-Modelle werden lokal ausgeführt
- Web Speech API kann in einigen Browsern lokal funktionieren
- Optionale Verwendung externer Dienste mit expliziter Benutzereinwilligung

### Datenschutzkontrollen

- Klare Benutzerhinweise zur Audioaufnahme
- Optionen zum Deaktivieren der Sprachsteuerung
- Keine permanente Speicherung von Audioaufnahmen

## Beispiele und Anwendungsfälle

### Grundlegende Verwendung

```tsx
import { VoiceControlProvider, VoiceButton, VoiceInput } from '@smolitux/voice-control';

function MyApp() {
  return (
    <VoiceControlProvider>
      <h1>Sprachgesteuerte Anwendung</h1>
      
      <VoiceButton>Klick mich</VoiceButton>
      
      <VoiceInput 
        placeholder="Sprich, um Text einzugeben"
        voiceCommands={['eingabe', 'löschen']}
      />
    </VoiceControlProvider>
  );
}
```

### Komplexe Formulare

```tsx
<VoiceForm
  voiceCommands={['formular absenden', 'formular zurücksetzen']}
  onVoiceCommand={(cmd) => {
    if (cmd === 'formular absenden') {
      // Formular absenden
    }
  }}
>
  <VoiceInput name="name" voiceCommands={['name eingeben']} />
  <VoiceSelect 
    name="kategorie"
    options={['Option 1', 'Option 2']}
    voiceCommands={['kategorie auswählen', 'option 1 wählen', 'option 2 wählen']}
  />
  <VoiceButton type="submit">Absenden</VoiceButton>
</VoiceForm>
```

### Diagramme und Datenvisualisierung

```tsx
<VoiceChart
  data={chartData}
  voiceCommands={[
    'zoom in', 
    'zoom out', 
    'zeige details', 
    'vergleiche mit vorjahr'
  ]}
  onVoiceCommand={(cmd) => {
    // Implementiere Diagrammaktionen basierend auf Sprachbefehlen
  }}
/>
```

## Fehlerbehebung und Debugging

### Debugging-Modus

```tsx
<VoiceControlProvider debug={true}>
  <App />
</VoiceControlProvider>
```

Im Debug-Modus werden folgende Informationen angezeigt:
- Erkannter Text
- Verarbeitete Befehle
- Zielkomponenten
- Erkennungsgenauigkeit

### Häufige Probleme und Lösungen

1. **Problem**: Spracherkennung funktioniert nicht in allen Browsern
   **Lösung**: Implementiere Fallback-Mechanismen und Browser-Erkennung

2. **Problem**: Niedrige Erkennungsgenauigkeit
   **Lösung**: Passe Schwellenwerte an oder wechsle zu einem leistungsfähigeren Backend

3. **Problem**: Hohe CPU-Auslastung bei TensorFlow.js
   **Lösung**: Verwende WebWorker und optimierte Modelle

## Roadmap und zukünftige Erweiterungen

### Geplante Funktionen

1. **Natürliche Sprachverarbeitung**: Integration mit NLP-Bibliotheken für kontextbezogenes Verständnis
2. **Benutzerdefinierte Wakewords**: Anpassbare Aktivierungswörter für die Spracherkennung
3. **Sprachsynthese**: Text-to-Speech-Feedback für verbesserte Barrierefreiheit
4. **Offline-Modelle**: Erweiterte Unterstützung für vollständig offline Spracherkennung
5. **Gestenerkennung**: Kombination von Sprach- und Gestensteuerung

## Schlussfolgerung

Die Sprachsteuerungsarchitektur für Smolitux-UI bietet eine flexible, leistungsstarke und barrierefreie Methode zur Interaktion mit UI-Komponenten. Durch die Unterstützung mehrerer Backends, einschließlich TensorFlow.js, können Entwickler die optimale Lösung für ihre spezifischen Anforderungen wählen.