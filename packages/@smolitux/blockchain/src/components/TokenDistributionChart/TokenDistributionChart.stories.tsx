import type { Meta, StoryObj } from '@storybook/react';
import { TokenDistributionChart } from './TokenDistributionChart';

const meta: Meta<typeof TokenDistributionChart> = {
  title: 'Components/TokenDistributionChart',
  component: TokenDistributionChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'TokenDistributionChart',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom TokenDistributionChart',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive TokenDistributionChart',
    onClick: () => alert('Clicked!'),
  },
};
