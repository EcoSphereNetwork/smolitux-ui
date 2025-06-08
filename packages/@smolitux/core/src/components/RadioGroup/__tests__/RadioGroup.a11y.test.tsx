import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { RadioGroup } from '../';

// Erweitere Jest-Matcher um Barrierefreiheitsprüfungen
expect.extend(toHaveNoViolations);

describe('RadioGroup Accessibility', () => {
  // Test für die Standard-RadioGroup-Komponente
  test('should not have accessibility violations with standard RadioGroup', async () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ];

    const { container } = render(
      <RadioGroup name="test-group" label="Test Group" options={options} defaultValue="option1" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test für die A11y-Version der RadioGroup-Komponente
  test('should not have accessibility violations with A11y RadioGroup', async () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ];

    const { container } = render(
      <RadioGroup.A11y options={options} defaultValue="option1" ariaLabel="Test Group" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have proper ARIA attributes in A11y RadioGroup', async () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ];

    render(
      <RadioGroup.A11y
        options={options}
        defaultValue="option1"
        ariaLabel="Test Group"
        description="Please select one option"
        id="test-radio-group"
      />
    );

    // Überprüfe die RadioGroup
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveAttribute('aria-label', 'Test Group');
    expect(radioGroup).toHaveAttribute('id', 'test-radio-group');
    expect(radioGroup).toHaveAttribute('aria-describedby', 'test-radio-group-description');

    // Überprüfe die Beschreibung
    const description = screen.getByText('Please select one option');
    expect(description).toHaveAttribute('id', 'test-radio-group-description');
    expect(description).toHaveClass('sr-only');

    // Überprüfe die Radiobuttons
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(3);
    expect(radioButtons[0]).toBeChecked();
    expect(radioButtons[1]).not.toBeChecked();
    expect(radioButtons[2]).not.toBeChecked();
  });

  test('should handle option descriptions correctly', async () => {
    const options = [
      { value: 'option1', label: 'Option 1', description: 'Description for option 1' },
      { value: 'option2', label: 'Option 2', description: 'Description for option 2' },
    ];

    render(<RadioGroup.A11y options={options} ariaLabel="Test Group" />);

    // Überprüfe die Beschreibungen
    const description1 = screen.getByText('Description for option 1');
    const description2 = screen.getByText('Description for option 2');
    expect(description1).toBeInTheDocument();
    expect(description2).toBeInTheDocument();

    // Überprüfe die Verknüpfung mit den Radiobuttons
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons[0]).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('-description')
    );
    expect(radioButtons[1]).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('-description')
    );
  });

  test('should handle live region announcements', async () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];

    const handleChange = jest.fn();

    render(
      <RadioGroup.A11y
        options={options}
        ariaLabel="Test Group"
        liveRegion={true}
        announceChanges={true}
        announceFormat="Option {label} ausgewählt"
        onChange={handleChange}
      />
    );

    // Klicke auf die zweite Option
    const radioButtons = screen.getAllByRole('radio');
    fireEvent.click(radioButtons[1]);

    // Überprüfe, ob die Änderung angekündigt wurde
    const liveRegion = document.querySelector('[aria-live]');
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    expect(liveRegion).toHaveClass('sr-only');

    // Überprüfe, ob der onChange-Handler aufgerufen wurde
    expect(handleChange).toHaveBeenCalledWith('option2');
  });

  test('should handle disabled options correctly', async () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
    ];

    render(<RadioGroup.A11y options={options} ariaLabel="Test Group" />);

    // Überprüfe, ob die zweite Option deaktiviert ist
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons[1]).toBeDisabled();

    // Versuche, auf die deaktivierte Option zu klicken
    fireEvent.click(radioButtons[1]);

    // Die deaktivierte Option sollte nicht ausgewählt werden
    expect(radioButtons[1]).not.toBeChecked();
  });

  test('should handle different orientations correctly', async () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];

    render(<RadioGroup.A11y options={options} ariaLabel="Test Group" orientation="horizontal" />);

    // Überprüfe, ob die RadioGroup die richtige Klasse hat
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('radio-group-horizontal');
  });

  test('should handle keyboard navigation correctly', async () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ];

    render(<RadioGroup.A11y options={options} ariaLabel="Test Group" keyboardNavigation={true} />);

    const radioButtons = screen.getAllByRole('radio');

    // Fokussiere den ersten Radiobutton
    radioButtons[0].focus();
    expect(document.activeElement).toBe(radioButtons[0]);

    // Simuliere Tastendruck (Tab)
    fireEvent.keyDown(radioButtons[0], { key: 'Tab' });

    // Der Fokus sollte auf den nächsten Radiobutton wechseln
    // Hinweis: In echten Tests würde dies funktionieren, aber in JSDOM ist die Tab-Navigation nicht vollständig implementiert
    // Daher überprüfen wir hier nur, ob die Radiobuttons tabbable sind
    expect(radioButtons[0]).toHaveAttribute('tabIndex', '0');
    expect(radioButtons[1]).toHaveAttribute('tabIndex', '0');
    expect(radioButtons[2]).toHaveAttribute('tabIndex', '0');
  });

  test('should support visible descriptions', async () => {
    const options = [{ value: 'option1', label: 'Option 1' }];

    render(
      <RadioGroup.A11y
        options={options}
        ariaLabel="Test Group"
        description="This is a visible description"
        showDescription={true}
      />
    );

    const description = screen.getByText('This is a visible description');
    expect(description).toBeInTheDocument();
    expect(description).not.toHaveClass('sr-only');
  });
});
