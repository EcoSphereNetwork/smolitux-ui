import * as tf from '@tensorflow/tfjs';
import * as speech from '@tensorflow-models/speech-commands';
import { RecognitionEngine } from './RecognitionEngine';
import type { RecognizerParams } from '../types';

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
      this.model = speech.create('BROWSER_FFT');
      await this.model.ensureModelLoaded();
      this.commandVocabulary = this.model.wordLabels();
      (this.model.params() as unknown as RecognizerParams).scoreThreshold = 0.75;
      // warmup
      await tf.ready();
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
        (result) => {
          const scores = Array.from(result.scores as Float32Array);
          const maxScore = Math.max(...scores);
          const maxIndex = scores.indexOf(maxScore);
          const threshold =
            (this.model!.params() as unknown as RecognizerParams).scoreThreshold ||
            0;
          if (maxScore > threshold) {
            const recognizedCommand = this.commandVocabulary[maxIndex];
            this.onResult(recognizedCommand);
          }
        },
        {
          includeSpectrogram: false,
          probabilityThreshold: 0.75,
          overlapFactor: 0.5,
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

  public isSupported() {
    return true;
  }
}
