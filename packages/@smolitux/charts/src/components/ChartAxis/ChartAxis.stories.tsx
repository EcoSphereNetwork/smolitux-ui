import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ChartAxis } from './ChartAxis';

const meta: Meta<typeof ChartAxis> = {
  title: 'Charts/ChartAxis',
  component: ChartAxis,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: { type: 'radio' }, options: ['horizontal', 'vertical'] },
    length: { control: { type: 'number' } },
  },
};
export default meta;

type Story = StoryObj<typeof ChartAxis>;

export const Horizontal: Story = {
  render: (args) => (
    <svg width={200} height={60} viewBox="0 0 200 60">
      <ChartAxis {...args} />
    </svg>
  ),
  args: {
    length: 180,
    ticks: [
      { value: 0, position: 0 },
      { value: 50, position: 0.5 },
      { value: 100, position: 1 },
    ],
    orientation: 'horizontal',
    axisLabel: 'X-Axis',
  },
};

export const Vertical: Story = {
  render: (args) => (
    <svg width={80} height={200} viewBox="0 0 80 200">
      <ChartAxis {...args} />
    </svg>
  ),
  args: {
    length: 180,
    orientation: 'vertical',
    ticks: [
      { value: 0, position: 0 },
      { value: 50, position: 0.5 },
      { value: 100, position: 1 },
    ],
    axisLabel: 'Y-Axis',
  },
};
