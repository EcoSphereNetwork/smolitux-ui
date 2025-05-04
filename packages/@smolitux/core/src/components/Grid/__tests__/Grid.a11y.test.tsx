import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Grid } from '../';

// Extend Jest matchers with accessibility checks
expect.extend(toHaveNoViolations);

describe('Grid Accessibility', () => {
  // Test fuer die Standard-Grid-Komponente
  test('should not have accessibility violations with standard Grid', async () => {
    const { container } = render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Grid>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  // Test fuer die A11y-Version der Grid-Komponente
  test('should not have accessibility violations with A11y Grid', async () => {
    const { container } = render(
      <Grid.A11y ariaLabel="Test Grid">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Grid.A11y>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('should have proper ARIA attributes with A11y Grid', () => {
    render(
      <Grid.A11y 
        ariaLabel="Test Grid"
        id="test-grid"
        isRegion={true}
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Grid.A11y>
    );
    
    const grid = screen.getByRole('region');
    expect(grid).toHaveAttribute('id', 'test-grid');
    expect(grid).toHaveAttribute('aria-label', 'Test Grid');
  });
  
  test('should not have accessibility violations with complex structure', async () => {
    const { container } = render(
      <Grid columns={3} gap="md">
        <div role="region" aria-label="Region 1">Region 1</div>
        <div role="region" aria-label="Region 2">Region 2</div>
        <div role="region" aria-label="Region 3">Region 3</div>
      </Grid>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('should handle table role correctly', () => {
    render(
      <Grid.A11y 
        isTable={true}
        hasTableCaption={true}
        tableCaption="Tabellenbeschreibung"
        hasTableSummary={true}
        tableSummary="Tabellenzusammenfassung"
        id="test-table"
        columns={3}
      >
        <div>Header 1</div>
        <div>Header 2</div>
        <div>Header 3</div>
        <div>Cell 1</div>
        <div>Cell 2</div>
        <div>Cell 3</div>
      </Grid.A11y>
    );
    
    const table = screen.getByRole('table');
    expect(table).toHaveAttribute('id', 'test-table');
    expect(table).toHaveAttribute('aria-labelledby', 'test-table-caption');
    expect(table).toHaveAttribute('aria-describedby', 'test-table-summary');
    
    // Prüfe, ob die Beschreibung und Zusammenfassung vorhanden sind
    const caption = document.getElementById('test-table-caption');
    const summary = document.getElementById('test-table-summary');
    expect(caption).toHaveTextContent('Tabellenbeschreibung');
    expect(summary).toHaveTextContent('Tabellenzusammenfassung');
  });
  
  test('should handle live region correctly', () => {
    render(
      <Grid.A11y 
        isLiveRegion={true}
        liveRegionPoliteness="assertive"
        isAtomic={true}
        isRelevant={true}
        relevantType="additions"
        isBusy={true}
        ariaLabel="Live Region"
      >
        <div>Dynamischer Inhalt</div>
      </Grid.A11y>
    );
    
    const liveRegion = screen.getByLabelText('Live Region');
    expect(liveRegion).toHaveAttribute('aria-live', 'assertive');
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
    expect(liveRegion).toHaveAttribute('aria-relevant', 'additions');
    expect(liveRegion).toHaveAttribute('aria-busy', 'true');
  });
  
  test('should handle focusable grid correctly', () => {
    render(
      <Grid.A11y 
        isFocusable={true}
        tabIndex={0}
        ariaLabel="Fokussierbares Grid"
      >
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid.A11y>
    );
    
    const grid = screen.getByLabelText('Fokussierbares Grid');
    expect(grid).toHaveAttribute('tabindex', '0');
  });
  
  test('should not have accessibility violations with nested grids', async () => {
    const { container } = render(
      <Grid columns={2} gap="md">
        <Grid columns={2} gap="sm">
          <div>Nested Item 1</div>
          <div>Nested Item 2</div>
        </Grid>
        <div>Item 2</div>
      </Grid>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('should not have accessibility violations with interactive elements', async () => {
    const { container } = render(
      <Grid columns={3} gap="md">
        <button>Button 1</button>
        <a href="#">Link 1</a>
        <input type="text" aria-label="Input field" />
      </Grid>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('should handle different roles correctly', () => {
    const { rerender } = render(
      <Grid.A11y 
        isNavigation={true}
        ariaLabel="Navigation"
      >
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
      </Grid.A11y>
    );
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    
    rerender(
      <Grid.A11y 
        isList={true}
        ariaLabel="Liste"
      >
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid.A11y>
    );
    
    expect(screen.getByRole('list')).toBeInTheDocument();
    
    rerender(
      <Grid.A11y 
        isForm={true}
        ariaLabel="Formular"
      >
        <input type="text" aria-label="Name" />
        <button>Absenden</button>
      </Grid.A11y>
    );
    
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
});