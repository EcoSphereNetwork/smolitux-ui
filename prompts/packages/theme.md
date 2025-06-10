# @smolitux/theme - Paket-spezifische Anweisungen

## Paket-Übersicht

Das `@smolitux/theme`-Paket enthält das Theming-System und die Design-Tokens der Smolitux UI-Bibliothek. Es definiert Farben, Typografie, Abstände, Schatten und andere visuelle Eigenschaften, die von allen Komponenten verwendet werden.

## Komponenten

Das Theme-Paket enthält folgende Komponenten:

- `ThemeProvider`: Stellt das Theme für alle Komponenten bereit
- `useTheme`: Hook zum Zugriff auf das aktuelle Theme
- `useColorMode`: Hook zum Zugriff auf den aktuellen Farbmodus (Light/Dark)
- `useColorModeValue`: Hook zum Abrufen von Werten basierend auf dem aktuellen Farbmodus

## Design-Tokens

Das Theme-Paket definiert folgende Design-Tokens:

### Farben

```typescript
export const colors = {
  primary: {
    50: '#e6f7ff',
    100: '#bae7ff',
    200: '#91d5ff',
    300: '#69c0ff',
    400: '#40a9ff',
    500: '#1890ff',
    600: '#096dd9',
    700: '#0050b3',
    800: '#003a8c',
    900: '#002766',
  },
  secondary: {
    // ...
  },
  success: {
    // ...
  },
  warning: {
    // ...
  },
  error: {
    // ...
  },
  gray: {
    // ...
  },
};
```

### Typografie

```typescript
export const typography = {
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    normal: 'normal',
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: 2,
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};
```

### Abstände

```typescript
export const space = {
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};
```

### Schatten

```typescript
export const shadows = {
  xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  outline: '0 0 0 3px rgba(66, 153, 225, 0.6)',
  inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
  none: 'none',
};
```

### Radien

```typescript
export const radii = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};
```

### Breakpoints

```typescript
export const breakpoints = {
  sm: '30em', // 480px
  md: '48em', // 768px
  lg: '62em', // 992px
  xl: '80em', // 1280px
  '2xl': '96em', // 1536px
};
```

## Richtlinien

Bei der Entwicklung von Theme-Komponenten solltest du folgende Richtlinien beachten:

1. **Konsistenz**: Alle Design-Tokens sollten konsistent sein und den Design-Richtlinien entsprechen
2. **Erweiterbarkeit**: Das Theme sollte erweiterbar sein, um benutzerdefinierte Themes zu unterstützen
3. **Performance**: Das Theme sollte performant sein und keine unnötigen Neuberechnungen verursachen
4. **Typsicherheit**: Alle Theme-Komponenten müssen vollständig typisiert sein
5. **Barrierefreiheit**: Das Theme sollte Barrierefreiheit unterstützen, insbesondere für Kontraste und Farbmodi

## Beispiel-Implementierung

```typescript
import React, { createContext, useContext, useState, useMemo } from 'react';

// Theme-Typen
export type ColorMode = 'light' | 'dark';

export interface ThemeContextType {
  colorMode: ColorMode;
  toggleColorMode: () => void;
  theme: Theme;
}

export interface Theme {
  colors: Record<string, Record<number, string>>;
  typography: {
    fontSizes: Record<string, string>;
    fontWeights: Record<string, number>;
    lineHeights: Record<string, string | number>;
    letterSpacings: Record<string, string>;
  };
  space: Record<string | number, string>;
  shadows: Record<string, string>;
  radii: Record<string, string>;
  breakpoints: Record<string, string>;
}

// Default theme
const defaultTheme: Theme = {
  colors: {
    primary: {
      50: '#e6f7ff',
      100: '#bae7ff',
      200: '#91d5ff',
      300: '#69c0ff',
      400: '#40a9ff',
      500: '#1890ff',
      600: '#096dd9',
      700: '#0050b3',
      800: '#003a8c',
      900: '#002766',
    },
    // ... other colors
  },
  typography: {
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
    },
    fontWeights: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    lineHeights: {
      normal: 'normal',
      none: 1,
      shorter: 1.25,
      short: 1.375,
      base: 1.5,
      tall: 1.625,
      taller: 2,
    },
    letterSpacings: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  space: {
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    // ... other spaces
  },
  shadows: {
    xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    // ... other shadows
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    // ... other radii
  },
  breakpoints: {
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '62em', // 992px
    xl: '80em', // 1280px
    '2xl': '96em', // 1536px
  },
};

// Theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider props
export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: Partial<Theme>;
  defaultColorMode?: ColorMode;
}

// Theme provider
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme: customTheme,
  defaultColorMode = 'light',
}) => {
  const [colorMode, setColorMode] = useState<ColorMode>(defaultColorMode);

  // Merge default theme with custom theme
  const theme = useMemo(() => {
    if (!customTheme) return defaultTheme;
    return {
      ...defaultTheme,
      ...customTheme,
      colors: {
        ...defaultTheme.colors,
        ...customTheme.colors,
      },
      typography: {
        ...defaultTheme.typography,
        ...customTheme.typography,
      },
      space: {
        ...defaultTheme.space,
        ...customTheme.space,
      },
      shadows: {
        ...defaultTheme.shadows,
        ...customTheme.shadows,
      },
      radii: {
        ...defaultTheme.radii,
        ...customTheme.radii,
      },
      breakpoints: {
        ...defaultTheme.breakpoints,
        ...customTheme.breakpoints,
      },
    };
  }, [customTheme]);

  // Toggle color mode
  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Context value
  const contextValue = useMemo(
    () => ({
      colorMode,
      toggleColorMode,
      theme,
    }),
    [colorMode, theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={`theme theme--${colorMode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

// Theme hooks
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useColorMode = (): [ColorMode, () => void] => {
  const { colorMode, toggleColorMode } = useTheme();
  return [colorMode, toggleColorMode];
};

export const useColorModeValue = <T,>(lightValue: T, darkValue: T): T => {
  const { colorMode } = useTheme();
  return colorMode === 'light' ? lightValue : darkValue;
};

export default ThemeProvider;
```