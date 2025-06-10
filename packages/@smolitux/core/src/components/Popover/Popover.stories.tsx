import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Popover',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Popover',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Popover',
    onClick: () => alert('Clicked!'),
  },
};

export const WithCloseButton: Story = {
  args: {
    content: 'Closable content',
    showCloseButton: true,
    children: <button>Trigger</button>,
  },
};
