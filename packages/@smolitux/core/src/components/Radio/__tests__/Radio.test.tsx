import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio, RadioGroup } from '../Radio';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('Radio', () => {
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

  test('renders disabled state correctly', () => {
    render(<Radio value="option1" disabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  test('does not trigger onChange when disabled', async () => {
    const handleChange = jest.fn();
    render(<Radio value="option1" onChange={handleChange} disabled />);
    
    const radio = screen.getByRole('radio');
    await userEvent.click(radio);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('renders with custom size', () => {
    const { rerender } = render(<Radio value="option1" size="sm" />);
    expect(screen.getByRole('radio')).toHaveClass('h-4 w-4');
    
    rerender(<Radio value="option1" size="md" />);
    expect(screen.getByRole('radio')).toHaveClass('h-5 w-5');
    
    rerender(<Radio value="option1" size="lg" />);
    expect(screen.getByRole('radio')).toHaveClass('h-6 w-6');
  });

  test('renders with custom color', () => {
    render(<Radio value="option1" color="accent" />);
    expect(screen.getByRole('radio')).toHaveClass('accent-accent-500');
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Radio value="option1" ref={ref} data-testid="radio-with-ref" />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByTestId('radio-with-ref'));
  });

  test('applies custom className correctly', () => {
    render(<Radio value="option1" className="custom-class" />);
    expect(screen.getByRole('radio')).toHaveClass('custom-class');
  });

  test('renders with required attribute', () => {
    render(<Radio value="option1" required />);
    expect(screen.getByRole('radio')).toHaveAttribute('required');
  });

  test('renders with name attribute', () => {
    render(<Radio value="option1" name="options" />);
    expect(screen.getByRole('radio')).toHaveAttribute('name', 'options');
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
});

describe('RadioGroup', () => {
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

  test('renders with custom layout', () => {
    render(
      <RadioGroup name="options" layout="horizontal">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    );
    
    // In a real implementation, we would check for horizontal layout classes
    const radioGroupElement = screen.getByRole('radiogroup');
    expect(radioGroupElement).toHaveClass('flex-row');
  });
});