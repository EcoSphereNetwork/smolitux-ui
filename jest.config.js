/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/packages'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // CSS-Module-Mocking
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // SVG und andere Assets
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    // Alias-Auflösung für '@smolitux/'
    '^@smolitux/(.*)$': '<rootDir>/packages/@smolitux/$1/src',
    // Mock für y18n
    '^y18n$': '<rootDir>/src/__mocks__/node_modules/y18n.js',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: [
    'packages/@smolitux/*/src/**/*.{ts,tsx}',
    '!packages/@smolitux/*/src/**/*.stories.{ts,tsx}',
    '!packages/@smolitux/*/src/**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}', '**/__tests__/**/*.spec.{ts,tsx}', '**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!y18n)/'
  ],
  reporters: [
    'default',
  ],
  snapshotSerializers: [],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
};

module.exports = config;
