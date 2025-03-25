import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DatePicker } from '../DatePicker';

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

describe('DatePicker', () => {
  beforeEach(() => {
    // Mock für Date
    const mockDate = new Date(2023, 0, 15); // 15. Januar 2023
    jest.spyOn(global, 'Date').mockImplementation((args) => {
      if (args) {
        return new Date(args);
      }
      return mockDate;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<DatePicker />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('placeholder', 'YYYY-MM-DD');
  });

  it('renders with custom placeholder', () => {
    render(<DatePicker placeholder="Select date" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Select date');
  });

  it('renders with label', () => {
    render(<DatePicker label="Date" />);
    
    expect(screen.getByText('Date')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<DatePicker helperText="Select a date" />);
    
    expect(screen.getByText('Select a date')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<DatePicker error="Invalid date" />);
    
    expect(screen.getByText('Invalid date')).toBeInTheDocument();
  });

  it('renders in disabled state', () => {
    render(<DatePicker disabled />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('renders in readonly state', () => {
    render(<DatePicker readOnly />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
  });

  it('opens calendar when input is clicked', () => {
    render(<DatePicker />);
    
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    
    expect(screen.getByTestId('date-picker-calendar')).toBeInTheDocument();
  });

  it('closes calendar when clicking outside', () => {
    render(<DatePicker />);
    
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    
    expect(screen.getByTestId('date-picker-calendar')).toBeInTheDocument();
    
    // Click outside
    fireEvent.mouseDown(document.body);
    
    expect(screen.queryByTestId('date-picker-calendar')).not.toBeInTheDocument();
  });

  it('displays the correct month and year in calendar', () => {
    render(<DatePicker />);
    
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    
    expect(screen.getByText('January 2023')).toBeInTheDocument();
  });

  it('navigates to previous month when clicking previous button', () => {
    render(<DatePicker />);
    
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    
    const prevButton = screen.getByLabelText('Previous month');
    fireEvent.click(prevButton);
    
    expect(screen.getByText('December 2022')).toBeInTheDocument();
  });

  it('navigates to next month when clicking next button', () => {
    render(<DatePicker />);
    
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    
    const nextButton = screen.getByLabelText('Next month');
    fireEvent.click(nextButton);
    
    expect(screen.getByText('February 2023')).toBeInTheDocument();
  });

  it('selects a date when clicking on a day', () => {
    const handleChange = jest.fn();
    render(<DatePicker onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    
    // Find and click on day 20
    const day20 = screen.getByText('20');
    fireEvent.click(day20);
    
    expect(handleChange).toHaveBeenCalledWith(new Date(2023, 0, 20));
    expect(input).toHaveValue('2023-01-20');
  });

  it('displays the selected date in the input', () => {
    render(<DatePicker value={new Date(2023, 0, 20)} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('2023-01-20');
  });

  it('formats the date according to the format prop', () => {
    render(<DatePicker value={new Date(2023, 0, 20)} format="dd.MM.yyyy" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('20.01.2023');
  });

  it('allows manual input of date', () => {
    const handleChange = jest.fn();
    render(<DatePicker onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '2023-02-15' } });
    fireEvent.blur(input);
    
    expect(handleChange).toHaveBeenCalledWith(new Date(2023, 1, 15));
  });

  it('validates manual input', () => {
    const handleChange = jest.fn();
    render(<DatePicker onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'invalid-date' } });
    fireEvent.blur(input);
    
    expect(handleChange).not.toHaveBeenCalled();
    expect(screen.getByText('Invalid date format')).toBeInTheDocument();
  });

  it('respects min date constraint', () => {
    render(<DatePicker minDate={new Date(2023, 0, 10)} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    
    // Days before min date should be disabled
    const day5 = screen.getByText('5');
    expect(day5.closest('button')).toBeDisabled();
    
    // Days after min date should be enabled
    const day15 = screen.getByText('15');
    expect(day15.closest('button')).not.toBeDisabled();
  });

  it('respects max date constraint', () => {
    render(<DatePicker maxDate={new Date(2023, 0, 20)} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    
    // Days before max date should be enabled
    const day15 = screen.getByText('15');
    expect(day15.closest('button')).not.toBeDisabled();
    
    // Days after max date should be disabled
    const day25 = screen.getByText('25');
    expect(day25.closest('button')).toBeDisabled();
  });

  it('renders with custom className', () => {
    render(<DatePicker className="custom-date-picker" />);
    
    const container = screen.getByTestId('date-picker-container');
    expect(container).toHaveClass('custom-date-picker');
  });

  it('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<DatePicker ref={ref} />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });

  it('handles keyboard navigation', () => {
    render(<DatePicker />);
    
    const input = screen.getByRole('textbox');
    
    // Open calendar with keyboard
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(screen.getByTestId('date-picker-calendar')).toBeInTheDocument();
    
    // Close calendar with Escape
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByTestId('date-picker-calendar')).not.toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<DatePicker size="sm" />);
    
    let input = screen.getByRole('textbox');
    expect(input).toHaveClass('h-8');
    
    rerender(<DatePicker size="md" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('h-10');
    
    rerender(<DatePicker size="lg" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('h-12');
  });

  it('renders with fullWidth', () => {
    render(<DatePicker fullWidth />);
    
    const container = screen.getByTestId('date-picker-container');
    expect(container).toHaveClass('w-full');
  });
});