import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'List',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom List',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive List',
    onClick: () => alert('Clicked!'),
  },
};
