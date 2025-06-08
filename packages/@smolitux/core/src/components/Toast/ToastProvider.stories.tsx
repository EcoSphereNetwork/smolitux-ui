import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider } from './ToastProvider';

const meta: Meta<typeof ToastProvider> = {
  title: 'Components/ToastProvider',
  component: ToastProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ToastProvider',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom ToastProvider',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive ToastProvider',
    onClick: () => alert('Clicked!'),
  },
};
