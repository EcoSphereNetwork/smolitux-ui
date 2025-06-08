import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MediaPlayer.original } from './MediaPlayer.original';

const meta: Meta<typeof MediaPlayer.original> = {
  title: 'Components/MediaPlayer.original',
  component: MediaPlayer.original,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'MediaPlayer.original',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom MediaPlayer.original',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive MediaPlayer.original',
    onClick: () => alert('Clicked!'),
  },
};
