import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PostInteractions } from '../PostInteractions';

const meta: Meta<typeof PostInteractions> = {
  title: 'Resonance/Post/PostInteractions',
  component: PostInteractions,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PostInteractions>;

export const Default: Story = {
  args: { likeCount: 3, commentCount: 1, shareCount: 0, viewCount: 10 },
};
