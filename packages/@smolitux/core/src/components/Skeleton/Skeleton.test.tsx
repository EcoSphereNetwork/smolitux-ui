import React from 'react';
import { render, screen } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders without crashing', () => {
    render(<Skeleton />);
    expect(screen.getByRole('button', { name: /Skeleton/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Skeleton className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
