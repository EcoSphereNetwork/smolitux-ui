import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Grid from '../Grid';

expect.extend(toHaveNoViolations);

describe('Grid Accessibility', () => {
  test('should have no basic accessibility violations', async () => {
    const { container } = render(
      <Grid gap="md">
        <Grid.Item xs={6}>Item 1</Grid.Item>
        <Grid.Item xs={6}>Item 2</Grid.Item>
      </Grid>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should handle interactive content without violations', async () => {
    const { container } = render(
      <Grid gap="md">
        <Grid.Item xs={12}>
          <button>Click me</button>
        </Grid.Item>
      </Grid>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
