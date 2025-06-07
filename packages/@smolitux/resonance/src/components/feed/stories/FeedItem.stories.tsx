import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FeedItem, FeedItemData } from '../FeedItem';

const meta: Meta<typeof FeedItem> = {
  title: 'Resonance/Feed/FeedItem',
  component: FeedItem,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FeedItem>;

const demoItem: FeedItemData = {
  id: '1',
  author: { id: 'u1', name: 'Alice', avatar: 'https://placehold.co/40' },
  createdAt: new Date().toISOString(),
  contentType: 'text',
  content: { text: 'Hello world' },
  stats: { likes: 4, comments: 1, shares: 0, views: 25 },
};

export const Default: Story = {
  args: { item: demoItem },
};
