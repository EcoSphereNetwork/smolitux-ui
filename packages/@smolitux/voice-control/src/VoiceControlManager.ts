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
    switch (engineType) {
      case 'tensorFlow':
        this.recognitionEngine = new TensorFlowRecognitionEngine();
        break;
      case 'external':
        this.recognitionEngine = new WebSpeechRecognitionEngine(language);
        break;
      case 'webSpeech':
      default:
        this.recognitionEngine = new WebSpeechRecognitionEngine(language);
        break;
    }

    if (!this.recognitionEngine.isSupported()) {
      console.warn('Selected recognition engine not supported, falling back to Web Speech API.');
      this.recognitionEngine = new WebSpeechRecognitionEngine(language);
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
