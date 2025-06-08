import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Popover.original } from './Popover.original';

const meta: Meta<typeof Popover.original> = {
  title: 'Components/Popover.original',
  component: Popover.original,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Popover.original',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Popover.original',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Popover.original',
    onClick: () => alert('Clicked!'),
  },
};
