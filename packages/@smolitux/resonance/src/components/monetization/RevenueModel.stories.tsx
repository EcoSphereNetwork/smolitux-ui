import type { Meta, StoryObj } from '@storybook/react';
import { RevenueModel } from './RevenueModel';

const meta: Meta<typeof RevenueModel> = {
  title: 'Components/RevenueModel',
  component: RevenueModel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'RevenueModel',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom RevenueModel',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive RevenueModel',
    onClick: () => alert('Clicked!'),
  },
};
