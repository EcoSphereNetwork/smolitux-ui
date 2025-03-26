import React from 'react';
import { render, screen } from '@testing-library/react';
import { Flex } from '../Flex';

describe('Flex', () => {
  it('renders correctly with default props', () => {
    render(
      <Flex data-testid="flex-container">
        <div>Flex content</div>
      </Flex>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toBeInTheDocument();
    expect(flexContainer).toHaveStyle('display: flex');
    expect(screen.getByText('Flex content')).toBeInTheDocument();
  });

  it('renders with row direction by default', () => {
    render(
      <Flex data-testid="flex-container">
        <div>Flex content</div>
      </Flex>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveStyle('flex-direction: row');
  });

  it('renders with column direction when specified', () => {
    render(
      <Flex direction="column" data-testid="flex-container">
        <div>Flex content</div>
      </Flex>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveStyle('flex-direction: column');
  });

  it('renders with custom align items', () => {
    render(
      <Flex align="center" data-testid="flex-container">
        <div>Flex content</div>
      </Flex>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveStyle('align-items: center');
  });

  it('renders with custom justify content', () => {
    render(
      <Flex justify="space-between" data-testid="flex-container">
        <div>Flex content</div>
      </Flex>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveStyle('justify-content: space-between');
  });

  it('renders with custom wrap', () => {
    render(
      <Flex wrap="wrap" data-testid="flex-container">
        <div>Flex content</div>
      </Flex>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveStyle('flex-wrap: wrap');
  });

  it('renders with custom gap', () => {
    render(
      <Flex gap="10px" data-testid="flex-container">
        <div>Flex content</div>
      </Flex>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveStyle('gap: 10px');
  });

  it('renders with custom flex basis', () => {
    render(
      <Flex basis="50%" data-testid="flex-container">
        <div>Flex content</div>
      </Flex>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveStyle('flex-basis: 50%');
  });

  it('renders with custom flex grow', () => {
    render(
      <Flex grow={1} data-testid="flex-container">
        <div>Flex content</div>
      </Flex>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveStyle('flex-grow: 1');
  });

  it('renders with custom flex shrink', () => {
    render(
      <Flex shrink={0} data-testid="flex-container">
        <div>Flex content</div>
      </Flex>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveStyle('flex-shrink: 0');
  });

  it('renders with custom className', () => {
    render(
      <Flex className="custom-flex" data-testid="flex-container">
        <div>Flex content</div>
      </Flex>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveClass('custom-flex');
  });

  it('renders with custom style', () => {
    render(
      <Flex style={{ backgroundColor: 'red' }} data-testid="flex-container">
        <div>Flex content</div>
      </Flex>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveStyle('background-color: red');
  });

  it('renders with custom width', () => {
    render(
      <Flex width="300px" data-testid="flex-container">
        <div>Flex content</div>
      </Flex>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveStyle('width: 300px');
  });

  it('renders with custom height', () => {
    render(
      <Flex height="200px" data-testid="flex-container">
        <div>Flex content</div>
      </Flex>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveStyle('height: 200px');
  });

  it('renders with custom padding', () => {
    render(
      <Flex padding="10px" data-testid="flex-container">
        <div>Flex content</div>
      </Flex>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveStyle('padding: 10px');
  });

  it('renders with custom margin', () => {
    render(
      <Flex margin="10px" data-testid="flex-container">
        <div>Flex content</div>
      </Flex>
    );
    
    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveStyle('margin: 10px');
  });
});