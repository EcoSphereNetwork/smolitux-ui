const base = require('../../../jest.config');

/** @type {import('jest').Config} */
module.exports = {
  ...base,
  rootDir: __dirname,
  moduleNameMapper: {
    ...base.moduleNameMapper,
    '^@smolitux/([^/]+)/?(.*)$': '<rootDir>/../../../packages/@smolitux/$1/src/$2',
    '^jest-matcher-utils$': '<rootDir>/../../../node_modules/jest-matcher-utils',
  },
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
  setupFilesAfterEnv: ['../../../jest.setup.js'],
};
