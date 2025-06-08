import type { Meta, StoryObj } from '@storybook/react';
import { Menu.original } from './Menu.original';

const meta: Meta<typeof Menu.original> = {
  title: 'Components/Menu.original',
  component: Menu.original,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Menu.original',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Menu.original',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Menu.original',
    onClick: () => alert('Clicked!'),
  },
};
