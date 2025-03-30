import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextArea } from '../TextArea';

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

describe('TextArea', () => {
  it('renders correctly with default props', () => {
    render(<TextArea />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass('textarea');
  });

  it('renders with label', () => {
    render(<TextArea label="Description" />);
    
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<TextArea helperText="Enter a description" />);
    
    expect(screen.getByText('Enter a description')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<TextArea error="Description is required" />);
    
    expect(screen.getByText('Description is required')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<TextArea placeholder="Enter description here" />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', 'Enter description here');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<TextArea size="sm" />);
    
    let textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('text-sm');
    
    rerender(<TextArea size="md" />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('text-base');
    
    rerender(<TextArea size="lg" />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('text-lg');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<TextArea variant="outline" />);
    
    let textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('border');
    
    rerender(<TextArea variant="filled" />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('bg-gray-100');
    
    rerender(<TextArea variant="unstyled" />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('border-none');
  });

  it('renders with fullWidth', () => {
    render(<TextArea fullWidth />);
    
    const container = screen.getByTestId('textarea-container');
    expect(container).toHaveClass('w-full');
  });

  it('renders with specified number of rows', () => {
    render(<TextArea rows={5} />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  it('renders with maxLength', () => {
    render(<TextArea maxLength={100} />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('maxLength', '100');
  });

  it('shows character count when showCount is true', () => {
    render(<TextArea showCount maxLength={100} />);
    
    expect(screen.getByText('0/100')).toBeInTheDocument();
  });

  it('updates character count when typing', () => {
    render(<TextArea showCount maxLength={100} />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    
    expect(screen.getByText('5/100')).toBeInTheDocument();
  });

  it('auto-resizes when autoResize is true', () => {
    render(<TextArea autoResize />);
    
    const textarea = screen.getByRole('textbox');
    
    // Mock scrollHeight
    Object.defineProperty(textarea, 'scrollHeight', { value: 100 });
    
    fireEvent.change(textarea, { target: { value: 'Line 1\nLine 2\nLine 3' } });
    
    expect(textarea.style.height).toBe('100px');
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<TextArea onChange={handleChange} />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New value' } });
    
    expect(handleChange).toHaveBeenCalled();
    expect(textarea).toHaveValue('New value');
  });

  it('renders in disabled state', () => {
    render(<TextArea disabled />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('renders in readonly state', () => {
    render(<TextArea readOnly />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('readonly');
  });

  it('renders with required attribute', () => {
    render(<TextArea required />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('required');
  });

  it('renders with custom className', () => {
    render(<TextArea className="custom-textarea" />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-textarea');
  });

  it('forwards ref to textarea element', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<TextArea ref={ref} />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('TEXTAREA');
  });

  it('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    
    render(<TextArea onFocus={handleFocus} onBlur={handleBlur} />);
    
    const textarea = screen.getByRole('textbox');
    
    fireEvent.focus(textarea);
    expect(handleFocus).toHaveBeenCalled();
    
    fireEvent.blur(textarea);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('applies custom styles', () => {
    render(<TextArea style={{ color: 'red' }} />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveStyle('color: red');
  });

  it('handles key events', () => {
    const handleKeyDown = jest.fn();
    render(<TextArea onKeyDown={handleKeyDown} />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { key: 'Enter' });
    
    expect(handleKeyDown).toHaveBeenCalled();
  });
});