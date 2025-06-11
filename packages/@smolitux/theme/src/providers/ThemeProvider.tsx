import React, { createContext, useContext, useEffect, useMemo, useState, type FC, type ReactNode } from 'react';
import { tokens, type Tokens } from '../tokens';
import { createCssVariables, applyCssVariables } from '../utils/cssVariables';

export type ThemeMode = 'light' | 'dark' | 'system';

export type ThemeConfig = Tokens;

interface ThemeContextValue {
  theme: ThemeConfig;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: FC<{ children: ReactNode; defaultMode?: ThemeMode; theme?: Partial<ThemeConfig> }> = ({ children, defaultMode = 'system', theme = {} }) => {
  const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = defaultMode === 'system' ? (prefersDark ? 'dark' : 'light') : defaultMode;
  const [mode, setMode] = useState<ThemeMode>(initial);

  const mergedTheme = useMemo<ThemeConfig>(() => ({
    colors: { ...tokens.colors, ...theme.colors },
    typography: { ...tokens.typography, ...theme.typography },
    spacing: { ...tokens.spacing, ...theme.spacing },
    breakpoints: { ...tokens.breakpoints, ...theme.breakpoints },
  }), [theme]);

  const vars = useMemo(() => createCssVariables(mergedTheme), [mergedTheme]);

  useEffect(() => {
    applyCssVariables(vars);
  }, [vars]);

  useEffect(() => {
    if (defaultMode !== 'system') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setMode(mql.matches ? 'dark' : 'light');
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [defaultMode]);

  return <ThemeContext.Provider value={{ theme: mergedTheme, mode, setMode }}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  const toggleMode = () => ctx.setMode(ctx.mode === 'dark' ? 'light' : 'dark');
  return { ...ctx, toggleMode };
}
