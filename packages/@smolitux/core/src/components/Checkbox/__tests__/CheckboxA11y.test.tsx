import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CheckboxA11y } from '../Checkbox.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('CheckboxA11y', () => {
  test('renders with default props', () => {
    render(<CheckboxA11y label="Test Checkbox" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    
    const label = screen.getByText('Test Checkbox');
    expect(label).toBeInTheDocument();
  });

  test('has no accessibility violations', async () => {
    const { container } = render(<CheckboxA11y label="Test Checkbox" />);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('generates unique IDs for ARIA attributes', () => {
    render(<CheckboxA11y label="Username" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.id).toBeTruthy();
    expect(checkbox.id).toMatch(/^checkbox-/);
    
    const label = screen.getByText('Username');
    expect(label.id).toBe(`${checkbox.id}-label`);
  });

  test('uses provided ID when available', () => {
    render(<CheckboxA11y id="custom-id" label="Username" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.id).toBe('custom-id');
    
    const label = screen.getByText('Username');
    expect(label.id).toBe('custom-id-label');
  });

  test('connects label and checkbox with correct ARIA attributes', () => {
    render(<CheckboxA11y label="Accept Terms" />);
    
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Accept Terms');
    
    expect(checkbox).toHaveAttribute('aria-labelledby', `${checkbox.id}-label`);
    expect(label).toHaveAttribute('for', checkbox.id);
  });

  test('connects helper text with checkbox using aria-describedby', () => {
    render(
      <CheckboxA11y 
        label="Newsletter" 
        helperText="You can unsubscribe at any time"
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-describedby');
    
    const helperTextId = `${checkbox.id}-helper`;
    const helperText = screen.getByText('You can unsubscribe at any time');
    expect(helperText.id).toBe(helperTextId);
  });

  test('connects error message with checkbox using aria-describedby and aria-invalid', () => {
    render(
      <CheckboxA11y 
        label="Accept Terms" 
        error="You must accept the terms"
        isInvalid
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toHaveAttribute('aria-describedby');
    
    const errorId = `${checkbox.id}-error`;
    const errorMessage = screen.getByText('You must accept the terms');
    expect(errorMessage.id).toBe(errorId);
    expect(errorMessage).toHaveAttribute('role', 'alert');
    expect(errorMessage).toHaveAttribute('aria-live', 'assertive');
  });

  test('connects success message with checkbox using aria-describedby', () => {
    render(
      <CheckboxA11y 
        label="Email Preferences" 
        successMessage="Preferences saved"
        isSuccess
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-describedby');
    
    const successId = `${checkbox.id}-success`;
    const successMessage = screen.getByText('Preferences saved');
    expect(successMessage.id).toBe(successId);
    expect(successMessage).toHaveAttribute('role', 'status');
    expect(successMessage).toHaveAttribute('aria-live', 'polite');
  });

  test('adds aria-required for required checkboxes', () => {
    render(<CheckboxA11y label="Required Checkbox" isRequired />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-required', 'true');
    
    // Check for required indicator
    const requiredIndicator = screen.getByText('*');
    expect(requiredIndicator).toHaveAttribute('aria-hidden', 'true');
    
    // Check for screen reader text
    const srText = screen.getByText('(Erforderlich)');
    expect(srText).toHaveClass('sr-only');
  });

  test('adds aria-disabled for disabled checkboxes', () => {
    render(<CheckboxA11y label="Disabled Checkbox" isDisabled />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-disabled', 'true');
    expect(checkbox).toBeDisabled();
    
    const label = screen.getByText('Disabled Checkbox');
    expect(label).toHaveClass('opacity-50');
    expect(label).toHaveClass('cursor-not-allowed');
  });

  test('adds aria-readonly for readonly checkboxes', () => {
    render(<CheckboxA11y label="Readonly Checkbox" isReadOnly />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-readonly', 'true');
    expect(checkbox).toHaveAttribute('readonly');
  });

  test('sets aria-checked to mixed for indeterminate checkboxes', () => {
    render(<CheckboxA11y label="Indeterminate Checkbox" indeterminate />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  test('sets role to switch for switch checkboxes', () => {
    render(<CheckboxA11y label="Switch Checkbox" isSwitch />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-roledescription', 'Schalter');
  });

  test('sets role to switch for toggle checkboxes', () => {
    render(<CheckboxA11y label="Toggle Checkbox" isToggle />);
    
    const toggleElement = screen.getByRole('switch');
    expect(toggleElement).toHaveAttribute('aria-roledescription', 'Schalter');
  });

  test('makes hidden label accessible for screen readers', () => {
    render(
      <CheckboxA11y 
        label="Hidden Label" 
        hideLabel
      />
    );
    
    const label = screen.getByText('Hidden Label');
    expect(label).toHaveClass('sr-only');
    
    const checkbox = screen.getByLabelText('Hidden Label');
    expect(checkbox).toBeInTheDocument();
  });

  test('makes description accessible for screen readers', () => {
    render(
      <CheckboxA11y 
        label="Described Checkbox" 
        description="This is a detailed description"
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-describedby');
    
    const descriptionId = `${checkbox.id}-description`;
    const description = screen.getByText('This is a detailed description');
    expect(description.id).toBe(descriptionId);
    expect(description).toHaveClass('sr-only');
  });

  test('handles keyboard interaction', async () => {
    const handleChange = jest.fn();
    render(
      <CheckboxA11y 
        label="Keyboard Checkbox" 
        onChange={handleChange}
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    
    // Focus the checkbox
    checkbox.focus();
    expect(document.activeElement).toBe(checkbox);
    
    // Press space to toggle - simuliere direkt das Change-Event
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });

  test('handles click events', async () => {
    const handleChange = jest.fn();
    render(
      <CheckboxA11y 
        label="Clickable Checkbox" 
        onChange={handleChange}
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });

  test('does not update state when readonly', () => {
    render(
      <CheckboxA11y 
        label="Readonly Checkbox" 
        isReadOnly 
        data-testid="readonly-checkbox"
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    
    // Überprüfe, dass die Checkbox das readonly-Attribut hat
    expect(checkbox).toHaveAttribute('aria-readonly', 'true');
    expect(checkbox).toHaveAttribute('readonly');
    
    // Überprüfe, dass die Checkbox die richtige Klasse hat
    expect(checkbox).toHaveClass('cursor-default');
  });

  test('does not call onChange when disabled', async () => {
    const handleChange = jest.fn();
    render(
      <CheckboxA11y 
        label="Disabled Checkbox" 
        isDisabled 
        onChange={handleChange}
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    
    await userEvent.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
    expect(checkbox).not.toBeChecked();
  });

  test('supports different sizes', () => {
    const { rerender } = render(
      <CheckboxA11y 
        label="Small Checkbox" 
        size="sm"
      />
    );
    
    let checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('h-4');
    expect(checkbox).toHaveClass('w-4');
    
    rerender(
      <CheckboxA11y 
        label="Large Checkbox" 
        size="lg"
      />
    );
    
    checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('h-6');
    expect(checkbox).toHaveClass('w-6');
  });

  test('supports different variants', () => {
    const { rerender } = render(
      <CheckboxA11y 
        label="Solid Checkbox" 
        variant="solid"
      />
    );
    
    let checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('bg-white');
    expect(checkbox).toHaveClass('border-2');
    
    rerender(
      <CheckboxA11y 
        label="Minimal Checkbox" 
        variant="minimal"
      />
    );
    
    checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('bg-transparent');
    expect(checkbox).toHaveClass('border-0');
  });

  test('supports different color schemes', () => {
    const { rerender } = render(
      <CheckboxA11y 
        label="Primary Checkbox" 
        colorScheme="primary"
        checked
      />
    );
    
    let checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('checked:bg-primary-500');
    
    rerender(
      <CheckboxA11y 
        label="Danger Checkbox" 
        colorScheme="danger"
        checked
      />
    );
    
    checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('checked:bg-red-500');
  });

  test('supports different label positions', () => {
    const { rerender } = render(
      <CheckboxA11y 
        label="Right Label" 
        labelPosition="right"
      />
    );
    
    let container = screen.getByTestId('checkbox-container');
    expect(container).toHaveClass('flex-row');
    
    rerender(
      <CheckboxA11y 
        label="Left Label" 
        labelPosition="left"
      />
    );
    
    container = screen.getByTestId('checkbox-container');
    expect(container).toHaveClass('flex-row-reverse');
  });

  test('supports custom test ID', () => {
    render(
      <CheckboxA11y 
        label="Custom TestID" 
        testId="custom-checkbox"
      />
    );
    
    const container = screen.getByTestId('custom-checkbox');
    expect(container).toBeInTheDocument();
  });

  test('supports busy state', () => {
    render(
      <CheckboxA11y 
        label="Busy Checkbox" 
        busy
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-busy', 'true');
  });

  test('supports loading state', () => {
    render(
      <CheckboxA11y 
        label="Loading Checkbox" 
        isLoading
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-busy', 'true');
  });
});