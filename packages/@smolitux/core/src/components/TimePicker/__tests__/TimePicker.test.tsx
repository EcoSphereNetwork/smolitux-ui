import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { TimePicker } from '../TimePicker';

describe('TimePicker', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders correctly with default props', () => {
    render(<TimePicker />);
    
    expect(screen.getByTestId('time-picker')).toBeInTheDocument();
    expect(screen.getByTestId('time-picker')).toHaveAttribute('placeholder', 'Select time');
  });

  it('renders with custom placeholder', () => {
    render(<TimePicker placeholder="Enter time" />);
    
    expect(screen.getByTestId('time-picker')).toHaveAttribute('placeholder', 'Enter time');
  });

  it('renders with label', () => {
    render(<TimePicker label="Meeting Time" />);
    
    expect(screen.getByTestId('time-picker-label')).toHaveTextContent('Meeting Time');
  });

  it('renders with helper text', () => {
    render(<TimePicker helperText="Please select a time" />);
    
    expect(screen.getByTestId('time-picker-helper')).toHaveTextContent('Please select a time');
  });

  it('renders with error message', () => {
    render(<TimePicker error="Time is required" />);
    
    expect(screen.getByTestId('time-picker-error')).toHaveTextContent('Time is required');
    expect(screen.getByTestId('time-picker')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders as disabled', () => {
    render(<TimePicker disabled />);
    
    expect(screen.getByTestId('time-picker')).toBeDisabled();
    expect(screen.getByTestId('time-picker')).toHaveClass('opacity-50');
    expect(screen.getByTestId('time-picker')).toHaveClass('cursor-not-allowed');
  });

  it('renders as readonly', () => {
    render(<TimePicker readOnly />);
    
    expect(screen.getByTestId('time-picker')).toHaveAttribute('readonly');
    expect(screen.getByTestId('time-picker')).toHaveClass('opacity-50');
    expect(screen.getByTestId('time-picker')).toHaveClass('cursor-not-allowed');
  });

  it('renders with custom className', () => {
    render(<TimePicker className="custom-time-picker" />);
    
    expect(screen.getByTestId('time-picker')).toHaveClass('custom-time-picker');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<TimePicker size="sm" />);
    
    expect(screen.getByTestId('time-picker')).toHaveClass('px-3 py-1.5 text-sm');
    
    rerender(<TimePicker size="md" />);
    expect(screen.getByTestId('time-picker')).toHaveClass('px-4 py-2 text-base');
    
    rerender(<TimePicker size="lg" />);
    expect(screen.getByTestId('time-picker')).toHaveClass('px-5 py-3 text-lg');
  });

  it('renders with full width', () => {
    render(<TimePicker fullWidth />);
    
    expect(screen.getByTestId('time-picker-container')).toHaveClass('w-full');
  });

  it('renders with left icon', () => {
    render(<TimePicker leftIcon={<span data-testid="left-icon">🕒</span>} />);
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('time-picker')).toHaveClass('pl-10');
  });

  it('opens dropdown when clicked', () => {
    render(<TimePicker />);
    
    expect(screen.queryByTestId('time-picker-dropdown')).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByTestId('time-picker'));
    
    expect(screen.getByTestId('time-picker-dropdown')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', () => {
    render(
      <div>
        <TimePicker />
        <div data-testid="outside">Outside</div>
      </div>
    );
    
    fireEvent.click(screen.getByTestId('time-picker'));
    expect(screen.getByTestId('time-picker-dropdown')).toBeInTheDocument();
    
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByTestId('time-picker-dropdown')).not.toBeInTheDocument();
  });

  it('closes dropdown when pressing Escape', () => {
    render(<TimePicker />);
    
    fireEvent.click(screen.getByTestId('time-picker'));
    expect(screen.getByTestId('time-picker-dropdown')).toBeInTheDocument();
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByTestId('time-picker-dropdown')).not.toBeInTheDocument();
  });

  it('updates input value when changed', () => {
    const onChange = jest.fn();
    render(<TimePicker format="12h" onChange={onChange} />);
    
    // Change the input value directly
    fireEvent.change(screen.getByTestId('time-picker'), { target: { value: '3:30 PM' } });
    fireEvent.blur(screen.getByTestId('time-picker'));
    
    // Check that the value is updated
    expect(screen.getByTestId('time-picker')).toHaveValue('3:30 PM');
    expect(onChange).toHaveBeenCalled();
  });

  it('formats time correctly in 24h format', () => {
    render(<TimePicker format="24h" defaultValue="15:30" />);
    
    expect(screen.getByTestId('time-picker')).toHaveValue('15:30');
  });

  it('formats time correctly in 12h format', () => {
    render(<TimePicker format="12h" defaultValue="15:30" />);
    
    expect(screen.getByTestId('time-picker')).toHaveValue('3:30 PM');
  });

  it('shows seconds when hideSeconds is false', () => {
    render(<TimePicker format="24h" hideSeconds={false} defaultValue="15:30:45" />);
    
    expect(screen.getByTestId('time-picker')).toHaveValue('15:30:45');
    
    fireEvent.click(screen.getByTestId('time-picker'));
    expect(screen.getByText('Seconds')).toBeInTheDocument();
  });

  it('calls onChange when time is selected', () => {
    const handleChange = jest.fn();
    render(<TimePicker onChange={handleChange} />);
    
    fireEvent.click(screen.getByTestId('time-picker'));
    
    // Select hour
    fireEvent.click(screen.getByTestId('time-picker-hour-10'));
    
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      hours: 10
    }));
  });

  it('allows manual input of time', () => {
    render(<TimePicker format="24h" />);
    
    fireEvent.change(screen.getByTestId('time-picker'), { target: { value: '14:45' } });
    fireEvent.blur(screen.getByTestId('time-picker'));
    
    expect(screen.getByTestId('time-picker')).toHaveValue('14:45');
  });

  it('corrects invalid manual input on blur', () => {
    const { rerender } = render(<TimePicker format="24h" defaultValue="12:00" />);
    
    // Force a specific value
    rerender(<TimePicker format="24h" value="12:00" />);
    
    fireEvent.change(screen.getByTestId('time-picker'), { target: { value: 'invalid' } });
    fireEvent.blur(screen.getByTestId('time-picker'));
    
    // Should have a valid time format after blur
    const input = screen.getByTestId('time-picker');
    expect(input.value).toMatch(/^\d{1,2}:\d{2}$/);
  });

  it('closes dropdown when closeOnSelect is true', () => {
    render(<TimePicker closeOnSelect={true} />);
    
    fireEvent.click(screen.getByTestId('time-picker'));
    expect(screen.getByTestId('time-picker-dropdown')).toBeInTheDocument();
    
    // Select hour
    fireEvent.click(screen.getByTestId('time-picker-hour-10'));
    
    // Dropdown should close
    expect(screen.queryByTestId('time-picker-dropdown')).not.toBeInTheDocument();
  });

  it('keeps dropdown open when closeOnSelect is false', () => {
    render(<TimePicker closeOnSelect={false} />);
    
    fireEvent.click(screen.getByTestId('time-picker'));
    expect(screen.getByTestId('time-picker-dropdown')).toBeInTheDocument();
    
    // Select hour
    fireEvent.click(screen.getByTestId('time-picker-hour-10'));
    
    // Dropdown should stay open
    expect(screen.getByTestId('time-picker-dropdown')).toBeInTheDocument();
  });

  it('renders with custom data-testid', () => {
    render(<TimePicker data-testid="custom-time-picker" />);
    
    expect(screen.getByTestId('custom-time-picker')).toBeInTheDocument();
    expect(screen.getByTestId('custom-time-picker-container')).toBeInTheDocument();
  });

  it('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<TimePicker ref={ref} />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });

  it('sets correct ARIA attributes', () => {
    render(<TimePicker />);
    
    const input = screen.getByTestId('time-picker');
    
    fireEvent.click(input);
    
    expect(input).toHaveAttribute('aria-controls');
    
    const dropdown = screen.getByTestId('time-picker-dropdown');
    expect(dropdown).toHaveAttribute('role', 'listbox');
  });
});