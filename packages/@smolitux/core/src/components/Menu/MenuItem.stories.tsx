import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from './MenuItem';

const meta: Meta<typeof MenuItem> = {
  title: 'Components/MenuItem',
  component: MenuItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'MenuItem',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom MenuItem',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive MenuItem',
    onClick: () => alert('Clicked!'),
  },
};
