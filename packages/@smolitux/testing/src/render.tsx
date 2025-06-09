import React, { ReactElement, ReactNode } from 'react';
import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react';
import { ThemeProvider, defaultTheme, ThemeOptions } from '@smolitux/theme';

export interface ProvidersOptions extends RenderOptions {
  theme?: ThemeOptions;
}

/**
 * Render a component wrapped with ThemeProvider and other test providers.
 */
export function render(ui: ReactElement, options: ProvidersOptions = {}): RenderResult {
  const { theme = defaultTheme, ...rest } = options;

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider value={theme}>{children}</ThemeProvider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...rest });
}

export default render;
