const path = require('path');
const base = require('../../../jest.config');
module.exports = {
  ...base,
  rootDir: path.resolve(__dirname, '../../..'),
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  roots: ['<rootDir>/packages/@smolitux/core'],
  testMatch: [
    '<rootDir>/packages/@smolitux/core/src/components/Dropdown/**/__tests__/*.{test,spec}.tsx'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
