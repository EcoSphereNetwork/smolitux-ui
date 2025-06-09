import { generateId } from '../src/generators';

describe('generateId', () => {
  it('generates incremental ids', () => {
    const a = generateId('test');
    const b = generateId('test');
    expect(a).toBe('test-1');
    expect(b).toBe('test-2');
  });
});
