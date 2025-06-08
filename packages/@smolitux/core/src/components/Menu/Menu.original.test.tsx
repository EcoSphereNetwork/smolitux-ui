import React from 'react';
import { render, screen } from '@testing-library/react';
import { Menu.original } from './Menu.original';

describe('Menu.original', () => {
  it('renders without crashing', () => {
    render(<Menu.original />);
    expect(screen.getByRole('button', { name: /Menu.original/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Menu.original className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Menu.original ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
