import type { Meta, StoryObj } from '@storybook/react';
import { FeedItem, FeedItemData } from './FeedItem';

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

const demoItem: FeedItemData = {
  id: '1',
  author: { id: 'u1', name: 'Alice', avatar: 'https://placehold.co/40' },
  createdAt: new Date().toISOString(),
  contentType: 'text',
  content: { text: 'Hello world' },
  stats: { likes: 0, comments: 0, shares: 0, views: 0 },
};

export const Default: Story = {
  args: {
    item: demoItem,
  },
};

export const CustomStyle: Story = {
  args: {
    item: demoItem,
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    item: demoItem,
    onClick: () => alert('Clicked!'),
  },
};
