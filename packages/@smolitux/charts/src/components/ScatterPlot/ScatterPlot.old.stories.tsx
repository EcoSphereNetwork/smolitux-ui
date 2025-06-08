import type { Meta, StoryObj } from '@storybook/react';
import { ScatterPlot.old } from './ScatterPlot.old';

const meta: Meta<typeof ScatterPlot.old> = {
  title: 'Components/ScatterPlot.old',
  component: ScatterPlot.old,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ScatterPlot.old',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom ScatterPlot.old',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive ScatterPlot.old',
    onClick: () => alert('Clicked!'),
  },
};
