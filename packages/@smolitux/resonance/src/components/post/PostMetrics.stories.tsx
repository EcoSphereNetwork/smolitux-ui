import type { Meta, StoryObj } from '@storybook/react';
import { PostMetrics } from './PostMetrics';

const meta: Meta<typeof PostMetrics> = {
  title: 'Components/PostMetrics',
  component: PostMetrics,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'PostMetrics',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom PostMetrics',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive PostMetrics',
    onClick: () => alert('Clicked!'),
  },
};
