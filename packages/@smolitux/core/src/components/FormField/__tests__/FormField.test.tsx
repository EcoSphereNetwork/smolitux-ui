import React from 'react';
import { render, screen } from '@testing-library/react';
import { Form } from '../../../validation/Form';
import { FormField } from '../FormField';

const MockInput = ({
  errorMessages,
  hasError,
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
  ...rest
}: Record<string, unknown>) => <input {...rest} />;

const renderWithForm = (ui: React.ReactElement) =>
  render(<Form onSubmit={jest.fn()}>{ui}</Form>);

describe('FormField', () => {
  it('renders correctly with default props', () => {
    renderWithForm(<FormField label="Username" component={MockInput} />);

    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with required indicator when required is true', () => {
    renderWithForm(<FormField label="Username" required component={MockInput} />);

    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders with helper text when provided', () => {
    renderWithForm(
      <FormField label="Username" helperText="Enter your username" component={MockInput} />
    );

    expect(screen.getByText('Enter your username')).toBeInTheDocument();
  });

  it('renders with error message when isInvalid and errorMessage are provided', () => {
    renderWithForm(
      <FormField label="Username" isInvalid errorMessage="Username is required" component={MockInput} />
    );

    expect(screen.getByText('Username is required')).toBeInTheDocument();
  });

  it('applies error styles when isInvalid is true', () => {
    renderWithForm(<FormField label="Username" isInvalid data-testid="form-field" component={MockInput} />);

    const formField = screen.getByTestId('form-field');
    expect(formField).toHaveClass('is-invalid');
  });

  it('renders with custom className', () => {
    renderWithForm(
      <FormField label="Username" className="custom-field" data-testid="form-field" component={MockInput} />
    );

    const formField = screen.getByTestId('form-field');
    expect(formField).toHaveClass('custom-field');
  });

  it('renders with custom style', () => {
    renderWithForm(
      <FormField label="Username" style={{ marginBottom: '20px' }} data-testid="form-field" component={MockInput} />
    );

    const formField = screen.getByTestId('form-field');
    expect(formField).toHaveStyle('margin-bottom: 20px');
  });

  it('renders with custom label placement', () => {
    renderWithForm(
      <FormField label="Username" labelPlacement="right" data-testid="form-field" component={MockInput} />
    );

    const formField = screen.getByTestId('form-field');
    expect(formField).toHaveClass('sm:flex-row-reverse');
  });

  it('renders with custom label width', () => {
    renderWithForm(
      <FormField label="Username" labelWidth="150px" labelPlacement="left" data-testid="label" component={MockInput} />
    );

    const label = screen.getByTestId('label');
    expect(label).toHaveStyle('width: 150px');
  });

  it('renders with custom label className', () => {
    renderWithForm(
      <FormField label="Username" labelClassName="custom-label" data-testid="label" component={MockInput} />
    );

    const label = screen.getByTestId('label');
    expect(label).toHaveClass('custom-label');
  });

  it('renders with custom helper text className', () => {
    renderWithForm(
      <FormField
        label="Username"
        helperText="Enter your username"
        helperTextClassName="custom-helper"
        data-testid="helper-text"
        component={MockInput}
      />
    );

    const helperText = screen.getByTestId('helper-text');
    expect(helperText).toHaveClass('custom-helper');
  });

  it('renders with custom error message className', () => {
    renderWithForm(
      <FormField
        label="Username"
        isInvalid
        errorMessage="Username is required"
        errorClassName="custom-error"
        data-testid="error-message"
        component={MockInput}
      />
    );

    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toHaveClass('custom-error');
  });

  it('renders with hidden label when hideLabel is true', () => {
    renderWithForm(<FormField label="Username" hideLabel component={MockInput} />);

    const label = screen.getByText('Username');
    expect(label).toHaveClass('sr-only');
  });

  it('renders with id passed to the label and input', () => {
    renderWithForm(<FormField label="Username" id="username-field" component={MockInput} />);

    const label = screen.getByText('Username');
    expect(label).toHaveAttribute('for', 'username-field');
  });
});
