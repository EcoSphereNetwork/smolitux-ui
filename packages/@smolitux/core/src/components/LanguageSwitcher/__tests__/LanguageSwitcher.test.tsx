import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSwitcher } from '../LanguageSwitcher';

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

describe('LanguageSwitcher', () => {
  it('renders correctly with default props', () => {
    render(<LanguageSwitcher />);
    
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    render(<LanguageSwitcher />);
    
    const switcher = screen.getByTestId('language-switcher-button');
    fireEvent.click(switcher);
    
    expect(screen.getByText('Deutsch')).toBeInTheDocument();
    expect(screen.getByText('Français')).toBeInTheDocument();
  });

  it('calls onChange when a language is selected', () => {
    const handleChange = jest.fn();
    render(<LanguageSwitcher onChange={handleChange} />);
    
    const switcher = screen.getByTestId('language-switcher-button');
    fireEvent.click(switcher);
    
    const deutschOption = screen.getByText('Deutsch');
    fireEvent.click(deutschOption);
    
    expect(handleChange).toHaveBeenCalledWith('de');
  });

  it('closes dropdown when a language is selected', () => {
    render(<LanguageSwitcher />);
    
    const switcher = screen.getByTestId('language-switcher-button');
    fireEvent.click(switcher);
    
    const deutschOption = screen.getByText('Deutsch');
    fireEvent.click(deutschOption);
    
    expect(screen.queryByText('Français')).not.toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <LanguageSwitcher />
      </div>
    );
    
    const switcher = screen.getByTestId('language-switcher-button');
    fireEvent.click(switcher);
    
    expect(screen.getByText('Deutsch')).toBeInTheDocument();
    
    const outside = screen.getByTestId('outside');
    fireEvent.click(outside);
    
    expect(screen.queryByText('Deutsch')).not.toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<LanguageSwitcher className="custom-switcher" />);
    
    const switcher = screen.getByTestId('language-switcher');
    expect(switcher).toHaveClass('custom-switcher');
  });

  it('renders with custom style', () => {
    render(<LanguageSwitcher style={{ backgroundColor: 'lightblue' }} />);
    
    const switcher = screen.getByTestId('language-switcher');
    expect(switcher).toHaveStyle('background-color: lightblue');
  });

  it('renders with custom dropdown position', () => {
    render(<LanguageSwitcher dropdownPosition="right" />);
    
    const switcher = screen.getByTestId('language-switcher-button');
    fireEvent.click(switcher);
    
    const dropdown = screen.getByTestId('language-switcher-dropdown');
    expect(dropdown).toHaveClass('dropdown-right');
  });

  it('renders with showFlag option', () => {
    const { rerender } = render(<LanguageSwitcher showFlag={true} />);
    
    expect(screen.getByText('EN')).toBeInTheDocument();
    
    rerender(<LanguageSwitcher showFlag={false} />);
    
    expect(screen.queryByText('EN')).not.toBeInTheDocument();
  });

  it('renders with showName option', () => {
    const { rerender } = render(<LanguageSwitcher showName={true} />);
    
    expect(screen.getByText('English')).toBeInTheDocument();
    
    rerender(<LanguageSwitcher showName={false} />);
    
    expect(screen.queryByText('English')).not.toBeInTheDocument();
  });

  it('renders with custom size', () => {
    render(<LanguageSwitcher size="lg" />);
    
    const switcher = screen.getByTestId('language-switcher');
    expect(switcher).toHaveClass('size-lg');
  });

  it('renders with aria attributes for accessibility', () => {
    render(<LanguageSwitcher aria-label="Select language" />);
    
    const button = screen.getByTestId('language-switcher-button');
    expect(button).toHaveAttribute('aria-label', 'Select language');
    expect(button).toHaveAttribute('aria-haspopup', 'listbox');
  });

  it('renders in disabled state', () => {
    render(<LanguageSwitcher disabled />);
    
    const button = screen.getByTestId('language-switcher-button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('cursor-not-allowed');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<LanguageSwitcher variant="dropdown" />);
    expect(screen.getByTestId('language-switcher')).toHaveClass('language-switcher-dropdown');
    
    rerender(<LanguageSwitcher variant="select" />);
    expect(screen.getByTestId('language-switcher')).toHaveClass('language-switcher-select');
    
    rerender(<LanguageSwitcher variant="buttons" />);
    expect(screen.getByTestId('language-switcher')).toHaveClass('language-switcher-buttons');
    
    rerender(<LanguageSwitcher variant="flags" />);
    expect(screen.getByTestId('language-switcher')).toHaveClass('language-switcher-flags');
    
    rerender(<LanguageSwitcher variant="minimal" />);
    expect(screen.getByTestId('language-switcher')).toHaveClass('language-switcher-minimal');
  });

  it('highlights current language when highlightCurrent is true', () => {
    render(<LanguageSwitcher highlightCurrent={true} />);
    
    const button = screen.getByTestId('language-switcher-button');
    fireEvent.click(button);
    
    const enOption = screen.getByTestId('language-switcher-option-en');
    expect(enOption).toHaveClass('bg-primary-50');
  });
});