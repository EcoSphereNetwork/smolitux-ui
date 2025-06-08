import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem.original } from './MenuItem.original';

const meta: Meta<typeof MenuItem.original> = {
  title: 'Components/MenuItem.original',
  component: MenuItem.original,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'MenuItem.original',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom MenuItem.original',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive MenuItem.original',
    onClick: () => alert('Clicked!'),
  },
};
