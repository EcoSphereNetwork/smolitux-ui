import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileHeader } from '../ProfileHeader';

const meta: Meta<typeof ProfileHeader> = {
  title: 'Resonance/Profile/ProfileHeader',
  component: ProfileHeader,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ProfileHeader>;

export const Default: Story = {
  args: {
    username: 'Alice',
    avatar: 'https://placehold.co/80',
    followerCount: 10,
    followingCount: 5,
    postCount: 3,
  },
};
