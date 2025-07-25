import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders without crashing', () => {
    render(<Card />);
    expect(screen.getByRole('button', { name: /Card/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Card className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Card ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
