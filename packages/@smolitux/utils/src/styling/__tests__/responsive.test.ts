import {
  getBreakpoint,
  getMediaQuery,
  getResponsiveValue,
  createResponsiveStyles,
  isBreakpoint,
  getBreakpointValue,
  getBreakpointOrder,
  getNextBreakpoint,
  getPreviousBreakpoint,
} from '../responsive';

describe('Responsive Utilities', () => {
  const theme = {
    breakpoints: {
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
    },
  };

  describe('getBreakpoint', () => {
    it('returns the correct breakpoint from theme', () => {
      expect(getBreakpoint(theme, 'sm')).toBe('576px');
      expect(getBreakpoint(theme, 'md')).toBe('768px');
      expect(getBreakpoint(theme, 'lg')).toBe('992px');
    });

    it('returns fallback when breakpoint is not found', () => {
      expect(getBreakpoint(theme, 'custom', '600px')).toBe('600px');
    });

    it('returns undefined when breakpoint is not found and no fallback is provided', () => {
      expect(getBreakpoint(theme, 'custom')).toBeUndefined();
    });
  });

  describe('getMediaQuery', () => {
    it('returns min-width media query by default', () => {
      expect(getMediaQuery(theme, 'md')).toBe('@media (min-width: 768px)');
    });

    it('returns max-width media query when specified', () => {
      expect(getMediaQuery(theme, 'md', 'max')).toBe('@media (max-width: 767.98px)');
    });

    it('returns between media query when specified', () => {
      expect(getMediaQuery(theme, 'md', 'between', 'lg')).toBe(
        '@media (min-width: 768px) and (max-width: 991.98px)'
      );
    });

    it('returns only media query when specified', () => {
      expect(getMediaQuery(theme, 'md', 'only')).toBe(
        '@media (min-width: 768px) and (max-width: 991.98px)'
      );
    });

    it('handles custom breakpoints', () => {
      expect(getMediaQuery(theme, '800px')).toBe('@media (min-width: 800px)');
    });
  });

  describe('getResponsiveValue', () => {
    it('returns simple value when not an object', () => {
      expect(getResponsiveValue('red', 'md')).toBe('red');
      expect(getResponsiveValue(42, 'md')).toBe(42);
    });

    it('returns value for exact breakpoint when available', () => {
      const responsiveValue = {
        base: 'red',
        md: 'blue',
        lg: 'green',
      };

      expect(getResponsiveValue(responsiveValue, 'md')).toBe('blue');
    });

    it('returns base value when breakpoint is not found', () => {
      const responsiveValue = {
        base: 'red',
        lg: 'green',
      };

      expect(getResponsiveValue(responsiveValue, 'md')).toBe('red');
    });

    it('returns closest smaller breakpoint when exact is not found', () => {
      const responsiveValue = {
        sm: 'red',
        lg: 'green',
      };

      expect(getResponsiveValue(responsiveValue, 'md')).toBe('red');
    });

    it('returns undefined when no suitable value is found', () => {
      const responsiveValue = {
        lg: 'green',
        xl: 'blue',
      };

      expect(getResponsiveValue(responsiveValue, 'md')).toBeUndefined();
    });
  });

  describe('createResponsiveStyles', () => {
    it('creates styles for each breakpoint', () => {
      const responsiveStyles = createResponsiveStyles(theme, {
        color: {
          base: 'red',
          md: 'blue',
          lg: 'green',
        },
        fontSize: {
          base: '14px',
          md: '16px',
          lg: '18px',
        },
      });

      expect(responsiveStyles).toEqual({
        color: 'red',
        fontSize: '14px',
        '@media (min-width: 768px)': {
          color: 'blue',
          fontSize: '16px',
        },
        '@media (min-width: 992px)': {
          color: 'green',
          fontSize: '18px',
        },
      });
    });

    it('handles non-responsive values', () => {
      const responsiveStyles = createResponsiveStyles(theme, {
        color: 'red',
        fontSize: {
          base: '14px',
          md: '16px',
        },
      });

      expect(responsiveStyles).toEqual({
        color: 'red',
        fontSize: '14px',
        '@media (min-width: 768px)': {
          fontSize: '16px',
        },
      });
    });

    it('handles empty styles', () => {
      const responsiveStyles = createResponsiveStyles(theme, {});

      expect(responsiveStyles).toEqual({});
    });
  });

  describe('isBreakpoint', () => {
    it('returns true for valid breakpoints', () => {
      expect(isBreakpoint(theme, 'sm')).toBe(true);
      expect(isBreakpoint(theme, 'md')).toBe(true);
      expect(isBreakpoint(theme, 'lg')).toBe(true);
    });

    it('returns false for invalid breakpoints', () => {
      expect(isBreakpoint(theme, 'custom')).toBe(false);
      expect(isBreakpoint(theme, '600px')).toBe(false);
    });
  });

  describe('getBreakpointValue', () => {
    it('returns numeric value of breakpoint', () => {
      expect(getBreakpointValue(theme, 'sm')).toBe(576);
      expect(getBreakpointValue(theme, 'md')).toBe(768);
      expect(getBreakpointValue(theme, 'lg')).toBe(992);
    });

    it('returns 0 for invalid breakpoints', () => {
      expect(getBreakpointValue(theme, 'custom')).toBe(0);
    });
  });

  describe('getBreakpointOrder', () => {
    it('returns ordered array of breakpoints', () => {
      expect(getBreakpointOrder(theme)).toEqual(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']);
    });
  });

  describe('getNextBreakpoint', () => {
    it('returns next breakpoint', () => {
      expect(getNextBreakpoint(theme, 'sm')).toBe('md');
      expect(getNextBreakpoint(theme, 'md')).toBe('lg');
      expect(getNextBreakpoint(theme, 'lg')).toBe('xl');
    });

    it('returns undefined for last breakpoint', () => {
      expect(getNextBreakpoint(theme, 'xxl')).toBeUndefined();
    });

    it('returns undefined for invalid breakpoint', () => {
      expect(getNextBreakpoint(theme, 'custom')).toBeUndefined();
    });
  });

  describe('getPreviousBreakpoint', () => {
    it('returns previous breakpoint', () => {
      expect(getPreviousBreakpoint(theme, 'md')).toBe('sm');
      expect(getPreviousBreakpoint(theme, 'lg')).toBe('md');
      expect(getPreviousBreakpoint(theme, 'xl')).toBe('lg');
    });

    it('returns undefined for first breakpoint', () => {
      expect(getPreviousBreakpoint(theme, 'xs')).toBeUndefined();
    });

    it('returns undefined for invalid breakpoint', () => {
      expect(getPreviousBreakpoint(theme, 'custom')).toBeUndefined();
    });
  });
});
