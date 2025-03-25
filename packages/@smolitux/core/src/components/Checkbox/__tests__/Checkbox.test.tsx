import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../Checkbox';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('Checkbox', () => {
  test('renders correctly with default props', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  test('renders with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  test('renders checked state correctly', () => {
    render(<Checkbox checked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('handles change events', async () => {
    const handleChange = jest.fn();
    render(<Checkbox onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('renders disabled state correctly', () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  test('does not trigger onChange when disabled', async () => {
    const handleChange = jest.fn();
    render(<Checkbox onChange={handleChange} disabled />);
    
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('renders with helper text', () => {
    render(<Checkbox helperText="This is helper text" />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  test('renders with error state', () => {
    render(<Checkbox error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  test('renders with custom size', () => {
    const { rerender } = render(<Checkbox size="sm" />);
    expect(screen.getByRole('checkbox')).toHaveClass('h-4 w-4');
    
    rerender(<Checkbox size="md" />);
    expect(screen.getByRole('checkbox')).toHaveClass('h-5 w-5');
    
    rerender(<Checkbox size="lg" />);
    expect(screen.getByRole('checkbox')).toHaveClass('h-6 w-6');
  });

  test('renders with custom color', () => {
    render(<Checkbox color="accent" />);
    expect(screen.getByRole('checkbox')).toHaveClass('accent-accent-500');
  });

  test('renders with indeterminate state', () => {
    render(<Checkbox indeterminate />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
    // In a real implementation, we would also check for the indeterminate property
    // but this requires a ref which is harder to test
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} data-testid="checkbox-with-ref" />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByTestId('checkbox-with-ref'));
  });

  test('applies custom className correctly', () => {
    render(<Checkbox className="custom-class" />);
    expect(screen.getByRole('checkbox')).toHaveClass('custom-class');
  });

  test('renders with required attribute', () => {
    render(<Checkbox required />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('required');
  });

  test('renders with name attribute', () => {
    render(<Checkbox name="terms" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'terms');
  });

  test('renders with value attribute', () => {
    render(<Checkbox value="accepted" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('value', 'accepted');
  });

  test('renders with id attribute', () => {
    render(<Checkbox id="terms-checkbox" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'terms-checkbox');
  });

  test('generates unique id if not provided', () => {
    render(<Checkbox label="Terms" />);
    
    const label = screen.getByText('Terms');
    const checkbox = screen.getByRole('checkbox');
    
    expect(label).toHaveAttribute('for', checkbox.id);
    expect(checkbox.id).toMatch(/^checkbox-/);
  });
});