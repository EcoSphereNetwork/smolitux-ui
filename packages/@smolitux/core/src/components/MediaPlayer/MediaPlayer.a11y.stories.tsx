import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MediaPlayerA11y from './MediaPlayer.a11y';

const meta: Meta<typeof MediaPlayerA11y> = {
  title: 'Components/MediaPlayerA11y',
  component: MediaPlayerA11y,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'MediaPlayerA11y',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom MediaPlayerA11y',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive MediaPlayerA11y',
    onClick: () => alert('Clicked!'),
  },
};
