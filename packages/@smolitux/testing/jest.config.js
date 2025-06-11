const path = require('path');
const base = require('../../../jest.config');

module.exports = {
  ...base,
  rootDir: path.resolve(__dirname, '../../..'),
  roots: ['<rootDir>/packages/@smolitux/testing'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
