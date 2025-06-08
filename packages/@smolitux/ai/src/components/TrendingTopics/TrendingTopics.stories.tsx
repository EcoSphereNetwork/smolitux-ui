import type { Meta, StoryObj } from '@storybook/react';
import { TrendingTopics } from './TrendingTopics';

const meta: Meta<typeof TrendingTopics> = {
  title: 'Components/TrendingTopics',
  component: TrendingTopics,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'TrendingTopics',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom TrendingTopics',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive TrendingTopics',
    onClick: () => alert('Clicked!'),
  },
};
