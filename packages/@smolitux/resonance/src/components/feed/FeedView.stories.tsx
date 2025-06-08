import type { Meta, StoryObj } from '@storybook/react';
import { FeedView } from './FeedView';

const meta: Meta<typeof FeedView> = {
  title: 'Components/FeedView',
  component: FeedView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'FeedView',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom FeedView',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive FeedView',
    onClick: () => alert('Clicked!'),
  },
};
