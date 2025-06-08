import type { Meta, StoryObj } from '@storybook/react';
import { Heatmap } from './Heatmap';

const meta: Meta<typeof Heatmap> = {
  title: 'Components/Heatmap',
  component: Heatmap,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Heatmap',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Heatmap',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Heatmap',
    onClick: () => alert('Clicked!'),
  },
};
