import type { Meta, StoryObj } from '@storybook/react';
import { AnimatePresence } from './AnimatePresence';

const meta: Meta<typeof AnimatePresence> = {
  title: 'Components/AnimatePresence',
  component: AnimatePresence,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'AnimatePresence',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom AnimatePresence',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive AnimatePresence',
    onClick: () => alert('Clicked!'),
  },
};
