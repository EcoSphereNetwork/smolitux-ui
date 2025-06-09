import { createCssVariables } from './cssVariables';
import { defaultTheme } from './Default';

describe('createCssVariables', () => {
  test('generates CSS variable map from tokens', () => {
    const vars = createCssVariables(defaultTheme);
    expect(vars['--color-primary-500']).toBe('#0075E1');
    expect(vars['--spacing-4']).toBe('1rem');
  });
});
