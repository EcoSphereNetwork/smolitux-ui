import React from 'react';
import { render, screen } from '@testing-library/react';
import { TokenDistributionChart } from './TokenDistributionChart';

describe('TokenDistributionChart', () => {
  it('renders without crashing', () => {
    render(<TokenDistributionChart />);
    expect(screen.getByRole('button', { name: /TokenDistributionChart/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<TokenDistributionChart className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<TokenDistributionChart ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
