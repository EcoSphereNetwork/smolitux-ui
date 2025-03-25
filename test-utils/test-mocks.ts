// Gemeinsame Mocks für Tests

/**
 * Mock für den Theme-Context
 */
export const mockThemeContext = {
  themeMode: 'light',
  setThemeMode: jest.fn(),
  toggleTheme: jest.fn(),
};

/**
 * Mock für Fetch-Anfragen
 */
export const mockFetch = (data: any) => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data),
    })
  ) as jest.Mock;
};

/**
 * Mock für fehlgeschlagene Fetch-Anfragen
 */
export const mockFetchError = (errorMessage: string) => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.reject(new Error(errorMessage))
  ) as jest.Mock;
};

/**
 * Mock für Intersection Observer
 */
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  });
  window.IntersectionObserver = mockIntersectionObserver;
};