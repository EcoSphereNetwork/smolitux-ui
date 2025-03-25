// packages/@smolitux/core/src/components/Flex/__tests__/Flex.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Flex, FlexItem } from '../Flex';

describe('Flex', () => {
  it('renders correctly with default props', () => {
    render(
      <Flex data-testid="flex-container">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toBeInTheDocument();
    expect(flexContainer).toHaveClass('smolitux-flex');
    expect(flexContainer).toHaveClass('smolitux-flex-direction-row');
    expect(flexContainer).toHaveClass('smolitux-flex-wrap-nowrap');
    expect(flexContainer).toHaveClass('smolitux-flex-justify-flex-start');
    expect(flexContainer).toHaveClass('smolitux-flex-align-stretch');
  });
  
  it('applies direction classes correctly', () => {
    const { rerender } = render(<Flex direction="row" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-direction-row');
    
    rerender(<Flex direction="row-reverse" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-direction-row-reverse');
    
    rerender(<Flex direction="column" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-direction-column');
    
    rerender(<Flex direction="column-reverse" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-direction-column-reverse');
  });
  
  it('applies wrap classes correctly', () => {
    const { rerender } = render(<Flex wrap="nowrap" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-wrap-nowrap');
    
    rerender(<Flex wrap="wrap" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-wrap-wrap');
    
    rerender(<Flex wrap="wrap-reverse" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-wrap-wrap-reverse');
  });
  
  it('applies justify classes correctly', () => {
    const { rerender } = render(<Flex justify="flex-start" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-justify-flex-start');
    
    rerender(<Flex justify="flex-end" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-justify-flex-end');
    
    rerender(<Flex justify="center" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-justify-center');
    
    rerender(<Flex justify="space-between" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-justify-space-between');
    
    rerender(<Flex justify="space-around" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-justify-space-around');
    
    rerender(<Flex justify="space-evenly" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-justify-space-evenly');
  });
  
  it('applies align classes correctly', () => {
    const { rerender } = render(<Flex align="flex-start" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-align-flex-start');
    
    rerender(<Flex align="flex-end" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-align-flex-end');
    
    rerender(<Flex align="center" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-align-center');
    
    rerender(<Flex align="baseline" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-align-baseline');
    
    rerender(<Flex align="stretch" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-align-stretch');
  });
  
  it('applies alignContent classes correctly', () => {
    const { rerender } = render(<Flex alignContent="flex-start" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-align-content-flex-start');
    
    rerender(<Flex alignContent="flex-end" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-align-content-flex-end');
    
    rerender(<Flex alignContent="center" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-align-content-center');
    
    rerender(<Flex alignContent="stretch" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-align-content-stretch');
  });
  
  it('applies inline class correctly', () => {
    render(<Flex inline data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-inline');
  });
  
  it('applies fullWidth class correctly', () => {
    render(<Flex fullWidth data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-full-width');
  });
  
  it('applies fullHeight class correctly', () => {
    render(<Flex fullHeight data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveClass('smolitux-flex-full-height');
  });
  
  it('applies gap styles correctly', () => {
    const { rerender } = render(<Flex gap="md" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveStyle({ gap: '1rem' });
    
    rerender(<Flex gap={10} data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveStyle({ gap: '10px' });
    
    rerender(<Flex gap="2em" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveStyle({ gap: '2em' });
  });
  
  it('applies rowGap and columnGap styles correctly', () => {
    render(<Flex rowGap="md" columnGap="lg" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveStyle({ 
      rowGap: '1rem',
      columnGap: '1.5rem'
    });
  });
  
  it('applies flex styles correctly', () => {
    const { rerender } = render(<Flex flex data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveStyle({ flex: '1' });
    
    rerender(<Flex flex="1 0 auto" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveStyle({ flex: '1 0 auto' });
  });
  
  it('applies grow styles correctly', () => {
    const { rerender } = render(<Flex grow data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveStyle({ flexGrow: '1' });
    
    rerender(<Flex grow={2} data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveStyle({ flexGrow: '2' });
  });
  
  it('applies shrink styles correctly', () => {
    const { rerender } = render(<Flex shrink data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveStyle({ flexShrink: '1' });
    
    rerender(<Flex shrink={0} data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveStyle({ flexShrink: '0' });
  });
  
  it('applies basis styles correctly', () => {
    const { rerender } = render(<Flex basis="auto" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveStyle({ flexBasis: 'auto' });
    
    rerender(<Flex basis="50%" data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveStyle({ flexBasis: '50%' });
    
    rerender(<Flex basis={200} data-testid="flex-container" />);
    expect(screen.getByTestId('flex-container')).toHaveStyle({ flexBasis: '200px' });
  });
  
  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Flex ref={ref} data-testid="flex-container" />);
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('smolitux-flex');
  });
});

describe('FlexItem', () => {
  it('renders correctly with default props', () => {
    render(
      <Flex>
        <FlexItem data-testid="flex-item">Item</FlexItem>
      </Flex>
    );
    
    const flexItem = screen.getByTestId('flex-item');
    expect(flexItem).toBeInTheDocument();
    expect(flexItem).toHaveClass('smolitux-flex-item');
  });
  
  it('applies align classes correctly', () => {
    const { rerender } = render(
      <Flex>
        <FlexItem align="flex-start" data-testid="flex-item">Item</FlexItem>
      </Flex>
    );
    expect(screen.getByTestId('flex-item')).toHaveClass('smolitux-flex-item-align-flex-start');
    
    rerender(
      <Flex>
        <FlexItem align="center" data-testid="flex-item">Item</FlexItem>
      </Flex>
    );
    expect(screen.getByTestId('flex-item')).toHaveClass('smolitux-flex-item-align-center');
  });
  
  it('applies flex styles correctly', () => {
    const { rerender } = render(
      <Flex>
        <FlexItem flex data-testid="flex-item">Item</FlexItem>
      </Flex>
    );
    expect(screen.getByTestId('flex-item')).toHaveStyle({ flex: '1' });
    
    rerender(
      <Flex>
        <FlexItem flex="1 0 auto" data-testid="flex-item">Item</FlexItem>
      </Flex>
    );
    expect(screen.getByTestId('flex-item')).toHaveStyle({ flex: '1 0 auto' });
  });
  
  it('applies grow styles correctly', () => {
    const { rerender } = render(
      <Flex>
        <FlexItem grow data-testid="flex-item">Item</FlexItem>
      </Flex>
    );
    expect(screen.getByTestId('flex-item')).toHaveStyle({ flexGrow: '1' });
    
    rerender(
      <Flex>
        <FlexItem grow={2} data-testid="flex-item">Item</FlexItem>
      </Flex>
    );
    expect(screen.getByTestId('flex-item')).toHaveStyle({ flexGrow: '2' });
  });
  
  it('applies shrink styles correctly', () => {
    const { rerender } = render(
      <Flex>
        <FlexItem shrink data-testid="flex-item">Item</FlexItem>
      </Flex>
    );
    expect(screen.getByTestId('flex-item')).toHaveStyle({ flexShrink: '1' });
    
    rerender(
      <Flex>
        <FlexItem shrink={0} data-testid="flex-item">Item</FlexItem>
      </Flex>
    );
    expect(screen.getByTestId('flex-item')).toHaveStyle({ flexShrink: '0' });
  });
  
  it('applies basis styles correctly', () => {
    const { rerender } = render(
      <Flex>
        <FlexItem basis="auto" data-testid="flex-item">Item</FlexItem>
      </Flex>
    );
    expect(screen.getByTestId('flex-item')).toHaveStyle({ flexBasis: 'auto' });
    
    rerender(
      <Flex>
        <FlexItem basis="50%" data-testid="flex-item">Item</FlexItem>
      </Flex>
    );
    expect(screen.getByTestId('flex-item')).toHaveStyle({ flexBasis: '50%' });
    
    rerender(
      <Flex>
        <FlexItem basis={200} data-testid="flex-item">Item</FlexItem>
      </Flex>
    );
    expect(screen.getByTestId('flex-item')).toHaveStyle({ flexBasis: '200px' });
  });
  
  it('applies order styles correctly', () => {
    render(
      <Flex>
        <FlexItem order={2} data-testid="flex-item">Item</FlexItem>
      </Flex>
    );
    expect(screen.getByTestId('flex-item')).toHaveStyle({ order: 2 });
  });
  
  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Flex>
        <FlexItem ref={ref} data-testid="flex-item">Item</FlexItem>
      </Flex>
    );
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('smolitux-flex-item');
  });
});