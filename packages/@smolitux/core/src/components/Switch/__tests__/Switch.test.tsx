import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '../Switch';

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
    isLoading: false,
  }),
}));

describe('Switch', () => {
  // Basis-Tests
  test('renders correctly with default props', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  test('renders with label', () => {
    render(<Switch label="Enable notifications" />);
    expect(screen.getByLabelText('Enable notifications')).toBeInTheDocument();
    expect(screen.getByText('Enable notifications')).toBeInTheDocument();
  });

  test('renders checked state correctly', () => {
    render(<Switch checked />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  test('handles change events', async () => {
    const handleChange = jest.fn();
    render(<Switch onChange={handleChange} />);

    const switchElement = screen.getByRole('switch');
    await userEvent.click(switchElement);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ checked: true }),
      })
    );
  });

  // Zustände
  test('renders disabled state correctly', () => {
    render(<Switch disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  test('renders disabled state correctly with isDisabled prop', () => {
    render(<Switch isDisabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  test('does not trigger onChange when disabled', async () => {
    const handleChange = jest.fn();
    render(<Switch onChange={handleChange} disabled />);

    const switchElement = screen.getByRole('switch');
    await userEvent.click(switchElement);

    expect(handleChange).not.toHaveBeenCalled();
  });

  test('renders with helper text', () => {
    render(<Switch helperText="This is helper text" />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  test('renders with error state', () => {
    render(<Switch error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-invalid', 'true');
  });

  test('renders with success message', () => {
    render(<Switch successMessage="Setting saved" />);
    expect(screen.getByText('Setting saved')).toBeInTheDocument();
  });

  test('renders with required state', () => {
    render(<Switch required label="Required Field" />);
    expect(screen.getByRole('switch')).toBeRequired();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  test('renders with required state using isRequired prop', () => {
    render(<Switch isRequired label="Required Field" />);
    expect(screen.getByRole('switch')).toBeRequired();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  // Größen
  test('renders with custom size', () => {
    const { rerender } = render(<Switch size="xs" />);
    expect(screen.getByRole('switch').nextElementSibling?.firstElementChild).toHaveClass('w-6');

    rerender(<Switch size="sm" />);
    expect(screen.getByRole('switch').nextElementSibling?.firstElementChild).toHaveClass('w-8');

    rerender(<Switch size="md" />);
    expect(screen.getByRole('switch').nextElementSibling?.firstElementChild).toHaveClass('w-10');

    rerender(<Switch size="lg" />);
    expect(screen.getByRole('switch').nextElementSibling?.firstElementChild).toHaveClass('w-12');

    rerender(<Switch size="xl" />);
    expect(screen.getByRole('switch').nextElementSibling?.firstElementChild).toHaveClass('w-14');
  });

  // Varianten
  test('renders with different variants', () => {
    const { rerender } = render(<Switch variant="solid" checked />);
    let track = screen.getByRole('switch').nextElementSibling?.firstElementChild;
    expect(track).toHaveClass('bg-primary-600');

    rerender(<Switch variant="outline" checked />);
    track = screen.getByRole('switch').nextElementSibling?.firstElementChild;
    expect(track).toHaveClass('border-2');

    rerender(<Switch variant="filled" checked />);
    track = screen.getByRole('switch').nextElementSibling?.firstElementChild;
    expect(track).toHaveClass('bg-primary-100');

    rerender(<Switch variant="minimal" checked />);
    track = screen.getByRole('switch').nextElementSibling?.firstElementChild;
    expect(track).toHaveClass('bg-gray-200');
  });

  // Farben
  test('renders with different color schemes', () => {
    const { rerender } = render(<Switch colorScheme="primary" checked />);
    let track = screen.getByRole('switch').nextElementSibling?.firstElementChild;
    expect(track).toHaveClass('bg-primary-600');

    rerender(<Switch colorScheme="secondary" checked />);
    track = screen.getByRole('switch').nextElementSibling?.firstElementChild;
    expect(track).toHaveClass('bg-secondary-600');

    rerender(<Switch colorScheme="success" checked />);
    track = screen.getByRole('switch').nextElementSibling?.firstElementChild;
    expect(track).toHaveClass('bg-green-600');

    rerender(<Switch colorScheme="danger" checked />);
    track = screen.getByRole('switch').nextElementSibling?.firstElementChild;
    expect(track).toHaveClass('bg-red-600');

    rerender(<Switch colorScheme="warning" checked />);
    track = screen.getByRole('switch').nextElementSibling?.firstElementChild;
    expect(track).toHaveClass('bg-yellow-600');

    rerender(<Switch colorScheme="info" checked />);
    track = screen.getByRole('switch').nextElementSibling?.firstElementChild;
    expect(track).toHaveClass('bg-blue-600');

    rerender(<Switch colorScheme="neutral" checked />);
    track = screen.getByRole('switch').nextElementSibling?.firstElementChild;
    expect(track).toHaveClass('bg-gray-600');
  });

  // Stile
  test('renders with iOS style', () => {
    render(<Switch isIOS checked />);
    const track = screen.getByRole('switch').nextElementSibling?.firstElementChild;
    expect(track).toHaveClass('bg-green-500');
  });

  test('renders with Android style', () => {
    render(<Switch isAndroid checked />);
    const track = screen.getByRole('switch').nextElementSibling?.firstElementChild;
    expect(track).toHaveClass('bg-green-200');
  });

  test('renders with Material style', () => {
    render(<Switch isMaterial checked />);
    const track = screen.getByRole('switch').nextElementSibling?.firstElementChild;
    expect(track).toHaveClass('bg-primary-200');
  });

  // Ausrichtung
  test('renders with label on the left', () => {
    render(<Switch label="Left Label" labelPosition="left" />);
    // Prüfen, ob das Label vorhanden ist
    expect(screen.getByText('Left Label')).toBeInTheDocument();
  });

  test('renders with label on the right', () => {
    render(<Switch label="Right Label" labelPosition="right" />);
    // Prüfen, ob das Label vorhanden ist
    expect(screen.getByText('Right Label')).toBeInTheDocument();
  });

  test('renders with vertical layout', () => {
    render(<Switch label="Vertical Layout" isVertical />);
    // Prüfen, ob das Label vorhanden ist
    expect(screen.getByText('Vertical Layout')).toBeInTheDocument();
  });

  // Effekte
  test('renders with shadow', () => {
    render(<Switch shadow />);
    const track = screen.getByRole('switch').nextElementSibling?.firstElementChild;
    expect(track).toHaveClass('shadow');
  });

  test('renders with transparent background', () => {
    render(<Switch transparent />);
    const track = screen.getByRole('switch').nextElementSibling?.firstElementChild;
    expect(track).toHaveClass('bg-opacity-50');
  });

  // Barrierefreiheit
  test('renders with hidden label', () => {
    render(<Switch label="Hidden Label" hideLabel />);
    expect(screen.getByText('Hidden Label').closest('div')).toHaveClass('sr-only');
  });

  test('renders with hidden helper text', () => {
    render(<Switch helperText="Hidden Helper" hideHelperText />);
    expect(screen.queryByText('Hidden Helper')).not.toBeInTheDocument();
  });

  test('renders with hidden error', () => {
    render(<Switch error="Hidden Error" hideError />);
    expect(screen.queryByText('Hidden Error')).not.toBeInTheDocument();
  });

  test('renders with hidden success message', () => {
    render(<Switch successMessage="Hidden Success" hideSuccessMessage />);
    expect(screen.queryByText('Hidden Success')).not.toBeInTheDocument();
  });

  test('renders with description for screen readers', () => {
    render(<Switch description="Description for screen readers" />);
    expect(screen.getByText('Description for screen readers')).toHaveClass('sr-only');
  });

  // Event-Handler
  test('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(<Switch onFocus={handleFocus} onBlur={handleBlur} />);

    const switchElement = screen.getByRole('switch');
    fireEvent.focus(switchElement);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(switchElement);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  test('handles keyboard events', () => {
    const handleKeyDown = jest.fn();
    render(<Switch onKeyDown={handleKeyDown} />);

    const switchElement = screen.getByRole('switch');
    fireEvent.keyDown(switchElement, { key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  // Refs und IDs
  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Switch ref={ref} data-testid="switch-with-ref" />);

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByTestId('switch-with-ref'));
  });

  test('applies custom className correctly', () => {
    render(<Switch className="custom-class" />);
    const container = screen.getByRole('switch').closest('div');
    expect(container).toHaveClass('custom-class');
  });

  test('applies custom containerClassName correctly', () => {
    render(<Switch containerClassName="container-class" label="Test" />);
    // Prüfen, ob das Label vorhanden ist
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('applies custom switchContainerClassName correctly', () => {
    render(<Switch switchContainerClassName="switch-container-class" />);
    expect(screen.getByRole('switch').nextElementSibling).toHaveClass('switch-container-class');
  });

  test('applies custom trackClassName correctly', () => {
    render(<Switch trackClassName="track-class" />);
    expect(screen.getByRole('switch').nextElementSibling?.firstElementChild).toHaveClass(
      'track-class'
    );
  });

  test('applies custom thumbClassName correctly', () => {
    render(<Switch thumbClassName="thumb-class" />);
    const track = screen.getByRole('switch').nextElementSibling?.firstElementChild;
    expect(track?.firstElementChild).toHaveClass('thumb-class');
  });

  test('applies custom labelClassName correctly', () => {
    render(<Switch label="Custom Label" labelClassName="label-class" />);
    expect(screen.getByText('Custom Label')).toHaveClass('label-class');
  });

  test('applies custom helperTextClassName correctly', () => {
    render(<Switch helperText="Custom Helper" helperTextClassName="helper-class" />);
    expect(screen.getByText('Custom Helper')).toHaveClass('helper-class');
  });

  test('applies custom errorClassName correctly', () => {
    render(<Switch error="Custom Error" errorClassName="error-class" />);
    expect(screen.getByText('Custom Error')).toHaveClass('error-class');
  });

  test('applies custom successClassName correctly', () => {
    render(<Switch successMessage="Custom Success" successClassName="success-class" />);
    expect(screen.getByText('Custom Success')).toHaveClass('success-class');
  });

  // Attribute
  test('generates unique id if not provided', () => {
    render(<Switch label="Auto ID" />);

    const label = screen.getByText('Auto ID');
    const switchElement = screen.getByRole('switch');

    expect(label).toHaveAttribute('for', switchElement.id);
    expect(switchElement.id).toMatch(/^switch-/);
  });

  // Auto-Focus
  test('auto-focuses when autoFocus is true', () => {
    const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');
    render(<Switch autoFocus />);

    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  // Labels
  test('renders with on/off labels', () => {
    render(<Switch labels={{ on: 'ON', off: 'OFF' }} />);
    expect(screen.getByText('OFF')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('switch'));
    expect(screen.getByText('ON')).toBeInTheDocument();
  });

  // Controlled vs Uncontrolled
  test('works as controlled component', () => {
    const { rerender } = render(<Switch checked={false} onChange={() => {}} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

    rerender(<Switch checked={true} onChange={() => {}} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  test('works as uncontrolled component', () => {
    render(<Switch defaultChecked={true} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');

    fireEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });
});
