import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TabView.a11y } from './TabView.a11y';

const meta: Meta<typeof TabView.a11y> = {
  title: 'Components/TabView.a11y',
  component: TabView.a11y,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'TabView.a11y',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom TabView.a11y',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive TabView.a11y',
    onClick: () => alert('Clicked!'),
  },
};
