import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Grid } from '../Grid';

// Extend Jest matchers with accessibility checks
expect.extend(toHaveNoViolations);

describe('Grid Accessibility', () => {
  test('should not have accessibility violations', async () => {
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
});