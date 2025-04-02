/// <reference types="cypress" />
/// <reference types="cypress-axe" />

describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:6006');
    cy.wait(1000); // Wait for Storybook to load
    cy.injectAxe();
  });

  it('should pass accessibility tests for Button component', () => {
    // Navigate to Button component
    cy.get('#storybook-explorer-tree').contains('Button').click();
    cy.contains('Primary').click();
    
    // Run accessibility tests
    cy.checkA11y();
  });

  it('should pass accessibility tests for Modal component', () => {
    // Navigate to Modal component
    cy.get('#storybook-explorer-tree').contains('Modal').click();
    cy.contains('Basic').click();
    
    // Open modal
    cy.get('button').contains('Modal öffnen').click();
    
    // Run accessibility tests
    cy.checkA11y();
    
    // Close modal
    cy.get('[role="dialog"]').contains('Schließen').click();
  });

  it('should pass accessibility tests for Accordion component', () => {
    // Navigate to Accordion component
    cy.get('#storybook-explorer-tree').contains('Accordion').click();
    cy.contains('Default').click();
    
    // Run accessibility tests
    cy.checkA11y();
    
    // Expand accordion
    cy.contains('Was ist Smolitux UI?').click();
    
    // Run accessibility tests again
    cy.checkA11y();
  });

  it('should pass accessibility tests for Tabs component', () => {
    // Navigate to Tabs component
    cy.get('#storybook-explorer-tree').contains('Tabs').click();
    cy.contains('Basic').click();
    
    // Run accessibility tests
    cy.checkA11y();
    
    // Click on second tab
    cy.get('[role="tab"]').eq(1).click();
    
    // Run accessibility tests again
    cy.checkA11y();
  });

  it('should pass accessibility tests for Table component', () => {
    // Navigate to Table component
    cy.get('#storybook-explorer-tree').contains('Table').click();
    cy.contains('Basic').click();
    
    // Run accessibility tests
    cy.checkA11y();
  });

  it('should pass accessibility tests for Form components', () => {
    // Navigate to Input component
    cy.get('#storybook-explorer-tree').contains('Input').click();
    cy.contains('Basic').click();
    
    // Run accessibility tests
    cy.checkA11y();
    
    // Navigate to Select component
    cy.get('#storybook-explorer-tree').contains('Select').click();
    cy.contains('Basic').click();
    
    // Run accessibility tests
    cy.checkA11y();
    
    // Navigate to Checkbox component
    cy.get('#storybook-explorer-tree').contains('Checkbox').click();
    cy.contains('Basic').click();
    
    // Run accessibility tests
    cy.checkA11y();
  });

  it('should pass accessibility tests for Card component', () => {
    // Navigate to Card component
    cy.get('#storybook-explorer-tree').contains('Card').click();
    cy.contains('Basic').click();
    
    // Run accessibility tests
    cy.checkA11y();
  });

  it('should pass accessibility tests for Tooltip component', () => {
    // Navigate to Tooltip component
    cy.get('#storybook-explorer-tree').contains('Tooltip').click();
    cy.contains('Default').click();
    
    // Hover to show tooltip
    cy.get('button').contains('Hover über mich').trigger('mouseover');
    
    // Run accessibility tests
    cy.checkA11y();
  });

  it('should pass accessibility tests for Breadcrumb component', () => {
    // Navigate to Breadcrumb component
    cy.get('#storybook-explorer-tree').contains('Breadcrumb').click();
    cy.contains('Default').click();
    
    // Run accessibility tests
    cy.checkA11y();
  });

  it('should pass accessibility tests for Avatar component', () => {
    // Navigate to Avatar component
    cy.get('#storybook-explorer-tree').contains('Avatar').click();
    cy.contains('WithImage').click();
    
    // Run accessibility tests
    cy.checkA11y();
  });

  it('should pass accessibility tests for dark mode', () => {
    // Toggle dark mode
    cy.get('#storybook-panel-root').contains('Themes').click();
    cy.get('#storybook-panel-root').contains('Dark').click();
    
    // Navigate to Button component
    cy.get('#storybook-explorer-tree').contains('Button').click();
    cy.contains('Primary').click();
    
    // Run accessibility tests
    cy.checkA11y();
    
    // Toggle back to light mode
    cy.get('#storybook-panel-root').contains('Light').click();
  });
});