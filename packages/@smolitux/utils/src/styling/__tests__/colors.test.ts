import { 
  getColor, 
  getColorShade, 
  getContrastColor, 
  hexToRgb, 
  rgbToHex,
  isValidHexColor,
  generateColorPalette,
  getThemeColors
} from '../colors';

describe('Color Utilities', () => {
  describe('getColor', () => {
    it('returns the correct color from theme', () => {
      const theme = {
        colors: {
          primary: '#3498db',
          secondary: '#2ecc71',
          error: '#e74c3c'
        }
      };
      
      expect(getColor(theme, 'primary')).toBe('#3498db');
      expect(getColor(theme, 'secondary')).toBe('#2ecc71');
      expect(getColor(theme, 'error')).toBe('#e74c3c');
    });
    
    it('returns fallback color when color is not found', () => {
      const theme = {
        colors: {
          primary: '#3498db'
        }
      };
      
      expect(getColor(theme, 'warning', '#f39c12')).toBe('#f39c12');
    });
    
    it('returns undefined when color is not found and no fallback is provided', () => {
      const theme = {
        colors: {
          primary: '#3498db'
        }
      };
      
      expect(getColor(theme, 'warning')).toBeUndefined();
    });
  });
  
  describe('getColorShade', () => {
    it('returns lighter shade when factor is positive', () => {
      expect(getColorShade('#000000', 0.5)).toBe('#808080');
    });
    
    it('returns darker shade when factor is negative', () => {
      expect(getColorShade('#ffffff', -0.5)).toBe('#808080');
    });
    
    it('returns original color when factor is 0', () => {
      expect(getColorShade('#3498db', 0)).toBe('#3498db');
    });
    
    it('handles RGB format', () => {
      expect(getColorShade('rgb(52, 152, 219)', 0.2)).toBe('#5ba8e0');
    });
  });
  
  describe('getContrastColor', () => {
    it('returns white for dark colors', () => {
      expect(getContrastColor('#000000')).toBe('#ffffff');
      expect(getContrastColor('#333333')).toBe('#ffffff');
      expect(getContrastColor('#2c3e50')).toBe('#ffffff');
    });
    
    it('returns black for light colors', () => {
      expect(getContrastColor('#ffffff')).toBe('#000000');
      expect(getContrastColor('#ecf0f1')).toBe('#000000');
      expect(getContrastColor('#f1c40f')).toBe('#000000');
    });
    
    it('handles RGB format', () => {
      expect(getContrastColor('rgb(52, 152, 219)')).toBe('#ffffff');
      expect(getContrastColor('rgb(241, 196, 15)')).toBe('#000000');
    });
  });
  
  describe('hexToRgb', () => {
    it('converts hex to rgb object', () => {
      expect(hexToRgb('#3498db')).toEqual({ r: 52, g: 152, b: 219 });
      expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 });
    });
    
    it('returns null for invalid hex', () => {
      expect(hexToRgb('#zzz')).toBeNull();
      expect(hexToRgb('not-a-color')).toBeNull();
    });
  });
  
  describe('rgbToHex', () => {
    it('converts rgb object to hex', () => {
      expect(rgbToHex({ r: 52, g: 152, b: 219 })).toBe('#3498db');
      expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe('#ffffff');
    });
    
    it('converts rgb values to hex', () => {
      expect(rgbToHex(52, 152, 219)).toBe('#3498db');
      expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
    });
  });
  
  describe('isValidHexColor', () => {
    it('returns true for valid hex colors', () => {
      expect(isValidHexColor('#3498db')).toBe(true);
      expect(isValidHexColor('#fff')).toBe(true);
      expect(isValidHexColor('#000000')).toBe(true);
    });
    
    it('returns false for invalid hex colors', () => {
      expect(isValidHexColor('#zzz')).toBe(false);
      expect(isValidHexColor('not-a-color')).toBe(false);
      expect(isValidHexColor('#12345')).toBe(false);
    });
  });
  
  describe('generateColorPalette', () => {
    it('generates a palette with specified number of shades', () => {
      const palette = generateColorPalette('#3498db', 5);
      
      expect(palette).toHaveLength(5);
      expect(palette[0]).toBe('#3498db'); // Base color should be in the middle
    });
    
    it('generates a palette with light and dark shades', () => {
      const palette = generateColorPalette('#3498db', 5);
      
      // First shade should be lighter than base
      expect(getColorShade('#3498db', 0.5)).toBe(palette[1]);
      
      // Last shade should be darker than base
      expect(getColorShade('#3498db', -0.5)).toBe(palette[3]);
    });
  });
  
  describe('getThemeColors', () => {
    it('returns all colors from theme', () => {
      const theme = {
        colors: {
          primary: '#3498db',
          secondary: '#2ecc71',
          error: '#e74c3c'
        }
      };
      
      const colors = getThemeColors(theme);
      
      expect(colors).toEqual({
        primary: '#3498db',
        secondary: '#2ecc71',
        error: '#e74c3c'
      });
    });
    
    it('returns empty object when theme has no colors', () => {
      const theme = {};
      
      const colors = getThemeColors(theme);
      
      expect(colors).toEqual({});
    });
  });
});