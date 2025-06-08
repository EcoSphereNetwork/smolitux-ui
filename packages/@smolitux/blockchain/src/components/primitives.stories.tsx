import type { Meta, StoryObj } from '@storybook/react';
import { primitives } from './primitives';

const meta: Meta<typeof primitives> = {
  title: 'Components/primitives',
  component: primitives,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'primitives',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom primitives',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive primitives',
    onClick: () => alert('Clicked!'),
  },
};
