import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Flex } from '../Flex';

// Erweitere Jest-Matcher um Barrierefreiheitsprüfungen
expect.extend(toHaveNoViolations);

describe('Flex Accessibility', () => {
  test('should not have accessibility violations', async () => {
    const { container } = render(
      <Flex>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Flex>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should not have accessibility violations with different directions', async () => {
    const directions = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
    
    for (const direction of directions) {
      const { container } = render(
        <Flex direction={direction}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Flex>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  test('should not have accessibility violations with different alignments', async () => {
    const alignItems = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'] as const;
    
    for (const align of alignItems) {
      const { container } = render(
        <Flex align={align}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Flex>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  test('should not have accessibility violations with different justifications', async () => {
    const justifyContent = [
      'flex-start', 
      'flex-end', 
      'center', 
      'space-between', 
      'space-around', 
      'space-evenly'
    ] as const;
    
    for (const justify of justifyContent) {
      const { container } = render(
        <Flex justify={justify}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Flex>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  test('should not have accessibility violations with different wraps', async () => {
    const wraps = ['nowrap', 'wrap', 'wrap-reverse'] as const;
    
    for (const wrap of wraps) {
      const { container } = render(
        <Flex wrap={wrap}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Flex>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  test('should not have accessibility violations with different gaps', async () => {
    const gaps = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
    
    for (const gap of gaps) {
      const { container } = render(
        <Flex gap={gap}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Flex>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  test('should not have accessibility violations with custom className', async () => {
    const { container } = render(
      <Flex className="custom-class">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Flex>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should not have accessibility violations with nested Flex components', async () => {
    const { container } = render(
      <Flex>
        <Flex direction="column">
          <div>Nested Item 1</div>
          <div>Nested Item 2</div>
        </Flex>
        <Flex direction="column">
          <div>Nested Item 3</div>
          <div>Nested Item 4</div>
        </Flex>
      </Flex>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});