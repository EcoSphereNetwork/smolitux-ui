import type { Meta, StoryObj } from '@storybook/react';
import { Button.fixed } from './Button.fixed';

const meta: Meta<typeof Button.fixed> = {
  title: 'Components/Button.fixed',
  component: Button.fixed,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button.fixed',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Button.fixed',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Button.fixed',
    onClick: () => alert('Clicked!'),
  },
};
