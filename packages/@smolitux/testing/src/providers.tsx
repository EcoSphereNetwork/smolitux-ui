import React, { ReactNode } from 'react';
import { ThemeProvider, ThemeOptions, defaultTheme } from '@smolitux/theme';

export interface ProvidersProps {
  children: ReactNode;
  theme?: ThemeOptions;
}

/**
 * Default test providers wrapper used by render utility.
 */
export const Providers: React.FC<ProvidersProps> = ({ children, theme = defaultTheme }) => (
  <ThemeProvider value={theme}>{children}</ThemeProvider>
);

export default Providers;
