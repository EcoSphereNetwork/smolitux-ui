import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../Select';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true }
];

const mockGroupedOptions = [
  { value: 'option1', label: 'Option 1', group: 'Group 1' },
  { value: 'option2', label: 'Option 2', group: 'Group 1' },
  { value: 'option3', label: 'Option 3', group: 'Group 2' }
];

const mockOptionsWithDescriptions = [
  { value: 'option1', label: 'Option 1', description: 'Description 1' },
  { value: 'option2', label: 'Option 2', description: 'Description 2' }
];

describe('Select Component', () => {
  test('renders correctly with default props', () => {
    render(<Select options={mockOptions} />);
    
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveClass('bg-white');
    expect(selectElement).toHaveClass('rounded-md');
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('Option 1');
    expect(options[1]).toHaveTextContent('Option 2');
    expect(options[2]).toHaveTextContent('Option 3');
  });
  
  test('renders with label', () => {
    render(<Select options={mockOptions} label="Test Label" />);
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });
  
  test('renders with helper text', () => {
    render(<Select options={mockOptions} helperText="Helper Text" />);
    
    expect(screen.getByText('Helper Text')).toBeInTheDocument();
  });
  
  test('renders with error message', () => {
    render(<Select options={mockOptions} error="Error Message" />);
    
    const errorMessage = screen.getByText('Error Message');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-red-600');
    
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveAttribute('aria-invalid', 'true');
  });
  
  test('renders with different sizes', () => {
    const { rerender } = render(<Select options={mockOptions} size="sm" />);
    expect(screen.getByRole('combobox')).toHaveClass('px-3 py-1.5 text-sm');
    
    rerender(<Select options={mockOptions} size="md" />);
    expect(screen.getByRole('combobox')).toHaveClass('px-4 py-2 text-base');
    
    rerender(<Select options={mockOptions} size="lg" />);
    expect(screen.getByRole('combobox')).toHaveClass('px-5 py-3 text-lg');
    
    rerender(<Select options={mockOptions} size="xs" />);
    expect(screen.getByRole('combobox')).toHaveClass('px-2 py-1 text-xs');
  });
  
  test('renders with different variants', () => {
    const { rerender } = render(<Select options={mockOptions} variant="default" />);
    expect(screen.getByRole('combobox')).toHaveClass('bg-white');
    
    rerender(<Select options={mockOptions} variant="filled" />);
    expect(screen.getByRole('combobox')).toHaveClass('bg-gray-100');
    
    rerender(<Select options={mockOptions} variant="outlined" />);
    expect(screen.getByRole('combobox')).toHaveClass('bg-transparent');
    
    rerender(<Select options={mockOptions} variant="unstyled" />);
    expect(screen.getByRole('combobox')).toHaveClass('bg-transparent');
    expect(screen.getByRole('combobox')).toHaveClass('border-0');
  });
  
  test('renders with full width', () => {
    render(<Select options={mockOptions} fullWidth />);
    
    const container = screen.getByRole('combobox').parentElement?.parentElement;
    expect(container).toHaveClass('w-full');
  });
  
  test('renders with left icon', () => {
    const leftIcon = <span data-testid="left-icon">★</span>;
    render(<Select options={mockOptions} leftIcon={leftIcon} />);
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveClass('pl-10');
  });
  
  test('renders with right icon', () => {
    const rightIcon = <span data-testid="right-icon">★</span>;
    render(<Select options={mockOptions} rightIcon={rightIcon} />);
    
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });
  
  test('renders with placeholder', () => {
    render(<Select options={mockOptions} placeholder="Select an option" />);
    
    const placeholderOption = screen.getByRole('option', { name: 'Select an option' });
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption).toHaveValue('');
  });
  
  test('renders with required indicator', () => {
    render(<Select options={mockOptions} label="Test Label" required />);
    
    const requiredIndicator = screen.getByText('*');
    expect(requiredIndicator).toBeInTheDocument();
    expect(requiredIndicator).toHaveClass('text-red-500');
    
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveAttribute('aria-required', 'true');
  });
  
  test('renders in disabled state', () => {
    render(<Select options={mockOptions} disabled />);
    
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeDisabled();
    expect(selectElement).toHaveClass('opacity-50');
    expect(selectElement).toHaveClass('cursor-not-allowed');
    expect(selectElement).toHaveAttribute('aria-disabled', 'true');
  });
  
  test('renders in readonly state', () => {
    render(<Select options={mockOptions} readOnly />);
    
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveAttribute('readonly', '');
    expect(selectElement).toHaveClass('opacity-70');
    expect(selectElement).toHaveClass('cursor-default');
    expect(selectElement).toHaveAttribute('aria-readonly', 'true');
  });
  
  test('renders with grouped options', () => {
    render(<Select options={mockGroupedOptions} groupOptions />);
    
    const optgroups = screen.getAllByRole('group');
    expect(optgroups).toHaveLength(2);
    expect(optgroups[0]).toHaveAttribute('label', 'Group 1');
    expect(optgroups[1]).toHaveAttribute('label', 'Group 2');
  });
  
  test('renders with option descriptions', () => {
    render(<Select options={mockOptionsWithDescriptions} showOptionDescription />);
    
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('title', 'Description 1');
    expect(options[0]).toHaveAttribute('data-description', 'Description 1');
    expect(options[1]).toHaveAttribute('title', 'Description 2');
    expect(options[1]).toHaveAttribute('data-description', 'Description 2');
  });
  
  test('calls onChange when value changes', async () => {
    const handleChange = jest.fn();
    render(<Select options={mockOptions} onChange={handleChange} />);
    
    await userEvent.selectOptions(screen.getByRole('combobox'), 'option2');
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  
  test('calls onValueChange when value changes', async () => {
    const handleValueChange = jest.fn();
    render(<Select options={mockOptions} onValueChange={handleValueChange} />);
    
    await userEvent.selectOptions(screen.getByRole('combobox'), 'option2');
    
    expect(handleValueChange).toHaveBeenCalledTimes(1);
    expect(handleValueChange).toHaveBeenCalledWith('option2');
  });
  
  test('calls onFocusChange when focus changes', () => {
    const handleFocusChange = jest.fn();
    render(<Select options={mockOptions} onFocusChange={handleFocusChange} />);
    
    const selectElement = screen.getByRole('combobox');
    
    fireEvent.focus(selectElement);
    expect(handleFocusChange).toHaveBeenCalledWith(true);
    
    fireEvent.blur(selectElement);
    expect(handleFocusChange).toHaveBeenCalledWith(false);
  });
  
  test('auto focuses when autoFocus is true', () => {
    render(<Select options={mockOptions} autoFocus />);
    
    expect(screen.getByRole('combobox')).toHaveFocus();
  });
  
  test('renders with tooltip', () => {
    render(<Select options={mockOptions} tooltip="Tooltip Text" />);
    
    const container = screen.getByRole('combobox').parentElement?.parentElement;
    expect(container).toHaveAttribute('title', 'Tooltip Text');
  });
  
  test('renders with custom class names', () => {
    render(
      <Select 
        options={mockOptions} 
        className="custom-class"
        containerClassName="container-class"
        labelClassName="label-class"
        helperTextClassName="helper-class"
        errorClassName="error-class"
        label="Label"
        helperText="Helper"
      />
    );
    
    expect(screen.getByRole('combobox')).toHaveClass('custom-class');
    expect(screen.getByRole('combobox').parentElement?.parentElement).toHaveClass('container-class');
    expect(screen.getByText('Label')).toHaveClass('label-class');
    expect(screen.getByText('Helper')).toHaveClass('helper-class');
  });
});