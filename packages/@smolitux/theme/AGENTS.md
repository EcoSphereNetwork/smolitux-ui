# @smolitux/theme - Codex Development Guide

**Package-specific guide for AI agents working on the @smolitux/theme package**

## 📋 Package Overview

The `@smolitux/theme` package provides the design system foundation for the Smolitux UI library. It defines design tokens, color palettes, typography, spacing, and other visual aspects that ensure consistency across all components.

## 🎨 Theme Components

1. **Design Tokens**: Color, typography, spacing, shadows, borders, etc.
2. **Theme Provider**: Context provider for theme values
3. **Theme Hooks**: Hooks for accessing theme values
4. **Theme Utilities**: Helper functions for theme manipulation
5. **Dark Mode**: Support for light/dark mode switching
6. **Color Schemes**: Predefined color schemes for different applications

## 🔄 Dependencies

The `@smolitux/theme` package has minimal external dependencies:

- React and React DOM
- TypeScript for type definitions
- CSS variables for theme implementation

It should NOT depend on other Smolitux packages to avoid circular dependencies.

## 🎯 Priority Components

Focus on these components first, as they are most widely used:

1. ThemeProvider
2. useTheme hook
3. ColorTokens
4. TypographyTokens
5. SpacingTokens
6. ShadowTokens
7. BorderTokens
8. DarkModeToggle
9. ThemeContext
10. GlobalStyles

## 🔧 Implementation Patterns

### ThemeProvider Pattern

```typescript
import React, { createContext, useContext, useState, useMemo } from 'react';
import { defaultTheme } from './defaultTheme';
import type { Theme } from './types';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  /** Initial theme */
  theme?: Theme;
  /** Children to render */
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme: initialTheme = defaultTheme,
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialTheme.mode === 'dark');

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    setTheme((prevTheme) => ({
      ...prevTheme,
      mode: prevTheme.mode === 'dark' ? 'light' : 'dark',
    }));
  };

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      isDarkMode,
      toggleDarkMode,
    }),
    [theme, isDarkMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

### Theme Types Pattern

```typescript
export type ColorMode = 'light' | 'dark';

export interface ColorTokens {
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  neutral: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  success: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  warning: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  error: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  info: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
}

export interface TypographyTokens {
  fontFamily: {
    base: string;
    heading: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeight: {
    light: number;
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    none: number;
    tight: number;
    normal: number;
    relaxed: number;
    loose: number;
  };
  letterSpacing: {
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    wider: string;
    widest: string;
  };
}

export interface SpacingTokens {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
  24: string;
  32: string;
  40: string;
  48: string;
  56: string;
  64: string;
  80: string;
  96: string;
  128: string;
}

export interface BorderTokens {
  radius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  width: {
    none: string;
    thin: string;
    thick: string;
    thicker: string;
  };
}

export interface ShadowTokens {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
}

export interface ZIndexTokens {
  hide: number;
  auto: string;
  base: number;
  dropdown: number;
  sticky: number;
  fixed: number;
  overlay: number;
  modal: number;
  popover: number;
  tooltip: number;
}

export interface Theme {
  mode: ColorMode;
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  borders: BorderTokens;
  shadows: ShadowTokens;
  zIndices: ZIndexTokens;
}
```

## 🧪 Testing Patterns

### ThemeProvider Test Pattern

```typescript
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from './ThemeProvider';
import { defaultTheme } from './defaultTheme';

const TestComponent = () => {
  const { theme, toggleDarkMode, isDarkMode } = useTheme();
  return (
    <div>
      <div data-testid="theme-mode">{theme.mode}</div>
      <div data-testid="is-dark-mode">{isDarkMode ? 'dark' : 'light'}</div>
      <button data-testid="toggle-button" onClick={toggleDarkMode}>
        Toggle
      </button>
    </div>
  );
};

describe('ThemeProvider', () => {
  it('provides default theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
    expect(screen.getByTestId('is-dark-mode')).toHaveTextContent('light');
  });

  it('allows toggling dark mode', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
    
    await user.click(screen.getByTestId('toggle-button'));
    
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
    expect(screen.getByTestId('is-dark-mode')).toHaveTextContent('dark');
  });

  it('accepts custom initial theme', () => {
    const customTheme = {
      ...defaultTheme,
      mode: 'dark',
    };
    
    render(
      <ThemeProvider theme={customTheme}>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
    expect(screen.getByTestId('is-dark-mode')).toHaveTextContent('dark');
  });
});
```

## 📚 Documentation Patterns

### ThemeProvider Story Pattern

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from './ThemeProvider';
import { defaultTheme } from './defaultTheme';

const meta: Meta<typeof ThemeProvider> = {
  title: 'Theme/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ThemeProvider component that provides theme context to all child components.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ThemeDemo = () => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px' }}>
      <h2>Theme Demo</h2>
      <div style={{ marginBottom: '20px' }}>
        <h3>Colors</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {Object.keys(defaultTheme.colors.primary).map((key) => (
            <div
              key={key}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: defaultTheme.colors.primary[key as keyof typeof defaultTheme.colors.primary],
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: parseInt(key) > 500 ? 'white' : 'black',
              }}
            >
              {key}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Typography</h3>
        <div>
          {Object.keys(defaultTheme.typography.fontSize).map((key) => (
            <div
              key={key}
              style={{
                fontSize: defaultTheme.typography.fontSize[key as keyof typeof defaultTheme.typography.fontSize],
                marginBottom: '10px',
              }}
            >
              {key}: The quick brown fox jumps over the lazy dog
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3>Spacing</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
          {Object.keys(defaultTheme.spacing)
            .filter((key) => parseInt(key) <= 12)
            .map((key) => (
              <div
                key={key}
                style={{
                  width: defaultTheme.spacing[key as keyof typeof defaultTheme.spacing],
                  height: defaultTheme.spacing[key as keyof typeof defaultTheme.spacing],
                  backgroundColor: defaultTheme.colors.primary[500],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '10px',
                }}
              >
                {key}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <ThemeDemo />
    </ThemeProvider>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider theme={{ ...defaultTheme, mode: 'dark' }}>
      <ThemeDemo />
    </ThemeProvider>
  ),
};
```

## 🚀 Development Workflow

1. **Analysis**: Check current state of the theme system
2. **Implementation**: Develop theme components following the patterns
3. **Testing**: Write comprehensive tests
4. **Documentation**: Create Storybook stories
5. **Validation**: Ensure the theme system meets quality standards

## 📚 Additional Resources

- [Main Development Guide](/AGENTS.md)
- [Theme Component Templates](/docs/prompts/templates/theme.md)
- [Theme Package Prompt](/docs/prompts/packages/theme.md)

For more detailed guidance, use the prompt builder:

```bash
node scripts/prompts/prompt-builder.js --base core/system-prompt.md --package theme --task theme-development --template theme
```