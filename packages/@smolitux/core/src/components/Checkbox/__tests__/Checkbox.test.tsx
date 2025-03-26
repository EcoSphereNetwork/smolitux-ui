import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../Checkbox';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

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

describe('Checkbox', () => {
  // Basis-Tests
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

  // Zustände
  test('renders disabled state correctly', () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
    expect(screen.getByRole('checkbox')).toHaveClass('opacity-50');
  });

  test('renders disabled state correctly with isDisabled prop', () => {
    render(<Checkbox isDisabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
    expect(screen.getByRole('checkbox')).toHaveClass('opacity-50');
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
  
  test('renders with success message', () => {
    render(<Checkbox successMessage="Selection saved" />);
    expect(screen.getByText('Selection saved')).toBeInTheDocument();
  });
  
  test('renders with required state', () => {
    render(<Checkbox required label="Required Field" />);
    expect(screen.getByRole('checkbox')).toBeRequired();
    expect(screen.getByText('*')).toBeInTheDocument();
  });
  
  test('renders with required state using isRequired prop', () => {
    render(<Checkbox isRequired label="Required Field" />);
    expect(screen.getByRole('checkbox')).toBeRequired();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  // Größen
  test('renders with custom size', () => {
    const { rerender } = render(<Checkbox size="xs" />);
    expect(screen.getByRole('checkbox')).toHaveClass('h-3 w-3');
    
    rerender(<Checkbox size="sm" />);
    expect(screen.getByRole('checkbox')).toHaveClass('h-4 w-4');
    
    rerender(<Checkbox size="md" />);
    expect(screen.getByRole('checkbox')).toHaveClass('h-5 w-5');
    
    rerender(<Checkbox size="lg" />);
    expect(screen.getByRole('checkbox')).toHaveClass('h-6 w-6');
    
    rerender(<Checkbox size="xl" />);
    expect(screen.getByRole('checkbox')).toHaveClass('h-7 w-7');
  });

  // Varianten
  test('renders with different variants', () => {
    const { rerender } = render(<Checkbox variant="solid" />);
    expect(screen.getByRole('checkbox')).toHaveClass('bg-white');
    
    rerender(<Checkbox variant="outline" />);
    expect(screen.getByRole('checkbox')).toHaveClass('border-2');
    
    rerender(<Checkbox variant="filled" />);
    expect(screen.getByRole('checkbox')).toHaveClass('bg-gray-100');
  });
  
  // Farben
  test('renders with different color schemes', () => {
    const { rerender } = render(<Checkbox colorScheme="primary" />);
    expect(screen.getByRole('checkbox')).toHaveClass('text-primary-600');
    
    rerender(<Checkbox colorScheme="secondary" />);
    expect(screen.getByRole('checkbox')).toHaveClass('text-secondary-600');
    
    rerender(<Checkbox colorScheme="success" />);
    expect(screen.getByRole('checkbox')).toHaveClass('text-green-600');
    
    rerender(<Checkbox colorScheme="danger" />);
    expect(screen.getByRole('checkbox')).toHaveClass('text-red-600');
    
    rerender(<Checkbox colorScheme="warning" />);
    expect(screen.getByRole('checkbox')).toHaveClass('text-yellow-600');
    
    rerender(<Checkbox colorScheme="info" />);
    expect(screen.getByRole('checkbox')).toHaveClass('text-blue-600');
  });

  // Indeterminate
  test('renders with indeterminate state', () => {
    const { container } = render(<Checkbox indeterminate />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
    
    // Überprüfe die indeterminate-Eigenschaft direkt
    // @ts-ignore - Die Eigenschaft existiert, ist aber nicht im Typ definiert
    expect(checkbox.indeterminate).toBe(true);
  });
  
  // Spezielle Varianten
  test('renders as switch', () => {
    render(<Checkbox isSwitch />);
    expect(screen.getByRole('checkbox')).toHaveClass('opacity-0');
    expect(screen.getByRole('checkbox').parentElement).toHaveClass('rounded-full');
  });
  
  test('renders as radio', () => {
    render(<Checkbox isRadio />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toHaveClass('rounded-full');
  });
  
  test('renders as toggle', () => {
    render(<Checkbox isToggle />);
    expect(screen.getByRole('checkbox')).toHaveClass('opacity-0');
    expect(screen.getByRole('checkbox').parentElement).toHaveClass('rounded-full');
  });
  
  test('renders as button', () => {
    render(<Checkbox isButton label="Button Checkbox" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Button Checkbox');
    expect(screen.getByRole('checkbox')).toHaveClass('sr-only');
  });
  
  // Ausrichtung
  test('renders with label on the left', () => {
    render(<Checkbox label="Left Label" labelPosition="left" />);
    const label = screen.getByText('Left Label');
    const checkbox = screen.getByRole('checkbox');
    
    // Überprüfe, dass das Label vor der Checkbox im DOM steht
    expect(label.compareDocumentPosition(checkbox)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });
  
  test('renders with label on the right', () => {
    render(<Checkbox label="Right Label" labelPosition="right" />);
    const label = screen.getByText('Right Label');
    const checkbox = screen.getByRole('checkbox');
    
    // Überprüfe, dass die Checkbox vor dem Label im DOM steht
    expect(checkbox.compareDocumentPosition(label)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });
  
  test('renders with vertical layout', () => {
    render(<Checkbox label="Vertical Layout" isVertical />);
    expect(screen.getByTestId('checkbox-container')).toHaveClass('flex flex-col');
  });
  
  // Effekte
  test('renders with shadow', () => {
    render(<Checkbox shadow />);
    expect(screen.getByRole('checkbox')).toHaveClass('shadow-md');
  });
  
  test('renders without border', () => {
    render(<Checkbox bordered={false} variant="outline" />);
    expect(screen.getByRole('checkbox')).not.toHaveClass('border-2');
  });
  
  test('renders without rounded corners', () => {
    render(<Checkbox rounded={false} />);
    expect(screen.getByRole('checkbox')).toHaveClass('rounded-none');
  });
  
  test('renders with transparent background', () => {
    render(<Checkbox transparent />);
    expect(screen.getByRole('checkbox')).toHaveClass('bg-transparent');
  });
  
  // Barrierefreiheit
  test('renders with hidden label', () => {
    render(<Checkbox label="Hidden Label" hideLabel />);
    const labelContainer = screen.getByText('Hidden Label').closest('div');
    expect(labelContainer).toHaveClass('sr-only');
  });
  
  test('renders with hidden helper text', () => {
    render(<Checkbox helperText="Hidden Helper" hideHelperText />);
    expect(screen.queryByText('Hidden Helper')).not.toBeInTheDocument();
  });
  
  test('renders with hidden error', () => {
    render(<Checkbox error="Hidden Error" hideError />);
    expect(screen.queryByText('Hidden Error')).not.toBeInTheDocument();
  });
  
  test('renders with hidden success message', () => {
    render(<Checkbox successMessage="Hidden Success" hideSuccessMessage />);
    expect(screen.queryByText('Hidden Success')).not.toBeInTheDocument();
  });
  
  test('renders with description for screen readers', () => {
    render(<Checkbox description="Description for screen readers" />);
    expect(screen.getByText('Description for screen readers')).toHaveClass('sr-only');
  });
  
  // Event-Handler
  test('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(<Checkbox onFocus={handleFocus} onBlur={handleBlur} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.focus(checkbox);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(checkbox);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
  
  test('handles keyboard events', () => {
    const handleKeyDown = jest.fn();
    render(<Checkbox onKeyDown={handleKeyDown} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.keyDown(checkbox, { key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });
  
  // Refs und IDs
  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} data-testid="checkbox-with-ref" />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByTestId('checkbox-with-ref'));
  });
  
  test('applies custom className correctly', () => {
    render(<Checkbox className="custom-class" />);
    expect(screen.getByRole('checkbox').parentElement?.parentElement?.parentElement).toHaveClass('custom-class');
  });
  
  test('applies custom containerClassName correctly', () => {
    render(<Checkbox containerClassName="container-class" />);
    expect(screen.getByRole('checkbox').parentElement?.parentElement?.parentElement).toHaveClass('container-class');
  });
  
  test('applies custom checkboxContainerClassName correctly', () => {
    render(<Checkbox checkboxContainerClassName="checkbox-container-class" />);
    expect(screen.getByRole('checkbox')).toHaveClass('checkbox-container-class');
  });
  
  test('applies custom labelClassName correctly', () => {
    render(<Checkbox label="Custom Label" labelClassName="label-class" />);
    expect(screen.getByText('Custom Label')).toHaveClass('label-class');
  });
  
  test('applies custom helperTextClassName correctly', () => {
    render(<Checkbox helperText="Custom Helper" helperTextClassName="helper-class" />);
    expect(screen.getByText('Custom Helper')).toHaveClass('helper-class');
  });
  
  test('applies custom errorClassName correctly', () => {
    render(<Checkbox error="Custom Error" errorClassName="error-class" />);
    expect(screen.getByText('Custom Error')).toHaveClass('error-class');
  });
  
  test('applies custom successClassName correctly', () => {
    render(<Checkbox successMessage="Custom Success" successClassName="success-class" />);
    expect(screen.getByText('Custom Success')).toHaveClass('success-class');
  });
  
  // Attribute
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
  
  // Auto-Focus
  test('auto-focuses when autoFocus is true', () => {
    const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');
    render(<Checkbox autoFocus />);
    
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });
  
  // Icons
  test('renders with custom icon', () => {
    const icon = <span data-testid="custom-icon">*</span>;
    render(<Checkbox icon={icon} />);
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
  
  test('renders with custom checked icon', () => {
    const checkedIcon = <span data-testid="checked-icon">V</span>;
    render(<Checkbox checkedIcon={checkedIcon} checked />);
    
    expect(screen.getByTestId('checked-icon')).toBeInTheDocument();
  });
  
  test('renders with custom unchecked icon', () => {
    const uncheckedIcon = <span data-testid="unchecked-icon">O</span>;
    render(<Checkbox uncheckedIcon={uncheckedIcon} />);
    
    expect(screen.getByTestId('unchecked-icon')).toBeInTheDocument();
  });
  
  test('renders with custom indeterminate icon', () => {
    const indeterminateIcon = <span data-testid="indeterminate-icon">-</span>;
    render(<Checkbox indeterminateIcon={indeterminateIcon} indeterminate />);
    
    expect(screen.getByTestId('indeterminate-icon')).toBeInTheDocument();
  });
});