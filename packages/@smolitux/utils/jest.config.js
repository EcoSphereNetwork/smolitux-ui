const base = require('../../../jest.config');
module.exports = {
  ...base,
  rootDir: __dirname,
  setupFilesAfterEnv: ['../../../jest.setup.js'],
};
