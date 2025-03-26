import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

describe('Radio', () => {
  it('renders correctly with default props', () => {
    render(<Radio label="Option 1" value="option1" />);
    
    const radio = screen.getByRole('radio', { name: /option 1/i });
    expect(radio).toBeInTheDocument();
    expect(radio).not.toBeChecked();
  });

  it('renders with checked state when checked is true', () => {
    render(<Radio label="Option 1" value="option1" checked={true} />);
    
    const radio = screen.getByRole('radio', { name: /option 1/i });
    expect(radio).toBeChecked();
  });

  it('renders as disabled when disabled is true', () => {
    render(<Radio label="Option 1" value="option1" disabled={true} />);
    
    const radio = screen.getByRole('radio', { name: /option 1/i });
    expect(radio).toBeDisabled();
  });

  it('calls onChange when radio is clicked', () => {
    const handleChange = jest.fn();
    render(<Radio label="Option 1" value="option1" onChange={handleChange} />);
    
    const radio = screen.getByRole('radio', { name: /option 1/i });
    fireEvent.click(radio);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('does not call onChange when disabled radio is clicked', () => {
    const handleChange = jest.fn();
    render(<Radio label="Option 1" value="option1" onChange={handleChange} disabled={true} />);
    
    const radio = screen.getByRole('radio', { name: /option 1/i });
    fireEvent.click(radio);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders with custom className', () => {
    render(<Radio label="Option 1" value="option1" className="custom-radio" />);
    
    const radioContainer = screen.getByTestId('radio-container');
    expect(radioContainer).toHaveClass('custom-radio');
  });

  it('renders with custom style', () => {
    const customStyle = { backgroundColor: 'lightblue', padding: '10px' };
    render(<Radio label="Option 1" value="option1" style={customStyle} />);
    
    const radioContainer = screen.getByTestId('radio-container');
    expect(radioContainer).toHaveStyle('background-color: lightblue');
    expect(radioContainer).toHaveStyle('padding: 10px');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Radio label="Option 1" value="option1" size="sm" />);
    
    let radioContainer = screen.getByTestId('radio-container');
    expect(radioContainer).toHaveClass('radio-sm');
    
    rerender(<Radio label="Option 1" value="option1" size="md" />);
    radioContainer = screen.getByTestId('radio-container');
    expect(radioContainer).toHaveClass('radio-md');
    
    rerender(<Radio label="Option 1" value="option1" size="lg" />);
    radioContainer = screen.getByTestId('radio-container');
    expect(radioContainer).toHaveClass('radio-lg');
  });

  it('renders with error state', () => {
    render(<Radio label="Option 1" value="option1" error={true} />);
    
    const radioContainer = screen.getByTestId('radio-container');
    expect(radioContainer).toHaveClass('radio-error');
  });

  it('renders with helper text', () => {
    render(<Radio label="Option 1" value="option1" helperText="This is the first option" />);
    
    expect(screen.getByText('This is the first option')).toBeInTheDocument();
  });

  it('renders with required attribute', () => {
    render(<Radio label="Option 1" value="option1" required={true} />);
    
    const radio = screen.getByRole('radio', { name: /option 1/i });
    expect(radio).toHaveAttribute('required');
  });

  it('renders with custom label placement', () => {
    const { rerender } = render(<Radio label="Option 1" value="option1" labelPlacement="start" />);
    
    let radioContainer = screen.getByTestId('radio-container');
    expect(radioContainer).toHaveClass('label-start');
    
    rerender(<Radio label="Option 1" value="option1" labelPlacement="end" />);
    radioContainer = screen.getByTestId('radio-container');
    expect(radioContainer).toHaveClass('label-end');
    
    rerender(<Radio label="Option 1" value="option1" labelPlacement="top" />);
    radioContainer = screen.getByTestId('radio-container');
    expect(radioContainer).toHaveClass('label-top');
    
    rerender(<Radio label="Option 1" value="option1" labelPlacement="bottom" />);
    radioContainer = screen.getByTestId('radio-container');
    expect(radioContainer).toHaveClass('label-bottom');
  });

  it('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Radio label="Option 1" value="option1" ref={ref} />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
    expect(ref.current?.type).toBe('radio');
  });

  it('renders with aria attributes', () => {
    render(
      <Radio 
        label="Option 1" 
        value="option1"
        aria-label="First option"
        aria-describedby="option-description"
      />
    );
    
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('aria-label', 'First option');
    expect(radio).toHaveAttribute('aria-describedby', 'option-description');
  });

  it('renders without label when label is not provided', () => {
    render(<Radio value="option1" aria-label="Option 1" />);
    
    const radio = screen.getByRole('radio');
    expect(radio).toBeInTheDocument();
    expect(screen.queryByTestId('radio-label')).not.toBeInTheDocument();
  });

  it('renders with custom color', () => {
    render(<Radio label="Option 1" value="option1" color="primary" />);
    
    const radioContainer = screen.getByTestId('radio-container');
    expect(radioContainer).toHaveClass('radio-primary');
  });
});

describe('RadioGroup', () => {
  it('renders correctly with default props', () => {
    render(
      <RadioGroup name="options">
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
        <Radio label="Option 3" value="option3" />
      </RadioGroup>
    );
    
    expect(screen.getByRole('radio', { name: /option 1/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /option 2/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /option 3/i })).toBeInTheDocument();
  });

  it('sets the correct value for the selected radio', () => {
    render(
      <RadioGroup name="options" value="option2">
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
        <Radio label="Option 3" value="option3" />
      </RadioGroup>
    );
    
    expect(screen.getByRole('radio', { name: /option 1/i })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: /option 2/i })).toBeChecked();
    expect(screen.getByRole('radio', { name: /option 3/i })).not.toBeChecked();
  });

  it('calls onChange when a radio is selected', () => {
    const handleChange = jest.fn();
    render(
      <RadioGroup name="options" onChange={handleChange}>
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
        <Radio label="Option 3" value="option3" />
      </RadioGroup>
    );
    
    const radio2 = screen.getByRole('radio', { name: /option 2/i });
    fireEvent.click(radio2);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object), 'option2');
  });

  it('disables all radios when disabled is true', () => {
    render(
      <RadioGroup name="options" disabled={true}>
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
        <Radio label="Option 3" value="option3" />
      </RadioGroup>
    );
    
    expect(screen.getByRole('radio', { name: /option 1/i })).toBeDisabled();
    expect(screen.getByRole('radio', { name: /option 2/i })).toBeDisabled();
    expect(screen.getByRole('radio', { name: /option 3/i })).toBeDisabled();
  });

  it('renders with custom className', () => {
    render(
      <RadioGroup name="options" className="custom-radio-group">
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>
    );
    
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('custom-radio-group');
  });

  it('renders with custom style', () => {
    const customStyle = { backgroundColor: 'lightblue', padding: '10px' };
    render(
      <RadioGroup name="options" style={customStyle}>
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>
    );
    
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveStyle('background-color: lightblue');
    expect(radioGroup).toHaveStyle('padding: 10px');
  });

  it('renders with row orientation', () => {
    render(
      <RadioGroup name="options" row={true}>
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>
    );
    
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('radio-group-row');
  });

  it('renders with column orientation by default', () => {
    render(
      <RadioGroup name="options">
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>
    );
    
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('radio-group-column');
  });

  it('renders with label', () => {
    render(
      <RadioGroup name="options" label="Select an option">
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>
    );
    
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(
      <RadioGroup name="options" helperText="Please select one option">
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>
    );
    
    expect(screen.getByText('Please select one option')).toBeInTheDocument();
  });

  it('renders with error state', () => {
    render(
      <RadioGroup name="options" error={true} errorMessage="Selection is required">
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>
    );
    
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('radio-group-error');
    expect(screen.getByText('Selection is required')).toBeInTheDocument();
  });
});