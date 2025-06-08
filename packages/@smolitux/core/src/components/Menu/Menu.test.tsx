import React from 'react';
import { render, screen } from '@testing-library/react';
import { Menu } from './Menu';

describe('Menu', () => {
  it('renders without crashing', () => {
    render(<Menu />);
    expect(screen.getByRole('button', { name: /Menu/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Menu className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Menu ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
