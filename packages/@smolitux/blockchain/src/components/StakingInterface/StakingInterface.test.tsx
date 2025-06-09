import React from 'react';
import { render, screen } from '@testing-library/react';
import { StakingInterface } from './StakingInterface';

describe('StakingInterface', () => {
  it('renders without crashing', () => {
    render(<StakingInterface />);
    expect(screen.getByTestId('StakingInterface')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<StakingInterface className="custom-class" />);
    const element = screen.getByTestId('StakingInterface');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<StakingInterface ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles children prop correctly', () => {
    render(<StakingInterface>Test Content</StakingInterface>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<StakingInterface />);
    const element = screen.getByTestId('StakingInterface');
    expect(element).toBeInTheDocument();
  });
});
