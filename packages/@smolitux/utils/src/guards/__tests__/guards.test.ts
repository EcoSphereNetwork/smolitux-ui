import { is } from '../guards';

describe('guards', () => {
  describe('string', () => {
    it('returns true for strings', () => {
      expect(is.string('test')).toBe(true);
    });
    it('returns false for non-strings', () => {
      expect(is.string(1)).toBe(false);
      expect(is.string(null)).toBe(false);
    });
  });

  describe('number', () => {
    it('returns true for numbers', () => {
      expect(is.number(0)).toBe(true);
      expect(is.number(1.2)).toBe(true);
    });
    it('returns false for non-numbers', () => {
      expect(is.number('1')).toBe(false);
      expect(is.number(NaN)).toBe(false);
    });
  });

  describe('array', () => {
    it('returns true for arrays', () => {
      expect(is.array([])).toBe(true);
      expect(is.array([1, 2, 3])).toBe(true);
    });
    it('returns false for non-arrays', () => {
      expect(is.array('test')).toBe(false);
      expect(is.array({})).toBe(false);
    });
  });

  describe('object', () => {
    it('returns true for plain objects', () => {
      expect(is.object({})).toBe(true);
      expect(is.object({ a: 1 })).toBe(true);
    });
    it('returns false for arrays and null', () => {
      expect(is.object([])).toBe(false);
      expect(is.object(null)).toBe(false);
    });
  });

  describe('function', () => {
    it('returns true for functions', () => {
      expect(is.function(() => null)).toBe(true);
    });
    it('returns false for non-functions', () => {
      expect(is.function(1)).toBe(false);
    });
  });
});
