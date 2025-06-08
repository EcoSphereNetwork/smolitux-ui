import type { Meta, StoryObj } from '@storybook/react';
import { index } from './index';

const meta: Meta<typeof index> = {
  title: 'Components/index',
  component: index,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'index',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom index',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive index',
    onClick: () => alert('Clicked!'),
  },
};
