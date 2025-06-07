import { CommandProcessor } from '../src/CommandProcessor';

describe('CommandProcessor', () => {
  let processor: CommandProcessor;
  let registeredComponents: Map<string, string[]>;

  beforeEach(() => {
    processor = new CommandProcessor();
    registeredComponents = new Map();
    registeredComponents.set('button1', ['klick', 'drücken']);
    registeredComponents.set('input1', ['eingabe', 'löschen']);
  });

  test('should identify command and target for exact match', () => {
    const result = processor.processCommand('klick', registeredComponents);
    expect(result).toEqual({ command: 'klick', targetId: 'button1' });
  });

  test('should identify command and target for partial match', () => {
    const result = processor.processCommand('bitte klick den button', registeredComponents);
    expect(result).toEqual({ command: 'klick', targetId: 'button1' });
  });

  test('should return null for unrecognized commands', () => {
    const result = processor.processCommand('unbekannter befehl', registeredComponents);
    expect(result).toEqual({ command: null, targetId: null });
  });
});
