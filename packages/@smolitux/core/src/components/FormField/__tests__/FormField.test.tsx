import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormField } from '../FormField';

describe('FormField', () => {
  it('renders correctly with default props', () => {
    render(
      <FormField label="Username">
        <input type="text" name="username" />
      </FormField>
    );

    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with required indicator when isRequired is true', () => {
    render(
      <FormField label="Username" isRequired>
        <input type="text" name="username" />
      </FormField>
    );

    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders with helper text when provided', () => {
    render(
      <FormField label="Username" helperText="Enter your username">
        <input type="text" name="username" />
      </FormField>
    );

    expect(screen.getByText('Enter your username')).toBeInTheDocument();
  });

  it('renders with error message when isInvalid and errorMessage are provided', () => {
    render(
      <FormField label="Username" isInvalid errorMessage="Username is required">
        <input type="text" name="username" />
      </FormField>
    );

    expect(screen.getByText('Username is required')).toBeInTheDocument();
  });

  it('applies error styles when isInvalid is true', () => {
    render(
      <FormField label="Username" isInvalid data-testid="form-field">
        <input type="text" name="username" />
      </FormField>
    );

    const formField = screen.getByTestId('form-field');
    expect(formField).toHaveClass('is-invalid');
  });

  it('renders with custom className', () => {
    render(
      <FormField label="Username" className="custom-field" data-testid="form-field">
        <input type="text" name="username" />
      </FormField>
    );

    const formField = screen.getByTestId('form-field');
    expect(formField).toHaveClass('custom-field');
  });

  it('renders with custom style', () => {
    render(
      <FormField label="Username" style={{ marginBottom: '20px' }} data-testid="form-field">
        <input type="text" name="username" />
      </FormField>
    );

    const formField = screen.getByTestId('form-field');
    expect(formField).toHaveStyle('margin-bottom: 20px');
  });

  it('renders with custom label position', () => {
    render(
      <FormField label="Username" labelPosition="right" data-testid="form-field">
        <input type="text" name="username" />
      </FormField>
    );

    const formField = screen.getByTestId('form-field');
    expect(formField).toHaveClass('label-right');
  });

  it('renders with custom label width', () => {
    render(
      <FormField label="Username" labelWidth="150px" data-testid="label">
        <input type="text" name="username" />
      </FormField>
    );

    const label = screen.getByTestId('label');
    expect(label).toHaveStyle('width: 150px');
  });

  it('renders with custom label className', () => {
    render(
      <FormField label="Username" labelClassName="custom-label" data-testid="label">
        <input type="text" name="username" />
      </FormField>
    );

    const label = screen.getByTestId('label');
    expect(label).toHaveClass('custom-label');
  });

  it('renders with custom helper text className', () => {
    render(
      <FormField
        label="Username"
        helperText="Enter your username"
        helperTextClassName="custom-helper"
        data-testid="helper-text"
      >
        <input type="text" name="username" />
      </FormField>
    );

    const helperText = screen.getByTestId('helper-text');
    expect(helperText).toHaveClass('custom-helper');
  });

  it('renders with custom error message className', () => {
    render(
      <FormField
        label="Username"
        isInvalid
        errorMessage="Username is required"
        errorClassName="custom-error"
        data-testid="error-message"
      >
        <input type="text" name="username" />
      </FormField>
    );

    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toHaveClass('custom-error');
  });

  it('renders with hidden label when hideLabel is true', () => {
    render(
      <FormField label="Username" hideLabel>
        <input type="text" name="username" />
      </FormField>
    );

    expect(screen.queryByText('Username')).not.toBeVisible();
  });

  it('renders with id passed to the label and input', () => {
    render(
      <FormField label="Username" id="username-field">
        <input type="text" name="username" />
      </FormField>
    );

    const label = screen.getByText('Username');
    expect(label).toHaveAttribute('for', 'username-field');
  });
});
