import React from 'react';
import { render, screen } from '@testing-library/react';
import { BarChart } from './BarChart';

describe('BarChart', () => {
  it('renders without crashing', () => {
    render(<BarChart />);
    expect(screen.getByRole('button', { name: /BarChart/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<BarChart className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<BarChart ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
