import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../Input';

// Mock für den FormControl-Context
jest.mock('../../FormControl', () => ({
  useFormControl: () => ({
    disabled: false,
    required: false,
    hasError: false,
    id: undefined,
    label: undefined,
    name: undefined,
    size: 'md',
    readOnly: false,
    isFocused: false,
    isValid: false,
    isInvalid: false,
    isSuccess: false,
    isLoading: false
  })
}));

describe('Input Component', () => {
  test('renders correctly with default props', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('bg-white');
  });
  
  test('renders with label', () => {
    render(<Input label="Username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });
  
  test('renders with helper text', () => {
    render(<Input helperText="Enter your username" />);
    expect(screen.getByText('Enter your username')).toBeInTheDocument();
  });
  
  test('renders with error message', () => {
    render(<Input error="Username is required" />);
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });
  
  test('renders with success message', () => {
    render(<Input successMessage="Username is available" />);
    expect(screen.getByText('Username is available')).toBeInTheDocument();
  });
  
  test('renders with left icon', () => {
    const leftIcon = <span data-testid="left-icon">@</span>;
    render(<Input leftIcon={leftIcon} />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });
  
  test('renders with right icon', () => {
    const rightIcon = <span data-testid="right-icon">✓</span>;
    render(<Input rightIcon={rightIcon} />);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });
  
  test('renders with different sizes', () => {
    const { rerender } = render(<Input size="xs" />);
    expect(screen.getByRole('textbox')).toHaveClass('px-2 py-1 text-xs');
    
    rerender(<Input size="sm" />);
    expect(screen.getByRole('textbox')).toHaveClass('px-3 py-1.5 text-sm');
    
    rerender(<Input size="md" />);
    expect(screen.getByRole('textbox')).toHaveClass('px-4 py-2 text-base');
    
    rerender(<Input size="lg" />);
    expect(screen.getByRole('textbox')).toHaveClass('px-5 py-3 text-lg');
    
    rerender(<Input size="xl" />);
    expect(screen.getByRole('textbox')).toHaveClass('px-6 py-4 text-xl');
  });
  
  test('renders with different variants', () => {
    const { rerender } = render(<Input variant="outline" />);
    expect(screen.getByRole('textbox')).toHaveClass('border');
    
    rerender(<Input variant="filled" />);
    expect(screen.getByRole('textbox')).toHaveClass('bg-gray-100');
    
    rerender(<Input variant="flushed" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-b-2');
    
    rerender(<Input variant="unstyled" />);
    expect(screen.getByRole('textbox')).toHaveClass('bg-transparent');
  });
  
  test('renders with full width', () => {
    render(<Input fullWidth />);
    expect(screen.getByRole('textbox').parentElement?.parentElement?.parentElement).toHaveClass('w-full');
  });
  
  test('renders with shadow', () => {
    render(<Input shadow />);
    expect(screen.getByRole('textbox')).toHaveClass('shadow-md');
  });
  
  test('renders without border', () => {
    render(<Input bordered={false} />);
    expect(screen.getByRole('textbox')).not.toHaveClass('border');
  });
  
  test('renders without rounded corners', () => {
    render(<Input rounded={false} />);
    expect(screen.getByRole('textbox')).not.toHaveClass('rounded-md');
  });
  
  test('renders with transparent background', () => {
    render(<Input transparent />);
    expect(screen.getByRole('textbox')).toHaveClass('bg-transparent');
  });
  
  test('renders with counter when showCounter is true', () => {
    render(<Input showCounter maxLength={10} value="Hello" />);
    expect(screen.getByText('5/10')).toBeInTheDocument();
  });
  
  test('renders with progress bar when showProgressBar is true', () => {
    render(<Input showProgressBar progressValue={50} progressMax={100} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });
  
  test('renders with loading indicator', () => {
    render(<Input isLoading showLoadingIndicator />);
    expect(screen.getByText('⟳')).toBeInTheDocument();
  });
  
  test('renders with error indicator', () => {
    render(<Input error="Error" showErrorIndicator />);
    expect(screen.getByText('✕')).toBeInTheDocument();
  });
  
  test('renders with success indicator', () => {
    render(<Input isSuccess showSuccessIndicator />);
    expect(screen.getByText('✓')).toBeInTheDocument();
  });
  
  test('renders with validation indicator', () => {
    render(<Input isValid showValidationIndicator />);
    expect(screen.getByText('✓')).toBeInTheDocument();
  });
  
  test('renders with hidden label', () => {
    render(<Input label="Hidden Label" hideLabel />);
    expect(screen.getByText('Hidden Label')).toHaveClass('sr-only');
  });
  
  test('renders with description for screen readers', () => {
    render(<Input description="Description for screen readers" />);
    expect(screen.getByText('Description for screen readers')).toHaveClass('sr-only');
  });
  
  test('renders with clickable right icon', () => {
    const handleClick = jest.fn();
    const rightIcon = <span data-testid="right-icon">✓</span>;
    render(<Input rightIcon={rightIcon} isRightIconClickable onRightIconClick={handleClick} />);
    
    fireEvent.click(screen.getByTestId('right-icon').parentElement as HTMLElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('renders with clickable left icon', () => {
    const handleClick = jest.fn();
    const leftIcon = <span data-testid="left-icon">@</span>;
    render(<Input leftIcon={leftIcon} isLeftIconClickable onLeftIconClick={handleClick} />);
    
    fireEvent.click(screen.getByTestId('left-icon').parentElement as HTMLElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('renders with password toggle', () => {
    render(<Input type="password" showPasswordToggle />);
    
    // Anfangs sollte das Passwort verborgen sein
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'password');
    
    // Nach dem Klick auf das Icon sollte das Passwort sichtbar sein
    fireEvent.click(screen.getByRole('button', { name: /Passwort anzeigen/i }));
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    
    // Nach einem weiteren Klick sollte das Passwort wieder verborgen sein
    fireEvent.click(screen.getByRole('button', { name: /Passwort verbergen/i }));
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'password');
  });
  
  test('renders with clearable button', () => {
    const handleClear = jest.fn();
    render(<Input value="Test" isClearable onClear={handleClear} />);
    
    fireEvent.click(screen.getByRole('button', { name: /Eingabe löschen/i }));
    expect(handleClear).toHaveBeenCalledTimes(1);
  });
  
  test('renders with prefix', () => {
    const prefix = <span data-testid="prefix">$</span>;
    render(<Input prefix={prefix} />);
    expect(screen.getByTestId('prefix')).toBeInTheDocument();
  });
  
  test('renders with suffix', () => {
    const suffix = <span data-testid="suffix">kg</span>;
    render(<Input suffix={suffix} />);
    expect(screen.getByTestId('suffix')).toBeInTheDocument();
  });
  
  test('renders with datalist', () => {
    render(<Input list="options" datalist={['Option 1', 'Option 2', 'Option 3']} />);
    
    const datalist = document.getElementById('options');
    expect(datalist).toBeInTheDocument();
    expect(datalist?.children.length).toBe(3);
  });
  
  test('calls onChange handler when value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New Value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  
  test('calls onFocus handler when input is focused', () => {
    const handleFocus = jest.fn();
    render(<Input onFocus={handleFocus} />);
    
    fireEvent.focus(screen.getByRole('textbox'));
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });
  
  test('calls onBlur handler when input loses focus', () => {
    const handleBlur = jest.fn();
    render(<Input onBlur={handleBlur} />);
    
    fireEvent.blur(screen.getByRole('textbox'));
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
  
  test('formats value on blur when formatOnBlur is true', () => {
    const formatValue = jest.fn(value => `$${value}`);
    render(<Input formatValue={formatValue} formatOnBlur />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '100' } });
    fireEvent.blur(input);
    
    expect(formatValue).toHaveBeenCalledWith('100');
  });
  
  test('formats value on type when formatOnType is true', () => {
    const formatValue = jest.fn(value => `$${value}`);
    render(<Input formatValue={formatValue} formatOnType />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '100' } });
    
    expect(formatValue).toHaveBeenCalledWith('100');
  });
  
  test('auto-selects text when autoSelect is true', () => {
    const selectSpy = jest.spyOn(HTMLInputElement.prototype, 'select');
    render(<Input value="Test" autoFocus autoSelect />);
    
    expect(selectSpy).toHaveBeenCalled();
    selectSpy.mockRestore();
  });
  
  test('renders with different input types', () => {
    const types = ['text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date'];
    
    types.forEach(type => {
      const { unmount } = render(<Input type={type} />);
      expect(screen.getByRole(type === 'text' ? 'textbox' : 'spinbutton')).toHaveAttribute('type', type);
      unmount();
    });
  });
  
  test('renders with disabled state', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('textbox')).toHaveClass('opacity-50');
  });
  
  test('renders with readonly state', () => {
    render(<Input readOnly />);
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
  });
  
  test('renders with required state', () => {
    render(<Input required label="Required Field" />);
    expect(screen.getByRole('textbox')).toBeRequired();
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});