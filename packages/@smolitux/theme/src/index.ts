// Theme system
export interface ThemeOptions {
  colors: ColorOptions;
  typography: TypographyOptions;
  spacing: SpacingOptions;
  breakpoints: BreakpointOptions;
  borderRadius: BorderRadiusOptions;
  shadows: ShadowOptions;
}

export interface ColorOptions {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
}

export interface TypographyOptions {
  fontFamily: string;
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  fontWeight: {
    light: number;
    regular: number;
    medium: number;
    bold: number;
  };
}

export interface SpacingOptions {
  unit: number;
}

export interface BreakpointOptions {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface BorderRadiusOptions {
  none: string;
  sm: string;
  md: string;
  lg: string;
  full: string;
}

export interface ShadowOptions {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

// Default theme
export const defaultTheme: ThemeOptions = {
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    success: '#27ae60',
    warning: '#f39c12',
    error: '#e74c3c',
    info: '#00bcd4',
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      disabled: '#999999',
    },
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  spacing: {
    unit: 8,
  },
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
};

// useTheme hook
import { useContext, createContext } from 'react';

const ThemeContext = createContext<ThemeOptions>(defaultTheme);

export const ThemeProvider = ThemeContext.Provider;
export const useTheme = () => useContext(ThemeContext);
