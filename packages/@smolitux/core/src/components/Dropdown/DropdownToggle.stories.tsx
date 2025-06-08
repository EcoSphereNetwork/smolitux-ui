import type { Meta, StoryObj } from '@storybook/react';
import { DropdownToggle } from './DropdownToggle';

const meta: Meta<typeof DropdownToggle> = {
  title: 'Components/DropdownToggle',
  component: DropdownToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'DropdownToggle',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom DropdownToggle',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive DropdownToggle',
    onClick: () => alert('Clicked!'),
  },
};
