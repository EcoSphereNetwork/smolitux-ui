// packages/@smolitux/core/src/components/Input/__tests__/Input.a11y.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Input } from '../';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('Input Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Input.A11y
        label="Email"
        placeholder="name@example.com"
        type="email"
        helperText="Wir werden Ihre Email niemals teilen."
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <Input.A11y
        label="Email"
        placeholder="name@example.com"
        type="email"
        helperText="Wir werden Ihre Email niemals teilen."
        isRequired
        id="test-email"
      />
    );

    const input = screen.getByLabelText('Email', { exact: false });
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('aria-describedby');

    const helperText = screen.getByText('Wir werden Ihre Email niemals teilen.');
    expect(helperText.id).toBe(input.getAttribute('aria-describedby'));
  });

  it('should handle error states correctly', () => {
    render(
      <Input.A11y
        label="Email"
        placeholder="name@example.com"
        type="email"
        error="Ungültige Email-Adresse"
        isInvalid
      />
    );

    const input = screen.getByLabelText('Email', { exact: false });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-errormessage');

    const errorMessage = screen.getByText('Ungültige Email-Adresse');
    expect(errorMessage).toHaveAttribute('role', 'alert');
    expect(errorMessage.id).toBe(input.getAttribute('aria-errormessage'));
  });

  it('should handle success states correctly', () => {
    render(
      <Input.A11y
        label="Email"
        placeholder="name@example.com"
        type="email"
        successMessage="Email-Adresse ist verfügbar"
        isSuccess
      />
    );

    const input = screen.getByLabelText('Email', { exact: false });
    expect(input).toHaveAttribute('aria-describedby');

    const successMessage = screen.getByText('Email-Adresse ist verfügbar');
    expect(successMessage).toHaveAttribute('role', 'status');
    expect(successMessage.id).toBe(input.getAttribute('aria-describedby'));
  });

  it('should handle disabled state correctly', () => {
    render(<Input.A11y label="Email" placeholder="name@example.com" type="email" isDisabled />);

    const input = screen.getByLabelText('Email', { exact: false });
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-disabled', 'true');
  });

  it('should handle readonly state correctly', () => {
    render(
      <Input.A11y
        label="Email"
        placeholder="name@example.com"
        type="email"
        isReadOnly
        value="test@example.com"
      />
    );

    const input = screen.getByLabelText('Email', { exact: false });
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveAttribute('aria-readonly', 'true');
  });

  it('should handle password toggle correctly', () => {
    render(<Input.A11y label="Passwort" type="password" showPasswordToggle />);

    const input = screen.getByLabelText('Passwort', { selector: 'input' });
    expect(input).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByRole('button', { name: 'Passwort anzeigen' });
    fireEvent.click(toggleButton);

    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: 'Passwort verbergen' })).toBeInTheDocument();
  });

  it('should handle clearable input correctly', () => {
    const handleClear = jest.fn();
    render(
      <Input.A11y
        label="Suche"
        type="search"
        isClearable
        onClear={handleClear}
        defaultValue="Suchbegriff"
      />
    );

    const input = screen.getByLabelText('Suche', { exact: false });
    expect(input).toHaveValue('Suchbegriff');

    const clearButton = screen.getByRole('button', { name: 'Eingabe löschen' });
    fireEvent.click(clearButton);

    expect(handleClear).toHaveBeenCalled();
  });

  it('should handle counter correctly', () => {
    render(
      <Input.A11y
        label="Kommentar"
        showCounter
        maxLength={100}
        defaultValue="Dies ist ein Testkommentar"
      />
    );

    const counter = screen.getByText('26/100 Zeichen');
    expect(counter).toBeInTheDocument();

    // Überprüfe, ob die Screenreader-Information vorhanden ist
    expect(
      screen.getByText('74 Zeichen verbleibend', { selector: '.sr-only' })
    ).toBeInTheDocument();
  });

  it('should handle progress bar correctly', () => {
    render(<Input.A11y label="Fortschritt" showProgressBar progressValue={50} progressMax={100} />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('should handle hidden label correctly', () => {
    render(<Input.A11y label="Verstecktes Label" hideLabel />);

    const label = screen.getByText('Verstecktes Label');
    expect(label).toHaveClass('sr-only');

    const input = screen.getByLabelText('Verstecktes Label');
    expect(input).toBeInTheDocument();
  });

  it('should handle keyboard interactions correctly', () => {
    const handleKeyDown = jest.fn();
    render(<Input.A11y label="Tastatur" onKeyDown={handleKeyDown} />);

    const input = screen.getByLabelText('Tastatur', { exact: false });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleKeyDown).toHaveBeenCalled();
  });

  it('should handle focus and blur correctly', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(<Input.A11y label="Fokus" onFocus={handleFocus} onBlur={handleBlur} />);

    const input = screen.getByLabelText('Fokus', { exact: false });
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should handle clickable icons correctly', () => {
    const handleLeftIconClick = jest.fn();
    const handleRightIconClick = jest.fn();
    render(
      <Input.A11y
        label="Icons"
        leftIcon={<span>L</span>}
        rightIcon={<span>R</span>}
        isLeftIconClickable
        isRightIconClickable
        onLeftIconClick={handleLeftIconClick}
        onRightIconClick={handleRightIconClick}
      />
    );

    const leftIcon = screen.getAllByRole('button')[0];
    const rightIcon = screen.getAllByRole('button')[1];

    fireEvent.click(leftIcon);
    expect(handleLeftIconClick).toHaveBeenCalled();

    fireEvent.click(rightIcon);
    expect(handleRightIconClick).toHaveBeenCalled();
  });
});
