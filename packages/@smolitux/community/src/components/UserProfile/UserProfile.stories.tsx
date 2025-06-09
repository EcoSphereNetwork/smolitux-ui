import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UserProfile } from './UserProfile';

const meta: Meta<typeof UserProfile> = {
  title: 'Components/UserProfile',
  component: UserProfile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const demoProfile = {
  userId: 'u1',
  username: 'alice',
  displayName: 'Alice Example',
  avatarUrl: 'https://i.pravatar.cc/150?img=1',
  coverImageUrl: 'https://picsum.photos/800/200',
  bio: 'Open source enthusiast and coffee lover.',
  joinDate: new Date('2024-01-15'),
  stats: {
    followers: 120,
    following: 80,
    contentCount: 42,
    totalLikes: 350,
    totalViews: 1000,
  },
};

export const Default: Story = {
  args: demoProfile,
};

export const WithSocialLinks: Story = {
  args: {
    ...demoProfile,
    socialLinks: {
      twitter: 'https://twitter.com/alice',
      website: 'https://example.com',
    },
  },
};
