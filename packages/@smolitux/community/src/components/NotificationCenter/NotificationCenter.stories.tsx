import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NotificationCenter } from './NotificationCenter';

const meta: Meta<typeof NotificationCenter> = {
  title: 'Components/NotificationCenter',
  component: NotificationCenter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const notifications = [
  { id: 'n1', message: 'Alice liked your post.' },
  { id: 'n2', message: 'Bob started following you.' },
];

export const Default: Story = {
  args: {
    notifications,
  },
};

export const NoNotifications: Story = {
  args: {
    notifications: [],
  },
};

export const ManyUnread: Story = {
  args: {
    notifications: Array.from({ length: 5 }).map((_, i) => ({
      id: `u${i}`,
      message: `Neue Nachricht ${i + 1}`,
    })),
  },
};
