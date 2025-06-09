import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeProvider, useTheme } from '../providers/ThemeProvider';

function TestComponent() {
  const { themeMode, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} data-testid="mode">
      {themeMode}
    </button>
  );
}

describe('ThemeProvider', () => {
  test('provides default light mode and toggles', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    const btn = screen.getByTestId('mode');
    expect(btn).toHaveTextContent('light');
    await userEvent.click(btn);
    expect(btn).toHaveTextContent('dark');
  });
});
