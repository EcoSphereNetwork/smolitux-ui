describe('Spinner Component', () => {
  beforeEach(() => {
    cy.visitStory('components-feedback-spinner', 'default');
  });

  it('renders default spinner correctly', () => {
    cy.get('.spinner').should('exist').and('be.visible');
    cy.get('.spinner').shouldHaveClass('spinner-border');
    cy.get('.spinner').shouldHaveClass('spinner-md');
    cy.get('.spinner').shouldHaveClass('spinner-primary');
  });

  context('Different sizes', () => {
    it('renders spinners in different sizes', () => {
      cy.visitStory('components-feedback-spinner', 'sizes');
      cy.get('.spinner').should('have.length', 5);
      
      cy.get('.spinner').eq(0).shouldHaveClass('spinner-xs');
      cy.get('.spinner').eq(1).shouldHaveClass('spinner-sm');
      cy.get('.spinner').eq(2).shouldHaveClass('spinner-md');
      cy.get('.spinner').eq(3).shouldHaveClass('spinner-lg');
      cy.get('.spinner').eq(4).shouldHaveClass('spinner-xl');
    });
  });

  context('Different variants', () => {
    it('renders spinners in different variants', () => {
      cy.visitStory('components-feedback-spinner', 'variants');
      cy.get('.spinner').should('have.length', 4);
      
      cy.get('.spinner').eq(0).shouldHaveClass('spinner-border');
      cy.get('.spinner').eq(1).shouldHaveClass('spinner-grow');
      cy.get('.spinner').eq(2).shouldHaveClass('spinner-dots');
      cy.get('.spinner').eq(3).shouldHaveClass('spinner-ring');
    });
  });

  context('Different colors', () => {
    it('renders spinners in different colors', () => {
      cy.visitStory('components-feedback-spinner', 'colors');
      cy.get('.spinner').should('have.length', 8);
      
      cy.get('.spinner').eq(0).shouldHaveClass('spinner-primary');
      cy.get('.spinner').eq(1).shouldHaveClass('spinner-secondary');
      cy.get('.spinner').eq(2).shouldHaveClass('spinner-success');
      cy.get('.spinner').eq(3).shouldHaveClass('spinner-danger');
      cy.get('.spinner').eq(4).shouldHaveClass('spinner-warning');
      cy.get('.spinner').eq(5).shouldHaveClass('spinner-info');
      cy.get('.spinner').eq(6).shouldHaveClass('spinner-light');
      cy.get('.spinner').eq(7).shouldHaveClass('spinner-dark');
    });
  });

  context('With text', () => {
    it('renders spinner with text correctly', () => {
      cy.visitStory('components-feedback-spinner', 'with-text');
      cy.get('.spinner').should('exist');
      cy.get('.spinner-text').should('exist').and('contain', 'Wird geladen...');
    });
  });

  context('Custom speed', () => {
    it('renders spinners with custom speeds', () => {
      cy.visitStory('components-feedback-spinner', 'custom-speed');
      cy.get('.spinner').should('have.length', 3);
      
      // Check if spinners have different animation durations
      // Note: This is a simplified check, in a real test we might need to check computed styles
      cy.get('.spinner').eq(0).should('have.attr', 'style').and('include', 'animation-duration: 0.5s');
      cy.get('.spinner').eq(1).should('have.attr', 'style').and('include', 'animation-duration: 1s');
      cy.get('.spinner').eq(2).should('have.attr', 'style').and('include', 'animation-duration: 2s');
    });
  });

  context('Centered', () => {
    it('renders centered spinner correctly', () => {
      cy.visitStory('components-feedback-spinner', 'centered');
      cy.get('.spinner-container').should('exist');
      cy.get('.spinner-container').shouldHaveClass('spinner-centered');
      cy.get('.spinner').should('exist');
    });
  });

  context('Full width', () => {
    it('renders full width spinner correctly', () => {
      cy.visitStory('components-feedback-spinner', 'full-width');
      cy.get('.spinner-container').should('exist');
      cy.get('.spinner-container').shouldHaveClass('spinner-full-width');
      cy.get('.spinner').should('exist');
      cy.get('.spinner-text').should('exist').and('contain', 'Daten werden geladen...');
    });
  });

  context('Accessibility', () => {
    it('has proper aria attributes for accessibility', () => {
      cy.get('.spinner').shouldHaveAttribute('role', 'status');
      cy.get('.spinner').shouldHaveAttribute('aria-busy', 'true');
      
      // If there's a label, it should be properly associated
      cy.visitStory('components-feedback-spinner', 'with-text');
      cy.get('.spinner').shouldHaveAttribute('aria-labelledby');
    });
  });
});