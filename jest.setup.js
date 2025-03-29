// Jest setup file
require('@testing-library/jest-dom');

// Extend Jest matchers with jest-axe
const { toHaveNoViolations } = require('jest-axe');
expect.extend({ toHaveNoViolations });

// Globale Mock-Funktionen
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock für window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock für window.IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock für window.scrollTo
global.scrollTo = jest.fn();

// Unterdrücke Konsolenwarnungen während der Tests
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  // Ignoriere bestimmte Warnungen
  if (
    args[0] && 
    (args[0].includes('ReactDOM.render is no longer supported') || 
     args[0].includes('forwardRef render functions do not support propTypes'))
  ) {
    return;
  }
  originalConsoleWarn(...args);
};

// Unterdrücke Konsolenfehler während der Tests
const originalConsoleError = console.error;
console.error = (...args) => {
  // Ignoriere bestimmte Fehler
  if (
    args[0] && 
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: ReactDOM.render is no longer supported') || 
     args[0].includes('Warning: An update to') || 
     args[0].includes('Warning: Cannot update a component') ||
     args[0].includes('Warning: Each child in a list should have a unique') ||
     args[0].includes('Warning: validateDOMNesting'))
  ) {
    return;
  }
  originalConsoleError(...args);
};
