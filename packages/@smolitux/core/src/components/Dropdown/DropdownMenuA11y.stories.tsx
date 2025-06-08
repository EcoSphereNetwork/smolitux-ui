import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuA11y } from './DropdownMenuA11y';

const meta: Meta<typeof DropdownMenuA11y> = {
  title: 'Components/DropdownMenuA11y',
  component: DropdownMenuA11y,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'DropdownMenuA11y',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom DropdownMenuA11y',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive DropdownMenuA11y',
    onClick: () => alert('Clicked!'),
  },
};
