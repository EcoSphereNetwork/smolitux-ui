import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
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
    showValues: { control: { type: 'boolean' } },
    showLegend: { control: { type: 'boolean' } },
    horizontal: { control: { type: 'boolean' } },
    stacked: { control: { type: 'boolean' } },
    animated: { control: { type: 'boolean' } },
    colorScheme: { control: { type: 'text' } },
  },
};

export default meta;

type Story = StoryObj<typeof BarChart>;

const basicData = {
  id: 'sales',
  name: 'Sales 2025',
  data: [
    { label: 'Q1', value: 150 },
    { label: 'Q2', value: 230 },
    { label: 'Q3', value: 180 },
    { label: 'Q4', value: 275 },
  ],
};

const multiSeriesData = [
  basicData,
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
];

export const Default: Story = {
  args: {
    data: basicData,
    height: 300,
    width: 600,
    title: 'Quarterly Sales',
    showGrid: true,
    showValues: true,
    showLegend: true,
    animated: true,
    startYAxisAtZero: true,
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
    data: multiSeriesData,
    height: 300,
    width: 600,
    title: 'Stacked Sales',
    showGrid: true,
    showValues: true,
    showLegend: true,
    stacked: true,
    animated: true,
  },
};

export const Themed: Story = {
  args: {
    data: basicData,
    height: 300,
    width: 600,
    title: 'Themed Colors',
    colorScheme: 'primary',
    showValues: true,
    animated: true,
  },
};
