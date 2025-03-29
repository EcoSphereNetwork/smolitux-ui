module.exports = {
  __: jest.fn((key) => key),
  __n: jest.fn((singular, plural, count) => count === 1 ? singular : plural),
  setLocale: jest.fn(),
  getLocale: jest.fn(() => 'de'),
  updateLocale: jest.fn(),
  createY18n: jest.fn(() => module.exports),
  format: jest.fn((str, ...args) => str),
};