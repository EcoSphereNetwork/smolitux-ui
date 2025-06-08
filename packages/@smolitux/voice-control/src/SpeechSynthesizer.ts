export interface SpeechSynthesizerOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export class SpeechSynthesizer {
  private synth: SpeechSynthesis | null;
  private utteranceOptions: SpeechSynthesizerOptions;

  constructor(options: SpeechSynthesizerOptions = {}) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    } else {
      this.synth = null;
    }
    this.utteranceOptions = { lang: 'de-DE', rate: 1, pitch: 1, volume: 1, ...options };
  }

  public isSupported(): boolean {
    return !!this.synth;
  }

  public speak(text: string): void {
    if (!this.synth) {
      console.warn('Speech synthesis is not supported in this browser.');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.utteranceOptions.lang!;
    utterance.rate = this.utteranceOptions.rate!;
    utterance.pitch = this.utteranceOptions.pitch!;
    utterance.volume = this.utteranceOptions.volume!;
    this.synth.speak(utterance);
  }

  public cancel(): void {
    this.synth?.cancel();
  }
}
