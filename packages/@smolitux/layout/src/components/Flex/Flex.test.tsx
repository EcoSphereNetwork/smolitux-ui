import React from 'react';
import { render, screen } from '@testing-library/react';
import { Flex } from './Flex';

describe('Flex', () => {
  it('renders without crashing', () => {
    render(<Flex />);
    expect(screen.getByRole('button', { name: /Flex/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Flex className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Flex ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
