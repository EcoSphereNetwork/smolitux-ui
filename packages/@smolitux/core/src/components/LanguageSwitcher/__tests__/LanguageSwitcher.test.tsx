import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSwitcher } from '../LanguageSwitcher';

describe('LanguageSwitcher', () => {
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  it('renders correctly with default props', () => {
    render(
      <LanguageSwitcher 
        languages={languages} 
        currentLanguage="en" 
      />
    );
    
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('🇬🇧')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    render(
      <LanguageSwitcher 
        languages={languages} 
        currentLanguage="en" 
      />
    );
    
    const switcher = screen.getByText('English');
    fireEvent.click(switcher);
    
    expect(screen.getByText('Deutsch')).toBeInTheDocument();
    expect(screen.getByText('Français')).toBeInTheDocument();
  });

  it('calls onLanguageChange when a language is selected', () => {
    const handleLanguageChange = jest.fn();
    render(
      <LanguageSwitcher 
        languages={languages} 
        currentLanguage="en" 
        onLanguageChange={handleLanguageChange}
      />
    );
    
    const switcher = screen.getByText('English');
    fireEvent.click(switcher);
    
    const deutschOption = screen.getByText('Deutsch');
    fireEvent.click(deutschOption);
    
    expect(handleLanguageChange).toHaveBeenCalledWith('de');
  });

  it('closes dropdown when a language is selected', () => {
    render(
      <LanguageSwitcher 
        languages={languages} 
        currentLanguage="en" 
      />
    );
    
    const switcher = screen.getByText('English');
    fireEvent.click(switcher);
    
    const deutschOption = screen.getByText('Deutsch');
    fireEvent.click(deutschOption);
    
    expect(screen.queryByText('Français')).not.toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <LanguageSwitcher 
          languages={languages} 
          currentLanguage="en" 
        />
      </div>
    );
    
    const switcher = screen.getByText('English');
    fireEvent.click(switcher);
    
    expect(screen.getByText('Deutsch')).toBeInTheDocument();
    
    const outside = screen.getByTestId('outside');
    fireEvent.mouseDown(outside);
    
    expect(screen.queryByText('Deutsch')).not.toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <LanguageSwitcher 
        languages={languages} 
        currentLanguage="en" 
        className="custom-switcher"
        data-testid="language-switcher"
      />
    );
    
    const switcher = screen.getByTestId('language-switcher');
    expect(switcher).toHaveClass('custom-switcher');
  });

  it('renders with custom style', () => {
    render(
      <LanguageSwitcher 
        languages={languages} 
        currentLanguage="en" 
        style={{ backgroundColor: 'lightblue' }}
        data-testid="language-switcher"
      />
    );
    
    const switcher = screen.getByTestId('language-switcher');
    expect(switcher).toHaveStyle('background-color: lightblue');
  });

  it('renders with custom dropdown position', () => {
    render(
      <LanguageSwitcher 
        languages={languages} 
        currentLanguage="en" 
        dropdownPosition="right"
        data-testid="language-switcher"
      />
    );
    
    const switcher = screen.getByTestId('language-switcher');
    fireEvent.click(switcher);
    
    const dropdown = screen.getByRole('listbox');
    expect(dropdown).toHaveClass('dropdown-right');
  });

  it('renders with showFlags option', () => {
    const { rerender } = render(
      <LanguageSwitcher 
        languages={languages} 
        currentLanguage="en" 
        showFlags={true}
      />
    );
    
    expect(screen.getByText('🇬🇧')).toBeInTheDocument();
    
    rerender(
      <LanguageSwitcher 
        languages={languages} 
        currentLanguage="en" 
        showFlags={false}
      />
    );
    
    expect(screen.queryByText('🇬🇧')).not.toBeInTheDocument();
  });

  it('renders with showNames option', () => {
    const { rerender } = render(
      <LanguageSwitcher 
        languages={languages} 
        currentLanguage="en" 
        showNames={true}
      />
    );
    
    expect(screen.getByText('English')).toBeInTheDocument();
    
    rerender(
      <LanguageSwitcher 
        languages={languages} 
        currentLanguage="en" 
        showNames={false}
      />
    );
    
    expect(screen.queryByText('English')).not.toBeInTheDocument();
  });

  it('renders with custom size', () => {
    render(
      <LanguageSwitcher 
        languages={languages} 
        currentLanguage="en" 
        size="large"
        data-testid="language-switcher"
      />
    );
    
    const switcher = screen.getByTestId('language-switcher');
    expect(switcher).toHaveClass('size-large');
  });

  it('renders with aria attributes for accessibility', () => {
    render(
      <LanguageSwitcher 
        languages={languages} 
        currentLanguage="en" 
        aria-label="Select language"
      />
    );
    
    const switcher = screen.getByRole('button');
    expect(switcher).toHaveAttribute('aria-label', 'Select language');
    expect(switcher).toHaveAttribute('aria-haspopup', 'listbox');
  });
});