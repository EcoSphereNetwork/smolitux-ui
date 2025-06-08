import type { Meta, StoryObj } from '@storybook/react';
import { ActivityStream } from './ActivityStream';

const meta: Meta<typeof ActivityStream> = {
  title: 'Components/ActivityStream',
  component: ActivityStream,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ActivityStream',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom ActivityStream',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive ActivityStream',
    onClick: () => alert('Clicked!'),
  },
};
