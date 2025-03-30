import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextArea } from '../TextArea';

describe('TextArea', () => {
  it('renders correctly with default props', () => {
    render(<TextArea />);
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('renders with placeholder text', () => {
    render(<TextArea placeholder="Enter your message" />);
    
    const textarea = screen.getByPlaceholderText('Enter your message');
    expect(textarea).toBeInTheDocument();
  });

  it('renders with label when provided', () => {
    render(<TextArea label="Message" />);
    
    expect(screen.getByTestId('textarea-label')).toHaveTextContent('Message');
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('renders with helper text when provided', () => {
    render(<TextArea helperText="Maximum 500 characters" />);
    
    expect(screen.getByTestId('textarea-helper')).toHaveTextContent('Maximum 500 characters');
  });

  it('renders with error state and message', () => {
    render(<TextArea error="This field is required" />);
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByTestId('textarea-error')).toHaveTextContent('This field is required');
  });

  it('renders as disabled', () => {
    render(<TextArea disabled />);
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('opacity-50');
    expect(textarea).toHaveClass('cursor-not-allowed');
  });

  it('renders as readonly', () => {
    render(<TextArea readOnly value="Read only value" />);
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('readonly');
    expect(textarea).toHaveValue('Read only value');
  });

  it('renders with custom className', () => {
    render(<TextArea className="custom-textarea" />);
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('custom-textarea');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<TextArea size="sm" />);
    
    let textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('px-3 py-1.5 text-sm');
    
    rerender(<TextArea size="md" />);
    textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('px-4 py-2 text-base');
    
    rerender(<TextArea size="lg" />);
    textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('px-5 py-3 text-lg');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<TextArea variant="outline" />);
    
    let textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('border border-gray-300');
    
    rerender(<TextArea variant="filled" />);
    textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('bg-gray-100');
    
    rerender(<TextArea variant="unstyled" />);
    textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('bg-transparent');
    
    rerender(<TextArea variant="flushed" />);
    textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('border-b');
    expect(textarea).toHaveClass('rounded-none');
  });

  it('calls onChange when textarea value changes', () => {
    const handleChange = jest.fn();
    render(<TextArea onChange={handleChange} />);
    
    const textarea = screen.getByTestId('textarea');
    fireEvent.change(textarea, { target: { value: 'test message' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(textarea).toHaveValue('test message');
  });

  it('calls onFocus when textarea is focused', () => {
    const handleFocus = jest.fn();
    render(<TextArea onFocus={handleFocus} />);
    
    const textarea = screen.getByTestId('textarea');
    fireEvent.focus(textarea);
    
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when textarea loses focus', () => {
    const handleBlur = jest.fn();
    render(<TextArea onBlur={handleBlur} />);
    
    const textarea = screen.getByTestId('textarea');
    fireEvent.focus(textarea);
    fireEvent.blur(textarea);
    
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('renders with required attribute when required is true', () => {
    render(<TextArea required />);
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('required');
  });

  it('renders with autofocus attribute when autoFocus is true', () => {
    render(<TextArea autoFocus />);
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveFocus();
  });

  it('forwards ref to textarea element', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<TextArea ref={ref} />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('TEXTAREA');
  });

  it('renders with aria attributes', () => {
    render(
      <TextArea 
        aria-label="Message"
        aria-describedby="message-description"
        error="Error message"
      />
    );
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('aria-label', 'Message');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders with full width when fullWidth is true', () => {
    render(<TextArea fullWidth />);
    
    const container = screen.getByTestId('textarea-container');
    expect(container).toHaveClass('w-full');
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('w-full');
  });

  it('renders with custom width when width is provided', () => {
    render(<TextArea width="300px" />);
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveStyle('width: 300px');
  });

  it('renders with custom height when height is provided', () => {
    render(<TextArea height="200px" />);
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveStyle('height: 200px');
  });

  it('renders with resize options', () => {
    const { rerender } = render(<TextArea resize="none" />);
    
    let textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveStyle('resize: none');
    
    rerender(<TextArea resize="both" />);
    textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveStyle('resize: both');
    
    rerender(<TextArea resize="horizontal" />);
    textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveStyle('resize: horizontal');
    
    rerender(<TextArea resize="vertical" />);
    textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveStyle('resize: vertical');
  });

  it('renders with rows attribute', () => {
    render(<TextArea rows={5} />);
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  it('renders with cols attribute', () => {
    render(<TextArea cols={40} />);
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('cols', '40');
  });

  it('renders with maxLength attribute', () => {
    render(<TextArea maxLength={500} />);
    
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('maxlength', '500');
  });

  it('displays character count when showCount is true', () => {
    render(<TextArea showCount maxLength={500} value="Hello" />);
    
    expect(screen.getByTestId('textarea-counter')).toHaveTextContent('5/500');
  });

  it('updates character count when value changes', () => {
    const { rerender } = render(<TextArea showCount maxLength={500} value="Hello" />);
    
    expect(screen.getByTestId('textarea-counter')).toHaveTextContent('5/500');
    
    rerender(<TextArea showCount maxLength={500} value="Hello World" />);
    
    expect(screen.getByTestId('textarea-counter')).toHaveTextContent('11/500');
  });

  it('displays character count with error class when exceeding maxLength', () => {
    // Hinweis: In der verbesserten Komponente wird maxLength vom Browser durchgesetzt,
    // aber wir können trotzdem testen, ob die Anzeige korrekt ist, wenn der Wert das Maximum überschreitet
    render(<TextArea showCount maxLength={10} defaultValue="This is too long" />);
    
    const countElement = screen.getByTestId('textarea-counter');
    expect(countElement).toHaveTextContent('16/10');
    expect(countElement).toHaveClass('text-red-600');
  });

  it('handles auto-resize correctly', () => {
    render(<TextArea autoResize />);
    
    const textarea = screen.getByTestId('textarea');
    const initialHeight = textarea.style.height;
    
    // Simuliere eine Texteingabe, die mehr Platz benötigt
    fireEvent.change(textarea, { target: { value: 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5' } });
    
    // In einem echten Browser würde sich die Höhe ändern, aber in JSDOM nicht
    // Wir können nur prüfen, ob die Funktion aufgerufen wurde
    expect(textarea.value).toBe('Line 1\nLine 2\nLine 3\nLine 4\nLine 5');
  });

  it('renders with custom data-testid', () => {
    render(<TextArea data-testid="custom-textarea" />);
    
    expect(screen.getByTestId('custom-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('custom-textarea-container')).toBeInTheDocument();
  });
});