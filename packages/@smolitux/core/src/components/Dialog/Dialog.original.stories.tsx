import type { Meta, StoryObj } from '@storybook/react';
import { Dialog.original } from './Dialog.original';

const meta: Meta<typeof Dialog.original> = {
  title: 'Components/Dialog.original',
  component: Dialog.original,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Dialog.original',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Dialog.original',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Dialog.original',
    onClick: () => alert('Clicked!'),
  },
};
