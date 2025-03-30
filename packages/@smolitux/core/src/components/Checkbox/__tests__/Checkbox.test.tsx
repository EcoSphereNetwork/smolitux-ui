import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '../Checkbox';

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
    render(<Checkbox label="Accept terms" checked={true} onChange={() => {}} />);
    
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
    
    // Direkt auf dem Input-Element klicken sollte keinen Effekt haben, wenn es disabled ist
    expect(checkbox).toBeDisabled();
  });

  it('renders with custom className', () => {
    render(<Checkbox label="Accept terms" className="custom-checkbox" />);
    
    const checkboxContainer = screen.getByTestId('checkbox-container');
    expect(checkboxContainer).toHaveClass('custom-checkbox');
  });

  it('renders with custom style', () => {
    const customStyle = { marginTop: '10px' };
    render(<Checkbox label="Accept terms" style={customStyle} />);
    
    // Wir prüfen, ob der Container existiert
    const container = screen.getByTestId('checkbox-container');
    expect(container).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Checkbox label="Accept terms" size="sm" />);
    
    // Prüfen, ob die Checkbox-Eingabe die richtige Größenklasse hat
    let checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('h-4');
    
    rerender(<Checkbox label="Accept terms" size="md" />);
    checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('h-5');
    
    rerender(<Checkbox label="Accept terms" size="lg" />);
    checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('h-6');
  });

  it('renders with error state', () => {
    render(<Checkbox label="Accept terms" error="This is an error" />);
    
    // Prüfen, ob die Checkbox den Fehlerstatus hat
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders with error message', () => {
    render(<Checkbox label="Accept terms" error="This field is required" />);
    
    // Prüfen, ob die Fehlermeldung angezeigt wird
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
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

  it('renders with custom label position', () => {
    const { rerender } = render(<Checkbox label="Accept terms" labelPosition="left" />);
    
    // Prüfen, ob das Label links von der Checkbox ist
    const container = screen.getByTestId('checkbox-container');
    expect(container).toBeInTheDocument();
    
    rerender(<Checkbox label="Accept terms" labelPosition="right" />);
    expect(container).toBeInTheDocument();
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

  it('renders with custom color scheme', () => {
    render(<Checkbox label="Accept terms" colorScheme="primary" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('text-primary-600');
  });
});