import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders correctly with default props', () => {
    render(<Checkbox label="Accept terms" />);
    
    const checkbox = screen.getByRole('checkbox', { name: /accept terms/i });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('renders with checked state when defaultChecked is true', () => {
    render(<Checkbox label="Accept terms" defaultChecked={true} />);
    
    const checkbox = screen.getByRole('checkbox', { name: /accept terms/i });
    expect(checkbox).toBeChecked();
  });

  it('renders with checked state when checked is true', () => {
    render(<Checkbox label="Accept terms" checked={true} />);
    
    const checkbox = screen.getByRole('checkbox', { name: /accept terms/i });
    expect(checkbox).toBeChecked();
  });

  it('renders as disabled when disabled is true', () => {
    render(<Checkbox label="Accept terms" disabled={true} />);
    
    const checkbox = screen.getByRole('checkbox', { name: /accept terms/i });
    expect(checkbox).toBeDisabled();
  });

  it('calls onChange when checkbox is clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Accept terms" onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox', { name: /accept terms/i });
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('does not call onChange when disabled checkbox is clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Accept terms" onChange={handleChange} disabled={true} />);
    
    const checkbox = screen.getByRole('checkbox', { name: /accept terms/i });
    fireEvent.click(checkbox);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders with custom className', () => {
    render(<Checkbox label="Accept terms" className="custom-checkbox" />);
    
    const checkboxContainer = screen.getByTestId('checkbox-container');
    expect(checkboxContainer).toHaveClass('custom-checkbox');
  });

  it('renders with custom style', () => {
    const customStyle = { backgroundColor: 'lightblue', padding: '10px' };
    render(<Checkbox label="Accept terms" style={customStyle} />);
    
    const checkboxContainer = screen.getByTestId('checkbox-container');
    expect(checkboxContainer).toHaveStyle('background-color: lightblue');
    expect(checkboxContainer).toHaveStyle('padding: 10px');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Checkbox label="Accept terms" size="sm" />);
    
    let checkboxContainer = screen.getByTestId('checkbox-container');
    expect(checkboxContainer).toHaveClass('checkbox-sm');
    
    rerender(<Checkbox label="Accept terms" size="md" />);
    checkboxContainer = screen.getByTestId('checkbox-container');
    expect(checkboxContainer).toHaveClass('checkbox-md');
    
    rerender(<Checkbox label="Accept terms" size="lg" />);
    checkboxContainer = screen.getByTestId('checkbox-container');
    expect(checkboxContainer).toHaveClass('checkbox-lg');
  });

  it('renders with error state', () => {
    render(<Checkbox label="Accept terms" error={true} />);
    
    const checkboxContainer = screen.getByTestId('checkbox-container');
    expect(checkboxContainer).toHaveClass('checkbox-error');
  });

  it('renders with error message', () => {
    render(<Checkbox label="Accept terms" error={true} errorMessage="This field is required" />);
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<Checkbox label="Accept terms" helperText="Please accept the terms to continue" />);
    
    expect(screen.getByText('Please accept the terms to continue')).toBeInTheDocument();
  });

  it('renders with indeterminate state', () => {
    render(<Checkbox label="Select all" indeterminate={true} />);
    
    const checkbox = screen.getByRole('checkbox', { name: /select all/i });
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  it('renders with required attribute', () => {
    render(<Checkbox label="Accept terms" required={true} />);
    
    const checkbox = screen.getByRole('checkbox', { name: /accept terms/i });
    expect(checkbox).toHaveAttribute('required');
  });

  it('renders with custom label placement', () => {
    const { rerender } = render(<Checkbox label="Accept terms" labelPlacement="start" />);
    
    let checkboxContainer = screen.getByTestId('checkbox-container');
    expect(checkboxContainer).toHaveClass('label-start');
    
    rerender(<Checkbox label="Accept terms" labelPlacement="end" />);
    checkboxContainer = screen.getByTestId('checkbox-container');
    expect(checkboxContainer).toHaveClass('label-end');
    
    rerender(<Checkbox label="Accept terms" labelPlacement="top" />);
    checkboxContainer = screen.getByTestId('checkbox-container');
    expect(checkboxContainer).toHaveClass('label-top');
    
    rerender(<Checkbox label="Accept terms" labelPlacement="bottom" />);
    checkboxContainer = screen.getByTestId('checkbox-container');
    expect(checkboxContainer).toHaveClass('label-bottom');
  });

  it('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox label="Accept terms" ref={ref} />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
    expect(ref.current?.type).toBe('checkbox');
  });

  it('renders with aria attributes', () => {
    render(
      <Checkbox 
        label="Accept terms" 
        aria-label="Terms acceptance"
        aria-describedby="terms-description"
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'Terms acceptance');
    expect(checkbox).toHaveAttribute('aria-describedby', 'terms-description');
  });

  it('renders without label when label is not provided', () => {
    render(<Checkbox aria-label="Accept terms" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(screen.queryByTestId('checkbox-label')).not.toBeInTheDocument();
  });

  it('renders with custom color', () => {
    render(<Checkbox label="Accept terms" color="primary" />);
    
    const checkboxContainer = screen.getByTestId('checkbox-container');
    expect(checkboxContainer).toHaveClass('checkbox-primary');
  });
});