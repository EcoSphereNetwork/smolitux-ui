import React from 'react';
import { render, screen } from '@testing-library/react';
import { AreaChart } from './AreaChart';

describe('AreaChart', () => {
  it('renders without crashing', () => {
    render(<AreaChart />);
    expect(screen.getByRole('button', { name: /AreaChart/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<AreaChart className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<AreaChart ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
