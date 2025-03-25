import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';

describe('Input', () => {
  test('renders with default props', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders with correct value', () => {
    render(<Input value="Test Value" readOnly />);
    expect(screen.getByRole('textbox')).toHaveValue('Test Value');
  });

  test('handles change events', async () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'a');
    
    expect(handleChange).toHaveBeenCalled();
  });

  test('shows error message when provided', () => {
    render(<Input error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  test('shows helper text when provided', () => {
    render(<Input helperText="Enter your name" />);
    expect(screen.getByText('Enter your name')).toBeInTheDocument();
  });

  test('applies disabled styles when disabled', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('textbox')).toHaveClass('opacity-50');
    expect(screen.getByRole('textbox')).toHaveClass('cursor-not-allowed');
  });

  test('displays left and right icons correctly', () => {
    const leftIcon = <span data-testid="left-icon">L</span>;
    const rightIcon = <span data-testid="right-icon">R</span>;
    
    render(<Input leftIcon={leftIcon} rightIcon={rightIcon} />);
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  test('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  test('applies custom className correctly', () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  test('renders with different sizes', () => {
    const { rerender } = render(<Input size="sm" />);
    expect(screen.getByRole('textbox')).toHaveClass('px-3 py-1.5 text-sm');
    
    rerender(<Input size="md" />);
    expect(screen.getByRole('textbox')).toHaveClass('px-4 py-2 text-base');
    
    rerender(<Input size="lg" />);
    expect(screen.getByRole('textbox')).toHaveClass('px-5 py-3 text-lg');
  });

  test('renders with different variants', () => {
    const { rerender } = render(<Input variant="outline" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-gray-300');
    
    rerender(<Input variant="filled" />);
    expect(screen.getByRole('textbox')).toHaveClass('bg-gray-100');
    
    rerender(<Input variant="unstyled" />);
    expect(screen.getByRole('textbox')).toHaveClass('bg-transparent');
  });

  test('renders with label correctly', () => {
    render(<Input label="Username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
    
    // Prüfen, ob das Label mit dem Input verknüpft ist
    const label = screen.getByText('Username');
    const input = screen.getByRole('textbox');
    expect(label).toHaveAttribute('for', input.id);
  });

  test('applies fullWidth class when fullWidth prop is true', () => {
    render(<Input fullWidth />);
    const inputContainer = screen.getByRole('textbox').parentElement?.parentElement;
    expect(inputContainer).toHaveClass('w-full');
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} data-testid="input-with-ref" />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByTestId('input-with-ref'));
  });

  test('generates unique id if not provided', () => {
    render(<Input label="Username" />);
    
    const label = screen.getByText('Username');
    const input = screen.getByRole('textbox');
    
    expect(label).toHaveAttribute('for', input.id);
    expect(input.id).toMatch(/^input-/);
  });

  test('uses provided id if available', () => {
    render(<Input id="custom-id" label="Username" />);
    
    const label = screen.getByText('Username');
    const input = screen.getByRole('textbox');
    
    expect(label).toHaveAttribute('for', 'custom-id');
    expect(input.id).toBe('custom-id');
  });
});