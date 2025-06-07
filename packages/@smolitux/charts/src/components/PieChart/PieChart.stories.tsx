import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { PieChart } from './PieChart';

const meta: Meta<typeof PieChart> = {
  title: 'Charts/PieChart',
  component: PieChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    height: { control: { type: 'number' } },
    width: { control: { type: 'text' } },
    donut: { control: { type: 'boolean' } },
    showLegend: { control: { type: 'boolean' } },
    showValues: { control: { type: 'boolean' } },
    legendPosition: { control: { type: 'radio' }, options: ['top', 'right', 'bottom', 'left'] },
  },
};

export default meta;

type Story = StoryObj<typeof PieChart>;

const sampleData = [
  { label: 'A', value: 30 },
  { label: 'B', value: 45 },
  { label: 'C', value: 25 },
];

export const Default: Story = {
  args: {
    data: sampleData,
    height: 300,
    width: 300,
    title: 'Verteilung',
    donut: false,
    showLegend: true,
    showValues: false,
  },
};

export const Donut: Story = {
  args: {
    ...Default.args,
    donut: true,
    showValues: true,
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    colors: ['#FF6B6B', '#4ECDC4', '#FFD166'],
  },
};
