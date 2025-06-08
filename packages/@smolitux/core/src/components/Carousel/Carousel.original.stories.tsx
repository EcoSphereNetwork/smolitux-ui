import type { Meta, StoryObj } from '@storybook/react';
import { Carousel.original } from './Carousel.original';

const meta: Meta<typeof Carousel.original> = {
  title: 'Components/Carousel.original',
  component: Carousel.original,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Carousel.original',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Carousel.original',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Carousel.original',
    onClick: () => alert('Clicked!'),
  },
};
