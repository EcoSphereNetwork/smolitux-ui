import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CommentSection } from './CommentSection';

const meta: Meta<typeof CommentSection> = {
  title: 'Components/CommentSection',
  component: CommentSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'CommentSection',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom CommentSection',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive CommentSection',
    onClick: () => alert('Clicked!'),
  },
};
