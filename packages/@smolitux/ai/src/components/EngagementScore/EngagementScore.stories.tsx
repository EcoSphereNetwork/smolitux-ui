import type { Meta, StoryObj } from '@storybook/react';
import { EngagementScore } from './EngagementScore';

const meta: Meta<typeof EngagementScore> = {
  title: 'Components/EngagementScore',
  component: EngagementScore,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'EngagementScore',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom EngagementScore',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive EngagementScore',
    onClick: () => alert('Clicked!'),
  },
};
