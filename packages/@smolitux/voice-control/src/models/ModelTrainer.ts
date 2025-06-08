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
        onComplete: () => resolve(),
      });
    });
  }

  public async train(options: TrainingOptions = {}): Promise<tf.History> {
    const {
      epochs = 50,
      batchSize = 32,
      learningRate = 0.01,
      validationSplit = 0.2,
      callbacks = {},
    } = options;
    const trainingOptions: speech.TransferLearnConfig = {
      epochs,
      callback: callbacks,
      batchSize,
      learningRate,
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
        result = await this.recognizer.save(`indexeddb://${name}`);
        break;
      case 'downloads':
        result = await this.recognizer.save(`downloads://${name}`);
        break;
      case 'localstorage':
        result = await this.recognizer.save(`localstorage://${name}`);
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
    return this.recognizer.countExamples();
  }

  public clearExamples(word?: string): void {
    if (word) {
      this.recognizer.clearExamples(word);
      const counts = this.recognizer.countExamples();
      if (!counts[word] || counts[word] === 0) {
        this.customWords = this.customWords.filter((w) => w !== word);
      }
    } else {
      for (const w of this.customWords) {
        this.recognizer.clearExamples(w);
      }
      this.customWords = [];
    }
  }
}
