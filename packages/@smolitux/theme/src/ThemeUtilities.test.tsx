import { getColorByTheme, getSpacing } from './ThemeUtilities';
import { tokens } from './tokens';

describe('Theme utilities', () => {
  test('resolves color by theme', () => {
    const color = getColorByTheme(tokens as any, 'primary', '500');
    expect(color).toBe('#0075E1');
  });

  test('calculates numeric spacing', () => {
    expect(getSpacing(tokens as any, 2)).toBe('2rem');
  });
});
