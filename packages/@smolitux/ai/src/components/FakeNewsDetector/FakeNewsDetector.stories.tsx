import type { Meta, StoryObj } from '@storybook/react';
import { FakeNewsDetector } from './FakeNewsDetector';

const meta: Meta<typeof FakeNewsDetector> = {
  title: 'Components/FakeNewsDetector',
  component: FakeNewsDetector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'FakeNewsDetector',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom FakeNewsDetector',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive FakeNewsDetector',
    onClick: () => alert('Clicked!'),
  },
};
