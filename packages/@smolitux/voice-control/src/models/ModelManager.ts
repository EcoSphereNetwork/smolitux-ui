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
    this.registerModel({
      name: 'general-de',
      url: 'https://storage.googleapis.com/smolitux-models/speech/general-de/model.json',
      size: 2500000,
      vocabulary: ['ja', 'nein', 'start', 'stop', 'weiter', 'zurück', 'öffnen', 'schließen'],
      language: 'de-DE',
      description: 'Deutsches Allgemein-Modell mit grundlegenden Befehlen',
    });
    this.registerModel({
      name: 'general-en',
      url: 'https://storage.googleapis.com/smolitux-models/speech/general-en/model.json',
      size: 2500000,
      vocabulary: ['yes', 'no', 'start', 'stop', 'next', 'back', 'open', 'close'],
      language: 'en-US',
      description: 'English general model with basic commands',
    });
  }

  public registerModel(modelInfo: ModelInfo) {
    this.models.set(modelInfo.name, modelInfo);
  }

  public getModelInfo(name: string): ModelInfo | undefined {
    return this.models.get(name);
  }

  public async loadModel(name: string): Promise<tf.LayersModel | null> {
    if (this.loadedModels.has(name)) {
      return this.loadedModels.get(name)!;
    }
    const modelInfo = this.models.get(name);
    if (!modelInfo) {
      console.error(`Model "${name}" is not registered`);
      return null;
    }
    try {
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
    return Array.from(this.models.values()).filter((m) => m.language === language);
  }
}
