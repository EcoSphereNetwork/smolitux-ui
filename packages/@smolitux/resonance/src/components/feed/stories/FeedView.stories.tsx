import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FeedView } from '../FeedView';
import { FeedItemData } from '../FeedItem';

const meta: Meta<typeof FeedView> = {
  title: 'Resonance/Feed/FeedView',
  component: FeedView,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FeedView>;

const items: FeedItemData[] = [
  {
    id: '1',
    author: { id: 'u1', name: 'Alice', avatar: 'https://placehold.co/40' },
    createdAt: new Date().toISOString(),
    contentType: 'text',
    content: { text: 'Example post' },
    stats: { likes: 2, comments: 0, shares: 0, views: 10 },
  },
];

export const Default: Story = {
  args: { feedItems: items },
};
