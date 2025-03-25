const { defineConfig } = require('cypress');
const percyHealthCheck = require('@percy/cypress/task');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:6006',
    setupNodeEvents(on, config) {
      // Percy visual testing
      on('task', percyHealthCheck);
      
      // Other node event listeners
      return config;
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
});