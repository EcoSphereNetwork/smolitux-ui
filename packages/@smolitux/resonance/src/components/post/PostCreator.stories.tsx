import type { Meta, StoryObj } from '@storybook/react';
import { PostCreator } from './PostCreator';

const meta: Meta<typeof PostCreator> = {
  title: 'Components/PostCreator',
  component: PostCreator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'PostCreator',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom PostCreator',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive PostCreator',
    onClick: () => alert('Clicked!'),
  },
};
