describe('Storybook Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('should load the Storybook UI', () => {
    cy.get('#storybook-explorer-tree').should('be.visible');
    cy.get('#storybook-preview-iframe').should('be.visible');
  });

  it('should navigate to Button component', () => {
    cy.get('#storybook-explorer-searchfield').type('Button');
    cy.contains('Button').click();
    
    // Wait for the iframe to load
    cy.get('#storybook-preview-iframe').should('be.visible');
    
    // Switch to the iframe context
    cy.get('#storybook-preview-iframe').then(($iframe) => {
      const $body = $iframe.contents().find('body');
      
      // Check if the Button component is rendered
      cy.wrap($body).find('button').should('exist');
      
      // Check for accessibility issues
      cy.checkA11y($body);
    });
  });

  it('should navigate to Grid component', () => {
    cy.get('#storybook-explorer-searchfield').type('Grid');
    cy.contains('Grid').click();
    
    // Wait for the iframe to load
    cy.get('#storybook-preview-iframe').should('be.visible');
    
    // Switch to the iframe context
    cy.get('#storybook-preview-iframe').then(($iframe) => {
      const $body = $iframe.contents().find('body');
      
      // Check if the Grid component is rendered
      cy.wrap($body).find('.grid').should('exist');
      
      // Check for accessibility issues
      cy.checkA11y($body);
    });
  });

  it('should navigate to ColorPicker component', () => {
    cy.get('#storybook-explorer-searchfield').type('ColorPicker');
    cy.contains('ColorPicker').click();
    
    // Wait for the iframe to load
    cy.get('#storybook-preview-iframe').should('be.visible');
    
    // Switch to the iframe context
    cy.get('#storybook-preview-iframe').then(($iframe) => {
      const $body = $iframe.contents().find('body');
      
      // Check if the ColorPicker component is rendered
      cy.wrap($body).find('.color-picker').should('exist');
      
      // Check for accessibility issues
      cy.checkA11y($body);
    });
  });

  it('should navigate to Slider component', () => {
    cy.get('#storybook-explorer-searchfield').type('Slider');
    cy.contains('Slider').click();
    
    // Wait for the iframe to load
    cy.get('#storybook-preview-iframe').should('be.visible');
    
    // Switch to the iframe context
    cy.get('#storybook-preview-iframe').then(($iframe) => {
      const $body = $iframe.contents().find('body');
      
      // Check if the Slider component is rendered
      cy.wrap($body).find('.slider').should('exist');
      
      // Check for accessibility issues
      cy.checkA11y($body);
    });
  });

  it('should toggle between light and dark themes', () => {
    // Find and click the theme toggle button
    cy.get('[title="Change theme"]').click();
    cy.contains('Dark').click();
    
    // Check if the dark theme is applied
    cy.get('html').should('have.class', 'dark');
    
    // Switch back to light theme
    cy.get('[title="Change theme"]').click();
    cy.contains('Light').click();
    
    // Check if the light theme is applied
    cy.get('html').should('not.have.class', 'dark');
  });
});