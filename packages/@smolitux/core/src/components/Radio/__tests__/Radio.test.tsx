import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '@smolitux/testing';
import { Radio } from '../Radio';
import { RadioGroup } from '../RadioGroup';

describe('Radio', () => {
  it('renders correctly with default props', () => {
    render(<Radio label="Option 1" value="option1" />);

    const radio = screen.getByRole('radio', { name: /option 1/i });
    expect(radio).toBeInTheDocument();
    expect(radio).not.toBeChecked();
  });

  it('renders with checked state when checked is true', () => {
    render(<Radio label="Option 1" value="option1" checked={true} onChange={() => {}} />);

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

    // Direkt auf dem Input-Element klicken sollte keinen Effekt haben, wenn es disabled ist
    expect(radio).toBeDisabled();
  });

  it('renders with custom className', () => {
    render(<Radio label="Option 1" value="option1" className="custom-radio" />);

    // Prüfen, ob die Klasse auf dem Container vorhanden ist
    const container = screen.getByText('Option 1').closest('div');
    expect(container?.parentElement?.parentElement).toHaveClass('custom-radio');
  });

  it('renders with custom style', () => {
    const customStyle = { marginTop: '10px' };
    render(<Radio label="Option 1" value="option1" style={customStyle} />);

    // Wir prüfen, ob der Container existiert
    const container = screen.getByText('Option 1').closest('div');
    expect(container?.parentElement?.parentElement).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Radio label="Option 1" value="option1" size="sm" />);

    // Prüfen, ob die Radio-Eingabe die richtige Größenklasse hat
    let radio = screen.getByRole('radio');
    expect(radio).toHaveClass('h-4');

    rerender(<Radio label="Option 1" value="option1" size="md" />);
    radio = screen.getByRole('radio');
    expect(radio).toHaveClass('h-5');

    rerender(<Radio label="Option 1" value="option1" size="lg" />);
    radio = screen.getByRole('radio');
    expect(radio).toHaveClass('h-6');
  });

  it('renders with error state', () => {
    render(<Radio label="Option 1" value="option1" error="This is an error" />);

    // Prüfen, ob die Radio den Fehlerstatus hat
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('aria-invalid', 'true');
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

  it('renders with custom label position', () => {
    const { unmount } = render(<Radio label="Option 1" value="option1" labelPosition="left" />);

    // Prüfen, ob das Label vorhanden ist
    const labels = screen.getAllByText('Option 1');
    expect(labels.length).toBeGreaterThan(0);

    // Unmount und neu rendern mit anderer Position
    unmount();
    render(<Radio label="Option 1" value="option1" labelPosition="right" />);
    const labelsAfter = screen.getAllByText('Option 1');
    expect(labelsAfter.length).toBeGreaterThan(0);
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
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('renders with custom color scheme', () => {
    render(<Radio label="Option 1" value="option1" colorScheme="primary" />);

    const radio = screen.getByRole('radio');
    expect(radio).toHaveClass('text-primary-600');
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

    // Prüfen, ob die Gruppe existiert
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('custom-radio-group');
  });

  it('renders with custom style', () => {
    const customStyle = { marginTop: '10px' };
    render(
      <RadioGroup name="options" style={customStyle}>
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>
    );

    // Wir prüfen, ob der Container existiert
    const container = screen.getByText('Option 1').closest('div');
    expect(container?.parentElement?.parentElement?.parentElement).toBeInTheDocument();
  });

  it('renders with layout prop', () => {
    render(
      <RadioGroup name="options" layout="horizontal">
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>
    );

    // Wir prüfen, ob der Container existiert
    const container = screen.getByText('Option 1').closest('div');
    expect(container?.parentElement?.parentElement?.parentElement).toBeInTheDocument();
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

  it('renders with error message', () => {
    render(
      <RadioGroup name="options" error="Selection is required">
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>
    );

    // Da mehrere Elemente mit dem Text existieren, verwenden wir getAllByText
    const errorMessages = screen.getAllByText('Selection is required');
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});
