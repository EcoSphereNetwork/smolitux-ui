import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActivityFeed } from './ActivityFeed';

describe('ActivityFeed', () => {
  it('renders without crashing', () => {
    render(<ActivityFeed />);
    expect(screen.getByRole('button', { name: /ActivityFeed/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ActivityFeed className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ActivityFeed ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
