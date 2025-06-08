import React from 'react';
import { render, screen } from '@testing-library/react';
import { Grid } from '../Grid';

describe('Grid', () => {
  test('renders with default props', () => {
    render(
      <Grid data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('gap-0');
  });

  test('renders with custom columns', () => {
    render(
      <Grid columns={3} data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('grid-cols-3');
  });

  test('renders with custom rows', () => {
    render(
      <Grid rows={2} data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('grid-rows-2');
  });

  test('renders with custom gap', () => {
    render(
      <Grid gap="md" data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('gap-4');
  });

  test('renders with custom column gap', () => {
    render(
      <Grid columnGap="lg" data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('gap-x-6');
  });

  test('renders with custom row gap', () => {
    render(
      <Grid rowGap="xl" data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('gap-y-8');
  });

  test('renders with justify items', () => {
    render(
      <Grid justifyItems="center" data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('justify-items-center');
  });

  test('renders with align items', () => {
    render(
      <Grid alignItems="center" data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('items-center');
  });

  test('renders with justify content', () => {
    render(
      <Grid justifyContent="between" data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('justify-between');
  });

  test('renders with align content', () => {
    render(
      <Grid alignContent="around" data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('content-around');
  });

  test('renders with flow', () => {
    render(
      <Grid flow="column" data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('grid-flow-col');
  });

  test('renders with auto columns', () => {
    render(
      <Grid autoColumns="min" data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('auto-cols-min');
  });

  test('renders with auto rows', () => {
    render(
      <Grid autoRows="max" data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('auto-rows-max');
  });

  test('renders with full width', () => {
    render(
      <Grid fullWidth data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('w-full');
  });

  test('renders with full height', () => {
    render(
      <Grid fullHeight data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('h-full');
  });

  test('renders with custom className', () => {
    render(
      <Grid className="custom-class" data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('custom-class');
  });

  test('renders with responsive columns', () => {
    render(
      <Grid columns={{ sm: 1, md: 2, lg: 3 }} data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid.className).toContain('sm:grid-cols-1');
    expect(grid.className).toContain('md:grid-cols-2');
    expect(grid.className).toContain('lg:grid-cols-3');
  });

  test('renders with responsive gap', () => {
    render(
      <Grid gap={{ sm: 'xs', md: 'md', lg: 'xl' }} data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid.className).toContain('sm:gap-1');
    expect(grid.className).toContain('md:gap-4');
    expect(grid.className).toContain('lg:gap-8');
  });

  test('forwards ref to div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Grid ref={ref} data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
    expect(ref.current).toHaveClass('grid');
  });
});
