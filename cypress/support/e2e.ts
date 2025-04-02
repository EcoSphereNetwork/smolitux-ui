// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Add accessibility testing commands
import 'cypress-axe';

// Add visual testing commands
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
  customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
  capture: 'viewport', // capture viewport in screenshot
});

// Add custom commands for a11y testing
Cypress.Commands.add('checkA11y', (context, options) => {
  cy.checkA11y(context, options, null, true);
});

// Add command to test component in different themes
Cypress.Commands.add('testThemes', (callback) => {
  // Test in light theme
  callback('light');
  
  // Test in dark theme
  cy.get('html').addClass('dark');
  callback('dark');
  cy.get('html').removeClass('dark');
});