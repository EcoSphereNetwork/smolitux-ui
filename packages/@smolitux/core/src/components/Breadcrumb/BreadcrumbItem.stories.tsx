import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BreadcrumbItem } from './BreadcrumbItem';

const meta: Meta<typeof BreadcrumbItem> = {
  title: 'Components/BreadcrumbItem',
  component: BreadcrumbItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'BreadcrumbItem',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom BreadcrumbItem',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive BreadcrumbItem',
    onClick: () => alert('Clicked!'),
  },
};
