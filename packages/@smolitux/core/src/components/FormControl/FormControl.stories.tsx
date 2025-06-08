import type { Meta, StoryObj } from '@storybook/react';
import { FormControl } from './FormControl';

const meta: Meta<typeof FormControl> = {
  title: 'Components/FormControl',
  component: FormControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'FormControl',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom FormControl',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive FormControl',
    onClick: () => alert('Clicked!'),
  },
};
