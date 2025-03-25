module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // CSS-Module-Mocking
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // SVG und andere Assets
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    // Alias-Auflösung für '@smolitux/'
    '^@smolitux/(.*)$': '<rootDir>/packages/@smolitux/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: [
    'packages/@smolitux/**/*.{ts,tsx}',
    '!packages/@smolitux/**/*.stories.{ts,tsx}',
    '!packages/@smolitux/**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
};