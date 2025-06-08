import type { Meta, StoryObj } from '@storybook/react';
import { DropdownItem } from './DropdownItem';

const meta: Meta<typeof DropdownItem> = {
  title: 'Components/DropdownItem',
  component: DropdownItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'DropdownItem',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom DropdownItem',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive DropdownItem',
    onClick: () => alert('Clicked!'),
  },
};
