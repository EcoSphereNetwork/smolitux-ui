import React from 'react';
import { render, screen } from '@testing-library/react';
import { PieChart } from './PieChart';

describe('PieChart', () => {
  it('renders without crashing', () => {
    render(<PieChart />);
    expect(screen.getByRole('button', { name: /PieChart/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<PieChart className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<PieChart ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
