import '../src/setup';

describe('setup', () => {
  it('loads jest-dom', () => {
    expect(expect.extend).toBeTruthy();
  });
});
