import type { Meta, StoryObj } from '@storybook/react';
import { FeedSidebar } from './FeedSidebar';

const meta: Meta<typeof FeedSidebar> = {
  title: 'Components/FeedSidebar',
  component: FeedSidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'FeedSidebar',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom FeedSidebar',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive FeedSidebar',
    onClick: () => alert('Clicked!'),
  },
};
