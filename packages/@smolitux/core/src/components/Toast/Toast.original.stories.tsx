import type { Meta, StoryObj } from '@storybook/react';
import { Toast.original } from './Toast.original';

const meta: Meta<typeof Toast.original> = {
  title: 'Components/Toast.original',
  component: Toast.original,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Toast.original',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Toast.original',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Toast.original',
    onClick: () => alert('Clicked!'),
  },
};
