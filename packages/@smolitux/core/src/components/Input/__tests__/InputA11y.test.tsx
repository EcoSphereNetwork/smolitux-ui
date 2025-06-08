import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputA11y } from '../Input.a11y';

describe('InputA11y', () => {
  test('generates unique IDs for ARIA attributes', () => {
    render(<InputA11y label="Username" />);

    const input = screen.getByLabelText('Username');
    expect(input.id).toBeTruthy();

    const label = screen.getByText('Username');
    expect(label.id).toBe(`label-${input.id}`);
  });

  test('uses provided ID when available', () => {
    render(<InputA11y id="custom-id" label="Username" />);

    const input = screen.getByLabelText('Username');
    expect(input.id).toBe('custom-id');

    const label = screen.getByText('Username');
    expect(label.id).toBe('label-custom-id');
  });

  test('connects label and input with correct ARIA attributes', () => {
    render(<InputA11y label="Email Address" />);

    const input = screen.getByLabelText('Email Address');
    const label = screen.getByText('Email Address');

    expect(label).toHaveAttribute('for', input.id);
    expect(label.id).toBe(`label-${input.id}`);
  });

  test('connects helper text with input using aria-describedby', () => {
    render(<InputA11y label="Email" helperText="We'll never share your email" />);

    const input = screen.getByLabelText('Email');
    const helperText = screen.getByText("We'll never share your email");

    expect(input).toHaveAttribute('aria-describedby', helperText.id);
  });

  test('connects error message with input using aria-errormessage', () => {
    render(<InputA11y label="Email" error="Invalid email format" isInvalid />);

    const input = screen.getByLabelText('Email');
    const errorMessage = screen.getByText('Invalid email format');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-errormessage', errorMessage.id);
  });

  test('connects success message with input using aria-describedby', () => {
    render(<InputA11y label="Username" successMessage="Username is available" isSuccess />);

    const input = screen.getByLabelText('Username');
    const successMessage = screen.getByText('Username is available');

    expect(input).toHaveAttribute('aria-describedby', successMessage.id);
  });

  test('adds aria-required for required inputs', () => {
    render(<InputA11y label="Username" isRequired />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  test('adds aria-disabled for disabled inputs', () => {
    render(<InputA11y label="Username" isDisabled />);

    const input = screen.getByLabelText('Username');
    expect(input).toHaveAttribute('aria-disabled', 'true');
    expect(input).toBeDisabled();
  });

  test('adds aria-readonly for readonly inputs', () => {
    render(<InputA11y label="Username" isReadOnly />);

    const input = screen.getByLabelText('Username');
    expect(input).toHaveAttribute('aria-readonly', 'true');
    expect(input).toHaveAttribute('readonly');
  });

  test('makes password toggle button accessible', async () => {
    render(<InputA11y label="Password" type="password" showPasswordToggle />);

    const toggleButton = screen.getByRole('button', { name: 'Passwort anzeigen' });
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(toggleButton);

    const toggleButtonAfterClick = screen.getByRole('button', { name: 'Passwort verbergen' });
    expect(toggleButtonAfterClick).toHaveAttribute('aria-pressed', 'true');
  });

  test('makes clear button accessible', () => {
    render(<InputA11y label="Search" isClearable defaultValue="test query" />);

    const clearButton = screen.getByRole('button', { name: 'Eingabe löschen' });
    expect(clearButton).toBeInTheDocument();
  });

  test('makes counter accessible for screen readers', () => {
    render(
      <InputA11y
        label="Comment"
        showCounter
        maxLength={100}
        defaultValue="This is a test comment"
      />
    );

    // Prüfe, ob der Counter-Container existiert
    const counterContainer = screen.getByLabelText('Comment').getAttribute('aria-describedby');
    expect(counterContainer).toBeTruthy();

    // Prüfe, ob die Screenreader-Information vorhanden ist
    const srCounter = screen.getByText(/Zeichen verbleibend/, { selector: '.sr-only' });
    expect(srCounter).toBeInTheDocument();
  });

  test('makes progress bar accessible', () => {
    render(<InputA11y label="Progress" showProgressBar progressValue={50} progressMax={100} />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  test('makes hidden label accessible for screen readers', () => {
    render(<InputA11y label="Hidden Label" hideLabel />);

    const label = screen.getByText('Hidden Label');
    expect(label).toHaveClass('sr-only');

    const input = screen.getByLabelText('Hidden Label');
    expect(input).toBeInTheDocument();
  });

  test('makes clickable icons accessible', () => {
    render(
      <InputA11y
        label="Search"
        leftIcon={<span>🔍</span>}
        rightIcon={<span>❌</span>}
        isLeftIconClickable
        isRightIconClickable
      />
    );

    const leftIconButton = screen.getAllByRole('button')[0];
    expect(leftIconButton).toHaveAttribute('aria-label');

    const rightIconButton = screen.getAllByRole('button')[1];
    expect(rightIconButton).toHaveAttribute('aria-label');
  });

  test('handles keyboard navigation for password toggle', async () => {
    render(<InputA11y label="Password" type="password" showPasswordToggle />);

    const toggleButton = screen.getByRole('button', { name: 'Passwort anzeigen' });
    toggleButton.focus();

    await userEvent.keyboard('{Enter}');

    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'text');
  });

  test('handles keyboard navigation for clear button', async () => {
    const handleClear = jest.fn();
    render(
      <InputA11y label="Search" isClearable defaultValue="test query" onClear={handleClear} />
    );

    const clearButton = screen.getByRole('button', { name: 'Eingabe löschen' });
    clearButton.focus();

    await userEvent.keyboard('{Enter}');

    expect(handleClear).toHaveBeenCalled();
  });
});
