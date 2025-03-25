// jest.setup.js
import '@testing-library/jest-dom';

// Globale Mocks für Browser-APIs
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Unterdrücken von Konsolenwarnungen während der Tests
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args) => {
  // Ignoriere bestimmte Warnungen, die in Tests erwartet werden
  if (
    args[0]?.includes?.('Warning: ReactDOM.render is no longer supported') ||
    args[0]?.includes?.('Warning: useLayoutEffect does nothing on the server')
  ) {
    return;
  }
  originalConsoleError(...args);
};

console.warn = (...args) => {
  // Ignoriere bestimmte Warnungen, die in Tests erwartet werden
  if (
    args[0]?.includes?.('Warning: React does not recognize the') ||
    args[0]?.includes?.('Warning: The tag <')
  ) {
    return;
  }
  originalConsoleWarn(...args);
};

// Cleanup nach jedem Test
afterEach(() => {
  jest.clearAllMocks();
});