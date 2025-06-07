import { WebSpeechRecognitionEngine } from '../src/engines/WebSpeechRecognitionEngine';

describe('WebSpeechRecognitionEngine', () => {
  test('isSupported returns boolean', () => {
    const engine = new WebSpeechRecognitionEngine();
    expect(typeof engine.isSupported()).toBe('boolean');
  });
});
