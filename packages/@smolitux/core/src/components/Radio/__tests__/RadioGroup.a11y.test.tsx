import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { RadioGroupA11y } from '../RadioGroup.a11y';
import { RadioA11y } from '../Radio.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('RadioGroup Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <RadioGroupA11y 
        name="test"
        label="Wählen Sie eine Option"
        ariaLabel="Optionsauswahl"
      >
        <RadioA11y value="option1" label="Option 1" />
        <RadioA11y value="option2" label="Option 2" />
      </RadioGroupA11y>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <RadioGroupA11y 
        name="test"
        label="Wählen Sie eine Option"
        ariaLabel="Optionsauswahl"
        description="Bitte wählen Sie eine der folgenden Optionen"
        id="test-group"
      >
        <RadioA11y value="option1" label="Option 1" />
        <RadioA11y value="option2" label="Option 2" />
      </RadioGroupA11y>
    );
    
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveAttribute('id', 'test-group');
    expect(radioGroup).toHaveAttribute('aria-label', 'Optionsauswahl');
    expect(radioGroup).toHaveAttribute('aria-labelledby', 'test-group-label');
    expect(radioGroup).toHaveAttribute('aria-describedby', 'test-group-description');
    
    // Überprüfe die Beschreibung
    const description = screen.getByText('Bitte wählen Sie eine der folgenden Optionen');
    expect(description).toHaveClass('sr-only');
    expect(description.id).toBe('test-group-description');
    
    // Überprüfe das Label
    const label = screen.getByText('Wählen Sie eine Option');
    expect(label.id).toBe('test-group-label');
  });

  it('should handle error state correctly', () => {
    render(
      <RadioGroupA11y 
        name="test"
        label="Wählen Sie eine Option"
        error="Bitte wählen Sie eine Option"
        ariaLabel="Optionsauswahl"
      >
        <RadioA11y value="option1" label="Option 1" />
        <RadioA11y value="option2" label="Option 2" />
      </RadioGroupA11y>
    );
    
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveAttribute('aria-invalid', 'true');
    expect(radioGroup).toHaveAttribute('aria-errormessage', 'radio-group-error');
    
    // Überprüfe die Fehlermeldung
    const error = screen.getByText('Bitte wählen Sie eine Option');
    expect(error).toHaveAttribute('role', 'alert');
    expect(error.id).toBe('radio-group-error');
  });

  it('should handle helper text correctly', () => {
    render(
      <RadioGroupA11y 
        name="test"
        label="Wählen Sie eine Option"
        helperText="Wählen Sie die Option, die am besten zu Ihnen passt"
        ariaLabel="Optionsauswahl"
      >
        <RadioA11y value="option1" label="Option 1" />
        <RadioA11y value="option2" label="Option 2" />
      </RadioGroupA11y>
    );
    
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveAttribute('aria-describedby', 'radio-group-helper');
    
    // Überprüfe den Hilfetext
    const helperText = screen.getByText('Wählen Sie die Option, die am besten zu Ihnen passt');
    expect(helperText.id).toBe('radio-group-helper');
  });

  it('should handle required state correctly', () => {
    render(
      <RadioGroupA11y 
        name="test"
        label="Wählen Sie eine Option"
        required
        ariaLabel="Optionsauswahl"
      >
        <RadioA11y value="option1" label="Option 1" />
        <RadioA11y value="option2" label="Option 2" />
      </RadioGroupA11y>
    );
    
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveAttribute('aria-required', 'true');
    
    // Überprüfe das Sternchen im Label
    const label = screen.getByText('Wählen Sie eine Option');
    expect(label.nextSibling).toHaveTextContent('*');
    expect(label.nextSibling).toHaveAttribute('aria-hidden', 'true');
  });

  it('should handle disabled state correctly', () => {
    render(
      <RadioGroupA11y 
        name="test"
        label="Wählen Sie eine Option"
        disabled
        ariaLabel="Optionsauswahl"
      >
        <RadioA11y value="option1" label="Option 1" />
        <RadioA11y value="option2" label="Option 2" />
      </RadioGroupA11y>
    );
    
    // Alle Radio-Buttons sollten deaktiviert sein
    const radios = screen.getAllByRole('radio');
    radios.forEach(radio => {
      expect(radio).toBeDisabled();
    });
  });

  it('should handle value selection correctly', () => {
    const handleChange = jest.fn();
    
    render(
      <RadioGroupA11y 
        name="test"
        label="Wählen Sie eine Option"
        value="option1"
        onChange={handleChange}
        ariaLabel="Optionsauswahl"
      >
        <RadioA11y value="option1" label="Option 1" />
        <RadioA11y value="option2" label="Option 2" />
      </RadioGroupA11y>
    );
    
    // Der erste Radio-Button sollte ausgewählt sein
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toBeChecked();
    expect(radios[1]).not.toBeChecked();
    
    // Klicke auf den zweiten Radio-Button
    fireEvent.click(radios[1]);
    
    // Der onChange-Handler sollte aufgerufen worden sein
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls[0][0].target.value).toBe('option2');
  });

  it('should handle different layouts correctly', () => {
    const { rerender } = render(
      <RadioGroupA11y 
        name="test"
        label="Wählen Sie eine Option"
        layout="vertical"
        ariaLabel="Optionsauswahl"
      >
        <RadioA11y value="option1" label="Option 1" />
        <RadioA11y value="option2" label="Option 2" />
      </RadioGroupA11y>
    );
    
    // Bei layout="vertical" sollte der Container die Klasse "flex-col" haben
    let container = screen.getByRole('radiogroup').querySelector('div:nth-child(2)');
    expect(container).toHaveClass('flex-col');
    
    rerender(
      <RadioGroupA11y 
        name="test"
        label="Wählen Sie eine Option"
        layout="horizontal"
        ariaLabel="Optionsauswahl"
      >
        <RadioA11y value="option1" label="Option 1" />
        <RadioA11y value="option2" label="Option 2" />
      </RadioGroupA11y>
    );
    
    // Bei layout="horizontal" sollte der Container die Klasse "flex-row" haben
    container = screen.getByRole('radiogroup').querySelector('div:nth-child(2)');
    expect(container).toHaveClass('flex-row');
  });

  it('should handle live region correctly', () => {
    render(
      <RadioGroupA11y 
        name="test"
        label="Wählen Sie eine Option"
        liveRegionPoliteness="assertive"
        ariaLabel="Optionsauswahl"
      >
        <RadioA11y value="option1" label="Option 1" />
        <RadioA11y value="option2" label="Option 2" />
      </RadioGroupA11y>
    );
    
    // Es sollte eine Live-Region geben
    const liveRegion = screen.getByText('Keine Option ausgewählt');
    expect(liveRegion).toHaveClass('sr-only');
    expect(liveRegion.parentElement).toHaveAttribute('aria-live', 'assertive');
    expect(liveRegion.parentElement).toHaveAttribute('aria-atomic', 'true');
  });

  it('should handle busy state correctly', () => {
    render(
      <RadioGroupA11y 
        name="test"
        label="Wählen Sie eine Option"
        busy
        ariaLabel="Optionsauswahl"
      >
        <RadioA11y value="option1" label="Option 1" />
        <RadioA11y value="option2" label="Option 2" />
      </RadioGroupA11y>
    );
    
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveAttribute('aria-busy', 'true');
  });
});