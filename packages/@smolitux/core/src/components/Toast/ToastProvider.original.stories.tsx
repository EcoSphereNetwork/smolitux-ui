import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider.original } from './ToastProvider.original';

const meta: Meta<typeof ToastProvider.original> = {
  title: 'Components/ToastProvider.original',
  component: ToastProvider.original,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ToastProvider.original',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom ToastProvider.original',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive ToastProvider.original',
    onClick: () => alert('Clicked!'),
  },
};
