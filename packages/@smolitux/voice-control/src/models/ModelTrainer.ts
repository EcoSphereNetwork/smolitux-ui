import * as tf from '@tensorflow/tfjs';
import * as speech from '@tensorflow-models/speech-commands';

export interface TrainingOptions {
  epochs?: number;
  batchSize?: number;
  optimizer?: string | tf.Optimizer;
  validationSplit?: number;
  callbacks?: tf.CustomCallbackArgs;
}

export class ModelTrainer {
  private baseRecognizer: speech.SpeechCommandRecognizer;
  private recognizer: speech.TransferSpeechCommandRecognizer | null = null;
  private customWords: string[] = [];

  constructor() {
    this.baseRecognizer = speech.create('BROWSER_FFT');
  }

  public async init() {
    await this.baseRecognizer.ensureModelLoaded();
    this.recognizer = this.baseRecognizer.createTransfer('custom');
  }

  public async collectExample(word: string, durationSec = 2): Promise<void> {
    if (!this.recognizer) return;
    if (!this.customWords.includes(word)) {
      this.customWords.push(word);
    }
    await this.recognizer!.collectExample(word, { durationSec });
  }

  public async train(options: TrainingOptions = {}): Promise<tf.History> {
    const {
      epochs = 50,
      batchSize = 32,
      optimizer = 'sgd',
      validationSplit = 0.2,
      callbacks = {},
    } = options;
    if (!this.recognizer) {
      throw new Error('Recognizer not initialized');
    }
    const trainingOptions: speech.TransferLearnConfig = {
      epochs,
      callback: callbacks,
      batchSize,
      optimizer,
      validationSplit,
    };
    return this.recognizer.train(trainingOptions);
  }

  public async save(
    format: 'indexeddb' | 'downloads' | 'localstorage' = 'indexeddb',
    name = 'custom-model'
  ): Promise<tf.io.SaveResult> {
    let result: tf.io.SaveResult;
    switch (format) {
      case 'indexeddb':
        result = await this.recognizer!.save(`indexeddb://${name}`);
        break;
      case 'downloads':
        result = await this.recognizer!.save(`downloads://${name}`);
        break;
      case 'localstorage':
        result = await this.recognizer!.save(`localstorage://${name}`);
        break;
      default:
        throw new Error(`Unsupported save format: ${format}`);
    }
    localStorage.setItem(`${name}-words`, JSON.stringify(this.customWords));
    return result;
  }

  public async load(
    format: 'indexeddb' | 'localstorage' = 'indexeddb',
    name = 'custom-model'
  ): Promise<boolean> {
    try {
      if (!this.recognizer) return false;
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

  public getExampleCounts(): { [word: string]: number } {
    return this.recognizer ? this.recognizer.countExamples() : {};
  }

  public clearExamples(word?: string): void {
    if (!this.recognizer) return;
    this.recognizer.clearExamples();
    if (word) {
      this.customWords = this.customWords.filter((w) => w !== word);
    } else {
      this.customWords = [];
    }
  }
}
