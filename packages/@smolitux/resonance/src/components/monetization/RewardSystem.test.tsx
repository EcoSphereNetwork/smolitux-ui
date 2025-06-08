import React from 'react';
import { render, screen } from '@testing-library/react';
import { RewardSystem } from './RewardSystem';

describe('RewardSystem', () => {
  it('renders without crashing', () => {
    render(<RewardSystem />);
    expect(screen.getByRole('button', { name: /RewardSystem/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<RewardSystem className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<RewardSystem ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
