import {
  getSpacing,
  getSpacingValue,
  createSpacingStyles,
  parseSpacingValue,
  getSpacingUnit,
  getSpacingScale,
  getResponsiveSpacing,
} from '../spacing';

describe('Spacing Utilities', () => {
  const theme = {
    spacing: {
      unit: 'rem',
      scale: [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8],
      custom: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
      },
    },
  };

  describe('getSpacing', () => {
    it('returns spacing from scale by index', () => {
      expect(getSpacing(theme, 1)).toBe('0.25rem');
      expect(getSpacing(theme, 3)).toBe('1rem');
      expect(getSpacing(theme, 5)).toBe('2rem');
    });

    it('returns spacing from custom values', () => {
      expect(getSpacing(theme, 'xs')).toBe('0.25rem');
      expect(getSpacing(theme, 'md')).toBe('1rem');
      expect(getSpacing(theme, 'xl')).toBe('2rem');
    });

    it('returns raw value when not found in theme', () => {
      expect(getSpacing(theme, '10px')).toBe('10px');
      expect(getSpacing(theme, '1.25rem')).toBe('1.25rem');
    });

    it('returns fallback when value is not found', () => {
      expect(getSpacing(theme, 'xxl', '3rem')).toBe('3rem');
      expect(getSpacing(theme, 20, '10rem')).toBe('10rem');
    });

    it('returns undefined when value is not found and no fallback is provided', () => {
      expect(getSpacing(theme, 'xxl')).toBeUndefined();
      expect(getSpacing(theme, 20)).toBeUndefined();
    });
  });

  describe('getSpacingValue', () => {
    it('returns numeric value of spacing', () => {
      expect(getSpacingValue(theme, 1)).toBe(0.25);
      expect(getSpacingValue(theme, 3)).toBe(1);
      expect(getSpacingValue(theme, 'md')).toBe(1);
    });

    it('returns parsed value for raw spacing', () => {
      expect(getSpacingValue(theme, '10px')).toBe(10);
      expect(getSpacingValue(theme, '1.25rem')).toBe(1.25);
    });

    it('returns 0 for invalid spacing', () => {
      expect(getSpacingValue(theme, 'invalid')).toBe(0);
    });
  });

  describe('createSpacingStyles', () => {
    it('creates margin styles', () => {
      const styles = createSpacingStyles(theme, {
        m: 3,
        mt: 'md',
        mr: 2,
        mb: '10px',
        ml: 'lg',
      });

      expect(styles).toEqual({
        margin: '1rem',
        marginTop: '1rem',
        marginRight: '0.5rem',
        marginBottom: '10px',
        marginLeft: '1.5rem',
      });
    });

    it('creates padding styles', () => {
      const styles = createSpacingStyles(theme, {
        p: 3,
        pt: 'md',
        pr: 2,
        pb: '10px',
        pl: 'lg',
      });

      expect(styles).toEqual({
        padding: '1rem',
        paddingTop: '1rem',
        paddingRight: '0.5rem',
        paddingBottom: '10px',
        paddingLeft: '1.5rem',
      });
    });

    it('creates shorthand margin styles', () => {
      const styles = createSpacingStyles(theme, {
        mx: 3,
        my: 'md',
      });

      expect(styles).toEqual({
        marginLeft: '1rem',
        marginRight: '1rem',
        marginTop: '1rem',
        marginBottom: '1rem',
      });
    });

    it('creates shorthand padding styles', () => {
      const styles = createSpacingStyles(theme, {
        px: 3,
        py: 'md',
      });

      expect(styles).toEqual({
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '1rem',
        paddingBottom: '1rem',
      });
    });

    it('handles responsive spacing values', () => {
      const styles = createSpacingStyles(theme, {
        m: {
          base: 2,
          md: 3,
          lg: 4,
        },
        p: {
          base: 'sm',
          md: 'md',
          lg: 'lg',
        },
      });

      expect(styles).toEqual({
        margin: '0.5rem',
        padding: '0.5rem',
        '@media (min-width: 768px)': {
          margin: '1rem',
          padding: '1rem',
        },
        '@media (min-width: 992px)': {
          margin: '1.5rem',
          padding: '1.5rem',
        },
      });
    });
  });

  describe('parseSpacingValue', () => {
    it('parses numeric values', () => {
      expect(parseSpacingValue('10px')).toBe(10);
      expect(parseSpacingValue('1.25rem')).toBe(1.25);
      expect(parseSpacingValue('20%')).toBe(20);
    });

    it('returns 0 for non-numeric values', () => {
      expect(parseSpacingValue('auto')).toBe(0);
      expect(parseSpacingValue('invalid')).toBe(0);
    });
  });

  describe('getSpacingUnit', () => {
    it('returns spacing unit from theme', () => {
      expect(getSpacingUnit(theme)).toBe('rem');
    });

    it('returns default unit when not defined in theme', () => {
      expect(getSpacingUnit({ spacing: {} })).toBe('px');
    });
  });

  describe('getSpacingScale', () => {
    it('returns spacing scale from theme', () => {
      expect(getSpacingScale(theme)).toEqual([0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8]);
    });

    it('returns default scale when not defined in theme', () => {
      expect(getSpacingScale({ spacing: {} })).toEqual([
        0, 0.25, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64,
      ]);
    });
  });

  describe('getResponsiveSpacing', () => {
    it('returns responsive spacing object', () => {
      const responsiveSpacing = getResponsiveSpacing(theme, {
        base: 2,
        md: 3,
        lg: 4,
      });

      expect(responsiveSpacing).toEqual({
        base: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
      });
    });

    it('handles non-responsive spacing', () => {
      expect(getResponsiveSpacing(theme, 3)).toBe('1rem');
    });
  });
});
