import React from 'react';
import { render, screen } from '@testing-library/react';
import Grid from '../Grid';

describe('Grid', () => {
  test('renders with default props', () => {
    render(
      <Grid data-testid="grid">
        <Grid.Item xs={12}>One</Grid.Item>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('grid-cols-12');
  });

  test('renders item with responsive cols', () => {
    render(
      <Grid data-testid="grid">
        <Grid.Item xs={12} md={6} lg={4} data-testid="item" />
      </Grid>
    );

    const item = screen.getByTestId('item');
    expect(item).toHaveClass('col-span-12');
    expect(item.className).toContain('md:col-span-6');
    expect(item.className).toContain('lg:col-span-4');
  });
});
