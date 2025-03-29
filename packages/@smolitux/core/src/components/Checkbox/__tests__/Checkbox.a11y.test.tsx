import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { a11y } from '@smolitux/testing';
import { Checkbox } from '../Checkbox';

describe('Checkbox Accessibility', () => {
  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(
      <Checkbox label="Test Checkbox" />
    );
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes for standard checkbox', () => {
    render(<Checkbox label="Test Checkbox" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toHaveAttribute('aria-required');
    expect(checkbox).not.toHaveAttribute('aria-invalid');
    expect(checkbox).not.toHaveAttribute('aria-disabled');
  });

  it('should have correct ARIA attributes for required checkbox', () => {
    render(<Checkbox label="Required Checkbox" isRequired />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-required', 'true');
    
    // Should have a visual indicator for required field
    const requiredIndicator = screen.getByText('*');
    expect(requiredIndicator).toBeInTheDocument();
    expect(requiredIndicator).toHaveAttribute('aria-hidden', 'true');
    
    // Should have a screen reader text for required field
    const srText = screen.getByText('(Erforderlich)');
    expect(srText).toHaveClass('sr-only');
  });

  it('should have correct ARIA attributes for invalid checkbox', () => {
    render(<Checkbox label="Invalid Checkbox" error="This field is required" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toHaveAttribute('aria-errormessage');
    
    const errorId = checkbox.getAttribute('aria-errormessage');
    const errorMessage = document.getElementById(errorId as string);
    expect(errorMessage).toHaveTextContent('This field is required');
    expect(errorMessage).toHaveAttribute('role', 'alert');
    expect(errorMessage).toHaveAttribute('aria-live', 'assertive');
  });

  it('should have correct ARIA attributes for disabled checkbox', () => {
    render(<Checkbox label="Disabled Checkbox" isDisabled />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-disabled', 'true');
    expect(checkbox).toBeDisabled();
    
    const label = screen.getByText('Disabled Checkbox');
    expect(label.parentElement).toHaveClass('opacity-50');
    expect(label.parentElement).toHaveClass('cursor-not-allowed');
  });

  it('should have correct ARIA attributes for indeterminate checkbox', () => {
    render(<Checkbox label="Indeterminate Checkbox" indeterminate />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  it('should have correct ARIA attributes for switch checkbox', () => {
    render(<Checkbox label="Switch Checkbox" isSwitch />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute('aria-roledescription', 'Schalter');
  });

  it('should have correct ARIA attributes for toggle checkbox', () => {
    render(<Checkbox label="Toggle Checkbox" isToggle />);
    
    const toggleElement = screen.getByRole('switch');
    expect(toggleElement).toBeInTheDocument();
    expect(toggleElement).toHaveAttribute('aria-roledescription', 'Schalter');
  });

  it('should have correct ARIA attributes for button checkbox', () => {
    render(<Checkbox label="Button Checkbox" isButton />);
    
    const buttonElement = screen.getByRole('checkbox');
    expect(buttonElement).toBeInTheDocument();
  });

  it('should support keyboard interaction', () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Keyboard Checkbox" onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    
    // Focus the checkbox
    checkbox.focus();
    expect(document.activeElement).toBe(checkbox);
    
    // Press space to toggle
    fireEvent.keyDown(checkbox, { key: ' ' });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should associate label with checkbox using htmlFor', () => {
    render(<Checkbox label="Labeled Checkbox" />);
    
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Labeled Checkbox');
    
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', checkbox.id);
  });

  it('should make helper text accessible', () => {
    render(<Checkbox label="Checkbox with Helper" helperText="This is a helper text" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-describedby');
    
    const helperId = checkbox.getAttribute('aria-describedby');
    const helperText = document.getElementById(helperId as string);
    expect(helperText).toHaveTextContent('This is a helper text');
  });

  it('should make success message accessible', () => {
    render(<Checkbox label="Checkbox with Success" successMessage="Successfully validated" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-describedby');
    
    const successId = checkbox.getAttribute('aria-describedby');
    const successMessage = document.getElementById(successId as string);
    expect(successMessage).toHaveTextContent('Successfully validated');
    expect(successMessage).toHaveAttribute('role', 'status');
    expect(successMessage).toHaveAttribute('aria-live', 'polite');
  });

  it('should support hidden label for screenreaders', () => {
    render(<Checkbox label="Hidden Label" hideLabel />);
    
    const label = screen.getByText('Hidden Label');
    expect(label.parentElement).toHaveClass('sr-only');
  });

  it('should support description for screenreaders', () => {
    render(<Checkbox label="Described Checkbox" description="This is a detailed description" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-describedby');
    
    const descriptionId = checkbox.getAttribute('aria-describedby')?.split(' ')[0];
    const description = document.getElementById(descriptionId as string);
    expect(description).toHaveTextContent('This is a detailed description');
    expect(description).toHaveClass('sr-only');
  });
});