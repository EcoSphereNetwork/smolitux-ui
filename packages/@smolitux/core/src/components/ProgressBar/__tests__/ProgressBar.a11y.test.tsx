// packages/@smolitux/core/src/components/ProgressBar/__tests__/ProgressBar.a11y.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ProgressBar } from '../';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('ProgressBar Accessibility', () => {
  // Test für zusätzliche A11y-Funktionen
  it('should support custom announcements', async () => {
    render(
      <ProgressBar.A11y
        value={75}
        ariaLabel="Ladefortschritt"
        announceProgress={true}
        announceFormat="Fortschritt: {value} von {max}"
      />
    );

    const liveRegion = screen.getByText('Fortschritt: 75 von 100');
    expect(liveRegion).toHaveClass('sr-only');
    expect(liveRegion).toHaveAttribute('aria-live', 'polite');
  });

  it('should support custom ARIA roles and properties', async () => {
    render(
      <ProgressBar.A11y
        value={75}
        ariaLabel="Ladefortschritt"
        ariaValuetext="75 von 100 Punkten"
        role="meter"
      />
    );

    const progressbar = screen.getByRole('meter');
    expect(progressbar).toHaveAttribute('aria-valuetext', '75 von 100 Punkten');
  });
  // Test für die Standard-ProgressBar-Komponente
  it('should have no accessibility violations with standard ProgressBar', async () => {
    const { container } = render(<ProgressBar value={50} aria-label="Ladefortschritt" />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test für die A11y-Version der ProgressBar-Komponente
  it('should have no accessibility violations with A11y ProgressBar', async () => {
    const { container } = render(<ProgressBar.A11y value={50} ariaLabel="Ladefortschritt" />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <ProgressBar.A11y
        value={75}
        min={0}
        max={100}
        ariaLabel="Ladefortschritt"
        description="Datei wird hochgeladen"
        id="test-progress"
      />
    );

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('id', 'test-progress');
    expect(progressbar).toHaveAttribute('aria-valuenow', '75');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    expect(progressbar).toHaveAttribute('aria-valuetext', '75%');
    expect(progressbar).toHaveAttribute('aria-label', 'Ladefortschritt');
    expect(progressbar).toHaveAttribute('aria-describedby');

    // Überprüfe die Beschreibung
    const description = screen.getByText('Datei wird hochgeladen');
    expect(description).toHaveClass('sr-only');
    expect(progressbar.getAttribute('aria-describedby')).toContain(description.id);

    // Überprüfe den Textwert
    const valueText = screen.getByText('75%');
    expect(valueText).toHaveClass('sr-only');
    expect(valueText).toHaveAttribute('aria-live', 'polite');
    expect(valueText).toHaveAttribute('aria-atomic', 'true');
    expect(progressbar.getAttribute('aria-describedby')).toContain(valueText.id);
  });

  it('should handle indeterminate state correctly', () => {
    render(<ProgressBar.A11y value={0} indeterminate ariaLabel="Ladefortschritt" />);

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).not.toHaveAttribute('aria-valuenow');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');

    // Überprüfe, ob die Fortschrittsleiste die richtige Klasse hat
    const progressFill = screen.getByTestId('progress-fill');
    expect(progressFill).toHaveClass('animate-progress-indeterminate');
  });

  it('should handle label correctly', () => {
    render(<ProgressBar.A11y value={75} showLabel ariaLabel="Ladefortschritt" />);

    const progressbar = screen.getByRole('progressbar');
    // Get the visible label (not the screen reader one)
    const labelContainer = screen.getByRole('progressbar').getAttribute('aria-labelledby');
    expect(labelContainer).toBeTruthy();
    
    const labelElement = document.getElementById(labelContainer!);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent('75%');
  });

  it('should handle custom label format correctly', () => {
    render(
      <ProgressBar.A11y
        value={75}
        max={200}
        showLabel
        labelFormat="valueAndMax"
        ariaLabel="Ladefortschritt"
      />
    );

    const label = screen.getByText('75 / 200');
    expect(label).toBeInTheDocument();
  });

  it('should handle custom text value format correctly', () => {
    render(
      <ProgressBar.A11y
        value={75}
        textValueFormat="Fortschritt: {value} Prozent"
        ariaLabel="Ladefortschritt"
      />
    );

    const valueText = screen.getByText('Fortschritt: 75 Prozent');
    expect(valueText).toHaveClass('sr-only');
  });

  it('should handle live updates correctly', () => {
    render(<ProgressBar.A11y value={75} liveUpdate={false} ariaLabel="Ladefortschritt" />);

    const valueText = screen.getByText('75%');
    expect(valueText).toHaveAttribute('aria-live', 'off');
  });

  it('should handle different sizes correctly', () => {
    const { rerender } = render(
      <ProgressBar.A11y value={75} size="xs" ariaLabel="Ladefortschritt" />
    );

    let progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveClass('h-1');

    rerender(<ProgressBar.A11y value={75} size="lg" ariaLabel="Ladefortschritt" />);

    progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveClass('h-6');
  });

  it('should handle different colors correctly', () => {
    render(<ProgressBar.A11y value={75} color="success" ariaLabel="Ladefortschritt" />);

    const progressFill = screen.getByTestId('progress-fill');
    expect(progressFill).toHaveClass('bg-green-500');
  });

  it('should handle different variants correctly', () => {
    render(<ProgressBar.A11y value={75} variant="striped" ariaLabel="Ladefortschritt" />);

    const progressFill = screen.getByTestId('progress-fill');
    expect(progressFill).toHaveClass('bg-stripes');
  });

  it('should handle inverted progress correctly', () => {
    render(<ProgressBar.A11y value={75} inverted ariaLabel="Ladefortschritt" />);

    const progressFill = screen.getByTestId('progress-fill');
    expect(progressFill).toHaveStyle({ marginLeft: 'auto' });
  });
});
