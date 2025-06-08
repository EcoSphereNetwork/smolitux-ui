import type { Meta, StoryObj } from '@storybook/react';
import { VotingSystem } from './VotingSystem';

const meta: Meta<typeof VotingSystem> = {
  title: 'Components/VotingSystem',
  component: VotingSystem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'VotingSystem',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom VotingSystem',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive VotingSystem',
    onClick: () => alert('Clicked!'),
  },
};
