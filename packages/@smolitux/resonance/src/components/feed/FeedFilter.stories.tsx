import type { Meta, StoryObj } from '@storybook/react';
import { FeedFilter } from './FeedFilter';

const meta: Meta<typeof FeedFilter> = {
  title: 'Components/FeedFilter',
  component: FeedFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'FeedFilter',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom FeedFilter',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive FeedFilter',
    onClick: () => alert('Clicked!'),
  },
};
