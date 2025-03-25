import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RadioGroup } from '../RadioGroup';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('RadioGroup', () => {
  const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  it('renders correctly with default props', () => {
    render(<RadioGroup name="test-group" options={defaultOptions} />);
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
    
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(3);
    expect(radioButtons[0]).not.toBeChecked();
    expect(radioButtons[1]).not.toBeChecked();
    expect(radioButtons[2]).not.toBeChecked();
  });

  it('renders with selected value', () => {
    render(<RadioGroup name="test-group" options={defaultOptions} value="option2" />);
    
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons[0]).not.toBeChecked();
    expect(radioButtons[1]).toBeChecked();
    expect(radioButtons[2]).not.toBeChecked();
  });

  it('calls onChange when an option is selected', () => {
    const handleChange = jest.fn();
    render(<RadioGroup name="test-group" options={defaultOptions} onChange={handleChange} />);
    
    const radioButtons = screen.getAllByRole('radio');
    fireEvent.click(radioButtons[1]);
    
    expect(handleChange).toHaveBeenCalledWith('option2');
  });

  it('renders with label', () => {
    render(<RadioGroup name="test-group" options={defaultOptions} label="Test Label" />);
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<RadioGroup name="test-group" options={defaultOptions} helperText="Helper Text" />);
    
    expect(screen.getByText('Helper Text')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<RadioGroup name="test-group" options={defaultOptions} error="Error Message" />);
    
    expect(screen.getByText('Error Message')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<RadioGroup name="test-group" options={defaultOptions} size="sm" />);
    
    let radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio.parentElement).toHaveClass('w-4 h-4');
    });
    
    rerender(<RadioGroup name="test-group" options={defaultOptions} size="md" />);
    radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio.parentElement).toHaveClass('w-5 h-5');
    });
    
    rerender(<RadioGroup name="test-group" options={defaultOptions} size="lg" />);
    radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio.parentElement).toHaveClass('w-6 h-6');
    });
  });

  it('renders with horizontal direction', () => {
    render(<RadioGroup name="test-group" options={defaultOptions} direction="horizontal" />);
    
    const container = screen.getByRole('radiogroup');
    expect(container.firstChild).toHaveClass('flex-row');
  });

  it('renders with vertical direction', () => {
    render(<RadioGroup name="test-group" options={defaultOptions} direction="vertical" />);
    
    const container = screen.getByRole('radiogroup');
    expect(container.firstChild).toHaveClass('flex-col');
  });

  it('renders with disabled state', () => {
    render(<RadioGroup name="test-group" options={defaultOptions} disabled />);
    
    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio).toBeDisabled();
    });
  });

  it('renders with individual disabled options', () => {
    const optionsWithDisabled = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
      { value: 'option3', label: 'Option 3' }
    ];
    
    render(<RadioGroup name="test-group" options={optionsWithDisabled} />);
    
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons[0]).not.toBeDisabled();
    expect(radioButtons[1]).toBeDisabled();
    expect(radioButtons[2]).not.toBeDisabled();
  });

  it('does not call onChange when a disabled option is clicked', () => {
    const handleChange = jest.fn();
    const optionsWithDisabled = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
      { value: 'option3', label: 'Option 3' }
    ];
    
    render(<RadioGroup name="test-group" options={optionsWithDisabled} onChange={handleChange} />);
    
    const radioButtons = screen.getAllByRole('radio');
    fireEvent.click(radioButtons[1]);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders with correct name attribute', () => {
    render(<RadioGroup name="custom-name" options={defaultOptions} />);
    
    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio).toHaveAttribute('name', 'custom-name');
    });
  });

  it('renders with correct aria attributes', () => {
    render(<RadioGroup name="test-group" options={defaultOptions} label="Test Label" />);
    
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveAttribute('aria-labelledby');
  });

  it('renders with required attribute', () => {
    render(<RadioGroup name="test-group" options={defaultOptions} required />);
    
    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio).toHaveAttribute('required');
    });
  });

  it('renders with custom className', () => {
    render(<RadioGroup name="test-group" options={defaultOptions} className="custom-radio-group" />);
    
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('custom-radio-group');
  });
});