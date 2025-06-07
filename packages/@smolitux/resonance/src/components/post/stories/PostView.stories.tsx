import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PostView } from '../PostView';
import { FeedItemData } from '../../feed/FeedItem';

const meta: Meta<typeof PostView> = {
  title: 'Resonance/Post/PostView',
  component: PostView,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PostView>;

const post: FeedItemData = {
  id: '1',
  author: { id: 'u1', name: 'Alice', avatar: 'https://placehold.co/48' },
  createdAt: new Date().toISOString(),
  contentType: 'text',
  content: { text: 'Post detail' },
  stats: { likes: 5, comments: 1, shares: 0, views: 50 },
};

export const Default: Story = {
  args: { post },
};
