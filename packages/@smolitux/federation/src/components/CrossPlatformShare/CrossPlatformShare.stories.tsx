import type { Meta, StoryObj } from '@storybook/react';
import { CrossPlatformShare } from './CrossPlatformShare';

const meta: Meta<typeof CrossPlatformShare> = {
  title: 'Components/CrossPlatformShare',
  component: CrossPlatformShare,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'CrossPlatformShare',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom CrossPlatformShare',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive CrossPlatformShare',
    onClick: () => alert('Clicked!'),
  },
};
