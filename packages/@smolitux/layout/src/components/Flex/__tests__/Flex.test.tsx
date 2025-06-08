import React from 'react';
import { render } from '@testing-library/react';
import { Flex } from '../Flex';

describe('Flex', () => {
  it('applies responsive direction classes', () => {
    const { container } = render(<Flex direction={{ sm: 'column', md: 'row' }} />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('sm:flex-col');
    expect(el).toHaveClass('md:flex-row');
  });

  it('applies responsive gap classes', () => {
    const { container } = render(<Flex gap={{ sm: 2, lg: 6 }} />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('sm:gap-2');
    expect(el).toHaveClass('lg:gap-6');
  });
});
