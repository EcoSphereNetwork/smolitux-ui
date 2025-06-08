import type { Meta, StoryObj } from '@storybook/react';
import { Index } from './Index';

const meta: Meta<typeof Index> = {
  title: 'Components/Index',
  component: Index,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Index',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Index',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Index',
    onClick: () => alert('Clicked!'),
  },
};
