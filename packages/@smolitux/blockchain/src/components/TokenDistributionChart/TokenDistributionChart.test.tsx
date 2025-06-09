import React from 'react';
import { render, screen } from '@testing-library/react';
import { TokenDistributionChart } from './TokenDistributionChart';

describe('TokenDistributionChart', () => {
  it('renders without crashing', () => {
    render(<TokenDistributionChart />);
    expect(screen.getByTestId('TokenDistributionChart')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<TokenDistributionChart className="custom-class" />);
    const element = screen.getByTestId('TokenDistributionChart');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<TokenDistributionChart ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles children prop correctly', () => {
    render(<TokenDistributionChart>Test Content</TokenDistributionChart>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<TokenDistributionChart />);
    const element = screen.getByTestId('TokenDistributionChart');
    expect(element).toBeInTheDocument();
  });
});
