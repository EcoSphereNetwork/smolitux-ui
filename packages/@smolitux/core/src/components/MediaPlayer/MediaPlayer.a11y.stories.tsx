import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MediaPlayer.a11y } from './MediaPlayer.a11y';

const meta: Meta<typeof MediaPlayer.a11y> = {
  title: 'Components/MediaPlayer.a11y',
  component: MediaPlayer.a11y,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'MediaPlayer.a11y',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom MediaPlayer.a11y',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive MediaPlayer.a11y',
    onClick: () => alert('Clicked!'),
  },
};
