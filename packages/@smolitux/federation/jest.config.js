const path = require('path');
const base = require('../../../jest.config');
module.exports = {
  ...base,
  rootDir: path.resolve(__dirname, '../../..'),
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
