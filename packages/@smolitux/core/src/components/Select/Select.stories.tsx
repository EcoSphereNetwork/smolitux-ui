import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Select',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Select',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Select',
    onClick: () => alert('Clicked!'),
  },
};
