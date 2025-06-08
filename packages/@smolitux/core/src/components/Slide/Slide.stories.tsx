import type { Meta, StoryObj } from '@storybook/react';
import { Slide } from './Slide';

const meta: Meta<typeof Slide> = {
  title: 'Components/Slide',
  component: Slide,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Slide',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Slide',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Slide',
    onClick: () => alert('Clicked!'),
  },
};
