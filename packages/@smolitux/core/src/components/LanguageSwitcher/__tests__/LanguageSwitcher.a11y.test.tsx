import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { LanguageSwitcherA11y } from '../LanguageSwitcher.a11y';
import { I18nProvider } from '../../../i18n/I18nProvider';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

// Mock für die I18n-Funktionalität
jest.mock('../../../i18n/I18nProvider', () => ({
  useI18n: () => ({
    locale: 'de',
    setLocale: jest.fn(),
  }),
  I18nProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('LanguageSwitcher Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <I18nProvider>
        <LanguageSwitcherA11y
          locales={['de', 'en', 'fr']}
          ariaLabel="Sprache auswählen"
        />
      </I18nProvider>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render dropdown variant with correct ARIA attributes', () => {
    render(
      <I18nProvider>
        <LanguageSwitcherA11y
          variant="dropdown"
          locales={['de', 'en', 'fr']}
          ariaLabel="Sprache auswählen"
        />
      </I18nProvider>
    );
    
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toHaveAttribute('aria-haspopup', 'listbox');
    expect(dropdown).toHaveAttribute('aria-expanded', 'false');
    expect(dropdown).toHaveAttribute('aria-label', 'Sprache auswählen');
    expect(dropdown).toHaveAttribute('aria-controls', 'language-options');
  });

  it('should open dropdown on click and show options with correct ARIA attributes', () => {
    render(
      <I18nProvider>
        <LanguageSwitcherA11y
          variant="dropdown"
          locales={['de', 'en', 'fr']}
          ariaLabel="Sprache auswählen"
        />
      </I18nProvider>
    );
    
    const dropdown = screen.getByRole('combobox');
    fireEvent.click(dropdown);
    
    expect(dropdown).toHaveAttribute('aria-expanded', 'true');
    
    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();
    expect(listbox).toHaveAttribute('aria-label', 'Sprache auswählen');
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveAttribute('aria-selected', 'true'); // de ist aktiv
  });

  it('should handle keyboard navigation in dropdown', () => {
    render(
      <I18nProvider>
        <LanguageSwitcherA11y
          variant="dropdown"
          locales={['de', 'en', 'fr']}
          ariaLabel="Sprache auswählen"
        />
      </I18nProvider>
    );
    
    const dropdown = screen.getByRole('combobox');
    
    // Öffne Dropdown mit Enter
    fireEvent.keyDown(dropdown, { key: 'Enter' });
    expect(dropdown).toHaveAttribute('aria-expanded', 'true');
    
    // Navigiere mit Pfeiltasten
    fireEvent.keyDown(dropdown, { key: 'ArrowDown' });
    
    // Schließe Dropdown mit Escape
    fireEvent.keyDown(dropdown, { key: 'Escape' });
    expect(dropdown).toHaveAttribute('aria-expanded', 'false');
  });

  it('should render select variant with correct ARIA attributes', () => {
    render(
      <I18nProvider>
        <LanguageSwitcherA11y
          variant="select"
          locales={['de', 'en', 'fr']}
          ariaLabel="Sprache auswählen"
        />
      </I18nProvider>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-label', 'Sprache auswählen');
    
    // Überprüfe, ob das Label für Screenreader vorhanden ist
    const label = screen.getByText('Sprache auswählen');
    expect(label).toHaveClass('sr-only');
  });

  it('should render buttons variant with correct ARIA attributes', () => {
    render(
      <I18nProvider>
        <LanguageSwitcherA11y
          variant="buttons"
          locales={['de', 'en', 'fr']}
          ariaLabel="Sprache auswählen"
        />
      </I18nProvider>
    );
    
    const radiogroup = screen.getByRole('radiogroup');
    expect(radiogroup).toHaveAttribute('aria-label', 'Sprache auswählen');
    
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    expect(radios[0]).toHaveAttribute('aria-checked', 'true'); // de ist aktiv
  });

  it('should render flags variant with correct ARIA attributes', () => {
    render(
      <I18nProvider>
        <LanguageSwitcherA11y
          variant="flags"
          locales={['de', 'en', 'fr']}
          ariaLabel="Sprache auswählen"
        />
      </I18nProvider>
    );
    
    const radiogroup = screen.getByRole('radiogroup');
    expect(radiogroup).toHaveAttribute('aria-label', 'Sprache auswählen');
    
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    expect(radios[0]).toHaveAttribute('aria-checked', 'true'); // de ist aktiv
  });

  it('should render minimal variant with correct ARIA attributes', () => {
    render(
      <I18nProvider>
        <LanguageSwitcherA11y
          variant="minimal"
          locales={['de', 'en', 'fr']}
          ariaLabel="Sprache auswählen"
        />
      </I18nProvider>
    );
    
    const combobox = screen.getByRole('combobox');
    expect(combobox).toHaveAttribute('aria-label', 'Sprache auswählen');
    expect(combobox).toHaveAttribute('aria-haspopup', 'listbox');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
  });

  it('should render with description for screen readers', () => {
    render(
      <I18nProvider>
        <LanguageSwitcherA11y
          variant="dropdown"
          locales={['de', 'en', 'fr']}
          ariaLabel="Sprache auswählen"
          description="Wählen Sie Ihre bevorzugte Sprache"
        />
      </I18nProvider>
    );
    
    const description = screen.getByText('Wählen Sie Ihre bevorzugte Sprache');
    expect(description).toHaveClass('sr-only');
    
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toHaveAttribute('aria-describedby', 'language-switcher-description');
  });

  it('should render with live region for announcements', () => {
    render(
      <I18nProvider>
        <LanguageSwitcherA11y
          variant="dropdown"
          locales={['de', 'en', 'fr']}
          ariaLabel="Sprache auswählen"
          liveRegion
        />
      </I18nProvider>
    );
    
    const liveRegion = screen.getByRole('combobox').parentElement?.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion).toHaveClass('sr-only');
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
  });

  it('should handle disabled state correctly', () => {
    render(
      <I18nProvider>
        <LanguageSwitcherA11y
          variant="dropdown"
          locales={['de', 'en', 'fr']}
          ariaLabel="Sprache auswählen"
          disabled
        />
      </I18nProvider>
    );
    
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toHaveAttribute('aria-disabled', 'true');
    expect(dropdown).toHaveAttribute('tabIndex', '-1');
    expect(dropdown.parentElement).toHaveClass('disabled');
  });

  it('should handle custom ARIA attributes correctly', () => {
    render(
      <I18nProvider>
        <LanguageSwitcherA11y
          variant="dropdown"
          locales={['de', 'en', 'fr']}
          ariaLabel="Sprache auswählen"
          ariaLabelledby="custom-label"
          ariaDescribedby="custom-description"
          ariaKeyshortcuts="Alt+L"
          ariaBusy
        />
      </I18nProvider>
    );
    
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toHaveAttribute('aria-labelledby', 'custom-label');
    expect(dropdown).toHaveAttribute('aria-describedby', 'custom-description');
    expect(dropdown).toHaveAttribute('aria-keyshortcuts', 'Alt+L');
    expect(dropdown).toHaveAttribute('aria-busy', 'true');
  });
});