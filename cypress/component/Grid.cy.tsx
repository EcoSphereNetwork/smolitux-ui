import React from 'react';
import { Grid } from '../../packages/@smolitux/core/src/components/Grid/Grid';

describe('Grid Component', () => {
  beforeEach(() => {
    cy.injectAxe();
  });

  it('renders with default props', () => {
    cy.mount(
      <Grid data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );
    
    cy.get('[data-testid="grid"]').should('exist');
    cy.get('[data-testid="grid"]').should('have.class', 'grid');
    cy.get('[data-testid="grid"]').should('have.class', 'grid-cols-1');
    
    // Check for accessibility issues
    cy.checkA11y();
  });

  it('renders with custom columns', () => {
    cy.mount(
      <Grid columns={3} data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Grid>
    );
    
    cy.get('[data-testid="grid"]').should('have.class', 'grid-cols-3');
    
    // Visual test
    cy.matchImageSnapshot('grid-3-columns');
    
    // Check for accessibility issues
    cy.checkA11y();
  });

  it('renders with custom gap', () => {
    cy.mount(
      <Grid gap="md" data-testid="grid">
        <div className="bg-blue-100 p-4">Item 1</div>
        <div className="bg-blue-100 p-4">Item 2</div>
      </Grid>
    );
    
    cy.get('[data-testid="grid"]').should('have.class', 'gap-4');
    
    // Visual test
    cy.matchImageSnapshot('grid-with-gap');
    
    // Check for accessibility issues
    cy.checkA11y();
  });

  it('renders with responsive columns', () => {
    cy.mount(
      <Grid columns={{ sm: 1, md: 2, lg: 3 }} data-testid="grid">
        <div className="bg-blue-100 p-4">Item 1</div>
        <div className="bg-blue-100 p-4">Item 2</div>
        <div className="bg-blue-100 p-4">Item 3</div>
      </Grid>
    );
    
    cy.get('[data-testid="grid"]').invoke('attr', 'class').should('include', 'sm:grid-cols-1');
    cy.get('[data-testid="grid"]').invoke('attr', 'class').should('include', 'md:grid-cols-2');
    cy.get('[data-testid="grid"]').invoke('attr', 'class').should('include', 'lg:grid-cols-3');
    
    // Check for accessibility issues
    cy.checkA11y();
  });

  it('renders in different themes', () => {
    cy.testThemes((theme) => {
      cy.mount(
        <Grid columns={2} gap="md" data-testid="grid">
          <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'} p-4`}>Item 1</div>
          <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'} p-4`}>Item 2</div>
        </Grid>
      );
      
      // Visual test for each theme
      cy.matchImageSnapshot(`grid-${theme}-theme`);
      
      // Check for accessibility issues in each theme
      cy.checkA11y();
    });
  });
});