import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Form } from '../../../validation/Form';
import { FormFieldA11y } from '../FormField.a11y';

const renderWithForm = (ui: React.ReactElement) =>
  render(<Form onSubmit={jest.fn()}>{ui}</Form>);

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

// Mock-Komponente für Tests, filtert nicht-native Props heraus
const MockInput = ({
  isLoading,
  showLoadingIndicator,
  showSuccessIndicator,
  showErrorIndicator,
  showCounter,
  maxLength,
  showProgressBar,
  progress,
  progressMax,
  tooltip,
  isValid,
  isInvalid,
  errorMessages,
  hasError,
  ...rest
}: Record<string, unknown>) => <input {...rest} />;

describe('FormField Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = renderWithForm(
      <FormFieldA11y
        label="Name"
        helperText="Bitte geben Sie Ihren vollständigen Namen ein"
        component={MockInput}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    renderWithForm(
      <FormFieldA11y
        label="Email"
        helperText="Ihre geschäftliche Email-Adresse"
        id="test-email"
        component={MockInput}
        type="email"
      />
    );

    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('id', 'test-email');
    expect(input).toHaveAttribute('aria-labelledby');
    expect(input).toHaveAttribute('aria-describedby');

    const label = screen.getByText('Email');
    expect(label).toHaveAttribute('id', input.getAttribute('aria-labelledby'));

    const helperText = screen.getByText('Ihre geschäftliche Email-Adresse');
    expect(helperText).toHaveAttribute('id');
    expect(input.getAttribute('aria-describedby')).toContain(helperText.id);
  });

  it('should handle error states correctly', () => {
    renderWithForm(
      <FormFieldA11y
        label="Email"
        component={MockInput}
        type="email"
        hasError={true}
        errorMessages={['Ungültige Email-Adresse']}
      />
    );

    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');

    const errorMessage = screen.getByText('Ungültige Email-Adresse');
    expect(errorMessage).toHaveAttribute('role', 'alert');
    expect(errorMessage).toHaveAttribute('id');
    expect(input.getAttribute('aria-describedby')).toContain(errorMessage.id);
  });

  it('should handle required state correctly', () => {
    renderWithForm(<FormFieldA11y label="Name" required component={MockInput} type="text" />);

    const input = screen.getByLabelText('Name', { exact: false });
    expect(input).toHaveAttribute('aria-required', 'true');

    // Überprüfe, ob das Sternchen angezeigt wird
    expect(screen.getByText('*', { selector: 'span[aria-hidden="true"]' })).toBeInTheDocument();

    // Überprüfe, ob die Screenreader-Information vorhanden ist
    expect(screen.getByText('(Erforderlich)', { selector: '.sr-only' })).toBeInTheDocument();
  });

  it('should handle disabled state correctly', () => {
    renderWithForm(<FormFieldA11y label="Name" disabled component={MockInput} type="text" />);

    const input = screen.getByLabelText('Name');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-disabled', 'true');
  });

  it('should handle loading state correctly', () => {
    renderWithForm(
      <FormFieldA11y label="Name" loading showLoadingIndicator component={MockInput} type="text" />
    );

    const input = screen.getByLabelText('Name');
    expect(input).toHaveAttribute('aria-disabled', 'true');

    // Überprüfe, ob die Screenreader-Information vorhanden ist
    expect(screen.getByText('Lädt...', { selector: '.sr-only' })).toBeInTheDocument();
  });

  it('should handle tooltip correctly', () => {
    renderWithForm(
      <FormFieldA11y
        label="Name"
        tooltip="Bitte geben Sie Ihren vollständigen Namen ein"
        component={MockInput}
        type="text"
      />
    );

    // Überprüfe, ob der Tooltip vorhanden ist
    const tooltipIcon = screen.getByLabelText(
      'Tooltip: Bitte geben Sie Ihren vollständigen Namen ein'
    );
    expect(tooltipIcon).toBeInTheDocument();
    expect(tooltipIcon).toHaveAttribute('title', 'Bitte geben Sie Ihren vollständigen Namen ein');
  });

  it('should handle hidden label correctly', () => {
    renderWithForm(<FormFieldA11y label="Name" hideLabel component={MockInput} type="text" />);

    const label = screen.getByText('Name');
    expect(label).toHaveClass('sr-only');
  });

  it('should handle counter correctly', () => {
    renderWithForm(
      <FormFieldA11y
        label="Beschreibung"
        showCounter
        maxLength={100}
        value="Test"
        component={MockInput}
        type="text"
      />
    );

    const counter = screen.getByText('4 / 100', { selector: 'span[aria-hidden="true"]' });
    expect(counter).toBeInTheDocument();

    // Überprüfe, ob die Screenreader-Information vorhanden ist
    expect(
      screen.getByText('4 von maximal 100 Zeichen eingegeben (4%)', { selector: '.sr-only' })
    ).toBeInTheDocument();
  });

  it('should handle progress bar correctly', () => {
    renderWithForm(
      <FormFieldA11y
        label="Upload"
        showProgressBar
        progress={50}
        progressMax={100}
        component={MockInput}
        type="file"
      />
    );

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');

    // Überprüfe, ob die Screenreader-Information vorhanden ist
    expect(screen.getByText('Fortschritt: 50%', { selector: '.sr-only' })).toBeInTheDocument();
  });

  it('should handle description correctly', () => {
    renderWithForm(
      <FormFieldA11y
        label="Name"
        description="Dieses Feld ist für Ihren vollständigen Namen vorgesehen"
        component={MockInput}
        type="text"
      />
    );

    // Überprüfe, ob die Beschreibung vorhanden ist
    const description = screen.getByText(
      'Dieses Feld ist für Ihren vollständigen Namen vorgesehen'
    );
    expect(description).toHaveClass('sr-only');

    // Überprüfe, ob das Input-Element die richtige aria-describedby hat
    const input = screen.getByLabelText('Name');
    expect(input.getAttribute('aria-describedby')).toContain(description.id);
  });

  it('should handle different label placements correctly', () => {
    const { rerender } = renderWithForm(
      <FormFieldA11y
        label="Name"
        labelPlacement="left"
        labelWidth="100px"
        component={MockInput}
        type="text"
      />
    );

    // Überprüfe, ob der Container die richtige Klasse hat
    expect(screen.getByText('Name').parentElement).toHaveClass('sm:flex', 'sm:items-start');

    // Überprüfe, ob das Label den richtigen Stil hat
    expect(screen.getByText('Name')).toHaveStyle({ width: '100px' });

    // Ändere die Label-Position auf "right"
    rerender(
      <Form onSubmit={jest.fn()}>
        <FormFieldA11y
          label="Name"
          labelPlacement="right"
          labelWidth="100px"
          component={MockInput}
          type="text"
        />
      </Form>
    );

    // Überprüfe, ob der Container die richtige Klasse hat
    expect(screen.getByText('Name').parentElement).toHaveClass(
      'sm:flex-row-reverse'
    );
  });
});
