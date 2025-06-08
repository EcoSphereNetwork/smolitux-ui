import React from 'react';
import { render, screen } from '@testing-library/react';
import { FeedSidebar } from './FeedSidebar';

describe('FeedSidebar', () => {
  it('renders without crashing', () => {
    render(<FeedSidebar />);
    expect(screen.getByRole('button', { name: /FeedSidebar/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<FeedSidebar className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<FeedSidebar ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
