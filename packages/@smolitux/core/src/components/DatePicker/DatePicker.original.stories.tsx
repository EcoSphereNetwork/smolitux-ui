import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker.original } from './DatePicker.original';

const meta: Meta<typeof DatePicker.original> = {
  title: 'Components/DatePicker.original',
  component: DatePicker.original,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'DatePicker.original',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom DatePicker.original',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive DatePicker.original',
    onClick: () => alert('Clicked!'),
  },
};
