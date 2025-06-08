import {
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLineHeight,
  getLetterSpacing,
  createTypographyStyles,
  getTextStyle,
  getResponsiveTypography,
  getTextTransform,
  getTextDecoration,
} from '../typography';

describe('Typography Utilities', () => {
  const theme = {
    typography: {
      fontFamily: {
        base: 'Arial, sans-serif',
        heading: 'Georgia, serif',
        monospace: 'Courier New, monospace',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '2rem',
      },
      fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        none: 1,
        tight: 1.25,
        normal: 1.5,
        loose: 2,
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
      },
      textStyles: {
        h1: {
          fontFamily: 'heading',
          fontSize: '2xl',
          fontWeight: 'bold',
          lineHeight: 'tight',
        },
        body: {
          fontFamily: 'base',
          fontSize: 'md',
          fontWeight: 'regular',
          lineHeight: 'normal',
        },
        code: {
          fontFamily: 'monospace',
          fontSize: 'sm',
          fontWeight: 'regular',
          lineHeight: 'normal',
        },
      },
    },
  };

  describe('getFontFamily', () => {
    it('returns font family from theme', () => {
      expect(getFontFamily(theme, 'base')).toBe('Arial, sans-serif');
      expect(getFontFamily(theme, 'heading')).toBe('Georgia, serif');
      expect(getFontFamily(theme, 'monospace')).toBe('Courier New, monospace');
    });

    it('returns raw value when not found in theme', () => {
      expect(getFontFamily(theme, 'Roboto, sans-serif')).toBe('Roboto, sans-serif');
    });

    it('returns fallback when value is not found', () => {
      expect(getFontFamily(theme, 'custom', 'Roboto, sans-serif')).toBe('Roboto, sans-serif');
    });

    it('returns undefined when value is not found and no fallback is provided', () => {
      expect(getFontFamily(theme, 'custom')).toBeUndefined();
    });
  });

  describe('getFontSize', () => {
    it('returns font size from theme', () => {
      expect(getFontSize(theme, 'xs')).toBe('0.75rem');
      expect(getFontSize(theme, 'md')).toBe('1rem');
      expect(getFontSize(theme, '2xl')).toBe('2rem');
    });

    it('returns raw value when not found in theme', () => {
      expect(getFontSize(theme, '1.75rem')).toBe('1.75rem');
    });

    it('returns fallback when value is not found', () => {
      expect(getFontSize(theme, '3xl', '3rem')).toBe('3rem');
    });

    it('returns undefined when value is not found and no fallback is provided', () => {
      expect(getFontSize(theme, '3xl')).toBeUndefined();
    });
  });

  describe('getFontWeight', () => {
    it('returns font weight from theme', () => {
      expect(getFontWeight(theme, 'light')).toBe(300);
      expect(getFontWeight(theme, 'regular')).toBe(400);
      expect(getFontWeight(theme, 'bold')).toBe(700);
    });

    it('returns raw value when not found in theme', () => {
      expect(getFontWeight(theme, 800)).toBe(800);
    });

    it('returns fallback when value is not found', () => {
      expect(getFontWeight(theme, 'black', 900)).toBe(900);
    });

    it('returns undefined when value is not found and no fallback is provided', () => {
      expect(getFontWeight(theme, 'black')).toBeUndefined();
    });
  });

  describe('getLineHeight', () => {
    it('returns line height from theme', () => {
      expect(getLineHeight(theme, 'none')).toBe(1);
      expect(getLineHeight(theme, 'normal')).toBe(1.5);
      expect(getLineHeight(theme, 'loose')).toBe(2);
    });

    it('returns raw value when not found in theme', () => {
      expect(getLineHeight(theme, 1.75)).toBe(1.75);
    });

    it('returns fallback when value is not found', () => {
      expect(getLineHeight(theme, 'extra-loose', 2.5)).toBe(2.5);
    });

    it('returns undefined when value is not found and no fallback is provided', () => {
      expect(getLineHeight(theme, 'extra-loose')).toBeUndefined();
    });
  });

  describe('getLetterSpacing', () => {
    it('returns letter spacing from theme', () => {
      expect(getLetterSpacing(theme, 'tighter')).toBe('-0.05em');
      expect(getLetterSpacing(theme, 'normal')).toBe('0');
      expect(getLetterSpacing(theme, 'wider')).toBe('0.05em');
    });

    it('returns raw value when not found in theme', () => {
      expect(getLetterSpacing(theme, '0.1em')).toBe('0.1em');
    });

    it('returns fallback when value is not found', () => {
      expect(getLetterSpacing(theme, 'widest', '0.1em')).toBe('0.1em');
    });

    it('returns undefined when value is not found and no fallback is provided', () => {
      expect(getLetterSpacing(theme, 'widest')).toBeUndefined();
    });
  });

  describe('createTypographyStyles', () => {
    it('creates typography styles', () => {
      const styles = createTypographyStyles(theme, {
        fontFamily: 'heading',
        fontSize: 'lg',
        fontWeight: 'bold',
        lineHeight: 'tight',
        letterSpacing: 'wide',
      });

      expect(styles).toEqual({
        fontFamily: 'Georgia, serif',
        fontSize: '1.25rem',
        fontWeight: 700,
        lineHeight: 1.25,
        letterSpacing: '0.025em',
      });
    });

    it('handles raw values', () => {
      const styles = createTypographyStyles(theme, {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '1.75rem',
        fontWeight: 800,
        lineHeight: 1.75,
        letterSpacing: '0.1em',
      });

      expect(styles).toEqual({
        fontFamily: 'Roboto, sans-serif',
        fontSize: '1.75rem',
        fontWeight: 800,
        lineHeight: 1.75,
        letterSpacing: '0.1em',
      });
    });

    it('handles responsive typography values', () => {
      const styles = createTypographyStyles(theme, {
        fontSize: {
          base: 'md',
          md: 'lg',
          lg: 'xl',
        },
        fontWeight: {
          base: 'regular',
          md: 'medium',
          lg: 'bold',
        },
      });

      expect(styles).toEqual({
        fontSize: '1rem',
        fontWeight: 400,
        '@media (min-width: 768px)': {
          fontSize: '1.25rem',
          fontWeight: 500,
        },
        '@media (min-width: 992px)': {
          fontSize: '1.5rem',
          fontWeight: 700,
        },
      });
    });
  });

  describe('getTextStyle', () => {
    it('returns text style from theme', () => {
      expect(getTextStyle(theme, 'h1')).toEqual({
        fontFamily: 'heading',
        fontSize: '2xl',
        fontWeight: 'bold',
        lineHeight: 'tight',
      });

      expect(getTextStyle(theme, 'body')).toEqual({
        fontFamily: 'base',
        fontSize: 'md',
        fontWeight: 'regular',
        lineHeight: 'normal',
      });
    });

    it('returns undefined when text style is not found', () => {
      expect(getTextStyle(theme, 'h6')).toBeUndefined();
    });

    it('returns resolved text style when resolved is true', () => {
      expect(getTextStyle(theme, 'h1', true)).toEqual({
        fontFamily: 'Georgia, serif',
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.25,
      });
    });
  });

  describe('getResponsiveTypography', () => {
    it('returns responsive typography object', () => {
      const responsiveTypography = getResponsiveTypography(theme, {
        fontSize: {
          base: 'md',
          md: 'lg',
          lg: 'xl',
        },
        fontWeight: {
          base: 'regular',
          md: 'medium',
          lg: 'bold',
        },
      });

      expect(responsiveTypography).toEqual({
        fontSize: {
          base: '1rem',
          md: '1.25rem',
          lg: '1.5rem',
        },
        fontWeight: {
          base: 400,
          md: 500,
          lg: 700,
        },
      });
    });

    it('handles non-responsive typography', () => {
      const typography = {
        fontSize: 'lg',
        fontWeight: 'bold',
      };

      expect(getResponsiveTypography(theme, typography)).toEqual({
        fontSize: '1.25rem',
        fontWeight: 700,
      });
    });
  });

  describe('getTextTransform', () => {
    it('returns text transform value', () => {
      expect(getTextTransform('uppercase')).toBe('uppercase');
      expect(getTextTransform('lowercase')).toBe('lowercase');
      expect(getTextTransform('capitalize')).toBe('capitalize');
      expect(getTextTransform('none')).toBe('none');
    });

    it('returns undefined for invalid values', () => {
      expect(getTextTransform('invalid')).toBeUndefined();
    });
  });

  describe('getTextDecoration', () => {
    it('returns text decoration value', () => {
      expect(getTextDecoration('underline')).toBe('underline');
      expect(getTextDecoration('line-through')).toBe('line-through');
      expect(getTextDecoration('none')).toBe('none');
    });

    it('returns undefined for invalid values', () => {
      expect(getTextDecoration('invalid')).toBeUndefined();
    });
  });
});
