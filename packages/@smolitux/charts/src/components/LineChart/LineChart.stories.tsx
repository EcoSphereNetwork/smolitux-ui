import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { LineChart } from './LineChart';

const meta: Meta<typeof LineChart> = {
  title: 'Charts/LineChart',
  component: LineChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    height: { control: { type: 'number' } },
    width: { control: { type: 'text' } },
    showGrid: { control: { type: 'boolean' } },
    showPoints: { control: { type: 'boolean' } },
    showArea: { control: { type: 'boolean' } },
    showLegend: { control: { type: 'boolean' } },
    animated: { control: { type: 'boolean' } },
  },
};
export default meta;

type Story = StoryObj<typeof LineChart>;

const singleSeries = {
  id: 'views',
  name: 'Page Views',
  data: [
    { x: 'Jan', y: 100 },
    { x: 'Feb', y: 150 },
    { x: 'Mar', y: 200 },
    { x: 'Apr', y: 120 },
    { x: 'May', y: 180 },
  ],
};

const multiSeries = [
  singleSeries,
  {
    id: 'visitors',
    name: 'Visitors',
    data: [
      { x: 'Jan', y: 60 },
      { x: 'Feb', y: 80 },
      { x: 'Mar', y: 120 },
      { x: 'Apr', y: 90 },
      { x: 'May', y: 110 },
    ],
  },
];

export const Default: Story = {
  args: {
    data: singleSeries,
    height: 300,
    width: 600,
    showGrid: true,
    showPoints: true,
    showLegend: true,
    animated: true,
  },
};

export const WithArea: Story = {
  args: {
    ...Default.args,
    showArea: true,
  },
};

export const MultiSeries: Story = {
  args: {
    data: multiSeries,
    height: 300,
    width: 600,
    showLegend: true,
  },
};

export const CustomColors: Story = {
  args: {
    data: singleSeries,
    colors: ['#FF6B6B'],
    height: 300,
    width: 600,
    showPoints: true,
    showArea: true,
  },
};
