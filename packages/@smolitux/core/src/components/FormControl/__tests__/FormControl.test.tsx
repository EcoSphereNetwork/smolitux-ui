import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormControl, useFormControl } from '../FormControl';

// Testkomponente, die den FormControl-Context verwendet
const TestInput = () => {
  const { disabled, required, hasError, id, size, readOnly } = useFormControl();

  return (
    <input
      id={id}
      disabled={disabled}
      required={required}
      aria-invalid={hasError}
      data-size={size}
      readOnly={readOnly}
      data-testid="test-input"
    />
  );
};

describe('FormControl Component', () => {
  test('renders correctly with default props', () => {
    render(
      <FormControl>
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  test('renders with label', () => {
    render(
      <FormControl label="Test Label">
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  test('renders with helper text', () => {
    render(
      <FormControl helperText="Helper Text">
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByText('Helper Text')).toBeInTheDocument();
  });

  test('renders with error message', () => {
    render(
      <FormControl error="Error Message">
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByText('Error Message')).toBeInTheDocument();
    expect(screen.getByText('Error Message')).toHaveAttribute('role', 'alert');
  });

  test('renders with success message', () => {
    render(
      <FormControl successMessage="Success Message">
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByText('Success Message')).toBeInTheDocument();
  });

  test('renders with required indicator', () => {
    render(
      <FormControl label="Test Label" required>
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('(erforderlich)')).toBeInTheDocument();
    expect(screen.getByText('(erforderlich)')).toHaveClass('sr-only');
  });

  test('renders with different label positions', () => {
    const { rerender } = render(
      <FormControl label="Test Label" labelPosition="top">
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByText('Test Label')).toHaveClass('mb-1');

    rerender(
      <FormControl label="Test Label" labelPosition="left">
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByText('Test Label')).toHaveClass('pt-2 pr-4');
    expect(screen.getByTestId('input').parentElement?.parentElement?.parentElement).toHaveClass(
      'flex items-start'
    );

    rerender(
      <FormControl label="Test Label" labelPosition="right">
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByText('Test Label')).toHaveClass('pt-2 pl-4');
    expect(screen.getByTestId('input').parentElement?.parentElement?.parentElement).toHaveClass(
      'flex flex-row-reverse'
    );

    rerender(
      <FormControl label="Test Label" labelPosition="bottom">
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByText('Test Label')).toHaveClass('mt-1');
    expect(screen.getByTestId('input').parentElement?.parentElement?.parentElement).toHaveClass(
      'flex flex-col-reverse'
    );

    rerender(
      <FormControl label="Test Label" labelPosition="floating">
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByText('Test Label')).toHaveClass('absolute');
    expect(screen.getByTestId('input').parentElement).toHaveClass('pt-2');
  });

  test('renders with full width', () => {
    render(
      <FormControl fullWidth>
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByTestId('input').parentElement?.parentElement?.parentElement).toHaveClass(
      'w-full'
    );
  });

  test('renders with counter', () => {
    render(
      <FormControl showCounter counterValue={5} counterMax={10}>
        <input data-testid="input" />
      </FormControl>
    );

    const counterText = screen.getByText('5/10');
    expect(counterText).toBeInTheDocument();

    // Prüfe, ob der Screenreader-Text vorhanden ist
    const srText = screen.getByText('5 von maximal 10 Zeichen eingegeben (50%)');
    expect(srText).toBeInTheDocument();
    expect(srText).toHaveClass('sr-only');
  });

  test('renders with progress bar', () => {
    render(
      <FormControl showProgressBar progressValue={50} progressMax={100}>
        <input data-testid="input" />
      </FormControl>
    );

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');

    // Prüfe, ob der Screenreader-Text vorhanden ist
    const srText = screen.getByText('Fortschritt: 50%');
    expect(srText).toBeInTheDocument();
    expect(srText).toHaveClass('sr-only');

    // Prüfe, ob die Farbe basierend auf dem Prozentsatz gesetzt wird
    expect(progressBar).toHaveClass('bg-yellow-500');
  });

  test('renders with loading indicator', () => {
    render(
      <FormControl isLoading showLoadingIndicator>
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    expect(screen.getByTestId('loading-indicator')).toHaveClass('animate-spin');
    expect(screen.getByText('Lädt...')).toBeInTheDocument();
    expect(screen.getByText('Lädt...')).toHaveClass('sr-only');
  });

  test('renders with error indicator', () => {
    render(
      <FormControl error="Error" showErrorIndicator>
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByTestId('error-indicator')).toBeInTheDocument();
    expect(screen.getByTestId('error-indicator')).toHaveClass('text-red-500');
    expect(screen.getByText('Fehler')).toBeInTheDocument();
    expect(screen.getByText('Fehler')).toHaveClass('sr-only');
  });

  test('renders with success indicator', () => {
    render(
      <FormControl isSuccess showSuccessIndicator>
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByTestId('success-indicator')).toBeInTheDocument();
    expect(screen.getByTestId('success-indicator')).toHaveClass('text-green-500');
    expect(screen.getByText('Erfolgreich')).toBeInTheDocument();
    expect(screen.getByText('Erfolgreich')).toHaveClass('sr-only');
  });

  test('renders with validation indicator', () => {
    render(
      <FormControl isValid showValidationIndicator>
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByTestId('valid-indicator')).toBeInTheDocument();
    expect(screen.getByTestId('valid-indicator')).toHaveClass('text-green-500');
    expect(screen.getByText('Gültig')).toBeInTheDocument();
    expect(screen.getByText('Gültig')).toHaveClass('sr-only');
  });

  test('renders with hidden label', () => {
    render(
      <FormControl label="Hidden Label" hideLabel>
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByText('Hidden Label')).toHaveClass('sr-only');
  });

  test('renders with description for screen readers', () => {
    render(
      <FormControl description="Description for screen readers">
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByText('Description for screen readers')).toHaveClass('sr-only');
  });

  test('provides context to child components', () => {
    render(
      <FormControl disabled required error="Error" size="lg" readOnly>
        <TestInput />
      </FormControl>
    );

    const input = screen.getByTestId('test-input');
    expect(input).toBeDisabled();
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('data-size', 'lg');
    expect(input).toHaveAttribute('readonly', '');
  });

  test('useFormControl returns default values when used outside FormControl', () => {
    render(<TestInput />);

    const input = screen.getByTestId('test-input');
    expect(input).not.toBeDisabled();
    expect(input).not.toBeRequired();
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).toHaveAttribute('data-size', 'md');
    expect(input).not.toHaveAttribute('readonly');
  });

  test('renders with custom class names', () => {
    render(
      <FormControl
        className="custom-class"
        containerClassName="container-class"
        labelClassName="label-class"
        helperTextClassName="helper-class"
        errorClassName="error-class"
        successClassName="success-class"
        fieldContainerClassName="field-container-class"
        label="Label"
        helperText="Helper"
        error="Error"
        successMessage="Success"
      >
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByTestId('input').parentElement?.parentElement?.parentElement).toHaveClass(
      'custom-class container-class'
    );
    expect(screen.getByText('Label')).toHaveClass('label-class');
    expect(screen.getByText('Error')).toHaveClass('error-class');
  });

  test('renders with tooltip', () => {
    render(
      <FormControl tooltip="Tooltip Text" labelTooltip="Label Tooltip">
        <input data-testid="input" />
      </FormControl>
    );

    expect(screen.getByTestId('input').parentElement?.parentElement?.parentElement).toHaveAttribute(
      'title',
      'Tooltip Text'
    );
  });
});
