import type { Meta, StoryObj } from '@storybook/react';
import { ScatterPlot } from './ScatterPlot';

const meta: Meta<typeof ScatterPlot> = {
  title: 'Components/ScatterPlot',
  component: ScatterPlot,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ScatterPlot',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom ScatterPlot',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive ScatterPlot',
    onClick: () => alert('Clicked!'),
  },
};
