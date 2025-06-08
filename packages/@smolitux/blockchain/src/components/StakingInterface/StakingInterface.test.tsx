import React from 'react';
import { render, screen } from '@testing-library/react';
import { StakingInterface } from './StakingInterface';

describe('StakingInterface', () => {
  it('renders without crashing', () => {
    render(<StakingInterface />);
    expect(screen.getByRole('button', { name: /StakingInterface/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<StakingInterface className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<StakingInterface ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
