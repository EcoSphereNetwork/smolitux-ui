import React from 'react';
import { render, screen } from '@testing-library/react';
import { TrendingTopics } from './TrendingTopics';

describe('TrendingTopics', () => {
  it('renders without crashing', () => {
    render(<TrendingTopics />);
    expect(screen.getByRole('button', { name: /TrendingTopics/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<TrendingTopics className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<TrendingTopics ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
