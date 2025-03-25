import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../Select';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

describe('Select', () => {
  test('renders with default props', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('renders all options correctly', () => {
    render(<Select options={options} />);
    
    const selectElement = screen.getByRole('combobox');
    const optionElements = screen.getAllByRole('option');
    
    expect(optionElements).toHaveLength(3);
    expect(optionElements[0]).toHaveTextContent('Option 1');
    expect(optionElements[1]).toHaveTextContent('Option 2');
    expect(optionElements[2]).toHaveTextContent('Option 3');
  });

  test('handles disabled options correctly', () => {
    render(<Select options={options} />);
    
    const optionElements = screen.getAllByRole('option');
    expect(optionElements[2]).toBeDisabled();
  });

  test('handles change events', async () => {
    const handleChange = jest.fn();
    render(<Select options={options} onChange={handleChange} />);
    
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'option2' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  test('shows error message when provided', () => {
    render(<Select options={options} error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  test('shows helper text when provided', () => {
    render(<Select options={options} helperText="Select an option" />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  test('applies disabled styles when disabled', () => {
    render(<Select options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
    expect(screen.getByRole('combobox')).toHaveClass('opacity-50');
    expect(screen.getByRole('combobox')).toHaveClass('cursor-not-allowed');
  });

  test('displays left icon correctly', () => {
    const leftIcon = <span data-testid="left-icon">L</span>;
    
    render(<Select options={options} leftIcon={leftIcon} />);
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  test('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    
    render(<Select options={options} onFocus={handleFocus} onBlur={handleBlur} />);
    
    const selectElement = screen.getByRole('combobox');
    fireEvent.focus(selectElement);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(selectElement);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  test('applies custom className correctly', () => {
    render(<Select options={options} className="custom-class" />);
    expect(screen.getByRole('combobox')).toHaveClass('custom-class');
  });

  test('renders with different sizes', () => {
    const { rerender } = render(<Select options={options} size="sm" />);
    expect(screen.getByRole('combobox')).toHaveClass('px-3 py-1.5 text-sm');
    
    rerender(<Select options={options} size="md" />);
    expect(screen.getByRole('combobox')).toHaveClass('px-4 py-2 text-base');
    
    rerender(<Select options={options} size="lg" />);
    expect(screen.getByRole('combobox')).toHaveClass('px-5 py-3 text-lg');
  });

  test('renders with label correctly', () => {
    render(<Select options={options} label="Country" />);
    expect(screen.getByText('Country')).toBeInTheDocument();
    
    // Prüfen, ob das Label mit dem Select verknüpft ist
    const label = screen.getByText('Country');
    const select = screen.getByRole('combobox');
    expect(label).toHaveAttribute('for', select.id);
  });

  test('applies fullWidth class when fullWidth prop is true', () => {
    render(<Select options={options} fullWidth />);
    const selectContainer = screen.getByRole('combobox').parentElement?.parentElement;
    expect(selectContainer).toHaveClass('w-full');
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSelectElement>();
    render(<Select options={options} ref={ref} data-testid="select-with-ref" />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByTestId('select-with-ref'));
  });

  test('generates unique id if not provided', () => {
    render(<Select options={options} label="Country" />);
    
    const label = screen.getByText('Country');
    const select = screen.getByRole('combobox');
    
    expect(label).toHaveAttribute('for', select.id);
    expect(select.id).toMatch(/^select-/);
  });

  test('uses provided id if available', () => {
    render(<Select options={options} id="custom-id" label="Country" />);
    
    const label = screen.getByText('Country');
    const select = screen.getByRole('combobox');
    
    expect(label).toHaveAttribute('for', 'custom-id');
    expect(select.id).toBe('custom-id');
  });
});