import { screen } from '@testing-library/react';

/**
 * Hilfsfunktion zum Warten auf das Verschwinden eines Elements
 * @param testId Die Test-ID des Elements
 * @param timeout Timeout in Millisekunden
 */
export const waitForElementToDisappear = async (
  testId: string,
  timeout = 5000
): Promise<void> => {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    try {
      const element = screen.queryByTestId(testId);
      if (!element) {
        return;
      }
      // Kurze Pause, um CPU-Last zu reduzieren
      await new Promise(resolve => setTimeout(resolve, 50));
    } catch (error) {
      return;
    }
  }
  throw new Error(`Element mit testId "${testId}" ist nicht verschwunden innerhalb von ${timeout}ms`);
};

/**
 * Hilfsfunktion zum Testen von Klassen-Anwendung
 * @param element Das DOM-Element
 * @param classNames Array von Klassennamen
 * @returns Boolean, ob alle Klassen angewendet wurden
 */
export const hasClasses = (element: HTMLElement, classNames: string[]): boolean => {
  return classNames.every(className => element.classList.contains(className));
};

/**
 * Hilfsfunktion zum Testen von ARIA-Attributen
 * @param element Das DOM-Element
 * @param attributes Objekt mit ARIA-Attributen und erwarteten Werten
 * @returns Boolean, ob alle ARIA-Attribute korrekt gesetzt sind
 */
export const hasAriaAttributes = (
  element: HTMLElement,
  attributes: Record<string, string>
): boolean => {
  return Object.entries(attributes).every(
    ([key, value]) => element.getAttribute(`aria-${key}`) === value
  );
};