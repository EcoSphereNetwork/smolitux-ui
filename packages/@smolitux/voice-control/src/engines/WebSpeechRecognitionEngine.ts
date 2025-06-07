import { RecognitionEngine } from './RecognitionEngine';

export class WebSpeechRecognitionEngine implements RecognitionEngine {
  private recognition: SpeechRecognition | null = null;
  private listening = false;

  public onResult: (text: string) => void = () => {};
  public onStateChange: (isListening: boolean) => void = () => {};

  constructor(language = 'de-DE') {
    const SpeechRecognitionConstructor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionConstructor) {
      this.recognition = new SpeechRecognitionConstructor();
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
    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
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

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
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
