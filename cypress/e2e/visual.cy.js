describe('Visual Regression Tests', () => {
  context('Button Component', () => {
    it('should match visual snapshot of all button variants', () => {
      cy.visitStory('components-inputs-button', 'primary');
      cy.wait(500); // Wait for animations to complete
      cy.percySnapshot('Button - Primary');
      
      cy.visitStory('components-inputs-button', 'secondary');
      cy.wait(500);
      cy.percySnapshot('Button - Secondary');
      
      cy.visitStory('components-inputs-button', 'outlined');
      cy.wait(500);
      cy.percySnapshot('Button - Outlined');
      
      cy.visitStory('components-inputs-button', 'text');
      cy.wait(500);
      cy.percySnapshot('Button - Text');
      
      cy.visitStory('components-inputs-button', 'link');
      cy.wait(500);
      cy.percySnapshot('Button - Link');
    });
    
    it('should match visual snapshot of button sizes', () => {
      cy.visitStory('components-inputs-button', 'sizes');
      cy.wait(500);
      cy.percySnapshot('Button - Sizes');
    });
    
    it('should match visual snapshot of button states', () => {
      cy.visitStory('components-inputs-button', 'disabled');
      cy.wait(500);
      cy.percySnapshot('Button - Disabled');
      
      cy.visitStory('components-inputs-button', 'loading');
      cy.wait(500);
      cy.percySnapshot('Button - Loading');
    });
  });
  
  context('Spinner Component', () => {
    it('should match visual snapshot of spinner variants', () => {
      cy.visitStory('components-feedback-spinner', 'variants');
      cy.wait(500);
      cy.percySnapshot('Spinner - Variants');
    });
    
    it('should match visual snapshot of spinner sizes', () => {
      cy.visitStory('components-feedback-spinner', 'sizes');
      cy.wait(500);
      cy.percySnapshot('Spinner - Sizes');
    });
    
    it('should match visual snapshot of spinner colors', () => {
      cy.visitStory('components-feedback-spinner', 'colors');
      cy.wait(500);
      cy.percySnapshot('Spinner - Colors');
    });
  });
  
  context('List Component', () => {
    it('should match visual snapshot of list variants', () => {
      cy.visitStory('components-data-display-list', 'default');
      cy.wait(500);
      cy.percySnapshot('List - Default');
      
      cy.visitStory('components-data-display-list', 'with-secondary-text');
      cy.wait(500);
      cy.percySnapshot('List - With Secondary Text');
      
      cy.visitStory('components-data-display-list', 'with-icons');
      cy.wait(500);
      cy.percySnapshot('List - With Icons');
      
      cy.visitStory('components-data-display-list', 'with-actions');
      cy.wait(500);
      cy.percySnapshot('List - With Actions');
    });
    
    it('should match visual snapshot of list with dividers', () => {
      cy.visitStory('components-data-display-list', 'with-dividers');
      cy.wait(500);
      cy.percySnapshot('List - With Dividers');
    });
    
    it('should match visual snapshot of horizontal list', () => {
      cy.visitStory('components-data-display-list', 'horizontal');
      cy.wait(500);
      cy.percySnapshot('List - Horizontal');
    });
  });
  
  context('Flex Component', () => {
    it('should match visual snapshot of flex directions', () => {
      cy.visitStory('components-layout-flex', 'direction');
      cy.wait(500);
      cy.percySnapshot('Flex - Directions');
    });
    
    it('should match visual snapshot of justify content', () => {
      cy.visitStory('components-layout-flex', 'justify-content');
      cy.wait(500);
      cy.percySnapshot('Flex - Justify Content');
    });
    
    it('should match visual snapshot of align items', () => {
      cy.visitStory('components-layout-flex', 'align-items');
      cy.wait(500);
      cy.percySnapshot('Flex - Align Items');
    });
    
    it('should match visual snapshot of flex wrap', () => {
      cy.visitStory('components-layout-flex', 'wrap');
      cy.wait(500);
      cy.percySnapshot('Flex - Wrap');
    });
  });
});