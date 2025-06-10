const path = require('path');
const base = require('../../../jest.config');

module.exports = {
  ...base,
  rootDir: path.resolve(__dirname, '../../..'),
  roots: ['<rootDir>/packages/@smolitux/ai'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
