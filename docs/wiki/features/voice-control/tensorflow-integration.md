# TensorFlow.js-Integration für Sprachsteuerung

Diese Dokumentation beschreibt die Integration von TensorFlow.js in die Sprachsteuerungsfunktionalität der Smolitux-UI-Bibliothek. Sie enthält detaillierte Anweisungen zur Implementierung, Optimierung und Anpassung von TensorFlow.js-basierten Spracherkennungsmodellen.

## Inhaltsverzeichnis

1. [Übersicht](#übersicht)
2. [Voraussetzungen](#voraussetzungen)
3. [Architektur](#architektur)
4. [Implementierung](#implementierung)
   - [TensorFlow Recognition Engine](#tensorflow-recognition-engine)
   - [Modellverwaltung](#modellverwaltung)
   - [WebWorker-Integration](#webworker-integration)
5. [Modelltraining und -anpassung](#modelltraining-und--anpassung)
6. [Leistungsoptimierung](#leistungsoptimierung)
7. [Offline-Unterstützung](#offline-unterstützung)
8. [Mehrsprachige Unterstützung](#mehrsprachige-unterstützung)
9. [Erweiterte Funktionen](#erweiterte-funktionen)
10. [Fehlerbehebung](#fehlerbehebung)
11. [Beispiele](#beispiele)

## Übersicht

Die Integration von TensorFlow.js in die Sprachsteuerungsfunktionalität ermöglicht eine lokale, offline-fähige Spracherkennung mit anpassbaren Modellen. Im Gegensatz zur Web Speech API, die in einigen Browsern eine Internetverbindung erfordert, kann TensorFlow.js vollständig lokal ausgeführt werden und bietet mehr Kontrolle über die Erkennungsparameter.

### Vorteile der TensorFlow.js-Integration

- **Offline-Funktionalität**: Spracherkennung funktioniert auch ohne Internetverbindung
- **Anpassbare Modelle**: Möglichkeit, eigene Modelle zu trainieren und anzupassen
- **Datenschutz**: Audiodaten werden lokal verarbeitet und nicht an externe Server gesendet
- **Konsistente Erfahrung**: Gleiche Funktionalität in allen modernen Browsern

### Nachteile

- **Größere Paketgröße**: TensorFlow.js und Modelle erhöhen die Anwendungsgröße
- **Höhere Ressourcenanforderungen**: CPU/GPU-Nutzung ist höher als bei nativen APIs
- **Begrenzte Vokabulargröße**: Vortrainierte Modelle unterstützen nur eine begrenzte Anzahl von Befehlen

## Voraussetzungen

Bevor Sie mit der TensorFlow.js-Integration beginnen, stellen Sie sicher, dass Sie folgende Abhängigkeiten installiert haben:

```bash
npm install --save @tensorflow/tfjs @tensorflow-models/speech-commands
```

Für TypeScript-Unterstützung:

```bash
npm install --save-dev @types/tensorflow__tfjs @types/tensorflow-models__speech-commands
```

## Architektur

Die TensorFlow.js-Integration in die Sprachsteuerungsarchitektur folgt diesem Muster:

```
┌─────────────────────────────────────────────────────────────┐
│                  VoiceControlProvider                        │
└───────────────────────────────┬─────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────┐
│                    VoiceControlManager                      │
└───────────────────────────────┬─────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────┐
│                TensorFlowRecognitionEngine                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ ModelLoader │  │ Recognizer  │  │ CommandMapper       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    TensorFlow.js Core                       │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│               Speech Commands Model (WebWorker)             │
└─────────────────────────────────────────────────────────────┘
```

## Implementierung

### TensorFlow Recognition Engine

Die `TensorFlowRecognitionEngine` implementiert die `RecognitionEngine`-Schnittstelle und verwendet TensorFlow.js für die Spracherkennung.

```typescript
// src/voice-control/engines/TensorFlowRecognitionEngine.ts
import * as tf from '@tensorflow/tfjs';
import * as speech from '@tensorflow-models/speech-commands';
import { RecognitionEngine } from './RecognitionEngine';

export interface TensorFlowRecognitionOptions {
  modelType?: 'BROWSER_FFT' | '18W';
  vocabulary?: 'directional4w' | 'directional8w' | 'digits' | 'general' | string[];
  customModelUrl?: string;
  scoreThreshold?: number;
  includeSpectogram?: boolean;
  overlapFactor?: number;
  probabilityThreshold?: number;
  invokeCallbackOnNoiseAndUnknown?: boolean;
  suppressionTimeMillis?: number;
}

export class TensorFlowRecognitionEngine implements RecognitionEngine {
  private model: speech.SpeechCommandRecognizer | null = null;
  private listening = false;
  private commandVocabulary: string[] = [];
  private options: TensorFlowRecognitionOptions;
  private worker: Worker | null = null;
  private useWorker: boolean;

  public onResult: (text: string) => void = () => {};
  public onStateChange: (isListening: boolean) => void = () => {};
  public onError: (error: Error) => void = () => {};

  constructor(options: TensorFlowRecognitionOptions = {}, useWorker = false) {
    this.options = {
      modelType: 'BROWSER_FFT',
      vocabulary: 'general',
      scoreThreshold: 0.75,
      includeSpectogram: false,
      overlapFactor: 0.5,
      probabilityThreshold: 0.75,
      invokeCallbackOnNoiseAndUnknown: false,
      suppressionTimeMillis: 100,
      ...options
    };
    
    this.useWorker = useWorker;
    
    if (useWorker) {
      this.initWorker();
    } else {
      this.initModel();
    }
  }

  private async initModel() {
    try {
      await tf.ready();
      
      // Verwende WebGL-Backend für GPU-Beschleunigung, wenn verfügbar
      if (tf.getBackend() !== 'webgl' && tf.ENV.flagRegistry.HAS_WEBGL) {
        await tf.setBackend('webgl');
      }
      
      // Lade das Modell
      const modelOptions: speech.SpeechCommandsRecognizerOptions = {
        vocabulary: this.options.vocabulary as any,
        customModelUrl: this.options.customModelUrl
      };
      
      this.model = speech.create(
        this.options.modelType as any, 
        undefined, 
        modelOptions
      );
      
      await this.model.ensureModelLoaded();
      
      // Hole verfügbare Befehle
      this.commandVocabulary = this.model.wordLabels();
      
      // Konfiguriere das Modell
      this.model.params().scoreThreshold = this.options.scoreThreshold || 0.75;
      
      console.log('TensorFlow.js speech model loaded successfully');
      console.log('Available commands:', this.commandVocabulary);
    } catch (error) {
      console.error('Failed to load TensorFlow.js speech model:', error);
      this.onError(error as Error);
    }
  }

  private initWorker() {
    try {
      // Erstelle einen WebWorker für die Spracherkennung
      this.worker = new Worker(new URL('../workers/speechRecognitionWorker.ts', import.meta.url));
      
      // Sende Initialisierungsparameter an den Worker
      this.worker.postMessage({
        type: 'init',
        options: this.options
      });
      
      // Höre auf Nachrichten vom Worker
      this.worker.addEventListener('message', (event) => {
        const { type, data } = event.data;
        
        switch (type) {
          case 'modelLoaded':
            this.commandVocabulary = data.commands;
            console.log('TensorFlow.js speech model loaded in worker');
            console.log('Available commands:', this.commandVocabulary);
            break;
          case 'result':
            this.onResult(data.command);
            break;
          case 'listening':
            this.listening = data.status;
            this.onStateChange(data.status);
            break;
          case 'error':
            console.error('Speech recognition worker error:', data.error);
            this.onError(new Error(data.error));
            break;
        }
      });
      
      // Behandle Worker-Fehler
      this.worker.addEventListener('error', (error) => {
        console.error('Speech recognition worker error:', error);
        this.onError(new Error('Worker error: ' + error.message));
      });
    } catch (error) {
      console.error('Failed to initialize speech recognition worker:', error);
      this.onError(error as Error);
      
      // Fallback auf direktes Modell
      this.useWorker = false;
      this.initModel();
    }
  }

  public async start() {
    if (this.useWorker) {
      if (this.worker && !this.listening) {
        this.worker.postMessage({ type: 'start' });
      }
    } else {
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
            
            if (maxScore > (this.options.scoreThreshold || 0.75)) {
              const recognizedCommand = this.commandVocabulary[maxScoreIndex];
              this.onResult(recognizedCommand);
            }
          },
          {
            includeSpectrogram: this.options.includeSpectogram,
            probabilityThreshold: this.options.probabilityThreshold,
            invokeCallbackOnNoiseAndUnknown: this.options.invokeCallbackOnNoiseAndUnknown,
            overlapFactor: this.options.overlapFactor,
            suppressionTimeMillis: this.options.suppressionTimeMillis
          }
        );
      }
    }
  }

  public stop() {
    if (this.useWorker) {
      if (this.worker && this.listening) {
        this.worker.postMessage({ type: 'stop' });
      }
    } else {
      if (this.model && this.listening) {
        this.model.stopListening();
        this.listening = false;
        this.onStateChange(false);
      }
    }
  }

  public cleanup() {
    this.stop();
    
    if (this.useWorker) {
      if (this.worker) {
        this.worker.postMessage({ type: 'cleanup' });
        this.worker.terminate();
        this.worker = null;
      }
    } else {
      if (this.model) {
        this.model.stopListening();
        this.model = null;
      }
    }
  }

  public getAvailableCommands(): string[] {
    return [...this.commandVocabulary];
  }
}
```

### WebWorker-Integration

Für eine bessere Leistung können Sie die Spracherkennung in einem WebWorker ausführen:

```typescript
// src/voice-control/workers/speechRecognitionWorker.ts
import * as tf from '@tensorflow/tfjs';
import * as speech from '@tensorflow-models/speech-commands';

let model: speech.SpeechCommandRecognizer | null = null;
let listening = false;
let commandVocabulary: string[] = [];
let options = {
  modelType: 'BROWSER_FFT',
  vocabulary: 'general',
  scoreThreshold: 0.75,
  includeSpectogram: false,
  overlapFactor: 0.5,
  probabilityThreshold: 0.75,
  invokeCallbackOnNoiseAndUnknown: false,
  suppressionTimeMillis: 100
};

async function initModel() {
  try {
    await tf.ready();
    
    // Verwende WebGL-Backend für GPU-Beschleunigung, wenn verfügbar
    if (tf.getBackend() !== 'webgl' && tf.ENV.flagRegistry.HAS_WEBGL) {
      await tf.setBackend('webgl');
    }
    
    // Lade das Modell
    const modelOptions: speech.SpeechCommandsRecognizerOptions = {
      vocabulary: options.vocabulary as any,
      customModelUrl: options.customModelUrl
    };
    
    model = speech.create(
      options.modelType as any, 
      undefined, 
      modelOptions
    );
    
    await model.ensureModelLoaded();
    
    // Hole verfügbare Befehle
    commandVocabulary = model.wordLabels();
    
    // Konfiguriere das Modell
    model.params().scoreThreshold = options.scoreThreshold || 0.75;
    
    // Informiere den Hauptthread, dass das Modell geladen ist
    self.postMessage({ 
      type: 'modelLoaded', 
      data: { commands: commandVocabulary } 
    });
  } catch (error) {
    self.postMessage({ 
      type: 'error', 
      data: { error: error.message } 
    });
  }
}

function startListening() {
  if (!model || listening) return;
  
  listening = true;
  self.postMessage({ type: 'listening', data: { status: true } });
  
  model.listen(
    result => {
      const scores = Array.from(result.scores);
      const maxScore = Math.max(...scores);
      const maxScoreIndex = scores.indexOf(maxScore);
      
      if (maxScore > (options.scoreThreshold || 0.75)) {
        const recognizedCommand = commandVocabulary[maxScoreIndex];
        self.postMessage({ 
          type: 'result', 
          data: { 
            command: recognizedCommand,
            score: maxScore,
            allScores: scores
          } 
        });
      }
    },
    {
      includeSpectrogram: options.includeSpectogram,
      probabilityThreshold: options.probabilityThreshold,
      invokeCallbackOnNoiseAndUnknown: options.invokeCallbackOnNoiseAndUnknown,
      overlapFactor: options.overlapFactor,
      suppressionTimeMillis: options.suppressionTimeMillis
    }
  );
}

function stopListening() {
  if (!model || !listening) return;
  
  model.stopListening();
  listening = false;
  self.postMessage({ type: 'listening', data: { status: false } });
}

function cleanup() {
  stopListening();
  model = null;
  commandVocabulary = [];
}

// Höre auf Nachrichten vom Hauptthread
self.addEventListener('message', async (event) => {
  const { type, options: eventOptions } = event.data;
  
  switch (type) {
    case 'init':
      if (eventOptions) {
        options = { ...options, ...eventOptions };
      }
      await initModel();
      break;
    case 'start':
      startListening();
      break;
    case 'stop':
      stopListening();
      break;
    case 'cleanup':
      cleanup();
      break;
  }
});

// Informiere den Hauptthread, dass der Worker bereit ist
self.postMessage({ type: 'ready' });
```

### Modellverwaltung

Für eine effiziente Verwaltung verschiedener Modelle können Sie eine `ModelManager`-Klasse implementieren:

```typescript
// src/voice-control/models/ModelManager.ts
import * as tf from '@tensorflow/tfjs';

export interface ModelInfo {
  name: string;
  url: string;
  size: number;
  vocabulary: string[];
  language: string;
  description: string;
}

export class ModelManager {
  private models: Map<string, ModelInfo> = new Map();
  private loadedModels: Map<string, tf.LayersModel> = new Map();
  
  constructor() {
    // Registriere Standard-Modelle
    this.registerModel({
      name: 'general-de',
      url: 'https://storage.googleapis.com/smolitux-models/speech/general-de/model.json',
      size: 2500000, // ca. 2.5 MB
      vocabulary: ['ja', 'nein', 'start', 'stop', 'weiter', 'zurück', 'öffnen', 'schließen'],
      language: 'de-DE',
      description: 'Deutsches Allgemein-Modell mit grundlegenden Befehlen'
    });
    
    this.registerModel({
      name: 'general-en',
      url: 'https://storage.googleapis.com/smolitux-models/speech/general-en/model.json',
      size: 2500000, // ca. 2.5 MB
      vocabulary: ['yes', 'no', 'start', 'stop', 'next', 'back', 'open', 'close'],
      language: 'en-US',
      description: 'English general model with basic commands'
    });
  }
  
  public registerModel(modelInfo: ModelInfo) {
    this.models.set(modelInfo.name, modelInfo);
  }
  
  public getModelInfo(name: string): ModelInfo | undefined {
    return this.models.get(name);
  }
  
  public async loadModel(name: string): Promise<tf.LayersModel | null> {
    // Prüfe, ob das Modell bereits geladen ist
    if (this.loadedModels.has(name)) {
      return this.loadedModels.get(name)!;
    }
    
    // Prüfe, ob das Modell registriert ist
    const modelInfo = this.models.get(name);
    if (!modelInfo) {
      console.error(`Model "${name}" is not registered`);
      return null;
    }
    
    try {
      // Lade das Modell
      const model = await tf.loadLayersModel(modelInfo.url);
      this.loadedModels.set(name, model);
      return model;
    } catch (error) {
      console.error(`Failed to load model "${name}":`, error);
      return null;
    }
  }
  
  public async unloadModel(name: string): Promise<boolean> {
    if (!this.loadedModels.has(name)) {
      return false;
    }
    
    try {
      const model = this.loadedModels.get(name)!;
      model.dispose();
      this.loadedModels.delete(name);
      return true;
    } catch (error) {
      console.error(`Failed to unload model "${name}":`, error);
      return false;
    }
  }
  
  public getAvailableModels(): ModelInfo[] {
    return Array.from(this.models.values());
  }
  
  public getLoadedModels(): string[] {
    return Array.from(this.loadedModels.keys());
  }
  
  public getModelsByLanguage(language: string): ModelInfo[] {
    return Array.from(this.models.values()).filter(model => model.language === language);
  }
}
```

## Modelltraining und -anpassung

Für spezifische Anwendungsfälle können Sie eigene Modelle trainieren und in die Sprachsteuerung integrieren.

### Transfer Learning mit TensorFlow.js

```typescript
// src/voice-control/models/ModelTrainer.ts
import * as tf from '@tensorflow/tfjs';
import * as speech from '@tensorflow-models/speech-commands';

export interface TrainingOptions {
  epochs?: number;
  batchSize?: number;
  learningRate?: number;
  validationSplit?: number;
  callbacks?: tf.CallbackArgs;
}

export class ModelTrainer {
  private recognizer: speech.SpeechCommandRecognizer;
  private customWords: string[] = [];
  
  constructor() {
    this.recognizer = speech.create('BROWSER_FFT');
  }
  
  public async init() {
    await this.recognizer.ensureModelLoaded();
  }
  
  public async collectExample(word: string, durationSec = 2): Promise<void> {
    if (!this.customWords.includes(word)) {
      this.customWords.push(word);
    }
    
    return new Promise<void>((resolve) => {
      this.recognizer.collectExample(word, {
        durationSec,
        onComplete: () => {
          console.log(`Collected example for word "${word}"`);
          resolve();
        }
      });
    });
  }
  
  public async train(options: TrainingOptions = {}): Promise<tf.History> {
    const {
      epochs = 50,
      batchSize = 32,
      learningRate = 0.01,
      validationSplit = 0.2,
      callbacks = {}
    } = options;
    
    const trainingOptions: speech.TransferLearnConfig = {
      epochs,
      callback: callbacks,
      batchSize,
      learningRate,
      validationSplit
    };
    
    return await this.recognizer.train(trainingOptions);
  }
  
  public async save(format: 'indexeddb' | 'downloads' | 'localstorage' = 'indexeddb', name = 'custom-model'): Promise<tf.io.SaveResult> {
    let saveResult: tf.io.SaveResult;
    
    switch (format) {
      case 'indexeddb':
        saveResult = await this.recognizer.save(`indexeddb://${name}`);
        break;
      case 'downloads':
        saveResult = await this.recognizer.save(`downloads://${name}`);
        break;
      case 'localstorage':
        saveResult = await this.recognizer.save(`localstorage://${name}`);
        break;
      default:
        throw new Error(`Unsupported save format: ${format}`);
    }
    
    // Speichere auch die benutzerdefinierten Wörter
    localStorage.setItem(`${name}-words`, JSON.stringify(this.customWords));
    
    return saveResult;
  }
  
  public async load(format: 'indexeddb' | 'localstorage' = 'indexeddb', name = 'custom-model'): Promise<boolean> {
    try {
      switch (format) {
        case 'indexeddb':
          await this.recognizer.load(`indexeddb://${name}`);
          break;
        case 'localstorage':
          await this.recognizer.load(`localstorage://${name}`);
          break;
        default:
          throw new Error(`Unsupported load format: ${format}`);
      }
      
      // Lade auch die benutzerdefinierten Wörter
      const wordsJson = localStorage.getItem(`${name}-words`);
      if (wordsJson) {
        this.customWords = JSON.parse(wordsJson);
      }
      
      return true;
    } catch (error) {
      console.error(`Failed to load model "${name}":`, error);
      return false;
    }
  }
  
  public getCustomWords(): string[] {
    return [...this.customWords];
  }
  
  public getExampleCounts(): {[word: string]: number} {
    return this.recognizer.countExamples();
  }
  
  public clearExamples(word?: string): void {
    if (word) {
      this.recognizer.clearExamples(word);
      
      // Entferne das Wort aus der Liste, wenn keine Beispiele mehr vorhanden sind
      const counts = this.recognizer.countExamples();
      if (!counts[word] || counts[word] === 0) {
        this.customWords = this.customWords.filter(w => w !== word);
      }
    } else {
      // Lösche alle Beispiele
      for (const word of this.customWords) {
        this.recognizer.clearExamples(word);
      }
      this.customWords = [];
    }
  }
}
```

### Beispiel: Trainieren eines benutzerdefinierten Modells

```tsx
import React, { useState, useEffect } from 'react';
import { ModelTrainer, TrainingOptions } from '../voice-control/models/ModelTrainer';

const ModelTrainingComponent: React.FC = () => {
  const [trainer, setTrainer] = useState<ModelTrainer | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [customWords, setCustomWords] = useState<string[]>([]);
  const [exampleCounts, setExampleCounts] = useState<{[word: string]: number}>({});
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  
  useEffect(() => {
    const initTrainer = async () => {
      const newTrainer = new ModelTrainer();
      await newTrainer.init();
      setTrainer(newTrainer);
    };
    
    initTrainer();
    
    return () => {
      // Cleanup
    };
  }, []);
  
  const handleAddWord = () => {
    if (currentWord && !customWords.includes(currentWord)) {
      setCustomWords([...customWords, currentWord]);
    }
  };
  
  const handleRecordExample = async (word: string) => {
    if (!trainer) return;
    
    setIsRecording(true);
    
    try {
      await trainer.collectExample(word);
      setExampleCounts(trainer.getExampleCounts());
    } catch (error) {
      console.error('Failed to record example:', error);
    } finally {
      setIsRecording(false);
    }
  };
  
  const handleTrain = async () => {
    if (!trainer) return;
    
    setIsTraining(true);
    setTrainingProgress(0);
    
    try {
      const trainingOptions: TrainingOptions = {
        epochs: 50,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            const progress = (epoch + 1) / 50;
            setTrainingProgress(progress);
          }
        }
      };
      
      await trainer.train(trainingOptions);
      
      // Speichere das trainierte Modell
      await trainer.save('indexeddb', 'my-custom-model');
      
      alert('Model trained and saved successfully!');
    } catch (error) {
      console.error('Failed to train model:', error);
      alert('Failed to train model: ' + error.message);
    } finally {
      setIsTraining(false);
    }
  };
  
  return (
    <div className="model-training">
      <h2>Train Custom Speech Model</h2>
      
      <div className="add-word">
        <input
          type="text"
          value={currentWord}
          onChange={(e) => setCurrentWord(e.target.value)}
          placeholder="Enter a new command word"
          disabled={isRecording || isTraining}
        />
        <button onClick={handleAddWord} disabled={!currentWord || isRecording || isTraining}>
          Add Word
        </button>
      </div>
      
      <div className="word-list">
        <h3>Custom Words</h3>
        {customWords.length === 0 ? (
          <p>No custom words added yet.</p>
        ) : (
          <ul>
            {customWords.map((word) => (
              <li key={word}>
                {word} ({exampleCounts[word] || 0} examples)
                <button 
                  onClick={() => handleRecordExample(word)}
                  disabled={isRecording || isTraining}
                >
                  {isRecording && currentWord === word ? 'Recording...' : 'Record Example'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="training">
        <button 
          onClick={handleTrain}
          disabled={customWords.length === 0 || isRecording || isTraining}
        >
          {isTraining ? 'Training...' : 'Train Model'}
        </button>
        
        {isTraining && (
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${trainingProgress * 100}%` }}
            />
            <span>{Math.round(trainingProgress * 100)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelTrainingComponent;
```

## Leistungsoptimierung

### Modellquantisierung

Für kleinere Modellgrößen und schnellere Inferenz können Sie quantisierte Modelle verwenden:

```typescript
// In ModelManager.ts
public async loadQuantizedModel(name: string): Promise<tf.LayersModel | null> {
  const modelInfo = this.models.get(name);
  if (!modelInfo) {
    console.error(`Model "${name}" is not registered`);
    return null;
  }
  
  try {
    // Lade das quantisierte Modell
    const quantizedUrl = modelInfo.url.replace('model.json', 'model-quantized.json');
    const model = await tf.loadLayersModel(quantizedUrl);
    this.loadedModels.set(name, model);
    return model;
  } catch (error) {
    console.error(`Failed to load quantized model "${name}":`, error);
    
    // Fallback auf nicht-quantisiertes Modell
    return this.loadModel(name);
  }
}
```

### WebGL-Beschleunigung

Für bessere Leistung auf Geräten mit GPU:

```typescript
// In TensorFlowRecognitionEngine.ts
private async optimizeForDevice() {
  await tf.ready();
  
  // Prüfe, ob WebGL verfügbar ist
  if (tf.ENV.flagRegistry.HAS_WEBGL) {
    await tf.setBackend('webgl');
    
    // Konfiguriere WebGL für bessere Leistung
    const gl = await tf.backend().getGPGPUContext().gl;
    if (gl) {
      // Deaktiviere Tiefentest und Stencil für bessere Leistung
      gl.disable(gl.DEPTH_TEST);
      gl.disable(gl.STENCIL_TEST);
      gl.disable(gl.BLEND);
      gl.disable(gl.DITHER);
      gl.disable(gl.POLYGON_OFFSET_FILL);
      gl.disable(gl.SAMPLE_COVERAGE);
      gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
    }
  } else if (tf.ENV.flagRegistry.HAS_WASM) {
    // Fallback auf WASM, wenn WebGL nicht verfügbar ist
    await tf.setBackend('wasm');
  } else {
    // Fallback auf CPU
    await tf.setBackend('cpu');
  }
  
  console.log('TensorFlow.js backend:', tf.getBackend());
}
```

### Lazy Loading

Für eine bessere Startzeit können Sie TensorFlow.js und die Modelle lazy laden:

```tsx
// src/App.tsx
import React, { lazy, Suspense, useState } from 'react';

// Lazy-Laden der TensorFlow-basierten Sprachsteuerung
const TensorFlowVoiceControl = lazy(() => import('./voice-control/TensorFlowVoiceControl'));

function App() {
  const [useTensorFlow, setUseTensorFlow] = useState(false);

  return (
    <div className="app">
      <button onClick={() => setUseTensorFlow(!useTensorFlow)}>
        {useTensorFlow ? 'Deaktivieren' : 'Aktivieren'} TensorFlow Sprachsteuerung
      </button>

      {useTensorFlow && (
        <Suspense fallback={<div>Lade TensorFlow.js...</div>}>
          <TensorFlowVoiceControl>
            <YourApp />
          </TensorFlowVoiceControl>
        </Suspense>
      )}
    </div>
  );
}
```

## Offline-Unterstützung

Für vollständige Offline-Unterstützung können Sie die Modelle im Service Worker cachen:

```typescript
// src/service-worker.js
const CACHE_NAME = 'smolitux-voice-models-v1';
const MODEL_URLS = [
  '/models/speech/general-de/model.json',
  '/models/speech/general-de/weights.bin',
  '/models/speech/general-en/model.json',
  '/models/speech/general-en/weights.bin'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(MODEL_URLS);
      })
  );
});

self.addEventListener('fetch', (event) => {
  // Prüfe, ob die Anfrage ein Modell betrifft
  if (MODEL_URLS.some(url => event.request.url.includes(url))) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
    );
  }
});
```

## Mehrsprachige Unterstützung

Für mehrsprachige Unterstützung können Sie verschiedene Modelle für verschiedene Sprachen laden:

```typescript
// src/voice-control/MultilingualVoiceControl.tsx
import React, { useState, useEffect } from 'react';
import { VoiceControlProvider } from './VoiceControlProvider';
import { ModelManager } from './models/ModelManager';

interface MultilingualVoiceControlProps {
  children: React.ReactNode;
  language?: string;
}

const MultilingualVoiceControl: React.FC<MultilingualVoiceControlProps> = ({
  children,
  language = navigator.language
}) => {
  const [modelManager] = useState(() => new ModelManager());
  const [engineType, setEngineType] = useState<'webSpeech' | 'tensorFlow'>('webSpeech');
  const [modelName, setModelName] = useState<string | null>(null);
  
  useEffect(() => {
    // Wähle das passende Modell basierend auf der Sprache
    const models = modelManager.getModelsByLanguage(language);
    
    if (models.length > 0) {
      setModelName(models[0].name);
      setEngineType('tensorFlow');
    } else {
      // Fallback auf Web Speech API, wenn kein passendes Modell gefunden wurde
      setModelName(null);
      setEngineType('webSpeech');
    }
  }, [language, modelManager]);
  
  return (
    <VoiceControlProvider 
      engineType={engineType}
      language={language}
      tensorFlowOptions={modelName ? { customModelName: modelName } : undefined}
    >
      {children}
    </VoiceControlProvider>
  );
};

export default MultilingualVoiceControl;
```

## Erweiterte Funktionen

### Kontinuierliche Spracherkennung

Für eine kontinuierliche Spracherkennung ohne explizites Starten und Stoppen:

```typescript
// In TensorFlowRecognitionEngine.ts
private setupContinuousRecognition() {
  // Starte die Erkennung automatisch
  this.start();
  
  // Implementiere eine Aktivierungswort-Erkennung
  let isActivated = false;
  const activationWord = 'hey smolitux';
  
  // Überschreibe die onResult-Methode
  const originalOnResult = this.onResult;
  this.onResult = (text) => {
    const lowerText = text.toLowerCase();
    
    if (!isActivated) {
      // Prüfe auf Aktivierungswort
      if (lowerText === activationWord) {
        isActivated = true;
        // Gib visuelles/akustisches Feedback
        console.log('Aktiviert!');
        
        // Deaktiviere nach 10 Sekunden automatisch
        setTimeout(() => {
          isActivated = false;
          console.log('Deaktiviert (Timeout)');
        }, 10000);
      }
    } else {
      // Wenn aktiviert, leite den Text an die ursprüngliche onResult-Methode weiter
      originalOnResult(text);
      
      // Deaktiviere nach bestimmten Befehlen
      if (lowerText === 'beenden' || lowerText === 'stop listening') {
        isActivated = false;
        console.log('Deaktiviert (Befehl)');
      }
    }
  };
}
```

### Sprachsynthese für Feedback

Für akustisches Feedback können Sie die Web Speech API für Sprachsynthese verwenden:

```typescript
// src/voice-control/FeedbackManager.ts
export class FeedbackManager {
  private audioContext: AudioContext | null = null;
  private speechSynthesis: SpeechSynthesis | null = null;
  private useSpeechFeedback: boolean;
  
  constructor(useSpeechFeedback = false) {
    this.useSpeechFeedback = useSpeechFeedback;
    
    // Initialisiere Web Audio API
    if (typeof window !== 'undefined') {
      document.addEventListener('click', () => {
        if (!this.audioContext) {
          this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
      }, { once: true });
    }
    
    // Initialisiere Speech Synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.speechSynthesis = window.speechSynthesis;
    }
  }
  
  provideFeedback(type: 'start' | 'stop' | 'command', command?: string) {
    // Visuelles Feedback
    this.provideVisualFeedback(type, command);
    
    // Akustisches Feedback
    this.provideAudioFeedback(type);
    
    // Sprachfeedback
    if (this.useSpeechFeedback) {
      this.provideSpeechFeedback(type, command);
    }
  }
  
  // ... andere Methoden ...
  
  private provideSpeechFeedback(type: 'start' | 'stop' | 'command', command?: string) {
    if (!this.speechSynthesis) return;
    
    let text = '';
    
    switch (type) {
      case 'start':
        text = 'Spracherkennung aktiviert';
        break;
      case 'stop':
        text = 'Spracherkennung deaktiviert';
        break;
      case 'command':
        text = `Befehl erkannt: ${command}`;
        break;
    }
    
    if (text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.volume = 0.5;
      utterance.rate = 1.0;
      
      this.speechSynthesis.speak(utterance);
    }
  }
}
```

## Fehlerbehebung

### Häufige Probleme und Lösungen

1. **Problem**: TensorFlow.js lädt nicht oder verursacht Fehler
   **Lösung**: Prüfen Sie die Browser-Kompatibilität und verwenden Sie Polyfills für ältere Browser

   ```typescript
   // Polyfill für ältere Browser
   import '@tensorflow/tfjs-backend-cpu';
   import '@tensorflow/tfjs-backend-webgl';
   ```

2. **Problem**: Hohe CPU/GPU-Auslastung
   **Lösung**: Verwenden Sie WebWorker und optimieren Sie die Modellparameter

   ```typescript
   // Reduzieren Sie die Abtastrate
   const options = {
     overlapFactor: 0.25, // Weniger Überlappung = weniger Berechnungen
     suppressionTimeMillis: 200 // Längere Unterdrückungszeit = weniger Erkennungen
   };
   ```

3. **Problem**: Niedrige Erkennungsgenauigkeit
   **Lösung**: Passen Sie die Schwellenwerte an und trainieren Sie benutzerdefinierte Modelle

   ```typescript
   // Erhöhen Sie den Schwellenwert für höhere Präzision
   const options = {
     scoreThreshold: 0.85, // Höherer Wert = höhere Präzision, aber weniger Erkennungen
   };
   ```

4. **Problem**: Modelle werden nicht geladen
   **Lösung**: Überprüfen Sie die CORS-Einstellungen und verwenden Sie lokale Modelle

   ```typescript
   // Verwenden Sie lokale Modelle
   const modelManager = new ModelManager();
   modelManager.registerModel({
     name: 'local-model',
     url: '/models/speech/local-model/model.json',
     // ...
   });
   ```

## Beispiele

### Grundlegende Verwendung

```tsx
import React from 'react';
import { VoiceControlProvider } from './voice-control';
import { VoiceButton, VoiceInput } from './components/voice';

function App() {
  return (
    <VoiceControlProvider engineType="tensorFlow">
      <div className="app">
        <h1>TensorFlow.js Sprachsteuerung</h1>
        
        <VoiceButton>Klick mich</VoiceButton>
        
        <VoiceInput 
          placeholder="Sprich, um Text einzugeben"
          voiceCommands={['eingabe', 'löschen']}
        />
      </div>
    </VoiceControlProvider>
  );
}
```

### Erweiterte Verwendung mit benutzerdefinierten Modellen

```tsx
import React, { useState, useEffect } from 'react';
import { VoiceControlProvider } from './voice-control';
import { ModelManager } from './voice-control/models/ModelManager';
import { VoiceButton, VoiceInput } from './components/voice';

function App() {
  const [modelManager] = useState(() => new ModelManager());
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  
  useEffect(() => {
    // Lade verfügbare Modelle
    const models = modelManager.getAvailableModels();
    setAvailableModels(models.map(model => model.name));
    
    // Wähle das erste Modell als Standard
    if (models.length > 0) {
      setSelectedModel(models[0].name);
    }
  }, [modelManager]);
  
  return (
    <div className="app">
      <div className="model-selector">
        <label>
          Sprachmodell:
          <select 
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            {availableModels.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </label>
      </div>
      
      {selectedModel && (
        <VoiceControlProvider 
          engineType="tensorFlow"
          tensorFlowOptions={{ customModelName: selectedModel }}
        >
          <h1>TensorFlow.js Sprachsteuerung</h1>
          
          <VoiceButton>Klick mich</VoiceButton>
          
          <VoiceInput 
            placeholder="Sprich, um Text einzugeben"
            voiceCommands={['eingabe', 'löschen']}
          />
        </VoiceControlProvider>
      )}
    </div>
  );
}
```

### Vollständiges Beispiel mit Modelltraining

```tsx
import React, { useState } from 'react';
import { VoiceControlProvider } from './voice-control';
import ModelTrainingComponent from './components/ModelTrainingComponent';
import { VoiceButton, VoiceInput } from './components/voice';

function App() {
  const [showTraining, setShowTraining] = useState(false);
  const [useCustomModel, setUseCustomModel] = useState(false);
  
  return (
    <div className="app">
      <div className="controls">
        <button onClick={() => setShowTraining(!showTraining)}>
          {showTraining ? 'Anwendung anzeigen' : 'Modelltraining anzeigen'}
        </button>
        
        <label>
          <input 
            type="checkbox" 
            checked={useCustomModel} 
            onChange={(e) => setUseCustomModel(e.target.checked)} 
          />
          Benutzerdefiniertes Modell verwenden
        </label>
      </div>
      
      {showTraining ? (
        <ModelTrainingComponent />
      ) : (
        <VoiceControlProvider 
          engineType="tensorFlow"
          tensorFlowOptions={
            useCustomModel 
              ? { customModelUrl: 'indexeddb://my-custom-model' } 
              : undefined
          }
        >
          <h1>TensorFlow.js Sprachsteuerung</h1>
          
          <VoiceButton>Klick mich</VoiceButton>
          
          <VoiceInput 
            placeholder="Sprich, um Text einzugeben"
            voiceCommands={['eingabe', 'löschen']}
          />
        </VoiceControlProvider>
      )}
    </div>
  );
}
```

Diese Dokumentation bietet eine umfassende Anleitung zur Integration von TensorFlow.js in die Sprachsteuerungsfunktionalität der Smolitux-UI-Bibliothek. Durch die Verwendung von TensorFlow.js können Sie eine robuste, offline-fähige Spracherkennung implementieren, die in allen modernen Browsern konsistent funktioniert.