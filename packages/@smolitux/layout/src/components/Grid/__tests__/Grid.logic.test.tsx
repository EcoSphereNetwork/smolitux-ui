import React from 'react';
import { render } from '@testing-library/react';
import Grid from '../Grid';

describe('Grid CSS logic', () => {
  test('applies gap and alignment classes', () => {
    const { container } = render(
      <Grid
        data-testid="grid"
        gap={{ sm: 'xs', lg: 'md' }}
        columnGap="sm"
        rowGap="lg"
        justify="center"
        align="stretch"
      >
        <Grid.Item xs={12} />
      </Grid>
    );
    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain('sm:gap-xs');
    expect(grid.className).toContain('lg:gap-md');
    expect(grid.className).toContain('gap-x-sm');
    expect(grid.className).toContain('gap-y-lg');
    expect(grid.className).toContain('justify-center');
    expect(grid.className).toContain('items-stretch');
  });
});
