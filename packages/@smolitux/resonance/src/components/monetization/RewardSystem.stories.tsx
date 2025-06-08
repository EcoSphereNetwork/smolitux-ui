import type { Meta, StoryObj } from '@storybook/react';
import { RewardSystem } from './RewardSystem';

const meta: Meta<typeof RewardSystem> = {
  title: 'Components/RewardSystem',
  component: RewardSystem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'RewardSystem',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom RewardSystem',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive RewardSystem',
    onClick: () => alert('Clicked!'),
  },
};
