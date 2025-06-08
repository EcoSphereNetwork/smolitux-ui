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
    children: 'FollowButton',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom FollowButton',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive FollowButton',
    onClick: () => alert('Clicked!'),
  },
};
