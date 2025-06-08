import type { Meta, StoryObj } from '@storybook/react';
import { MediaCarousel } from './MediaCarousel';

const meta: Meta<typeof MediaCarousel> = {
  title: 'Components/MediaCarousel',
  component: MediaCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'MediaCarousel',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom MediaCarousel',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive MediaCarousel',
    onClick: () => alert('Clicked!'),
  },
};
