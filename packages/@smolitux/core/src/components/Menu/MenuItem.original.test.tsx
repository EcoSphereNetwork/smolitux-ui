import React from 'react';
import { render, screen } from '@testing-library/react';
import { MenuItem.original } from './MenuItem.original';

describe('MenuItem.original', () => {
  it('renders without crashing', () => {
    render(<MenuItem.original />);
    expect(screen.getByRole('button', { name: /MenuItem.original/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<MenuItem.original className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<MenuItem.original ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
