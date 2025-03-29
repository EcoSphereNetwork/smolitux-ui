import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Tooltip } from '../Tooltip';

// Erweitere Jest-Matcher um Barrierefreiheitsprüfungen
expect.extend(toHaveNoViolations);

// Mock für setTimeout und clearTimeout
jest.useFakeTimers();

describe('Tooltip Accessibility', () => {
  test('should not have accessibility violations in default state', async () => {
    const { container } = render(
      <Tooltip content="Hilfeinformation">
        <button>Hilfe</button>
      </Tooltip>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
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