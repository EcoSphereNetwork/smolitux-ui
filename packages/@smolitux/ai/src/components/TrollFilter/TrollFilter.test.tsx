import React from 'react';
import { render, screen } from '@testing-library/react';
import { TrollFilter } from './TrollFilter';

describe('TrollFilter', () => {
  it('renders without crashing', () => {
    render(<TrollFilter />);
    expect(screen.getByRole('button', { name: /TrollFilter/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<TrollFilter className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<TrollFilter ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
