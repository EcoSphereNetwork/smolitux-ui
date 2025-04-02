// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  cy.get('[data-testid=email-input]').type(email);
  cy.get('[data-testid=password-input]').type(password);
  cy.get('[data-testid=login-button]').click();
});

// -- This is a child command --
Cypress.Commands.add('drag', { prevSubject: 'element' }, (subject, options) => {
  const { direction = 'right', distance = 50 } = options || {};
  
  cy.wrap(subject)
    .trigger('mousedown', { which: 1, force: true })
    .trigger('mousemove', {
      which: 1,
      force: true,
      ...(direction === 'right' && { clientX: distance }),
      ...(direction === 'left' && { clientX: -distance }),
      ...(direction === 'up' && { clientY: -distance }),
      ...(direction === 'down' && { clientY: distance }),
    })
    .trigger('mouseup', { force: true });
});

// -- This is a dual command --
Cypress.Commands.add('dismissAlert', (options) => {
  cy.on('window:alert', (text) => {
    expect(text).to.include(options?.text || '');
  });
  cy.get(options?.selector || '[data-testid=dismiss-button]').click();
});

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Declare global types for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      drag(options?: { direction?: 'right' | 'left' | 'up' | 'down'; distance?: number }): Chainable<Element>;
      dismissAlert(options?: { text?: string; selector?: string }): Chainable<void>;
    }
  }
}