import { createCssVariables } from './utils/cssVariables';
import { tokens } from './tokens';

describe('createCssVariables', () => {
  test('generates CSS variable map from tokens', () => {
    const vars = createCssVariables(tokens);
    expect(vars['--color-primary-500']).toBe('#0075E1');
    expect(vars['--spacing-4']).toBe('1rem');
    expect(vars['--typography-fontFamily-sans']).toBe(
      'Inter, system-ui, -apple-system, sans-serif'
    );
  });
});
