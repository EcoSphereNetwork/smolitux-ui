// packages/@smolitux/core/src/components/Flex/__tests__/Flex.spec.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { Flex, FlexItem } from '../Flex';

describe('Flex Snapshot Tests', () => {
  it('matches snapshot with default props', () => {
    const { container } = render(
      <Flex>
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with row direction', () => {
    const { container } = render(
      <Flex direction="row">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with column direction', () => {
    const { container } = render(
      <Flex direction="column">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with wrap', () => {
    const { container } = render(
      <Flex wrap="wrap">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with justify center', () => {
    const { container } = render(
      <Flex justify="center">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with align center', () => {
    const { container } = render(
      <Flex align="center">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with gap', () => {
    const { container } = render(
      <Flex gap="md">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with inline', () => {
    const { container } = render(
      <Flex inline>
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with fullWidth', () => {
    const { container } = render(
      <Flex fullWidth>
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with FlexItem', () => {
    const { container } = render(
      <Flex>
        <FlexItem grow>Item 1</FlexItem>
        <FlexItem shrink={0} basis="200px">Item 2</FlexItem>
      </Flex>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with FlexItem align', () => {
    const { container } = render(
      <Flex>
        <FlexItem align="flex-start">Item 1</FlexItem>
        <FlexItem align="center">Item 2</FlexItem>
        <FlexItem align="flex-end">Item 3</FlexItem>
      </Flex>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with FlexItem order', () => {
    const { container } = render(
      <Flex>
        <FlexItem order={3}>Item 1</FlexItem>
        <FlexItem order={1}>Item 2</FlexItem>
        <FlexItem order={2}>Item 3</FlexItem>
      </Flex>
    );
    expect(container).toMatchSnapshot();
  });
});