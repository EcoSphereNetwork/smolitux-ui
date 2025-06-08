import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ActivityFeed, ActivityItem } from './ActivityFeed';

const meta: Meta<typeof ActivityFeed> = {
  title: 'Community/ActivityFeed',
  component: ActivityFeed,
};
export default meta;

type Story = StoryObj<typeof ActivityFeed>;

const sample: ActivityItem[] = [
  {
    id: '1',
    type: 'post',
    user: { id: 'u1', name: 'User', username: 'user' },
    timestamp: new Date(),
  },
];

export const Basic: Story = {
  render: () => <ActivityFeed activities={sample} />,
};
