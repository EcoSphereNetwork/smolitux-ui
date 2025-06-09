import { configure, getConfig } from '../src/config';
import { defaultTheme } from '@smolitux/theme';

describe('config utility', () => {
  it('returns default config initially', () => {
    expect(getConfig().theme).toBe(defaultTheme);
  });

  it('allows overriding theme', () => {
    const newTheme = { ...defaultTheme, colors: { ...defaultTheme.colors, primary: '#000000' } };
    configure({ theme: newTheme });
    expect(getConfig().theme).toBe(newTheme);
  });
});
