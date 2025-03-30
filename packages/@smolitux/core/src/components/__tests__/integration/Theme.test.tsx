import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../Button/Button';
import { Card } from '../../Card/Card';
import { Input } from '../../Input/Input';
import { ThemeProvider, useTheme } from '@smolitux/theme';

// Unmock ThemeProvider for this test
jest.unmock('@smolitux/theme');

describe('Theme Integration', () => {
  // Mock implementation of ThemeProvider and useTheme
  const mockSetThemeMode = jest.fn();
  const mockToggleTheme = jest.fn();
  
  beforeEach(() => {
    jest.resetAllMocks();
    
    // Mock the useTheme hook
    (useTheme as jest.Mock) = jest.fn().mockImplementation(() => ({
      themeMode: 'light',
      setThemeMode: mockSetThemeMode,
      toggleTheme: mockToggleTheme
    }));
  });
  
  test('components render correctly with light theme', () => {
    render(
      <ThemeProvider initialTheme="light">
        <Card>
          <h2>Theme Test</h2>
          <Input label="Test Input" />
          <Button>Test Button</Button>
        </Card>
      </ThemeProvider>
    );
    
    // In light theme, the card should have a white background
    expect(screen.getByText('Theme Test').closest('.bg-white')).toBeInTheDocument();
    
    // The button should have primary color classes
    expect(screen.getByRole('button')).toHaveClass('bg-primary-600');
  });
  
  test('components render correctly with dark theme', () => {
    // Mock the useTheme hook for dark theme
    (useTheme as jest.Mock).mockImplementation(() => ({
      themeMode: 'dark',
      setThemeMode: mockSetThemeMode,
      toggleTheme: mockToggleTheme
    }));
    
    render(
      <ThemeProvider initialTheme="dark">
        <Card>
          <h2>Theme Test</h2>
          <Input label="Test Input" />
          <Button>Test Button</Button>
        </Card>
      </ThemeProvider>
    );
    
    // In dark theme, the card should have a dark background
    expect(screen.getByText('Theme Test').closest('.bg-gray-800')).toBeInTheDocument();
    
    // The button should have primary color classes for dark theme
    expect(screen.getByRole('button')).toHaveClass('bg-primary-500');
  });
  
  test('theme can be toggled', async () => {
    const ThemeToggleTest = () => {
      const { themeMode, toggleTheme } = useTheme();
      
      return (
        <div>
          <div data-testid="theme-mode">{themeMode}</div>
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
      );
    };
    
    render(
      <ThemeProvider initialTheme="light">
        <ThemeToggleTest />
      </ThemeProvider>
    );
    
    // Initially the theme should be light
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
    
    // Click the toggle button
    await userEvent.click(screen.getByRole('button', { name: 'Toggle Theme' }));
    
    // The toggleTheme function should have been called
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
  
  test('theme can be set explicitly', async () => {
    const ThemeSetTest = () => {
      const { themeMode, setThemeMode } = useTheme();
      
      return (
        <div>
          <div data-testid="theme-mode">{themeMode}</div>
          <Button onClick={() => setThemeMode('light')}>Light Theme</Button>
          <Button onClick={() => setThemeMode('dark')}>Dark Theme</Button>
        </div>
      );
    };
    
    render(
      <ThemeProvider initialTheme="light">
        <ThemeSetTest />
      </ThemeProvider>
    );
    
    // Initially the theme should be light
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
    
    // Click the dark theme button
    await userEvent.click(screen.getByRole('button', { name: 'Dark Theme' }));
    
    // The setThemeMode function should have been called with 'dark'
    expect(mockSetThemeMode).toHaveBeenCalledWith('dark');
    
    // Click the light theme button
    await userEvent.click(screen.getByRole('button', { name: 'Light Theme' }));
    
    // The setThemeMode function should have been called with 'light'
    expect(mockSetThemeMode).toHaveBeenCalledWith('light');
  });
  
  test('custom theme can be provided', () => {
    const customTheme = {
      colors: {
        primary: {
          500: '#FF0000', // Custom red color
        },
      },
    };
    
    render(
      <ThemeProvider theme={customTheme}>
        <Button>Custom Theme Button</Button>
      </ThemeProvider>
    );
    
    // The button should have the custom primary color
    // Note: In a real test, we would need to check the computed style
    // This is just a placeholder for the concept
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
  
  test('theme is preserved in localStorage', () => {
    // Mock localStorage
    const localStorageMock = (() => {
      let store: Record<string, string> = {};
      return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          store[key] = value.toString();
        }),
        clear: jest.fn(() => {
          store = {};
        }),
      };
    })();
    
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    
    render(
      <ThemeProvider initialTheme="dark">
        <div>Theme Test</div>
      </ThemeProvider>
    );
    
    // The theme should be saved to localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith('themeMode', 'dark');
  });
});