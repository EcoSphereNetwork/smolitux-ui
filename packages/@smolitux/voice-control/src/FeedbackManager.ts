import { SpeechSynthesizer } from './SpeechSynthesizer';

export class FeedbackManager {
  private audioContext: AudioContext | null = null;
  private synthesizer: SpeechSynthesizer;

  constructor() {
    if (typeof window !== 'undefined') {
      document.addEventListener(
        'click',
        () => {
          if (!this.audioContext) {
            const WebkitAudioContext = (
              window as typeof window & { webkitAudioContext?: typeof AudioContext }
            ).webkitAudioContext;
            const Ctor = window.AudioContext || WebkitAudioContext;
            if (Ctor) {
              this.audioContext = new Ctor();
            }
          }
        },
        { once: true }
      );
    }
    this.synthesizer = new SpeechSynthesizer();
  }

  provideFeedback(type: 'start' | 'stop' | 'command', command?: string) {
    this.provideVisualFeedback(type, command);
    this.provideAudioFeedback(type);
    if (type === 'command' && command) {
      this.synthesizer.speak(command);
    }
  }

  private provideVisualFeedback(type: 'start' | 'stop' | 'command', command?: string) {
    const el = document.getElementById('voice-feedback');
    if (!el) return;
    switch (type) {
      case 'start':
        el.textContent = 'Spracherkennung aktiv';
        el.classList.add('listening');
        break;
      case 'stop':
        el.textContent = 'Spracherkennung gestoppt';
        el.classList.remove('listening');
        break;
      case 'command':
        el.textContent = `Befehl erkannt: ${command}`;
        break;
    }
  }

  private provideAudioFeedback(type: 'start' | 'stop' | 'command') {
    if (!this.audioContext) return;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    switch (type) {
      case 'start':
        oscillator.frequency.value = 880;
        break;
      case 'stop':
        oscillator.frequency.value = 440;
        break;
      case 'command':
        oscillator.frequency.value = 660;
        break;
    }
    gainNode.gain.value = 0.1;
    oscillator.start();
    setTimeout(() => oscillator.stop(), 100);
  }
}
