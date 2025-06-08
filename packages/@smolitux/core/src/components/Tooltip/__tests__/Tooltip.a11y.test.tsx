import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Tooltip } from '../';

// Erweitere Jest-Matcher um Barrierefreiheitsprüfungen
expect.extend(toHaveNoViolations);

// Mock für setTimeout und clearTimeout
jest.useFakeTimers();

describe('Tooltip Accessibility', () => {
  // Test für die Standard-Tooltip-Komponente
  test('should not have accessibility violations with standard Tooltip', async () => {
    const { container } = render(
      <Tooltip content="Hilfeinformation">
        <button>Hilfe</button>
      </Tooltip>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test für die A11y-Version der Tooltip-Komponente
  test('should not have accessibility violations with A11y Tooltip', async () => {
    const { container } = render(
      <Tooltip.A11y content="Hilfeinformation" ariaLabel="Hilfeinformation">
        <button>Hilfe</button>
      </Tooltip.A11y>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have proper ARIA attributes in A11y Tooltip', () => {
    const { container } = render(
      <Tooltip.A11y
        content="Hilfeinformation"
        ariaLabel="Hilfeinformation"
        id="help-tooltip"
        role="tooltip"
        liveRegion={true}
        announcePoliteness="polite"
        atomic={true}
      >
        <button>Hilfe</button>
      </Tooltip.A11y>
    );

    // Tooltip anzeigen
    fireEvent.mouseEnter(container.querySelector('button')!);

    // Timer voranschreiten lassen
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Button sollte mit Tooltip verknüpft sein
    expect(container.querySelector('button')).toHaveAttribute('aria-describedby', 'help-tooltip');

    // Tooltip sollte korrekte Attribute haben
    const tooltip = container.querySelector('[role="tooltip"]');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveAttribute('id', 'help-tooltip');
    expect(tooltip).toHaveAttribute('aria-label', 'Hilfeinformation');
    expect(tooltip).toHaveAttribute('aria-live', 'polite');
    expect(tooltip).toHaveAttribute('aria-atomic', 'true');

    // Screenreader-Ankündigung sollte vorhanden sein
    const announcement = container.querySelector('.sr-only');
    expect(announcement).toBeInTheDocument();
    expect(announcement).toHaveAttribute('aria-live', 'polite');
    expect(announcement).toHaveAttribute('aria-atomic', 'true');
  });

  test('should not have accessibility violations when tooltip is visible', async () => {
    const { container } = render(
      <Tooltip content="Hilfeinformation" delay={0}>
        <button>Hilfe</button>
      </Tooltip>
    );

    // Tooltip anzeigen
    fireEvent.mouseEnter(container.querySelector('button')!);

    // Timer voranschreiten lassen
    act(() => {
      jest.advanceTimersByTime(10);
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have proper ARIA attributes for screen readers', async () => {
    const { container } = render(
      <Tooltip content="Hilfeinformation" id="help-tooltip" delay={0}>
        <button>Hilfe</button>
      </Tooltip>
    );

    // Tooltip anzeigen
    fireEvent.mouseEnter(container.querySelector('button')!);

    // Timer voranschreiten lassen
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Button sollte mit Tooltip verknüpft sein
    expect(container.querySelector('button')).toHaveAttribute('aria-describedby', 'help-tooltip');

    // Tooltip sollte korrekte Rolle haben
    const tooltip = container.querySelector('[role="tooltip"]');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveAttribute('id', 'help-tooltip');
  });

  test('should be keyboard accessible with A11y Tooltip', () => {
    const { container } = render(
      <Tooltip.A11y
        content="Hilfeinformation"
        delay={0}
        showOnFocus={true}
        hideOnBlur={true}
        focusable={true}
      >
        <button>Hilfe</button>
      </Tooltip.A11y>
    );

    // Fokus auf den Button setzen
    fireEvent.focus(container.querySelector('button')!);

    // Timer voranschreiten lassen
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Tooltip sollte sichtbar sein
    expect(container.querySelector('[role="tooltip"]')).toBeVisible();

    // Fokus entfernen
    fireEvent.blur(container.querySelector('button')!);

    // Timer voranschreiten lassen
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Tooltip sollte nicht mehr sichtbar sein
    expect(container.querySelector('[role="tooltip"]')).not.toBeVisible();
  });

  test('should be keyboard accessible', async () => {
    const { container } = render(
      <Tooltip content="Hilfeinformation" delay={0}>
        <button>Hilfe</button>
      </Tooltip>
    );

    // Fokus auf den Button setzen
    fireEvent.focus(container.querySelector('button')!);

    // Timer voranschreiten lassen
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Tooltip sollte sichtbar sein
    expect(container.querySelector('[role="tooltip"]')).toBeVisible();

    // Fokus entfernen
    fireEvent.blur(container.querySelector('button')!);

    // Timer voranschreiten lassen
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Tooltip sollte nicht mehr sichtbar sein
    expect(container.querySelector('[role="tooltip"]')).not.toBeVisible();
  });

  test('should close on Escape key with A11y Tooltip', () => {
    const { container } = render(
      <Tooltip.A11y content="Hilfeinformation" delay={0} dismissibleByEscape={true}>
        <button>Hilfe</button>
      </Tooltip.A11y>
    );

    // Tooltip anzeigen
    fireEvent.mouseEnter(container.querySelector('button')!);

    // Timer voranschreiten lassen
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Tooltip sollte sichtbar sein
    expect(container.querySelector('[role="tooltip"]')).toBeVisible();

    // Escape-Taste drücken
    fireEvent.keyDown(document, { key: 'Escape' });

    // Timer voranschreiten lassen
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Tooltip sollte nicht mehr sichtbar sein
    expect(container.querySelector('[role="tooltip"]')).not.toBeVisible();
  });

  test('should handle interactive mode correctly', () => {
    const { container } = render(
      <Tooltip.A11y
        content="Hilfeinformation"
        delay={0}
        interactive={true}
        hasCloseButton={true}
        closeButtonLabel="Schließen"
      >
        <button>Hilfe</button>
      </Tooltip.A11y>
    );

    // Tooltip anzeigen
    fireEvent.mouseEnter(container.querySelector('button')!);

    // Timer voranschreiten lassen
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Tooltip sollte sichtbar sein
    const tooltip = container.querySelector('[role="tooltip"]');
    expect(tooltip).toBeVisible();

    // Tooltip sollte interaktiv sein
    expect(tooltip).toHaveStyle({ pointerEvents: 'auto' });

    // Schließen-Button sollte vorhanden sein
    const closeButton = container.querySelector('.tooltip-close-button');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('aria-label', 'Schließen');

    // Auf den Schließen-Button klicken
    fireEvent.click(closeButton!);

    // Timer voranschreiten lassen
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Tooltip sollte nicht mehr sichtbar sein
    expect(container.querySelector('[role="tooltip"]')).not.toBeVisible();
  });

  test('should handle different announcement politeness levels', () => {
    const { container, rerender } = render(
      <Tooltip.A11y
        content="Wichtige Information"
        delay={0}
        announce={true}
        announcePoliteness="assertive"
      >
        <button>Wichtig</button>
      </Tooltip.A11y>
    );

    // Tooltip anzeigen
    fireEvent.mouseEnter(container.querySelector('button')!);

    // Timer voranschreiten lassen
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Screenreader-Ankündigung sollte assertive sein
    const announcement = container.querySelector('.sr-only');
    expect(announcement).toHaveAttribute('aria-live', 'assertive');

    // Mit polite testen
    rerender(
      <Tooltip.A11y
        content="Normale Information"
        delay={0}
        announce={true}
        announcePoliteness="polite"
      >
        <button>Normal</button>
      </Tooltip.A11y>
    );

    // Tooltip anzeigen
    fireEvent.mouseEnter(container.querySelector('button')!);

    // Timer voranschreiten lassen
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Screenreader-Ankündigung sollte polite sein
    const politeAnnouncement = container.querySelector('.sr-only');
    expect(politeAnnouncement).toHaveAttribute('aria-live', 'polite');
  });

  test('should close on Escape key when closeOnEsc is true', async () => {
    const { container } = render(
      <Tooltip content="Hilfeinformation" delay={0} closeOnEsc>
        <button>Hilfe</button>
      </Tooltip>
    );

    // Tooltip anzeigen
    fireEvent.mouseEnter(container.querySelector('button')!);

    // Timer voranschreiten lassen
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Tooltip sollte sichtbar sein
    expect(container.querySelector('[role="tooltip"]')).toBeVisible();

    // Escape-Taste drücken
    fireEvent.keyDown(document, { key: 'Escape' });

    // Timer voranschreiten lassen
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Tooltip sollte nicht mehr sichtbar sein
    expect(container.querySelector('[role="tooltip"]')).not.toBeVisible();
  });
});
