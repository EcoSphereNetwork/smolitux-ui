import type { Meta, StoryObj } from '@storybook/react';
import { MediaGrid, MediaItem } from './MediaGrid';

const demoItems: MediaItem[] = [
  {
    id: '1',
    title: 'Bild 1',
    url: 'https://via.placeholder.com/400x300',
    thumbnailUrl: 'https://via.placeholder.com/400x300',
    type: 'image',
    creator: { id: 'u1', name: 'Alice' },
    createdAt: new Date(),
    views: 10,
    likes: 1,
    comments: 0,
  },
  {
    id: '2',
    title: 'Bild 2',
    url: 'https://via.placeholder.com/400x300',
    thumbnailUrl: 'https://via.placeholder.com/400x300',
    type: 'image',
    creator: { id: 'u2', name: 'Bob' },
    createdAt: new Date(),
    views: 5,
    likes: 0,
    comments: 0,
  },
];

const meta: Meta<typeof MediaGrid> = {
  title: 'Media/MediaGrid',
  component: MediaGrid,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    items: demoItems,
    showFilters: false,
  },
};

export const WithFilters: Story = {
  args: {
    items: demoItems,
    showFilters: true,
  },
};

export const Responsive: Story = {
  args: {
    items: demoItems,
    columns: 3,
    gap: 'medium',
  },
};
