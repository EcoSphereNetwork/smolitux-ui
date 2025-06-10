import { VoiceControlManager } from '../src/VoiceControlManager';
import { WebSpeechRecognitionEngine } from '../src/engines/WebSpeechRecognitionEngine';

describe('VoiceControlManager', () => {
  test('registers components and processes commands', () => {
    const manager = new VoiceControlManager('webSpeech');
    // stub recognition engine methods to avoid browser APIs
  (manager as any).recognitionEngine = {
    onResult: () => {},
    onStateChange: () => {},
    start: jest.fn(),
    stop: jest.fn(),
    cleanup: jest.fn(),
    isSupported: () => true,
  } as unknown as WebSpeechRecognitionEngine;
  (manager as any).setupEventListeners();

    manager.registerComponent('test', ['click']);
    let recognizedCommand = '';
    let target = '';
    manager.onCommandRecognized = (command, targetId) => {
      recognizedCommand = command;
      target = targetId;
    };

    (manager as any).commandProcessor.processCommand = jest.fn().mockReturnValue({
      command: 'click',
      targetId: 'test',
    });

    // simulate result event
    (manager as any).recognitionEngine.onResult('click');

    expect(recognizedCommand).toBe('click');
    expect(target).toBe('test');
  });
});
