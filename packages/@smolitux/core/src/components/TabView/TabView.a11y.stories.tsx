import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TabViewA11y from './TabView.a11y';

const meta: Meta<typeof TabViewA11y> = {
  title: 'Components/TabViewA11y',
  component: TabViewA11y,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'TabViewA11y',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom TabViewA11y',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive TabViewA11y',
    onClick: () => alert('Clicked!'),
  },
};
