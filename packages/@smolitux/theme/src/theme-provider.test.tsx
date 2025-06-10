import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './providers/ThemeProvider';

describe('ThemeProvider', () => {
  it('provides default light mode and toggles theme', () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.mode).toBe('light');
    act(() => {
      result.current.toggleMode();
    });
    expect(result.current.mode).toBe('dark');
  });

  it('throws when used outside provider', () => {
    const { result } = renderHook(() => {
      try {
        return useTheme();
      } catch (e) {
        return e instanceof Error ? e.message : '';
      }
    });
    expect(result.current).toBe('useTheme must be used within a ThemeProvider');
  });
});
