import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CommentSection } from './CommentSection';

const meta: Meta<typeof CommentSection> = {
  title: 'Components/CommentSection',
  component: CommentSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const comments = [
  {
    id: 'c1',
    content: 'Great post!',
    author: { id: 'u2', name: 'Bob' },
    createdAt: new Date(),
    likes: 2,
    replies: [],
  },
  {
    id: 'c2',
    content: 'Thanks for sharing.',
    author: { id: 'u3', name: 'Clara' },
    createdAt: new Date(),
    likes: 0,
    replies: [],
  },
];

export const Default: Story = {
  args: {
    comments,
    onAddComment: async () => {},
    onLikeComment: async () => {},
  },
};
