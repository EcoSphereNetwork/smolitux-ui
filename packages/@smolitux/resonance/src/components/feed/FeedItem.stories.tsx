import type { Meta, StoryObj } from '@storybook/react';
import { FeedItem } from './FeedItem';

const meta: Meta<typeof FeedItem> = {
  title: 'Components/FeedItem',
  component: FeedItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'FeedItem',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom FeedItem',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive FeedItem',
    onClick: () => alert('Clicked!'),
  },
};
