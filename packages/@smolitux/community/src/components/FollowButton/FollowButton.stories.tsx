import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FollowButton } from './FollowButton';

const meta: Meta<typeof FollowButton> = {
  title: 'Components/FollowButton',
  component: FollowButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userId: 'u1',
    onFollowChange: async () => {},
  },
};

export const Following: Story = {
  args: {
    userId: 'u1',
    isFollowing: true,
    onFollowChange: async () => {},
  },
};
