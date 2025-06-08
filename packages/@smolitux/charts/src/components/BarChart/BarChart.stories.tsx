import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from './BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'Charts/BarChart',
  component: BarChart,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    height: { control: { type: 'number' } },
    width: { control: { type: 'text' } },
    showGrid: { control: { type: 'boolean' } },
    showLegend: { control: { type: 'boolean' } },
    showValues: { control: { type: 'boolean' } },
    horizontal: { control: { type: 'boolean' } },
    stacked: { control: { type: 'boolean' } },
  },
};
export default meta;

type Story = StoryObj<typeof BarChart>;

const singleSeries = {
  id: 'sales',
  name: 'Sales 2025',
  data: [
    { label: 'Q1', value: 150 },
    { label: 'Q2', value: 230 },
    { label: 'Q3', value: 180 },
    { label: 'Q4', value: 275 },
  ],
};

export const Default: Story = {
  args: {
    data: singleSeries,
    height: 300,
    width: 600,
    showGrid: true,
    showLegend: true,
    animated: true,
  },
};

export const Horizontal: Story = {
  args: {
    ...Default.args,
    horizontal: true,
    showValues: true,
  },
};

export const Stacked: Story = {
  args: {
    data: [
      singleSeries,
      {
        id: 'forecast',
        name: 'Forecast 2026',
        data: [
          { label: 'Q1', value: 180 },
          { label: 'Q2', value: 250 },
          { label: 'Q3', value: 200 },
          { label: 'Q4', value: 300 },
        ],
      },
    ],
    height: 300,
    width: 600,
    stacked: true,
    showLegend: true,
  },
};
