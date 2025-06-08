import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TabView.fixed } from './TabView.fixed';

const meta: Meta<typeof TabView.fixed> = {
  title: 'Components/TabView.fixed',
  component: TabView.fixed,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'TabView.fixed',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom TabView.fixed',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive TabView.fixed',
    onClick: () => alert('Clicked!'),
  },
};
