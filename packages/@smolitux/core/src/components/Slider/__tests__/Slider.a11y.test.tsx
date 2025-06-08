import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SliderA11y } from '../Slider.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('Slider Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <SliderA11y
        label="Lautstärke"
        min={0}
        max={100}
        defaultValue={50}
        ariaLabel="Lautstärkeregler"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <SliderA11y
        label="Lautstärke"
        min={0}
        max={100}
        defaultValue={50}
        ariaLabel="Lautstärkeregler"
        description="Stellen Sie die Lautstärke ein"
        id="test-slider"
      />
    );

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('id', 'test-slider');
    expect(slider).toHaveAttribute('aria-label', 'Lautstärkeregler');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
    expect(slider).toHaveAttribute('aria-valuetext', '50');
    expect(slider).toHaveAttribute('aria-orientation', 'horizontal');
    expect(slider).toHaveAttribute('aria-describedby', 'test-slider-description');

    // Überprüfe die Beschreibung
    const description = screen.getByText('Stellen Sie die Lautstärke ein');
    expect(description).toHaveClass('sr-only');
    expect(description.id).toBe('test-slider-description');
  });

  it('should handle custom aria-valuetext correctly', () => {
    render(
      <SliderA11y
        label="Lautstärke"
        min={0}
        max={100}
        defaultValue={50}
        ariaLabel="Lautstärkeregler"
        ariaValuetext={(value) => `${value}% Lautstärke`}
      />
    );

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuetext', '50% Lautstärke');
  });

  it('should handle error state correctly', () => {
    render(
      <SliderA11y
        label="Lautstärke"
        min={0}
        max={100}
        defaultValue={50}
        error="Bitte wählen Sie eine niedrigere Lautstärke"
        ariaLabel="Lautstärkeregler"
      />
    );

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-invalid', 'true');
    expect(slider).toHaveAttribute('aria-errormessage', 'slider-error');

    // Überprüfe die Fehlermeldung
    const error = screen.getByText('Bitte wählen Sie eine niedrigere Lautstärke');
    expect(error).toHaveAttribute('role', 'alert');
  });

  it('should handle helper text correctly', () => {
    render(
      <SliderA11y
        label="Lautstärke"
        min={0}
        max={100}
        defaultValue={50}
        helperText="Ziehen Sie den Schieberegler, um die Lautstärke einzustellen"
        ariaLabel="Lautstärkeregler"
      />
    );

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-describedby', 'slider-helper');

    // Überprüfe den Hilfetext
    const helperText = screen.getByText(
      'Ziehen Sie den Schieberegler, um die Lautstärke einzustellen'
    );
    expect(helperText.id).toBe('slider-helper');
  });

  it('should handle disabled state correctly', () => {
    render(
      <SliderA11y
        label="Lautstärke"
        min={0}
        max={100}
        defaultValue={50}
        disabled
        ariaLabel="Lautstärkeregler"
      />
    );

    const slider = screen.getByRole('slider');
    expect(slider).toBeDisabled();
  });

  it('should handle required state correctly', () => {
    render(
      <SliderA11y
        label="Lautstärke"
        min={0}
        max={100}
        defaultValue={50}
        required
        ariaLabel="Lautstärkeregler"
      />
    );

    const slider = screen.getByRole('slider');
    expect(slider).toBeRequired();

    // Überprüfe das Sternchen im Label
    const label = screen.getByText('Lautstärke');
    expect(label.nextSibling).toHaveTextContent('*');
    expect(label.nextSibling).toHaveAttribute('aria-hidden', 'true');
  });

  it('should handle keyboard navigation correctly', () => {
    const handleChange = jest.fn();

    render(
      <SliderA11y
        label="Lautstärke"
        min={0}
        max={100}
        defaultValue={50}
        onChange={handleChange}
        ariaLabel="Lautstärkeregler"
      />
    );

    const slider = screen.getByRole('slider');

    // Fokussiere den Slider
    slider.focus();
    expect(document.activeElement).toBe(slider);

    // Drücke die Pfeiltaste nach rechts
    fireEvent.keyDown(slider, { key: 'ArrowRight' });

    // Der onChange-Handler sollte aufgerufen worden sein
    expect(handleChange).toHaveBeenCalledWith(51);

    // Drücke die Pfeiltaste nach links
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });

    // Der onChange-Handler sollte erneut aufgerufen worden sein
    expect(handleChange).toHaveBeenCalledWith(50);

    // Drücke die Home-Taste
    fireEvent.keyDown(slider, { key: 'Home' });

    // Der onChange-Handler sollte mit dem Minimalwert aufgerufen worden sein
    expect(handleChange).toHaveBeenCalledWith(0);

    // Drücke die End-Taste
    fireEvent.keyDown(slider, { key: 'End' });

    // Der onChange-Handler sollte mit dem Maximalwert aufgerufen worden sein
    expect(handleChange).toHaveBeenCalledWith(100);
  });

  it('should handle custom keyboard steps correctly', () => {
    const handleChange = jest.fn();

    render(
      <SliderA11y
        label="Lautstärke"
        min={0}
        max={100}
        defaultValue={50}
        onChange={handleChange}
        keyboardStep={5}
        keyboardStepLarge={20}
        ariaLabel="Lautstärkeregler"
      />
    );

    const slider = screen.getByRole('slider');

    // Fokussiere den Slider
    slider.focus();

    // Drücke die Pfeiltaste nach rechts
    fireEvent.keyDown(slider, { key: 'ArrowRight' });

    // Der onChange-Handler sollte mit dem angepassten Schritt aufgerufen worden sein
    expect(handleChange).toHaveBeenCalledWith(55);

    // Drücke die PageUp-Taste
    fireEvent.keyDown(slider, { key: 'PageUp' });

    // Der onChange-Handler sollte mit dem großen Schritt aufgerufen worden sein
    expect(handleChange).toHaveBeenCalledWith(75);
  });

  it('should handle vertical orientation correctly', () => {
    render(
      <SliderA11y
        label="Lautstärke"
        min={0}
        max={100}
        defaultValue={50}
        orientation="vertical"
        ariaLabel="Lautstärkeregler"
      />
    );

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('should handle range slider correctly', () => {
    const handleChange = jest.fn();
    const handleChange2 = jest.fn();

    render(
      <SliderA11y
        label="Preisbereich"
        min={0}
        max={1000}
        defaultValue={200}
        defaultValue2={800}
        isRange
        onChange={handleChange}
        onChange2={handleChange2}
        ariaLabel="Preisfilter"
      />
    );

    // Es sollten zwei Slider-Elemente vorhanden sein
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(2);

    // Der erste Slider sollte den ersten Wert haben
    expect(sliders[0]).toHaveAttribute('aria-valuenow', '200');

    // Der zweite Slider sollte den zweiten Wert haben
    expect(sliders[1]).toHaveAttribute('aria-valuenow', '800');

    // Der zweite Slider sollte ein angepasstes Label haben
    expect(sliders[1]).toHaveAttribute('aria-label', 'Preisfilter (zweiter Wert)');
  });

  it('should handle value display correctly', () => {
    render(
      <SliderA11y
        label="Lautstärke"
        min={0}
        max={100}
        defaultValue={50}
        showValue
        valuePosition="below"
        ariaLabel="Lautstärkeregler"
      />
    );

    // Der Wert sollte angezeigt werden
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('should handle custom value format correctly', () => {
    render(
      <SliderA11y
        label="Lautstärke"
        min={0}
        max={100}
        defaultValue={50}
        showValue
        valueFormat={(value) => `${value}%`}
        ariaLabel="Lautstärkeregler"
      />
    );

    // Der formatierte Wert sollte angezeigt werden
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('should handle marks correctly', () => {
    render(
      <SliderA11y
        label="Lautstärke"
        min={0}
        max={100}
        defaultValue={50}
        showMarks
        marks={[
          { value: 0, label: 'Min' },
          { value: 50, label: 'Mid' },
          { value: 100, label: 'Max' },
        ]}
        ariaLabel="Lautstärkeregler"
      />
    );

    // Die Markierungslabels sollten angezeigt werden
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Mid')).toBeInTheDocument();
    expect(screen.getByText('Max')).toBeInTheDocument();
  });

  it('should handle inverted slider correctly', () => {
    render(
      <SliderA11y
        label="Lautstärke"
        min={0}
        max={100}
        defaultValue={50}
        inverted
        ariaLabel="Lautstärkeregler"
      />
    );

    // Der Slider sollte invertiert sein, aber das ändert nichts an den ARIA-Attributen
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
  });

  it('should handle auto focus correctly', () => {
    render(
      <SliderA11y
        label="Lautstärke"
        min={0}
        max={100}
        defaultValue={50}
        autoFocus
        ariaLabel="Lautstärkeregler"
      />
    );

    const slider = screen.getByRole('slider');
    expect(document.activeElement).toBe(slider);
  });

  it('should handle live region correctly', () => {
    render(
      <SliderA11y
        label="Lautstärke"
        min={0}
        max={100}
        defaultValue={50}
        liveRegionPoliteness="assertive"
        ariaLabel="Lautstärkeregler"
      />
    );

    // Es sollte eine Live-Region geben
    const liveRegion = screen
      .getByRole('slider')
      .parentElement?.querySelector('[aria-live="assertive"]');
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion).toHaveClass('sr-only');
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
  });

  it('should handle busy state correctly', () => {
    render(
      <SliderA11y
        label="Lautstärke"
        min={0}
        max={100}
        defaultValue={50}
        busy
        ariaLabel="Lautstärkeregler"
      />
    );

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-busy', 'true');
  });
});
