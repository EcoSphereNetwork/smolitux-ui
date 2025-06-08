import type { Meta, StoryObj } from '@storybook/react';
import { TransactionHistory } from './TransactionHistory';

const meta: Meta<typeof TransactionHistory> = {
  title: 'Components/TransactionHistory',
  component: TransactionHistory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'TransactionHistory',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom TransactionHistory',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive TransactionHistory',
    onClick: () => alert('Clicked!'),
  },
};
