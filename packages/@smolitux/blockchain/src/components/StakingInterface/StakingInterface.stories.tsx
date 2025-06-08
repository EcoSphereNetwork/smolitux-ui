import type { Meta, StoryObj } from '@storybook/react';
import { StakingInterface } from './StakingInterface';

const meta: Meta<typeof StakingInterface> = {
  title: 'Components/StakingInterface',
  component: StakingInterface,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'StakingInterface',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom StakingInterface',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive StakingInterface',
    onClick: () => alert('Clicked!'),
  },
};
