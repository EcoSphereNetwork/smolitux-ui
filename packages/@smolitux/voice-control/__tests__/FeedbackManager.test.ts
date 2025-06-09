import { FeedbackManager } from '../src/FeedbackManager';
import { SpeechSynthesizer } from '../src/SpeechSynthesizer';

describe('FeedbackManager', () => {
  test('uses SpeechSynthesizer for command feedback', () => {
    const speak = jest.spyOn(SpeechSynthesizer.prototype, 'speak').mockImplementation(() => {});
    const manager = new FeedbackManager();
    manager.provideFeedback('command', 'run');
    expect(speak).toHaveBeenCalledWith('run');
  });

  test('creates audio feedback when context available', () => {
    const start = jest.fn();
    const oscillator = { frequency: { value: 0 }, start, stop: jest.fn(), connect: jest.fn() };
    const gainNode = { gain: { value: 0 }, connect: jest.fn() };
    (window as any).AudioContext = jest.fn(() => ({
      createOscillator: () => oscillator,
      createGain: () => gainNode,
      destination: {},
    }));
    const manager = new FeedbackManager();
    (manager as any).audioContext = new (window as any).AudioContext();
    manager.provideFeedback('start');
    expect(start).toHaveBeenCalled();
  });
});
