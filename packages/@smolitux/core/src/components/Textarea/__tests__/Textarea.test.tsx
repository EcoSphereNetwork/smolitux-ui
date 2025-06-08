import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from '../Textarea';

describe('Textarea', () => {
  it('renders correctly with default props', () => {
    render(<Textarea />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass('textarea');
  });

  it('renders with placeholder text', () => {
    render(<Textarea placeholder="Enter your message" />);

    const textarea = screen.getByPlaceholderText('Enter your message');
    expect(textarea).toBeInTheDocument();
  });

  it('renders with label when provided', () => {
    render(<Textarea label="Message" />);

    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('renders with helper text when provided', () => {
    render(<Textarea helperText="Maximum 500 characters" />);

    expect(screen.getByText('Maximum 500 characters')).toBeInTheDocument();
  });

  it('renders with error state and message', () => {
    render(<Textarea error errorText="This field is required" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('textarea-error');
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders as disabled', () => {
    render(<Textarea disabled />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('textarea-disabled');
  });

  it('renders as readonly', () => {
    render(<Textarea readOnly value="Read only value" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('readonly');
    expect(textarea).toHaveValue('Read only value');
  });

  it('renders with custom className', () => {
    render(<Textarea className="custom-textarea" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-textarea');
  });

  it('renders with custom style', () => {
    const customStyle = { backgroundColor: 'lightblue', padding: '10px' };
    render(<Textarea style={customStyle} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveStyle('background-color: lightblue');
    expect(textarea).toHaveStyle('padding: 10px');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Textarea size="sm" />);

    let textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('textarea-sm');

    rerender(<Textarea size="md" />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('textarea-md');

    rerender(<Textarea size="lg" />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('textarea-lg');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Textarea variant="outline" />);

    let textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('textarea-outline');

    rerender(<Textarea variant="filled" />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('textarea-filled');

    rerender(<Textarea variant="flushed" />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('textarea-flushed');
  });

  it('calls onChange when textarea value changes', () => {
    const handleChange = jest.fn();
    render(<Textarea onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'test message' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(textarea).toHaveValue('test message');
  });

  it('calls onFocus when textarea is focused', () => {
    const handleFocus = jest.fn();
    render(<Textarea onFocus={handleFocus} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.focus(textarea);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when textarea loses focus', () => {
    const handleBlur = jest.fn();
    render(<Textarea onBlur={handleBlur} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.focus(textarea);
    fireEvent.blur(textarea);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('renders with required attribute when required is true', () => {
    render(<Textarea required />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('required');
  });

  it('renders with autofocus attribute when autoFocus is true', () => {
    render(<Textarea autoFocus />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveFocus();
  });

  it('forwards ref to textarea element', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('TEXTAREA');
  });

  it('renders with aria attributes', () => {
    render(
      <Textarea aria-label="Message" aria-describedby="message-description" aria-invalid={false} />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-label', 'Message');
    expect(textarea).toHaveAttribute('aria-describedby', 'message-description');
    expect(textarea).toHaveAttribute('aria-invalid', 'false');
  });

  it('renders with full width when fullWidth is true', () => {
    render(<Textarea fullWidth />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('textarea-full-width');
  });

  it('renders with custom width when width is provided', () => {
    render(<Textarea width="300px" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveStyle('width: 300px');
  });

  it('renders with custom height when height is provided', () => {
    render(<Textarea height="200px" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveStyle('height: 200px');
  });

  it('renders with resize options', () => {
    const { rerender } = render(<Textarea resize="none" />);

    let textarea = screen.getByRole('textbox');
    expect(textarea).toHaveStyle('resize: none');

    rerender(<Textarea resize="both" />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveStyle('resize: both');

    rerender(<Textarea resize="horizontal" />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveStyle('resize: horizontal');

    rerender(<Textarea resize="vertical" />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveStyle('resize: vertical');
  });

  it('renders with rows attribute', () => {
    render(<Textarea rows={5} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  it('renders with cols attribute', () => {
    render(<Textarea cols={40} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('cols', '40');
  });

  it('renders with maxLength attribute', () => {
    render(<Textarea maxLength={500} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('maxlength', '500');
  });

  it('displays character count when showCount is true', () => {
    render(<Textarea showCount maxLength={500} value="Hello" />);

    expect(screen.getByText('5/500')).toBeInTheDocument();
  });

  it('updates character count when value changes', () => {
    const { rerender } = render(<Textarea showCount maxLength={500} value="Hello" />);

    expect(screen.getByText('5/500')).toBeInTheDocument();

    rerender(<Textarea showCount maxLength={500} value="Hello World" />);

    expect(screen.getByText('11/500')).toBeInTheDocument();
  });

  it('displays character count with error class when exceeding maxLength', () => {
    render(<Textarea showCount maxLength={10} value="This is too long" />);

    const countElement = screen.getByText('15/10');
    expect(countElement).toHaveClass('character-count-exceeded');
  });
});
