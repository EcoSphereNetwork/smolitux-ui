import React from 'react';
import { render, screen } from '@testing-library/react';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  it('renders without crashing', () => {
    render(<Drawer />);
    expect(screen.getByRole('button', { name: /Drawer/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Drawer className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Drawer ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
