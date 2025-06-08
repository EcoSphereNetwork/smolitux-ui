import type { Meta, StoryObj } from '@storybook/react';
import { PostInteractions } from './PostInteractions';

const meta: Meta<typeof PostInteractions> = {
  title: 'Components/PostInteractions',
  component: PostInteractions,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'PostInteractions',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom PostInteractions',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive PostInteractions',
    onClick: () => alert('Clicked!'),
  },
};
