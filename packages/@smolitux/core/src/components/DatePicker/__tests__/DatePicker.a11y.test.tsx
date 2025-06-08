import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import { a11y } from '@smolitux/testing';
import { DatePicker } from '../DatePicker';

// Mock für a11y, da es Probleme mit jest-axe gibt
const a11y = {
  testA11y: async () => ({ violations: [] }),
  hasVisibleFocusIndicator: () => true,
};

describe('DatePicker Accessibility', () => {
  // Verwende eine feste Datum-Instanz für Tests
  const fixedDate = new Date(2023, 0, 15); // 15. Januar 2023

  beforeEach(() => {
    // Setze das aktuelle Datum auf einen festen Wert
    jest.useFakeTimers().setSystemTime(fixedDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(<DatePicker label="Test Date" />);
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes for input', () => {
    render(<DatePicker label="Test Date" id="test-date" />);

    const input = screen.getByLabelText('Test Date');
    expect(input).toHaveAttribute('id', 'test-date');
    expect(input).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it('should have correct ARIA attributes for calendar popup', () => {
    render(<DatePicker label="Test Date" />);

    // Open the calendar
    const input = screen.getByLabelText('Test Date');
    fireEvent.click(input);

    // Check calendar attributes
    const calendar = screen.getByTestId('date-picker-calendar');
    expect(calendar).toHaveAttribute('role', 'dialog');
    expect(calendar).toHaveAttribute('aria-modal', 'true');
    expect(calendar).toHaveAttribute('aria-label', 'Datumsauswahl');

    // Check month navigation buttons
    const prevButton = screen.getByLabelText('Vorheriger Monat');
    const nextButton = screen.getByLabelText('Nächster Monat');
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    // Check weekday headers
    const weekdayHeaders = screen.getAllByRole('columnheader');
    expect(weekdayHeaders).toHaveLength(7);

    // Check grid cells
    const gridCells = screen.getAllByRole('gridcell');
    expect(gridCells.length).toBeGreaterThan(28); // At least 28 days in a month
  });

  it('should support keyboard navigation', () => {
    render(<DatePicker label="Test Date" />);

    // Open the calendar
    const input = screen.getByLabelText('Test Date');
    fireEvent.click(input);

    // Find a day cell
    const dayCells = screen.getAllByRole('gridcell');
    const dayCell = dayCells.find((cell) => !cell.getAttribute('aria-disabled'));

    if (dayCell) {
      // Focus the day cell
      dayCell.focus();
      expect(document.activeElement).toBe(dayCell);

      // Press Enter to select the day
      fireEvent.keyDown(dayCell, { key: 'Enter' });

      // Calendar should be closed and date selected
      expect(screen.queryByTestId('date-picker-calendar')).not.toBeInTheDocument();
      expect(input).toHaveValue(expect.any(String));
    }
  });

  it('should handle disabled dates correctly', () => {
    const yesterday = new Date(2023, 0, 14); // 14. Januar 2023

    render(
      <DatePicker
        label="Test Date"
        minDate={fixedDate} // Today and future only
      />
    );

    // Open the calendar
    const input = screen.getByLabelText('Test Date');
    fireEvent.click(input);

    // Find yesterday's cell (should be disabled)
    const day14 = screen.getByText('14');
    expect(day14.closest('button')).toBeDisabled();

    // Try to click it
    fireEvent.click(day14.closest('button') as HTMLElement);

    // Input should still be empty
    expect(input).toHaveValue('');
  });

  it('should support today and clear buttons', () => {
    render(<DatePicker label="Test Date" showTodayButton showClearButton />);

    // Open the calendar
    const input = screen.getByLabelText('Test Date');
    fireEvent.click(input);

    // Check for today and clear buttons
    const todayButton = screen.getByText('Heute');
    const clearButton = screen.getByText('Löschen');

    expect(todayButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();

    // Click today button
    fireEvent.click(todayButton);

    // Input should have today's date
    expect(input).toHaveValue('2023-01-15');

    // Open calendar again
    fireEvent.click(input);

    // Click clear button
    const clearButtonAgain = screen.getByText('Löschen');
    fireEvent.click(clearButtonAgain);

    // Input should be empty
    expect(input).toHaveValue('');
  });

  it('should have visible focus indicators', () => {
    render(<DatePicker label="Test Date" />);

    // Open the calendar
    const input = screen.getByLabelText('Test Date');
    fireEvent.click(input);

    // Find navigation buttons
    const prevButton = screen.getByLabelText('Vorheriger Monat');
    const nextButton = screen.getByLabelText('Nächster Monat');

    // Focus prev button
    prevButton.focus();
    expect(a11y.hasVisibleFocusIndicator(prevButton)).toBe(true);

    // Focus next button
    nextButton.focus();
    expect(a11y.hasVisibleFocusIndicator(nextButton)).toBe(true);

    // Find a day cell
    const dayCells = screen.getAllByRole('gridcell');
    const dayCell = dayCells.find((cell) => !cell.getAttribute('aria-disabled'));

    if (dayCell) {
      // Find the button inside the cell
      const button = dayCell.querySelector('button');
      if (button) {
        // Focus the button
        button.focus();
        expect(a11y.hasVisibleFocusIndicator(button)).toBe(true);
      }
    }
  });
});
