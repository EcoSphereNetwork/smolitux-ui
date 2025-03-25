// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';

// Custom command to visit a Storybook story
Cypress.Commands.add('visitStory', (component, story) => {
  cy.visit(`/iframe.html?id=${component}--${story}`);
});

// Custom command to check if an element is visible and has the correct text
Cypress.Commands.add('shouldBeVisibleWithText', { prevSubject: 'element' }, (subject, text) => {
  cy.wrap(subject).should('be.visible').and('contain', text);
});

// Custom command to check if an element has a specific class
Cypress.Commands.add('shouldHaveClass', { prevSubject: 'element' }, (subject, className) => {
  cy.wrap(subject).should('have.class', className);
});

// Custom command to check if an element has a specific attribute value
Cypress.Commands.add('shouldHaveAttribute', { prevSubject: 'element' }, (subject, attribute, value) => {
  cy.wrap(subject).should('have.attr', attribute, value);
});

// Custom command to check if an element is focused
Cypress.Commands.add('shouldBeFocused', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).should('have.focus');
});

// Custom command to check if an element is disabled
Cypress.Commands.add('shouldBeDisabled', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).should('be.disabled');
});

// Custom command to check if an element is enabled
Cypress.Commands.add('shouldBeEnabled', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).should('not.be.disabled');
});

// Custom command to check if an element has a specific style property
Cypress.Commands.add('shouldHaveStyle', { prevSubject: 'element' }, (subject, property, value) => {
  cy.wrap(subject).should('have.css', property, value);
});

// Custom command to check if an element is checked
Cypress.Commands.add('shouldBeChecked', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).should('be.checked');
});

// Custom command to check if an element is not checked
Cypress.Commands.add('shouldNotBeChecked', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).should('not.be.checked');
});