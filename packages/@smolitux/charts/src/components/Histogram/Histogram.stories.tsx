import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Histogram } from './Histogram';

const meta: Meta<typeof Histogram> = {
  title: 'Charts/Histogram',
  component: Histogram,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    height: { control: { type: 'number' } },
    width: { control: { type: 'text' } },
    bins: { control: { type: 'number' } },
  },
};
export default meta;

type Story = StoryObj<typeof Histogram>;

const sampleData = [12, 15, 16, 17, 18, 19, 18, 17, 20, 21, 22, 23];

export const Default: Story = {
  args: {
    data: sampleData,
    bins: 5,
    height: 300,
    width: 600,
    title: 'Sample Histogram',
  },
};
