import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DonutChart } from './DonutChart';

const meta: Meta<typeof DonutChart> = {
  title: 'Charts/DonutChart',
  component: DonutChart,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    height: { control: { type: 'number' } },
    width: { control: { type: 'text' } },
    showLegend: { control: { type: 'boolean' } },
    showValues: { control: { type: 'boolean' } },
    legendPosition: {
      control: { type: 'radio' },
      options: ['top', 'right', 'bottom', 'left'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof DonutChart>;

const sampleData = [
  { label: 'A', value: 40 },
  { label: 'B', value: 60 },
];

export const Default: Story = {
  args: {
    data: sampleData,
    height: 300,
    width: 300,
    title: 'Distribution',
    showLegend: true,
    showValues: true,
  },
};
