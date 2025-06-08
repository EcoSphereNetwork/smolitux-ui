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

export const Default: Story = {
  args: {
    children: 'NotificationCenter',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom NotificationCenter',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive NotificationCenter',
    onClick: () => alert('Clicked!'),
  },
};
