import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Drawer',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Drawer',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Drawer',
    onClick: () => alert('Clicked!'),
  },
};
