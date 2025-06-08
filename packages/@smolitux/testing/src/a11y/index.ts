/**
 * Barrierefreiheits-Testutilities für Smolitux UI Komponenten
 *
 * Diese Utilities helfen bei der Implementierung von Barrierefreiheitstests
 * für Smolitux UI Komponenten.
 */

import { axe, toHaveNoViolations } from 'jest-axe';
import { render, RenderResult } from '@testing-library/react';
import React from 'react';

// Erweitere Jest mit axe-Matchers
expect.extend(toHaveNoViolations);

/**
 * Optionen für den Barrierefreiheitstest
 */
export interface A11yTestOptions {
  /**
   * Ob der Test fehlschlagen soll, wenn Barrierefreiheitsprobleme gefunden werden
   * @default true
   */
  failOnViolation?: boolean;

  /**
   * Regeln, die ignoriert werden sollen
   */
  disabledRules?: string[];

  /**
   * Zusätzliche axe-Konfiguration
   */
  axeOptions?: any;
}

/**
 * Ergebnis eines Barrierefreiheitstests
 */
export interface A11yTestResult {
  /** Gefundene Verstöße */
  violations: any[];
  /** Bestandene Prüfungen */
  passes: any[];
  /** Unvollständige Prüfungen */
  incomplete: any[];
  /** Ergebnis des Renderns */
  renderResult: RenderResult;
}

/**
 * Führt einen Barrierefreiheitstest für eine Komponente durch
 *
 * @param component Die zu testende React-Komponente
 * @param options Optionen für den Test
 * @returns Das Ergebnis des Tests
 *
 * @example
 * ```tsx
 * test('Button ist barrierefrei', async () => {
 *   const { violations } = await testA11y(<Button>Klick mich</Button>);
 *   expect(violations).toHaveLength(0);
 * });
 * ```
 */
export async function testA11y(
  component: React.ReactElement,
  options: A11yTestOptions = {}
): Promise<A11yTestResult> {
  const { failOnViolation = true, disabledRules = [], axeOptions = {} } = options;

  // Rendere die Komponente
  const renderResult = render(component);

  // Konfiguriere axe
  const axeConfig = {
    rules: disabledRules.reduce(
      (acc, rule) => {
        acc[rule] = { enabled: false };
        return acc;
      },
      {} as Record<string, { enabled: boolean }>
    ),
    ...axeOptions,
  };

  // Führe axe aus
  const results = await axe(renderResult.container, axeConfig);

  // Wenn failOnViolation aktiviert ist und Verstöße gefunden wurden, lasse den Test fehlschlagen
  if (failOnViolation && results.violations.length > 0) {
    expect(results).toHaveNoViolations();
  }

  return {
    violations: results.violations,
    passes: results.passes,
    incomplete: results.incomplete,
    renderResult,
  };
}

/**
 * Prüft, ob ein Element die korrekten ARIA-Attribute hat
 *
 * @param element Das zu prüfende Element
 * @param attributes Die erwarteten ARIA-Attribute
 * @returns true, wenn alle Attribute korrekt sind
 *
 * @example
 * ```tsx
 * test('Button hat korrekte ARIA-Attribute', () => {
 *   const { getByRole } = render(<Button isDisabled>Klick mich</Button>);
 *   const button = getByRole('button');
 *   expect(hasCorrectAriaAttributes(button, {
 *     'aria-disabled': 'true'
 *   })).toBe(true);
 * });
 * ```
 */
export function hasCorrectAriaAttributes(
  element: Element,
  attributes: Record<string, string>
): boolean {
  return Object.entries(attributes).every(([key, value]) => {
    return element.getAttribute(key) === value;
  });
}

/**
 * Prüft, ob ein Element die korrekte Rolle hat
 *
 * @param element Das zu prüfende Element
 * @param role Die erwartete Rolle
 * @returns true, wenn die Rolle korrekt ist
 *
 * @example
 * ```tsx
 * test('Button hat korrekte Rolle', () => {
 *   const { getByText } = render(<Button>Klick mich</Button>);
 *   const button = getByText('Klick mich');
 *   expect(hasCorrectRole(button, 'button')).toBe(true);
 * });
 * ```
 */
export function hasCorrectRole(element: Element, role: string): boolean {
  return element.getAttribute('role') === role;
}

/**
 * Prüft, ob ein Element fokussierbar ist
 *
 * @param element Das zu prüfende Element
 * @returns true, wenn das Element fokussierbar ist
 *
 * @example
 * ```tsx
 * test('Button ist fokussierbar', () => {
 *   const { getByRole } = render(<Button>Klick mich</Button>);
 *   const button = getByRole('button');
 *   expect(isFocusable(button)).toBe(true);
 * });
 * ```
 */
export function isFocusable(element: Element): boolean {
  const focusableElements = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable]',
  ];

  return focusableElements.some((selector) => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}

/**
 * Prüft, ob ein Element einen sichtbaren Fokusindikator hat
 *
 * @param element Das zu prüfende Element
 * @returns true, wenn das Element einen sichtbaren Fokusindikator hat
 *
 * @example
 * ```tsx
 * test('Button hat sichtbaren Fokusindikator', () => {
 *   const { getByRole } = render(<Button>Klick mich</Button>);
 *   const button = getByRole('button');
 *   button.focus();
 *   expect(hasVisibleFocusIndicator(button)).toBe(true);
 * });
 * ```
 */
export function hasVisibleFocusIndicator(element: Element): boolean {
  const computedStyle = window.getComputedStyle(element);

  // Prüfe auf outline
  const hasOutline = computedStyle.outline !== 'none' && computedStyle.outlineWidth !== '0px';

  // Prüfe auf box-shadow
  const hasBoxShadow = computedStyle.boxShadow !== 'none';

  // Prüfe auf border
  const hasBorder = computedStyle.borderWidth !== '0px';

  return hasOutline || hasBoxShadow || hasBorder;
}

/**
 * Prüft, ob ein Element einen ausreichenden Farbkontrast hat
 *
 * @param foregroundColor Die Vordergrundfarbe (Text)
 * @param backgroundColor Die Hintergrundfarbe
 * @param isLargeText Ob es sich um großen Text handelt (>= 18pt oder >= 14pt und fett)
 * @returns true, wenn der Kontrast ausreichend ist (WCAG AA)
 *
 * @example
 * ```tsx
 * test('Button hat ausreichenden Farbkontrast', () => {
 *   expect(hasAdequateColorContrast('#ffffff', '#2563eb', false)).toBe(true);
 * });
 * ```
 */
export function hasAdequateColorContrast(
  foregroundColor: string,
  backgroundColor: string,
  isLargeText: boolean = false
): boolean {
  // Konvertiere Hex zu RGB
  const hexToRgb = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  // Berechne relative Luminanz
  const calculateLuminance = (rgb: [number, number, number]): number => {
    const [r, g, b] = rgb.map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  // Berechne Kontrastverhältnis
  const foregroundRgb = hexToRgb(foregroundColor);
  const backgroundRgb = hexToRgb(backgroundColor);

  const foregroundLuminance = calculateLuminance(foregroundRgb);
  const backgroundLuminance = calculateLuminance(backgroundRgb);

  const contrastRatio =
    (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
    (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);

  // WCAG AA: 4.5:1 für normalen Text, 3:1 für großen Text
  return isLargeText ? contrastRatio >= 3 : contrastRatio >= 4.5;
}

export default {
  testA11y,
  hasCorrectAriaAttributes,
  hasCorrectRole,
  isFocusable,
  hasVisibleFocusIndicator,
  hasAdequateColorContrast,
};
