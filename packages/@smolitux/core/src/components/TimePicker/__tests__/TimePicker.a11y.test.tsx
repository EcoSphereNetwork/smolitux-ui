import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { TimePickerA11y } from '../TimePicker.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('TimePicker Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TimePickerA11y 
        label="Uhrzeit"
        ariaLabel="Uhrzeit auswählen"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <TimePickerA11y 
        label="Uhrzeit"
        ariaLabel="Uhrzeit auswählen"
        description="Wählen Sie eine Uhrzeit aus"
        helperText="Format: HH:MM"
      />
    );
    
    const input = screen.getByLabelText('Uhrzeit');
    expect(input).toHaveAttribute('aria-label', 'Uhrzeit auswählen');
    expect(input).toHaveAttribute('aria-describedby');
    
    // Überprüfe die Beschreibung
    const description = screen.getByText('Wählen Sie eine Uhrzeit aus');
    expect(description).toHaveClass('sr-only');
    
    // Überprüfe den Hilfetext
    const helperText = screen.getByText('Format: HH:MM');
    expect(helperText).toBeInTheDocument();
  });

  it('should handle error state correctly', () => {
    render(
      <TimePickerA11y 
        label="Uhrzeit"
        error="Ungültige Uhrzeit"
      />
    );
    
    const input = screen.getByLabelText('Uhrzeit');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
    
    const error = screen.getByText('Ungültige Uhrzeit');
    expect(error).toHaveAttribute('role', 'alert');
  });

  it('should handle required state correctly', () => {
    render(
      <TimePickerA11y 
        label="Uhrzeit"
        required
      />
    );
    
    const input = screen.getByLabelText('Uhrzeit');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toBeRequired();
    
    // Überprüfe das Label
    const requiredText = screen.getByText('(Erforderlich)');
    expect(requiredText).toHaveClass('sr-only');
  });

  it('should handle disabled state correctly', () => {
    render(
      <TimePickerA11y 
        label="Uhrzeit"
        disabled
      />
    );
    
    const input = screen.getByLabelText('Uhrzeit');
    expect(input).toBeDisabled();
  });

  it('should handle readonly state correctly', () => {
    render(
      <TimePickerA11y 
        label="Uhrzeit"
        readOnly
      />
    );
    
    const input = screen.getByLabelText('Uhrzeit');
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveAttribute('aria-readonly', 'true');
  });

  it('should open popup on click', async () => {
    render(
      <TimePickerA11y 
        label="Uhrzeit"
      />
    );
    
    const input = screen.getByLabelText('Uhrzeit');
    fireEvent.click(input);
    
    // Überprüfe, ob das Popup geöffnet wurde
    await waitFor(() => {
      const popup = screen.getByRole('dialog');
      expect(popup).toBeInTheDocument();
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('should open popup on Enter key', async () => {
    render(
      <TimePickerA11y 
        label="Uhrzeit"
      />
    );
    
    const input = screen.getByLabelText('Uhrzeit');
    fireEvent.keyDown(input, { key: 'Enter' });
    
    // Überprüfe, ob das Popup geöffnet wurde
    await waitFor(() => {
      const popup = screen.getByRole('dialog');
      expect(popup).toBeInTheDocument();
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('should close popup on Escape key', async () => {
    render(
      <TimePickerA11y 
        label="Uhrzeit"
      />
    );
    
    const input = screen.getByLabelText('Uhrzeit');
    fireEvent.click(input);
    
    // Überprüfe, ob das Popup geöffnet wurde
    await waitFor(() => {
      const popup = screen.getByRole('dialog');
      expect(popup).toBeInTheDocument();
    });
    
    // Drücke Escape
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    
    // Überprüfe, ob das Popup geschlossen wurde
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('should handle keyboard navigation in popup', async () => {
    render(
      <TimePickerA11y 
        label="Uhrzeit"
      />
    );
    
    const input = screen.getByLabelText('Uhrzeit');
    fireEvent.click(input);
    
    // Überprüfe, ob das Popup geöffnet wurde
    await waitFor(() => {
      const popup = screen.getByRole('dialog');
      expect(popup).toBeInTheDocument();
    });
    
    // Finde die Stunden-Liste
    const hoursList = screen.getAllByRole('listbox')[0];
    fireEvent.focus(hoursList);
    
    // Drücke die Pfeiltaste nach unten
    fireEvent.keyDown(hoursList, { key: 'ArrowDown' });
    
    // Drücke Tab, um zur Minuten-Liste zu wechseln
    fireEvent.keyDown(hoursList, { key: 'Tab' });
    
    // Finde die Minuten-Liste
    const minutesList = screen.getAllByRole('listbox')[1];
    expect(document.activeElement).toBe(minutesList);
    
    // Drücke die Pfeiltaste nach oben
    fireEvent.keyDown(minutesList, { key: 'ArrowUp' });
    
    // Drücke Enter, um das Popup zu schließen
    fireEvent.keyDown(minutesList, { key: 'Enter' });
    
    // Überprüfe, ob das Popup geschlossen wurde
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('should handle 12h format correctly', () => {
    render(
      <TimePickerA11y 
        label="Uhrzeit"
        format="12h"
      />
    );
    
    const input = screen.getByLabelText('Uhrzeit');
    fireEvent.click(input);
    
    // Überprüfe, ob das Popup geöffnet wurde und die Periode-Liste angezeigt wird
    const periodList = screen.getAllByRole('listbox')[3]; // Stunden, Minuten, Sekunden, Periode
    expect(periodList).toBeInTheDocument();
    
    // Überprüfe, ob AM und PM angezeigt werden
    const amOption = screen.getByText('AM');
    const pmOption = screen.getByText('PM');
    expect(amOption).toBeInTheDocument();
    expect(pmOption).toBeInTheDocument();
  });

  it('should handle 24h format correctly', () => {
    render(
      <TimePickerA11y 
        label="Uhrzeit"
        format="24h"
      />
    );
    
    const input = screen.getByLabelText('Uhrzeit');
    fireEvent.click(input);
    
    // Überprüfe, ob das Popup geöffnet wurde und keine Periode-Liste angezeigt wird
    const listboxes = screen.getAllByRole('listbox');
    expect(listboxes.length).toBe(3); // Stunden, Minuten, Sekunden
    
    // Überprüfe, ob die Stunden von 0-23 angezeigt werden
    const hoursOptions = screen.getAllByRole('option').slice(0, 24);
    expect(hoursOptions.length).toBe(24);
    expect(hoursOptions[0]).toHaveTextContent('00');
    expect(hoursOptions[23]).toHaveTextContent('23');
  });

  it('should handle hideSeconds correctly', () => {
    render(
      <TimePickerA11y 
        label="Uhrzeit"
        hideSeconds
      />
    );
    
    const input = screen.getByLabelText('Uhrzeit');
    fireEvent.click(input);
    
    // Überprüfe, ob das Popup geöffnet wurde und keine Sekunden-Liste angezeigt wird
    const listboxes = screen.getAllByRole('listbox');
    expect(listboxes.length).toBe(2); // Stunden, Minuten
    
    // Überprüfe, ob keine Sekunden-Überschrift angezeigt wird
    expect(screen.queryByText('Sekunden')).not.toBeInTheDocument();
  });

  it('should handle minuteStep correctly', () => {
    render(
      <TimePickerA11y 
        label="Uhrzeit"
        minuteStep={15}
      />
    );
    
    const input = screen.getByLabelText('Uhrzeit');
    fireEvent.click(input);
    
    // Überprüfe, ob das Popup geöffnet wurde
    const minutesList = screen.getAllByRole('listbox')[1];
    
    // Überprüfe, ob die Minuten in 15er-Schritten angezeigt werden
    const minutesOptions = screen.getAllByRole('option').filter(option => 
      option.textContent === '00' || 
      option.textContent === '15' || 
      option.textContent === '30' || 
      option.textContent === '45'
    );
    
    expect(minutesOptions.length).toBe(4);
  });

  it('should handle live region correctly', () => {
    render(
      <TimePickerA11y 
        label="Uhrzeit"
        liveRegion
      />
    );
    
    const liveRegion = screen.getByLabelText('Uhrzeit').parentElement?.parentElement?.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion).toHaveClass('sr-only');
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
  });

  it('should handle screenreader instructions correctly', () => {
    render(
      <TimePickerA11y 
        label="Uhrzeit"
      />
    );
    
    const instructions = screen.getByText('Drücken Sie Enter oder die Leertaste, um den Zeitauswahldialog zu öffnen. Verwenden Sie die Pfeiltasten, um die Zeit zu ändern.');
    expect(instructions).toHaveClass('sr-only');
    
    const input = screen.getByLabelText('Uhrzeit');
    expect(input).toHaveAttribute('aria-describedby');
    expect(input.getAttribute('aria-describedby')).toContain('instructions');
  });
});