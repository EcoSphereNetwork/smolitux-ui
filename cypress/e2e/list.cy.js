describe('List Component', () => {
  beforeEach(() => {
    cy.visitStory('components-data-display-list', 'default');
  });

  it('renders default list correctly', () => {
    cy.get('.list').should('exist').and('be.visible');
    cy.get('.list-item').should('have.length', 3);
    cy.get('.list-item').first().shouldBeVisibleWithText('Item 1');
  });

  context('List with secondary text', () => {
    it('renders list items with primary and secondary text', () => {
      cy.visitStory('components-data-display-list', 'with-secondary-text');
      cy.get('.list-item').should('have.length', 3);
      
      cy.get('.list-item').eq(0).find('.list-item-primary').shouldBeVisibleWithText('Inbox');
      cy.get('.list-item').eq(0).find('.list-item-secondary').shouldBeVisibleWithText('Alle eingehenden Nachrichten');
    });
  });

  context('List with icons', () => {
    it('renders list items with icons', () => {
      cy.visitStory('components-data-display-list', 'with-icons');
      cy.get('.list-item').should('have.length', 3);
      
      cy.get('.list-item').each(($item) => {
        cy.wrap($item).find('.list-item-icon').should('exist');
        cy.wrap($item).find('.list-item-primary').should('exist');
      });
    });
  });

  context('List with actions', () => {
    it('renders list items with action buttons', () => {
      cy.visitStory('components-data-display-list', 'with-actions');
      cy.get('.list-item').should('have.length', 3);
      
      cy.get('.list-item').each(($item) => {
        cy.wrap($item).find('.list-item-primary').should('exist');
        cy.wrap($item).find('.list-item-action').should('exist');
        cy.wrap($item).find('.list-item-action button').shouldBeVisibleWithText('Öffnen');
      });
    });

    it('handles action button clicks', () => {
      cy.visitStory('components-data-display-list', 'with-actions');
      cy.get('.list-item').first().find('.list-item-action button').click();
      // In a real test, we would verify some state change or action
    });
  });

  context('List with dividers', () => {
    it('renders list with dividers correctly', () => {
      cy.visitStory('components-data-display-list', 'with-dividers');
      cy.get('.list').shouldHaveClass('list-dividers');
      cy.get('.list-item').should('have.length', 3);
    });
  });

  context('Horizontal list', () => {
    it('renders horizontal list correctly', () => {
      cy.visitStory('components-data-display-list', 'horizontal');
      cy.get('.list').shouldHaveClass('list-horizontal');
      cy.get('.list-item').should('have.length', 4);
    });
  });

  context('List variants', () => {
    it('renders ordered list correctly', () => {
      cy.visitStory('components-data-display-list', 'ordered');
      cy.get('ol.list').should('exist');
      cy.get('.list-item').should('have.length', 3);
    });

    it('renders unordered list correctly', () => {
      cy.visitStory('components-data-display-list', 'unordered');
      cy.get('ul.list').should('exist');
      cy.get('.list-item').should('have.length', 3);
    });

    it('renders description list correctly', () => {
      cy.visitStory('components-data-display-list', 'description');
      cy.get('dl.list').should('exist');
      cy.get('.list-item').should('have.length', 3);
      
      cy.get('.list-item').each(($item) => {
        cy.wrap($item).find('dt').should('exist');
        cy.wrap($item).find('dd').should('exist');
      });
    });
  });

  context('List with custom marker', () => {
    it('renders unordered list with custom marker', () => {
      cy.visitStory('components-data-display-list', 'custom-marker');
      cy.get('ul.list').should('exist');
      cy.get('.list-item').should('have.length', 3);
      
      // Check if the custom marker is applied
      // This is a simplified check, in a real test we might need to check computed styles
      cy.get('ul.list').should('have.attr', 'style').and('include', 'list-style-type');
    });
  });

  context('List sizes', () => {
    it('renders lists in different sizes', () => {
      cy.visitStory('components-data-display-list', 'sizes');
      cy.get('.list').should('have.length', 3);
      
      cy.get('.list').eq(0).shouldHaveClass('list-sm');
      cy.get('.list').eq(1).shouldHaveClass('list-md');
      cy.get('.list').eq(2).shouldHaveClass('list-lg');
    });
  });

  context('List density', () => {
    it('renders lists with different densities', () => {
      cy.visitStory('components-data-display-list', 'density');
      cy.get('.list').should('have.length', 3);
      
      cy.get('.list').eq(0).shouldHaveClass('list-density-compact');
      cy.get('.list').eq(1).shouldHaveClass('list-density-default');
      cy.get('.list').eq(2).shouldHaveClass('list-density-comfortable');
    });
  });

  context('Selectable list', () => {
    it('renders selectable list correctly', () => {
      cy.visitStory('components-data-display-list', 'selectable');
      cy.get('.list').shouldHaveClass('list-selectable');
      cy.get('.list-item').should('have.length', 3);
      
      // Check if the first item is selected
      cy.get('.list-item').eq(0).shouldHaveClass('list-item-selected');
      
      // Click on the second item and check if it gets selected
      cy.get('.list-item').eq(1).click();
      cy.get('.list-item').eq(1).shouldHaveClass('list-item-selected');
    });
  });

  context('List with disabled items', () => {
    it('renders list with disabled items correctly', () => {
      cy.visitStory('components-data-display-list', 'with-disabled-items');
      cy.get('.list-item').should('have.length', 3);
      
      // Check if the second item is disabled
      cy.get('.list-item').eq(1).shouldHaveClass('list-item-disabled');
      
      // Try to click on the disabled item and verify it doesn't respond
      cy.get('.list-item').eq(1).click();
      cy.get('.list-item').eq(1).should('not.have.class', 'list-item-selected');
    });
  });

  context('Custom components', () => {
    it('renders list with custom components correctly', () => {
      cy.visitStory('components-data-display-list', 'custom-components');
      cy.get('.list-item').should('have.length', 2);
      
      cy.get('.list-item').each(($item) => {
        cy.wrap($item).find('.list-item-icon').should('exist');
        cy.wrap($item).find('.list-item-text').should('exist');
        cy.wrap($item).find('.list-item-text-primary').should('exist');
        cy.wrap($item).find('.list-item-text-secondary').should('exist');
        cy.wrap($item).find('.list-item-action').should('exist');
        cy.wrap($item).find('.list-item-action button').should('exist');
      });
    });
  });
});