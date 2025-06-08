import type { Meta, StoryObj } from '@storybook/react';
import { Default } from './Default';

const meta: Meta<typeof Default> = {
  title: 'Components/Default',
  component: Default,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Default',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Default',
    onClick: () => alert('Clicked!'),
  },
};
