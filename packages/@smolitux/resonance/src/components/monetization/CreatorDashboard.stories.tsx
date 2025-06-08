import type { Meta, StoryObj } from '@storybook/react';
import { CreatorDashboard } from './CreatorDashboard';

const meta: Meta<typeof CreatorDashboard> = {
  title: 'Components/CreatorDashboard',
  component: CreatorDashboard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'CreatorDashboard',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom CreatorDashboard',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive CreatorDashboard',
    onClick: () => alert('Clicked!'),
  },
};
