module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/../../../jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/../../../test-utils/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '**/__tests__/**/*.test.{ts,tsx}',
    '**/__tests__/**/*.spec.{ts,tsx}',
    '**/src/**/*.test.{ts,tsx}',
    '**/src/**/*.spec.{ts,tsx}'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'json-summary']
};
