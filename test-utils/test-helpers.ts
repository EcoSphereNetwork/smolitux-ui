import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Hilfsfunktionen für Tests

/**
 * Hilfsfunktion zum Testen von Klick-Events
 */
export const testClickEvent = async (
  elementSelector: string | RegExp,
  mockFn: jest.Mock
) => {
  const element = screen.getByText(elementSelector);
  await userEvent.click(element);
  expect(mockFn).toHaveBeenCalledTimes(1);
};

/**
 * Hilfsfunktion zum Testen von Input-Änderungen
 */
export const testInputChange = async (
  inputElement: HTMLElement,
  value: string,
  mockFn: jest.Mock
) => {
  await userEvent.type(inputElement, value);
  expect(mockFn).toHaveBeenCalled();
};

/**
 * Hilfsfunktion zum Testen von Hover-Zuständen
 */
export const testHoverState = (
  element: HTMLElement,
  hoverClass: string
) => {
  fireEvent.mouseEnter(element);
  expect(element).toHaveClass(hoverClass);
  
  fireEvent.mouseLeave(element);
  expect(element).not.toHaveClass(hoverClass);
};

/**
 * Hilfsfunktion zum Testen von Fokus-Zuständen
 */
export const testFocusState = (
  element: HTMLElement,
  focusClass: string
) => {
  fireEvent.focus(element);
  expect(element).toHaveClass(focusClass);
  
  fireEvent.blur(element);
  expect(element).not.toHaveClass(focusClass);
};