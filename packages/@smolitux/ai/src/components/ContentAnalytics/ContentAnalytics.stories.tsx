import type { Meta, StoryObj } from '@storybook/react';
import { ContentAnalytics } from './ContentAnalytics';

const meta: Meta<typeof ContentAnalytics> = {
  title: 'Components/ContentAnalytics',
  component: ContentAnalytics,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ContentAnalytics',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom ContentAnalytics',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive ContentAnalytics',
    onClick: () => alert('Clicked!'),
  },
};
