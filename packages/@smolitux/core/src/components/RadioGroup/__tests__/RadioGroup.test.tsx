import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RadioGroup } from '../RadioGroup';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('RadioGroup', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  it('renders correctly with default props', () => {
    render(<RadioGroup name="test-group" options={options} />);
    
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<RadioGroup name="test-group" options={options} label="Select an option" />);
    
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<RadioGroup name="test-group" options={options} helperText="Please select one option" />);
    
    expect(screen.getByText('Please select one option')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<RadioGroup name="test-group" options={options} error="Selection is required" />);
    
    expect(screen.getByText('Selection is required')).toBeInTheDocument();
  });

  it('selects the correct option based on value prop', () => {
    render(<RadioGroup name="test-group" options={options} value="option2" />);
    
    const option1 = screen.getByLabelText('Option 1');
    const option2 = screen.getByLabelText('Option 2');
    const option3 = screen.getByLabelText('Option 3');
    
    expect(option1).not.toBeChecked();
    expect(option2).toBeChecked();
    expect(option3).not.toBeChecked();
  });

  it('calls onChange when an option is selected', () => {
    const handleChange = jest.fn();
    render(<RadioGroup name="test-group" options={options} onChange={handleChange} />);
    
    const option2 = screen.getByLabelText('Option 2');
    fireEvent.click(option2);
    
    expect(handleChange).toHaveBeenCalledWith('option2');
  });

  it('renders with horizontal direction', () => {
    render(<RadioGroup name="test-group" options={options} direction="horizontal" />);
    
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('flex-row');
  });

  it('renders with vertical direction', () => {
    render(<RadioGroup name="test-group" options={options} direction="vertical" />);
    
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('flex-col');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <RadioGroup name="test-group" options={options} size="sm" />
    );
    
    let radios = screen.getAllByRole('radio');
    radios.forEach(radio => {
      expect(radio.parentElement).toHaveClass('h-4');
    });
    
    rerender(
      <RadioGroup name="test-group" options={options} size="md" />
    );
    
    radios = screen.getAllByRole('radio');
    radios.forEach(radio => {
      expect(radio.parentElement).toHaveClass('h-5');
    });
    
    rerender(
      <RadioGroup name="test-group" options={options} size="lg" />
    );
    
    radios = screen.getAllByRole('radio');
    radios.forEach(radio => {
      expect(radio.parentElement).toHaveClass('h-6');
    });
  });

  it('disables all options when disabled prop is true', () => {
    render(<RadioGroup name="test-group" options={options} disabled />);
    
    const radios = screen.getAllByRole('radio');
    radios.forEach(radio => {
      expect(radio).toBeDisabled();
    });
  });

  it('disables individual options', () => {
    const optionsWithDisabled = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
      { value: 'option3', label: 'Option 3' }
    ];
    
    render(<RadioGroup name="test-group" options={optionsWithDisabled} />);
    
    expect(screen.getByLabelText('Option 1')).not.toBeDisabled();
    expect(screen.getByLabelText('Option 2')).toBeDisabled();
    expect(screen.getByLabelText('Option 3')).not.toBeDisabled();
  });

  it('handles keyboard navigation', () => {
    const handleChange = jest.fn();
    render(<RadioGroup name="test-group" options={options} onChange={handleChange} />);
    
    const option1 = screen.getByLabelText('Option 1');
    const option2 = screen.getByLabelText('Option 2');
    
    // Focus on first option
    option1.focus();
    
    // Press arrow down to navigate to next option
    fireEvent.keyDown(option1, { key: 'ArrowDown' });
    expect(option2).toHaveFocus();
    
    // Press space to select
    fireEvent.keyDown(option2, { key: ' ' });
    expect(handleChange).toHaveBeenCalledWith('option2');
  });

  it('applies correct name attribute to all radio inputs', () => {
    render(<RadioGroup name="test-group" options={options} />);
    
    const radios = screen.getAllByRole('radio');
    radios.forEach(radio => {
      expect(radio).toHaveAttribute('name', 'test-group');
    });
  });

  it('renders with custom className', () => {
    render(
      <RadioGroup 
        name="test-group" 
        options={options} 
        className="custom-radio-group"
      />
    );
    
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('custom-radio-group');
  });
});