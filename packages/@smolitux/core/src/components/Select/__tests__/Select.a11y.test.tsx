import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Select } from '../';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
  { value: 'option4', label: 'Option 4', description: 'Dies ist Option 4' }
];

describe('Select Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Select.A11y 
        options={mockOptions}
        label="Wählen Sie eine Option"
        ariaLabel="Optionsauswahl"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <Select.A11y 
        options={mockOptions}
        label="Wählen Sie eine Option"
        ariaLabel="Optionsauswahl"
        description="Bitte wählen Sie eine der folgenden Optionen"
        id="test-select"
      />
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('id', 'test-select');
    expect(select).toHaveAttribute('aria-labelledby', 'test-select-label');
    expect(select).toHaveAttribute('aria-describedby', expect.stringContaining('test-select-description'));
    expect(select).toHaveAttribute('aria-haspopup', 'listbox');
    
    // Überprüfe die Beschreibung
    const description = screen.getByText('Bitte wählen Sie eine der folgenden Optionen');
    expect(description).toHaveClass('sr-only');
    expect(description.id).toBe('test-select-description');
    
    // Überprüfe das Label
    const label = screen.getByText('Wählen Sie eine Option');
    expect(label.id).toBe('test-select-label');
  });

  it('should handle error state correctly', () => {
    render(
      <Select.A11y 
        options={mockOptions}
        label="Wählen Sie eine Option"
        error="Bitte wählen Sie eine Option"
        ariaLabel="Optionsauswahl"
      />
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAttribute('aria-describedby', expect.stringContaining('error'));
    
    // Überprüfe die Fehlermeldung
    const error = screen.getByText('Bitte wählen Sie eine Option');
    expect(error).toHaveAttribute('role', 'alert');
    expect(error).toHaveAttribute('aria-live', 'assertive');
  });

  it('should handle helper text correctly', () => {
    render(
      <Select.A11y 
        options={mockOptions}
        label="Wählen Sie eine Option"
        helperText="Wählen Sie die Option, die am besten zu Ihnen passt"
        ariaLabel="Optionsauswahl"
      />
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-describedby', expect.stringContaining('helper'));
    
    // Überprüfe den Hilfetext
    const helperText = screen.getByText('Wählen Sie die Option, die am besten zu Ihnen passt');
    expect(helperText).toHaveAttribute('aria-live', 'polite');
  });

  it('should handle required state correctly', () => {
    render(
      <Select.A11y 
        options={mockOptions}
        label="Wählen Sie eine Option"
        required
        ariaLabel="Optionsauswahl"
      />
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-required', 'true');
    
    // Überprüfe das Sternchen im Label
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');

    // Überprüfe den versteckten Text für Screenreader
    expect(screen.getByText('(Erforderlich)')).toHaveClass('sr-only');
  });

  it('should handle disabled state correctly', () => {
    render(
      <Select.A11y 
        options={mockOptions}
        label="Wählen Sie eine Option"
        disabled
        ariaLabel="Optionsauswahl"
      />
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
    expect(select).toHaveAttribute('aria-disabled', 'true');
    expect(select).toHaveClass('cursor-not-allowed');
    expect(select).toHaveClass('opacity-50');
  });

  it('should handle readonly state correctly', () => {
    render(
      <Select.A11y 
        options={mockOptions}
        label="Wählen Sie eine Option"
        readOnly
        ariaLabel="Optionsauswahl"
      />
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-readonly', 'true');
    expect(select).toHaveClass('cursor-default');
  });

  it('should handle option selection correctly', () => {
    const handleChange = jest.fn();
    
    render(
      <Select.A11y 
        options={mockOptions}
        label="Wählen Sie eine Option"
        onChange={handleChange}
        ariaLabel="Optionsauswahl"
      />
    );
    
    const select = screen.getByRole('combobox');
    
    // Wähle eine Option aus
    fireEvent.change(select, { target: { value: 'option2' } });
    
    // Der onChange-Handler sollte aufgerufen worden sein
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls[0][0].target.value).toBe('option2');
  });

  it('should handle multi-select correctly', () => {
    const handleChange = jest.fn();
    
    render(
      <Select.A11y 
        options={mockOptions}
        label="Wählen Sie Optionen"
        isMulti
        onChange={handleChange}
        ariaLabel="Mehrfachauswahl"
      />
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('multiple');
    expect(select).toHaveAttribute('size', '5');
    
    // Überprüfe die Screenreader-Anweisungen
    const instructions = screen.getByText(/Drücken Sie die Pfeiltasten, um durch die Optionen zu navigieren. Drücken Sie die Leertaste, um eine Option auszuwählen oder abzuwählen. Sie können mehrere Optionen auswählen./);
    expect(instructions).toHaveClass('sr-only');
  });

  it('should handle max selections correctly', () => {
    render(
      <Select.A11y 
        options={mockOptions}
        label="Wählen Sie Optionen"
        isMulti
        maxSelections={2}
        ariaLabel="Mehrfachauswahl"
      />
    );
    
    // Überprüfe die Screenreader-Anweisungen
    const instructions = screen.getByText(/Sie können maximal 2 Optionen auswählen./);
    expect(instructions).toHaveClass('sr-only');
  });

  it('should handle option descriptions correctly', () => {
    render(
      <Select.A11y 
        options={mockOptions}
        label="Wählen Sie eine Option"
        ariaLabel="Optionsauswahl"
      />
    );
    
    // Überprüfe die versteckte Beschreibung für Option 4
    const optionDescription = screen.getByText('Dies ist Option 4');
    expect(optionDescription).toHaveClass('sr-only');
  });

  it('should handle keyboard navigation correctly', () => {
    const handleKeyDown = jest.fn();
    
    render(
      <Select.A11y 
        options={mockOptions}
        label="Wählen Sie eine Option"
        onKeyDown={handleKeyDown}
        ariaLabel="Optionsauswahl"
      />
    );
    
    const select = screen.getByRole('combobox');
    
    // Drücke die Escape-Taste
    fireEvent.keyDown(select, { key: 'Escape' });
    
    // Der onKeyDown-Handler sollte aufgerufen worden sein
    expect(handleKeyDown).toHaveBeenCalled();
    expect(handleKeyDown.mock.calls[0][0].key).toBe('Escape');
  });

  it('should handle focus and blur correctly', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    
    render(
      <Select.A11y 
        options={mockOptions}
        label="Wählen Sie eine Option"
        onFocus={handleFocus}
        onBlur={handleBlur}
        ariaLabel="Optionsauswahl"
      />
    );
    
    const select = screen.getByRole('combobox');
    
    // Fokussiere das Select
    fireEvent.focus(select);
    expect(handleFocus).toHaveBeenCalled();
    
    // Entferne den Fokus vom Select
    fireEvent.blur(select);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should handle different sizes correctly', () => {
    const { rerender } = render(
      <Select.A11y 
        options={mockOptions}
        label="Wählen Sie eine Option"
        size="xs"
        ariaLabel="Optionsauswahl"
      />
    );
    
    let select = screen.getByRole('combobox');
    expect(select).toHaveClass('text-xs');
    expect(select).toHaveClass('h-7');
    
    rerender(
      <Select.A11y 
        options={mockOptions}
        label="Wählen Sie eine Option"
        size="lg"
        ariaLabel="Optionsauswahl"
      />
    );
    
    select = screen.getByRole('combobox');
    expect(select).toHaveClass('text-lg');
    expect(select).toHaveClass('h-12');
  });

  it('should handle different variants correctly', () => {
    const { rerender } = render(
      <Select.A11y 
        options={mockOptions}
        label="Wählen Sie eine Option"
        variant="default"
        ariaLabel="Optionsauswahl"
      />
    );
    
    let select = screen.getByRole('combobox');
    expect(select).toHaveClass('bg-white');
    expect(select).toHaveClass('border');
    
    rerender(
      <Select.A11y 
        options={mockOptions}
        label="Wählen Sie eine Option"
        variant="filled"
        ariaLabel="Optionsauswahl"
      />
    );
    
    select = screen.getByRole('combobox');
    expect(select).toHaveClass('bg-gray-100');
    expect(select).toHaveClass('border-transparent');
  });

  it('should handle left and right icons correctly', () => {
    render(
      <Select.A11y 
        options={mockOptions}
        label="Wählen Sie eine Option"
        leftIcon={<span data-testid="left-icon">L</span>}
        rightIcon={<span data-testid="right-icon">R</span>}
        ariaLabel="Optionsauswahl"
      />
    );
    
    const leftIcon = screen.getByTestId('left-icon');
    const rightIcon = screen.getByTestId('right-icon');
    
    expect(leftIcon).toBeInTheDocument();
    expect(rightIcon).toBeInTheDocument();
    
    // Überprüfe, ob die Icons für Screenreader versteckt sind
    expect(leftIcon.parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(rightIcon.parentElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('should handle placeholder correctly', () => {
    render(
      <Select.A11y 
        options={mockOptions}
        label="Wählen Sie eine Option"
        placeholder="Bitte auswählen"
        ariaLabel="Optionsauswahl"
      />
    );
    
    const placeholder = screen.getByText('Bitte auswählen');
    expect(placeholder).toBeInTheDocument();
    expect(placeholder.tagName).toBe('OPTION');
    expect(placeholder.value).toBe('');
  });

  it('should handle grouped options correctly', () => {
    const groupedOptions = [
      { value: 'option1', label: 'Option 1', group: 'Gruppe 1' },
      { value: 'option2', label: 'Option 2', group: 'Gruppe 1' },
      { value: 'option3', label: 'Option 3', group: 'Gruppe 2' },
      { value: 'option4', label: 'Option 4', group: 'Gruppe 2' }
    ];
    
    render(
      <Select.A11y 
        options={groupedOptions}
        label="Wählen Sie eine Option"
        groupOptions
        ariaLabel="Optionsauswahl"
      />
    );
    
    const optgroups = screen.getAllByRole('group');
    expect(optgroups).toHaveLength(2);
    expect(optgroups[0]).toHaveAttribute('label', 'Gruppe 1');
    expect(optgroups[1]).toHaveAttribute('label', 'Gruppe 2');
  });
});