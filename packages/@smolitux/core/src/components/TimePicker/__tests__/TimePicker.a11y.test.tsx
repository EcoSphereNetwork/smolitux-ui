import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { TimePicker } from '../TimePicker';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('TimePicker Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<TimePicker label="Meeting Time" placeholder="Select time" />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with error state', async () => {
    const { container } = render(<TimePicker label="Meeting Time" error="Time is required" />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper label association', () => {
    render(<TimePicker label="Meeting Time" />);

    const input = screen.getByTestId('time-picker');
    const label = screen.getByTestId('time-picker-label');

    expect(input).toHaveAttribute('id');
    expect(label).toHaveAttribute('for', input.getAttribute('id'));
  });

  it('should have proper aria-invalid attribute when error is present', () => {
    render(<TimePicker error="Time is required" />);

    const input = screen.getByTestId('time-picker');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should have proper aria-describedby when helper text is present', () => {
    render(<TimePicker helperText="Please select a time" />);

    const input = screen.getByTestId('time-picker');
    const helperId = input.getAttribute('aria-describedby');

    expect(helperId).toBeTruthy();
    expect(screen.getByTestId('time-picker-helper')).toHaveAttribute('id', helperId);
  });

  it('should have proper aria-describedby when error is present', () => {
    render(<TimePicker error="Time is required" />);

    const input = screen.getByTestId('time-picker');
    const errorId = input.getAttribute('aria-describedby');

    expect(errorId).toBeTruthy();
    expect(screen.getByTestId('time-picker-error')).toHaveAttribute('id', errorId);
  });

  it('should have proper aria-required attribute when required', () => {
    render(<TimePicker required label="Meeting Time" />);

    const input = screen.getByTestId('time-picker');
    expect(input).toHaveAttribute('required');

    // Prüfe, ob das Label einen Stern enthält
    const label = screen.getByTestId('time-picker-label');
    expect(label).toHaveTextContent('*');
  });

  it('should be focusable with keyboard navigation', () => {
    render(<TimePicker label="Meeting Time" />);

    const input = screen.getByTestId('time-picker');
    expect(input).not.toHaveFocus();

    input.focus();
    expect(input).toHaveFocus();
  });

  it('should handle keyboard events properly', () => {
    render(<TimePicker />);

    const input = screen.getByTestId('time-picker');
    fireEvent.click(input);

    // Dropdown should be open
    expect(screen.getByTestId('time-picker-dropdown')).toBeInTheDocument();

    // Press Escape to close dropdown
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByTestId('time-picker-dropdown')).not.toBeInTheDocument();
  });

  it('should have proper disabled state for screen readers', () => {
    render(<TimePicker disabled label="Meeting Time" />);

    const input = screen.getByTestId('time-picker');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('opacity-50');
    expect(input).toHaveClass('cursor-not-allowed');
  });

  it('should have proper readonly state for screen readers', () => {
    render(<TimePicker readOnly label="Meeting Time" />);

    const input = screen.getByTestId('time-picker');
    expect(input).toHaveAttribute('readonly');
  });

  it('should have proper ARIA attributes for dropdown', () => {
    render(<TimePicker />);

    const input = screen.getByTestId('time-picker');

    fireEvent.click(input);

    expect(input).toHaveAttribute('aria-controls');

    const dropdown = screen.getByTestId('time-picker-dropdown');
    expect(dropdown).toHaveAttribute('role', 'listbox');
    expect(dropdown).toHaveAttribute('aria-labelledby', input.getAttribute('id'));
  });

  it('should have proper ARIA attributes for time options', () => {
    render(<TimePicker />);

    fireEvent.click(screen.getByTestId('time-picker'));

    // Check hour options
    const hourOption = screen.getByTestId('time-picker-hour-10');
    expect(hourOption).toHaveAttribute('role', 'option');
    expect(hourOption).toHaveAttribute('aria-selected');

    // Check minute options
    const minuteOption = screen.getByTestId('time-picker-minute-15');
    expect(minuteOption).toHaveAttribute('role', 'option');
    expect(minuteOption).toHaveAttribute('aria-selected');
  });
});
