import { SpeechSynthesizer } from '../src/SpeechSynthesizer';

// Minimal mock for SpeechSynthesisUtterance in jsdom environment
(global as any).SpeechSynthesisUtterance = function (this: any, text: string) {
  this.text = text;
};

describe('SpeechSynthesizer', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    delete (window as any).speechSynthesis;
  });

  test('falls back when unsupported', () => {
    Object.defineProperty(window, 'speechSynthesis', {
      value: undefined,
      configurable: true,
      writable: true,
    });
    const synthesizer = new SpeechSynthesizer();
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    synthesizer.speak('hello');
    expect(warn).toHaveBeenCalled();
  });

  test('uses SpeechSynthesis API when available', () => {
    const speakMock = jest.fn();
    Object.defineProperty(window, 'speechSynthesis', {
      value: { speak: speakMock, cancel: jest.fn() },
      configurable: true,
      writable: true,
    });
    const synthesizer = new SpeechSynthesizer();
    synthesizer.speak('hi');
    expect(speakMock).toHaveBeenCalled();
  });
});
