import React from 'react';
import { render, screen } from '@testing-library/react';
import { Navigation } from './Navigation';

const items = [{ id: 'home', label: 'Home', href: '#' }];

describe('Navigation', () => {
  it('renders without crashing', () => {
    render(<Navigation items={items} data-testid="nav" />);
    expect(screen.getByTestId('nav')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Navigation items={items} data-testid="nav" className="custom" />);
    const ul = screen.getByTestId('nav').querySelector('ul');
    expect(ul).toHaveClass('custom');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Navigation ref={ref} items={items} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
