import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Flex } from '../Flex';

describe('Flex', () => {
  it('renders with flex styles', () => {
    const { container } = render(<Flex data-testid="flex" gap={4} />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveStyle({ display: 'flex' });
    expect(div).toHaveStyle({ gap: '4' });
  });
});
