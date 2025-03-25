import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TimePicker } from '../TimePicker';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

// Mock für FormControl
jest.mock('../../FormControl/FormControl', () => ({
  useFormControl: () => ({
    id: 'test-id',
    isDisabled: false,
    isInvalid: false,
    isReadOnly: false,
    isRequired: false,
  }),
}));

describe('TimePicker', () => {
  it('renders correctly with default props', () => {
    render(<TimePicker />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('placeholder', 'HH:MM');
  });

  it('renders with custom placeholder', () => {
    render(<TimePicker placeholder="Select time" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Select time');
  });

  it('renders with label', () => {
    render(<TimePicker label="Time" />);
    
    expect(screen.getByText('Time')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<TimePicker helperText="Select a time" />);
    
    expect(screen.getByText('Select a time')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<TimePicker error="Invalid time" />);
    
    expect(screen.getByText('Invalid time')).toBeInTheDocument();
  });

  it('renders in disabled state', () => {
    render(<TimePicker disabled />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('renders in readonly state', () => {
    render(<TimePicker readOnly />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
  });

  it('opens time picker when input is clicked', () => {
    render(<TimePicker />);
    
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    
    expect(screen.getByTestId('time-picker-dropdown')).toBeInTheDocument();
  });

  it('closes time picker when clicking outside', () => {
    render(<TimePicker />);
    
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    
    expect(screen.getByTestId('time-picker-dropdown')).toBeInTheDocument();
    
    // Click outside
    fireEvent.mouseDown(document.body);
    
    expect(screen.queryByTestId('time-picker-dropdown')).not.toBeInTheDocument();
  });

  it('displays the correct time in 24h format', () => {
    const time = { hours: 14, minutes: 30 };
    render(<TimePicker value={time} format="24h" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('14:30');
  });

  it('displays the correct time in 12h format', () => {
    const time = { hours: 14, minutes: 30 };
    render(<TimePicker value={time} format="12h" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('02:30 PM');
  });

  it('displays seconds when hideSeconds is false', () => {
    const time = { hours: 14, minutes: 30, seconds: 45 };
    render(<TimePicker value={time} format="24h" hideSeconds={false} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('14:30:45');
  });

  it('hides seconds when hideSeconds is true', () => {
    const time = { hours: 14, minutes: 30, seconds: 45 };
    render(<TimePicker value={time} format="24h" hideSeconds={true} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('14:30');
  });

  it('selects hours when clicking on hour input', () => {
    render(<TimePicker />);
    
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    
    const hourInput = screen.getByLabelText('Hours');
    fireEvent.click(hourInput);
    
    expect(hourInput).toHaveClass('active');
  });

  it('selects minutes when clicking on minute input', () => {
    render(<TimePicker />);
    
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    
    const minuteInput = screen.getByLabelText('Minutes');
    fireEvent.click(minuteInput);
    
    expect(minuteInput).toHaveClass('active');
  });

  it('increments hours when clicking up button', () => {
    render(<TimePicker value={{ hours: 10, minutes: 30 }} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    
    const hourInput = screen.getByLabelText('Hours');
    fireEvent.click(hourInput);
    
    const upButton = screen.getByLabelText('Increment');
    fireEvent.click(upButton);
    
    expect(hourInput).toHaveValue('11');
  });

  it('decrements hours when clicking down button', () => {
    render(<TimePicker value={{ hours: 10, minutes: 30 }} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    
    const hourInput = screen.getByLabelText('Hours');
    fireEvent.click(hourInput);
    
    const downButton = screen.getByLabelText('Decrement');
    fireEvent.click(downButton);
    
    expect(hourInput).toHaveValue('9');
  });

  it('wraps hours around when reaching max value in 24h format', () => {
    render(<TimePicker value={{ hours: 23, minutes: 30 }} format="24h" />);
    
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    
    const hourInput = screen.getByLabelText('Hours');
    fireEvent.click(hourInput);
    
    const upButton = screen.getByLabelText('Increment');
    fireEvent.click(upButton);
    
    expect(hourInput).toHaveValue('0');
  });

  it('wraps hours around when reaching min value in 24h format', () => {
    render(<TimePicker value={{ hours: 0, minutes: 30 }} format="24h" />);
    
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    
    const hourInput = screen.getByLabelText('Hours');
    fireEvent.click(hourInput);
    
    const downButton = screen.getByLabelText('Decrement');
    fireEvent.click(downButton);
    
    expect(hourInput).toHaveValue('23');
  });

  it('toggles between AM and PM in 12h format', () => {
    render(<TimePicker value={{ hours: 10, minutes: 30, period: 'AM' }} format="12h" />);
    
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    
    const periodToggle = screen.getByText('AM');
    fireEvent.click(periodToggle);
    
    expect(screen.getByText('PM')).toBeInTheDocument();
  });

  it('calls onChange when time is changed', () => {
    const handleChange = jest.fn();
    render(<TimePicker onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    
    const hourInput = screen.getByLabelText('Hours');
    fireEvent.change(hourInput, { target: { value: '15' } });
    
    const minuteInput = screen.getByLabelText('Minutes');
    fireEvent.change(minuteInput, { target: { value: '45' } });
    
    expect(handleChange).toHaveBeenCalledWith({ hours: 15, minutes: 45 });
  });

  it('allows manual input of time', () => {
    const handleChange = jest.fn();
    render(<TimePicker onChange={handleChange} format="24h" />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '16:30' } });
    fireEvent.blur(input);
    
    expect(handleChange).toHaveBeenCalledWith({ hours: 16, minutes: 30 });
  });

  it('validates manual input', () => {
    const handleChange = jest.fn();
    render(<TimePicker onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'invalid-time' } });
    fireEvent.blur(input);
    
    expect(handleChange).not.toHaveBeenCalled();
    expect(screen.getByText('Invalid time format')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<TimePicker className="custom-time-picker" />);
    
    const container = screen.getByTestId('time-picker-container');
    expect(container).toHaveClass('custom-time-picker');
  });

  it('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<TimePicker ref={ref} />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });

  it('handles keyboard navigation', () => {
    render(<TimePicker />);
    
    const input = screen.getByRole('textbox');
    
    // Open time picker with keyboard
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(screen.getByTestId('time-picker-dropdown')).toBeInTheDocument();
    
    // Close time picker with Escape
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByTestId('time-picker-dropdown')).not.toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<TimePicker size="sm" />);
    
    let input = screen.getByRole('textbox');
    expect(input).toHaveClass('h-8');
    
    rerender(<TimePicker size="md" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('h-10');
    
    rerender(<TimePicker size="lg" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('h-12');
  });

  it('renders with fullWidth', () => {
    render(<TimePicker fullWidth />);
    
    const container = screen.getByTestId('time-picker-container');
    expect(container).toHaveClass('w-full');
  });
});