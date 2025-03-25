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
    render(<TimePicker placeholder="Enter time" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter time');
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

  it('renders with 24h format', () => {
    render(<TimePicker format="24h" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'HH:MM');
    
    // Open the dropdown
    fireEvent.click(input);
    
    // Check that there's no AM/PM selector
    expect(screen.queryByText('AM')).not.toBeInTheDocument();
    expect(screen.queryByText('PM')).not.toBeInTheDocument();
  });

  it('renders with 12h format', () => {
    render(<TimePicker format="12h" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'HH:MM AM/PM');
    
    // Open the dropdown
    fireEvent.click(input);
    
    // Check that there's an AM/PM selector
    expect(screen.getByText('AM')).toBeInTheDocument();
    expect(screen.getByText('PM')).toBeInTheDocument();
  });

  it('renders with seconds when hideSeconds is false', () => {
    render(<TimePicker hideSeconds={false} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'HH:MM:SS');
    
    // Open the dropdown
    fireEvent.click(input);
    
    // Check that there's a seconds selector
    expect(screen.getByLabelText('Seconds')).toBeInTheDocument();
  });

  it('hides seconds when hideSeconds is true', () => {
    render(<TimePicker hideSeconds />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'HH:MM');
    
    // Open the dropdown
    fireEvent.click(input);
    
    // Check that there's no seconds selector
    expect(screen.queryByLabelText('Seconds')).not.toBeInTheDocument();
  });

  it('calls onChange when time is selected', () => {
    const handleChange = jest.fn();
    render(<TimePicker onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    
    // Open the dropdown
    fireEvent.click(input);
    
    // Select hour
    const hourOption = screen.getByText('10');
    fireEvent.click(hourOption);
    
    // Select minute
    const minuteOption = screen.getByText('30');
    fireEvent.click(minuteOption);
    
    expect(handleChange).toHaveBeenCalledWith({
      hours: 10,
      minutes: 30,
      seconds: 0
    });
  });

  it('displays the correct time when value is provided as string', () => {
    render(<TimePicker value="14:30" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('14:30');
  });

  it('displays the correct time when value is provided as object', () => {
    render(<TimePicker value={{ hours: 14, minutes: 30 }} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('14:30');
  });

  it('displays the correct time in 12h format', () => {
    render(<TimePicker value="14:30" format="12h" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('02:30 PM');
  });

  it('displays the correct time with seconds', () => {
    render(<TimePicker value={{ hours: 14, minutes: 30, seconds: 45 }} hideSeconds={false} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('14:30:45');
  });

  it('allows manual input of time', () => {
    const handleChange = jest.fn();
    render(<TimePicker onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '14:30' } });
    fireEvent.blur(input);
    
    expect(handleChange).toHaveBeenCalledWith({
      hours: 14,
      minutes: 30,
      seconds: 0
    });
  });

  it('validates manual input', () => {
    const handleChange = jest.fn();
    render(<TimePicker onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'invalid' } });
    fireEvent.blur(input);
    
    expect(handleChange).not.toHaveBeenCalled();
    expect(screen.getByText('Invalid time format')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', () => {
    render(<TimePicker />);
    
    const input = screen.getByRole('textbox');
    
    // Open the dropdown
    fireEvent.click(input);
    
    // Check that the dropdown is open
    expect(screen.getByLabelText('Hours')).toBeInTheDocument();
    
    // Click outside
    fireEvent.mouseDown(document.body);
    
    // Check that the dropdown is closed
    expect(screen.queryByLabelText('Hours')).not.toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    render(<TimePicker />);
    
    const input = screen.getByRole('textbox');
    
    // Open the dropdown with keyboard
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    
    // Check that the dropdown is open
    expect(screen.getByLabelText('Hours')).toBeInTheDocument();
    
    // Close the dropdown with Escape
    fireEvent.keyDown(input, { key: 'Escape' });
    
    // Check that the dropdown is closed
    expect(screen.queryByLabelText('Hours')).not.toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<TimePicker className="custom-time-picker" />);
    
    const container = screen.getByRole('textbox').closest('.time-picker');
    expect(container).toHaveClass('custom-time-picker');
  });

  it('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<TimePicker ref={ref} />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });

  it('renders with custom input props', () => {
    render(<TimePicker data-testid="custom-time-picker" aria-label="Time input" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('data-testid', 'custom-time-picker');
    expect(input).toHaveAttribute('aria-label', 'Time input');
  });
});