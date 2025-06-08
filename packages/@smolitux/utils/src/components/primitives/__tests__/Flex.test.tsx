import React from 'react';
import { render } from '@testing-library/react';
import { Flex } from '../Flex';

describe('Flex', () => {
  it('renders children in a flex container', () => {
    const { container } = render(
      <Flex data-testid="flex" gap={8}>
        <div>one</div>
        <div>two</div>
      </Flex>
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveStyle('display: flex');
    expect(el).toHaveStyle('gap: 8px');
  });

  it('supports column direction', () => {
    const { container } = render(<Flex direction="column" />);
    expect(container.firstChild).toHaveStyle('flex-direction: column');
  });
});
