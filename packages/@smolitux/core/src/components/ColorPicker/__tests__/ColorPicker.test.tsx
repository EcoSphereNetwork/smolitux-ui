import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ColorPicker from '../ColorPicker';

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

describe('ColorPicker', () => {
  it('renders correctly with default props', () => {
    render(<ColorPicker />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders with custom placeholder', () => {
    render(<ColorPicker placeholder="Select color" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Select color');
  });

  it('renders with label', () => {
    render(<ColorPicker label="Color" />);

    expect(screen.getByText('Color')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<ColorPicker helperText="Choose a color" />);

    expect(screen.getByText('Choose a color')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<ColorPicker error="Invalid color" />);

    expect(screen.getByText('Invalid color')).toBeInTheDocument();
  });

  it('renders in disabled state', () => {
    render(<ColorPicker disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('renders in readonly state', () => {
    render(<ColorPicker readOnly />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
  });

  it('displays the correct color when value is provided', () => {
    render(<ColorPicker value="#ff0000" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('#ff0000');

    const colorPreview = screen.getByTestId('color-preview');
    expect(colorPreview).toHaveStyle('background-color: #ff0000');
  });

  it('calls onChange when color is selected', () => {
    const handleChange = jest.fn();
    render(<ColorPicker onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '#00ff00' } });
    fireEvent.blur(input);

    expect(handleChange).toHaveBeenCalledWith('#00ff00', 'hex');
  });

  it('opens color picker when input is clicked', () => {
    render(<ColorPicker />);

    const input = screen.getByRole('textbox');
    fireEvent.click(input);

    expect(screen.getByTestId('color-picker-popup')).toBeInTheDocument();
  });

  it('closes color picker when clicking outside', () => {
    render(<ColorPicker />);

    const input = screen.getByRole('textbox');
    fireEvent.click(input);

    expect(screen.getByTestId('color-picker-popup')).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(document.body);

    expect(screen.queryByTestId('color-picker-popup')).not.toBeInTheDocument();
  });

  it('renders with preset colors', () => {
    const presetColors = ['#ff0000', '#00ff00', '#0000ff'];
    render(<ColorPicker presetColors={presetColors} />);

    const input = screen.getByRole('textbox');
    fireEvent.click(input);

    const presetElements = screen.getAllByTestId('preset-color');
    expect(presetElements).toHaveLength(3);

    expect(presetElements[0]).toHaveStyle('background-color: #ff0000');
    expect(presetElements[1]).toHaveStyle('background-color: #00ff00');
    expect(presetElements[2]).toHaveStyle('background-color: #0000ff');
  });

  it('selects a preset color when clicked', () => {
    const handleChange = jest.fn();
    const presetColors = ['#ff0000', '#00ff00', '#0000ff'];
    render(<ColorPicker presetColors={presetColors} onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.click(input);

    const presetElements = screen.getAllByTestId('preset-color');
    fireEvent.click(presetElements[1]);

    expect(handleChange).toHaveBeenCalledWith('#00ff00', 'hex');
  });

  it('renders with different formats', () => {
    const { rerender } = render(<ColorPicker value="#ff0000" format="hex" />);

    let input = screen.getByRole('textbox');
    expect(input).toHaveValue('#ff0000');

    rerender(<ColorPicker value="#ff0000" format="rgb" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveValue('rgb(255, 0, 0)');

    rerender(<ColorPicker value="#ff0000" format="hsl" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveValue('hsl(0, 100%, 50%)');
  });

  it('renders with alpha channel when allowAlpha is true', () => {
    render(<ColorPicker allowAlpha />);

    const input = screen.getByRole('textbox');
    fireEvent.click(input);

    expect(screen.getByTestId('alpha-slider')).toBeInTheDocument();
  });

  it('does not render alpha channel when allowAlpha is false', () => {
    render(<ColorPicker allowAlpha={false} />);

    const input = screen.getByRole('textbox');
    fireEvent.click(input);

    expect(screen.queryByTestId('alpha-slider')).not.toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<ColorPicker size="sm" />);

    let input = screen.getByRole('textbox');
    expect(input).toHaveClass('h-8');

    rerender(<ColorPicker size="md" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('h-10');

    rerender(<ColorPicker size="lg" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('h-12');
  });

  it('renders with fullWidth', () => {
    render(<ColorPicker fullWidth />);

    const container = screen.getByTestId('color-picker-container');
    expect(container).toHaveClass('w-full');
  });

  it('validates color input', () => {
    render(<ColorPicker />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'invalid-color' } });
    fireEvent.blur(input);

    expect(screen.getByText('Invalid color format')).toBeInTheDocument();
  });

  it('accepts valid color input', () => {
    render(<ColorPicker />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '#ff0000' } });
    fireEvent.blur(input);

    expect(screen.queryByText('Invalid color format')).not.toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<ColorPicker className="custom-color-picker" />);

    const container = screen.getByTestId('color-picker-container');
    expect(container).toHaveClass('custom-color-picker');
  });

  it('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<ColorPicker ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });
});
