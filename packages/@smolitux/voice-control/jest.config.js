const base = require('../../../jest.config');
module.exports = {
  ...base,
  rootDir: __dirname,
  roots: ['<rootDir>'],
  moduleNameMapper: {
    ...base.moduleNameMapper,
    '^jest-matcher-utils$': '<rootDir>/../../../node_modules/jest-matcher-utils',
  },
  setupFilesAfterEnv: ['../../../jest.setup.js'],
};
