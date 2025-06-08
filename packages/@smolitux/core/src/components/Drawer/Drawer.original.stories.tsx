import type { Meta, StoryObj } from '@storybook/react';
import { Drawer.original } from './Drawer.original';

const meta: Meta<typeof Drawer.original> = {
  title: 'Components/Drawer.original',
  component: Drawer.original,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Drawer.original',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Drawer.original',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Drawer.original',
    onClick: () => alert('Clicked!'),
  },
};
