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

  it('renders with required indicator when required is true', () => {
    render(
      <FormField label="Username" required>
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
      <FormField label="Username" isInvalid>
        <input type="text" name="username" />
      </FormField>
    );

    const formField = screen.getByTestId('FormField');
    expect(formField).toHaveClass('form-field--invalid');
  });

  it('renders with custom className', () => {
    render(
      <FormField label="Username" className="custom-field">
        <input type="text" name="username" />
      </FormField>
    );

    const formField = screen.getByTestId('FormField');
    expect(formField).toHaveClass('custom-field');
  });

  it('renders with custom style', () => {
    render(
      <FormField label="Username" style={{ marginBottom: '20px' }}>
        <input type="text" name="username" />
      </FormField>
    );

    const formField = screen.getByTestId('FormField');
    expect(formField).toHaveStyle('margin-bottom: 20px');
  });

  it('renders with custom label placement', () => {
    render(
      <FormField label="Username" labelPlacement="right">
        <input type="text" name="username" />
      </FormField>
    );

    const formField = screen.getByTestId('FormField');
    expect(formField).toHaveClass('form-field--reverse');
  });

  it('renders with custom label width', () => {
    render(
      <FormField label="Username" labelWidth="150px" labelPlacement="left">
        <input type="text" name="username" />
      </FormField>
    );

    const label = screen.getByText('Username');
    expect(label).toHaveStyle('width: 150px');
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

  it('generates field ID from name when id is not provided', () => {
    render(
      <FormField label="Username" name="username">
        <input type="text" name="username" />
      </FormField>
    );

    const label = screen.getByText('Username');
    expect(label).toHaveAttribute('for', 'field-username');
  });

  it('renders character counter when enabled', () => {
    render(
      <FormField label="Username" showCounter maxLength={10} value="hello">
        <input type="text" name="username" />
      </FormField>
    );

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('shows loading indicator when loading', () => {
    render(
      <FormField label="Username" loading>
        <input type="text" name="username" />
      </FormField>
    );

    const formField = screen.getByTestId('FormField');
    expect(formField).toHaveClass('form-field--loading');
  });
});
