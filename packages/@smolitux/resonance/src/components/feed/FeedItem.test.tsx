import React from 'react';
import { render, screen } from '@testing-library/react';
import { FeedItem } from './FeedItem';

describe('FeedItem', () => {
  it('renders without crashing', () => {
    render(<FeedItem />);
    expect(screen.getByRole('button', { name: /FeedItem/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<FeedItem className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<FeedItem ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
