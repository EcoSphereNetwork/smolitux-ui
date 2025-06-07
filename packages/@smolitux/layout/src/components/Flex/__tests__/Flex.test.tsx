import React from 'react';
import { render, screen } from '@testing-library/react';
import { Flex } from '../Flex';

describe('Flex', () => {
  test('renders with default props', () => {
    render(
      <Flex data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByTestId('flex');
    expect(flex).toBeInTheDocument();
    expect(flex).toHaveClass('flex');
    expect(flex).toHaveClass('flex-row');
    expect(flex).toHaveClass('flex-nowrap');
    expect(flex).toHaveClass('justify-start');
    expect(flex).toHaveClass('items-stretch');
  });

  test('renders with custom direction', () => {
    render(
      <Flex direction="column" data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByTestId('flex');
    expect(flex).toHaveClass('flex-col');
  });

  test('renders with custom wrap', () => {
    render(
      <Flex wrap="wrap" data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByTestId('flex');
    expect(flex).toHaveClass('flex-wrap');
  });

  test('renders with custom justify', () => {
    render(
      <Flex justify="space-between" data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByTestId('flex');
    expect(flex).toHaveClass('justify-between');
  });

  test('renders with custom align', () => {
    render(
      <Flex align="center" data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByTestId('flex');
    expect(flex).toHaveClass('items-center');
  });

  test('renders with custom alignContent', () => {
    render(
      <Flex alignContent="center" data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByTestId('flex');
    expect(flex).toHaveClass('content-center');
  });

  test('renders with custom gap', () => {
    render(
      <Flex gap="md" data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByTestId('flex');
    expect(flex).toHaveClass('gap-4');
  });

  test('renders with custom columnGap', () => {
    render(
      <Flex columnGap="lg" data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByTestId('flex');
    expect(flex).toHaveClass('gap-x-6');
  });

  test('renders with custom rowGap', () => {
    render(
      <Flex rowGap="xl" data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByTestId('flex');
    expect(flex).toHaveClass('gap-y-8');
  });

  test('renders with fullWidth', () => {
    render(
      <Flex fullWidth data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByTestId('flex');
    expect(flex).toHaveClass('w-full');
  });

  test('renders with fullHeight', () => {
    render(
      <Flex fullHeight data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByTestId('flex');
    expect(flex).toHaveClass('h-full');
  });

  test('renders as inline-flex', () => {
    render(
      <Flex inline data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByTestId('flex');
    expect(flex).toHaveClass('inline-flex');
    expect(flex).not.toHaveClass('flex');
  });

  test('applies custom className', () => {
    render(
      <Flex className="custom-class" data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByTestId('flex');
    expect(flex).toHaveClass('custom-class');
  });

  test('renders with responsive direction', () => {
    render(
      <Flex direction={{ sm: 'column', md: 'row' }} data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByTestId('flex');
    expect(flex.className).toContain('sm:flex-col');
    expect(flex.className).toContain('md:flex-row');
  });

  test('renders with responsive justify', () => {
    render(
      <Flex justify={{ sm: 'flex-start', md: 'center', lg: 'space-between' }} data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByTestId('flex');
    expect(flex.className).toContain('sm:justify-start');
    expect(flex.className).toContain('md:justify-center');
    expect(flex.className).toContain('lg:justify-between');
  });

  test('renders with responsive align', () => {
    render(
      <Flex align={{ sm: 'flex-start', md: 'center' }} data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByTestId('flex');
    expect(flex.className).toContain('sm:items-start');
    expect(flex.className).toContain('md:items-center');
  });

  test('renders with responsive gap', () => {
    render(
      <Flex gap={{ sm: 'xs', md: 'md', lg: 'xl' }} data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByTestId('flex');
    expect(flex.className).toContain('sm:gap-1');
    expect(flex.className).toContain('md:gap-4');
    expect(flex.className).toContain('lg:gap-8');
  });

  test('forwards ref to div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Flex ref={ref} data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
    expect(ref.current).toHaveClass('flex');
  });
});
