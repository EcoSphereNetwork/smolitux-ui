import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: /Header/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Header className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Header ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
