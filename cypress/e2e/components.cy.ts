describe('Smolitux UI Components', () => {
  beforeEach(() => {
    cy.visit('http://localhost:6006');
    cy.wait(1000); // Wait for Storybook to load
  });

  it('should navigate to Button component and verify its functionality', () => {
    // Navigate to Button component
    cy.get('#storybook-explorer-tree').contains('Button').click();
    cy.contains('Primary').click();
    
    // Verify Button is rendered
    cy.get('button').should('exist');
    cy.get('button').should('contain.text', 'Primary Button');
    
    // Test button click
    cy.get('button').click();
  });

  it('should navigate to Modal component and verify its functionality', () => {
    // Navigate to Modal component
    cy.get('#storybook-explorer-tree').contains('Modal').click();
    cy.contains('Basic').click();
    
    // Verify Modal button is rendered
    cy.get('button').contains('Modal öffnen').should('exist');
    
    // Open modal
    cy.get('button').contains('Modal öffnen').click();
    
    // Verify modal is open
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('[role="dialog"]').should('contain.text', 'Beispiel-Modal');
    
    // Close modal
    cy.get('[role="dialog"]').contains('Schließen').click();
    
    // Verify modal is closed
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('should navigate to Accordion component and verify its functionality', () => {
    // Navigate to Accordion component
    cy.get('#storybook-explorer-tree').contains('Accordion').click();
    cy.contains('Default').click();
    
    // Verify Accordion is rendered
    cy.get('[data-testid="accordion"]').should('exist');
    
    // Verify first item is visible but content is hidden
    cy.contains('Was ist Smolitux UI?').should('be.visible');
    cy.contains('Smolitux UI ist eine React-basierte Komponentenbibliothek').should('not.be.visible');
    
    // Click to expand
    cy.contains('Was ist Smolitux UI?').click();
    
    // Verify content is now visible
    cy.contains('Smolitux UI ist eine React-basierte Komponentenbibliothek').should('be.visible');
    
    // Click to collapse
    cy.contains('Was ist Smolitux UI?').click();
    
    // Verify content is hidden again
    cy.contains('Smolitux UI ist eine React-basierte Komponentenbibliothek').should('not.be.visible');
  });

  it('should navigate to Tabs component and verify its functionality', () => {
    // Navigate to Tabs component
    cy.get('#storybook-explorer-tree').contains('Tabs').click();
    cy.contains('Basic').click();
    
    // Verify Tabs are rendered
    cy.get('[role="tablist"]').should('exist');
    
    // Verify first tab is active
    cy.get('[role="tab"]').first().should('have.attr', 'aria-selected', 'true');
    
    // Click on second tab
    cy.get('[role="tab"]').eq(1).click();
    
    // Verify second tab is now active
    cy.get('[role="tab"]').eq(1).should('have.attr', 'aria-selected', 'true');
    cy.get('[role="tab"]').first().should('have.attr', 'aria-selected', 'false');
  });

  it('should navigate to Table component and verify its functionality', () => {
    // Navigate to Table component
    cy.get('#storybook-explorer-tree').contains('Table').click();
    cy.contains('Basic').click();
    
    // Verify Table is rendered
    cy.get('table').should('exist');
    
    // Verify table headers
    cy.get('th').should('have.length.at.least', 4);
    cy.get('th').should('contain.text', 'Name');
    cy.get('th').should('contain.text', 'E-Mail');
    
    // Verify table rows
    cy.get('tbody tr').should('have.length.at.least', 3);
    cy.get('tbody').should('contain.text', 'Max Mustermann');
    cy.get('tbody').should('contain.text', 'max@example.com');
  });

  it('should navigate to Avatar component and verify its functionality', () => {
    // Navigate to Avatar component
    cy.get('#storybook-explorer-tree').contains('Avatar').click();
    cy.contains('WithImage').click();
    
    // Verify Avatar is rendered
    cy.get('img').should('exist');
    cy.get('img').should('have.attr', 'alt', 'Avatar');
    
    // Navigate to WithInitials story
    cy.contains('WithInitials').click();
    
    // Verify initials are shown
    cy.get('div').contains('MM').should('exist');
  });

  it('should navigate to Card component and verify its functionality', () => {
    // Navigate to Card component
    cy.get('#storybook-explorer-tree').contains('Card').click();
    cy.contains('Basic').click();
    
    // Verify Card is rendered
    cy.get('[data-testid="card"]').should('exist');
    cy.get('[data-testid="card-title"]').should('contain.text', 'Kartentitel');
    cy.get('[data-testid="card-content"]').should('contain.text', 'Dies ist der Inhalt der Karte');
  });

  it('should navigate to Tooltip component and verify its functionality', () => {
    // Navigate to Tooltip component
    cy.get('#storybook-explorer-tree').contains('Tooltip').click();
    cy.contains('Default').click();
    
    // Verify Tooltip trigger is rendered
    cy.get('button').contains('Hover über mich').should('exist');
    
    // Hover to show tooltip
    cy.get('button').contains('Hover über mich').trigger('mouseover');
    
    // Verify tooltip is shown
    cy.get('[role="tooltip"]').should('be.visible');
    cy.get('[role="tooltip"]').should('contain.text', 'Dies ist ein Tooltip');
    
    // Move away to hide tooltip
    cy.get('body').trigger('mouseout');
  });

  it('should navigate to Breadcrumb component and verify its functionality', () => {
    // Navigate to Breadcrumb component
    cy.get('#storybook-explorer-tree').contains('Breadcrumb').click();
    cy.contains('Default').click();
    
    // Verify Breadcrumb is rendered
    cy.get('[aria-label="Breadcrumb"]').should('exist');
    
    // Verify breadcrumb items
    cy.get('[aria-label="Breadcrumb"] a').should('have.length', 3);
    cy.get('[aria-label="Breadcrumb"]').contains('Home').should('exist');
    cy.get('[aria-label="Breadcrumb"]').contains('Kategorie').should('exist');
    cy.get('[aria-label="Breadcrumb"]').contains('Unterkategorie').should('exist');
    cy.get('[aria-label="Breadcrumb"]').contains('Aktueller Artikel').should('exist');
    
    // Verify current page is marked correctly
    cy.get('[aria-current="page"]').should('contain.text', 'Aktueller Artikel');
  });
});