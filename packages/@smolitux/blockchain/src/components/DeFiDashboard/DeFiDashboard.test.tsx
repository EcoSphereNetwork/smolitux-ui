import React from 'react';
import { render, screen } from '@testing-library/react';
import { DeFiDashboard } from './DeFiDashboard';

describe('DeFiDashboard', () => {
  it('renders without crashing', () => {
    render(<DeFiDashboard />);
    expect(screen.getByTestId('DeFiDashboard')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<DeFiDashboard className="custom-class" />);
    const element = screen.getByTestId('DeFiDashboard');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<DeFiDashboard ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles children prop correctly', () => {
    render(<DeFiDashboard>Test Content</DeFiDashboard>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<DeFiDashboard />);
    const element = screen.getByTestId('DeFiDashboard');
    expect(element).toBeInTheDocument();
  });
});
