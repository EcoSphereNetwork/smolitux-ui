import { WebSpeechRecognitionEngine } from '../src/engines/WebSpeechRecognitionEngine';

describe('WebSpeechRecognitionEngine', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('isSupported returns boolean', () => {
    const engine = new WebSpeechRecognitionEngine();
    expect(typeof engine.isSupported()).toBe('boolean');
  });

  test('handles unsupported browsers', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    (window as any).SpeechRecognition = undefined;
    (window as any).webkitSpeechRecognition = undefined;
    const engine = new WebSpeechRecognitionEngine();
    const change = jest.fn();
    engine.onStateChange = change;
    engine.start();
    expect(engine.isSupported()).toBe(false);
    expect(change).toHaveBeenCalledWith(false);
    expect(warn).toHaveBeenCalled();
  });
});
