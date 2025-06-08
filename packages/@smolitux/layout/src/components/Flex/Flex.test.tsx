import React from 'react';
import { render, screen } from '@testing-library/react';
import { Flex } from './Flex';

describe('Flex', () => {
  it('renders without crashing', () => {
    render(<Flex data-testid="flex" />);
    expect(screen.getByTestId('flex')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Flex data-testid="flex" className="custom-class" />);
    expect(screen.getByTestId('flex')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Flex ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
