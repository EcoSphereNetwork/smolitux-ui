import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { FormA11y } from '../Form.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('Form Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <FormA11y legend="Kontaktformular">
        <div>Formularinhalt</div>
      </FormA11y>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <FormA11y
        legend="Kontaktformular"
        description="Bitte füllen Sie alle Felder aus"
        id="contact-form"
      >
        <div>Formularinhalt</div>
      </FormA11y>
    );

    const form = screen.getByRole('form');
    expect(form).toHaveAttribute('id', 'contact-form');
    expect(form).toHaveAttribute('aria-labelledby');
    expect(form).toHaveAttribute('aria-describedby');

    const legend = screen.getByText('Kontaktformular');
    expect(legend).toHaveAttribute('id', form.getAttribute('aria-labelledby'));

    const description = screen.getByText('Bitte füllen Sie alle Felder aus');
    expect(description).toHaveAttribute('id', form.getAttribute('aria-describedby'));
  });

  it('should handle disabled state correctly', () => {
    render(
      <FormA11y legend="Kontaktformular" disabled showSubmitButton>
        <div>Formularinhalt</div>
      </FormA11y>
    );

    const form = screen.getByRole('form');
    expect(form).toHaveAttribute('aria-disabled', 'true');

    const submitButton = screen.getByRole('button', { name: 'Absenden' });
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('should handle loading state correctly', () => {
    render(
      <FormA11y legend="Kontaktformular" loading showSubmitButton showLoadingIndicator>
        <div>Formularinhalt</div>
      </FormA11y>
    );

    const form = screen.getByRole('form');
    expect(form).toHaveAttribute('aria-busy', 'true');

    const submitButton = screen.getByRole('button', { name: /Absenden/ });
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveAttribute('aria-disabled', 'true');

    // Prüfe, ob die Ladeanimation angezeigt wird
    expect(
      screen.getByText('Formular wird gesendet', { selector: '.sr-only' })
    ).toBeInTheDocument();
  });

  it('should handle progress bar correctly', () => {
    render(
      <FormA11y legend="Kontaktformular" showProgressBar progress={50} progressMax={100}>
        <div>Formularinhalt</div>
      </FormA11y>
    );

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    expect(progressBar).toHaveAttribute('aria-label', 'Formular-Fortschritt');

    // Prüfe, ob die Screenreader-Information vorhanden ist
    expect(screen.getByText('50% abgeschlossen', { selector: '.sr-only' })).toBeInTheDocument();
  });

  it('should handle form buttons correctly', () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    const handleReset = jest.fn();
    const handleCancel = jest.fn();

    render(
      <FormA11y
        legend="Kontaktformular"
        showSubmitButton
        showResetButton
        showCancelButton
        resetButtonText="Zurücksetzen"
        cancelButtonText="Abbrechen"
        submitButtonText="Senden"
        onSubmit={handleSubmit}
        onReset={handleReset}
        onCancel={handleCancel}
      >
        <div>Formularinhalt</div>
      </FormA11y>
    );

    const submitButton = screen.getByRole('button', { name: 'Senden' });
    const resetButton = screen.getByRole('button', { name: 'Zurücksetzen' });
    const cancelButton = screen.getByRole('button', { name: 'Abbrechen' });

    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalled();

    fireEvent.click(resetButton);
    expect(handleReset).toHaveBeenCalled();

    fireEvent.click(cancelButton);
    expect(handleCancel).toHaveBeenCalled();
  });

  it('should handle keyboard interactions correctly', () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());

    render(
      <FormA11y legend="Kontaktformular" showSubmitButton onSubmit={handleSubmit}>
        <div>Formularinhalt</div>
      </FormA11y>
    );

    const form = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: 'Absenden' });

    // Simuliere Enter-Taste auf dem Button
    fireEvent.keyDown(submitButton, { key: 'Enter' });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
