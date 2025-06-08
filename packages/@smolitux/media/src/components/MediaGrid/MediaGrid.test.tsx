import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MediaGrid, MediaItem } from './MediaGrid';

const items: MediaItem[] = [
  {
    id: '1',
    title: 'Bild 1',
    url: 'img1.jpg',
    thumbnailUrl: 'thumb1.jpg',
    type: 'image',
    creator: { id: 'u1', name: 'Alice' },
    createdAt: new Date(),
    views: 1,
    likes: 0,
    comments: 0,
  },
  {
    id: '2',
    title: 'Bild 2',
    url: 'img2.jpg',
    thumbnailUrl: 'thumb2.jpg',
    type: 'image',
    creator: { id: 'u2', name: 'Bob' },
    createdAt: new Date(),
    views: 2,
    likes: 0,
    comments: 0,
  },
];

describe('MediaGrid', () => {
  it('renders items', () => {
    render(<MediaGrid items={items} />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('fires onItemClick', () => {
    const onItemClick = jest.fn();
    render(<MediaGrid items={items} onItemClick={onItemClick} />);
    fireEvent.click(screen.getAllByRole('img')[0]);
    expect(onItemClick).toHaveBeenCalledWith(items[0]);
  });
});
