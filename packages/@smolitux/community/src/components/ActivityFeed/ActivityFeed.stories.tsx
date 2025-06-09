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
    user: { id: 'u1', name: 'Alice', username: 'alice' },
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    target: { id: 'p1', type: 'post', title: 'Erster Post' },
  },
  {
    id: '2',
    type: 'comment',
    user: { id: 'u2', name: 'Bob', username: 'bob' },
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    target: {
      id: 'p1',
      type: 'comment',
      content: 'Tolles Projekt!'
    },
  },
  {
    id: '3',
    type: 'follow',
    user: { id: 'u3', name: 'Clara', username: 'clara' },
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    target: { id: 'u1', type: 'user', title: 'Alice' },
  },
];

export const Basic: Story = {
  render: () => <ActivityFeed activities={sample} />,
};
