import type { Meta, StoryObj } from '@storybook/react';
import { DropdownDividerA11y } from './DropdownDividerA11y';

const meta: Meta<typeof DropdownDividerA11y> = {
  title: 'Components/DropdownDividerA11y',
  component: DropdownDividerA11y,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'DropdownDividerA11y',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom DropdownDividerA11y',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive DropdownDividerA11y',
    onClick: () => alert('Clicked!'),
  },
};
