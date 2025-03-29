import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../Input';

describe('Input', () => {
  it('renders correctly with default props', () => {
    render(<Input />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('block');
    expect(input).toHaveClass('appearance-none');
  });

  it('renders with placeholder text', () => {
    render(<Input placeholder="Enter your name" />);
    
    const input = screen.getByPlaceholderText('Enter your name');
    expect(input).toBeInTheDocument();
  });

  it('renders with label when provided', () => {
    render(<Input label="Username" />);
    
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('renders with helper text when provided', () => {
    render(<Input helperText="Must be at least 8 characters" />);
    
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
  });

  it('renders with error state and message', () => {
    render(<Input error="This field is required" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
  });

  it('renders as disabled', () => {
    render(<Input disabled />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('opacity-50');
    expect(input).toHaveClass('cursor-not-allowed');
  });

  it('renders as readonly', () => {
    render(<Input readOnly value="Read only value" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveValue('Read only value');
  });

  it('renders with custom className', () => {
    render(<Input className="custom-input" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-input');
  });

  it('renders with custom style', () => {
    const customStyle = { backgroundColor: 'lightblue', padding: '10px' };
    render(<Input style={customStyle} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveStyle('background-color: lightblue');
    expect(input).toHaveStyle('padding: 10px');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Input size="sm" />);
    
    let input = screen.getByRole('textbox');
    expect(input).toHaveClass('text-sm');
    
    rerender(<Input size="md" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('text-base');
    
    rerender(<Input size="lg" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('text-lg');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Input variant="outline" />);
    
    let input = screen.getByRole('textbox');
    expect(input).toHaveClass('border');
    expect(input).toHaveClass('bg-white');
    
    rerender(<Input variant="filled" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-0');
    expect(input).toHaveClass('bg-gray-100');
    
    rerender(<Input variant="flushed" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-b-2');
    expect(input).toHaveClass('rounded-none');
  });

  it('renders with prefix', () => {
    render(<Input prefix="$" />);
    
    expect(screen.getByText('$')).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('pl-10');
  });

  it('renders with suffix', () => {
    render(<Input suffix=".com" />);
    
    expect(screen.getByText('.com')).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('pr-10');
  });

  it('renders with left icon', () => {
    render(<Input leftIcon={<span data-testid="left-icon">🔍</span>} />);
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('pl-10');
  });

  it('renders with right icon', () => {
    render(<Input rightIcon={<span data-testid="right-icon">✓</span>} />);
    
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('pr-10');
  });
  
  it('renders with clickable icons', () => {
    const handleLeftClick = jest.fn();
    const handleRightClick = jest.fn();
    
    render(
      <Input 
        leftIcon={<span data-testid="left-icon">🔍</span>}
        rightIcon={<span data-testid="right-icon">✓</span>}
        isLeftIconClickable
        isRightIconClickable
        onLeftIconClick={handleLeftClick}
        onRightIconClick={handleRightClick}
      />
    );
    
    const leftIcon = screen.getByTestId('left-icon').parentElement;
    const rightIcon = screen.getByTestId('right-icon').parentElement;
    
    expect(leftIcon).toHaveClass('cursor-pointer');
    expect(rightIcon).toHaveClass('cursor-pointer');
    
    fireEvent.click(leftIcon);
    expect(handleLeftClick).toHaveBeenCalledTimes(1);
    
    fireEvent.click(rightIcon);
    expect(handleRightClick).toHaveBeenCalledTimes(1);
  });

  it('calls onChange when input value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('test value');
  });

  it('calls onFocus when input is focused', () => {
    const handleFocus = jest.fn();
    render(<Input onFocus={handleFocus} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when input loses focus', () => {
    const handleBlur = jest.fn();
    render(<Input onBlur={handleBlur} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.blur(input);
    
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('renders with different input types', () => {
    const { rerender } = render(<Input type="text" />);
    
    let input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
    
    rerender(<Input type="password" />);
    input = screen.getByLabelText(/password/i);
    expect(input).toHaveAttribute('type', 'password');
    
    rerender(<Input type="email" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    
    rerender(<Input type="number" />);
    input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('type', 'number');
  });

  it('renders with required attribute when required is true', () => {
    render(<Input required />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('required');
  });

  it('renders with autofocus attribute when autoFocus is true', () => {
    render(<Input autoFocus />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveFocus();
  });

  it('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });

  it('renders with aria attributes', () => {
    render(
      <Input 
        aria-label="Search"
        aria-describedby="search-description"
        aria-invalid={false}
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-label', 'Search');
    expect(input).toHaveAttribute('aria-describedby', 'search-description');
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });

  it('renders with full width when fullWidth is true', () => {
    render(<Input fullWidth />);
    
    const container = screen.getByRole('textbox').closest('div').parentElement;
    expect(container).toHaveClass('w-full');
  });
  
  it('renders with password toggle', () => {
    render(<Input type="password" showPasswordToggle />);
    
    // Passwort-Felder haben nicht die Rolle 'textbox', sondern keine spezifische Rolle
    const input = screen.getByDisplayValue('');
    expect(input).toHaveAttribute('type', 'password');
    
    const toggleButton = screen.getByTestId('password-toggle');
    expect(toggleButton).toBeInTheDocument();
    
    fireEvent.click(toggleButton);
    
    expect(input).toHaveAttribute('type', 'text');
  });
  
  it('renders with clearable button', () => {
    render(<Input isClearable defaultValue="Test value" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Test value');
    
    const clearButton = screen.getByTestId('clear-button');
    expect(clearButton).toBeInTheDocument();
    
    fireEvent.click(clearButton);
    
    expect(input).toHaveValue('');
  });
});