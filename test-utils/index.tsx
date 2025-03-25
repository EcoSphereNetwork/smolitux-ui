import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@smolitux/theme';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light', toggleTheme: jest.fn(), setThemeMode: jest.fn() })),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Custom render mit ThemeProvider
export const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { theme?: 'light' | 'dark' }
) => {
  const { theme = 'light', ...rest } = options || {};
  return render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
    ),
    ...rest,
  });
};

// Re-export everything from testing-library
export * from '@testing-library/react';
export { customRender as render };