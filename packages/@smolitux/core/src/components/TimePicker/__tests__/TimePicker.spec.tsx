import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TimePicker } from '../TimePicker';

describe('TimePicker Component', () => {
  it('renders correctly with default props', () => {
    render(<TimePicker />);

    // Check if the input is rendered
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('accepts valid time input', () => {
    render(<TimePicker />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '14:30' } });

    expect(input).toHaveValue('14:30');
  });

  it('validates time format', () => {
    const handleChange = jest.fn();
    render(<TimePicker onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'invalid' } });

    // Invalid time should not trigger onChange
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('handles 12-hour format', () => {
    render(<TimePicker use12Hours />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '02:30 PM' } });

    expect(input).toHaveValue('02:30 PM');
  });

  it('handles disabled state', () => {
    render(<TimePicker disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('handles required state', () => {
    render(<TimePicker required />);

    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });

  it('renders with custom className', () => {
    render(<TimePicker className="custom-time-picker" />);

    const container = screen.getByRole('textbox').closest('div');
    expect(container).toHaveClass('custom-time-picker');
  });

  it('renders with placeholder', () => {
    render(<TimePicker placeholder="Enter time" />);

    const input = screen.getByPlaceholderText('Enter time');
    expect(input).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<TimePicker label="Time" />);

    const label = screen.getByText('Time');
    expect(label).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<TimePicker helperText="Select a time" />);

    const helperText = screen.getByText('Select a time');
    expect(helperText).toBeInTheDocument();
  });
});
