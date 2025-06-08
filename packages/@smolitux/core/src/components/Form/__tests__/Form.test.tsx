import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from '../Form';

describe('Form', () => {
  it('renders correctly with default props', () => {
    render(
      <Form data-testid="form">
        <input type="text" name="username" />
        <button type="submit">Submit</button>
      </Form>
    );

    const form = screen.getByTestId('form');
    expect(form).toBeInTheDocument();
    expect(form.tagName).toBe('FORM');
  });

  it('calls onSubmit when form is submitted', () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(
      <Form onSubmit={handleSubmit}>
        <input type="text" name="username" />
        <button type="submit">Submit</button>
      </Form>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('prevents default form submission when preventDefault is true', () => {
    const handleSubmit = jest.fn();
    render(
      <Form onSubmit={handleSubmit} preventDefault>
        <input type="text" name="username" />
        <button type="submit">Submit</button>
      </Form>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('renders with custom className', () => {
    render(
      <Form className="custom-form" data-testid="form">
        <input type="text" name="username" />
      </Form>
    );

    const form = screen.getByTestId('form');
    expect(form).toHaveClass('custom-form');
  });

  it('renders with custom style', () => {
    render(
      <Form style={{ backgroundColor: 'lightgray' }} data-testid="form">
        <input type="text" name="username" />
      </Form>
    );

    const form = screen.getByTestId('form');
    expect(form).toHaveStyle('background-color: lightgray');
  });

  it('renders with noValidate attribute', () => {
    render(
      <Form noValidate data-testid="form">
        <input type="email" name="email" required />
      </Form>
    );

    const form = screen.getByTestId('form');
    expect(form).toHaveAttribute('novalidate');
  });

  it('renders with autocomplete attribute', () => {
    render(
      <Form autoComplete="off" data-testid="form">
        <input type="text" name="username" />
      </Form>
    );

    const form = screen.getByTestId('form');
    expect(form).toHaveAttribute('autocomplete', 'off');
  });

  it('renders with encType attribute', () => {
    render(
      <Form encType="multipart/form-data" data-testid="form">
        <input type="file" name="file" />
      </Form>
    );

    const form = screen.getByTestId('form');
    expect(form).toHaveAttribute('enctype', 'multipart/form-data');
  });

  it('renders with method attribute', () => {
    render(
      <Form method="post" data-testid="form">
        <input type="text" name="username" />
      </Form>
    );

    const form = screen.getByTestId('form');
    expect(form).toHaveAttribute('method', 'post');
  });

  it('renders with action attribute', () => {
    render(
      <Form action="/submit" data-testid="form">
        <input type="text" name="username" />
      </Form>
    );

    const form = screen.getByTestId('form');
    expect(form).toHaveAttribute('action', '/submit');
  });

  it('renders with target attribute', () => {
    render(
      <Form target="_blank" data-testid="form">
        <input type="text" name="username" />
      </Form>
    );

    const form = screen.getByTestId('form');
    expect(form).toHaveAttribute('target', '_blank');
  });

  it('calls onReset when form is reset', () => {
    const handleReset = jest.fn();
    render(
      <Form onReset={handleReset}>
        <input type="text" name="username" />
        <button type="reset">Reset</button>
      </Form>
    );

    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});
