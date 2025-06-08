import React from 'react';
import { render, screen } from '@testing-library/react';
import { MenuItem } from './MenuItem';

describe('MenuItem', () => {
  it('renders without crashing', () => {
    render(<MenuItem />);
    expect(screen.getByRole('button', { name: /MenuItem/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<MenuItem className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<MenuItem ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
