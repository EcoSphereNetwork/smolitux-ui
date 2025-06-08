import {
  createTheme,
  extendTheme,
  mergeThemes,
  getThemeValue,
  isThemeKey,
  getThemeKeys,
  getThemeDefaults,
  applyThemeOverrides,
  createThemeVariant,
} from '../theme';

describe('Theme Utilities', () => {
  const baseTheme = {
    colors: {
      primary: '#3498db',
      secondary: '#2ecc71',
      error: '#e74c3c',
    },
    spacing: {
      unit: 'rem',
      scale: [0, 0.25, 0.5, 1, 1.5, 2],
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      fontWeight: {
        regular: 400,
        bold: 700,
      },
    },
    breakpoints: {
      sm: '576px',
      md: '768px',
      lg: '992px',
    },
  };

  describe('createTheme', () => {
    it('creates a theme with defaults', () => {
      const theme = createTheme();

      expect(theme).toHaveProperty('colors');
      expect(theme).toHaveProperty('spacing');
      expect(theme).toHaveProperty('typography');
      expect(theme).toHaveProperty('breakpoints');
    });

    it('creates a theme with custom values', () => {
      const theme = createTheme({
        colors: {
          primary: '#3498db',
        },
      });

      expect(theme.colors.primary).toBe('#3498db');
    });
  });

  describe('extendTheme', () => {
    it('extends base theme with overrides', () => {
      const extendedTheme = extendTheme(baseTheme, {
        colors: {
          primary: '#1abc9c',
          accent: '#9b59b6',
        },
      });

      expect(extendedTheme.colors.primary).toBe('#1abc9c');
      expect(extendedTheme.colors.secondary).toBe('#2ecc71');
      expect(extendedTheme.colors.accent).toBe('#9b59b6');
    });

    it('deeply merges nested objects', () => {
      const extendedTheme = extendTheme(baseTheme, {
        typography: {
          fontWeight: {
            medium: 500,
          },
        },
      });

      expect(extendedTheme.typography.fontWeight.regular).toBe(400);
      expect(extendedTheme.typography.fontWeight.bold).toBe(700);
      expect(extendedTheme.typography.fontWeight.medium).toBe(500);
    });
  });

  describe('mergeThemes', () => {
    it('merges multiple themes', () => {
      const theme1 = {
        colors: {
          primary: '#3498db',
        },
      };

      const theme2 = {
        colors: {
          secondary: '#2ecc71',
        },
      };

      const theme3 = {
        typography: {
          fontSize: '16px',
        },
      };

      const mergedTheme = mergeThemes(theme1, theme2, theme3);

      expect(mergedTheme.colors.primary).toBe('#3498db');
      expect(mergedTheme.colors.secondary).toBe('#2ecc71');
      expect(mergedTheme.typography.fontSize).toBe('16px');
    });

    it('later themes override earlier ones', () => {
      const theme1 = {
        colors: {
          primary: '#3498db',
        },
      };

      const theme2 = {
        colors: {
          primary: '#1abc9c',
        },
      };

      const mergedTheme = mergeThemes(theme1, theme2);

      expect(mergedTheme.colors.primary).toBe('#1abc9c');
    });
  });

  describe('getThemeValue', () => {
    it('gets value from theme by path', () => {
      expect(getThemeValue(baseTheme, 'colors.primary')).toBe('#3498db');
      expect(getThemeValue(baseTheme, 'typography.fontWeight.bold')).toBe(700);
    });

    it('returns fallback when path is not found', () => {
      expect(getThemeValue(baseTheme, 'colors.accent', '#9b59b6')).toBe('#9b59b6');
    });

    it('returns undefined when path is not found and no fallback is provided', () => {
      expect(getThemeValue(baseTheme, 'colors.accent')).toBeUndefined();
    });
  });

  describe('isThemeKey', () => {
    it('returns true for valid theme keys', () => {
      expect(isThemeKey(baseTheme, 'colors')).toBe(true);
      expect(isThemeKey(baseTheme, 'spacing')).toBe(true);
      expect(isThemeKey(baseTheme, 'typography')).toBe(true);
      expect(isThemeKey(baseTheme, 'breakpoints')).toBe(true);
    });

    it('returns false for invalid theme keys', () => {
      expect(isThemeKey(baseTheme, 'animations')).toBe(false);
      expect(isThemeKey(baseTheme, 'shadows')).toBe(false);
    });
  });

  describe('getThemeKeys', () => {
    it('returns all top-level theme keys', () => {
      expect(getThemeKeys(baseTheme)).toEqual(['colors', 'spacing', 'typography', 'breakpoints']);
    });
  });

  describe('getThemeDefaults', () => {
    it('returns default theme values', () => {
      const defaults = getThemeDefaults();

      expect(defaults).toHaveProperty('colors');
      expect(defaults).toHaveProperty('spacing');
      expect(defaults).toHaveProperty('typography');
      expect(defaults).toHaveProperty('breakpoints');
    });
  });

  describe('applyThemeOverrides', () => {
    it('applies overrides to theme', () => {
      const overrides = {
        colors: {
          primary: '#1abc9c',
        },
      };

      const theme = applyThemeOverrides(baseTheme, overrides);

      expect(theme.colors.primary).toBe('#1abc9c');
    });

    it('applies overrides function to theme', () => {
      const overrides = (theme) => ({
        colors: {
          primary: '#1abc9c',
          secondary: theme.colors.primary,
        },
      });

      const theme = applyThemeOverrides(baseTheme, overrides);

      expect(theme.colors.primary).toBe('#1abc9c');
      expect(theme.colors.secondary).toBe('#3498db');
    });
  });

  describe('createThemeVariant', () => {
    it('creates a theme variant', () => {
      const darkTheme = createThemeVariant(baseTheme, 'dark', {
        colors: {
          primary: '#2980b9',
          background: '#2c3e50',
          text: '#ecf0f1',
        },
      });

      expect(darkTheme.colors.primary).toBe('#2980b9');
      expect(darkTheme.colors.background).toBe('#2c3e50');
      expect(darkTheme.colors.text).toBe('#ecf0f1');
      expect(darkTheme.colors.secondary).toBe('#2ecc71');
      expect(darkTheme.variant).toBe('dark');
    });
  });
});
