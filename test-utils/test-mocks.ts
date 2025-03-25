/**
 * Gemeinsame Mocks für Tests
 */

// Mock für Theme-Provider
export const mockTheme = {
  themeMode: 'light',
  toggleTheme: jest.fn(),
  setThemeMode: jest.fn(),
};

// Mock für Icons
export const mockIcons = {
  leftIcon: <span data-testid="left-icon">←</span>,
  rightIcon: <span data-testid="right-icon">→</span>,
  closeIcon: <span data-testid="close-icon">×</span>,
  searchIcon: <span data-testid="search-icon">🔍</span>,
};

// Mock für Event-Handler
export const mockEventHandlers = {
  onClick: jest.fn(),
  onChange: jest.fn(),
  onFocus: jest.fn(),
  onBlur: jest.fn(),
  onSubmit: jest.fn(),
  onKeyDown: jest.fn(),
  onKeyUp: jest.fn(),
  onMouseEnter: jest.fn(),
  onMouseLeave: jest.fn(),
};

// Mock für Fetch-API
export const mockFetch = (data: any, ok = true) => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(data),
    })
  ) as jest.Mock;
};

// Mock für LocalStorage
export const mockLocalStorage = () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value.toString();
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        store = {};
      }),
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });

  return localStorageMock;
};