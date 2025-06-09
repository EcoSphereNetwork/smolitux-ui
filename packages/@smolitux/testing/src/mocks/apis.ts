export const mockFetch = jest.fn(() => Promise.resolve({ json: () => ({}) }));

export const mockStorage = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
