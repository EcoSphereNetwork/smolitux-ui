import { VoiceControlManager } from '../src/VoiceControlManager';
import {
  TensorFlowRecognitionEngine,
  TensorFlowRecognitionOptions,
} from '../src/engines/TensorFlowRecognitionEngine';

describe('VoiceControlManager TensorFlow integration', () => {
  test('uses TensorFlowRecognitionEngine when requested', () => {
    const manager = new VoiceControlManager('tensorFlow');
    const engine = (manager as any).recognitionEngine;
    expect(engine).toBeInstanceOf(TensorFlowRecognitionEngine);
  });

  test('passes tensorFlowOptions to engine', () => {
    const options: TensorFlowRecognitionOptions = { scoreThreshold: 0.5 };
    const manager = new VoiceControlManager('tensorFlow', 'de-DE', options);
    const engine = (manager as any).recognitionEngine as any;
    expect(engine.options.scoreThreshold).toBe(0.5);
  });
});
