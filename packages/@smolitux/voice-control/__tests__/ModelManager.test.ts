import { ModelManager } from '../src/models/ModelManager';

describe('ModelManager', () => {
  test('registers and retrieves model info', () => {
    const manager = new ModelManager();
    manager.registerModel({
      name: 'test',
      url: 'https://example.com/model.json',
      size: 1,
      vocabulary: ['foo'],
      language: 'en-US',
      description: 'test model',
    });

    const info = manager.getModelInfo('test');
    expect(info?.url).toBe('https://example.com/model.json');
  });
});
