import React from 'react';
import { render, screen } from '@testing-library/react';
import { FeedFilter } from './FeedFilter';

describe('FeedFilter', () => {
  it('renders without crashing', () => {
    render(<FeedFilter />);
    expect(screen.getByRole('button', { name: /FeedFilter/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<FeedFilter className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<FeedFilter ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
