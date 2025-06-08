import type { Meta, StoryObj } from '@storybook/react';
import { Motion } from './Motion';

const meta: Meta<typeof Motion> = {
  title: 'Components/Motion',
  component: Motion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Motion',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Motion',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Motion',
    onClick: () => alert('Clicked!'),
  },
};
