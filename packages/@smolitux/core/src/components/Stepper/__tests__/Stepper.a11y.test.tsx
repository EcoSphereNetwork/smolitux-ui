import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { StepperA11y } from '../Stepper.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

const mockSteps = [
  { id: 'step1', title: 'Schritt 1', description: 'Beschreibung 1' },
  { id: 'step2', title: 'Schritt 2', description: 'Beschreibung 2' },
  { id: 'step3', title: 'Schritt 3', description: 'Beschreibung 3', disabled: true },
  { id: 'step4', title: 'Schritt 4', description: 'Beschreibung 4', optional: true }
];

describe('Stepper Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <StepperA11y 
        steps={mockSteps}
        ariaLabel="Test Stepper"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <StepperA11y 
        steps={mockSteps}
        ariaLabel="Test Stepper"
        description="Dieser Stepper zeigt den Fortschritt an"
      />
    );
    
    const stepper = screen.getByRole('group');
    expect(stepper).toHaveAttribute('aria-label', 'Test Stepper');
    expect(stepper).toHaveAttribute('aria-describedby', 'stepper-description');
    
    const steps = screen.getAllByRole('button');
    expect(steps[0]).toHaveAttribute('aria-current', 'step');
    expect(steps[1]).toHaveAttribute('aria-current', 'false');
    expect(steps[2]).toHaveAttribute('aria-disabled', 'true');
    
    // Überprüfe die Beschreibung
    const description = screen.getByText('Dieser Stepper zeigt den Fortschritt an');
    expect(description).toHaveClass('sr-only');
  });

  it('should handle keyboard navigation correctly', () => {
    render(
      <StepperA11y 
        steps={mockSteps}
        ariaLabel="Test Stepper"
      />
    );
    
    const steps = screen.getAllByRole('button');
    
    // Fokussiere den ersten Schritt
    steps[0].focus();
    expect(document.activeElement).toBe(steps[0]);
    
    // Drücke die Pfeiltaste nach rechts
    fireEvent.keyDown(steps[0], { key: 'ArrowRight' });
    expect(document.activeElement).toBe(steps[1]);
    
    // Drücke die Pfeiltaste nach rechts erneut (überspringt den deaktivierten Schritt)
    fireEvent.keyDown(steps[1], { key: 'ArrowRight' });
    expect(document.activeElement).toBe(steps[3]);
    
    // Drücke die Pfeiltaste nach rechts erneut (geht zurück zum ersten Schritt)
    fireEvent.keyDown(steps[3], { key: 'ArrowRight' });
    expect(document.activeElement).toBe(steps[0]);
    
    // Drücke die Home-Taste
    fireEvent.keyDown(steps[0], { key: 'Home' });
    expect(document.activeElement).toBe(steps[0]);
    
    // Drücke die End-Taste
    fireEvent.keyDown(steps[0], { key: 'End' });
    expect(document.activeElement).toBe(steps[3]);
  });

  it('should handle step activation correctly', () => {
    const handleStepChange = jest.fn();
    
    render(
      <StepperA11y 
        steps={mockSteps}
        ariaLabel="Test Stepper"
        onStepChange={handleStepChange}
        clickable
      />
    );
    
    const steps = screen.getAllByRole('button');
    
    // Klicke auf den zweiten Schritt
    fireEvent.click(steps[1]);
    
    // Der onStepChange-Handler sollte aufgerufen worden sein
    expect(handleStepChange).toHaveBeenCalledWith(1);
    
    // Versuche, auf den deaktivierten Schritt zu klicken
    fireEvent.click(steps[2]);
    
    // Der onStepChange-Handler sollte nicht erneut aufgerufen worden sein
    expect(handleStepChange).toHaveBeenCalledTimes(1);
  });

  it('should handle keyboard activation correctly', () => {
    const handleStepChange = jest.fn();
    
    render(
      <StepperA11y 
        steps={mockSteps}
        ariaLabel="Test Stepper"
        onStepChange={handleStepChange}
        clickable
      />
    );
    
    const steps = screen.getAllByRole('button');
    
    // Fokussiere den zweiten Schritt
    steps[1].focus();
    
    // Drücke die Enter-Taste
    fireEvent.keyDown(steps[1], { key: 'Enter' });
    
    // Der onStepChange-Handler sollte aufgerufen worden sein
    expect(handleStepChange).toHaveBeenCalledWith(1);
    
    // Fokussiere den deaktivierten Schritt
    steps[2].focus();
    
    // Drücke die Enter-Taste
    fireEvent.keyDown(steps[2], { key: 'Enter' });
    
    // Der onStepChange-Handler sollte nicht erneut aufgerufen worden sein
    expect(handleStepChange).toHaveBeenCalledTimes(1);
  });

  it('should handle vertical orientation correctly', () => {
    render(
      <StepperA11y 
        steps={mockSteps}
        ariaLabel="Test Stepper"
        orientation="vertical"
      />
    );
    
    const stepper = screen.getByRole('group');
    expect(stepper).toHaveClass('stepper-vertical');
    
    const steps = screen.getAllByRole('button');
    
    // Fokussiere den ersten Schritt
    steps[0].focus();
    
    // Drücke die Pfeiltaste nach unten
    fireEvent.keyDown(steps[0], { key: 'ArrowDown' });
    expect(document.activeElement).toBe(steps[1]);
    
    // Drücke die Pfeiltaste nach oben
    fireEvent.keyDown(steps[1], { key: 'ArrowUp' });
    expect(document.activeElement).toBe(steps[0]);
  });

  it('should handle error state correctly', () => {
    render(
      <StepperA11y 
        steps={mockSteps}
        ariaLabel="Test Stepper"
        error="Es ist ein Fehler aufgetreten"
      />
    );
    
    const stepper = screen.getByRole('group');
    expect(stepper).toHaveAttribute('aria-invalid', 'true');
    expect(stepper).toHaveAttribute('aria-errormessage');
    
    const error = screen.getByText('Es ist ein Fehler aufgetreten');
    expect(error).toHaveAttribute('role', 'alert');
  });

  it('should handle loading state correctly', () => {
    render(
      <StepperA11y 
        steps={mockSteps}
        ariaLabel="Test Stepper"
        loading
      />
    );
    
    const stepper = screen.getByRole('group');
    expect(stepper).toHaveAttribute('aria-busy', 'true');
    
    const loading = screen.getByText('Wird geladen...');
    expect(loading).toHaveAttribute('aria-live', 'polite');
  });

  it('should handle helper text correctly', () => {
    render(
      <StepperA11y 
        steps={mockSteps}
        ariaLabel="Test Stepper"
        helperText="Folgen Sie den Schritten"
      />
    );
    
    const stepper = screen.getByRole('group');
    expect(stepper).toHaveAttribute('aria-describedby');
    
    const helperText = screen.getByText('Folgen Sie den Schritten');
    expect(helperText).toBeInTheDocument();
  });

  it('should handle success state correctly', () => {
    render(
      <StepperA11y 
        steps={mockSteps}
        ariaLabel="Test Stepper"
        success="Alle Schritte wurden erfolgreich abgeschlossen"
      />
    );
    
    const stepper = screen.getByRole('group');
    expect(stepper).toHaveAttribute('aria-describedby');
    
    const success = screen.getByText('Alle Schritte wurden erfolgreich abgeschlossen');
    expect(success).toBeInTheDocument();
  });

  it('should handle live region correctly', () => {
    render(
      <StepperA11y 
        steps={mockSteps}
        ariaLabel="Test Stepper"
        liveRegion
      />
    );
    
    const liveRegion = screen.getByRole('group').querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion).toHaveClass('sr-only');
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
  });

  it('should handle keyboard shortcuts correctly', () => {
    const handleStepChange = jest.fn();
    
    render(
      <StepperA11y 
        steps={mockSteps}
        ariaLabel="Test Stepper"
        onStepChange={handleStepChange}
        keyboardShortcuts
        clickable
      />
    );
    
    const stepper = screen.getByRole('group');
    
    // Drücke die Taste "2"
    fireEvent.keyDown(stepper, { key: '2' });
    
    // Der onStepChange-Handler sollte aufgerufen worden sein
    expect(handleStepChange).toHaveBeenCalledWith(1);
  });

  it('should handle optional steps correctly', () => {
    render(
      <StepperA11y 
        steps={mockSteps}
        ariaLabel="Test Stepper"
        showOptionalLabel
      />
    );
    
    const optionalLabel = screen.getByText('Optional');
    expect(optionalLabel).toBeInTheDocument();
    expect(optionalLabel).toHaveClass('stepper-optional-label');
  });

  it('should handle different variants correctly', () => {
    const { rerender } = render(
      <StepperA11y 
        steps={mockSteps}
        ariaLabel="Test Stepper"
        variant="default"
      />
    );
    
    let stepper = screen.getByRole('group');
    expect(stepper).toHaveClass('stepper-default');
    
    rerender(
      <StepperA11y 
        steps={mockSteps}
        ariaLabel="Test Stepper"
        variant="outlined"
      />
    );
    
    stepper = screen.getByRole('group');
    expect(stepper).toHaveClass('stepper-outlined');
  });

  it('should handle different sizes correctly', () => {
    const { rerender } = render(
      <StepperA11y 
        steps={mockSteps}
        ariaLabel="Test Stepper"
        size="sm"
      />
    );
    
    let stepper = screen.getByRole('group');
    expect(stepper).toHaveClass('stepper-sm');
    
    rerender(
      <StepperA11y 
        steps={mockSteps}
        ariaLabel="Test Stepper"
        size="lg"
      />
    );
    
    stepper = screen.getByRole('group');
    expect(stepper).toHaveClass('stepper-lg');
  });

  it('should handle screenreader descriptions correctly', () => {
    const stepsWithScreenReaderDesc = [
      ...mockSteps.slice(0, 1),
      { 
        ...mockSteps[1], 
        screenReaderDescription: 'Diese Beschreibung ist nur für Screenreader sichtbar' 
      },
      ...mockSteps.slice(2)
    ];
    
    render(
      <StepperA11y 
        steps={stepsWithScreenReaderDesc}
        ariaLabel="Test Stepper"
      />
    );
    
    const steps = screen.getAllByRole('button');
    expect(steps[1]).toHaveAttribute('aria-describedby');
    
    const srDescription = screen.getByText('Diese Beschreibung ist nur für Screenreader sichtbar');
    expect(srDescription).toHaveClass('sr-only');
  });
});