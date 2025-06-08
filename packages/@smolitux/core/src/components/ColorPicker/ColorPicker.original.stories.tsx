import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker.original } from './ColorPicker.original';

const meta: Meta<typeof ColorPicker.original> = {
  title: 'Components/ColorPicker.original',
  component: ColorPicker.original,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ColorPicker.original',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom ColorPicker.original',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive ColorPicker.original',
    onClick: () => alert('Clicked!'),
  },
};
