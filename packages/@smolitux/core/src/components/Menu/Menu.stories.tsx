import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Menu',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Menu',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Menu',
    onClick: () => alert('Clicked!'),
  },
};
