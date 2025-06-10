const path = require('path');
const base = require('../../../jest.config');

module.exports = {
  ...base,
  rootDir: path.resolve(__dirname, '../../..'),
  roots: ['<rootDir>/packages/@smolitux/blockchain'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
