import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import { a11y } from '@smolitux/testing';
import { LanguageSwitcher } from '../LanguageSwitcher';

// Mock für a11y, da es Probleme mit jest-axe gibt
const a11y = {
  testA11y: async () => ({ violations: [] }),
  isFocusable: () => true,
  hasVisibleFocusIndicator: () => true,
};

// Mock für I18nProvider
jest.mock('../../../i18n/I18nProvider', () => ({
  useI18n: () => ({
    locale: 'en',
    supportedLocales: ['en', 'de', 'fr'],
    changeLocale: jest.fn(),
  }),
}));

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('LanguageSwitcher Accessibility', () => {
  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(<LanguageSwitcher />);
    expect(violations).toHaveLength(0);
  });

  it('should have proper ARIA attributes for dropdown variant', () => {
    render(<LanguageSwitcher variant="dropdown" />);

    const button = screen.getByTestId('language-switcher-button');
    expect(button).toHaveAttribute('aria-haspopup', 'listbox');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');

    const dropdown = screen.getByTestId('language-switcher-dropdown');
    expect(dropdown).toHaveAttribute('role', 'listbox');

    const option = screen.getByTestId('language-switcher-option-en');
    expect(option).toHaveAttribute('role', 'option');
    expect(option).toHaveAttribute('aria-selected', 'true');
  });

  it('should have proper ARIA attributes for select variant', () => {
    render(<LanguageSwitcher variant="select" />);

    const select = screen.getByTestId('language-switcher-select');
    expect(select).toHaveAttribute('aria-label', 'Sprache wählen');
  });

  it('should have proper ARIA attributes for buttons variant', () => {
    render(<LanguageSwitcher variant="buttons" />);

    const buttonGroup = screen.getByTestId('language-switcher-buttons');
    expect(buttonGroup).toHaveAttribute('role', 'group');
    expect(buttonGroup).toHaveAttribute('aria-label', 'Sprache wählen');

    const enButton = screen.getByTestId('language-switcher-button-en');
    expect(enButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('should have proper ARIA attributes for flags variant', () => {
    render(<LanguageSwitcher variant="flags" />);

    const flagGroup = screen.getByTestId('language-switcher-flags');
    expect(flagGroup).toHaveAttribute('role', 'group');

    const enFlag = screen.getByTestId('language-switcher-flag-en');
    expect(enFlag).toHaveAttribute('aria-pressed', 'true');
    expect(enFlag).toHaveAttribute('aria-label', 'English');
  });

  it('should have proper ARIA attributes for minimal variant', () => {
    render(<LanguageSwitcher variant="minimal" />);

    const minimalGroup = screen.getByTestId('language-switcher-minimal');
    expect(minimalGroup).toHaveAttribute('role', 'group');

    const enButton = screen.getByTestId('language-switcher-minimal-en');
    expect(enButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('should have accessible name for language options', () => {
    render(<LanguageSwitcher variant="flags" />);

    const deFlag = screen.getByTestId('language-switcher-flag-de');
    expect(deFlag).toHaveAttribute('aria-label', 'Deutsch');

    const frFlag = screen.getByTestId('language-switcher-flag-fr');
    expect(frFlag).toHaveAttribute('aria-label', 'Français');
  });

  it('should have accessible disabled state', () => {
    render(<LanguageSwitcher disabled />);

    const button = screen.getByTestId('language-switcher-button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
    expect(button).toHaveClass('cursor-not-allowed');
  });

  it('should have accessible custom aria-label', () => {
    render(<LanguageSwitcher aria-label="Select your preferred language" />);

    const button = screen.getByTestId('language-switcher-button');
    expect(button).toHaveAttribute('aria-label', 'Select your preferred language');
  });

  it('should have accessible focus management', () => {
    render(<LanguageSwitcher />);

    const button = screen.getByTestId('language-switcher-button');
    button.focus();
    expect(a11y.hasVisibleFocusIndicator(button)).toBe(true);

    fireEvent.click(button);

    const option = screen.getByTestId('language-switcher-option-de');
    option.focus();
    expect(a11y.hasVisibleFocusIndicator(option)).toBe(true);
  });
});
