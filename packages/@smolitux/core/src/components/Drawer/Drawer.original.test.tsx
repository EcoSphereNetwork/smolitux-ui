import React from 'react';
import { render, screen } from '@testing-library/react';
import { Drawer.original } from './Drawer.original';

describe('Drawer.original', () => {
  it('renders without crashing', () => {
    render(<Drawer.original />);
    expect(screen.getByRole('button', { name: /Drawer.original/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Drawer.original className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Drawer.original ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
