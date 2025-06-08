import type { Meta, StoryObj } from '@storybook/react';
import { MediaGrid } from './MediaGrid';

const meta: Meta<typeof MediaGrid> = {
  title: 'Components/MediaGrid',
  component: MediaGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'MediaGrid',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom MediaGrid',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive MediaGrid',
    onClick: () => alert('Clicked!'),
  },
};
