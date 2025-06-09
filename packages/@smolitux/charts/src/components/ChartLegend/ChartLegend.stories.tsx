import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ChartLegend } from './ChartLegend';

const meta: Meta<typeof ChartLegend> = {
  title: 'Charts/ChartLegend',
  component: ChartLegend,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    direction: { control: { type: 'radio' }, options: ['horizontal', 'vertical'] },
  },
};
export default meta;

type Story = StoryObj<typeof ChartLegend>;

const legendItems = [
  { label: 'Series A', color: '#ff0000' },
  { label: 'Series B', color: '#00ff00' },
];

export const Vertical: Story = {
  render: (args) => (
    <svg width={200} height={80} viewBox="0 0 200 80">
      <ChartLegend {...args} />
    </svg>
  ),
  args: {
    items: legendItems,
    direction: 'vertical',
  },
};

export const Horizontal: Story = {
  render: (args) => (
    <svg width={200} height={40} viewBox="0 0 200 40">
      <ChartLegend {...args} />
    </svg>
  ),
  args: {
    items: legendItems,
    direction: 'horizontal',
  },
};
