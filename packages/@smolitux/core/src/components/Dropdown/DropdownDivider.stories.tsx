import type { Meta, StoryObj } from '@storybook/react';
import { DropdownDivider } from './DropdownDivider';

const meta: Meta<typeof DropdownDivider> = {
  title: 'Components/DropdownDivider',
  component: DropdownDivider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'DropdownDivider',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom DropdownDivider',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive DropdownDivider',
    onClick: () => alert('Clicked!'),
  },
};
