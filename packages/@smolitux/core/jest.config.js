const path = require('path');
const base = require('../../../jest.config');
module.exports = {
  ...base,
  rootDir: path.resolve(__dirname, '../../..'),
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  roots: ['<rootDir>/packages/@smolitux/core'],
  testMatch: [
    '<rootDir>/packages/@smolitux/core/src/components/Dropdown/**/__tests__/*.{test,spec}.tsx',
    '<rootDir>/packages/@smolitux/core/src/components/FileUpload/**/__tests__/*.{test,spec}.tsx',
    '<rootDir>/packages/@smolitux/core/src/components/FormField/**/__tests__/*.{test,spec}.tsx',
    '<rootDir>/packages/@smolitux/core/src/components/FormGroup/**/__tests__/*.{test,spec}.tsx',
    '<rootDir>/packages/@smolitux/core/src/components/Icon/**/__tests__/*.{test,spec}.tsx',
    '<rootDir>/packages/@smolitux/core/src/components/Input/**/__tests__/*.{test,spec}.tsx',
    '<rootDir>/packages/@smolitux/core/src/components/Label/**/__tests__/*.{test,spec}.tsx',
    '<rootDir>/packages/@smolitux/core/src/components/Listbox/**/__tests__/*.{test,spec}.tsx',
    '<rootDir>/packages/@smolitux/core/src/components/Loader/**/*.{test,spec}.tsx',
    '<rootDir>/packages/@smolitux/core/src/components/Modal/**/__tests__/*.{test,spec}.tsx',
    '<rootDir>/packages/@smolitux/core/src/components/Pagination/**/__tests__/*.{test,spec}.tsx',
    '<rootDir>/packages/@smolitux/core/src/components/Popover/**/__tests__/*.{test,spec}.tsx',
    '<rootDir>/packages/@smolitux/core/src/components/ProgressBar/**/__tests__/*.{test,spec}.tsx',
    '<rootDir>/packages/@smolitux/core/src/components/Radio/**/__tests__/*.{test,spec}.tsx',
    '<rootDir>/packages/@smolitux/core/src/components/Select/**/__tests__/*.{test,spec}.tsx',
    '<rootDir>/packages/@smolitux/core/src/components/Slider/**/__tests__/*.{test,spec}.tsx',
    '<rootDir>/packages/@smolitux/core/src/components/Stepper/**/__tests__/*.{test,spec}.tsx'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
