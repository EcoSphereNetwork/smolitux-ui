import fileMock from '../mocks/fileMock.js';

describe('fileMock', () => {
  it('returns stub string', () => {
    expect(fileMock).toBe('test-file-stub');
  });
});
