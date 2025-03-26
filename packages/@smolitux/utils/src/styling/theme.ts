import { colors } from './colors';
import { spacing } from './spacing';
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } from './typography';
import { breakpoints } from './responsive';

// Default theme
export const defaultTheme = {
  colors,
  spacing,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  breakpoints,
  
  // Borders
  borderWidth: {
    default: '1px',
    0: '0',
    2: '2px',
    4: '4px',
    8: '8px',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    default: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  },
  
  // Z-index
  zIndex: {
    auto: 'auto',
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
  },
  
  // Transitions
  transition: {
    property: {
      none: 'none',
      all: 'all',
      default: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
      colors: 'background-color, border-color, color, fill, stroke',
      opacity: 'opacity',
      shadow: 'box-shadow',
      transform: 'transform',
    },
    timingFunction: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    duration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },
  },
};

// Theme interface
export interface Theme {
  colors: typeof colors;
  spacing: typeof spacing;
  fontFamily: typeof fontFamily;
  fontSize: typeof fontSize;
  fontWeight: typeof fontWeight;
  lineHeight: typeof lineHeight;
  letterSpacing: typeof letterSpacing;
  breakpoints: typeof breakpoints;
  borderWidth: typeof defaultTheme.borderWidth;
  borderRadius: typeof defaultTheme.borderRadius;
  boxShadow: typeof defaultTheme.boxShadow;
  zIndex: typeof defaultTheme.zIndex;
  transition: typeof defaultTheme.transition;
}

// Create a custom theme by extending the default theme
export const createTheme = (customTheme: Partial<Theme>): Theme => {
  return {
    ...defaultTheme,
    ...customTheme,
    colors: { ...defaultTheme.colors, ...customTheme.colors },
    spacing: { ...defaultTheme.spacing, ...customTheme.spacing },
    fontFamily: { ...defaultTheme.fontFamily, ...customTheme.fontFamily },
    fontSize: { ...defaultTheme.fontSize, ...customTheme.fontSize },
    fontWeight: { ...defaultTheme.fontWeight, ...customTheme.fontWeight },
    lineHeight: { ...defaultTheme.lineHeight, ...customTheme.lineHeight },
    letterSpacing: { ...defaultTheme.letterSpacing, ...customTheme.letterSpacing },
    breakpoints: { ...defaultTheme.breakpoints, ...customTheme.breakpoints },
    borderWidth: { ...defaultTheme.borderWidth, ...customTheme.borderWidth },
    borderRadius: { ...defaultTheme.borderRadius, ...customTheme.borderRadius },
    boxShadow: { ...defaultTheme.boxShadow, ...customTheme.boxShadow },
    zIndex: { ...defaultTheme.zIndex, ...customTheme.zIndex },
    transition: {
      ...defaultTheme.transition,
      ...customTheme.transition,
      property: { ...defaultTheme.transition.property, ...customTheme.transition?.property },
      timingFunction: { ...defaultTheme.transition.timingFunction, ...customTheme.transition?.timingFunction },
      duration: { ...defaultTheme.transition.duration, ...customTheme.transition?.duration },
    },
  };
};