describe('Button Component', () => {
  beforeEach(() => {
    cy.visitStory('components-inputs-button', 'primary');
  });

  it('renders primary button correctly', () => {
    cy.get('button').should('exist').and('be.visible');
    cy.get('button').shouldBeVisibleWithText('Primary Button');
    cy.get('button').shouldHaveClass('btn-primary');
  });

  it('handles click events', () => {
    cy.get('button').click();
    // In a real test, we would verify some state change or action
  });

  context('Different variants', () => {
    it('renders secondary button correctly', () => {
      cy.visitStory('components-inputs-button', 'secondary');
      cy.get('button').shouldBeVisibleWithText('Secondary Button');
      cy.get('button').shouldHaveClass('btn-secondary');
    });

    it('renders outlined button correctly', () => {
      cy.visitStory('components-inputs-button', 'outlined');
      cy.get('button').shouldBeVisibleWithText('Outlined Button');
      cy.get('button').shouldHaveClass('btn-outlined');
    });

    it('renders text button correctly', () => {
      cy.visitStory('components-inputs-button', 'text');
      cy.get('button').shouldBeVisibleWithText('Text Button');
      cy.get('button').shouldHaveClass('btn-text');
    });

    it('renders link button correctly', () => {
      cy.visitStory('components-inputs-button', 'link');
      cy.get('button').shouldBeVisibleWithText('Link Button');
      cy.get('button').shouldHaveClass('btn-link');
    });
  });

  context('Different sizes', () => {
    it('renders buttons in different sizes', () => {
      cy.visitStory('components-inputs-button', 'sizes');
      cy.get('button').should('have.length.at.least', 5);
      
      cy.get('button').eq(0).shouldHaveClass('btn-xs');
      cy.get('button').eq(1).shouldHaveClass('btn-sm');
      cy.get('button').eq(2).shouldHaveClass('btn-md');
      cy.get('button').eq(3).shouldHaveClass('btn-lg');
      cy.get('button').eq(4).shouldHaveClass('btn-xl');
    });
  });

  context('Different states', () => {
    it('renders disabled button correctly', () => {
      cy.visitStory('components-inputs-button', 'disabled');
      cy.get('button').shouldBeDisabled();
    });

    it('renders loading button correctly', () => {
      cy.visitStory('components-inputs-button', 'loading');
      cy.get('button').should('contain', 'Loading Button');
      cy.get('button').find('.spinner').should('exist');
    });
  });

  context('Full width', () => {
    it('renders full width button correctly', () => {
      cy.visitStory('components-inputs-button', 'full-width');
      cy.get('button').shouldHaveClass('btn-full-width');
      cy.get('button').shouldHaveStyle('width', '100%');
    });
  });

  context('With icons', () => {
    it('renders button with icons correctly', () => {
      cy.visitStory('components-inputs-button', 'with-icon');
      cy.get('button').should('have.length.at.least', 3);
      
      // Button with left icon
      cy.get('button').eq(0).find('span').first().should('exist');
      
      // Button with right icon
      cy.get('button').eq(1).find('span').last().should('exist');
      
      // Button with icon only
      cy.get('button').eq(2).find('span').should('exist');
    });
  });
});