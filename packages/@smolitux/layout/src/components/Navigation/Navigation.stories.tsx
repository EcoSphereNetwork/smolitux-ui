import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from './Navigation';

const meta: Meta<typeof Navigation> = {
  title: 'Layout/Navigation',
  component: Navigation,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Navigation>;

const sampleItems = [
  { id: 'home', label: 'Home', href: '#' },
  { id: 'about', label: 'About', href: '#' },
  { id: 'contact', label: 'Contact', href: '#' },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const Vertical: Story = {
  args: {
    items: sampleItems,
    orientation: 'vertical',
  },
};

export const Responsive: Story = {
  args: {
    items: sampleItems,
    orientation: { base: 'vertical', md: 'horizontal' },
  },
};
