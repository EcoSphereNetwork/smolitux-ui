import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker.original } from './TimePicker.original';

const meta: Meta<typeof TimePicker.original> = {
  title: 'Components/TimePicker.original',
  component: TimePicker.original,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'TimePicker.original',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom TimePicker.original',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive TimePicker.original',
    onClick: () => alert('Clicked!'),
  },
};
