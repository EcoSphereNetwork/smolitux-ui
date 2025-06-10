import React from 'react';
import { render, screen } from '@testing-library/react';
import { FeedItem, FeedItemData } from './FeedItem';

describe('FeedItem', () => {
  const demoItem: FeedItemData = {
    id: '1',
    author: { id: 'u1', name: 'Alice', avatar: 'https://placehold.co/40' },
    createdAt: new Date().toISOString(),
    contentType: 'text',
    content: { text: 'Hello world' },
    stats: { likes: 0, comments: 0, shares: 0, views: 0 },
  };

  it('renders without crashing', () => {
    render(<FeedItem item={demoItem} />);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<FeedItem item={demoItem} className="custom" />);
    expect(screen.getByTestId('card')).toHaveClass('feed-item custom');
  });

  it('forwards ref to root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<FeedItem item={demoItem} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
