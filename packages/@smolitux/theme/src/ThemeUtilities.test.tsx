import { getColorByTheme, getSpacing } from './ThemeUtilities';
import { defaultTheme } from './Default';

describe('Theme utilities', () => {
  test('resolves color by theme', () => {
    const color = getColorByTheme(defaultTheme, 'primary', '500');
    expect(color).toBe('#0075E1');
  });

  test('calculates numeric spacing', () => {
    expect(getSpacing(defaultTheme, 2)).toBe('2rem');
  });
});
