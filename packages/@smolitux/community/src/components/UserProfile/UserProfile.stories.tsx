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

export const Default: Story = {
  args: {
    children: 'UserProfile',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom UserProfile',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive UserProfile',
    onClick: () => alert('Clicked!'),
  },
};
