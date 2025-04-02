# Implementierungsleitfaden für Sprachsteuerung in Smolitux-UI

Dieser Leitfaden bietet detaillierte Anweisungen zur Implementierung der Sprachsteuerungsfunktionalität in der Smolitux-UI-Bibliothek. Er richtet sich an Entwickler, die die Sprachsteuerung in ihre Komponenten integrieren möchten.

## Inhaltsverzeichnis

1. [Voraussetzungen](#voraussetzungen)
2. [Projektstruktur](#projektstruktur)
3. [Schritt-für-Schritt-Implementierung](#schritt-für-schritt-implementierung)
4. [Komponenten-Integration](#komponenten-integration)
5. [TensorFlow.js-Integration](#tensorflowjs-integration)
6. [Testen und Debugging](#testen-und-debugging)
7. [Leistungsoptimierung](#leistungsoptimierung)
8. [Barrierefreiheit](#barrierefreiheit)
9. [Mehrsprachige Unterstützung](#mehrsprachige-unterstützung)
10. [Häufig gestellte Fragen](#häufig-gestellte-fragen)

## Voraussetzungen

Bevor Sie mit der Implementierung beginnen, stellen Sie sicher, dass Sie folgende Voraussetzungen erfüllen:

- Node.js 14+ und npm/yarn
- React 16.8+ (für Hooks-Unterstützung)
- TypeScript 4.0+ (empfohlen)
- Grundlegende Kenntnisse der Web Speech API oder TensorFlow.js

### Abhängigkeiten

Fügen Sie die folgenden Abhängigkeiten zu Ihrem Projekt hinzu:

```bash
# Für Web Speech API-basierte Implementierung
npm install --save @smolitux/voice-control

# Für TensorFlow.js-basierte Implementierung
npm install --save @smolitux/voice-control @tensorflow/tfjs @tensorflow-models/speech-commands
```

## Projektstruktur

Die empfohlene Projektstruktur für die Sprachsteuerungsimplementierung ist wie folgt:

```
src/
├── voice-control/
│   ├── engines/
│   │   ├── RecognitionEngine.ts
│   │   ├── WebSpeechRecognitionEngine.ts
│   │   ├── TensorFlowRecognitionEngine.ts
│   │   └── ExternalServiceEngine.ts
│   ├── CommandProcessor.ts
│   ├── FeedbackManager.ts
│   ├── VoiceControlManager.ts
│   ├── VoiceControlProvider.tsx
│   ├── withVoiceControl.tsx
│   └── index.ts
├── components/
│   ├── voice/
│   │   ├── VoiceButton.tsx
│   │   ├── VoiceInput.tsx
│   │   ├── VoiceSelect.tsx
│   │   └── ... (weitere sprachgesteuerte Komponenten)
│   └── ... (andere Komponenten)
└── ... (andere Projektdateien)
```

## Schritt-für-Schritt-Implementierung

### 1. Erstellen der Basisschnittstellen

Erstellen Sie zunächst die grundlegenden Schnittstellen für die Spracherkennungs-Engines:

```typescript
// src/voice-control/engines/RecognitionEngine.ts
export interface RecognitionEngine {
  onResult: (text: string) => void;
  onStateChange: (isListening: boolean) => void;
  start: () => void;
  stop: () => void;
  cleanup: () => void;
}
```

### 2. Implementieren der Web Speech API Engine

```typescript
// src/voice-control/engines/WebSpeechRecognitionEngine.ts
import { RecognitionEngine } from './RecognitionEngine';

export class WebSpeechRecognitionEngine implements RecognitionEngine {
  private recognition: SpeechRecognition | null = null;
  private listening = false;

  public onResult: (text: string) => void = () => {};
  public onStateChange: (isListening: boolean) => void = () => {};

  constructor(language = 'de-DE') {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.lang = language;
      this.recognition.continuous = true;
      this.recognition.interimResults = false;

      this.setupEventListeners();
    } else {
      console.error('Speech recognition is not supported in this browser.');
    }
  }

  private setupEventListeners() {
    if (!this.recognition) return;

    this.recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;
      this.onResult(text);
    };

    this.recognition.onstart = () => {
      this.listening = true;
      this.onStateChange(true);
    };

    this.recognition.onend = () => {
      this.listening = false;
      this.onStateChange(false);
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      this.listening = false;
      this.onStateChange(false);
    };
  }

  public start() {
    if (this.recognition && !this.listening) {
      this.recognition.start();
    }
  }

  public stop() {
    if (this.recognition && this.listening) {
      this.recognition.stop();
    }
  }

  public cleanup() {
    this.stop();
    if (this.recognition) {
      this.recognition.onresult = null;
      this.recognition.onstart = null;
      this.recognition.onend = null;
      this.recognition.onerror = null;
    }
  }
}
```

### 3. Implementieren des Command Processors

```typescript
// src/voice-control/CommandProcessor.ts
export class CommandProcessor {
  processCommand(
    text: string,
    registeredComponents: Map<string, string[]>
  ): { command: string; targetId: string } | { command: null; targetId: null } {
    const normalizedText = text.toLowerCase().trim();
    
    for (const [componentId, commands] of registeredComponents.entries()) {
      for (const command of commands) {
        if (normalizedText.includes(command.toLowerCase())) {
          return { command, targetId: componentId };
        }
      }
    }
    
    return { command: null, targetId: null };
  }
}
```

### 4. Implementieren des Feedback Managers

```typescript
// src/voice-control/FeedbackManager.ts
export class FeedbackManager {
  private audioContext: AudioContext | null = null;
  
  constructor() {
    // Lazy-Initialisierung des AudioContext, um Browserrichtlinien zu erfüllen
    if (typeof window !== 'undefined') {
      document.addEventListener('click', () => {
        if (!this.audioContext) {
          this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
      }, { once: true });
    }
  }
  
  provideFeedback(type: 'start' | 'stop' | 'command', command?: string) {
    // Visuelles Feedback
    this.provideVisualFeedback(type, command);
    
    // Akustisches Feedback
    this.provideAudioFeedback(type);
  }
  
  private provideVisualFeedback(type: 'start' | 'stop' | 'command', command?: string) {
    // Implementierung des visuellen Feedbacks
    // z.B. Anzeigen eines Indikators oder einer Benachrichtigung
    const feedbackElement = document.getElementById('voice-feedback');
    if (feedbackElement) {
      switch (type) {
        case 'start':
          feedbackElement.textContent = 'Spracherkennung aktiv';
          feedbackElement.classList.add('listening');
          break;
        case 'stop':
          feedbackElement.textContent = 'Spracherkennung gestoppt';
          feedbackElement.classList.remove('listening');
          break;
        case 'command':
          feedbackElement.textContent = `Befehl erkannt: ${command}`;
          break;
      }
    }
  }
  
  private provideAudioFeedback(type: 'start' | 'stop' | 'command') {
    if (!this.audioContext) return;
    
    // Einfaches akustisches Feedback
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // Verschiedene Töne für verschiedene Feedback-Typen
    switch (type) {
      case 'start':
        oscillator.frequency.value = 880; // A5
        break;
      case 'stop':
        oscillator.frequency.value = 440; // A4
        break;
      case 'command':
        oscillator.frequency.value = 660; // E5
        break;
    }
    
    gainNode.gain.value = 0.1;
    oscillator.start();
    
    // Kurzer Ton
    setTimeout(() => {
      oscillator.stop();
    }, 100);
  }
}
```

### 5. Implementieren des VoiceControlManagers

```typescript
// src/voice-control/VoiceControlManager.ts
import { RecognitionEngine } from './engines/RecognitionEngine';
import { WebSpeechRecognitionEngine } from './engines/WebSpeechRecognitionEngine';
import { TensorFlowRecognitionEngine } from './engines/TensorFlowRecognitionEngine';
import { CommandProcessor } from './CommandProcessor';
import { FeedbackManager } from './FeedbackManager';

export type EngineType = 'webSpeech' | 'tensorFlow' | 'external';

export class VoiceControlManager {
  private recognitionEngine: RecognitionEngine;
  private commandProcessor: CommandProcessor;
  private feedbackManager: FeedbackManager;
  private registeredComponents: Map<string, string[]> = new Map();

  public onRecognitionResult: (text: string) => void = () => {};
  public onCommandRecognized: (command: string, target: string) => void = () => {};
  public onListeningStateChanged: (isListening: boolean) => void = () => {};

  constructor(engineType: EngineType = 'webSpeech', language = 'de-DE') {
    // Initialisiere die entsprechende Engine basierend auf dem Typ
    switch (engineType) {
      case 'tensorFlow':
        this.recognitionEngine = new TensorFlowRecognitionEngine();
        break;
      case 'external':
        // Implementierung für externe Dienste
        this.recognitionEngine = new WebSpeechRecognitionEngine(language); // Fallback
        break;
      case 'webSpeech':
      default:
        this.recognitionEngine = new WebSpeechRecognitionEngine(language);
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

### 6. Implementieren des VoiceControlProviders

```tsx
// src/voice-control/VoiceControlProvider.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { VoiceControlManager, EngineType } from './VoiceControlManager';

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

interface VoiceControlProviderProps {
  children: ReactNode;
  engineType?: EngineType;
  language?: string;
  debug?: boolean;
}

const VoiceControlContext = createContext<VoiceControlContextType | undefined>(undefined);

export const VoiceControlProvider: React.FC<VoiceControlProviderProps> = ({
  children,
  engineType = 'webSpeech',
  language = 'de-DE',
  debug = false,
}) => {
  const [manager] = useState(() => new VoiceControlManager(engineType, language));
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [lastCommand, setLastCommand] = useState('');
  const [targetComponent, setTargetComponent] = useState<string | null>(null);

  useEffect(() => {
    manager.onRecognitionResult = (text) => {
      setRecognizedText(text);
      if (debug) {
        console.log('Recognized text:', text);
      }
    };

    manager.onCommandRecognized = (command, target) => {
      setLastCommand(command);
      setTargetComponent(target);
      if (debug) {
        console.log(`Command recognized: ${command}, Target: ${target}`);
      }
    };

    manager.onListeningStateChanged = (listening) => {
      setIsListening(listening);
      if (debug) {
        console.log('Listening state changed:', listening);
      }
    };

    return () => {
      manager.cleanup();
    };
  }, [manager, debug]);

  const startListening = () => {
    manager.startListening();
  };

  const stopListening = () => {
    manager.stopListening();
  };

  const registerComponent = (id: string, commands: string[]) => {
    manager.registerComponent(id, commands);
    if (debug) {
      console.log(`Registered component ${id} with commands:`, commands);
    }
  };

  const unregisterComponent = (id: string) => {
    manager.unregisterComponent(id);
    if (debug) {
      console.log(`Unregistered component ${id}`);
    }
  };

  // Render Debug-UI wenn debug=true
  const renderDebugUI = () => {
    if (!debug) return null;
    
    return (
      <div className="voice-control-debug" style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        padding: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        borderRadius: '5px',
        zIndex: 9999,
        maxWidth: '300px',
        fontSize: '12px'
      }}>
        <h4>Voice Control Debug</h4>
        <div>Status: {isListening ? 'Listening' : 'Not Listening'}</div>
        <div>Recognized: {recognizedText}</div>
        <div>Last Command: {lastCommand}</div>
        <div>Target: {targetComponent}</div>
        <button onClick={isListening ? stopListening : startListening}>
          {isListening ? 'Stop' : 'Start'} Listening
        </button>
      </div>
    );
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
      {renderDebugUI()}
      <div id="voice-feedback" aria-live="polite" className="voice-feedback" style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        padding: '5px 10px',
        backgroundColor: isListening ? 'rgba(0, 128, 0, 0.7)' : 'rgba(128, 128, 128, 0.7)',
        color: 'white',
        borderRadius: '5px',
        zIndex: 9998,
        transition: 'all 0.3s ease',
        opacity: isListening ? 1 : 0,
        pointerEvents: 'none'
      }}>
        {isListening ? 'Spracherkennung aktiv' : 'Spracherkennung inaktiv'}
      </div>
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

### 7. Implementieren des withVoiceControl HOC

```tsx
// src/voice-control/withVoiceControl.tsx
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

### 8. Erstellen der Exportdatei

```typescript
// src/voice-control/index.ts
export { VoiceControlProvider, useVoiceControl } from './VoiceControlProvider';
export { withVoiceControl } from './withVoiceControl';
export type { VoiceControlProps } from './withVoiceControl';
export { VoiceControlManager } from './VoiceControlManager';
export type { EngineType } from './VoiceControlManager';
```

## Komponenten-Integration

Nachdem Sie die Basisinfrastruktur implementiert haben, können Sie sprachgesteuerte Versionen der Smolitux-UI-Komponenten erstellen.

### Beispiel: Sprachgesteuerter Button

```tsx
// src/components/voice/VoiceButton.tsx
import React from 'react';
import { Button, ButtonProps } from '@smolitux/core';
import { withVoiceControl, VoiceControlProps } from '../../voice-control';

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
    <Button
      onClick={handleClick}
      onVoiceCommand={handleVoiceCommand}
      {...props}
    >
      {children}
    </Button>
  );
};

export const VoiceButton = withVoiceControl(VoiceButtonBase, ['klick', 'click']);
```

### Beispiel: Sprachgesteuertes Eingabefeld

```tsx
// src/components/voice/VoiceInput.tsx
import React, { useState } from 'react';
import { Input, InputProps } from '@smolitux/core';
import { withVoiceControl, VoiceControlProps } from '../../voice-control';

export type VoiceInputProps = InputProps & VoiceControlProps;

const VoiceInputBase: React.FC<VoiceInputProps> = ({ 
  onVoiceCommand, 
  onChange,
  value,
  ...props 
}) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const handleVoiceCommand = (command: string) => {
    if (command.toLowerCase().startsWith('eingabe ')) {
      // Extrahiere den Text nach "eingabe "
      const text = command.substring(8);
      
      // Setze den Wert und simuliere ein Change-Event
      setInputValue(text);
      
      const inputElement = document.getElementById(props.id || '') as HTMLInputElement;
      if (inputElement) {
        inputElement.value = text;
        
        // Erstelle und dispatche ein synthetisches Event
        const event = new Event('input', { bubbles: true });
        inputElement.dispatchEvent(event);
        
        // Fokussiere das Element
        inputElement.focus();
      }
    } else if (command.toLowerCase() === 'löschen') {
      // Lösche den Inhalt
      setInputValue('');
      
      const inputElement = document.getElementById(props.id || '') as HTMLInputElement;
      if (inputElement) {
        inputElement.value = '';
        
        // Erstelle und dispatche ein synthetisches Event
        const event = new Event('input', { bubbles: true });
        inputElement.dispatchEvent(event);
      }
    }

    if (onVoiceCommand) {
      onVoiceCommand(command);
    }
  };

  return (
    <Input
      value={inputValue}
      onChange={handleChange}
      {...props}
    />
  );
};

export const VoiceInput = withVoiceControl(
  VoiceInputBase, 
  ['eingabe', 'löschen']
);
```

### Beispiel: Sprachgesteuertes Auswahlfeld

```tsx
// src/components/voice/VoiceSelect.tsx
import React, { useState } from 'react';
import { Select, SelectProps } from '@smolitux/core';
import { withVoiceControl, VoiceControlProps } from '../../voice-control';

export type VoiceSelectProps = SelectProps & VoiceControlProps;

const VoiceSelectBase: React.FC<VoiceSelectProps> = ({ 
  onVoiceCommand, 
  onChange,
  options = [],
  value,
  ...props 
}) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Prüfe, ob der Befehl "wähle X" oder "option X wählen" ist
    if (lowerCommand.startsWith('wähle ') || lowerCommand.includes(' wählen')) {
      // Extrahiere den Optionsnamen
      let optionName = '';
      if (lowerCommand.startsWith('wähle ')) {
        optionName = command.substring(6).toLowerCase();
      } else {
        optionName = command.split(' wählen')[0].toLowerCase();
      }
      
      // Finde die passende Option
      const matchingOption = options.find(option => {
        const optionLabel = typeof option === 'string' 
          ? option.toLowerCase() 
          : (option.label || '').toLowerCase();
        return optionLabel === optionName;
      });
      
      if (matchingOption) {
        const optionValue = typeof matchingOption === 'string' 
          ? matchingOption 
          : matchingOption.value;
        
        // Setze den Wert und simuliere ein Change-Event
        setSelectedValue(optionValue);
        
        const selectElement = document.getElementById(props.id || '') as HTMLSelectElement;
        if (selectElement) {
          selectElement.value = optionValue;
          
          // Erstelle und dispatche ein synthetisches Event
          const event = new Event('change', { bubbles: true });
          selectElement.dispatchEvent(event);
        }
      }
    }

    if (onVoiceCommand) {
      onVoiceCommand(command);
    }
  };

  return (
    <Select
      value={selectedValue}
      onChange={handleChange}
      options={options}
      {...props}
    />
  );
};

export const VoiceSelect = withVoiceControl(
  VoiceSelectBase, 
  ['wähle', 'option wählen']
);
```

## TensorFlow.js-Integration

Für Anwendungen, die TensorFlow.js verwenden, implementieren Sie die TensorFlow Recognition Engine:

```typescript
// src/voice-control/engines/TensorFlowRecognitionEngine.ts
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
    try {
      // Lade das Modell
      this.model = speech.create('BROWSER_FFT');
      await this.model.ensureModelLoaded();
      
      // Hole verfügbare Befehle
      this.commandVocabulary = this.model.wordLabels();
      
      // Konfiguriere das Modell
      this.model.params().scoreThreshold = 0.75;
      
      console.log('TensorFlow.js speech model loaded successfully');
      console.log('Available commands:', this.commandVocabulary);
    } catch (error) {
      console.error('Failed to load TensorFlow.js speech model:', error);
    }
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

### Anpassung des VoiceControlProviders für TensorFlow.js

```tsx
// In Ihrer App-Komponente
import { VoiceControlProvider } from './voice-control';

function App() {
  return (
    <VoiceControlProvider engineType="tensorFlow">
      <YourApp />
    </VoiceControlProvider>
  );
}
```

## Testen und Debugging

### Unit-Tests für die Sprachsteuerung

```typescript
// src/voice-control/__tests__/CommandProcessor.test.ts
import { CommandProcessor } from '../CommandProcessor';

describe('CommandProcessor', () => {
  let processor: CommandProcessor;
  let registeredComponents: Map<string, string[]>;

  beforeEach(() => {
    processor = new CommandProcessor();
    registeredComponents = new Map();
    registeredComponents.set('button1', ['klick', 'drücken']);
    registeredComponents.set('input1', ['eingabe', 'löschen']);
  });

  test('should identify command and target for exact match', () => {
    const result = processor.processCommand('klick', registeredComponents);
    expect(result).toEqual({ command: 'klick', targetId: 'button1' });
  });

  test('should identify command and target for partial match', () => {
    const result = processor.processCommand('bitte klick den button', registeredComponents);
    expect(result).toEqual({ command: 'klick', targetId: 'button1' });
  });

  test('should return null for unrecognized commands', () => {
    const result = processor.processCommand('unbekannter befehl', registeredComponents);
    expect(result).toEqual({ command: null, targetId: null });
  });
});
```

### Debugging-Tipps

1. **Aktivieren des Debug-Modus**:
   ```tsx
   <VoiceControlProvider debug={true}>
     <YourApp />
   </VoiceControlProvider>
   ```

2. **Überprüfen der Browser-Unterstützung**:
   ```typescript
   function checkSpeechRecognitionSupport() {
     return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
   }
   ```

3. **Testen der Mikrofon-Zugriffsrechte**:
   ```typescript
   async function checkMicrophonePermission() {
     try {
       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
       stream.getTracks().forEach(track => track.stop());
       return true;
     } catch (error) {
       console.error('Microphone permission denied:', error);
       return false;
     }
   }
   ```

## Leistungsoptimierung

### Lazy Loading der Sprachsteuerung

```tsx
// src/App.tsx
import React, { lazy, Suspense, useState } from 'react';

// Lazy-Laden des VoiceControlProviders
const VoiceControlProvider = lazy(() => import('./voice-control/VoiceControlProvider'));

function App() {
  const [voiceControlEnabled, setVoiceControlEnabled] = useState(false);

  return (
    <div className="app">
      <button onClick={() => setVoiceControlEnabled(!voiceControlEnabled)}>
        {voiceControlEnabled ? 'Sprachsteuerung deaktivieren' : 'Sprachsteuerung aktivieren'}
      </button>

      {voiceControlEnabled ? (
        <Suspense fallback={<div>Lade Sprachsteuerung...</div>}>
          <VoiceControlProvider>
            <YourApp />
          </VoiceControlProvider>
        </Suspense>
      ) : (
        <YourApp />
      )}
    </div>
  );
}
```

### Optimierung der TensorFlow.js-Modelle

```typescript
// src/voice-control/engines/TensorFlowRecognitionEngine.ts

// In der initModel-Methode
private async initModel() {
  try {
    // Lade das Modell mit Optimierungen
    await tf.ready();
    
    // Verwende WebGL-Backend für GPU-Beschleunigung, wenn verfügbar
    if (tf.getBackend() !== 'webgl') {
      await tf.setBackend('webgl');
    }
    
    // Lade ein quantisiertes Modell für geringere Größe
    const modelOptions = {
      quantizationBits: 8, // Reduziert die Modellgröße
    };
    
    this.model = speech.create('BROWSER_FFT', undefined, modelOptions);
    await this.model.ensureModelLoaded();
    
    // Rest der Methode...
  } catch (error) {
    console.error('Failed to load TensorFlow.js speech model:', error);
  }
}
```

### Verwendung von WebWorkers

```typescript
// src/voice-control/workers/speechRecognitionWorker.ts
// Dies ist ein separates File, das als WebWorker geladen wird

import * as tf from '@tensorflow/tfjs';
import * as speech from '@tensorflow-models/speech-commands';

let model: speech.SpeechCommandRecognizer | null = null;

// Initialisiere das Modell
async function initModel() {
  model = speech.create('BROWSER_FFT');
  await model.ensureModelLoaded();
  
  // Informiere den Hauptthread, dass das Modell geladen ist
  self.postMessage({ type: 'modelLoaded', commands: model.wordLabels() });
}

// Höre auf Nachrichten vom Hauptthread
self.addEventListener('message', async (event) => {
  const { type, data } = event.data;
  
  switch (type) {
    case 'init':
      await initModel();
      break;
    case 'start':
      if (model) {
        model.listen(
          result => {
            const scores = Array.from(result.scores);
            const maxScore = Math.max(...scores);
            const maxScoreIndex = scores.indexOf(maxScore);
            
            if (maxScore > model!.params().scoreThreshold) {
              const recognizedCommand = model!.wordLabels()[maxScoreIndex];
              self.postMessage({ type: 'result', command: recognizedCommand, score: maxScore });
            }
          },
          {
            includeSpectrogram: false,
            probabilityThreshold: 0.75,
            overlapFactor: 0.5
          }
        );
        self.postMessage({ type: 'listening', status: true });
      }
      break;
    case 'stop':
      if (model) {
        model.stopListening();
        self.postMessage({ type: 'listening', status: false });
      }
      break;
  }
});

// Informiere den Hauptthread, dass der Worker bereit ist
self.postMessage({ type: 'ready' });
```

## Barrierefreiheit

### ARIA-Attribute für Sprachsteuerung

```tsx
// Beispiel für einen sprachgesteuerten Button mit ARIA-Attributen
<VoiceButton
  aria-label="Speichern"
  aria-describedby="voice-command-hint"
  voiceCommands={['speichern', 'sichern']}
>
  Speichern
</VoiceButton>

// Hinweis für Sprachbefehle
<div id="voice-command-hint" className="sr-only">
  Sie können diesen Button mit den Sprachbefehlen "speichern" oder "sichern" aktivieren.
</div>
```

### Tastaturunterstützung

```tsx
// src/voice-control/VoiceControlProvider.tsx

// Fügen Sie Tastaturunterstützung zum VoiceControlProvider hinzu
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    // Alt+V zum Starten/Stoppen der Spracherkennung
    if (event.altKey && event.key === 'v') {
      if (isListening) {
        stopListening();
      } else {
        startListening();
      }
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [isListening, startListening, stopListening]);
```

## Mehrsprachige Unterstützung

### Sprachkonfiguration

```tsx
// src/App.tsx
import { VoiceControlProvider } from './voice-control';

function App() {
  // Sprache basierend auf Benutzereinstellungen oder Browser-Sprache
  const userLanguage = navigator.language || 'de-DE';
  
  return (
    <VoiceControlProvider language={userLanguage}>
      <YourApp />
    </VoiceControlProvider>
  );
}
```

### Lokalisierte Befehle

```tsx
// src/components/voice/localizedCommands.ts
export const localizedCommands = {
  'de-DE': {
    button: ['klick', 'drücken'],
    input: ['eingabe', 'löschen'],
    select: ['wähle', 'option wählen'],
    // ...
  },
  'en-US': {
    button: ['click', 'press'],
    input: ['input', 'clear'],
    select: ['select', 'choose option'],
    // ...
  },
  // Weitere Sprachen...
};

// Verwendung in Komponenten
import { localizedCommands } from './localizedCommands';
import { useVoiceControl } from '../../voice-control';

function MyComponent() {
  const { language = 'de-DE' } = useVoiceControl();
  const commands = localizedCommands[language]?.button || localizedCommands['de-DE'].button;
  
  return (
    <VoiceButton voiceCommands={commands}>
      Click me
    </VoiceButton>
  );
}
```

## Häufig gestellte Fragen

### 1. Wie kann ich die Spracherkennung in meiner Anwendung aktivieren?

```tsx
import { VoiceControlProvider } from '@smolitux/voice-control';

function App() {
  return (
    <VoiceControlProvider>
      <YourApp />
    </VoiceControlProvider>
  );
}
```

### 2. Wie kann ich benutzerdefinierte Sprachbefehle für eine Komponente definieren?

```tsx
import { VoiceButton } from '@smolitux/voice-control';

function MyComponent() {
  return (
    <VoiceButton 
      voiceCommands={['speichern', 'formular absenden']}
      onVoiceCommand={(command) => {
        console.log(`Sprachbefehl erkannt: ${command}`);
        // Benutzerdefinierte Logik hier
      }}
    >
      Speichern
    </VoiceButton>
  );
}
```

### 3. Wie kann ich zwischen verschiedenen Spracherkennungs-Backends wechseln?

```tsx
// Für Web Speech API (Standard)
<VoiceControlProvider engineType="webSpeech">
  <YourApp />
</VoiceControlProvider>

// Für TensorFlow.js
<VoiceControlProvider engineType="tensorFlow">
  <YourApp />
</VoiceControlProvider>

// Für externe Dienste
<VoiceControlProvider engineType="external">
  <YourApp />
</VoiceControlProvider>
```

### 4. Wie kann ich die Spracherkennung programmatisch starten und stoppen?

```tsx
import { useVoiceControl } from '@smolitux/voice-control';

function MyComponent() {
  const { startListening, stopListening, isListening } = useVoiceControl();
  
  return (
    <div>
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? 'Spracherkennung stoppen' : 'Spracherkennung starten'}
      </button>
    </div>
  );
}
```

### 5. Wie kann ich die Sprachsteuerung für bestimmte Komponenten deaktivieren?

```tsx
// Deaktivieren der Sprachsteuerung für eine einzelne Komponente
<VoiceButton voiceEnabled={false}>
  Nicht sprachgesteuert
</VoiceButton>
```

### 6. Wie kann ich die Erkennungsgenauigkeit verbessern?

Für TensorFlow.js-basierte Erkennung können Sie die Schwellenwerte anpassen:

```typescript
// In TensorFlowRecognitionEngine.ts
this.model.params().scoreThreshold = 0.85; // Höherer Wert = höhere Genauigkeit, aber weniger Erkennungen
```

Für Web Speech API können Sie die Sprache anpassen:

```tsx
<VoiceControlProvider language="de-DE">
  <YourApp />
</VoiceControlProvider>
```

### 7. Wie kann ich die Leistung der Sprachsteuerung optimieren?

- Verwenden Sie Lazy Loading für die Sprachsteuerung
- Implementieren Sie die Spracherkennung in einem WebWorker
- Verwenden Sie quantisierte TensorFlow.js-Modelle
- Laden Sie nur die benötigten Sprachmodelle

### 8. Wie kann ich die Sprachsteuerung für Barrierefreiheit optimieren?

- Fügen Sie ARIA-Attribute zu allen sprachgesteuerten Komponenten hinzu
- Bieten Sie visuelles und akustisches Feedback für Sprachbefehle
- Stellen Sie alternative Eingabemethoden (Tastatur, Maus) bereit
- Dokumentieren Sie verfügbare Sprachbefehle für Benutzer