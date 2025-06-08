import type { Meta, StoryObj } from '@storybook/react';
import { PostView } from './PostView';

const meta: Meta<typeof PostView> = {
  title: 'Components/PostView',
  component: PostView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'PostView',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom PostView',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive PostView',
    onClick: () => alert('Clicked!'),
  },
};
