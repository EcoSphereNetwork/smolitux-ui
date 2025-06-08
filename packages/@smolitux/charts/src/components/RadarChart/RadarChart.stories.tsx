import type { Meta, StoryObj } from '@storybook/react';
import { RadarChart } from './RadarChart';

const meta: Meta<typeof RadarChart> = {
  title: 'Components/RadarChart',
  component: RadarChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'RadarChart',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom RadarChart',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive RadarChart',
    onClick: () => alert('Clicked!'),
  },
};
