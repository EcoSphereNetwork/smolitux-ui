import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from '../Radio';
import { RadioGroup } from '../RadioGroup';

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

describe('Radio', () => {
  // Basis-Tests
  test('renders correctly with default props', () => {
    render(<Radio value="option1" />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

  test('renders with label', () => {
    render(<Radio value="option1" label="Option 1" />);
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  test('renders checked state correctly', () => {
    render(<Radio value="option1" checked />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  test('handles change events', async () => {
    const handleChange = jest.fn();
    render(<Radio value="option1" onChange={handleChange} />);
    
    const radio = screen.getByRole('radio');
    await userEvent.click(radio);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  // Zustände
  test('renders disabled state correctly', () => {
    render(<Radio value="option1" disabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
    expect(screen.getByRole('radio')).toHaveClass('opacity-50');
  });

  test('renders disabled state correctly with isDisabled prop', () => {
    render(<Radio value="option1" isDisabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
    expect(screen.getByRole('radio')).toHaveClass('opacity-50');
  });

  test('does not trigger onChange when disabled', async () => {
    const handleChange = jest.fn();
    render(<Radio value="option1" onChange={handleChange} disabled />);
    
    const radio = screen.getByRole('radio');
    await userEvent.click(radio);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('renders with helper text', () => {
    render(<Radio value="option1" helperText="This is helper text" />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  test('renders with error state', () => {
    render(<Radio value="option1" error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'true');
  });
  
  test('renders with success message', () => {
    render(<Radio value="option1" successMessage="Selection saved" />);
    expect(screen.getByText('Selection saved')).toBeInTheDocument();
  });
  
  test('renders with required state', () => {
    render(<Radio value="option1" required label="Required Field" />);
    expect(screen.getByRole('radio')).toBeRequired();
    expect(screen.getByText('*')).toBeInTheDocument();
  });
  
  test('renders with required state using isRequired prop', () => {
    render(<Radio value="option1" isRequired label="Required Field" />);
    expect(screen.getByRole('radio')).toBeRequired();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  // Größen
  test('renders with custom size', () => {
    const { rerender } = render(<Radio value="option1" size="xs" />);
    expect(screen.getByRole('radio')).toHaveClass('h-3 w-3');
    
    rerender(<Radio value="option1" size="sm" />);
    expect(screen.getByRole('radio')).toHaveClass('h-4 w-4');
    
    rerender(<Radio value="option1" size="md" />);
    expect(screen.getByRole('radio')).toHaveClass('h-5 w-5');
    
    rerender(<Radio value="option1" size="lg" />);
    expect(screen.getByRole('radio')).toHaveClass('h-6 w-6');
    
    rerender(<Radio value="option1" size="xl" />);
    expect(screen.getByRole('radio')).toHaveClass('h-7 w-7');
  });

  // Varianten
  test('renders with different variants', () => {
    const { rerender } = render(<Radio value="option1" variant="solid" />);
    expect(screen.getByRole('radio')).toHaveClass('bg-white');
    
    rerender(<Radio value="option1" variant="outline" />);
    expect(screen.getByRole('radio')).toHaveClass('border-2');
    
    rerender(<Radio value="option1" variant="filled" />);
    expect(screen.getByRole('radio')).toHaveClass('bg-gray-100');
  });
  
  // Farben
  test('renders with different color schemes', () => {
    const { rerender } = render(<Radio value="option1" colorScheme="primary" />);
    expect(screen.getByRole('radio')).toHaveClass('text-primary-600');
    
    rerender(<Radio value="option1" colorScheme="secondary" />);
    expect(screen.getByRole('radio')).toHaveClass('text-secondary-600');
    
    rerender(<Radio value="option1" colorScheme="success" />);
    expect(screen.getByRole('radio')).toHaveClass('text-green-600');
    
    rerender(<Radio value="option1" colorScheme="danger" />);
    expect(screen.getByRole('radio')).toHaveClass('text-red-600');
    
    rerender(<Radio value="option1" colorScheme="warning" />);
    expect(screen.getByRole('radio')).toHaveClass('text-yellow-600');
    
    rerender(<Radio value="option1" colorScheme="info" />);
    expect(screen.getByRole('radio')).toHaveClass('text-blue-600');
  });
  
  // Spezielle Varianten
  test('renders as button', () => {
    render(<Radio value="option1" isButton label="Button Radio" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Button Radio')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toHaveClass('sr-only');
  });
  
  test('renders as card', () => {
    render(<Radio value="option1" isCard label="Card Radio" />);
    expect(screen.getByText('Card Radio')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toHaveClass('sr-only');
  });
  
  // Ausrichtung
  test('renders with label on the left', () => {
    render(<Radio value="option1" label="Left Label" labelPosition="left" />);
    const label = screen.getByText('Left Label');
    const radio = screen.getByRole('radio');
    
    // Überprüfe, dass das Label vor der Radio im DOM steht
    expect(label.compareDocumentPosition(radio)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });
  
  test('renders with label on the right', () => {
    render(<Radio value="option1" label="Right Label" labelPosition="right" />);
    const label = screen.getByText('Right Label');
    const radio = screen.getByRole('radio');
    
    // Überprüfe, dass die Radio vor dem Label im DOM steht
    expect(radio.compareDocumentPosition(label)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });
  
  test('renders with vertical layout', () => {
    render(<Radio value="option1" label="Vertical Layout" isVertical />);
    expect(screen.getByRole('radio').parentElement?.parentElement).toHaveClass('flex flex-col');
  });
  
  // Effekte
  test('renders with shadow', () => {
    render(<Radio value="option1" shadow />);
    expect(screen.getByRole('radio')).toHaveClass('shadow-md');
  });
  
  test('renders without border', () => {
    render(<Radio value="option1" bordered={false} variant="outline" />);
    expect(screen.getByRole('radio')).not.toHaveClass('border-2');
  });
  
  test('renders with transparent background', () => {
    render(<Radio value="option1" transparent />);
    expect(screen.getByRole('radio')).toHaveClass('bg-transparent');
  });
  
  // Barrierefreiheit
  test('renders with hidden label', () => {
    render(<Radio value="option1" label="Hidden Label" hideLabel />);
    expect(screen.getByText('Hidden Label')).toHaveClass('sr-only');
  });
  
  test('renders with hidden helper text', () => {
    render(<Radio value="option1" helperText="Hidden Helper" hideHelperText />);
    expect(screen.queryByText('Hidden Helper')).not.toBeInTheDocument();
  });
  
  test('renders with hidden error', () => {
    render(<Radio value="option1" error="Hidden Error" hideError />);
    expect(screen.queryByText('Hidden Error')).not.toBeInTheDocument();
  });
  
  test('renders with hidden success message', () => {
    render(<Radio value="option1" successMessage="Hidden Success" hideSuccessMessage />);
    expect(screen.queryByText('Hidden Success')).not.toBeInTheDocument();
  });
  
  test('renders with description for screen readers', () => {
    render(<Radio value="option1" description="Description for screen readers" />);
    expect(screen.getByText('Description for screen readers')).toHaveClass('sr-only');
  });
  
  // Event-Handler
  test('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(<Radio value="option1" onFocus={handleFocus} onBlur={handleBlur} />);
    
    const radio = screen.getByRole('radio');
    fireEvent.focus(radio);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(radio);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
  
  test('handles keyboard events', () => {
    const handleKeyDown = jest.fn();
    render(<Radio value="option1" onKeyDown={handleKeyDown} />);
    
    const radio = screen.getByRole('radio');
    fireEvent.keyDown(radio, { key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });
  
  // Refs und IDs
  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Radio value="option1" ref={ref} data-testid="radio-with-ref" />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByTestId('radio-with-ref'));
  });
  
  test('applies custom className correctly', () => {
    render(<Radio value="option1" className="custom-class" />);
    expect(screen.getByRole('radio').parentElement?.parentElement?.parentElement).toHaveClass('custom-class');
  });
  
  test('applies custom containerClassName correctly', () => {
    render(<Radio value="option1" containerClassName="container-class" />);
    expect(screen.getByRole('radio').parentElement?.parentElement?.parentElement).toHaveClass('container-class');
  });
  
  test('applies custom radioContainerClassName correctly', () => {
    render(<Radio value="option1" radioContainerClassName="radio-container-class" />);
    expect(screen.getByRole('radio')).toHaveClass('radio-container-class');
  });
  
  test('applies custom labelClassName correctly', () => {
    render(<Radio value="option1" label="Custom Label" labelClassName="label-class" />);
    expect(screen.getByText('Custom Label')).toHaveClass('label-class');
  });
  
  test('applies custom helperTextClassName correctly', () => {
    render(<Radio value="option1" helperText="Custom Helper" helperTextClassName="helper-class" />);
    expect(screen.getByText('Custom Helper')).toHaveClass('helper-class');
  });
  
  test('applies custom errorClassName correctly', () => {
    render(<Radio value="option1" error="Custom Error" errorClassName="error-class" />);
    expect(screen.getByText('Custom Error')).toHaveClass('error-class');
  });
  
  test('applies custom successClassName correctly', () => {
    render(<Radio value="option1" successMessage="Custom Success" successClassName="success-class" />);
    expect(screen.getByText('Custom Success')).toHaveClass('success-class');
  });
  
  // Attribute
  test('renders with name attribute', () => {
    render(<Radio value="option1" name="options" />);
    expect(screen.getByRole('radio')).toHaveAttribute('name', 'options');
  });
  
  test('renders with value attribute', () => {
    render(<Radio value="option1" />);
    expect(screen.getByRole('radio')).toHaveAttribute('value', 'option1');
  });
  
  test('renders with id attribute', () => {
    render(<Radio value="option1" id="option1-radio" />);
    expect(screen.getByRole('radio')).toHaveAttribute('id', 'option1-radio');
  });
  
  test('generates unique id if not provided', () => {
    render(<Radio value="option1" label="Option 1" />);
    
    const label = screen.getByText('Option 1');
    const radio = screen.getByRole('radio');
    
    expect(label).toHaveAttribute('for', radio.id);
    expect(radio.id).toMatch(/^radio-/);
  });
  
  // Auto-Focus
  test('auto-focuses when autoFocus is true', () => {
    const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');
    render(<Radio value="option1" autoFocus />);
    
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });
  
  // Icons
  test('renders with custom icon', () => {
    const icon = <span data-testid="custom-icon">*</span>;
    render(<Radio value="option1" icon={icon} />);
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
  
  test('renders with custom checked icon', () => {
    const checkedIcon = <span data-testid="checked-icon">V</span>;
    render(<Radio value="option1" checkedIcon={checkedIcon} checked />);
    
    expect(screen.getByTestId('checked-icon')).toBeInTheDocument();
  });
  
  test('renders with custom unchecked icon', () => {
    const uncheckedIcon = <span data-testid="unchecked-icon">O</span>;
    render(<Radio value="option1" uncheckedIcon={uncheckedIcon} />);
    
    expect(screen.getByTestId('unchecked-icon')).toBeInTheDocument();
  });
});

describe('RadioGroup', () => {
  // Basis-Tests
  test('renders correctly with default props', () => {
    render(
      <RadioGroup name="options">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    );
    
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(screen.getByLabelText('Option 1')).toHaveAttribute('name', 'options');
    expect(screen.getByLabelText('Option 2')).toHaveAttribute('name', 'options');
    expect(screen.getByLabelText('Option 3')).toHaveAttribute('name', 'options');
  });

  test('sets the correct radio as checked', () => {
    render(
      <RadioGroup name="options" value="option2">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    );
    
    expect(screen.getByLabelText('Option 1')).not.toBeChecked();
    expect(screen.getByLabelText('Option 2')).toBeChecked();
    expect(screen.getByLabelText('Option 3')).not.toBeChecked();
  });

  test('handles change events', async () => {
    const handleChange = jest.fn();
    render(
      <RadioGroup name="options" onChange={handleChange}>
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    );
    
    await userEvent.click(screen.getByLabelText('Option 2'));
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: 'option2' })
    }));
  });

  // Zustände
  test('disables all radios when group is disabled', () => {
    render(
      <RadioGroup name="options" disabled>
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    );
    
    expect(screen.getByLabelText('Option 1')).toBeDisabled();
    expect(screen.getByLabelText('Option 2')).toBeDisabled();
    expect(screen.getByLabelText('Option 3')).toBeDisabled();
  });

  test('renders with error state', () => {
    render(
      <RadioGroup name="options" error="Please select an option">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    );
    
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 1')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('Option 2')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('Option 3')).toHaveAttribute('aria-invalid', 'true');
  });

  test('renders with helper text', () => {
    render(
      <RadioGroup name="options" helperText="Select your preferred option">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    );
    
    expect(screen.getByText('Select your preferred option')).toBeInTheDocument();
  });
  
  test('renders with success message', () => {
    render(
      <RadioGroup name="options" successMessage="Your selection has been saved">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    );
    
    expect(screen.getByText('Your selection has been saved')).toBeInTheDocument();
  });

  test('renders with label', () => {
    render(
      <RadioGroup name="options" label="Select an option">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    );
    
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  test('renders with required attribute', () => {
    render(
      <RadioGroup name="options" required>
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    );
    
    expect(screen.getByLabelText('Option 1')).toHaveAttribute('required');
    expect(screen.getByLabelText('Option 2')).toHaveAttribute('required');
    expect(screen.getByLabelText('Option 3')).toHaveAttribute('required');
  });

  // Layout
  test('renders with vertical layout by default', () => {
    render(
      <RadioGroup name="options">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    );
    
    const radioGroupElement = screen.getByRole('radiogroup');
    expect(radioGroupElement.querySelector('div')).toHaveClass('flex flex-col');
  });
  
  test('renders with horizontal layout', () => {
    render(
      <RadioGroup name="options" layout="horizontal">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    );
    
    const radioGroupElement = screen.getByRole('radiogroup');
    expect(radioGroupElement.querySelector('div')).toHaveClass('flex flex-row');
  });
  
  // Barrierefreiheit
  test('renders with hidden label', () => {
    render(
      <RadioGroup name="options" label="Hidden Group Label" hideLabel>
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    expect(screen.getByText('Hidden Group Label')).toHaveClass('sr-only');
  });
  
  test('renders with hidden helper text', () => {
    render(
      <RadioGroup name="options" helperText="Hidden Helper" hideHelperText>
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    expect(screen.queryByText('Hidden Helper')).not.toBeInTheDocument();
  });
  
  test('renders with hidden error', () => {
    render(
      <RadioGroup name="options" error="Hidden Error" hideError>
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    expect(screen.queryByText('Hidden Error')).not.toBeInTheDocument();
  });
  
  test('renders with hidden success message', () => {
    render(
      <RadioGroup name="options" successMessage="Hidden Success" hideSuccessMessage>
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    expect(screen.queryByText('Hidden Success')).not.toBeInTheDocument();
  });
  
  test('renders with description for screen readers', () => {
    render(
      <RadioGroup name="options" description="Description for screen readers">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    expect(screen.getByText('Description for screen readers')).toHaveClass('sr-only');
  });
  
  // CSS-Klassen
  test('applies custom className correctly', () => {
    render(
      <RadioGroup name="options" className="custom-class">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    expect(screen.getByRole('radiogroup')).toHaveClass('custom-class');
  });
  
  test('applies custom containerClassName correctly', () => {
    render(
      <RadioGroup name="options" containerClassName="container-class">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    expect(screen.getByRole('radiogroup')).toHaveClass('container-class');
  });
  
  test('applies custom labelClassName correctly', () => {
    render(
      <RadioGroup name="options" label="Custom Label" labelClassName="label-class">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    expect(screen.getByText('Custom Label')).toHaveClass('label-class');
  });
  
  test('applies custom helperTextClassName correctly', () => {
    render(
      <RadioGroup name="options" helperText="Custom Helper" helperTextClassName="helper-class">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    expect(screen.getByText('Custom Helper')).toHaveClass('helper-class');
  });
  
  test('applies custom errorClassName correctly', () => {
    render(
      <RadioGroup name="options" error="Custom Error" errorClassName="error-class">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    expect(screen.getByText('Custom Error')).toHaveClass('error-class');
  });
  
  test('applies custom successClassName correctly', () => {
    render(
      <RadioGroup name="options" successMessage="Custom Success" successClassName="success-class">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    expect(screen.getByText('Custom Success')).toHaveClass('success-class');
  });
  
  // IDs
  test('generates unique id if not provided', () => {
    render(
      <RadioGroup name="options">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    expect(screen.getByRole('radiogroup').id).toMatch(/^radio-group-/);
  });
  
  test('uses provided id', () => {
    render(
      <RadioGroup name="options" id="custom-radio-group">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    expect(screen.getByRole('radiogroup').id).toBe('custom-radio-group');
  });
});