import * as tf from '@tensorflow/tfjs';
import * as speech from '@tensorflow-models/speech-commands';
import { RecognitionEngine } from './RecognitionEngine';

export interface TensorFlowRecognitionOptions {
  modelType?: 'BROWSER_FFT' | '18W';
  vocabulary?: 'directional4w' | 'directional8w' | 'digits' | 'general' | string[];
  customModelUrl?: string;
  scoreThreshold?: number;
  includeSpectrogram?: boolean;
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

  public onResult: (text: string) => void = () => {};
  public onStateChange: (isListening: boolean) => void = () => {};

  constructor(options: TensorFlowRecognitionOptions = {}) {
    this.options = {
      modelType: 'BROWSER_FFT',
      vocabulary: 'general',
      scoreThreshold: 0.75,
      includeSpectrogram: false,
      overlapFactor: 0.5,
      probabilityThreshold: 0.75,
      invokeCallbackOnNoiseAndUnknown: false,
      suppressionTimeMillis: 100,
      ...options,
    };

    this.initModel();
  }

  private async initModel() {
    try {
      await tf.ready();

      const modelOptions: speech.SpeechCommandsRecognizerOptions = {
        vocabulary: this.options.vocabulary as any,
        customModelUrl: this.options.customModelUrl,
      };

      this.model = speech.create(this.options.modelType as any, undefined, modelOptions);
      await this.model.ensureModelLoaded();
      this.commandVocabulary = this.model.wordLabels();
      this.model.params().scoreThreshold = this.options.scoreThreshold || 0.75;
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
          if (maxScore > (this.options.scoreThreshold || 0)) {
            const recognizedCommand = this.commandVocabulary[maxIndex];
            this.onResult(recognizedCommand);
          }
        },
        {
          includeSpectrogram: this.options.includeSpectrogram,
          probabilityThreshold: this.options.probabilityThreshold,
          overlapFactor: this.options.overlapFactor,
          invokeCallbackOnNoiseAndUnknown: this.options.invokeCallbackOnNoiseAndUnknown,
          suppressionTimeMillis: this.options.suppressionTimeMillis,
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
