import {
  isResponsiveValue,
  getResponsiveValue,
  createResponsiveObject,
  flattenResponsiveObject,
  mapResponsiveValue,
} from '../responsive';

describe('Responsive Type Utilities', () => {
  describe('isResponsiveValue', () => {
    it('returns true for responsive objects', () => {
      expect(isResponsiveValue({ base: 'red', md: 'blue' })).toBe(true);
      expect(isResponsiveValue({ sm: 10, lg: 20 })).toBe(true);
    });

    it('returns false for non-responsive values', () => {
      expect(isResponsiveValue('red')).toBe(false);
      expect(isResponsiveValue(10)).toBe(false);
      expect(isResponsiveValue(null)).toBe(false);
      expect(isResponsiveValue(undefined)).toBe(false);
      expect(isResponsiveValue({})).toBe(false);
      expect(isResponsiveValue([])).toBe(false);
    });
  });

  describe('getResponsiveValue', () => {
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

      const breakpointOrder = ['xs', 'sm', 'md', 'lg', 'xl'];

      expect(getResponsiveValue(responsiveValue, 'md', breakpointOrder)).toBe('red');
    });

    it('returns undefined when no suitable value is found', () => {
      const responsiveValue = {
        lg: 'green',
        xl: 'blue',
      };

      const breakpointOrder = ['xs', 'sm', 'md', 'lg', 'xl'];

      expect(getResponsiveValue(responsiveValue, 'md', breakpointOrder)).toBeUndefined();
    });

    it('returns non-responsive value as is', () => {
      expect(getResponsiveValue('red', 'md')).toBe('red');
      expect(getResponsiveValue(10, 'md')).toBe(10);
    });
  });

  describe('createResponsiveObject', () => {
    it('creates responsive object from value and breakpoint', () => {
      expect(createResponsiveObject('red', 'md')).toEqual({ md: 'red' });
      expect(createResponsiveObject(10, 'base')).toEqual({ base: 10 });
    });

    it('returns responsive value as is', () => {
      const responsiveValue = { base: 'red', md: 'blue' };
      expect(createResponsiveObject(responsiveValue)).toEqual(responsiveValue);
    });
  });

  describe('flattenResponsiveObject', () => {
    it('flattens responsive object into breakpoint-specific styles', () => {
      const responsiveObject = {
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
      };

      const breakpointOrder = ['base', 'sm', 'md', 'lg', 'xl'];

      expect(flattenResponsiveObject(responsiveObject, breakpointOrder)).toEqual({
        base: {
          color: 'red',
          fontSize: '14px',
        },
        md: {
          color: 'blue',
          fontSize: '16px',
        },
        lg: {
          color: 'green',
          fontSize: '18px',
        },
      });
    });

    it('handles non-responsive values', () => {
      const object = {
        color: 'red',
        fontSize: {
          base: '14px',
          md: '16px',
        },
      };

      const breakpointOrder = ['base', 'sm', 'md', 'lg', 'xl'];

      expect(flattenResponsiveObject(object, breakpointOrder)).toEqual({
        base: {
          color: 'red',
          fontSize: '14px',
        },
        md: {
          fontSize: '16px',
        },
      });
    });

    it('handles empty objects', () => {
      expect(flattenResponsiveObject({}, ['base', 'md', 'lg'])).toEqual({});
    });
  });

  describe('mapResponsiveValue', () => {
    it('maps responsive value with callback', () => {
      const responsiveValue = {
        base: 1,
        md: 2,
        lg: 3,
      };

      const result = mapResponsiveValue(responsiveValue, (value) => value * 2);

      expect(result).toEqual({
        base: 2,
        md: 4,
        lg: 6,
      });
    });

    it('maps non-responsive value with callback', () => {
      expect(mapResponsiveValue(5, (value) => value * 2)).toBe(10);
    });

    it('handles null and undefined values', () => {
      expect(mapResponsiveValue(null, (value) => value * 2)).toBeNull();
      expect(mapResponsiveValue(undefined, (value) => value * 2)).toBeUndefined();
    });
  });
});
