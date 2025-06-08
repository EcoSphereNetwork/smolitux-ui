// packages/@smolitux/core/src/components/Spinner/__tests__/Spinner.a11y.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SpinnerA11y } from '../Spinner.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('Spinner Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<SpinnerA11y ariaLabel="Daten werden geladen" />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <SpinnerA11y
        ariaLabel="Daten werden geladen"
        description="Bitte warten Sie, während die Daten geladen werden"
        id="test-spinner"
      />
    );

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('id', 'test-spinner');
    expect(spinner).toHaveAttribute('aria-label', 'Daten werden geladen');
    expect(spinner).toHaveAttribute('aria-busy', 'true');
    expect(spinner).toHaveAttribute('aria-live', 'polite');
    expect(spinner).toHaveAttribute('aria-atomic', 'true');
    expect(spinner).toHaveAttribute('aria-describedby');

    // Überprüfe die Beschreibung
    const description = screen.getByText('Bitte warten Sie, während die Daten geladen werden');
    expect(description).toHaveClass('sr-only');
    expect(spinner.getAttribute('aria-describedby')).toBe(description.id);
  });

  it('should handle different variants correctly', () => {
    const { rerender } = render(<SpinnerA11y variant="border" ariaLabel="Daten werden geladen" />);

    let spinnerElement = screen.getByRole('status').querySelector('.smolitux-spinner');
    expect(spinnerElement).toHaveClass('smolitux-spinner--border');

    rerender(<SpinnerA11y variant="dots" ariaLabel="Daten werden geladen" />);

    spinnerElement = screen.getByRole('status').querySelector('.smolitux-spinner');
    expect(spinnerElement).toHaveClass('smolitux-spinner--dots');
    expect(spinnerElement?.querySelectorAll('.smolitux-spinner-dot')).toHaveLength(3);
  });

  it('should handle different sizes correctly', () => {
    const { rerender } = render(<SpinnerA11y size="xs" ariaLabel="Daten werden geladen" />);

    let spinnerElement = screen.getByRole('status').querySelector('.smolitux-spinner');
    expect(spinnerElement).toHaveClass('smolitux-spinner--xs');

    rerender(<SpinnerA11y size="xl" ariaLabel="Daten werden geladen" />);

    spinnerElement = screen.getByRole('status').querySelector('.smolitux-spinner');
    expect(spinnerElement).toHaveClass('smolitux-spinner--xl');
  });

  it('should handle different colors correctly', () => {
    render(<SpinnerA11y color="success" ariaLabel="Daten werden geladen" />);

    const spinnerElement = screen.getByRole('status').querySelector('.smolitux-spinner');
    expect(spinnerElement).toHaveClass('smolitux-spinner--success');
  });

  it('should handle text correctly', () => {
    render(<SpinnerA11y text="Bitte warten..." ariaLabel="Daten werden geladen" />);

    const text = screen.getByText('Bitte warten...');
    expect(text).toHaveClass('smolitux-spinner-text');
  });

  it('should handle centered spinner correctly', () => {
    render(<SpinnerA11y centered ariaLabel="Daten werden geladen" />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('smolitux-spinner-container--centered');
  });

  it('should handle fullWidth spinner correctly', () => {
    render(<SpinnerA11y fullWidth ariaLabel="Daten werden geladen" />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('smolitux-spinner-container--full-width');
  });

  it('should handle custom animation speed correctly', () => {
    render(<SpinnerA11y speed={2} ariaLabel="Daten werden geladen" />);

    const spinnerElement = screen.getByRole('status').querySelector('.smolitux-spinner');
    expect(spinnerElement).toHaveStyle({ '--spinner-animation-duration': '2s' });
  });

  it('should handle different live region politeness correctly', () => {
    const { rerender } = render(
      <SpinnerA11y liveRegionPoliteness="assertive" ariaLabel="Daten werden geladen" />
    );

    let spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-live', 'assertive');

    rerender(<SpinnerA11y liveRegionPoliteness="off" ariaLabel="Daten werden geladen" />);

    spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-live', 'off');
  });

  it('should handle aria-relevant correctly', () => {
    render(<SpinnerA11y relevant="additions" ariaLabel="Daten werden geladen" />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-relevant', 'additions');
  });

  it('should handle non-busy state correctly', () => {
    render(<SpinnerA11y busy={false} ariaLabel="Daten werden geladen" />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-busy', 'false');
  });
});
